# 07 — Verification Pass

Independent re-check of every load-bearing claim in this folder, done on
4 August 2026 against primary sources where they exist and two or more
independent sources where they do not.

**Outcome: 12 claims confirmed, 6 corrections, 1 novelty claim partially
falsified, and 1 piece of prior art found that is closer to this project than
anything in `03`.** Details below. The corrections have been applied to the
affected files; this page records what changed and why, so nothing is quietly
rewritten.

---

## A. Confirmed against primary sources

| # | Claim | Verification | Status |
|---|---|---|---|
| 1 | IBM says its own translation output cannot be trusted | arXiv 2504.10548 abstract, quoted verbatim: *"the resulting code cannot be trusted to correctly translate the original code"* | **Confirmed — safe to quote** |
| 2 | *Lost in Translation* figures | Abstract verbatim: *"correct translations ranging from 2.1% to 47.3% for the studied LLMs"*; 1,700 samples; 1,748 manually labelled bugs; 15 bug categories; 43K+ translations; 1,365 bug-fix pairs | **Confirmed** |
| 3 | Deterministic orchestration beats agentic on cost | arXiv 2605.09894 verbatim: *"Deterministic execution also reduces token consumption by up to 3.5x"* and *"achieves comparable computational accuracy to LLM-controlled orchestration while improving worst-case robustness and reducing performance variability across runs"* | **Confirmed** |
| 4 | RBI: daily product basis, ₹1 lakh threshold, nearest-rupee rounding | RBI primary source, with clause numbers — see correction **C1** on the year | **Confirmed (clauses), corrected (year)** |
| 5 | TSB fine £48,650,000 | FCA press release, *"TSB fined £48.65m for operational resilience failings"*; joint FCA/PRA; £32.7m redress | **Confirmed** |
| 6 | A-COBREX 62.21% precision / 74.12% recall; COBRAIN F1 0.73 vs COBREX 0.59 | Consistent across IBM Research publication page, ICSE 2025 listing, and the EASE 2025 ACM entry | **Confirmed** |
| 7 | GnuCOBOL passes 9,700 of 9,748 NIST tests | GnuCOBOL FAQ / Savannah project page | **Confirmed, with a new caveat — see C5** |
| 8 | BCG: Indian lenders need ~$1bn over 5–10 years | Business Standard reporting the BCG report *Cloud-based Core Transformations*, August 2024. New corroborating detail: ~80% of Indian bank IT budget goes to "run the bank" vs "change the bank" | **Confirmed** |
| 9 | IBM WCA4Z Validation Assistant checks semantic equivalence | Corroborated by IBM documentation summary, Futurum, VTI, and independently by arXiv 2504.10548, which describes the testing framework built for WCA4Z | **Confirmed** |
| 10 | Mechanical Orchard requires production data | mechanical-orchard.com/platform verbatim: Imogen *"verifies it against real production data, slice by slice"*, and *"reads your source directly"* | **Confirmed** |
| 11 | Cognizant markets rule extraction and spec generation | Cognizant's own blog: *"Existing applications can be reverse engineered to fill documentation gaps, interactively explain specific code, and extract business rules"* and generative AI can *"understand existing business logic and generate specifications for parity in new implementations"* | **Confirmed — plus a useful detail: that page describes no validation or equivalence testing at all** |
| 12 | TSB: 1.9 million customers locked out | Not in the FCA release, which says only *"all of TSB's branches and a significant proportion of its 5.2 million customers"*. The 1.9m figure is corroborated independently by The Register, IEEE Spectrum and The Courier | **Confirmed, but attribute to press reporting, not to the regulator** |

---

## B. The significant find: Locksmith

**arXiv 2607.28271 — *Agentic Method for Deterministic Validation of Legacy
Code Migration*, published 30 July 2026 — five days before this dossier was
compiled.**

It is closer to this project than anything in `03 - Competitive Landscape.md`.
What it does:

- Uses the legacy COBOL program as an **execution oracle**; a *"Parity Gate"*
  runs both targets on the same inputs and reports end-state discrepancies.
- **Runs both COBOL and Java off-mainframe on commodity hardware**, with
  external calls mocked.
- Generates inputs via *"Witness Search"* over input mocks to penetrate
  branches, then applies **parity-preserving mutations** to reach new paths.
- Identifies *"Locked Paragraphs"* — conditions blocking deeper exploration.
- Results: three case studies of 430–4,114 lines; 91.90% branch coverage on a
  production-like internal COBOL program; all accepted test cases matched.

**What this costs us.** The claim in `03 §3c` that every equivalent capability
requires a mainframe is true of *shipping products* (IBM Z, AWS's captured
mainframe traffic, Mechanical Orchard's production data flows) but **not of the
research frontier**. Say "every shipping product", not "everyone".

**What survives.** Verified explicitly against the paper: it reports **no
business-rule verdicts and no regulatory compliance checks**. Its mutations are
*parity-preserving* — used to reach new execution paths, the opposite purpose
from injecting faults to measure corpus adequacy. And it is agentic, which
arXiv 2605.09894 gives independent reason to think is the more expensive and
less stable choice.

**How to handle it in the pitch.** Do not hide it. A five-day-old paper from an
industry team independently building this architecture, and getting 91.90%
branch coverage with full parity, is the strongest possible evidence that the
approach is sound. Cite it as validation, then say precisely what it does not do.

---

## C. Corrections applied

### C1 · The RBI Master Direction year *(affects `01`, `02`, `06`, Solution Folder, visual 07)*

**What was written:** *Master Direction — Reserve Bank of India (Interest Rate
on Deposits) Directions, **2025**, 1 April 2025.*

**What is verified:** the clauses come from **Master Direction — Reserve Bank of
India (Interest Rate on Deposits) Directions, 2016** (3 March 2016, updated as
on 7 June 2024), at `rbi.org.in/Scripts/BS_ViewMasDirections.aspx?id=10296`,
with these clause numbers:

- **Clause 6(a)** — *"Interest on domestic rupee savings deposits shall be
  calculated on a daily product basis"*
- **Clause 6(a)(1)** — *"A uniform interest rate shall be set on balance up to
  Rupees one lakh, irrespective of the amount in the account within this limit."*
- **Clause 6(a)(2)** — *"Differential rates of interest may be provided for any
  end-of-day savings bank balance exceeding Rupees one lakh."*
- **Clause 4(f)** — *"All transactions, involving payment of interest on
  deposits shall be rounded off to the nearest rupee for rupee deposits and to
  two decimal places for FCNR (B) deposits."*

A 2025 restatement does exist — RBI's own FAQ PDF dated 01042025 refers to the
*Interest Rate on Deposits Directions, 2025*, and there is a *Commercial Banks —
Interest Rate on Deposits Directions, 2025*. **The clause numbering in the 2025
version has not been verified.** Cite the 2016 clause numbers, which are
confirmed, and note the 2025 restatement without asserting its numbering.

**Bonus find, and it sharpens the demo.** A related RBI circular states the
rounding rule precisely: *"fraction of 50 paise and above shall be rounded off
to the next higher rupee and fraction of less than 50 paise shall be ignored."*
That is **HALF_UP at the rupee**, explicitly. It gives the reference model an
exact rounding mode instead of an inferred one — and it is the specific
behaviour a Java rewrite using `HALF_EVEN` or two-decimal rounding gets wrong.

### C2 · CardDemo's `CBACT04C.cbl` is the wrong demo target *(affects `04 §4`, `04 §5`)*

**What was written:** *"`CBACT04C.cbl` in CardDemo is an interest-calculation
batch program — check it first; if it is tractable, it is the ideal headline
demo target."*

**What the file actually contains:** it is an interest calculator (652 lines,
~605 of code) — but it reads **four VSAM files** (transaction category balance,
cross-reference, disclosure group, account master) and calls
**`FUNCTION CURRENT-DATE`** to timestamp transaction records.

Both of those are **excluded by this project's own scope rules**: database
coupling breaks input reproducibility, and a clock read breaks determinism
outright. Recommending it as the headline demo target was wrong.

**The fix, which is better than the original plan.** Run the intake gate on it
and let the tool **refuse it, correctly, with a reason** — on AWS's own
published sample. That is a live demonstration of N7 on third-party code:

> `REFUSED — CBACT04C.cbl reads FUNCTION CURRENT-DATE at line N and opens four
> VSAM files. Differential testing requires determinism. This program cannot be
> verified by this method.`

Then extract the interest arithmetic (`(balance × rate) / 1200`) into a pure
computational unit for the actual verification demo, and say plainly that this
is what was done. Sweep the rest of CardDemo for a genuinely pure program to use
as the headline instead.

### C3 · "Nothing reports coverage per business rule" is **false** *(affects `02 §7`, `03 §3a`, Solution Folder `02 §N2`)*

**arXiv 2605.17535 — *AgentModernize: Preserving Business Logic in Legacy
Modernization with Multi-Agent LLMs and Behavioral Specification Graphs***
defines a **Business Rule Preservation Score (BRPS)**: the percentage of
gold-standard business rules correctly represented in the modernised output,
where a rule counts as preserved if it appears in the behavioural specification
*and* the modernised code enforces it, as verified by targeted test cases. It
also defines a **Behavioural Equivalence Rate (BER)**.

That is rule-level verification reporting. The claim as originally written does
not survive.

**What does survive, checked against the paper:**

- BRPS scores against **human gold-standard rules** — a research benchmark
  metric. It presupposes someone already wrote down the correct rules, which is
  exactly the artifact a bank does not have. The proposed verdict applies to
  rules the system extracted itself, with no ground truth available.
- There is **no discrimination condition** — nothing requiring that inputs on
  both sides of a boundary produce different outputs.
- There is **no refuted verdict**, and no notion of a rule being contradicted
  by evidence.
- It does not execute a legacy program as an oracle.

So N2 and N3 are narrower than claimed but not empty. Restate as: *rule-level
scoring exists as a benchmark metric against gold-standard rules; no surveyed
work issues a runtime refutation verdict on rules the system extracted itself.*

**A statistic worth taking from that paper.** Full AgentModernize achieved a
mean Behavioural Equivalence Rate of **9.4% (GPT-4o-mini), 8.1% (GPT-4o) and
19.4% (codex)** — with baselines at **0.0%**. Its behavioural specification
graph captured **91.2% of gold-standard rules**, so extraction works and *code
generation* is the bottleneck. That pair of numbers — extraction ~91%,
behavioural equivalence under 20% — is the sharpest single argument in this
whole dossier for why verification, not extraction, is the product.

### C4 · "No mainframe required" — narrow the claim *(affects `03 §3c`, `05`, visual 06)*

True of IBM, AWS and Mechanical Orchard, all verified. Not true of Locksmith,
which runs both targets off-mainframe on commodity hardware. Change "every tool"
to "every shipping product" throughout.

### C5 · GnuCOBOL conformance caveat *(affects `04 §1`)*

New detail from the GnuCOBOL project's own materials: it passes 9,700 of 9,748
NIST tests, **but explicitly does not claim to be a "Standard Conforming"
implementation of COBOL.** State both. It strengthens the existing caveat rather
than undermining it — and volunteering it is better than being caught by it.

### C6 · AWS product naming has moved *(affects `03`, `06`)*

AWS's own documentation now states that both the **Mainframe Modernization
self-managed experience** and the **Managed Runtime experience** are *"no longer
open to new customers"*, with capabilities folded into **AWS Transform**. The
Blu Age Compare and Application Testing descriptions in `03` are accurate as
published but describe a product line being restructured. Say "AWS Transform for
mainframe (formerly Blu Age / AWS Mainframe Modernization)" to avoid sounding
out of date.

---

## D. Novelty claims after verification

| Claim | Before | After | Basis |
|---|---|---|---|
| **N1 · Three-way conformance vs regulation** | Highest | **Highest — strengthened** | Locksmith: no regulatory checks (confirmed). AgentModernize: none. EvolveWare markets rule extraction for auditors but is **static documentation only** — it does not execute or compare behaviour against a regulation. No executable regulatory conformance found anywhere. |
| **N2 · Discriminating rule coverage** | High | **Medium-high** | Rule-level scoring exists (BRPS). The discrimination condition does not. Claim the condition, not the concept. |
| **N3 · Refuted verdict** | High | **High** | No surveyed work issues a contradiction verdict on self-extracted rules. Survives intact. |
| **N4 · Mutation-certified adequacy** | High | **Medium-high** | Locksmith uses *parity-preserving* mutations for path exploration. Fault injection into the oracle to score corpus adequacy is a different purpose and was not found. Narrower than claimed, still open. |
| **N5 · Rule-directed input generation** | Medium-high | **Medium** | Locksmith's Witness Search generates inputs from program structure, not from extracted rules — so the specific mechanism holds, but input generation for this purpose is now a crowded area. |
| N6–N10 | unchanged | unchanged | Not contested by anything found. |

**The revised one-sentence novelty claim:**

> A verification harness that issues a runtime verdict on the business rules it
> extracted itself — proven, unproven, or **refuted** — where "proven" requires
> the rule's boundary to be demonstrably live; that measures the strength of its
> own claim by injecting faults into the legacy oracle; and that checks both
> implementations against the regulator's stated rules as a third reference, so
> it can tell a translation defect apart from a compliance breach the rewrite
> inherited faithfully.

Every clause of that survived the falsification attempt. The earlier version
claimed the differential mechanism and the per-rule reporting as novel; neither
is.

---

## E. What is still unverified

Stated plainly, because the point of this page is that you should not have to
take my word for it.

1. ~~**The clause numbering of the 2025 RBI Direction.**~~ **Half-resolved.**
   RBI's own 2025 FAQ (now in `citations and research paper/pdfs/`) cites
   paragraphs 4.22, 9.1.6, 10.2, 20.2.1, 22, 29.1, 29.5, 29.8 — a **decimal
   scheme**, unlike the 2016 Direction's *clause 4(f)* / *6(a)(1)*. So the 2016
   references confirmedly **do not** carry over. Which 2025 paragraphs hold the
   savings, threshold and rounding rules is still unknown; the FAQ does not
   cover them. Keep citing 2016.
2. **Whether GnuCOBOL and IBM Enterprise COBOL agree on specific `COMP-3` and
   `ROUNDED` edge cases.** Needs an Enterprise COBOL installation nobody on the
   team has. Remains a stated limitation, not a resolved question.
3. **The absence claims are still absence-of-evidence.** I attempted
   falsification on the two that matter and it cost one claim (C3) and narrowed
   two more. A more exhaustive search — particularly of patents, where a
   "rule base coverage" patent surfaced and was not read in full — could narrow
   them further.
4. **Whether any pure-computation program exists in CardDemo** suitable as a
   headline demo target. `CBACT04C` is ruled out; the rest of the repository
   has not been swept.
5. **Judging criteria for the hackathon.** Still unknown. Every positioning
   recommendation assumes a technically literate Cognizant panel.

---

## F. What this changes about the plan

Nothing structural. The problem statement is unaffected and every figure in it
held up. The architecture in `Solution Folder/03` is unchanged — if anything
Locksmith is evidence that it works, since an industry team built the same spine
and reached 91.90% branch coverage with full parity.

Three concrete actions:

1. **Lead with N1.** The regulatory third reference is now the only novelty
   claim that survived unchallenged, and it got stronger.
2. **Re-pick the demo target.** `CBACT04C` becomes the intake-gate demonstration
   instead of the verification demonstration.
3. **Add Locksmith and AgentModernize to the landscape**, and use
   AgentModernize's 91.2%-extraction / sub-20%-equivalence pair as the headline
   evidence for the thesis. It is better than anything the dossier had before
   this pass.
