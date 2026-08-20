# 04 — Tools, Standards and Datasets

The things you would actually install, clone or download. Licences noted,
because a hackathon submission that ships someone else's code needs them.

---

## Compiler

**GnuCOBOL** — https://gnucobol.sourceforge.io/
Downloads: https://sourceforge.net/projects/gnucobol/files/gnucobol/3.2/
FAQ: https://gnucobol.sourceforge.io/faq/index.html
Project page: https://savannah.gnu.org/projects/gnucobol/

**Licence:** `cobc` compiler under **GPL**; `libcob` runtime under **LGPL**.
The LGPL runtime split matters — it is what lets a compiled COBOL binary be used
without the GPL propagating to your harness.

**Why it makes the project feasible:** 19 COBOL dialects (IBM, MVS, Micro Focus,
ACUCOBOL-GT, RM/COBOL, BS2000, GCOS, COBOL85/2002/2014). Version 3.2 adds
`-std=ibm-strict` with reserved words aligned to **Enterprise COBOL 6.3**.
Compiles COBOL to C, then to a native binary — so the legacy side is an ordinary
executable you can run, time and instrument.

**Conformance:** passes **9,700 of 9,748** NIST COBOL-85 tests, plus 3,700+ tests
in 1,300+ internal groups at build time.

⚠ **State this caveat yourself before a judge finds it:** the project
**explicitly does not claim to be a "Standard Conforming" implementation** of
COBOL despite that pass rate. It is a free stand-in that makes the demo
possible, not a claim of equivalence with IBM Enterprise COBOL.

**Known issue:** GnuCOBOL bug #997 — code coverage build error on Ubuntu 24.04.
https://sourceforge.net/p/gnucobol/bugs/997/ Budget time for this; the
paragraph-level `DISPLAY` tracing fallback is in `../04 §3`.

---

## Parser

**ProLeap COBOL Parser** — https://github.com/uwol/proleap-cobol-parser
Fork under OpenRewrite: https://github.com/openrewrite/proleap-cobol-parser
Related: https://github.com/uwol/proleap-cobol

**Licence: MIT.** Java. ANTLR4-based.

Produces an **AST** and an **Abstract Semantic Graph** carrying data and control
flow information (variable access) — the ASG is what makes slicing on
business-concept variables possible. Preprocessor handles `COPY` and `REPLACE`.
**`EXEC SQL`, `EXEC SQLIMS` and `EXEC CICS` are extracted as text**, which is
exactly what the intake gate (N7) needs to detect and refuse them.

Passes the NIST test suite; applied to numerous banking and insurance COBOL
files.

⚠ Author attribution in `references.bib` is inferred from the repository owner —
confirm before formal citation.

---

## Test corpora

**AWS Mainframe Modernization CardDemo**
https://github.com/aws-samples/aws-mainframe-modernization-carddemo
**Licence: Apache 2.0.**

A COBOL credit-card management application, deliberately written with varied
coding styles to exercise analysis and migration tooling. AWS's own benchmark
for this class of tool — which makes "we ran it on AWS's mainframe modernisation
sample" a strong line.

⚠ **`CBACT04C.cbl` is not a viable verification target.** Verified 4 August
2026: 652 lines (~605 code), an interest calculator using
`(balance × rate) / 1200` — but it reads **four VSAM files** (transaction
category balance, cross-reference, disclosure group, account master) and calls
**`FUNCTION CURRENT-DATE`** to timestamp records. Database coupling and a clock
read are both excluded by this project's determinism scope.

**Use it for the intake gate demo instead** — the tool correctly refusing AWS's
own published sample, with a reason, on third-party code. See `../07 §C2`.
Direct link: https://github.com/aws-samples/aws-mainframe-modernization-carddemo/blob/main/app/cbl/CBACT04C.cbl

**Still to do:** sweep the rest of `app/cbl/` for a genuinely pure computational
program to headline with. Not done.

**NIST CCVS85 COBOL-85 test suite**
https://github.com/Zaneham/nist-cobol85-test-suite ·
https://github.com/z390development/nistcobol85
GnuCOBOL's own copy: https://sourceforge.net/projects/gnucobol/files/nist/

**Licence: public domain.** 512 test programs, **8,800+ individual test cases**,
in `newcob.val` (v4.0, 1992). Standard: ANSI X3.23-1985 / ISO 1989-1985.
Use for parser robustness and the conformance claim.

---

## Testing infrastructure

**Diffy** — https://github.com/twitter-archive/diffy
Maintained fork: https://github.com/opendiffy/diffy

Built at Twitter; used at Twitter, Airbnb, Baidu and ByteDance. Multicasts each
request to old and new service instances and compares responses. **The
industrial precedent for the whole approach** — and the citation that makes
"legacy as oracle" read as an established technique rather than an invention.

Its stated premise, worth knowing: if two implementations return similar
responses across a sufficiently large and diverse set of requests, they can be
treated as equivalent. The Twitter engineering post was titled *"Testing
services without writing tests."*

**GCBLUnit** — https://github.com/OlegKunitsyn/gcblunit
Unit testing for GnuCOBOL, written in GnuCOBOL. Assertions, JUnit-format
reporting, CI integration. Useful as a **reference for harness plumbing**, not
as a dependency.

**gcov** (GCC) — https://en.wikipedia.org/wiki/Gcov
`-fprofile-arcs -ftest-coverage`. Per-statement execution counts. The path to
coverage instrumentation through GnuCOBOL's C backend, subject to bug #997
above. `cobc -fgen-c-line-directives` maps generated C lines back to COBOL.

**Shadow testing** — Microsoft Code-with Engineering Playbook
https://microsoft.github.io/code-with-engineering-playbook/automated-testing/shadow-testing/
Definition and practice of replaying production traffic against a candidate
environment.

---

## Reference material for the COBOL number model

**IBM.** *Mapping between COBOL and Java data types for non-OO COBOL/Java
interoperability.*
https://www.ibm.com/docs/en/cobol-zos/6.4.0?topic=ci-mapping-between-cobol-java-data-types-non-oo-coboljava-interoperability
**Confidence: A.** Precision loss on `COMP-1`/`COMP-2` ↔ `float`/`double`;
`BigDecimal` as the legal partner for zoned and packed decimal items. **This is
the citation behind the rounding-bug demo.**

**IBM.** *PACKED-DECIMAL (COMP-3).*
https://www.ibm.com/docs/en/SS6SG3_6.3.0/perf/packed_decimal.html
**Confidence: A.** Packed decimal representation and exactness.

---

## Environment note

Toolchain confirmed present on this machine: **Python 3.13.6** with `markdown`,
`pypdf`; **Google Chrome** (used for PDF generation); Microsoft Office for
PowerPoint COM automation.

**Not installed:** LibreOffice, pandoc, poppler / `pdftoppm`. Which is why
`../build-pdf.py` renders markdown → styled HTML → headless Chrome rather than
using pandoc.

**Not yet installed and needed for the build:** GnuCOBOL, a JDK (for ProLeap),
and ANTLR. Stage 0 of the build plan is precisely to get GnuCOBOL compiling and
running a COBOL program from a script — do that first, because it de-risks
everything downstream.
