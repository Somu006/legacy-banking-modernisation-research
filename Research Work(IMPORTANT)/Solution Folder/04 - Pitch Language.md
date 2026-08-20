# 04 — Pitch Language

The novelty at four lengths. Use whichever fits the slot.

---

## One sentence

> Everyone proves the rewrite matches the legacy; we also ask whether the legacy
> matches the regulator — and we report the answer per business rule, including
> the rules we could not prove and the ones our own AI got wrong.

---

## One slide

**What everyone builds:** legacy in, rewrite in, diff the outputs. IBM, AWS and
Mechanical Orchard all ship this. They are right that verification is the
bottleneck.

**What they all assume:** that the legacy program is correct by definition.

**Three things we add:**

1. **A third reference — the regulation.** RBI prescribes daily product basis
   and rounding to the nearest rupee. When the legacy and the rewrite agree with
   each other and both breach the Direction, a two-way diff sees nothing and we
   see a compliance finding.

2. **Verdicts per business rule, not per test case.** Proven, unproven, refuted.
   A rule is only *proven* when inputs on both sides of its boundary produced
   different answers — proving the rule is actually live — and both
   implementations agreed. *Refuted* means our own extraction hallucinated it,
   and we show the input that proves it.

3. **We test our own tests.** We mutate the legacy program — move a threshold by
   one rupee, remove a `ROUNDED` — and measure whether our inputs notice. If they
   do not, we do not claim that rule is verified. The equivalence claim comes
   with its own strength score.

**And it runs on a laptop.** No mainframe, no production traffic, no licence —
just the source file and GnuCOBOL. Which means a bank can run it *before*
deciding whether to modernise at all.

---

## Thirty seconds, spoken

> The industry already agrees with us that verification is the bottleneck — IBM
> Research's own paper on their COBOL translation product says the output cannot
> be trusted. What nobody questions is the assumption underneath: that the
> legacy system defines the right answer. It defines the *current* answer. A
> program written in 1987 can be non-compliant with a Master Direction issued in
> 2025, and a perfectly faithful migration carries the breach forward.
>
> So we run three things, not two: the legacy, the rewrite, and a small model of
> what RBI actually prescribes. And we report per business rule — of forty-seven
> rules we extracted, thirty-one are proven by execution, eleven we could not
> prove, and five were contradicted by the evidence, which means our own
> extraction hallucinated them. We show you those five. Then we mutate the
> legacy program to check our inputs would have caught a one-rupee change to
> each threshold — because if they would not have, we have not proved anything,
> and we would rather say so.

---

## The demo, in the order it should be shown

1. **The COBOL.** A savings-accrual program. Four hundred lines, no comments.
   *"This is the specification. There is no other one."*

2. **The rules.** Twenty extracted, each with its line numbers.
   *"That took eleven seconds. Roughly a quarter of it is probably wrong, which
   is why this is not the product."*

3. **The corpus.** Boundaries derived from the rules themselves — 99,999 /
   1,00,000 / 1,00,001, accruals landing on exactly ₹0.50, 29 February.
   *"The rules tell us where to look."*

4. **The divergence**, delta-debugged to one line.
   *"Balance ₹1,00,000, twelve days at 3.5%. Legacy: ₹115. Rewrite: ₹116. The
   Java uses HALF_UP; the COBOL truncates. Across a five-hundred-crore book that
   is not a bug report, it is a rounding drift the auditor finds first."*

5. **The refuted rule.**
   *"Rule eleven says dormant accounts drop to the base rate. We tested 23 and
   25 months. Identical output, both sides. No such boundary exists — our own
   extraction invented it. An engineer would have built on that."*

6. **The compliance finding.**
   *"Here both implementations agree, and both round to two decimals. RBI says
   nearest rupee. This is not a migration defect. This has been running for
   forty years."*

7. **The coverage table.** 31 proven, 11 unproven, 5 refuted, 94% mutation kill
   rate.
   *"And these eleven, we could not prove. We are telling you which ones."*

Step 5 is the moment the room understands the thesis. Step 6 is the moment a
banker starts caring. Step 7 is why they would trust it.

---

## Lines to keep from the existing write-up

- *"The code is the specification."*
- *"A confidently stated wrong rule is more dangerous than no rule at all."*
- *"Coverage is reported rather than assumed."*
- *"Narrow scope is a design decision, not a limitation we hope nobody notices."*

## Lines to retire

- *"Everyone else's submission assumes their AI is right. Ours assumes it is
  wrong, and proves the answer anyway."* — true of the room, false of the
  market. Replace with the one-sentence version at the top of this file.
- Anything phrased as *"nobody does this"* about differential testing itself.
  Three vendors do. The rule-level verdict and the regulatory third reference
  are the claims that survive.

---

## The two hardest questions, answered from this folder

**"There's a paper from last week doing exactly this — Locksmith."**

> Yes, arXiv 2607.28271, published 30 July. Same spine: legacy as oracle, both
> targets off-mainframe, parity gate, 91.90% branch coverage. We'd rather you
> heard it from us. It's the best evidence we have that the architecture works —
> an industry team built it independently and got full parity on every accepted
> test. What it doesn't do, and we checked the paper for this specifically: no
> business-rule verdicts, and no regulatory checks. Its mutations are
> parity-preserving, used to reach new paths — the opposite of injecting faults
> to test whether your corpus would have noticed. That's the space we're in.

**"IBM already ships equivalence validation. What's new?"**

> Three things. They validate per test case; we report per business rule,
> including the ones we could not prove. They need IBM Z and captured mainframe
> traffic; we need a source file. And they treat the legacy as correct by
> definition — so if the legacy has been breaching a Master Direction since
> 1987, their tool certifies the rewrite as a success and never mentions it.
> Ours does.

**"Everything passed. What have you actually proved?"**

> Equivalence over the inputs we ran, and nothing more — which is why we mutate
> the legacy program and measure whether our corpus would have noticed. Ninety-
> four percent of injected mutations were caught. The six percent that survived
> are in the dormancy logic, which is exactly why those rules are marked
> unproven rather than verified. We are not claiming a proof for all inputs;
> that is symbolic equivalence checking, and it is a different and much harder
> problem. We are claiming evidence, and we are telling you how strong it is.
