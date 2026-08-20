# 08 — Business Plan Research

Evidence and assumptions behind the round-2 business-plan content (CII Eastern
Region Hackathon, submission 13 August 2026). The CII template mandates fields
the round-1 material never covered: target users, market potential, technical
details, investments, returns and timelines. This file records where each new
claim came from, so that any sentence on the round-2 slides can be traced to a
source — or to a clearly labelled assumption.

**Convention:** claims marked **[ASSUMPTION]** are the team's own constructions
and have no external source. They are defensible as estimates, but say so if
asked. Claims marked **[contested]** follow the convention in `01`.

---

## 1. Target users and stakeholders

The four-stakeholder mapping used on the deck. Roles are sourced; the pain
statements are inference from the sourced material.

| Stakeholder | Role | Pain (as pitched) | Status |
|---|---|---|---|
| Bank CIO / head of core banking | Owns the migration decision and the cutover date | Cannot sign off a replacement nobody can prove behaves identically | Inference — reasonable, unsourced **[ASSUMPTION]** |
| Risk, compliance, internal audit | Owns the board-approved Change Management Policy that RBI's IT Governance Master Direction (Nov 2023, effective Apr 2024) requires | No auditable artefact showing old and new agree, case by case | Role is sourced (`01 §6`); pain is inference **[ASSUMPTION]** |
| Modernisation vendors and SIs (Cognizant, TCS, Infosys, in-house) | Deliver the migration programmes | Translation is commoditised; assurance is what stretches the programme | Consistent with `03` and `07` findings; the *stretch* claim is inference **[ASSUMPTION]** |
| The supervisor (RBI, the board) | Oversees | An IT failure is a supervisory event, not an engineering incident | Sourced — HDFC 2020 order, `01 §3` |

**How to use this:** the strongest line is the summary — *nobody on this list
is short of a translator; everybody on this list is short of proof.* The named
buyer is the person who signs the cutover memo. If a judge with banking
experience pushes back on any pain statement, concede it is the team's reading
and invite correction — do not defend it as researched fact.

**Open item:** validate the pain statements with one real practitioner (a
core-banking engineer or bank IT auditor) before the final round in Kolkata.
One conversation upgrades all four rows from inference to testimony.

---

## 2. Market potential

### Figures used on the deck, and their standing

| Figure | Source | Confidence |
|---|---|---|
| ~$1bn Indian core-banking upgrade spend over 5–10 years | BCG via Business Standard, 2024 (`01 §3`) | Medium — analyst estimate, single outlet |
| 92 of top 100 banks on IBM mainframes | Widely reported industry figure (`01 §1`) | Medium |
| >40% of banking systems still run COBOL | Pragmatic Coders, 2025 (`01 §1`) | Medium |
| 5% vs 7–9% IT spend as share of revenue, Indian vs global banks | "Industry analysis" (`01 §3`) | **Weakest citation on the deck** — no primary source pinned. See open item below. |
| 40,000+ RBI ombudsman mobile/internet banking complaints, FY22–23 | RBI ombudsman data (`01 §3`) | Good — regulator's own numbers. **Currently unused on the deck**; available as a swap-in. |

Figures deliberately **not** used, per `01`: the 800bn-lines-of-COBOL estimate
and the 95%-of-ATM-swipes claim — both **[contested]**.

### The positioning argument

The deck's market slide makes a two-part argument:

1. **The spend is already committed** — modernisation budgets exist (the $1bn
   figure); the constraint is not demand.
2. **Every rupee of it is gated by one step no one sells as a product** — the
   assurance step between "the new code exists" and "we run it on real money"
   has no product category; it is absorbed as consulting hours and schedule
   risk.

Part 1 is sourced. Part 2 is an **argument, not a fact** — it is the team's
synthesis from the competitive landscape (`03`, `07`): AWS Transform, IBM
watsonx Code Assistant for Z and Mechanical Orchard's Imogen all *generate*
and then validate as a feature of generation; none is sold as a standalone
assurance product. Locksmith (arXiv 2607.28271) is research, not product. The
claim survives the check in `07` but should be voiced as positioning ("no one
*sells* the proof as the product"), never as a market statistic.

### Adjacent-product facts used

| Claim | Source | Confidence |
|---|---|---|
| AWS Transform for mainframe GA May 2025 | AWS announcement (`01 §5`) | Good |
| ADP: rule-extraction time −80%, manual effort −90% | AWS/ADP case material (`01 §5`) | Medium — vendor case study; attribute to AWS when quoting |
| IBM's own papers: translated code "cannot be trusted" without checking | IBM Research, WCA4Z testing paper (`01 §5`, quotes in `citations …/05`) | Good — it is IBM about IBM |

### Open item — pin the IT-spend figure

The 5%-vs-7–9% comparison circulates through consulting and analyst
commentary (Gartner / Celent / McKinsey banking-IT benchmarks are the likely
origins). Before the final round, either pin it to a named report and year, or
replace the stat tile with the RBI ombudsman figure, which is regulator-sourced
and currently unused.

---

## 3. Investments

What the round-2 deck claims it takes to build, and the standing of each claim.

| Claim | Basis | Status |
|---|---|---|
| Licence cost: nil | GnuCOBOL GPL/LGPL, ProLeap MIT, gcov GPL, NIST CCVS85 public domain, AWS CardDemo Apache 2.0 (`04 §1–4`) | Sourced, per component |
| No mainframe, no vendor contract required | GnuCOBOL compiles to native binaries on a laptop (`04 §1`) | Sourced |
| Prototype: 4 engineers × 12 weeks | Sized from the staged plan in `04 §7` — stages 0–7 at student pace | **[ASSUMPTION]** — effort estimate, no external basis |
| Only variable cost is LLM inference | One bounded call per slice (`04 §2`) | Architecture is sourced; "only" is fair given nil licences |
| Deterministic orchestration ≈ up to 3.5× lower token cost than agentic | Lwin & Kumar, arXiv 2605.09894 (`04 §6`) | Good — controlled study |
| Bank pilot: 2 engineers + bank SME time, one program family, ~6 months | Team's own sizing | **[ASSUMPTION]** |

**Deliberate choice:** no rupee totals appear on the deck because no costing
research exists. The slide says "indicative and effort-based" in so many words.
If a money figure is ever wanted: (engineer-months × assumed loaded monthly
rate) is the only honest construction, and the rate assumption must be stated
on the slide.

---

## 4. Returns — and the cost of not solving

The template asks to "quantify the benefits & what if I don't solve?". The
evidence, all previously gathered:

**Upside (what assurance unlocks)**

- The ~$1bn committed spend is gated on assurance (argument, §2 above).
- Comparable automation of one pipeline stage: ADP −80% extraction time,
  −90% manual effort (`01 §5`).
- Review-cost mechanism: line-cited rules mean an engineer confirms a claim by
  reading three lines instead of four thousand (architecture property, `02`).

**Downside (what failure costs)**

- **TSB 2018** (`01 §4`): £48.65m FCA/PRA fine, £32.7m redress, ~£400m total,
  CEO resigned, CIO personally fined £81,620. The regulator's finding was
  about *risk management and assurance*, not programming — which is exactly
  the gap this project fills. Best-documented case; keep it as the centrepiece.
- **HDFC 2020** (`01 §3`): RBI froze Digital 2.0 launches and new card
  issuance; restrictions ran into 2022. The India-specific proof that an IT
  failure freezes a product roadmap.

**Not claimed:** any specific ROI multiple, payback period, or revenue figure.
Nothing in the research supports one, so the deck argues risk-avoidance and
unlock instead. If a judge demands an ROI number, the honest answer is that
the counterfactual (TSB's ~£400m) prices the downside, and the product's cost
is two orders of magnitude below it.

---

## 5. Timelines

The deck's week-by-week plan is a repackaging of the staged build plan in
`04 §7`. The stage contents and risk ratings are researched; **the calendar
mapping is the team's own** **[ASSUMPTION]**.

| Deck line | `04 §7` stage | Notes |
|---|---|---|
| Weeks 1–2 — differential harness runs and diffs | Stages 0–1 | Low risk; already a working demo |
| Weeks 3–4 — input generation from PIC clauses + hand boundaries | Stage 2 | Low |
| Weeks 5–7 — parse, slice, extract rules with line citations | Stage 3 | Medium (Java/Python boundary) |
| Weeks 8–10 — reciprocal loop + per-rule verdicts | Stages 4–5 | **The contribution — protected time** |
| Weeks 11–12 — delta debugging, evidence bundle | Stages 6–7 | Low risk, high demo value |
| Months 4–9 — bank pilot, one program family, bank's own compiler | — | **[ASSUMPTION]** — no counterpart in `04`; sized by the team |

The highlighted weeks 8–10 band carries the novelty claim as qualified by
`07`: what survived falsification is the discrimination condition, the
*refuted* verdict, and the regulatory third reference — not the differential
spine itself, which is prior art (Locksmith, WCA4Z validation, Blu Age
Compare).

---

## 6. Template category chips

The CII template's category tags, and why each is lit or not on the deck:

| Chip | Lit? | Rationale |
|---|---|---|
| Modernization | Yes | The category of the product |
| AI | Yes | Bounded LLM calls for extraction and translation |
| Process Re-engg | Yes | Replaces manual assurance (consulting hours) with a pipeline |
| Cloud | No | Runs on a laptop; no cloud dependency is claimed. Could deploy to cloud, but claiming it adds nothing and invites questions |
| ROI | Yes | Risk-avoidance case (TSB counterfactual) |
| Margin improvement | Yes | Assurance absorbed today as consulting hours and schedule risk |
| Happy Customer / Revenue Growth | No | No evidence chain supports either; claiming them would dilute the honest ones |
| Time to solve | Yes | 12-week prototype plan |
| Milestones | Yes | Staged plan with named deliverables |
| Tools | Yes | GnuCOBOL, ProLeap, gcov, delta debugging |

---

## 7. Summary of what is new versus `01`–`07`

New syntheses introduced for round 2 (nowhere else in the research):

1. The four-stakeholder pain mapping (§1).
2. The "assurance gate" market positioning (§2).
3. Effort-based investment estimates (§3).
4. The calendar mapping of the staged plan (§5).
5. The chip rationale (§6).

Everything else on the round-2 slides is a restatement of `01`–`07` material.

## Open items

- [ ] Pin the 5%-vs-7–9% IT-spend figure to a named report, or swap in the
      RBI ombudsman figure (§2).
- [ ] Validate the stakeholder pain statements with one practitioner (§1).
- [ ] Decide whether a rupee costing is wanted for the final round; if so,
      agree a loaded monthly rate and label it as an assumption (§3).
