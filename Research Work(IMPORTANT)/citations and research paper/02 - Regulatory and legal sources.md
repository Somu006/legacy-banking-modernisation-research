# 02 — Regulatory and Legal Sources

The regulatory material. These are the highest-value citations in the dossier
for a banking panel, and the ones most likely to be checked.

---

## RBI — Interest Rate on Deposits

**Reserve Bank of India.** *Master Direction — Reserve Bank of India (Interest
Rate on Deposits) Directions, 2016.* Issued 3 March 2016, **updated as on
7 June 2024**.
https://www.rbi.org.in/Scripts/BS_ViewMasDirections.aspx?id=10296

**Confidence: A — primary source, clauses verified individually 4 August 2026.**

**Used for:** the entire demo design — `../01 §6`, `../02 §3`,
`Solution Folder/02 §N1`, visual 07.

| Clause | What it says |
|---|---|
| **6(a)** | Interest on domestic rupee savings deposits shall be calculated on a **daily product basis**. |
| **6(a)(1)** | A **uniform interest rate** shall be set on balance up to **Rupees one lakh**, irrespective of the amount in the account within this limit. |
| **6(a)(2)** | **Differential rates** of interest may be provided for any end-of-day savings bank balance exceeding Rupees one lakh. |
| **4(f)** | All transactions involving payment of interest on deposits shall be **rounded off to the nearest rupee** for rupee deposits and to **two decimal places for FCNR(B)** deposits. |

**The precise rounding mode.** A related RBI circular states it explicitly:
*fraction of 50 paise and above is rounded to the next higher rupee; fraction of
less than 50 paise is ignored.* That is **HALF_UP at the rupee**, written down
by the regulator — which is what gives the reference model an exact rounding
mode instead of an inferred one.

### ⚠ Important caveat on the year

Earlier drafts of this dossier cited a **2025** Master Direction. A 2025
restatement does exist — RBI's own FAQ PDF dated 01042025 refers to the
*Interest Rate on Deposits Directions, 2025*, and there is a *Commercial Banks —
Interest Rate on Deposits Directions, 2025*:

- FAQ: https://www.rbi.org.in/commonman/Upload/English/FAQs/PDFs/FAQIRD01042025.pdf
- Master Directions index: https://www.rbi.org.in/Scripts/BS_ViewMasDirections.aspx

### ✅ Partially resolved — the numbering definitely changed

RBI's own 2025 FAQ was downloaded (`pdfs/rbi-faq-interest-rate-on-deposits-2025.pdf`)
and settles half the question. The 2025 Direction uses a **different, decimal
paragraph numbering scheme** — the FAQ cites paragraphs **4.22, 9.1.6, 10.2,
20.2.1, 22, 29.1, 29.5, 29.8**, not the 2016 style of *clause 4(f)* or
*6(a)(1)*.

**So the 2016 clause references do not carry over to 2025.** Citing "2025,
clause 4(f)" would have been wrong — the caution was justified.

**Still unresolved:** which 2025 paragraphs correspond to daily product basis,
the ₹1 lakh threshold and the rounding rule. The FAQ does not cover those
topics. **Cite the 2016 Direction**, whose clauses are verified, unless you open
the 2025 document and map them yourself. See `../07 - Verification Pass.md §C1`.

---

## RBI — IT Governance

**Reserve Bank of India.** *Master Direction on Information Technology
Governance, Risk, Controls and Assurance Practices.* Issued **7 November 2023**,
effective **1 April 2024**.

Mirror used: https://vinodkothari.com/wp-content/uploads/2023/11/Comprehensive-IT-Directions-2023_v1-for-upload.pdf
⚠ Cited via a law-firm mirror; **retrieve the RBI original before formal
citation.**

**Confidence: A for the substance, B for the copy consulted.**

**Used for:** `../01 §6`, `Solution Folder/02 §N8`.

Requires regulated entities to maintain a board-approved IT governance framework
including a **board-approved Change Management Policy**. This is what makes a
core-engine rewrite a board-visible, auditable risk event rather than an
engineering decision — and what the evidence bundle (N8) is shaped to satisfy.

Detailed specifics on UAT and testing procedure were **not** established; the
secondary summaries consulted did not cover them. Do not claim the Direction
prescribes particular testing practices without reading it.

---

## FCA / PRA — the TSB enforcement action

**Financial Conduct Authority.** *TSB fined £48.65m for operational resilience
failings.* December 2022.
https://www.fca.org.uk/news/press-releases/tsb-fined-48m-operational-resilience-failings

**Bank of England / PRA.** *TSB fined for operational resilience failings.*
https://www.bankofengland.co.uk/news/2022/december/tsb-fined-for-operational-resilience-failings
⚠ Returns HTTP 403 to automated fetches; open in a browser.

**Confidence: A — regulator's own release.**

**Used for:** `../01 §4`.

Verified figures:

- Joint FCA/PRA penalty: **£48,650,000**
- Customer redress paid: **£32.7 million**
- Customer base: **5.2 million**; the FCA says *"all of TSB's branches and a
  significant proportion of its 5.2 million customers"* were affected
- Migration April 2018; business-as-usual not restored until December 2018
- Cause cited: operational risk management and governance failings, including
  management of **outsourcing risks**

**PRA.** *PRA fines the former Chief Information Officer of TSB Bank plc.*
April 2023.
https://www.bankofengland.co.uk/news/2023/april/pra-fines-former-cio-of-tsb-bank-plc-for-breach-of-pra-senior-manager-conduct-rules
Personal penalty of **£81,620** under the Senior Manager Conduct Rules.

### ⚠ On the 1.9 million figure

**Not in the regulator's release.** It comes from contemporaneous press
reporting and is corroborated independently across several outlets:

- The Register, 24 April 2018 — https://www.theregister.com/2018/04/24/gov_demands_urgent_answers_to_tsb_it_meltdown/
- IEEE Spectrum — https://spectrum.ieee.org/new-software-system-snags-tsbs-online-and-mobile-banking-customers-in-uk
- The Courier & Advertiser, 26 April 2018

**Attribute it to press reporting, not to the FCA.** The safest slide wording is
the FCA's own: *a significant proportion of 5.2 million customers.*

The **~£400m total cost** figure comes from Futurum Group analysis
(https://futurumgroup.com/insights/tsb-bank-fined-62m-for-a-failed-mainframe-migration-a-cautionary-tale-we-can-learn-from/)
— **confidence B**, an analyst aggregation rather than a regulatory or audited
figure.

---

## RBI supervisory action — HDFC Bank

Used in `../01 §3` as the India-specific example of IT fragility becoming a
supervisory event.

- RBI ordered HDFC Bank to halt all Digital 2.0 launches and stop issuing new
  credit cards, **2 December 2020**
- Followed outages in November 2018, December 2019, and a data-centre power
  failure on 21 November 2020
- Credit-card restriction relaxed 17 August 2021; Digital 2.0 restriction ran
  into 2022
- RBI also ordered an external audit of the bank's IT infrastructure

Sources — **confidence B, press reporting**; the RBI order itself was not
retrieved:

- ThePrint — https://theprint.in/economy/why-rbi-has-restricted-hdfc-bank-from-launching-new-digital-facilities-issuing-credit-cards/556721/
- Business Standard — https://www.business-standard.com/article/finance/hdfc-bank-submits-action-plan-to-rbi-hopes-to-fix-outage-issue-in-3-months-121012200778_1.html

**If this becomes load-bearing in the pitch, retrieve the RBI press release.**

---

## Domain reference — day-count conventions

**Thomson Reuters Practical Law.** *Day Count Convention.*
https://uk.practicallaw.thomsonreuters.com/w-026-0314
**Confidence: A.** Definitions of 30/360 and Actual/365.

The claim that **India uses 30/360 for G-Secs** traces to
https://fintelligents.com/day-count-convention/ — **confidence C**. If you use
it, verify against RBI's own G-Sec documentation first.
