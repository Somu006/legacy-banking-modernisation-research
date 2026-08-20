# 02 — Solution Research

The technical foundations under each stage of the proposed system, and what the
literature says works.

---

## 1. The idea has a name, and a forty-year literature: the test oracle problem

The submission's central move — *"the legacy program already defines the right
answer by running"* — is a known and respected technique. Naming it correctly
makes the pitch stronger, not weaker.

**The test oracle problem** is the difficulty of determining the expected output
for a test case, and of deciding whether the actual output is acceptable. It is
the reason testing undocumented systems is hard. The canonical survey is Barr,
Harman, McMinn, Shahbaz and Yoo, *The Oracle Problem in Software Testing: A
Survey* (IEEE TSE, 2015).

There are three standard ways around it:

| Technique | How it dodges the oracle | Fit here |
|---|---|---|
| **Differential testing** | Run two implementations on the same input; disagreement is a bug in one of them. | **This is the project.** |
| **Metamorphic testing** | Assert relations between outputs of related inputs (e.g. doubling the balance should not decrease interest) without knowing either value. | Useful *secondary* technique — see §6. |
| Intramorphic testing | Compare against a deliberately modified version of the system itself. | Not applicable. |

Differential testing is described in the literature as *"a common practice to
alleviate the oracle problem"* — transforming it into a more easily derived
form by comparing multiple implementations on the same generated inputs.

**The industrial precedent to cite: Diffy.** Built at Twitter, later used at
Airbnb, Baidu and ByteDance, and open-sourced. Diffy runs new and old service
instances side by side, multicasts each request to both, and compares
responses to report regressions. Its stated premise: *if two implementations
return similar responses across a sufficiently large and diverse set of
requests, they can be treated as equivalent.* The Twitter engineering post was
titled "Testing services without writing tests."

The same idea appears in banking practice as **dual-run / parallel-run
migration**: dual-write (every transaction hits both cores, discrepancies
surface immediately), shadow accounting (new core processes real transactions
but output is not used for settlement), and blue-green cutover. Practitioners
are explicit that *dual-running without automated reconciliation creates false
confidence* — which is precisely the gap a rule-level verdict fills.

**What this gives the pitch:** the mechanism is not speculative. It is what
Twitter did to its services and what banks already do at cutover. The project's
contribution is applying it *before* the cutover decision, at the level of
individual business rules, on a laptop, with no mainframe required.

---

## 2. Why LLM translation needs this — the quantitative case

| Finding | Source |
|---|---|
| LLM code translation correct in **2.1%–47.3%** of cases across 1,700 samples; 1,748 labelled bugs in **15 categories** | *Lost in Translation*, arXiv 2308.03109 |
| *"The resulting code cannot be trusted to correctly translate the original code"* | IBM Research, *Automated Testing of COBOL to Java Transformation*, arXiv 2504.10548 |
| COBOL is a **low-resource language** for LLMs, with distinctive logic patterns causing severe accuracy degradation; a symbolic-execution + delta-debugging repair loop improves accuracy by **at least 12%** over state of the art | SEDCoT, arXiv 2607.04092 |
| Subtle operator-semantics differences produce **silent** failures (canonical case: modulo on negative operands differing between Python and Java/C) | arXiv 2605.02195 |
| Code-summarisation hallucination rates measured as high as **66%**, reduced to 59% by mitigation | *Hallucinations in LLM-Based Code Summarization*, PACMSE 2026 |

That last row is the direct evidence for the submission's line *"a confidently
stated wrong rule is more dangerous than no rule at all."* It is not a rhetorical
flourish — hallucination in code *explanation* (not generation) is a measured
phenomenon with published rates.

**One more finding worth building on.** A 2026 controlled study comparing
deterministic orchestration against fully agentic, LLM-controlled orchestration
for COBOL-to-Python modernisation held models, prompts, tools and source
programs constant and varied only the control strategy. Deterministic
orchestration **matched** agentic accuracy while reducing token consumption by
**up to 3.5×** and improving worst-case robustness and run-to-run variance. The
authors conclude that structured modernisation workflows with validation stages
should use deterministic execution.

**Implication for the build:** a fixed pipeline (parse → extract → generate
inputs → run both → diff → verdict) with LLM calls at specific bounded points
is not the naive design; it is the *empirically better* one. Say so — it turns
what looks like a simplification into a defended architectural choice.

---

## 3. The arithmetic is where the bugs actually are

This section is the technical heart of the demo. It is also the most concrete
thing the team can show a judge.

### COBOL's number model

COBOL financial fields are typically `USAGE PACKED-DECIMAL` (`COMP-3`): each
digit stored in 4 bits, with a trailing 4-bit sign nibble. Packed decimal
represents decimal numbers **exactly** — no binary-fraction rounding error —
which is why it is used for money. A `PIC S9(7)V99 COMP-3` field means precisely
seven integer digits and two decimals, and the compiler enforces truncation at
that boundary.

COBOL arithmetic statements also carry an explicit `ROUNDED` phrase, and
`ON SIZE ERROR` handling for overflow. The rounding behaviour is part of the
statement, not a library default.

### Where a rewrite goes wrong

- **Using `double`/`float` in Java.** IBM's own COBOL/Java interoperability
  documentation warns that conversions between COBOL `COMP-1`/`COMP-2` and Java
  `float`/`double` may lose precision because the underlying representations
  differ. Binary floating point cannot represent 0.1 exactly; decimal can.
- **The correct target is `BigDecimal`**, with an explicit scale and an explicit
  `RoundingMode`. `BigDecimal` is both the documented legal partner for zoned
  and packed decimal items in COBOL/Java interop, and what Micro Focus COBOL
  uses under the covers when compiling to JVM bytecode.
- **Getting `BigDecimal` but the wrong `RoundingMode`.** `HALF_UP` versus
  `HALF_EVEN` (banker's rounding) differ only on exact midpoints — a case that
  arises rarely per account and constantly across millions of accounts. This is
  the bug class that is invisible in unit tests written by the rewrite team and
  obvious to a differential harness that generates midpoint inputs deliberately.
- **Truncation points.** COBOL truncates at the `PIC` boundary on every
  intermediate store. A Java rewrite that keeps full precision through a chain
  of operations and rounds once at the end produces a *different, arguably more
  correct*, and therefore non-compliant answer.

### The regulatory hook — build the demo on this

RBI's Master Direction on Interest Rate on Deposits specifies:

1. Interest on domestic rupee savings deposits is calculated on a **daily
   product basis** — "daily product" meaning interest applied on the end-of-day
   balance.
2. A **uniform rate** on balances up to ₹1 lakh, irrespective of amount within
   that limit; **differential rates permitted** on end-of-day balance above ₹1
   lakh.
3. **All transactions involving payment of interest on deposits shall be
   rounded off to the nearest rupee** for rupee deposits; **two decimal places**
   for FCNR(B) deposits.

Item 2 gives a **threshold boundary at ₹1,00,000** — test 99,999 / 1,00,000 /
1,00,001. Item 3 gives a **rounding midpoint** — an accrual landing on ₹x.50.
Item 1 gives **date boundaries** — month ends, quarter ends, 29 February,
accounts opened on the 31st.

Those are not invented edge cases. They are the boundaries the regulator itself
defines, and a demo that finds a divergence at exactly one of them is
self-evidently meaningful to a banking judge.

### Day-count conventions — the other family of divergence

Interest accrual depends on the day-count basis: 30/360 (every month 30 days,
year 360), Actual/365, Actual/360, Actual/Actual. India uses 30/360 for
G-Secs. The choice materially changes the accrued amount, and a legacy program's
convention is frequently *implicit* in the arithmetic rather than named
anywhere. A rewrite that assumes Actual/365 against a legacy 30/360 produces
plausible, wrong numbers on every account, every day. This is a textbook case
of a rule that exists only in the code.

---

## 4. Stage 01 — extraction: what already works and how well

Business-rule extraction from COBOL is an established research line. Knowing
the numbers protects the team from overclaiming.

| Approach | Method | Reported performance |
|---|---|---|
| **COBREX** | Rule-based; control-flow-graph slicing on business variables | F1 ≈ 0.59 against ground truth |
| **A-COBREX** (ICSE 2025 demo, IBM Research) | Extends to rules involving multiple business variables | Precision 62.21%, recall 74.12% (fuzzy match, 27 annotated programs) |
| **COBRAIN** (EASE 2025) | LLM, few-shot prompting | Precision 1.0 / recall 0.746 vs COBREX; F1 0.73 vs ground truth |
| Cosentino et al. | Model-based framework: represent COBOL as a model, identify business-concept variables, slice | Foundational, pre-LLM |

Two things to take from this table:

1. **Even the best published extractor is wrong roughly a quarter to a third of
   the time.** The submission's refusal to ship extraction as the deliverable is
   not modesty; it is the correct reading of the state of the art.
2. **LLM extraction beats rule-based extraction** (COBRAIN F1 0.73 vs COBREX
   0.59), so using a model for this stage is defensible — provided the output is
   verified downstream.

A known structural failure mode, worth quoting: automated rule-extraction
techniques that query for code structures and variables are *"high recall, low
precision"*, producing lists dense with false positives. That is exactly the
condition that makes traceability essential — an engineer needs to confirm or
reject each candidate rule by reading three lines, not four thousand.

**Slicing is the mechanism to name.** Program slicing on business-concept
variables is how both COBREX and the model-based frameworks isolate a rule. It
also naturally produces the line-level provenance the submission promises,
because a slice *is* a set of source lines. This is worth saying explicitly:
traceability is not bolted on, it falls out of the extraction method.

---

## 5. Stage 03 — input generation, the acknowledged hard part

The submission already names this as the limiting factor. The literature agrees
and offers four families of technique.

**a) Rule-directed boundary value analysis.** Derive boundaries from the
extracted rules and test at, just below, and just above each. Cheapest to
build, highest yield per unit of effort, and it is the mechanism that closes the
reciprocal loop. A 2025 paper on LLM-driven boundary-value input generation
found prompt-engineered boundary generation effective for fault detection and
coverage — relevant because the boundaries here come from natural-language rules.

**b) Symbolic / concolic execution.** Replace inputs with symbolic values,
accumulate path constraints, solve with an SMT solver to obtain inputs reaching
each path. KLEE is the reference implementation for C/C++. **Directly relevant
precedent:** IBM's WCA4Z testing framework uses *symbolic execution to generate
unit tests from COBOL programs* (mocking external dependencies) and converts
them to JUnit to validate the Java translation. SEDCoT likewise uses
symbolic execution with LLM guidance to generate suites that expose semantic
discrepancies. The known limitation: treating all inputs as symbolic produces
formulae that blow up within a few nested conditions.

**c) Grammar-aware random / property-based generation.** Cheap volume from the
`PIC` clauses themselves — a `PIC S9(7)V99` field defines its own valid domain,
sign, and extremes. Good for breadth; will not find a rounding bug alone, as
the submission correctly notes.

**d) Delta debugging on failures.** SEDCoT's third phase: once a divergence is
found, shrink the failing input to a minimal counterexample. This is what turns
"these 400 inputs diverge" into "the divergence occurs whenever the accrual
lands on an exact half-paisa." Cheap to implement, disproportionately valuable
for the demo, and it is what makes a finding *actionable* rather than merely
reported.

**Recommended combination for a hackathon build:** (a) as the headline
mechanism, (c) for volume, (d) for presentation quality. Mention (b) as the
scaling path and cite the IBM precedent — do not attempt to build it.

---

## 6. Metamorphic relations — a cheap second safety net

Where a rule is extracted but the differential run cannot reach it, metamorphic
relations can still assert something. Domain-obvious relations for interest
accrual:

- Monotonicity: higher principal at the same rate over the same period must not
  produce lower interest.
- Additivity across periods: accruing Jan then Feb should equal accruing
  Jan–Feb, under a stated convention.
- Zero: a zero balance accrues zero.
- Scaling: doubling the principal under a flat-rate tier doubles the interest.

These hold without knowing the correct value, so they apply to inputs the
differential harness has not exercised. Worth one line in the deck as evidence
of depth; not worth building first.

---

## 7. Honest assessment of the "reciprocal loop"

The submission's strongest original claim is that extraction and verification
strengthen each other. Testing that claim against the literature:

**Supported.** SEDCoT is a working instance of one direction — symbolic
execution generating tests that expose semantic errors, then feeding repair.
The WCA4Z framework explicitly generates *feedback to improve the underlying
model*. So "verification improves generation" is established.

**Thin in the literature.** The other direction — *extracted natural-language
business rules driving the input generator's choice of boundaries* — is not
something the surveyed work does. Rule extraction and translation validation
are separate research lines with separate tools and separate papers.

**Partially found — corrected after verification.** A per-rule verdict is *not*
unprecedented. **AgentModernize** (arXiv 2605.17535) defines a **Business Rule
Preservation Score**: the percentage of gold-standard rules represented in the
modernised output, counted as preserved when the rule appears in the behavioural
specification *and* the modernised code enforces it, as verified by targeted
tests. That is rule-level reporting.

**What remains open**, checked against that paper: BRPS scores against
**human-annotated gold-standard rules** — presupposing the very artifact a bank
does not have — whereas the verdict proposed here applies to rules the system
extracted itself with no ground truth. And nothing surveyed requires a rule's
boundary to be *behaviourally live* before calling it verified, or issues a
**refuted** verdict when the evidence contradicts the rule.

**So the contribution is narrower than first claimed**: not per-rule reporting,
but the discrimination condition and the refutation verdict on self-extracted
rules. See `07 - Verification Pass.md §C3`.

**Take this pair of numbers from that paper.** AgentModernize's specification
graph captured **91.2% of gold-standard rules**, while its Behavioural
Equivalence Rate reached only **9.4%–19.4%** across models, with baselines at
**0.0%**. Extraction works; behavioural equivalence does not follow from it.
That is the sharpest single argument in this dossier for why verification, not
extraction, is the product.
