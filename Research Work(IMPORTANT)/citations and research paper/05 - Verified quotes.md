# 05 — Verified Quotes

Quotes checked word-for-word against the source on 4 August 2026. **Use these
rather than re-typing from memory or from a summary** — a misquoted source is
worse than no quote, and two of these are load-bearing enough that a judge might
look them up.

Each entry gives the exact wording, the source, and a note on how to attribute
it safely.

---

## The strongest quote available to you

> "the resulting code cannot be trusted to correctly translate the original code"

**Source:** Hans, S. et al., *Automated Testing of COBOL to Java Transformation*,
arXiv:2504.10548, abstract. Verified verbatim against the abstract.

**Why it is strong:** it is IBM Research, writing about the testing framework
for IBM's own commercial COBOL-to-Java product. Quoting a vendor against its own
product is far more persuasive than any third-party criticism.

**How to attribute:** *"IBM Research, in the paper describing the testing
framework for their own watsonx Code Assistant for Z."* Do not paraphrase it as
"IBM says its product doesn't work" — the paper's point is that validation is
necessary, which is your point too.

---

## Translation reliability

> "correct translations ranging from 2.1% to 47.3% for the studied LLMs"

**Source:** Pan, R. et al., *Lost in Translation*, arXiv:2308.03109, abstract.
ICSE 2024. Verified verbatim.

Supporting figures from the same abstract, verified: 1,700 code samples across
five programming languages; **1,748 manually labelled bugs**; **15 categories**
of translation bug; 43K+ translated code samples; 1,365 bug-fix pairs.

**Attribution note:** this is across C, C++, Go, Java and Python — **not COBOL**.
If asked, say so. The COBOL-specific evidence is AgentModernize's BER figures
below, which are worse.

---

## Orchestration

> "Deterministic execution also reduces token consumption by up to 3.5x, leading
> to substantially lower operational cost."

> "Across multiple models, deterministic orchestration achieves comparable
> computational accuracy to LLM-controlled orchestration while improving
> worst-case robustness and reducing performance variability across runs."

**Source:** Lwin, N. O. and Kumar, R., *Deterministic vs. LLM-Controlled
Orchestration for COBOL-to-Python Modernization*, arXiv:2605.09894, abstract.
Both verified verbatim.

**Use:** the justification for a fixed pipeline over an agentic one. Turns what
looks like a simplification into a defended architectural choice.

---

## Regulation — RBI

> "Interest on domestic rupee savings deposits shall be calculated on a daily
> product basis"

**Clause 6(a)**, Master Direction — RBI (Interest Rate on Deposits) Directions,
2016 (updated 7 June 2024).

> "A uniform interest rate shall be set on balance up to Rupees one lakh,
> irrespective of the amount in the account within this limit."

**Clause 6(a)(1)**, same Direction.

> "Differential rates of interest may be provided for any end-of-day savings
> bank balance exceeding Rupees one lakh."

**Clause 6(a)(2)**, same Direction.

> "All transactions, involving payment of interest on deposits shall be rounded
> off to the nearest rupee for rupee deposits and to two decimal places for
> FCNR (B) deposits."

**Clause 4(f)**, same Direction.

And the rounding mode, from a related RBI circular:

> "fraction of 50 paise and above shall be rounded off to the next higher rupee
> and fraction of less than 50 paise shall be ignored"

**This is HALF_UP at the rupee, stated by the regulator.** It is what lets your
reference model use an exact rounding mode rather than an inferred one, and it
is the specific behaviour a Java rewrite using `HALF_EVEN` or two-decimal
rounding gets wrong.

⚠ **Cite these as the 2016 Direction.** A 2025 restatement exists but its clause
numbering is unverified. See `02 - Regulatory and legal sources.md`.

---

## Regulation — FCA on TSB

> "all of TSB's branches and a significant proportion of its 5.2 million
> customers"

**Source:** FCA press release, December 2022.

**Use this wording, not "1.9 million".** The 1.9m figure is real and
independently corroborated by The Register and IEEE Spectrum, but it is press
reporting — the regulator did not say it. Verified figures from the FCA release:
**£48,650,000** joint FCA/PRA penalty and **£32.7 million** in customer redress.

---

## The numbers that make the thesis

From Ahmed, S. N. and Galib, M., *AgentModernize*, arXiv:2605.17535:

- Behavioural specification graph captured **91.2% of gold-standard rules**
- Behavioural Equivalence Rate: **9.4%** (GPT-4o-mini), **8.1%** (GPT-4o),
  **19.4%** (codex)
- Baselines: **0.0%**

**Reported figures, not verbatim quotes** — taken from the paper's abstract and
reported results. If you put them on a slide, read the paper first to confirm
the experimental conditions; BER is measured against gold-standard test cases,
which is a specific and demanding definition.

**The line these support:** extraction works and behavioural equivalence does
not follow from it. That is the entire argument for verification being the
product.

---

## Extraction accuracy

- **A-COBREX:** recall **74.12%**, precision **62.21%** for fuzzy match against
  ground truth, on **27 programs** with ground-truth annotations.
- **COBRAIN:** precision **1.0**, recall **0.746** compared with COBREX;
  **F1 0.73** against ground truth vs COBREX's **0.59**. Over 80% of 28
  participants found COBRAIN's output more understandable.

**Reported figures**, verified consistently across the IBM Research publication
page, the ICSE 2025 listing and the EASE 2025 conference page.

**The line these support:** the best published extractor is wrong roughly a
quarter to a third of the time — so refusing to ship extraction as the
deliverable is the correct reading of the state of the art, not modesty.

---

## Prior art — Locksmith

From Ferenczi, A. et al., arXiv:2607.28271. **Reported, not verbatim:**

- A *"Parity Gate"* serves as the deterministic oracle, running both targets on
  the same witness inputs and reporting end-state discrepancies
- Both COBOL and Java executed **off-mainframe on commodity hardware**
- *"Witness Search"* explores the input space; *"parity-preserving mutations"*
  open new regions; *"Locked Paragraphs"* are conditions blocking exploration
- Three case studies, **430–4,114 source lines**, **91.90% branch coverage** on
  an internal production-like COBOL program, matching output on all accepted
  test cases

**Verified absences** — checked against the paper specifically, and these are
what your novelty claim rests on: **no business-rule verdicts** and **no
regulatory compliance checks**.

---

## Vendor claims

> "verifies it against real production data, slice by slice"

**Source:** mechanical-orchard.com/platform. Also verified from the same page:
Imogen *"reads your source directly"*, and legacy and modern components *"run
side by side"*.

**Use:** the evidence that Mechanical Orchard requires production data — the
dependency your approach does not have.

> "Existing applications can be reverse engineered to fill documentation gaps,
> interactively explain specific code, and extract business rules."

**Source:** Cognizant, *How generative AI accelerates mainframe modernization*.
The same page describes generative AI generating *"specifications for parity in
new implementations"*.

**Use carefully.** This is the organiser's own material. It is a point of
agreement — Cognizant has reached the same diagnosis — not a target. Verified
during the falsification pass: **that page describes no validation or
equivalence testing at all.**

---

## A note on reproducing these

All of the above are short factual excerpts used for citation and criticism,
which is normal scholarly practice. Keep them short, keep the attribution
attached, and do not reproduce large passages of any of these papers into your
deck or write-up.

If you want a longer extract for the written submission, link to the open-access
PDF instead — every arXiv paper in `01` is freely downloadable.
