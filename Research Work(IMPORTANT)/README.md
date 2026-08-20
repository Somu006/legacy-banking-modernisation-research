# Research Work

Evidence base for the **Legacy Banking Modernisation Platform** submission.
Team StudyEdge · Digital Nurture Hackathon 2026 · Banking and Finance Technology.

Compiled 4 August 2026. Every substantive claim here carries a source; see
`06 - Sources.md` for the full list. Where a widely-repeated figure could not be
traced to a primary source, it is marked **[contested]** rather than quietly used.

---

## Files

| File | What it contains |
|---|---|
| `00 - Round-2 Briefing.md` | **Read first.** The whole submission in one sitting: the sixty-second pitch, the deck slide-by-slide with carry numbers, the ten figures to memorise with caveats, round-2 Q&A answers, a plain-language glossary, and the deliverables checklist. |
| `01 - Problem Research.md` | Evidence that the problem is real, large, and specifically Indian: COBOL install base, failed migrations and their cost, RBI's regulatory posture, why verification (not translation) is the binding constraint. |
| `02 - Solution Research.md` | The technical foundations: the test-oracle problem, differential testing, why COBOL decimal arithmetic breaks naive rewrites, how business rules are extracted today, how test inputs are generated. |
| `03 - Competitive Landscape.md` | Who already does this. **Read this before the next pitch** — the headline finding is uncomfortable and changes how the idea should be positioned. |
| `04 - Feasibility and Build Plan.md` | What can actually be built: GnuCOBOL, parsers, public COBOL corpora, coverage tooling, and a staged plan sized to a student team. |
| `05 - Risks and Judge Questions.md` | The hard questions a Cognizant judge will ask, with defensible answers. |
| `06 - Sources.md` | Bibliography, grouped by topic, with a confidence rating per source. |
| `07 - Verification Pass.md` | **Read alongside `03`.** Independent re-check of every load-bearing claim against primary sources: 12 confirmed, 6 corrections, one novelty claim partially falsified, and one piece of prior art found that is closer than anything in `03`. |
| `08 - Business Plan Research.md` | Round-2 material (CII template): stakeholder mapping, market potential, investments, returns, timelines. Team-authored assumptions are marked **[ASSUMPTION]** and separated from sourced claims. Includes the open items to close before the final round. |
| `Solution Folder/` | Design options, ranked novelty proposals, the recommended architecture, and pitch language. |
| `Q and A/` | Running record of questions the team actually asked during prep, answered and sourced. Distinct from `05`, which is questions we *expect* a jury to ask. Any question a member had to ask is one a judge can ask. |
| `Visuals/` | Ten SVG diagrams explaining the problem, the system and the novelty (8–10 added for round 2). Drop straight into the deck. |
| `deck-renders/` | The thirteen slides of the round-2 deck, rendered to PNG through PowerPoint. Inlined in the dossier as Part 15. |
| `citations and research paper/` | Every source organised for citation: `references.bib`, annotated bibliographies by category, and verified word-for-word quotes. Metadata was checked individually; unverifiable entries are marked `INCOMPLETE` rather than guessed. |

**`Legacy_Banking_Modernisation_Research_R2.pdf`** — everything above as one
continuous document, diagrams and deck slides inlined, including the round-2
material (Part 13 — Business Plan Research; Part 14 — the round-2 written
report; Part 15 — the deck itself). Regenerate with `python build-pdf.py`
after editing any markdown file; the markdown is the source of truth.
`Legacy_Banking_Modernisation_Research.pdf` is the round-1 edition, kept as a
historical artifact.

---

## The three findings that matter most

**1. The problem statement holds up. The claim of novelty does not.**

Differential testing against the legacy program as oracle is exactly what IBM,
AWS and at least one well-funded startup already ship. IBM's watsonx Code
Assistant for Z has a "Validation Assistant" that passes identical inputs
through the COBOL and the Java and flags divergence. AWS ships Blu Age Compare
and Mainframe Modernization Application Testing for functional equivalence.
Mechanical Orchard's Imogen is built entirely on a "generate-validate loop"
proving behavioural equivalence. Cognizant — the organiser — markets
accelerators that "extract business rules from a legacy COBOL application,
generate specifications and rewrite the application."

This is not fatal. It is *validating*: the team independently identified the
same bottleneck that the industry's most serious players converged on, and
industry analysts are now calling it the "behavior-first paradigm." But the
pitch line "everyone else's submission assumes their AI is right" is true of
other *hackathon teams*, not of the market. Say the first, not the second.
`03` develops the honest positioning.

**2. The defensible contribution is the loop, not the diff.**

Every shipping tool treats extraction and verification as separate phases.
The written submission's "reciprocal loop" — extracted rules tell the input
generator where the boundaries are, and the differential run then issues a
per-rule *verified / unproven* verdict — is the part that is genuinely thin in
both the products and the literature. The academic work splits cleanly: rule
extraction (COBREX, A-COBREX, COBRAIN) and translation validation (SEDCoT, the
WCA4Z testing framework) are separate research lines. Closing that loop, and
reporting coverage per business rule rather than per line, is the claim worth
making.

**Verification note (4 August 2026).** A falsification pass against primary
sources cost this claim some ground: rule-level reporting already exists as a
benchmark metric (AgentModernize's Business Rule Preservation Score), and a
paper published five days ago — **Locksmith**, arXiv 2607.28271 — builds the
same differential spine and runs it off-mainframe. What survived is the
*discrimination condition*, the *refuted* verdict, and the regulatory third
reference. Full accounting in `07 - Verification Pass.md`.

**3. There is a perfect, regulator-backed demo bug sitting in plain sight.**

RBI's Master Direction on Interest Rate on Deposits requires savings interest
to be computed on a **daily product basis** and every interest payment on a
rupee deposit to be **rounded off to the nearest rupee** — while FCNR(B)
deposits round to two decimals. That is a real rounding rule, from a real
regulator, that a naive Java rewrite using `double` gets wrong in a way that is
invisible until audit. Build the demo around it. See `02 §3` and `04 §5`.

---

## Status note

The PPT deadline (4 August 2026, 10:00 AM) coincides with the compilation of
this research, so this material is aimed at whatever comes after the deck —
a build phase, a demo round, or a Q&A. Nothing here requires changing the
submitted problem statement, which the evidence supports as written.

**Round-2 update (12 August 2026).** The team advanced. Round 2 is the CII
Eastern Region Hackathon (submission 13 August; virtual prelims; finals at ICT
East, Kolkata, 24 September). CII's template mandates business-plan fields the
round-1 material never covered — target users, market potential, investments,
returns, timelines. `08 - Business Plan Research.md` documents the evidence
and assumptions behind that content, and
`Work Done/Written/Legacy_Banking_Modernisation_Platform_R2.md` is the
round-2 edition of the written report.
