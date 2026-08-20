# 00 — Round-2 Briefing (read this first)

The whole submission in one sitting, for the team. Everything here is a
compression of `01`–`08`; if a claim surprises you, the section reference
tells you where the evidence lives. Nothing in this file is new research.

**The facts of the round:** CII Eastern Region Hackathon · deck due
**13 August 2026** as `StudyEdge_Banking and Finance Technology.pptx`
(.pptx only, named exactly like that) · virtual prelims · finals at ICT East,
Kolkata, **24 September 2026** (travel at our own cost).

---

## 1. The pitch in sixty seconds

> Indian banks run their core arithmetic on COBOL written in the 1980s.
> Everyone thinks leaving is hard because translation is hard — it is not.
> AWS, IBM and TCS all sell translation. Migrations stall because **nobody
> can prove the new program behaves like the old one**, because the business
> rules were never written down anywhere except the code.
>
> Our platform treats that proof as the product. It extracts the rules from
> the COBOL with line citations, generates boundary-hitting test inputs from
> those rules, runs **both** programs on every input — the legacy binary is
> its own answer key — and diffs the outputs. Every rule ends up **verified,
> unproven, or refuted**. And we add a third reference no vendor has: the
> RBI's own written arithmetic, so we can catch the legacy itself being
> non-compliant.
>
> Everything runs on free software on a laptop. The deliverables a bank
> keeps: a specification it never had, a permanent regression suite, an
> equivalence claim someone can actually sign, and compliance findings.

If you only remember one line: **the bottleneck is verification, not code
generation — so we sell the proof, not the code.**

---

## 2. The deck, slide by slide

Fourteen slides (as submitted 13 August — V4). The single point each one
exists to make, and the number that carries it. Decide who owns each slide
when you split the presentation.

| # | Slide | The one point it makes | Carry number |
|---|---|---|---|
| 1 | Title | Proof, not translation | — |
| 2 | Problem | Banks run code nobody can safely change | 92 of 100 · $1bn · 0 specs |
| 3 | Why it's unsolved | Translation is solved; proof is not | 62% · 91.2% · <20% |
| 4 | Stakeholders *(R2)* | Everyone can generate; nobody can prove | — |
| 5 | Our solution | Deterministic pipeline, AI on a short leash | 2 bounded LLM calls |
| 6 | How it works | The legacy binary is its own oracle | — |
| 7 | The finding *(new in V4)* | ₹115 vs ₹116, traced to one ROUNDED — illustrative, say so | ₹1 per account per accrual |
| 8 | Technical details *(R2)* | Every component is free and citable | 9,700 / 9,748 NIST |
| 9 | What makes it different | Gate · loop · regulator — not the diff | — |
| 10 | Market potential *(R2)* | The spend exists; assurance is the gate | ~$1bn · 40,000+ complaints |
| 11 | Feasibility & scope | Narrow by design; refuses what it can't verify | — |
| 12 | Business plan 1/2 *(R2)* | WHY / HOW / WHAT on one page | — |
| 13 | Business plan 2/2 *(R2)* | Costs nil to licence; TSB prices the downside | ~£400m |
| 14 | References | We did the reading | — |

Pacing advice from round 1 still holds: slides 6, 7 and 9 are where the
pitch is won; do not rush them to spend time on 12–13, which are there to be
*seen complying* with the CII template more than to be read aloud.

---

## 3. Numbers to memorise

The ten figures worth having cold, with the caveat you must attach if
challenged. Full provenance: `01`, `04`, `08`.

| Figure | Value | Say it as | Caveat |
|---|---|---|---|
| Top-100 banks on IBM mainframes | 92 of 100 | "widely reported industry figure" | Medium confidence, not a census |
| Banking systems still on COBOL | > 40% | Pragmatic Coders, 2025 | Medium |
| Indian core-upgrade spend | ~$1bn over 5–10 yrs | BCG, 2024 | Analyst estimate, single outlet |
| Indian vs global bank IT spend | 5% vs 7–9% of revenue | "industry analysis" | No primary source pinned. **Demoted to a footnote in V4**; the slide-10 stat tile is now the RBI ombudsman figure below |
| RBI ombudsman complaints | 40,000+ (mobile & internet banking), FY22–23 | RBI ombudsman data | Solid — regulator's own numbers; on slide 10 since V4 |
| TSB 2018 total cost | ~£400m (£48.65m fine + £32.7m redress) | FCA/PRA enforcement | Solid — regulator's own action |
| HDFC 2020 | RBI froze launches & cards; into 2022 | RBI supervisory order | Solid |
| GnuCOBOL conformance | 9,700 / 9,748 NIST tests | GnuCOBOL project | Project claims no formal conformance — volunteer that |
| Best rule extractor | ~62% precision / 74% recall | A-COBREX, ICSE 2025 | This is our *argument*, not our embarrassment — extraction alone can't ship |
| LLM translation correctness | 2.1%–47.3% | Pan et al., *Lost in Translation* | Range across models/languages |
| Deterministic vs agentic cost | up to 3.5× cheaper | arXiv 2605.09894 | Controlled study |

Rounding rule to quote verbatim if asked: RBI Master Direction — interest on
rupee deposits **rounds to the nearest rupee; 50 paise and above rounds up**
(clause 4(f)). That single sentence is why a naive Java `double` rewrite
fails audit.

---

## 4. The questions round 2 will ask, and the answers

Round 1's hard questions live in `05`. These are the *business-plan* ones
this round's template invites, with the honest answer in one breath each.

**"What's your ROI number?"**
We don't claim one — nothing in our research supports a specific multiple,
and inventing one would be exactly the confident-wrong-answer failure our
product exists to catch. The counterfactual prices the downside instead:
TSB spent ~£400m on a failed cutover; our platform's cost is two orders of
magnitude below that. (`08 §4`)

**"What does it cost to build?"**
Licence cost is nil — the whole toolchain is open source, no mainframe, no
vendor contract. The prototype is four engineers for twelve weeks on
laptops; the only variable cost is bounded LLM inference. Those effort
figures are our own estimates and we say so. (`08 §3`)

**"How big is the market really?"**
The honest shape: ~$1bn of committed Indian core-upgrade spend is the
demand-side proof; our positioning claim — that the assurance step has no
product category and is absorbed as consulting hours — is an argument from
the competitive landscape, not a statistic, and we label it that way.
(`08 §2`)

**"IBM / AWS already do this."**
They ship the differential *mechanism* — we say so on the slide. Three
things they don't do: refuse unverifiable programs at intake; close the
loop so extracted rules direct input generation and get per-rule
verified / unproven / **refuted** verdicts; and check both programs against
the RBI's written arithmetic, which can catch the *legacy* being wrong.
(`03`, `07`, deck slide 8)

**"What exists today?"**
As of 20 August: a working prototype (`Digital Nurture Hackathon prototype/`,
a sibling folder beside this one — `run.cmd`, ~20 seconds end to end). Stages 0–2 and 4–6 of `04 §7` run for
real: GnuCOBOL compiles and executes the legacy fixture, the untrusted Java
rewrite runs beside it, 101 rule-directed inputs, per-rule verdicts
(6 proven / 2 unproven / 1 refuted / 1 divergent), a delta-debugged minimal
counterexample (₹1,000 for 10 days → legacy ₹0, rewrite ₹1), the three-way
RBI check (all 44 divergences are silent corrections — the legacy breaches
clause 4(f)), and a 4/5 mutation kill rate. **Still stubbed: stage 3** —
`rules.json` is hand-extracted and stands in for the bounded LLM call; say
so unprompted. The fixture is our own program, presented as a demo fixture,
not as evidence (`04 §4`).

**"Why should a bank trust your AI?"**
It shouldn't — that is the design. The model is called once per bounded
slice, cannot invent line citations, and everything it says is judged by
execution. When the extraction layer is wrong, the verdict says **refuted**
and shows the counterexample. We are the only team whose demo plans to show
our own AI being caught. (`02`, `07`)

---

## 5. Glossary — plain language

For overviewing across the team; branch-agnostic. Alphabetical.

- **AST (abstract syntax tree)** — the parsed, structured form of source
  code that tools can walk; what ProLeap produces from COBOL.
- **Boundary value** — an input right at a rule's edge (₹99,999 / ₹1,00,000 /
  ₹1,00,001). Bugs live at edges; random inputs almost never land on them.
- **CICS / JCL** — IBM mainframe screen-handling and job-control layers. We
  *refuse* programs using them, because their behaviour depends on state we
  cannot reproduce.
- **COBOL** — the 1960s-era language most core banking arithmetic still
  runs on. Verbose, decimal-exact, extremely stable.
- **Delta debugging** — automatically shrinking a pile of failing inputs to
  one minimal counterexample. Turns "73 failures" into one line a judge
  can read.
- **Differential testing** — run two implementations on the same input and
  compare outputs. No specification needed.
- **gcov / coverage** — tooling that records which source lines an
  execution actually touched. This is how "unproven" is computed rather
  than guessed.
- **GnuCOBOL** — free, open-source COBOL compiler (compiles via C to a
  native binary). Passes 9,700/9,748 NIST conformance tests; makes the
  whole demo possible without a mainframe.
- **Hallucination** — an LLM stating something false with confidence. Our
  design assumption is that this *will* happen; the harness exists to
  catch it.
- **Mutation testing** — deliberately break the legacy program (move a
  threshold, delete a ROUNDED) and check the test corpus notices. If it
  doesn't, the equivalence claim was hollow — "testing our own tests."
- **Oracle (test oracle)** — the thing that tells you the *correct* output
  for a given input. Normally a human-written spec; here, the running
  legacy program itself.
- **PIC clause** — COBOL's field-type declaration (digits, sign, decimal
  places). Readable mechanically, so input domains can be derived from it.
- **Program slicing** — extracting exactly the source lines that influence
  one variable. A slice is a set of line numbers — which is what makes our
  rule citations mechanical rather than model-generated.
- **RBI Master Direction** — the regulator's binding rulebook. The Interest
  Rate on Deposits Direction fixes daily-product accrual, the ₹1 lakh
  uniform-rate threshold, and nearest-rupee rounding — our third reference.
- **Reciprocal loop** — our core design: extracted rules tell the input
  generator where boundaries are; execution then judges the rules. Each
  layer checks the other.
- **Transpiler** — a program that converts source code between languages
  (COBOL → Java). Mature, commercial, *not* the bottleneck.
- **Verified / unproven / refuted** — our three per-rule verdicts: confirmed
  by execution / never exercised, flagged / contradicted by execution (the
  extraction was wrong).
- **VSAM** — mainframe file storage. A program reading it has external
  state, so it fails our intake gate.

---

## 6. Deliverables and where everything lives

| Deliverable | File | State |
|---|---|---|
| Round-2 deck (submit this) | `Presentation(Work Here)/StudyEdge_Banking and Finance Technology_V2.pptx` | Ready — **rename to drop `_V2` on upload** |
| Written report, round-2 edition | `Work Done/Written/Legacy_Banking_Modernisation_Platform_R2.md` + `.pdf` | Ready |
| Research dossier, everything | `Legacy_Banking_Modernisation_Research_R2.pdf` (this document) | Ready |
| Business-plan evidence | `08 - Business Plan Research.md` (Part 13) | Ready |
| Deck as images | `deck-renders/` (Part 15) | Ready |

**Open items before Kolkata** (owners needed — see `08`): pin the 5%-vs-7–9%
IT-spend figure to a named report or swap in the RBI ombudsman figure;
validate the four stakeholder pain statements with one practitioner; decide
whether we want a rupee costing, and if so agree the rate assumption out
loud.
