# 01 — Problem Research

Evidence for each claim in the submitted problem statement. Structured so that
any sentence in the pitch can be traced to a source.

---

## 1. The install base is real and it is not shrinking

| Claim | Figure | Source | Confidence |
|---|---|---|---|
| COBOL still in production | 220 billion lines (2017 estimate, still widely cited) | Reuters/industry, repeated in Pragmatic Coders 2025 legacy stats | Medium |
| Revised estimate | 800 billion lines (2022 Micro Focus survey) | Micro Focus / secondary reporting | **[contested]** — a survey extrapolation, not a census. The jump from 220bn to 800bn reflects better counting, not growth. Use "hundreds of billions of lines" if challenged. |
| Banks running legacy cores | ~70% of banks globally | Pragmatic Coders, 2025 | Medium |
| Banking systems using COBOL | >43% | Pragmatic Coders, 2025 | Medium |
| Top-100 banks on IBM mainframes | 92 of 100 | Widely reported industry figure | Medium |
| Daily commerce processed | ~$3 trillion/day | IBM-sourced figure, widely repeated | Medium |
| ATM transactions on COBOL | ~95% of swipes | Widely repeated | **[contested]** — traces back to a single 2017 press item. Avoid in the deck. |

**How to use this:** one or two figures, attributed, is more credible than a
wall of them. The strongest pairing is *"92 of the world's top 100 banks run on
mainframes, and over 40% of banking systems still run COBOL"* — both defensible,
both make the scale point without inviting a fact-check argument.

---

## 2. The workforce argument — real, but the numbers are soft

Commonly cited: average COBOL developer age 55–58; roughly 10% of that
workforce retiring each year; ~75% expected to retire within a decade; ~24,000
active COBOL developers in the US against hundreds of billions of lines; a
Micro Focus survey in which 60% of COBOL-using organisations named finding
qualified developers as their single biggest challenge.

**Treat all of these as [contested].** They circulate through vendor blogs and
recruitment-site content marketing, and the primary sources are old
(a Computerworld survey found 46% already noticing a shortage — but that
article dates from the 2000s). The *direction* is not in doubt; the precision
is.

**Better framing for the pitch:** the workforce point is not that COBOL
programmers are scarce. It is that **the people who wrote the undocumented
business rules are gone**, which is a stronger and more specific claim, and it
is the one that actually motivates the solution. A bank can hire a COBOL
contractor. It cannot hire back the 1994 engineer who decided how to handle an
account opened on 31 January.

---

## 3. India-specific evidence

This is the part that makes the submission fit the theme rather than being a
generic global tech pitch.

**The investment gap.** BCG estimates Indian lenders must invest **~$1 billion
over 5–10 years** to upgrade legacy core banking systems, most of which were
set up in the 1990s on monolithic, tightly-coupled architectures unsuited to
horizontal scaling.

**Chronic underinvestment in IT.** Global banks spend 7–9% of revenue on IT;
Indian banks up to 5%. That gap compounds: less budget → fewer modernisation
attempts → more accumulated undocumented logic.

> **Citation caution (12 Aug 2026):** this 5%-vs-7–9% comparison has no primary
> source pinned — it circulates through consulting and analyst commentary
> (likely Gartner / Celent / McKinsey banking-IT benchmarks). It is the weakest
> citation on the round-2 deck. Either pin it to a named report and year, or
> swap in the RBI ombudsman complaints figure below, which is
> regulator-sourced. See `08 §2`.

**Failure is already visible to the regulator.** RBI's ombudsman recorded over
**40,000 mobile and internet banking complaints** across FY22 and FY23.

**The regulator has already acted on IT fragility.** On 2 December 2020 the RBI
ordered HDFC Bank — India's largest private bank — to halt all new digital
launches under *Digital 2.0* and stop issuing new credit cards, following
repeated outages (penalised for incidents in November 2018 and December 2019,
then a data-centre power failure on 21 November 2020). The credit-card
restriction was relaxed only in August 2021; the Digital 2.0 restriction ran
into 2022. RBI also ordered an external audit of the bank's IT infrastructure.

**Why this matters for the pitch:** it demonstrates that in India, an IT
failure in a bank is not an engineering incident, it is a *supervisory* event
that can freeze the bank's product roadmap for over a year. That is exactly the
risk calculus that keeps a bank from touching a COBOL accrual engine — and it
is a far more relevant example for a CII/Cognizant audience than a UK bank.

---

## 4. What migration failure actually costs — the TSB case

The single best-documented example, and worth one slide.

- April 2018: TSB migrated from Lloyds' systems to Sabadell's *Proteo4UK*
  platform. Data migrated; the platform then failed immediately.
- **1.9 million of 5.2 million customers** locked out — this figure comes from
  press reporting (The Register, IEEE Spectrum), corroborated across several
  outlets. The FCA's own release says only *"all of TSB's branches and a
  significant proportion of its 5.2 million customers"*; attribute accordingly.
  Failures spanned digital
  banking, telephone banking, branch technology, payments and debit cards.
  Business-as-usual was not restored until December 2018.
- The FCA and PRA jointly fined TSB **£48.65 million** for operational risk
  management and governance failures.
- **£32.7 million** paid in customer redress.
- Total direct cost around **£400 million**. The CEO resigned. The former CIO
  was personally fined **£81,620**.

**The point to make with it:** TSB did not fail because the new code would not
compile. It failed because nobody could prove, before cutover, that the new
system would behave like the old one under real conditions. The regulator's
finding was about *risk management and assurance*, not about programming.
That is a verification failure, and it is exactly the failure this project
targets.

---

## 5. The verification bottleneck — is the thesis actually defensible?

Yes, and it is now the mainstream expert view rather than a contrarian one.

**Translation is demonstrably not the hard part any more.** Commercial
automated refactoring (AWS Blu Age, TCS MasterCraft TransformPlus, Micro
Focus/OpenText) has produced COBOL→Java for years. AWS Transform for mainframe
went generally available in **May 2025** as an agentic modernisation service.
ADP used it to extract business rules from a legacy tax-compliance mainframe,
cutting rule-extraction time by 80% and manual effort by over 90%.

**But translation output cannot be trusted without checking.** The evidence:

- *Lost in Translation* (Pan et al.) translated 1,700 code samples across
  C, C++, Go, Java and Python. **Correct translations ranged from 2.1% to
  47.3%** depending on the model. The authors released 1,748 manually labelled
  bugs across **15 categories** of translation error. Their conclusion in the
  abstract is blunt: LLMs are not yet reliable for automated code translation.
- The IBM Research paper on testing WCA4Z states it directly: *"the resulting
  code cannot be trusted to correctly translate the original code."* That is
  IBM, about IBM's own product.
- Subtle operator-semantics differences cause **silent** failures — the
  canonical example being modulo on negative operands, where Python takes the
  divisor's sign and Java and C take the dividend's. Silent means no crash, no
  exception, just a wrong number.

**And the specification genuinely does not exist.** This is the load-bearing
claim of the whole submission, and it is supported by the existence of an
entire research subfield devoted to recovering it: business-rule extraction
from COBOL (see `02 §4`). Tools like IBM ADDI exist precisely because the
dependency map and the rules must be *reconstructed* from source. Nobody builds
a reconstruction tool for information that was written down.

The honest caveat: the best rule-extraction tools reach roughly **62% precision
and 74% recall** (A-COBREX, on fuzzy matching against annotated ground truth).
That is the state of the art in 2025. It is also the strongest possible
argument for the team's central point — *extraction alone is not safe to ship*.

---

## 6. Why banks rationally do nothing — the regulatory arithmetic

**RBI's IT Governance Master Direction (7 November 2023, effective 1 April
2024)** requires regulated entities to maintain a board-approved IT governance
framework, including a **board-approved Change Management Policy**. Any change
to a core accrual engine is therefore not an engineering decision; it is a
board-visible, auditable risk event.

**RBI's Interest Rate on Deposits Directions** fix the arithmetic itself.
Verified against the primary source — Master Direction (Interest Rate on
Deposits) Directions, **2016**, updated as on 7 June 2024:

- **Clause 6(a)** — interest on domestic rupee savings deposits is calculated on
  a **daily product basis**.
- **Clause 6(a)(1)–(2)** — a **uniform rate up to ₹1 lakh**, irrespective of the
  amount within that limit; **differential rates permitted** on end-of-day
  balance above ₹1 lakh.
- **Clause 4(f)** — *"All transactions, involving payment of interest on
  deposits shall be rounded off to the nearest rupee for rupee deposits and to
  two decimal places for FCNR (B) deposits."*

A related RBI circular states the rounding rule exactly: *fraction of 50 paise
and above is rounded to the next higher rupee; less than 50 paise is ignored.*
That is **HALF_UP at the rupee**, written down by the regulator.

A 2025 restatement of these Directions exists; its clause numbering has not been
verified, so cite the 2016 clauses. See `07 - Verification Pass.md §C1`.

Put these together and the "one paisa across millions of accounts" line in the
submission is not rhetoric. Rounding behaviour is a *prescribed* regulatory
parameter. A rewrite that rounds differently is not a bug report — it is
non-compliance with a Master Direction, discovered at audit, across the entire
deposit book, retrospectively.

**Conclusion the evidence supports:** the bank's refusal to modernise is a
correct decision under its own risk framework. The only thing that changes the
decision is evidence of equivalence. That is the product.

---

## 7. Market size — for the "why does this matter commercially" slide

- Mainframe modernisation market: **$8.39bn (2025) → $13.34bn (2030)**,
  CAGR 9.7% (MarketsandMarkets). Other houses put 2025 between $6bn and $10bn
  with 8–13% CAGR — cite the range, not a single number.
- Named drivers: workforce retirement, stricter regulation, data growth.
  Banking, insurance and government are the lead verticals.
- The fastest-growing segment is **software** — automated code conversion,
  testing suites, AI modernisation engines — not services. That is the segment
  this project sits in.
- India-specific: the ~$1bn BCG figure above is the addressable core-banking
  upgrade spend for Indian lenders alone.

---

## 8. One-paragraph version, for the deck

> India's banks run deposit and loan arithmetic on COBOL written in the 1980s
> and 1990s. Over 40% of banking systems worldwide still do; 92 of the top 100
> banks run on mainframes. BCG puts the bill for upgrading Indian core banking
> systems at a billion dollars. The blocker is not translation — AWS, IBM and
> TCS all ship automated COBOL-to-Java conversion today. The blocker is that no
> specification of the current behaviour exists, so no one can prove the rewrite
> is equivalent. IBM's own research paper on its translation product says the
> output "cannot be trusted." When a bank guesses wrong, it costs what TSB's
> migration cost: 1.9 million customers locked out, a £48.65m regulatory fine,
> £400m all-in. And RBI writes the rounding rule down — interest on rupee
> deposits, rounded to the nearest rupee, on a daily product basis — so a
> rounding drift is not a bug, it is a Master Direction breach across the whole
> deposit book.
