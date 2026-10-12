#!/usr/bin/env python3
"""Maintain the private GDPR block registry without writing identity data to Git."""
from __future__ import annotations

import argparse
import base64
import hashlib
import json
import os
import re
import unicodedata
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ALLOWED_ACTIONS = {"restrict_identifiers", "remove_result", "temporary_restriction"}


def normalize(value: str) -> str:
    return re.sub(r"\s+", " ", unicodedata.normalize("NFKC", value).casefold()).strip()


def fingerprint(value: str) -> str:
    return hashlib.sha256(normalize(value).encode("utf-8")).hexdigest()


def outside_repository(path: Path) -> Path:
    # Path.resolve() can preserve ``..`` for sandboxed Windows network paths;
    # normpath/abspath gives us a stable containment check on every platform.
    resolved = Path(os.path.abspath(os.path.normpath(path)))
    if resolved == ROOT or ROOT in resolved.parents:
        raise SystemExit("The private case/registry path must be outside the public repository")
    return resolved


def validate_registry(registry: dict) -> None:
    if registry.get("schema_version") != 2 or not isinstance(registry.get("entries"), list):
        raise SystemExit("Unsupported private registry schema")
    for entry in registry["entries"]:
        if entry.get("action") not in ALLOWED_ACTIONS:
            raise SystemExit("Unsupported registry action")
        if not re.fullmatch(r"[0-9a-f]{64}", str((entry.get("match") or {}).get("normalized_name_sha256", ""))):
            raise SystemExit("Invalid private match fingerprint")
        if any(key in entry for key in ("name", "email", "birthdate")):
            raise SystemExit("Plaintext identity data is forbidden in the registry")
        if entry.get("require_review_for_new_matches") and not isinstance(entry.get("approved_matches", []), list):
            raise SystemExit("approved_matches must be a list")


def register(args: argparse.Namespace) -> None:
    request_path = outside_repository(Path(args.request_file))
    registry_path = outside_repository(Path(args.registry))
    request = json.loads(request_path.read_text(encoding="utf-8"))
    name = str(request.get("name") or "").strip()
    action = str(request.get("action") or "")
    approved = request.get("approved_matches") or []
    if not name or action not in ALLOWED_ACTIONS:
        raise SystemExit("Private request needs name and a supported action")
    if not approved and not request.get("manual_name_only_decision"):
        raise SystemExit("Confirm result references, or explicitly document a private name-only decision")
    registry = json.loads(registry_path.read_text(encoding="utf-8")) if registry_path.exists() else {
        "schema_version": 2, "entries": []
    }
    entry = {
        "subject_id": args.subject_id,
        "match": {"normalized_name_sha256": fingerprint(name)},
        "action": action,
        "scopes": request.get("scopes") or ["*"],
        "require_review_for_new_matches": True,
        "approved_matches": approved,
    }
    if request.get("expires_at"):
        entry["expires_at"] = request["expires_at"]
    registry["entries"] = [item for item in registry.get("entries", []) if item.get("subject_id") != args.subject_id]
    registry["entries"].append(entry)
    validate_registry(registry)
    registry_path.parent.mkdir(parents=True, exist_ok=True)
    registry_path.write_text(json.dumps(registry, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    try:
        os.chmod(registry_path, 0o600)
    except OSError:
        pass
    print(json.dumps({"status": "registered", "subject_id": args.subject_id, "approved_matches": len(approved)}))


def encode(args: argparse.Namespace) -> None:
    registry_path = outside_repository(Path(args.registry))
    output_path = outside_repository(Path(args.output))
    registry = json.loads(registry_path.read_text(encoding="utf-8"))
    validate_registry(registry)
    output_path.write_text(base64.b64encode(json.dumps(registry, separators=(",", ":")).encode()).decode() + "\n")
    try:
        os.chmod(output_path, 0o600)
    except OSError:
        pass
    print(json.dumps({"status": "encoded", "output": str(output_path), "entries": len(registry["entries"])}))


def verify(args: argparse.Namespace) -> None:
    registry = json.loads(outside_repository(Path(args.registry)).read_text(encoding="utf-8"))
    validate_registry(registry)
    print(json.dumps({"status": "valid", "entries": len(registry["entries"])}))


def main() -> None:
    parser = argparse.ArgumentParser()
    sub = parser.add_subparsers(required=True)
    add = sub.add_parser("register")
    add.add_argument("--request-file", required=True)
    add.add_argument("--registry", required=True)
    add.add_argument("--subject-id", required=True)
    add.set_defaults(func=register)
    enc = sub.add_parser("encode-secret")
    enc.add_argument("--registry", required=True)
    enc.add_argument("--output", required=True)
    enc.set_defaults(func=encode)
    check = sub.add_parser("verify")
    check.add_argument("--registry", required=True)
    check.set_defaults(func=verify)
    args = parser.parse_args()
    args.func(args)


if __name__ == "__main__":
    main()
