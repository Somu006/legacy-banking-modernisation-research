# 03 — Vendor and Industry Sources

Product documentation and industry material. **Rated A only where the vendor is
describing its own product** — that is a primary source about what the product
does, but it is still marketing about whether it works.

⚠ **These pages change.** The AWS product line was renamed mid-research (see
`§ AWS` below). Every entry carries an access date; re-check before the pitch.

---

## IBM

**IBM.** *About IBM watsonx Code Assistant for Z.*
https://www.ibm.com/docs/en/watsonx/watsonx-code-assistant-4z/2.x?topic=welcome-overview-watsonx-code-assistant-z
**Confidence: A** (IBM on IBM). ⚠ Returns HTTP 403 to automated fetches; open in
a browser.

**Used for:** `../03 §1` — the finding that reframed the whole novelty position.

The **Validation Assistant** lets developers ensure semantic equivalence between
refactored COBOL and transformed Java by means of automated test generation.
Corroborated independently by Futurum, VTI and TechRepublic, and by the IBM
Research paper `2504.10548` in `01`.

**IBM Research.** *watsonx Code Assistant for Z is the Rosetta Stone for
mainframes.*
https://research.ibm.com/blog/watsonx-code-assistant-for-z-is-the-rosetta-stone-for-mainframes
**Confidence: A.** Describes passing the same data inputs through both COBOL and
Java and flagging divergence.

**IBM ADDI** (Application Discovery and Delivery Intelligence) — static analysis,
inventory, dependency mapping and business-rule extraction across COBOL, JCL,
DB2 and IMS. Cited in `../01 §5` via Swimm
(https://swimm.io/learn/cobol/5-cobol-business-rules-extraction-tools-to-know-in-2026),
**confidence C** — a third-party roundup, not IBM documentation. That page is
also the source of the useful "high recall, low precision" characterisation of
automated rule extraction.

---

## AWS

### ⚠ The product line was renamed during this research

AWS documentation now states that both the **Mainframe Modernization
self-managed experience** and the **Managed Runtime experience** are *no longer
open to new customers*, with capabilities folded into **AWS Transform**. Say
"AWS Transform for mainframe (formerly Blu Age / AWS Mainframe Modernization)"
to avoid sounding out of date. See `../07 §C6`.

**AWS.** *AWS Transform for mainframe is now generally available.* May 2025.
https://aws.amazon.com/about-aws/whats-new/2025/05/aws-transform-mainframe-generally-available
**Confidence: A.** First agentic AI mainframe modernisation service. **ADP cut
rule-extraction time by 80% and manual effort by over 90%.**

**AWS.** *AWS Transform for mainframe FAQ.*
https://docs.aws.amazon.com/m2/latest/userguide/ba-faq.html
**Confidence: A.** Supported inputs: COBOL, PL/I, JCL, CICS, BMS/MFS screens,
DB2, IMS, flat files, GDG, VSAM. Notably answers "No" to whether modernisation
eliminates the need for testing.

**AWS.** *Refactoring applications automatically with AWS Blu Age.*
https://docs.aws.amazon.com/m2/latest/userguide/refactoring-m2.html
**Confidence: A.** **Blu Age Compare** performs functional equivalence testing
against **reference datasets from the mainframe or iSeries** — the dependency
that underpins the "needs your mainframe" argument in `../03 §3c`.

**AWS.** *Mainframe Modernization Application Testing (Preview).* November 2023.
https://aws.amazon.com//about-aws/whats-new/2023/11/aws-mainframe-modernization-application-testing-preview
**Confidence: A.** Test capture, automated replay, comparison, regression at
scale — i.e. **captured mainframe traffic**, not generated inputs.

**AWS.** *Value of Blu Age automated refactoring* (re:Invent 2022).
https://d1.awsstatic.com/events/Summits/reinvent2022/ENT211_Value-of-Blu-Age-automated-refactoring-with-AWS-Mainframe-Modernization.pdf
**Confidence: B** — conference deck. Source of the quality-gate list:
completeness (Blu Insights), functional equivalence (Blu Age Compare),
performance equivalence, code quality (SonarQube), coverage (JaCoCo).

---

## Mechanical Orchard

**Mechanical Orchard.** *Imogen Platform.*
https://www.mechanical-orchard.com/platform
**Confidence: A.** Verified quotes: Imogen *"verifies it against real production
data, slice by slice"* and *"reads your source directly"*; legacy and modern
components *"run side by side"*.

**Used for:** `../03 §1` and the "needs production data" differentiator.

**Thoughtworks.** *Mechanical Orchard launches Imogen; first partner
Thoughtworks.* 2025.
https://www.thoughtworks.com/en-us/about-us/news/2025/mechanical-orchard-launch-imogen-1st-partner-thoughtworks
**Confidence: A** (partner announcement). The *generate-validate test loop* and
audit-level behavioural parity before cutover.

**HyperFRAME Research.** *The Behavior-First Paradigm: Moving Mainframe
Modernization Past LLM Wishful Thinking.* 22 May 2026.
https://hyperframeresearch.com/2026/05/22/the-behavior-first-paradigm-moving-mainframe-modernization-past-llm-wishful-thinking/
**Confidence: B** — analyst commentary. Names the category. Source of
*"compounding logical discrepancies"* and the figures 14% fully modernised data
architecture, 78%/37% AI strategic-importance versus structured evaluation.

**HyperFRAME Research.** *Imogen update — from translation to proof.*
13 July 2026.
https://hyperframeresearch.com/2026/07/13/mechanical-orchards-imogen-update-tests-whether-ai-mainframe-modernization-can-move-from-translation-to-proof/
**Confidence: B.** AWS Transform business-rule extraction integration; Leidos
partnership.

---

## Cognizant — the organiser

Worth knowing precisely, because someone in the room may have worked on it.

**Cognizant.** *AI-led mainframe modernization.*
https://www.cognizant.com/us/en/services/cloud-solutions/mainframe-modernization
**Confidence: A.** Accelerators that extract business rules from legacy COBOL,
generate specifications, and rewrite into cloud-native Java. Platforms named:
Flowsource, Neuro, Skygrade, ZDLC.

**Cognizant.** *How generative AI accelerates mainframe modernization.*
https://www.cognizant.com/us/en/insights/insights-blog/generative-ai-for-mainframe-modernization
**Confidence: A.** Verified: reverse engineering to fill documentation gaps,
interactive code explanation, business-rule extraction, and generating
*specifications for parity in new implementations*.

**Useful detail found during verification:** this page describes **no validation
or equivalence testing at all**. Cognizant's public gen-AI modernisation
positioning is extraction-forward. That is worth knowing before you tell a
Cognizant judge that extraction alone is a liability — it is a point of
agreement to build on, not a criticism to lead with.

---

## TCS

**TCS.** *MasterCraft Legacy Modernization.*
https://www.tcs.com/what-we-do/products-platforms/tcs-mastercraft/solution/tcs-mastercraft-legacy-modernization-stay-relevant-modern
**Confidence: A.** TransformPlus: Analyze–Strategize–Execute; automatic
extraction of business rules and structural information; automated COBOL→Java
conversion to layered cloud-ready code. v5.0 adds ML-enhanced analysis.

---

## Market and industry context

**Boston Consulting Group.** *Cloud-based Core Transformations.* August 2024.
⚠ **Cited via** Business Standard —
https://www.business-standard.com/industry/banking/indian-lenders-need-1-billion-upgrade-core-bank-systems-says-bcg-124080101587_1.html
**Confidence: B** (reporting an A study). **The primary BCG report was not
obtained — retrieve it if this becomes a headline number.**

~$1bn over 5–10 years for Indian core banking upgrades; Indian bank IT spend up
to 5% of revenue vs 7–9% globally; **~80% of IT budget on "run the bank"**;
40,000+ RBI ombudsman digital-banking complaints across FY22–FY23.

**MarketsandMarkets.** *Mainframe Modernization Market.*
https://www.marketsandmarkets.com/PressReleases/mainframe-modernization.asp
**Confidence: B.** $8.39bn (2025) → $13.34bn (2030), CAGR 9.7%.

**360iResearch.** https://www.360iresearch.com/library/intelligence/mainframe-modernization
**Confidence: C.** Alternative range $6–10bn for 2025, 8–13% CAGR. **Cite the
range across both houses rather than a single figure.**

**Dvara Research.** *Modernisation of India's Banking Sector.*
https://dvararesearch.com/wp-content/uploads/2024/01/Modernisation-of-Indias-Banking-Sector.pdf
**Confidence: A.** Indian banking modernisation context.

---

## ⚠ Sources rated C — do not put these numbers on a slide

These were used for orientation only. Every figure from them is marked
**[contested]** in `../01`.

| Source | Figures it is the origin of |
|---|---|
| Pragmatic Coders, *2025 Legacy Code Stats* — https://www.pragmaticcoders.com/resources/legacy-code-stats | 70% of banks on legacy; >43% of banking systems on COBOL; 220bn lines; 92 of top 100 banks on mainframes; $3tn/day |
| Computerworld, AFCEA, DistantJob, Metaintro, DataField.Dev | COBOL workforce age 55–58, 10%/year retirement, ~24,000 US COBOL developers, 60% cite hiring as biggest challenge |
| Various | "95% of ATM swipes run on COBOL" — traces to a single 2017 press item. **Retire this claim.** |
| CAST Software, DXC | General COBOL-in-banking context |
| Shinetech, 10x Banking | Dual-run / parallel-run migration practice |

The one figure from this group that is safe to use is **92 of the world's top
100 banks run on IBM mainframes** — widely reported and not seriously disputed —
but attribute it as an industry figure, not a primary statistic.
