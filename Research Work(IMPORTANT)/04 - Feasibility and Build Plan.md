# 04 — Feasibility and Build Plan

What can actually be built, with what, and in what order. Nothing here assumes a
mainframe, a paid licence, or a bank's cooperation.

---

## 1. The COBOL side is solved

**GnuCOBOL** is the whole reason this project is feasible on a laptop.

- Free software: `cobc` under GPL, `libcob` runtime under LGPL.
- Supports **19 COBOL dialects**, including IBM, MVS, Micro Focus, ACUCOBOL-GT,
  RM/COBOL, BS2000, GCOS, COBOL85, COBOL2002, COBOL2014.
- Version 3.2 added `-std=ibm-strict` for strict IBM COBOL compatibility, with
  reserved words updated to **Enterprise COBOL 6.3**.
- Compiles COBOL to C, then to a native binary — so the "legacy" side of the
  harness is a normal executable that can be run, timed and instrumented.

**Conformance evidence, which is worth one line in the deck:** GnuCOBOL passes
**9,700 of 9,748** tests in the NIST COBOL-85 test suite (CCVS85 — 512 test
programs, 8,800+ individual test cases, public domain, mirrored on GitHub).
That is a citable answer to "how do you know your COBOL side is behaving like a
real mainframe compiler."

**State the caveat yourself:** the GnuCOBOL project explicitly **does not claim
to be a "Standard Conforming" implementation** despite that pass rate.
Volunteering this is better than being caught by it.

**Honest limitation to state before a judge does:** GnuCOBOL is not IBM
Enterprise COBOL. Dialect-specific behaviour, especially around `COMP-3`
edge cases, `ON SIZE ERROR` semantics and EBCDIC-vs-ASCII collation, can differ.
The correct framing is that the *methodology* is compiler-agnostic — swap
GnuCOBOL for Enterprise COBOL in a bank's own environment and the harness is
unchanged. GnuCOBOL is the free stand-in that makes the demo possible, not a
claim that the two compilers are identical.

---

## 2. Parsing and extraction

| Need | Tool | Notes |
|---|---|---|
| COBOL AST + semantic graph | **ProLeap COBOL parser** (`uwol/proleap-cobol-parser`) | ANTLR4-based. Produces AST and an Abstract Semantic Graph with data and control flow information (variable access). Passes the NIST suite. Applied to numerous banking and insurance COBOL files. MIT licence. Java. Also maintained as a fork under `openrewrite/`. |
| Preprocessing | ProLeap preprocessor | Handles `COPY` and `REPLACE`. Extracts `EXEC SQL` / `EXEC CICS` as text — relevant because those are the constructs the project declares out of scope, so they can be *detected and rejected* rather than silently mishandled. |
| Rule extraction technique | Program slicing on business-concept variables | The method used by COBREX and the model-based frameworks. A slice is a set of source lines, which is exactly the traceability the submission promises. |
| Rule extraction, practical | LLM few-shot over the sliced unit | COBRAIN's approach; measured F1 0.73 vs COBREX's 0.59. Constrain the model to the slice, not the whole program. |

**Design decision worth defending:** run the LLM over *slices*, not over the
whole file. It bounds the context, it makes the line-level citation mechanical
rather than model-generated (the model cannot hallucinate a line reference if
the slice defines the line set), and it matches the deterministic-orchestration
finding — LLM calls at bounded points inside a fixed pipeline.

---

## 3. Coverage instrumentation — how the "unproven" label gets computed

The verified/unproven verdict needs to know which source lines each execution
touched.

- GnuCOBOL compiles via C, so **gcov** (the standard GCC coverage tool,
  `-fprofile-arcs -ftest-coverage`) is the available path: it produces exact
  execution counts per statement.
- Caveat found in the GnuCOBOL bug tracker: a coverage build error on Ubuntu
  24.04 (bug #997). Budget time for toolchain friction here, and have a fallback.
- **Fallback that is arguably better for the demo anyway:** instrument at the
  COBOL level rather than the C level — inject a `DISPLAY` trace of paragraph
  entry, or map the generated C line numbers back to COBOL lines using
  `cobc -fgen-c-line-directives`. Paragraph-level granularity is sufficient,
  because extracted rules map to paragraphs and slices, not to individual C
  statements.
- `GCBLUnit` (`OlegKunitsyn/gcblunit`) exists as a GnuCOBOL unit-testing tool
  with JUnit-format reporting — useful as a reference for harness plumbing, not
  as a dependency.

---

## 4. Test corpus — do not write the COBOL yourselves

Writing your own COBOL and then proving your tool understands it is circular,
and a judge will say so. Use public corpora:

| Corpus | What it is | Use |
|---|---|---|
| **`aws-samples/aws-mainframe-modernization-carddemo`** | Comprehensive COBOL credit-card management application, Apache 2.0, deliberately written with varied coding styles to exercise analysis and migration tooling. Includes batch programs such as `CBACT04C.cbl` (interest calculation). | **Primary target.** It is AWS's own benchmark for exactly this class of tool, which makes "we ran it on AWS's mainframe modernisation sample" a strong line. |
| **NIST CCVS85** (`newcob.val`) | 512 programs, 8,800+ test cases, public domain | Parser robustness testing; conformance claim. |
| Own minimal programs | A 150–300 line savings-interest accrual program modelled on RBI's rules | Needed for the controlled demo where you *know* the seeded divergence. Present as a demo fixture, not as evidence. |

**Correction after verification — do not use `CBACT04C.cbl` as the verification
demo.** It is an interest calculator (652 lines), but it reads **four VSAM
files** and calls **`FUNCTION CURRENT-DATE`** to timestamp records. Database
coupling and a clock read are both excluded by this project's own scope rules.

**Use it for the intake gate instead**, which is a better demo anyway — the tool
correctly refusing AWS's own published sample, with a reason, on third-party
code. Then lift the interest arithmetic (`(balance × rate) / 1200`) into a pure
computational unit for the verification demo and say plainly that this is what
was done. Sweep the rest of CardDemo for a genuinely pure program to headline
with. See `07 - Verification Pass.md §C2`.

---

## 5. The demo that should be built

A single, tight narrative beats a broad, shallow one.

1. **Input:** a COBOL savings-interest accrual program (CardDemo's, or a
   150-line fixture modelled on RBI's rules).
2. **Extract:** produce ~10–20 plain-language rules, each with a line citation.
   Include the tier threshold, the rounding step and the day-count handling.
3. **Reimplement:** generate the Java. Do not hand-fix it. The point is that the
   generated code is *untrusted*.
4. **Generate inputs:** boundaries derived from the extracted rules —
   ₹99,999 / ₹1,00,000 / ₹1,00,001 (the RBI uniform-rate threshold), accruals
   landing on exact ₹0.50 (the nearest-rupee rounding rule), 28/29 February,
   month and quarter ends, zero balance, negative balance, maximum `PIC` value.
5. **Run both. Diff.**
6. **Show the finding:** *"Input: balance ₹1,00,000.00, 12 days at 3.5%. Legacy
   returns ₹115. Reimplementation returns ₹116. Divergence traced to rule R-07
   (line 214, `COMPUTE ... ROUNDED`) — the Java uses `RoundingMode.HALF_UP`
   where the COBOL truncates."*
7. **Show the coverage table:** 20 rules extracted, 14 verified by execution,
   6 unproven — and name which six.

Step 7 is the differentiator. Step 6 is the moment that convinces the room.

**Delta debugging** (SEDCoT's third phase) is what turns step 6 from "here are
73 failing inputs" into one minimal counterexample. It is a shrinking loop —
maybe 40 lines of code — and it improves the demo more than any other equivalent
effort.

---

## 6. Architecture, per the evidence

Deterministic pipeline, bounded LLM calls. Justified by the controlled study
showing deterministic orchestration matches agentic accuracy at **up to 3.5×
lower token cost** with better worst-case robustness and lower run-to-run
variance.

```
COBOL source
    │
    ├─► [ProLeap parse] ──► AST + ASG
    │                          │
    │                          ├─► [slice on business variables] ──► units
    │                                          │
    │                                          └─► [LLM, per slice] ──► rules + line citations
    │                                                                        │
    ├─► [cobc compile + gcov] ──► legacy binary ◄──┐                        │
    │                                               │                        │
    │                                        [input corpus] ◄───────────────┘
    │                                               │        (boundaries implied by rules)
    └─► [LLM translate] ──► Java (untrusted) ◄──────┘
                                    │
                          [run both on every input]
                                    │
                              [diff outputs]
                                    │
                    ┌───────────────┴───────────────┐
                    │                               │
            [delta-debug failures]        [map executions → lines → rules]
                    │                               │
            minimal counterexamples       verified / unproven per rule
```

Determinism also matters for a second reason specific to this project: the
harness compares two programs for exact equality. A non-deterministic harness
undermines its own verdict.

---

## 7. Staged plan

| Stage | Deliverable | Risk |
|---|---|---|
| **0** | GnuCOBOL installed; a COBOL program compiles and runs from a script; output captured and parsed | Low. Do this first — it de-risks everything else. |
| **1** | Differential harness: run two programs on a list of inputs, diff, report | Low. This alone is a working demo. |
| **2** | Input generation from `PIC` clauses (domain, sign, extremes) + hand-written boundaries | Low |
| **3** | ProLeap parse → slices → LLM rules with line citations | Medium. ProLeap is Java; if the rest of the stack is Python, budget for the boundary or use a simpler regex/heuristic sectioniser for the demo. |
| **4** | Rules → boundary inputs (the reciprocal loop) | Medium. **This is the contribution — protect time for it.** |
| **5** | Coverage → per-rule verified/unproven verdict | Medium-high. gcov toolchain friction is the known risk; the paragraph-level `DISPLAY` fallback is the mitigation. |
| **6** | Delta debugging to minimal counterexample | Low. High demo value per hour. |
| **7** | Report generation: specification document + regression suite + equivalence claim | Low. Presentation work, but it is the actual product. |

**If time runs out:** stages 0–2 and 6 produce a demo that works and tells the
story. Stages 4 and 5 are what make it *this project* rather than a generic
diff tool. Cut stage 3's sophistication before cutting stages 4 and 5.

---

## 8. Scope boundaries, restated with the technical reason

The submission already scopes these out. The reasons, for when a judge asks:

| Excluded | Why, precisely |
|---|---|
| CICS screens, JCL orchestration | Not pure computation; behaviour depends on terminal state and job scheduling. ProLeap extracts `EXEC CICS` as opaque text, so these are *detectable* — the tool can refuse them explicitly rather than mishandle them. |
| Database-coupled programs | The oracle requires reproducibility. DB2 state is external and mutable, so the same input does not guarantee the same output. |
| Non-deterministic logic (clocks, randomness, external state) | Differential testing compares outputs for equality. A program reading `CURRENT-DATE` produces a different answer on each run, so equality is meaningless. Detectable statically by scanning for the relevant intrinsics — again, refuse explicitly. |
| Whole-system migration | Out of scope by design; this is an assessment and assurance tool, not a migration platform. |

Making each exclusion *detectable and explicitly refused* rather than merely
documented is worth building. "The tool tells you when it cannot help you" is
the same honesty argument as verified/unproven, applied at the intake stage.
