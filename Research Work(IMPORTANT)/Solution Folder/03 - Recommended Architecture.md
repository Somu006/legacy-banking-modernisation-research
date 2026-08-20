# 03 — Recommended Architecture

The composite of options B + D + E + F + J, carrying novelties N1–N8.
Deterministic pipeline, bounded LLM calls — justified by the controlled study
showing deterministic orchestration matches agentic accuracy at up to 3.5× lower
token cost with better worst-case robustness (`../02 §2`).

---

## Pipeline

```
                        COBOL source
                             │
              ┌──────────────┴──────────────┐
              │                             │
      [0] INTAKE GATE                [1] PARSE
      detect CICS/SQL/clock          ProLeap → AST + ASG
      refuse with reason  ─── no ──►      │
              │ yes                       │
              ▼                    [2] SLICE on business variables
      REFUSED + reason                    │
                                          ▼
                              [3] EXTRACT (LLM, per slice)
                              rules + typed boundaries
                              line set fixed by the slice
                                          │
        ┌─────────────────────────────────┼─────────────────────────────┐
        │                                 │                             │
        ▼                                 ▼                             ▼
 [4] COMPILE legacy            [5] GENERATE INPUTS            [6] TRANSLATE (LLM)
 cobc + coverage               boundary triples per rule       Java, untrusted
        │                      + PIC domain sweep                      │
        │                      + rounding midpoints                    │
        │                      + date boundaries                       │
        │                                 │                            │
        └────────────────┬────────────────┴──────────────┬─────────────┘
                         │                               │
                         ▼                               ▼
              [7] EXECUTE all three                [8] REGULATION MODEL
              legacy · rewrite · regulation         RBI clauses, ~60 lines
                         │
                         ▼
              [9] THREE-WAY COMPARE
              → translation defect
              → inherited compliance defect
              → silent correction
              → verified compliant
                         │
        ┌────────────────┼────────────────┬──────────────────┐
        ▼                ▼                ▼                  ▼
 [10] DELTA DEBUG  [11] RULE VERDICT  [12] MUTATE      [13] MATERIALITY
 minimal counter-  reached ∧          legacy oracle,   rupee impact
 example           discriminating ∧   measure corpus   per divergence
                   agreed             kill rate
        └────────────────┴────────────────┴──────────────────┘
                                 │
                                 ▼
                     [14] EVIDENCE BUNDLE
        specification · regression suite · equivalence claim
```

---

## Stage notes

**[0] Intake gate.** Keyword and AST scan for `EXEC CICS`, `EXEC SQL`,
`CURRENT-DATE` and other clock intrinsics, `RANDOM`, external file I/O beyond
the declared interface. Plus the dynamic check: run every input twice and flag
any program whose output differs from itself. Refuse with a reason rather than
producing an unsound verdict (N7).

**[1]–[2] Parse and slice.** ProLeap gives AST plus an Abstract Semantic Graph
carrying data and control flow. Slice on business-concept variables — the method
COBREX and the model-based frameworks use. If ProLeap's Java/Python boundary
costs too much time, fall back to a paragraph-level sectioniser; do not let the
parser become the project (`../04 §7`).

**[3] Extract.** One bounded LLM call per slice. Output constrained to a schema:

```json
{
  "id": "R-04",
  "statement": "Balances above ₹1,00,000 earn the differential rate.",
  "lines": [212, 213, 214, 215],
  "boundary": { "variable": "WS-BAL", "op": ">", "value": "100000.00", "type": "decimal" },
  "regulation_ref": "MD Interest Rate on Deposits, savings — differential rate above ₹1 lakh"
}
```

`lines` is written by the pipeline from the slice, never by the model (N6).
`boundary` is optional; its absence means the rule cannot be discrimination-tested
and is reported as *unproven — boundary not derivable*.

**[5] Generate inputs.** Three sources, in priority order:

1. **Rule-directed** (N5) — for each rule with a boundary *b*, emit *b−ε*, *b*,
   *b+ε* at the field's declared precision. For rounding rules, search for inputs
   whose accrual lands on an exact midpoint. For date rules, emit 28/29 Feb,
   month ends, quarter ends, the 31st.
2. **`PIC`-derived sweep** — the picture clause defines the domain, sign and
   extremes for free. Zero, negative, maximum, one past maximum.
3. **Random fill** — volume, to catch what the first two missed.

**[7]–[9] Execute and compare three ways.** The regulation model is a peer, not
an authority: it is consulted, and it is scoped only to what RBI states
explicitly. The four-cell classification is in `02 §N1`.

**[11] Rule verdict.** The heart of the system (N2, N3):

```
for each rule R:
    reached        = any input executed R.lines
    discriminating = ∃ inputs on both sides of R.boundary
                     with DIFFERENT legacy outputs
    agreed         = legacy == rewrite on all inputs touching R.lines

    if not reached:                    UNPROVEN  (never exercised)
    elif not R.boundary:               UNPROVEN  (boundary not derivable)
    elif not discriminating:           REFUTED   (boundary not live — evidence against the rule)
    elif not agreed:                   FAILED    (divergence; see counterexample)
    else:                              PROVEN
```

Five outcomes in the implementation, three in the report — FAILED rolls into the
divergence list, which is where an engineer wants it.

**[12] Mutate.** Textual operators on the legacy source (N4): threshold shift,
comparison flip, `ROUNDED` removal, scale change, constant perturbation,
day-count swap. Recompile, rerun the corpus, record whether any output changed.
Report the kill rate **per rule**, so a proven rule with a surviving mutant gets
downgraded — that is the corpus admitting it did not really test the rule.

---

## Report structure

**Page 1 — Verdict.** Rules extracted: 47. Proven 31 · Unproven 11 · Refuted 5.
Divergences: 3. Mutation kill rate: 94%. Compliance findings: 1.

**Page 2 — Divergences**, materiality-ranked (N9), each with a delta-debugged
minimal counterexample (N10).

**Page 3 — Refuted rules.** The extraction layer's errors, with the
counterexample that contradicts each. *"Here is where our own AI was wrong, and
here is the input that proves it."*

**Page 4 — Unproven rules.** Named, with the reason: never exercised, or
boundary not derivable.

**Page 5 — Compliance findings** (N1). The three-way classification, with the
clause each finding is measured against, framed as *warrants review*.

**Appendix — the evidence bundle** (N8). Full corpus, all outputs, tool versions,
source hashes.

---

## Build order

Follows `../04 §7`, with the novelty stages marked.

| Stage | Deliverable | Novelty | Cut priority |
|---|---|---|---|
| 0–2 | GnuCOBOL running; differential harness; `PIC`-derived inputs | — | Never cut. This is the spine. |
| 3 | Slice → LLM rules with pipeline-written citations | N6 | Simplify before cutting |
| 4 | Rule-directed boundary generation | N5 | **Protect** |
| 5 | Three-valued rule verdict with discrimination test | **N2, N3** | **Protect — this is the core** |
| 6 | Regulation model + three-way compare | **N1** | **Protect — this is the differentiator** |
| 7 | Delta debugging | N10 | Cheap; keep |
| 8 | Mutation certification | N4 | First to cut if time runs out |
| 9 | Intake gate | N7 | Cheap; keep |
| 10 | Materiality + evidence bundle | N8, N9 | Presentation; do last |

**Minimum viable novel system:** stages 0–2, 4, 5, 6. Everything else is
strengthening. A demo with the differential harness, the three-valued rule table
and one compliance finding is a complete argument.
