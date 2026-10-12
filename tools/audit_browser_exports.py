#!/usr/bin/env python3
"""Audit browser-downloadable JSON/JS/HTML without disclosing protected identities."""
from __future__ import annotations

import argparse
import hashlib
import json
import re
import unicodedata
from pathlib import Path
from typing import Any


def normalize(value: Any) -> str:
    return re.sub(r"\s+", " ", unicodedata.normalize("NFKC", str(value)).casefold()).strip()


def fingerprint(value: Any) -> str:
    return hashlib.sha256(normalize(value).encode("utf-8")).hexdigest()


def strings(value: Any):
    if isinstance(value, str):
        yield value
    elif isinstance(value, dict):
        for child in value.values():
            yield from strings(child)
    elif isinstance(value, list):
        for child in value:
            yield from strings(child)


def quoted_strings(text: str):
    for match in re.finditer(r'"((?:\\.|[^"\\])*)"', text):
        try:
            yield json.loads('"' + match.group(1) + '"')
        except json.JSONDecodeError:
            continue


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--registry", required=True)
    ap.add_argument("--root", action="append", required=True)
    ap.add_argument("--report")
    args = ap.parse_args()
    registry = json.loads(Path(args.registry).read_text(encoding="utf-8"))
    blocked = {(entry.get("match") or {}).get("normalized_name_sha256") for entry in registry.get("entries", [])}
    findings = []
    scanned = 0
    for raw_root in args.root:
        root = Path(raw_root)
        for path in root.rglob("*"):
            if not path.is_file() or ".git" in path.parts or path.suffix.lower() not in {".json", ".js", ".html"}:
                continue
            scanned += 1
            try:
                text = path.read_text(encoding="utf-8")
            except UnicodeDecodeError:
                continue
            values = quoted_strings(text)
            if path.suffix.lower() == ".json":
                try:
                    values = strings(json.loads(text))
                except json.JSONDecodeError:
                    pass
            if any(value and fingerprint(value) in blocked for value in values):
                findings.append({"file": path.as_posix(), "reason": "protected identity string"})
            data_bearing = path.suffix.lower() == ".json" or "data" in path.name.casefold()
            if data_bearing and normalize("Anonym löpare") in normalize(text):
                findings.append({"file": path.as_posix(), "reason": "pseudonymous individual marker"})
    report = {"schema_version": 1, "scanned_files": scanned, "findings": findings, "status": "PASS" if not findings else "FAIL"}
    if args.report:
        Path(args.report).write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(report, ensure_ascii=False))
    if findings:
        raise SystemExit(1)


if __name__ == "__main__":
    main()
