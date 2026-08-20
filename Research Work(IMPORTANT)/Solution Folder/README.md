# Solution Folder

Design options for the Legacy Banking Modernisation Platform, and the specific
novelty claims worth defending.

Written against the evidence in `../01`–`../06`. Every "this is novel" statement
here has been checked against the vendor landscape in `../03 - Competitive
Landscape.md` and the academic prior art in `../02 - Solution Research.md`.
Where the check was inconclusive, it says so.

---

## Files

| File | Contents |
|---|---|
| `01 - Solution Options.md` | Nine candidate architectures, from "documentation generator" to "formal equivalence proof". What each is, what it costs to build, what prior art it collides with, and why eight of them are wrong for this team. |
| `02 - Novelty Proposals.md` | Ten specific novelty claims, ranked by strength. Each with: the claim, the prior art it must survive, how to build it, how to demo it, and how it fails. |
| `03 - Recommended Architecture.md` | The composite design: components, data model, pipeline, and what each stage outputs. |
| `04 - Pitch Language.md` | The novelty compressed to slide-length and question-length. |

---

## The recommendation in one page

**Build the differential harness as the spine. Add three things on top of it.
Those three things are the entire novelty claim.**

The spine — compile the COBOL with GnuCOBOL, run both implementations on
generated inputs, diff — is prior art (IBM, AWS, Mechanical Orchard). It is
still the right foundation, because everything else depends on it and it is the
part that actually works. Do not pretend it is new.

The three additions, in descending order of strength:

### 1. Three-way conformance: legacy vs rewrite vs regulation

Every existing tool treats the legacy program as ground truth *by definition*.
That is the one assumption in the entire category that nobody has questioned —
and it is wrong, because a forty-year-old accrual engine can be non-compliant
with a Master Direction issued in 2025.

Add a third reference: a small executable model derived from RBI's stated rules
(daily product basis, uniform rate to ₹1 lakh, rounding to nearest rupee for
rupee deposits). Now a divergence has four possible readings instead of one, and
the most valuable one — *legacy and rewrite agree with each other and both
breach the regulation* — is invisible to every two-way tool on the market.

This is the strongest idea in this folder. See `02 §N1`.

### 2. Three-valued rule verdicts, with a real definition of "proven"

The submitted write-up promises *verified* and *unproven*. Add **refuted**, and
define *verified* properly.

A rule is not proven because the lines it came from were executed. It is proven
when inputs on both sides of its boundary produced *different* outputs — showing
the rule actually governs behaviour — and both implementations agreed on all of
them. A rule whose boundary makes no difference to the output is not verified;
it is evidence that the extraction layer hallucinated. That rule gets marked
**refuted**, and refuted rules are the most valuable output the system produces,
because they are the ones an engineer would otherwise have built on.

**Verified and narrowed:** rule-level reporting itself is *not* original —
AgentModernize's Business Rule Preservation Score does it, against human
gold-standard rules. What survived falsification is the **discrimination
condition** and the **refuted** verdict on rules the system extracted itself.
See `02 §N2`, `§N3` and `../07 - Verification Pass.md §C3`.

### 3. Mutation-certified corpus adequacy

The obvious attack on the whole project: *"your inputs all passed — so what?"*

Answer it by mutating the **legacy** program — move a threshold by one, flip `>`
to `>=`, remove a `ROUNDED` — and checking that the input corpus detects each
mutant. A corpus that cannot detect a deliberate one-rupee change to the
threshold does not prove anything about that threshold. This converts the
equivalence claim from a binary pass into a measured one: *"this corpus kills 94%
of injected mutations in the accrual logic; the 6% it misses are in these
paragraphs."*

Mutation testing is a textbook technique. Using mutants of the **oracle** to
certify the adequacy of a **migration equivalence claim** is the novel
combination, and it is the answer to the hardest question in `../05`. See
`02 §N4`.

---

## If only one novel thing can be built

**Build #2 — the three-valued rule verdict.** It is the cheapest of the three,
it is the direct extension of what the submission already promises, it produces
the single best slide (*"of 47 rules, 31 proven, 11 unproven, 5 refuted — here
are the 5"*), and it degrades gracefully: even a partial implementation produces
a meaningful table.

**Build #1 second** — it needs one hand-written regulation model, roughly 60
lines, and it transforms the pitch from a testing tool into a compliance
instrument, which is what a banking judge is listening for.

**Build #3 third** — it is the most technically impressive and the least
necessary. It wins the Q&A, not the pitch.
