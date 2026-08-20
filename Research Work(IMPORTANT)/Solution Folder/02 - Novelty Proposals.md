# 02 — Novelty Proposals

Ten claims, ranked by strength. Each states what the claim is, the prior art it
must survive, how it is built, how it demos, and how it fails.

**Strength** combines three things: how open the prior art actually is, how
defensible the claim is under a hostile question, and how much of it a student
team can build.

---

## N1 — Three-way conformance: legacy vs rewrite vs regulation

**Strength: highest. Build cost: low. This is the idea to lead with.**

### The claim

Every tool in this category — IBM's Validation Assistant, AWS Blu Age Compare,
Mechanical Orchard's Imogen — treats the legacy program as ground truth *by
definition*. That assumption is load-bearing and unexamined, and it is wrong in
one specific, important case: **a program written in 1987 can be non-compliant
with a Master Direction issued in 2025.**

The submitted write-up says "the legacy system is its own oracle." That is true
for **equivalence** and false for **correctness**. Adding a third reference —
a small executable model derived from the regulator's stated rules — makes the
gap between those two visible.

### The classification this produces

With three references, a given input falls into one of four cells:

| Legacy | Rewrite | Regulation | Reading | Who needs to know |
|---|---|---|---|---|
| = | = | = | Verified compliant | Sign-off |
| ≠ | — | — | **Translation defect** | The migration team. This is the only cell two-way tools can see. |
| = | = | ≠ | **Inherited compliance defect** — the rewrite faithfully reproduces a breach that has been running for decades | Compliance and the board. Invisible to every other tool. |
| ≠ | rewrite = reg | — | **Silent correction** — the rewrite "fixed" something. This is a migration *risk*, not a win: the bank's books change at cutover, and someone has to authorise that | Finance and audit |

That third row is the one worth the slide. That fourth row is the one that shows
sophistication — most people's instinct is that a rewrite matching the
regulation is good news, and in a bank it is an unplanned restatement.

### How to build it

Hand-write a small reference model — Python or Java, roughly 60–100 lines —
implementing only the rules RBI states explicitly and unambiguously for savings
deposits: interest on a daily product basis (applied on end-of-day balance),
a uniform rate on balances up to ₹1 lakh, differential rates permitted above,
and payment of interest rounded off to the nearest rupee for rupee deposits
(two decimal places for FCNR(B)).

Do not attempt to model anything the Direction does not state. The model's value
comes entirely from its narrowness — every line of it traces to a clause.

### How it demos

> "The rewrite matches the legacy exactly. Both round to two decimals. RBI says
> round to the nearest rupee. This bank has been non-compliant since before the
> Direction was issued, and a faithful migration would have carried the breach
> forward for another forty years."

### How it fails

- **Over-modelling.** If the model encodes anything the regulator did not
  actually say, every "compliance finding" is really a finding about the team's
  own interpretation. Mitigation: every rule in the model carries the clause it
  came from, and the model refuses to guess.
- **Scope creep.** Bank-specific product terms, board-approved rate cards and
  legacy grandfathering all legitimately override defaults. The model covers the
  arithmetic conventions, not the commercial terms. Say this before it is asked.
- **The tool is not a compliance authority.** Frame the output as *"this warrants
  a compliance review"*, never as *"this is a breach."*

### Prior art check

Searched vendor documentation and the extraction/validation literature (`../06`).
No tool found that introduces a normative third reference. The reason appears
structural rather than accidental: these are migration products, and a migration
product that tells you your current system is non-compliant is selling a problem
its customer did not ask about. A student project has no such constraint.

---

## N2 — Discriminating rule coverage: a real definition of "proven"

**Strength: high. Build cost: medium. This is the core.**

### The claim

The submitted write-up promises *verified* and *unproven*. The weak version of
that is line coverage: the rule's lines were executed, therefore the rule is
verified. That version is wrong, and a judge with a testing background will find
the hole immediately — a line can be executed a thousand times without the rule
it encodes ever mattering to the output.

**The proposed definition.** A rule *R* with boundary *b* is **proven** when:

1. **Reached** — some input executed the source lines in *R*'s slice; *and*
2. **Discriminating** — inputs exist on both sides of *b* whose *legacy outputs
   differ*, demonstrating that the boundary actually governs behaviour; *and*
3. **Agreed** — the reimplementation matched the legacy on every one of those
   inputs.

Condition 2 is the whole idea. It is what separates "we ran this code" from
"we tested this rule."

### Prior art check — narrowed after verification

**Rule-level reporting is not original.** AgentModernize (arXiv 2605.17535)
defines a **Business Rule Preservation Score**: gold-standard rules counted as
preserved when they appear in the behavioural specification *and* the modernised
code enforces them, as verified by targeted tests.

**What survives.** BRPS scores against **human-annotated gold-standard rules** —
which presupposes the artifact a bank does not have. The verdict here applies to
rules the system extracted itself, with no ground truth. And nothing surveyed
requires the boundary to be *behaviourally live* before calling a rule verified.

So claim **the discrimination condition**, not per-rule reporting. Standard
coverage tooling in this space is still JaCoCo — Java line and branch coverage.
See `../07 - Verification Pass.md §C3`.

It also does real work: condition 2 fails exactly when the extraction layer has
invented a rule that is not in the program. Which is N3.

### How to build it

Slicing gives each rule a line set for condition 1. gcov (or paragraph-level
`DISPLAY` tracing — see `../04 §3`) gives per-input line hits. The rule's stated
boundary gives the input triple for condition 2. Condition 3 is the diff you
already have.

### How it demos

A table. Three columns: rule, verdict, evidence.

> R-04 · "Balances above ₹1,00,000 earn the differential rate" · **PROVEN** ·
> 1,00,000 → ₹287; 1,00,001 → ₹328; both implementations agreed on 6 inputs
> spanning the boundary.

### How it fails

Multi-variable and path-dependent rules do not have a single scalar boundary,
so the triple generalises awkwardly. A-COBREX exists specifically because rules
involving multiple business variables are hard. Mitigation: handle scalar
threshold rules properly and mark multi-variable rules as *unproven — boundary
not derivable*, which is honest and consistent with the whole design.

---

## N3 — The third verdict: **refuted**

**Strength: high. Build cost: very low once N2 exists. Best value per hour.**

### The claim

Two verdicts are not enough. A rule that is *reached* but *not discriminating* —
the lines ran, inputs on both sides of the stated boundary produced identical
output — is not merely unproven. It is **evidence against the rule as stated**.
Either the boundary is somewhere else, or the branch is dead, or the extraction
layer hallucinated it.

Mark it **refuted**, and put refuted rules at the top of the report.

### Why it matters

The submitted write-up's own argument is that a confidently stated wrong rule is
more dangerous than no rule, because an engineer will build on it. Measured
hallucination rates in code summarisation reach 66%; the best COBOL rule
extractors sit around F1 0.73. So wrong rules are not a hypothetical — they are
the expected case for roughly a quarter of the output.

A system that only distinguishes *proven* from *unproven* dumps every
hallucinated rule into the same bucket as every merely-untested one. The refuted
bucket is where the extraction layer's lies go, and surfacing them is the
strongest possible demonstration that the verification layer is doing its job.

### How it demos

This is the moment that proves the whole thesis in one screen:

> R-11 · "Accounts dormant for more than 24 months accrue at the base rate" ·
> **REFUTED** · lines 331–348 executed on 214 inputs; dormancy set to 23 and 25
> months produced identical output in both implementations. No such boundary
> exists in the program. The rule was hallucinated.

An AI system catching its own AI lying, with a reproducible counterexample, is a
better demo than any correct output.

### How it fails

A rule can be non-discriminating for a legitimate reason — the input generator
never varied the right field, or the boundary is masked by an earlier condition.
So *refuted* must mean **"contradicted by the evidence we have"**, not
**"false"**. Report the counterexample alongside the verdict so a human can
adjudicate. Getting this wording wrong turns a strength into an overclaim.

---

## N4 — Mutation-certified corpus adequacy

**Strength: high. Build cost: medium. Wins the Q&A.**

### The claim

The hardest question in `../05` is: *"everything passed — what have you actually
proved?"* Coverage percentages do not answer it. This does.

**Mutate the legacy COBOL** — the oracle itself — and check that the input
corpus detects each mutant. Report the kill rate as the measured strength of the
equivalence claim.

If moving a threshold from 10,000 to 10,001 in the legacy program does not cause
a single input in the corpus to produce a different answer, then the corpus does
not prove anything about that threshold, and the equivalence claim over that
rule is worth nothing regardless of how many tests passed.

### Mutation operators, all textual and cheap

| Operator | Example | Rule class it probes |
|---|---|---|
| Threshold shift | `100000` → `100001` | Tier boundaries |
| Comparison flip | `>` → `>=` | Off-by-one at boundaries |
| Rounding removal | delete `ROUNDED` | Rounding conventions |
| Scale change | `PIC S9(7)V99` → `V999` | Truncation points |
| Constant perturbation | rate `3.5` → `3.6` | Rate application |
| Day-count swap | `360` → `365` | Accrual convention |

Each operator maps to a rule class, so the kill rate can be reported **per rule**
rather than as one global number — which composes directly with N2.

### How it demos

> "Our corpus kills 47 of 50 injected mutations in the accrual logic. The three
> survivors are all in the dormancy paragraph, which is why R-11 and R-14 are
> marked unproven rather than verified. We are telling you what we did not test."

### How it fails

- **Equivalent mutants** — a mutation that genuinely does not change behaviour
  cannot be killed by anyone, and inflates the miss rate. This is the classic
  problem in mutation testing; with textual operators on numeric constants it is
  rarer than usual, but say so before it is asked.
- **Cost** — every mutant needs a recompile and a full corpus run. Bound the
  operator count and the corpus size; this is a demo, not a nightly job.

### Prior art check

Mutation testing is textbook. **Using mutants of the legacy oracle to certify
the adequacy of a migration equivalence claim** was not found in any surveyed
product or paper. Claim the combination, not the technique — and say the
technique is old, which strengthens rather than weakens the claim.

---

## N5 — Rule-directed input generation (the reciprocal loop, input side)

**Strength: medium-high. Build cost: medium. Already in the write-up.**

### The claim

Existing tools generate test inputs from *code structure* (IBM: symbolic
execution over the COBOL) or capture them from *production traffic* (AWS,
Mechanical Orchard). None derives them from the **extracted natural-language
rules**. Doing so means the extraction layer earns its place in the verification
pipeline instead of being a parallel deliverable.

Concretely: a rule stating a uniform rate up to ₹1 lakh causes the generator to
emit 99,999 / 1,00,000 / 1,00,001. A rule mentioning rounding causes it to
search for accruals landing on an exact ₹0.50. A rule mentioning month-end
causes 28 and 29 February, 30 and 31, and quarter ends.

### Why it is only medium-high

It is the *mechanism*, and mechanisms are hard to defend as novel — a reviewer
can reasonably say "so you prompted for boundaries." Its real value is that it
makes N2 and N3 possible at all: without rule-derived boundaries there is
nothing to test discrimination against. Present it as plumbing that enables the
verdict, not as the headline.

### How it fails

Rules stated vaguely produce no boundary. Mitigation: constrain extraction
output to a schema with an optional typed `boundary` field, and treat a rule
without a derivable boundary as *unproven — boundary not derivable*. Not every
rule needs to yield a test.

---

## N6 — Structural provenance: citations that cannot be hallucinated

**Strength: medium. Build cost: low. Quiet but genuinely good.**

### The claim

The write-up promises every rule carries a pointer to the lines that produce it.
The naive implementation asks the model to cite line numbers — and models
hallucinate line numbers.

Instead: run extraction over **slices**. The slice defines the line set before
the model is called, so the citation is a property of the pipeline, not an
assertion by the model. The model cannot cite a line it was never shown.

This is an architectural guarantee rather than a mitigation, and it is the kind
of detail that signals the team understands where LLM systems actually break.
Slicing on business-concept variables is also exactly what COBREX and the
model-based frameworks do, so the method has precedent.

### How it fails

Slicing quality caps rule quality. A slice that misses a data dependency yields
a rule with incomplete provenance. Standard limitation; state it.

---

## N7 — Intake scope gate: the tool refuses work it cannot do soundly

**Strength: medium. Build cost: low. Excellent optics.**

### The claim

The excluded categories — CICS, JCL, database coupling, clock reads,
randomness — are not merely documented as out of scope. They are **statically
detected and explicitly refused, with a reason.**

ProLeap extracts `EXEC CICS` and `EXEC SQL` as text, so they are trivially
detectable. Clock intrinsics are a keyword scan. On finding one:

> `REFUSED — program reads CURRENT-DATE at line 88. Differential testing
> requires determinism: the same input must produce the same output on every
> run. This program cannot be verified by this method.`

### Why it matters

It is the same honesty argument as verified/unproven, moved to the front door.
Every tool that silently produces a confident answer on input it cannot handle
is generating exactly the liability this project exists to prevent. A tool that
knows its own boundary is a tool a bank can trust with the cases inside it.

### How it fails

Detection is incomplete — indirect non-determinism through a called subprogram
will slip past a keyword scan. Mitigation: a second signal, running each input
twice and flagging any output that differs from itself. Cheap, and it catches
what static detection misses.

---

## N8 — The evidence bundle as an audit artifact

**Strength: medium. Build cost: low. Product novelty, not technical novelty.**

### The claim

The output is not a report, it is a **reproducible evidence bundle**: extracted
rules with provenance, the complete input corpus, both implementations' outputs
for every input, per-rule verdicts, mutation kill rates, the regulation model and
its clause citations, plus tool versions and source hashes so the entire run can
be reproduced.

RBI's IT Governance Master Direction (effective 1 April 2024) requires regulated
entities to maintain a board-approved Change Management Policy. A core-engine
rewrite is therefore a board-visible, auditable event that needs evidence, not
assurances. This bundle is shaped to be that evidence.

### Why it belongs in the pitch

It reframes the deliverable from "a testing tool" to "the artifact someone can
sign", which is what the write-up already claims in Part 4 and what a banking
audience actually buys. And the specification and regression suite retain their
value even if the migration is cancelled — which removes the reason to defer the
decision.

### How it fails

It is packaging. If N2–N4 are not built, the bundle is a folder of nothing.
Build it last.

---

## N9 — Materiality-ranked findings

**Strength: low-medium. Build cost: low. Speaks the audience's language.**

### The claim

Rank divergences by projected rupee impact across an assumed portfolio
distribution rather than by count.

> "This divergence occurs on 0.3% of inputs. Across a ₹500 crore savings book it
> drifts approximately ₹X per quarter — and because RBI prescribes rounding to
> the nearest rupee, it is a Master Direction exposure, not a rounding
> preference."

### How it fails

The portfolio distribution is assumed, not measured. State that on the slide.
An unlabelled assumption presented as a number is the exact failure mode this
whole project is against.

---

## N10 — Delta-debugged minimal counterexample

**Strength: low as novelty, high as demo. Build cost: low.**

### The claim

When a divergence is found, shrink the failing input to a minimal
counterexample. "73 inputs diverge" becomes "the divergence occurs whenever the
accrual lands on an exact half-rupee."

**Not novel** — this is SEDCoT's third phase, and delta debugging is a
well-established technique. Build it anyway: it is perhaps forty lines of code
and it produces the single most convincing screen in the demo. Present it as
good engineering practice, not as a contribution.

---

## Ranking summary

Strengths below are **post-verification** (`../07 - Verification Pass.md §D`).

| # | Novelty | Strength | Build cost | Prior art |
|---|---|---|---|---|
| N1 | Three-way conformance vs regulation | **Highest — strengthened** | Low | Open. Locksmith and AgentModernize: no regulatory checks. EvolveWare markets rules for auditors but is static documentation only, with no execution. |
| N2 | Discriminating rule coverage | **Medium-high** (was High) | Medium | Partially taken — BRPS reports at rule level. The discrimination condition is open. |
| N3 | Refuted verdict | **High** | Very low | Open — survived intact |
| N4 | Mutation-certified adequacy | **Medium-high** (was High) | Medium | Locksmith uses *parity-preserving* mutations for path exploration — different purpose. Fault injection for adequacy still open. |
| N5 | Rule-directed input generation | Medium | Medium | Crowded — Locksmith's Witness Search generates inputs, though from structure not rules |
| N6 | Structural provenance | Medium | Low | Method has precedent |
| N7 | Intake scope gate | Medium | Low | Not found; minor |
| N8 | Evidence bundle | Medium | Low | Product framing |
| N9 | Materiality ranking | Low-medium | Low | Presentation |
| N10 | Delta debugging | Low | Low | **Prior art — do not claim** |

**The defensible novelty claim, after verification:**

> A verification harness that issues a runtime verdict on the business rules it
> **extracted itself** — proven, unproven, or **refuted** — where "proven"
> requires the rule's boundary to be demonstrably live; that measures the
> strength of its own claim by **injecting faults into the legacy oracle**; and
> that checks both implementations against the regulator's stated rules as a
> third reference, so it can tell a translation defect apart from a compliance
> breach the rewrite inherited faithfully.

Every clause of that survived a deliberate falsification attempt. The earlier
version of this claim also asserted the differential mechanism and per-rule
reporting as novel; **neither is** — the first is prior art in three products,
the second in AgentModernize.
