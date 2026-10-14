# Repository cleanup audit — 2026-10

## Scope and safety

This report records the first, read-only inventory from fresh full clones of
`origin/main` for the seven repositories in the technical cleanup assignment.
Existing workcopies and branches were not modified. No history rewrite, force
push, branch/tag deletion, secret change, permission change, or public-data
deletion was performed.

The inventory is a baseline only. A filename, age, size, or duplicate checksum
is not by itself a removal decision. Raw/private-source paths and protected
baseline artifacts remain protected pending an explicit, evidence-backed PR.

## Fresh-main inventory

| repository | main SHA | tracked files | tracked bytes | workflows | test candidates | remote/tag refs | source-named candidates |
|---|---|---:|---:|---:|---:|---:|---:|
| Gotaleden Splits | `2c247d7b7d40fb7bd28bdfd700b34043fdcde00b` | 160 | 18,962,466 | 9 | 53 | 61 | 1 |
| Sätila Splits | `62ce08947a882c5a6b41f55ba7ac848b9f5f33b8` | 223 | 8,623,860 | 19 | 47 | 66 | 2 |
| Ultravasan Analys | `84555dc3f20107fdc381aa98983230818e6cc4a3` | 342 | 249,091,181 | 13 | 65 | 112 | 1 |
| Österlen Spring Trail | `a54207726524a70d68102d79e8a0cb62d64438ed` | 416 | 24,815,360 | 28 | 11 | 95 | 11 |
| GAX100 Analys | `85e6a8048b43aedff0606cc5fbb1c14b1054bfdd` | 9 | 18,089 | 2 | 0 | 8 | 0 |
| Loppanalys portal | `893b95a3e3024b0ef280fa6cbb65ac7f063b57d9` | 46 | 1,746,760 | 0 | 0 | 14 | 0 |
| Private data archive | `a56fd488a6e3cf7263753f975ff8427b8f4dd8cf` | 83 | 139,827,916 | 2 | 0 | 7 | 34 |

Counts are aggregate metadata and intentionally omit participant names,
identifiers, raw values, and checksums of private records.

## Baseline QA

- **Gotaleden:** `python -m unittest discover -s tests -q` ran 299 tests;
  19 errors and 2 failures are fixture-dependent on source/API/GPX files not
  present in a clean public clone. No mutation or fetch was attempted.
- **Sätila:** `python tools/run_release_candidate_checks.py --all` passed its
  initial four-test block, then failed in a route-import test because the
  sandbox denied creation/cleanup of its temporary directory (`WinError 5`).
- **Österlen:** `python tools/validate_foundation.py` — **Foundation validation
  OK**.
- **Ultravasan:** `python tools/u9_release_audit.py` — blocked by three
  protected baseline artifacts missing or with a different current hash in the
  clean clone (`data/ultravasan.sqlite`, `docs/data/ultravasan-data.js`,
  `docs/data/manifest.json`). Protected totals and integrity checks were
  otherwise reported OK.
- **GAX100:** current `main` contains documentation and guards only; no
  executable test suite is present.
- **Portal/private archive:** no repository-specific local baseline command was
  inferred or run without a documented contract.

These outcomes are blockers or environment/fixture findings, not cleanup
justifications. They must be resolved or explicitly waived before any cleanup
PR is promoted.

## Candidate classification

No candidate is approved for deletion from this inventory alone. Workflows,
reports, source manifests, historical branches, and private archives require
repository-owner review and provenance checks. The old sanitized-history
repositories and GitHub Support cleanup references remain out of scope for
destructive action in this assignment.

## Next gated steps

1. Repeat the affected baseline commands in a runner with the documented
   fixture/temporary-directory prerequisites, preserving the exact SHA above.
2. Review workflow reachability and duplicate/hash candidates without printing
   private data or participant identifiers.
3. Open separate small cleanup PRs only where a candidate is classified safe;
   keep uncertain changes Draft.
4. Re-run the same baselines, compare protected totals/exports/contracts and
   verify that no old raw objects are reintroduced.

At this stage the only code change is this audit report; no visual, runtime,
data, GDPR, or navigation behavior was changed.

## Phase 2 follow-up (2026-10-14)

The review of PR #13 required concrete A–E classifications before any removal.
Those classifications are now recorded in separate Draft PRs:

- Gotaleden: [PR #58](https://github.com/Stayinhealthyrunning/gotaleden-splits/pull/58), commit `f53b3bee44994d043f8ac417b6f31b2c14c14617`.
- Sätila: [PR #61](https://github.com/Stayinhealthyrunning/satila-splits/pull/61), commit `17829cba619d7c14388e93cd2c537df824821954`.
- GAX100 active integration branch: [PR #7](https://github.com/Stayinhealthyrunning/gax100-analys/pull/7), commit `4da1f990cfcc7f904af9c552da9ddb0652004b89`.
- Ultravasan: [PR #85](https://github.com/Stayinhealthyrunning/ultravasan-analys/pull/85), commit `489af0944b9b858f66648fb5dcf2367d6dc3b574`.
- Österlen: [PR #76](https://github.com/Stayinhealthyrunning/osterlen-spring-trail-analys/pull/76), commit `eecf6770720708ae3b7d178787ea1e9d2f8a1c37`.

The evidence review found no proven class-A file and no safe class-C code or
workflow consolidation in these first repositories. Identical Gotaleden
outputs are generator- and test-backed compatibility aliases; private-source,
GDPR and history workflows are B-class security controls. Consequently no
tracked file was deleted and no duplicated runtime code was rewritten. This is
an explicit negative finding, not an age/size-based cleanup shortcut.

Phase 3 is gated on the existing Actions with writable temporary storage and
the documented private read-only restore. Secrets, permissions, old rewritten
refs, hidden PR caches and private originals remain untouched. PR #13 stays
Draft until the Actions evidence and any owner decisions are available.
