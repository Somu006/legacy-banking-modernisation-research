# 01 — Solution Options

The design space, honestly assessed. Nine candidate architectures for the same
problem. Eight are wrong for this team; the reasons are the interesting part.

Scoring: **Build cost** for a four-person student team with a few weeks.
**Prior art** — how crowded. **Demo strength** — how well it plays in a room.
**Soundness** — whether the claim it makes is actually true.

---

## Option A — Documentation generator

*Point an LLM at the COBOL, emit a business-rules document.*

| | |
|---|---|
| Build cost | Very low |
| Prior art | Extremely crowded — Cognizant, TCS MasterCraft, AWS Transform, IBM ADDI, plus COBREX / A-COBREX / COBRAIN in the literature |
| Demo strength | Superficially high, and that is the trap |
| Soundness | **Poor** |

**Reject.** This is the option the submitted write-up already argues against, and
the argument is correct. Best published extractors reach ~62% precision / 74%
recall (A-COBREX) and F1 ≈ 0.73 (COBRAIN). Measured hallucination rates in code
summarisation run as high as 66%. A document that is a quarter wrong, with no
marking of which quarter, is a liability generator: an engineer builds on it.

Worth keeping in the deck only as the *strawman* — "this is the obvious approach,
and here is the measured reason it fails."

---

## Option B — Pure differential harness

*No extraction. Generate inputs from the `PIC` clauses, run both programs, diff.*

| | |
|---|---|
| Build cost | **Low** — this is stages 0–2 of `../04 §7` |
| Prior art | Crowded (Diffy, Blu Age Compare, WCA4Z Validation Assistant) but the mechanism is sound |
| Demo strength | Medium — it works, but "we ran a diff" is not a pitch |
| Soundness | **High** — it claims exactly what it proves |

**Adopt as the spine, do not claim as the contribution.** Everything else in this
folder is built on top of it. It is also the safety net: if stages 3–5 collapse,
this alone still demonstrates a working system.

Its limitation is precisely why the other options exist: a passing diff over
inputs nobody chose carefully means very little, and it says nothing about
*which business rules* were exercised.

---

## Option C — Extraction plus differential testing, decoupled

*Run both A and B. Publish the rules. Publish the diff results. Separately.*

| | |
|---|---|
| Build cost | Medium |
| Prior art | **This is exactly what the market ships.** IBM WCA4Z: symbolic execution generates tests from the COBOL, separately from any rule extraction. AWS: Transform extracts rules, Application Testing replays captured traffic. Mechanical Orchard: behavioural capture from production flows, rules from AWS Transform |
| Demo strength | Medium |
| Soundness | High |

**Reject as the headline.** Two good halves that never touch each other. The
extraction output is unverified prose sitting next to a verification result that
has no idea the prose exists. It is the current state of the art, and it is
where the open seam is (`../03 §4`).

---

## Option D — Reciprocal loop with rule-level verdicts

*Extracted rules determine which inputs get generated; execution results
determine each rule's verdict.*

| | |
|---|---|
| Build cost | Medium — this is stages 3–5 |
| Prior art | **Open.** No surveyed tool derives test inputs from extracted natural-language rules; none reports coverage per business rule |
| Demo strength | **High** — produces the coverage table |
| Soundness | High, if "proven" is defined properly (see `02 §N2`) |

**Adopt. This is the core.** It is the submitted write-up's own "reciprocal loop"
made concrete, and it is what makes the extraction layer earn its place in the
pipeline rather than being a side deliverable.

---

## Option E — Three-way conformance against the regulation

*Add a regulation-derived executable model as a third reference alongside legacy
and rewrite.*

| | |
|---|---|
| Build cost | **Low** — one hand-written model of RBI's stated rules, ~60 lines |
| Prior art | **Open, and structurally so.** Every tool in the category treats the legacy program as ground truth by definition, so none of them can express "the legacy is wrong" |
| Demo strength | **Very high** for a banking panel |
| Soundness | High, provided the model's scope is stated narrowly |

**Adopt as the differentiator.** Full development in `02 §N1`. The key insight is
that "the legacy system is its own oracle" — the submission's central idea — is
true for *equivalence* and false for *correctness*, and the gap between those two
is where a compliance finding lives.

---

## Option F — Mutation-certified corpus adequacy

*Mutate the legacy program; check the input corpus detects each mutant; report
the kill rate as the strength of the equivalence claim.*

| | |
|---|---|
| Build cost | Medium — mutation operators on COBOL source are mostly textual |
| Prior art | Mutation testing is textbook; **applying it to the oracle to certify a migration equivalence claim was not found in any surveyed tool or paper** |
| Demo strength | Medium in the pitch, **very high** in Q&A |
| Soundness | **Very high** — it is the only option that quantifies its own confidence |

**Adopt if time allows.** It is the answer to "your tests all passed, so what?"
Full development in `02 §N4`.

---

## Option G — Formal / symbolic equivalence proof

*Symbolically execute both implementations; discharge equivalence to an SMT
solver.*

| | |
|---|---|
| Build cost | **Very high** |
| Prior art | Active research — KLEE for C/C++; IBM's WCA4Z framework uses symbolic execution on COBOL to generate JUnit tests; SEDCoT couples symbolic execution with delta debugging |
| Demo strength | High if it worked |
| Soundness | Highest of any option — proves *for all inputs*, not just the ones run |

**Reject for the build; cite as the scaling path.** Path explosion is the known
killer: treating all inputs as symbolic produces formulae that blow up within a
few nested conditions, and COBOL's decimal semantics would need faithful
encoding in the solver theory. This is a PhD, not a hackathon.

**But say it out loud.** "The stronger result is symbolic equivalence — that is
what IBM's own testing framework reaches for — and here is why we are not
claiming it" is a much better answer than being caught not knowing the
distinction. It is also the honest boundary of the word *verification*.

---

## Option H — Shadow run / production traffic replay

*Capture real transactions from the bank, replay against both systems.*

| | |
|---|---|
| Build cost | Low in principle |
| Prior art | Crowded and mature — Diffy, AWS Application Testing, Mechanical Orchard, and standard bank dual-run practice |
| Demo strength | Zero |
| Soundness | High |

**Reject: impossible and undesirable.** No student team has a bank's production
traffic, and requiring it is precisely the barrier that makes the vendor tools
unusable before a migration is funded (`../03 §3c`). Generating inputs instead of
capturing them is not a compromise forced by lack of access — it is the reason
the tool works at the decision stage.

---

## Option I — Metamorphic assurance for unreachable rules

*Assert domain relations that hold without knowing the correct answer:
monotonicity, additivity across periods, zero-balance, scaling within a tier.*

| | |
|---|---|
| Build cost | Low |
| Prior art | Established technique (Segura et al., ACM CSUR); not applied in this setting in anything surveyed |
| Demo strength | Low on its own |
| Soundness | Medium — relations are asserted by a human and could be wrong |

**Adopt as an optional secondary.** Its value is narrow but real: it says
*something* about rules the differential run never reached, which otherwise sit
permanently in the *unproven* column. One line in the deck as evidence of depth.
Do not build it before D, E or F.

---

## Option J — Materiality-ranked findings

*Rank divergences by projected rupee impact across a portfolio distribution
rather than by count.*

| | |
|---|---|
| Build cost | Low |
| Prior art | Not found, but this is a presentation layer, not a technique |
| Demo strength | **High** for a banking panel |
| Soundness | Medium — depends on an assumed portfolio distribution, which must be stated |

**Adopt as polish.** Turns "73 inputs diverged" into *"this divergence affects an
estimated 0.3% of accounts and drifts ₹X per crore of deposits per quarter."*
Cheap, and it speaks the audience's language. Be explicit that the portfolio
distribution is an assumption, not a measurement.

---

## Summary

| Option | Verdict | Role |
|---|---|---|
| A — Documentation generator | Reject | Strawman in the deck |
| B — Pure differential harness | **Adopt** | Spine; not a claim |
| C — Decoupled extraction + testing | Reject | This is the market; the seam is the opportunity |
| D — Reciprocal loop, rule verdicts | **Adopt** | The core |
| E — Three-way vs regulation | **Adopt** | The differentiator |
| F — Mutation-certified adequacy | **Adopt if time** | The credibility layer |
| G — Formal equivalence | Reject | Name it as the scaling path and the honest boundary |
| H — Production replay | Reject | Impossible; and its absence is the advantage |
| I — Metamorphic relations | Optional | Partial coverage of unproven rules |
| J — Materiality ranking | **Adopt** | Presentation polish |

The composite of B + D + E + F + J is the recommended system. `03 - Recommended
Architecture.md` assembles it.
