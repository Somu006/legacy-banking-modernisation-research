# 03 — Competitive Landscape

**Read this before the next pitch.** The core mechanism proposed in the
submission is already shipping from three major vendors and at least one
venture-backed startup — including the organiser, Cognizant. This changes what
the team should claim, not whether the project is worth building.

---

## 1. The uncomfortable finding, stated plainly

The submission's central mechanism — *run the legacy program and the rewrite on
identical inputs, diff the outputs, treat the legacy as the oracle* — is prior
art in commercial products.

| Vendor | Product | What it does |
|---|---|---|
| **IBM** | watsonx Code Assistant for Z — **Validation Assistant** | Ensures semantic equivalence between refactored COBOL and transformed Java using automated test generation. Passes the same data inputs through both, compares outputs, flags divergence, helps fix the Java. Backed by an internal testing framework using **symbolic execution** on COBOL to generate JUnit tests, and a separate automated quality-evaluation system combining analytic checkers with LLM-as-a-judge (ASE 2025). |
| **AWS** | Mainframe Modernization — **Blu Age Compare** + **Application Testing** | Functional equivalence testing against reference datasets from the mainframe/iSeries. Application Testing (preview Nov 2023) automates functional equivalence testing at scale: test capture, on-demand automated replay, comparison, regression. Quality gates cover completeness (Blu Insights), functional equivalence (Blu Age Compare), performance equivalence, code quality (SonarQube), coverage (JaCoCo). |
| **AWS** | **AWS Transform for mainframe** (GA May 2025) | Agentic modernisation: code analysis, business-rule extraction, technical documentation, code refactoring, domain decomposition. ADP cut rule-extraction time 80% and manual effort >90%. Dec 2025: application reimagining. |
| **Mechanical Orchard** | **Imogen** | The closest match to the submission's entire thesis. Captures what the system actually does through real production data flows across component interfaces, uses that behavioural specification to guide *and validate* AI code generation, and proves equivalence at every step via a **"generate-validate test loop."** Cuts over only after audit-level behavioural parity is proven. On AWS Marketplace; partnered with Thoughtworks and Leidos; Summer 2026 update integrates AWS Transform business-rule extraction. |
| **Cognizant** *(the organiser)* | Modernisation accelerators, Flowsource, Neuro, ZDLC | Marketed capability: *extract business rules from a legacy COBOL application, generate specifications, and rewrite the application into a modern cloud-native Java architecture.* Also markets gen-AI "legacy understanding" — reverse-engineering applications to fill documentation gaps and extract business rules. |
| **TCS** | MasterCraft TransformPlus | Automatically extracts application knowledge including business rules, then automates COBOL→Java conversion. v5.0 adds ML-enhanced analysis. |
| **IBM** | ADDI | Static analysis: inventory, dependency mapping, business-rule extraction across COBOL, JCL, DB2, IMS. |

**Added after verification — the closest prior art of all.** **Locksmith**
(arXiv 2607.28271, *Agentic Method for Deterministic Validation of Legacy Code
Migration*, **30 July 2026**) uses the legacy COBOL as an execution oracle via a
*"Parity Gate"*, runs **both targets off-mainframe on commodity hardware** with
mocked external calls, generates inputs by *"Witness Search"*, and reports
end-state discrepancies. Three case studies, 430–4,114 lines, **91.90% branch
coverage** on a production-like program, full parity on all accepted tests.

This is the same spine as the proposed system, published five days before this
dossier. It costs the "no mainframe needed" claim its absolute form — that is
now true of every *shipping product* but not of the research frontier. Verified
against the paper, it reports **no business-rule verdicts and no regulatory
checks**, and its mutations are *parity-preserving* for path exploration rather
than fault injection for adequacy. Cite it as validation that the architecture
works, then say what it does not do.

An industry analyst has already named the category: the **"behavior-first
paradigm."** The argument in that analysis is nearly identical to the
submission's — direct LLM translation *"introduces compounding logical
discrepancies"*, the real problem is *undocumented institutional knowledge*, and
pure code conversion just relocates technical debt.

---

## 2. What this does and does not mean

**It does not mean the idea is bad.** Independently reaching the same diagnosis
as IBM Research, AWS, and a Thoughtworks-partnered startup is a strong signal
that the diagnosis is correct. Most hackathon submissions do not survive contact
with the market this well.

**It does mean two lines in the current write-up must change.**

> *"Everyone else's submission assumes their AI is right. Ours assumes it is
> wrong, and proves the answer anyway."*

True of the other teams in the room. Not true of IBM. If a Cognizant judge who
works on mainframe modernisation hears this, the response is *"we ship that."*

> *"Extraction cannot be the product. Verification has to be the product."*

Keep this — it is correct and well-supported. But it is a statement of the
*industry's* current direction, not a claim of originality. Framing it as "this
is where the serious players have converged, and here is that architecture built
on an open stack" is both honest and more impressive than claiming to have
invented it.

---

## 3. The gaps that are genuinely open

Four things the surveyed products and papers do not do. These are where the
claim of contribution should sit.

### a) Per-rule verification verdict — narrowed after verification

Every surveyed *product* reports equivalence at the level of test cases, and
coverage tooling in the AWS stack is JaCoCo — Java line and branch coverage.
But in the *literature*, AgentModernize's Business Rule Preservation Score does
report at rule level, so the concept is not original (`07 §C3`).

What is still open: BRPS scores against human gold-standard rules, while the
verdict proposed here applies to **rules the system extracted itself**; and
nothing surveyed requires a boundary to be behaviourally live, or issues a
**refuted** verdict. Claim the discrimination condition and the refutation, not
per-rule reporting as such. It requires mapping each extracted rule
to source lines (which slicing gives for free) and each execution to the lines
it touched (which coverage instrumentation gives), then intersecting them.

### b) Rules driving input generation

IBM generates test inputs by symbolic execution on the COBOL. AWS captures
inputs by replaying real mainframe traffic. Mechanical Orchard observes live
production data flows. **None of them derives test inputs from the
natural-language business rules they extracted.** In every case, extraction and
test generation are parallel activities on the same source, not a loop.

The submission's reciprocal loop — a rule saying "3.5% below ₹10,000, 4% above"
causing the generator to emit 9,999 / 10,000 / 10,001 — is a different
mechanism, and it is the one that makes the extraction layer *earn its place* in
the verification pipeline rather than being a side deliverable.

### c) No mainframe, no licence, no captured production traffic

This is the practical differentiator and it should not be undersold.

- **AWS Blu Age Compare** needs reference datasets *from the mainframe or
  iSeries*.
- **AWS Application Testing** works by capturing and replaying mainframe traffic.
- **Mechanical Orchard** requires observing *real production data flows*.
- **IBM WCA4Z** requires IBM Z and the associated licensing.

All four require the institution to already have the legacy system running,
instrumented, and accessible — plus a commercial engagement. **Say "every
shipping product", not "everyone"** — Locksmith runs off-mainframe on commodity
hardware, so the absolute form of this claim is false (`07 §C4`). A cooperative
bank, a regional rural bank, or a public-sector institution evaluating whether
modernisation is even feasible cannot start there.

**The proposed system needs only the source code and GnuCOBOL.** It generates
its own inputs rather than capturing them. That makes it usable at the
*decision* stage — before a vendor is selected, before a budget is approved,
before anyone has agreed to instrument production. For the Indian market
described in `01 §3` — lenders spending under 5% of revenue on IT, facing a
$1bn upgrade bill — a zero-licence assessment tool is a genuinely different
product from an enterprise migration platform.

### d) The output is a specification, not just a pass/fail

The vendor tools produce a migration verdict. The submission produces three
retained artifacts: a traceable specification, a permanent regression suite, and
an evidence-backed equivalence claim — of which the first two hold value *even
if the migration is cancelled*. Nothing surveyed frames the deliverable that
way, and for a bank that has been deferring the decision for a decade, "you get
documentation and tests whether or not you proceed" removes the reason to defer.

---

## 4. Academic prior art — and the seam between the papers

| Line of work | Papers | Covers |
|---|---|---|
| Rule extraction | COBREX, A-COBREX (ICSE 2025), COBRAIN (EASE 2025), Cosentino et al. | Getting rules out of COBOL. Best F1 ≈ 0.73. |
| Translation validation | *Automated Testing of COBOL to Java Transformation* (arXiv 2504.10548), SEDCoT (arXiv 2607.04092), *Quality Evaluation of COBOL to Java Code Transformation* (arXiv 2507.23356) | Checking a translation is equivalent. |
| Translation reliability | *Lost in Translation* (arXiv 2308.03109), *Beyond Translation Accuracy* (arXiv 2605.02195) | Measuring how often LLMs get it wrong. |
| Orchestration | *Deterministic vs. LLM-Controlled Orchestration for COBOL-to-Python Modernization* (arXiv 2605.09894) | How to structure the pipeline. |

**The seam:** the first row and the second row do not cite each other's
mechanisms. Extraction papers evaluate against human-annotated ground truth.
Validation papers generate inputs from code structure. Nobody uses the extracted
rules to drive input generation, and nobody reports validation results back
against the extracted rules. That seam is the project.

---

## 5. Revised positioning — suggested language

For the next round, replacing the current closing line:

> **The industry has converged on behavioural equivalence as the real
> deliverable — IBM, AWS and Mechanical Orchard all ship a version of it. Every
> one of them requires your mainframe, your production traffic, and a
> commercial engagement before it will tell you anything. We built the same
> guarantee on an open stack that needs nothing but the source file, and we
> report it per business rule: of the rules we extracted, these are proven by
> execution, and these we could not prove. A bank can run it before deciding
> whether to modernise at all.**

Three claims, all true, none contradicted by the landscape:

1. Same guarantee, no mainframe and no licence.
2. Rule-level verdict, not test-level.
3. Usable at the decision stage, not the migration stage.
