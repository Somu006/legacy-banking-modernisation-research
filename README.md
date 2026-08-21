# Legacy Banking Modernisation Platform — research, deck and submissions

**Team StudyEdge** · Odisha University of Technology and Research, Bhubaneswar
CII Eastern Region Hackathon 2026 · Banking and Finance Technology

Tamanna Panda · Swayam Subhankar Sahoo · Adyasha Das · Soumyajit Sarkar

> **The idea in one sentence.** Everyone proves the rewrite matches the legacy;
> we also ask whether the legacy matches the regulator — and we report the answer
> per business rule, including the rules we could not prove and the ones our own
> AI got wrong.

---

## Read these four files first

Whoever you are — a teammate, a new collaborator, or an AI assistant — these four
files orient you completely. They are ordered.

| # | File | What it answers | Time |
|---|---|---|---|
| 1 | [`README.md`](README.md) *(this file)* | What is here and where | 3 min |
| 2 | [`HANDOFF.md`](HANDOFF.md) | What is the current **state** — what exists, what is open, what not to break | 10 min |
| 3 | [`docs/DECISIONS.md`](docs/DECISIONS.md) | **Why** the project and this repo are set up the way they are | 15 min |
| 4 | [`CONTRIBUTING.md`](CONTRIBUTING.md) | How to actually work here without breaking anything | 5 min |

**AI assistants:** read [`AGENTS.md`](AGENTS.md) instead of this table. It is
written for you and contains the hard constraints.

---

## If you are presenting, read these instead

Three PDFs contain the entire project, condensed. You do not need the 97-page
dossier to present.

| File | What it is | Time |
|---|---|---|
| [`Research Work(IMPORTANT)/Team_Briefing_Gist.pdf`](Research%20Work%28IMPORTANT%29/Team_Briefing_Gist.pdf) | The whole project in a gist — problem, insight, system, numbers, hard questions | ~15 min |
| [`Research Work(IMPORTANT)/Presentation_Details.pdf`](Research%20Work%28IMPORTANT%29/Presentation_Details.pdf) | Run of show — who says what and when, one page per speaker | ~5 min |
| [`Research Work(IMPORTANT)/Meeting_Questions_Answered.pdf`](Research%20Work%28IMPORTANT%29/Meeting_Questions_Answered.pdf) | The five questions from the 20 Aug meeting, answered | ~10 min |

---

## What is in this repository

```
.
├── README.md                          <- you are here
├── HANDOFF.md                         <- current state; read second
├── AGENTS.md                          <- instructions for AI assistants
├── CONTRIBUTING.md                    <- how to work here
├── docs/
│   └── DECISIONS.md                   <- why things are the way they are
│
├── Research Work(IMPORTANT)/          <- THE SOURCE OF TRUTH
│   ├── 00 - Round-2 Briefing.md       <- the pitch itself
│   ├── 01 - Problem Research.md       <- is the problem real? (evidence)
│   ├── 02 - Solution Research.md      <- the technical foundations
│   ├── 03 - Competitive Landscape.md  <- who already does this (read before pitching)
│   ├── 04 - Feasibility and Build Plan.md
│   ├── 05 - Risks and Judge Questions.md
│   ├── 06 - Sources.md                <- bibliography, confidence-rated
│   ├── 07 - Verification Pass.md      <- we fact-checked ourselves; 6 corrections
│   ├── 08 - Business Plan Research.md <- round-2 business fields + assumptions
│   ├── Q and A/                       <- standalone answers to specific questions
│   ├── Solution Folder/               <- design options, novelty, architecture, pitch language
│   ├── Visuals/                       <- 10 SVG diagrams, drop straight into slides
│   ├── deck-renders/                  <- the 13 deck slides as PNG
│   ├── citations and research paper/  <- references.bib + 16 source PDFs
│   ├── Work Done/Written/             <- the written report, R1 and R2
│   ├── build-pdf.py                   <- markdown -> the compiled dossier
│   └── *.pdf                          <- compiled outputs (generated, see below)
│
├── Presentation(Work Here)/           <- deck builds + full version history
├── Submissions Done Till Now/         <- what was actually submitted
├── Organiser Notices(Details given by them))/  <- everything CII/Cognizant sent
├── Team Details/                      <- roster and deadlines
└── Archive/                           <- superseded material, kept on purpose
```

### What is **not** here, and why

The **working prototype code** is a separate repository:
<https://github.com/Somu006/legacy-banking-modernisation-platform> *(private)*

It is deliberately separate. See [`docs/DECISIONS.md`](docs/DECISIONS.md) →
**ADR-001** for the reasoning. Short version: this repo is documents that change
by editing prose; that one is code with a build, a test suite and CI. Mixing them
would put 490 MB of compiler binaries next to a deck.

---

## Quick start

```bash
git clone https://github.com/Somu006/legacy-banking-modernisation-research.git
cd legacy-banking-modernisation-research
```

**Do not work inside the Google Drive folder on Soumyajit's machine.** That copy
is a frozen archive, not a working copy — see
[`docs/DECISIONS.md`](docs/DECISIONS.md) → **ADR-006** for why (Drive corrupted
the git repository within minutes of it being created).

### Regenerating the research dossier

The markdown is the source of truth. The big PDF is **generated from it** — never
edit the PDF directly, your changes will be overwritten.

```bash
python "Research Work(IMPORTANT)/build-pdf.py"
```

Requires Google Chrome (headless print-to-PDF) and `pip install markdown`.
Rebuilds `Legacy_Banking_Modernisation_Research_R2.pdf` with all diagrams and
deck slides inlined.

---

## The five conventions that make this credible

These are not style preferences. The dossier's whole value is that a judge can
check any sentence in it, and these are what make that true.

| Convention | Meaning | Why it exists |
|---|---|---|
| **Every claim carries a source** | Bibliography is `06 - Sources.md`, confidence-rated A/B/C | A hackathon panel that includes Cognizant will fact-check us |
| **`[contested]`** | The figure could not be traced to a primary source | Marks the numbers we must *not* quote on stage |
| **`[ASSUMPTION]`** | Team-authored estimate, no external source | So we concede it instantly instead of defending it as fact |
| **Never claim we invented differential testing** | IBM, AWS and Mechanical Orchard all ship it | Claiming it fails instantly in front of anyone who knows the field |
| **Never say "proof of correctness"** | Say *"evidence of equivalence over the executed input set"* | The strong word is false and a formal-methods judge will catch it |

Full reasoning for each: [`docs/DECISIONS.md`](docs/DECISIONS.md) → ADR-003 and ADR-004.

---

## Repository status

| | |
|---|---|
| Visibility | **Private** — do not make public without reading the note below |
| Default branch | `main` |
| Tracked files | 132 |

> **Before making this public:** `Team Details/teamdetails.md` contains all four
> team members' **phone numbers**. Deleting the file in a later commit does *not*
> remove it from git history — it would need `git filter-repo` or a fresh repo.
> See [`docs/DECISIONS.md`](docs/DECISIONS.md) → **ADR-007**.
