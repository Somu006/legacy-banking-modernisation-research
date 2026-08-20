# Downloaded PDFs

15 open-access documents, **17.3 MB**, downloaded 4 August 2026.
Every file was verified to be a real PDF *and* checked that its first page
carries the expected title — not just that the download succeeded.

Filenames are `arxiv-<id>-<short-name>.pdf` so they sort by identifier and stay
matched to `../references.bib`.

---

## Priority reading

| File | Pages | Why |
|---|---|---|
| `arxiv-2607.28271-locksmith-deterministic-validation.pdf` | 11 | **Read first.** The closest prior art — same architecture, published 30 July 2026. You need to know what it does before you present. |
| `arxiv-2605.17535-agentmodernize-business-logic.pdf` | 11 | The 91.2%-extraction / sub-20%-equivalence pair. Your thesis in two numbers. |
| `arxiv-2504.10548-ibm-automated-testing-cobol-java.pdf` | 12 | One paragraph, for the IBM quote. |
| `arxiv-2605.09894-deterministic-vs-llm-orchestration.pdf` | 8 | Justifies the fixed pipeline over an agentic one. |

---

## Full inventory

### COBOL translation and validation

| File | Pages |
|---|---|
| `arxiv-2607.28271-locksmith-deterministic-validation.pdf` | 11 |
| `arxiv-2504.10548-ibm-automated-testing-cobol-java.pdf` | 12 |
| `arxiv-2506.10999-ibm-automated-validation-cobol-java.pdf` | 4 |
| `arxiv-2507.23356-ibm-quality-evaluation-cobol-java.pdf` | 11 |
| `arxiv-2607.04092-sedcot-symbolic-execution-delta-debugging.pdf` | 24 |

### LLM translation reliability and hallucination

| File | Pages |
|---|---|
| `arxiv-2308.03109-lost-in-translation-llm-bugs.pdf` | 13 |
| `arxiv-2605.02195-beyond-translation-accuracy-false-failures.pdf` | 5 |
| `arxiv-2404.00971-beyond-functional-correctness-hallucinations.pdf` | 21 |

### Business rules and modernisation

| File | Pages |
|---|---|
| `arxiv-2605.17535-agentmodernize-business-logic.pdf` | 11 |
| `arxiv-2505.18542-business-as-rulesual-brex-benchmark.pdf` | 23 |
| `arxiv-2605.09894-deterministic-vs-llm-orchestration.pdf` | 8 |

### Testing theory and input generation

| File | Pages |
|---|---|
| `barr-2015-oracle-problem-survey-preprint.pdf` | 31 |
| `arxiv-2501.14465-boundary-value-test-input-generation.pdf` | 11 |

⚠ The Barr et al. file is an **open preprint** hosted for a university course,
not the IEEE version of record. Cite the IEEE TSE 41(5):507–525 details from
`../references.bib`; use this copy for reading only.

### Regulatory and Indian banking context

| File | Pages |
|---|---|
| `rbi-faq-interest-rate-on-deposits-2025.pdf` | 4 |
| `dvara-modernisation-indian-banking.pdf` | 25 |

---

## What these downloads settled

**Four incomplete BibTeX entries were completed** from the PDFs' own title
pages and promoted into the active bibliography:

- `rabbi2026beyond` — Rabbi, Saha, Yang (Concordia University)
- `liu2024beyond` — Liu, Liu, Shi, Yang, Zhang, Lian, Li, Ma (Beihang,
  Shandong, Huawei Cloud)
- `guo2025boundary` — Guo, Li, Tsuchiya (Osaka, Nagoya)
- `yang2025business` — Yang, Xu, Li, Cao, Fan (Zhejiang UT, Aberdeen,
  Birmingham)

**The RBI 2025 numbering question was half-answered.** The FAQ cites paragraphs
4.22, 9.1.6, 10.2, 20.2.1, 22, 29.1, 29.5 and 29.8 — a decimal scheme, unlike
the 2016 Direction's *clause 4(f)* / *6(a)(1)*. **The 2016 clause references do
not carry over.** Which 2025 paragraphs hold the savings, threshold and rounding
rules is still unknown; the FAQ does not cover them.

---

## Not downloaded — paywalled

These remain abstract-only. Check OUTR institutional access.

| Source | Where |
|---|---|
| COBRAIN (EASE 2025) | ACM DL, DOI 10.1145/3756681.3756982 |
| Metamorphic Testing survey (CSUR 51(1)) | ACM DL, DOI 10.1145/3143561 — open copies exist in the Wollongong and Victoria University repositories |
| Hallucinations in LLM-Based Code Summarization | ACM DL, DOI 10.1145/3808139 |
| Oracle Problem survey, version of record | IEEE Xplore — the preprint above covers the content |
| COBREX (original) | Author list still unverified |
| Cosentino et al. | INRIA HAL blocks automated access |

---

## Provenance

All arXiv files fetched from `https://arxiv.org/pdf/<id>`. The three
non-arXiv files came from `eecs481.org`, `rbi.org.in` and `dvararesearch.com`
respectively. Nothing here was modified after download.

Redistribution: arXiv papers carry per-paper licences (most are arXiv's
non-exclusive licence or a Creative Commons variant). Fine for your own reading
and citation; **check the individual licence before republishing any of them**,
and do not bundle them into a public submission package.
