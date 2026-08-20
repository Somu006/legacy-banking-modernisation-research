# 06 — Sources

Confidence key: **A** — primary source (regulator, standards body, peer-reviewed
paper, vendor documentation about its own product). **B** — reputable secondary
reporting. **C** — vendor marketing or content-marketing blog; directionally
useful, numerically soft.

---

## Regulation (India)

| Source | Confidence | Used for |
|---|---|---|
| RBI, *Master Direction — Reserve Bank of India (Interest Rate on Deposits) Directions, 2025* (1 April 2025) — https://www.rbi.org.in/ · mirror: https://www.gujfed.com/circular/2025-master-direction-circular/1.4.2025%20Master%20Direction%20-%20Reserve%20Bank%20of%20India%20(Interest%20Rate%20on%20Deposits)%20Directions,%202025.pdf | **A** | Daily product basis; uniform rate to ₹1 lakh; differential rates above; rounding to nearest rupee for rupee deposits, two decimals for FCNR(B). |
| RBI, *Master Direction on Information Technology Governance, Risk, Controls and Assurance Practices* (7 Nov 2023, effective 1 Apr 2024) — https://vinodkothari.com/wp-content/uploads/2023/11/Comprehensive-IT-Directions-2023_v1-for-upload.pdf | **A** | Board-approved IT governance framework and Change Management Policy requirement. |
| RBI action on HDFC Bank, Dec 2020 — https://theprint.in/economy/why-rbi-has-restricted-hdfc-bank-from-launching-new-digital-facilities-issuing-credit-cards/556721/ · https://www.business-standard.com/article/finance/hdfc-bank-submits-action-plan-to-rbi-hopes-to-fix-outage-issue-in-3-months-121012200778_1.html | **B** | Digital 2.0 halt, credit-card issuance freeze, external IT audit, prior penalties for Nov 2018 / Dec 2019 outages, Aug 2021 partial relief. |

## Regulation and failure (UK — the TSB case)

| Source | Confidence | Used for |
|---|---|---|
| Bank of England / PRA news release, Dec 2022 — https://www.bankofengland.co.uk/news/2022/december/tsb-fined-for-operational-resilience-failings | **A** | £48.65m joint FCA/PRA fine for operational risk management and governance failings. |
| Computer Weekly — https://www.computerweekly.com/news/252528519/TSB-hit-with-huge-fine-after-IT-migration-disaster | **B** | Migration timeline, Proteo4UK, customer impact. |
| Futurum Group — https://futurumgroup.com/insights/tsb-bank-fined-62m-for-a-failed-mainframe-migration-a-cautionary-tale-we-can-learn-from/ | **B** | ~£400m total cost; £32.7m redress; former CIO fined £81,620. |
| Celent — https://www.celent.com/en/insights/771585276 | **B** | Migration lessons. |

## Indian banking modernisation economics

| Source | Confidence | Used for |
|---|---|---|
| BCG via Business Standard, Aug 2024 — https://www.business-standard.com/industry/banking/indian-lenders-need-1-billion-upgrade-core-bank-systems-says-bcg-124080101587_1.html | **B** (reporting an **A** study) | ~$1bn over 5–10 years; 1990s monolithic cores; IT spend 5% vs 7–9% globally; 40,000+ RBI ombudsman digital-banking complaints FY22–FY23. |
| Dvara Research, *Modernisation of India's Banking Sector* — https://dvararesearch.com/wp-content/uploads/2024/01/Modernisation-of-Indias-Banking-Sector.pdf | **A** | Indian banking modernisation context. |

## Scale of the COBOL install base

| Source | Confidence | Used for |
|---|---|---|
| Pragmatic Coders, *2025 Legacy Code Stats* — https://www.pragmaticcoders.com/resources/legacy-code-stats | **C** | 70% of banks on legacy; >43% of banking systems on COBOL; 220bn lines; 92 of top 100 banks on mainframes; $3tn/day. Aggregator — verify any figure before putting it on a slide. |
| CAST Software — https://www.castsoftware.com/pulse/why-cobol-still-dominates-banking-and-how-to-modernize | **C** | Context. |
| DXC — https://dxc.com/insights/knowledge-base/blogs/why-banks-still-rely-on-cobol-driven-mainframe-systems | **C** | Context. |
| MarketsandMarkets, mainframe modernisation market — https://www.marketsandmarkets.com/PressReleases/mainframe-modernization.asp | **B** | $8.39bn (2025) → $13.34bn (2030), CAGR 9.7%. |
| 360iResearch — https://www.360iresearch.com/library/intelligence/mainframe-modernization | **C** | Alternative range: $6–10bn 2025, 8–13% CAGR. Cite as a range. |

**Workforce figures (average age 55–58, 10%/yr retirement, ~24,000 US COBOL
developers, 60% cite hiring as biggest challenge) come from Computerworld
(dated), AFCEA, DistantJob, Metaintro and DataField.Dev — all C, several
recycling the same unsourced numbers. Treated as [contested] throughout `01`.**

## Peer-reviewed / arXiv — translation reliability

| Source | Confidence | Used for |
|---|---|---|
| Pan et al., *Lost in Translation: A Study of Bugs Introduced by LLMs while Translating Code* — https://arxiv.org/abs/2308.03109 | **A** | 1,700 samples; 2.1%–47.3% correct; 43K+ translations, 1,748 labelled bugs, 1,365 bug-fix pairs, 15 bug categories; prompt crafting +5.5%. |
| *Beyond Translation Accuracy: Addressing False Failures in LLM-Based Code Translation* — https://arxiv.org/html/2605.02195v3 | **A** | Silent failures from operator-semantics differences (modulo on negatives). |
| *Hallucinations in LLM-Based Code Summarization: Unveiling, Detection, and Mitigation*, PACMSE — https://dl.acm.org/doi/10.1145/3808139 | **A** | Hallucination rates 66% → 59%; Hallu-Det F1 0.95. Supports "a confident wrong rule is worse than no rule." |
| *Beyond Functional Correctness: Exploring Hallucinations in LLM-Generated Code* — https://arxiv.org/abs/2404.00971 | **A** | Hallucination taxonomy: 3 primary, 12 specific categories. |

## Peer-reviewed / arXiv — COBOL translation validation

| Source | Confidence | Used for |
|---|---|---|
| IBM Research, *Automated Testing of COBOL to Java Transformation* — https://arxiv.org/abs/2504.10548 | **A** | *"the resulting code cannot be trusted to correctly translate the original code"*; symbolic execution generating unit tests from COBOL, mocked dependencies, converted to JUnit; feedback loop into the model. |
| *Quality Evaluation of COBOL to Java Code Transformation* (ASE 2025) — https://arxiv.org/abs/2507.23356 | **A** | Analytic checkers + LLM-as-a-judge; CI integration; large-scale benchmarking. |
| *SEDCoT: Enhancing LLM-Based COBOL Code Translation via Symbolic Execution and Delta Debugging* — https://arxiv.org/abs/2607.04092 | **A** | COBOL as a low-resource language; three phases (translate / symbolic-execution repair / delta debugging); ≥12% over SOTA. |
| *Deterministic vs. LLM-Controlled Orchestration for COBOL-to-Python Modernization* — https://arxiv.org/abs/2605.09894 | **A** | Deterministic matches agentic accuracy; up to 3.5× fewer tokens; better worst-case robustness and lower variance. |

## Added by the verification pass (see `07 - Verification Pass.md`)

| Source | Confidence | Used for |
|---|---|---|
| *Agentic Method for Deterministic Validation of Legacy Code Migration* (**Locksmith**), arXiv 2607.28271, 30 July 2026 — https://arxiv.org/abs/2607.28271 | **A** | Closest prior art. Legacy as execution oracle via "Parity Gate"; both targets run **off-mainframe on commodity hardware** with mocks; "Witness Search" input generation; parity-preserving mutations; "Locked Paragraphs". 3 case studies, 430–4,114 LOC, **91.90% branch coverage**, full parity on accepted tests. Confirmed to have **no business-rule verdicts and no regulatory checks**. |
| *AgentModernize: Preserving Business Logic in Legacy Modernization with Multi-Agent LLMs and Behavioral Specification Graphs*, arXiv 2605.17535 — https://arxiv.org/pdf/2605.17535 | **A** | **Business Rule Preservation Score** and **Behavioural Equivalence Rate** — falsifies the original "nobody reports per-rule" claim. BSG captured **91.2% of gold-standard rules**; BER **9.4% / 8.1% / 19.4%** across models, baselines **0.0%**. |
| RBI, *Master Direction — Reserve Bank of India (Interest Rate on Deposits) Directions, 2016* (3 Mar 2016, updated 7 Jun 2024) — https://www.rbi.org.in/Scripts/BS_ViewMasDirections.aspx?id=10296 | **A** | **Primary source, replaces the 2025 citation.** Clause 6(a) daily product basis; 6(a)(1)–(2) uniform rate to ₹1 lakh and differential above; 4(f) rounding to nearest rupee / two decimals FCNR(B). |
| FCA, *TSB fined £48.65m for operational resilience failings* — https://www.fca.org.uk/news/press-releases/tsb-fined-48m-operational-resilience-failings | **A** | Fine figure and £32.7m redress, from the regulator. Note the FCA says *"a significant proportion of its 5.2 million customers"* — the 1.9m figure is press reporting. |
| The Register (24 Apr 2018) — https://www.theregister.com/2018/04/24/gov_demands_urgent_answers_to_tsb_it_meltdown/ · IEEE Spectrum — https://spectrum.ieee.org/new-software-system-snags-tsbs-online-and-mobile-banking-customers-in-uk | **B** | Independent corroboration of the 1.9 million figure. |
| EvolveWare, *Modernization use cases for business rules* — https://evolveware.com/6-modernization-use-cases-for-business-rules-in-system-analysis-and-design/ | **C** | Markets rule extraction for regulatory audit — but **static documentation only**, no execution and no behavioural comparison against a regulation. Supports the N1 gap. |
| *Automated Validation of COBOL to Java Transformation*, arXiv 2506.10999 — https://arxiv.org/abs/2506.10999 | **A** | Further translation-validation work; surfaced during verification, not read in full. |

## Peer-reviewed — business rule extraction

| Source | Confidence | Used for |
|---|---|---|
| *A-COBREX: A Tool for Identifying Business Rules in COBOL Programs*, ICSE 2025 (IBM Research) — https://research.ibm.com/publications/a-cobrex-a-tool-for-identifying-business-rules-in-cobol-programs | **A** | Precision 62.21%, recall 74.12% (fuzzy match, 27 annotated programs). |
| *LLM Vs Rule-Based — The COBRAIN Tool and An Empirical Study on Extracting Business Rules from COBOL*, EASE 2025 — https://dl.acm.org/doi/10.1145/3756681.3756982 | **A** | COBRAIN precision 1.0 / recall 0.746 vs COBREX; F1 0.73 vs COBREX 0.59. |
| Cosentino et al., *Extracting Business Rules from COBOL: A Model-Based Framework* — https://inria.hal.science/hal-00869235/document | **A** | Model-based representation, business-concept variable identification, code slicing. |
| *Business as Rulesual: A Benchmark and Framework for Business Rule Flow Modeling with LLMs* — https://arxiv.org/abs/2505.18542 | **A** | BREX benchmark; 13 SOTA LLMs; expert annotation with ICC/Kappa agreement. |

## Testing theory

| Source | Confidence | Used for |
|---|---|---|
| Barr, Harman, McMinn, Shahbaz, Yoo, *The Oracle Problem in Software Testing: A Survey* (IEEE TSE, 2015) | **A** | The oracle problem; differential testing as a mitigation. |
| Segura et al., *Metamorphic Testing: A Review of Challenges and Opportunities*, ACM CSUR 51(1) — https://dl.acm.org/doi/10.1145/3143561 | **A** | Metamorphic relations; oracle-problem alleviation. |
| Cadar, Dunbar, Engler, *KLEE: Unassisted and Automatic Generation of High-Coverage Tests for Complex Systems Programs*, OSDI 2008 — https://www.usenix.org/legacyurl/klee-unassisted-and-automatic-generation-high-coverage-tests-complex-systems-programs-0 | **A** | Symbolic execution reference implementation. |
| *Boundary Value Test Input Generation Using Prompt Engineering with LLMs* — https://arxiv.org/html/2501.14465v1 | **A** | LLM-driven boundary value generation; fault detection and coverage. |
| Twitter Diffy — https://github.com/twitter-archive/diffy · https://github.com/opendiffy/diffy | **A** | Multicast proxy; response comparison; "if two implementations return similar responses across a sufficiently large and diverse set of requests, they can be treated as equivalent"; used at Twitter, Airbnb, Baidu, ByteDance. |
| Microsoft, *Shadow Testing* (Code-with Engineering Playbook) — https://microsoft.github.io/code-with-engineering-playbook/automated-testing/shadow-testing/ | **A** | Shadow testing definition and practice. |

## COBOL technical

| Source | Confidence | Used for |
|---|---|---|
| GnuCOBOL project — https://gnucobol.sourceforge.io/ · https://sourceforge.net/projects/gnucobol/files/gnucobol/3.2/ | **A** | Licensing (GPL/LGPL); 19 dialects; `-std=ibm-strict`; Enterprise COBOL 6.3 reserved words. |
| GnuCOBOL bug #997 (coverage on Ubuntu 24.04) — https://sourceforge.net/p/gnucobol/bugs/997/ | **A** | Known coverage-build friction. |
| NIST CCVS85 test suite — https://github.com/Zaneham/nist-cobol85-test-suite · https://github.com/z390development/nistcobol85 | **A** | 512 programs, 8,800+ test cases, public domain. GnuCOBOL passes 9,700/9,748. |
| IBM, *Mapping between COBOL and Java data types* — https://www.ibm.com/docs/en/cobol-zos/6.4.0?topic=ci-mapping-between-cobol-java-data-types-non-oo-coboljava-interoperability | **A** | Precision loss on COMP-1/COMP-2 ↔ float/double; BigDecimal as legal partner for zoned and packed decimal. |
| IBM, *PACKED-DECIMAL (COMP-3)* — https://www.ibm.com/docs/en/SS6SG3_6.3.0/perf/packed_decimal.html | **A** | Packed decimal representation and exactness. |
| ProLeap COBOL parser — https://github.com/uwol/proleap-cobol-parser | **A** | ANTLR4 grammar; AST + ASG with data/control flow; `COPY`/`REPLACE` preprocessing; `EXEC SQL`/`EXEC CICS` extracted as text; passes NIST; MIT; applied to banking and insurance COBOL. |
| GCBLUnit — https://github.com/OlegKunitsyn/gcblunit | **A** | GnuCOBOL unit testing with JUnit-format reporting. |
| gcov (GCC) — https://en.wikipedia.org/wiki/Gcov | **B** | `-fprofile-arcs -ftest-coverage`; per-statement execution counts. |
| `aws-samples/aws-mainframe-modernization-carddemo` — https://github.com/aws-samples/aws-mainframe-modernization-carddemo | **A** | Apache 2.0 COBOL credit-card application; deliberately varied coding styles; `CBACT04C.cbl` interest calculation; AWS's own tooling benchmark. |

## Vendor landscape

| Source | Confidence | Used for |
|---|---|---|
| IBM, *About watsonx Code Assistant for Z* — https://www.ibm.com/docs/en/watsonx/watsonx-code-assistant-4z/2.x?topic=welcome-overview-watsonx-code-assistant-z | **A** | Validation Assistant; semantic equivalence via automated test generation. |
| IBM Research blog — https://research.ibm.com/blog/watsonx-code-assistant-for-z-is-the-rosetta-stone-for-mainframes | **A** | Same inputs through both, divergence flagged, developer assisted to fix. |
| AWS, *Refactoring applications automatically with AWS Blu Age* — https://docs.aws.amazon.com/m2/latest/userguide/refactoring-m2.html | **A** | Automated refactoring; Blu Age Compare; reference datasets from mainframe/iSeries. |
| AWS, *Mainframe Modernization Application Testing (Preview)* — https://aws.amazon.com//about-aws/whats-new/2023/11/aws-mainframe-modernization-application-testing-preview | **A** | Test capture, automated replay, comparison, regression at scale. |
| AWS, *AWS Transform for mainframe is now generally available* (May 2025) — https://aws.amazon.com/about-aws/whats-new/2025/05/aws-transform-mainframe-generally-available | **A** | First agentic AI mainframe modernisation service; ADP 80% rule-extraction time reduction, >90% manual effort reduction. |
| AWS, *Transform for mainframe now supports application reimagining* (Dec 2025) — https://aws.amazon.com/about-aws/whats-new/2025/12/transform-mainframe-application-reimagining | **A** | Business logic extraction, activity analysis, code decomposition. |
| Mechanical Orchard / Thoughtworks launch of Imogen — https://www.thoughtworks.com/en-us/about-us/news/2025/mechanical-orchard-launch-imogen-1st-partner-thoughtworks | **A** | Generate-validate test loop; behaviour and data flows; equivalence proof. |
| Mechanical Orchard platform — https://www.mechanical-orchard.com/platform | **A** | Behavioural specification from real data flows; audit-level parity before cutover. |
| HyperFRAME Research, *The Behavior-First Paradigm* (22 May 2026) — https://hyperframeresearch.com/2026/05/22/the-behavior-first-paradigm-moving-mainframe-modernization-past-llm-wishful-thinking/ | **B** | Category naming; "compounding logical discrepancies"; vendor positioning; 14% fully modernised data architecture; 78%/37% AI strategic-importance vs structured evaluation. |
| HyperFRAME Research, Imogen Summer 2026 update (13 Jul 2026) — https://hyperframeresearch.com/2026/07/13/mechanical-orchards-imogen-update-tests-whether-ai-mainframe-modernization-can-move-from-translation-to-proof/ | **B** | AWS Transform business-rule extraction integration; Leidos partnership. |
| Cognizant, *AI-led mainframe modernization* — https://www.cognizant.com/us/en/services/cloud-solutions/mainframe-modernization | **A** (about its own offering) | Accelerators extracting business rules, generating specifications, rewriting to cloud-native Java; Flowsource, Neuro, Skygrade, ZDLC. |
| Cognizant, *How generative AI accelerates mainframe modernization* — https://www.cognizant.com/us/en/insights/insights-blog/generative-ai-for-mainframe-modernization | **A** | Legacy understanding, documentation gap-filling, rule extraction, COBOL→Java. |
| TCS MasterCraft TransformPlus — https://www.tcs.com/what-we-do/products-platforms/tcs-mastercraft/solution/tcs-mastercraft-legacy-modernization-stay-relevant-modern | **A** | Analyze-Strategize-Execute; automated rule extraction; COBOL→layered cloud-ready Java; v5.0 ML enhancements. |
| Swimm, *5 COBOL Business Rules Extraction Tools* — https://swimm.io/learn/cobol/5-cobol-business-rules-extraction-tools-to-know-in-2026 | **C** | IBM ADDI capabilities; the "high recall, low precision" characterisation of automated extraction. |

## Domain — interest calculation

| Source | Confidence | Used for |
|---|---|---|
| Thomson Reuters Practical Law, *Day Count Convention* — https://uk.practicallaw.thomsonreuters.com/w-026-0314 | **A** | 30/360 and Actual/365 definitions. |
| Fintelligents — https://fintelligents.com/day-count-convention/ | **C** | India uses 30/360 for G-Secs. |

## Banking migration practice

| Source | Confidence | Used for |
|---|---|---|
| Shinetech, *Why Dual-Running Needs Reconciliation in Legacy Migration* — https://www.shinetechsoftware.com/insights/why-dual-running-needs-reconciliation-in-legacy-migration/ | **C** | Dual-running without reconciliation creates false confidence. |
| 10x Banking, *Core banking migration strategies* — https://www.10xbanking.com/insights/core-banking-migration-strategies-choosing-the-right-path-to-a-4th-generation-platform | **C** | Parallel run, dual-write, shadow accounting, blue-green. |

---

## Gaps — what could not be established

- **Judging criteria, rounds, or prizes for Digital Nurture Hackathon 2026.**
  Nothing in the organiser notices and nothing findable. All positioning advice
  in `05` assumes a technically literate Cognizant panel, which is an inference.
- **Whether GnuCOBOL and IBM Enterprise COBOL agree on specific `COMP-3` edge
  cases.** Would need empirical testing against a real Enterprise COBOL
  installation, which the team does not have. Handled as a stated limitation
  rather than a resolved question.
- **A published tool or paper reporting verification coverage per extracted
  business rule.** Searched across the extraction and validation literature and
  the vendor documentation; none found. This is the basis for the originality
  claim in `03 §3a`, and it is an absence-of-evidence finding — a more
  exhaustive search could overturn it.
