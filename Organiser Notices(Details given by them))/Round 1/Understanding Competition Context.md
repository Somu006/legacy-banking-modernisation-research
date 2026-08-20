# Understanding Competition Context

Orientation document for an AI agent picking up work in this folder. Read this first.

---

## 1. What this folder is

The working folder for a student team's entry into the **Digital Nurture Hackathon 2026**,
a college hackathon jointly organised by **CII** (Confederation of Indian Industry) and
**Cognizant Technology Solutions**.

This is a competition entry, not a production software project. The deliverables so far are
documents and a slide deck, not code.

---

## 2. The competition

| | |
|---|---|
| Event | Digital Nurture Hackathon 2026 |
| Organisers | CII · Cognizant Technology Solutions |
| Registration deadline | 1 August 2026 |
| PPT submission deadline | 4 August 2026, 10:00 AM |
| Team size | Exactly 4 members |
| Additional rule | Minimum 2 women participants per team |

**Themes offered** (teams pick one):

- Healthcare and MedTech
- Agriculture and Rural Tech
- ESG and Sustainability
- Cybersecurity and Data Privacy
- Education Technology
- **Banking and Finance Technology** ← chosen by this team

Only Team Leads submit the PPT.

---

## 3. The team

**Team StudyEdge**, Odisha University of Technology and Research (OUTR), Bhubaneswar.

| # | Name | Role | Branch | CGPA (till 6th sem) |
|---|---|---|---|---|
| 1 | Tamanna Panda | Team leader | CSE (AIML) | 9.66 |
| 2 | Swayam Subhankar Sahoo | Member | CSE | 9.58 |
| 3 | Adyasha Das | Member | CSE | 9.50 |
| 4 | Soumyajit Sarkar | Member | Mechanical | 7.50 |

Full details, including contact numbers, are in `Team Details/teamdetails.md`.
Both eligibility rules (4 members, minimum 2 women) are confirmed met.

---

## 4. The project

**Legacy Banking Modernisation Platform** — *"Proving the rewrite behaves exactly like the
original."*

### The problem

Indian banks and public-sector institutions run core operations on COBOL systems written in
the 1980s, maintained long after their original authors retired. The barrier to modernising
them is widely misunderstood: **it is not translation.** Transpilers and code-generation
tools already produce valid modern equivalents.

Migrations stall because the business logic was never documented anywhere except in the code
itself — accrual conventions, rounding behaviour, and hundreds of edge cases patched in over
decades. No specification exists, so no team can prove a rewritten system behaves identically
to the one it replaces. For a bank, a one-paisa discrepancy across millions of accounts is a
regulatory event, so the institution rationally keeps running software it cannot safely
change.

**The bottleneck is verification, not code generation.**

### The solution

Treat legacy modernisation as a verification problem. Three stages:

1. **Extract** — parse the legacy source, decompose it into functional units, state each
   unit's business rules in plain language, with every rule traced to the exact lines that
   produce it.
2. **Reimplement** — generate the modern equivalent. Deliberately framed as the commodity
   step, the least interesting part of the system.
3. **Verify** — generate inputs targeting the boundaries those rules imply (zero, negative,
   maximum values, month and year rollovers, leap days, rounding midpoints), execute both
   programs against every input, and diff the outputs.

**The central idea:** the legacy program is its own correctness oracle. It already defines
the right answer by running, so nobody has to specify expected behaviour in advance. Every
mismatch surfaces as a reproducible case rather than a confidence score.

**The reciprocal loop:** extracted rules tell the input generator where the boundaries are;
the differential testing catches the extraction layer stating rules that are wrong. Neither
half works alone.

**Honesty as a feature:** rules confirmed by execution are marked *verified*; rules never
exercised are marked *unproven* rather than silently trusted.

### Scope

- **In scope:** COBOL, compiled and executed via GnuCOBOL; retail banking interest accrual;
  pure computation programs (input in, output out).
- **Out of scope, by design:** whole-system migration, CICS screens and JCL orchestration,
  database-coupled programs, and non-deterministic logic (system clocks, randomness, external
  state) — differential testing breaks on non-determinism.
- **Known limitation:** input-generation quality caps everything. Naive random inputs will
  not find a rounding bug.

The full write-up is `Work Done/Written/Legacy_Banking_Modernisation_Platform.md`.

---

## 5. Folder map

```
Digital Nurture Hackathon 2026/
├── Work Done/
│   ├── Presentation/
│   │   ├── Legacy_Banking_Modernisation_Platform.pptx   8 slides — the deck to submit
│   │   └── Old Presentation/                            superseded 10-slide cut
│   └── Written/
│       ├── Legacy_Banking_Modernisation_Platform.md     source of truth
│       ├── Legacy_Banking_Modernisation_Platform.pdf    rendered from the .md
│       └── files.zip                                    the .md + .pdf bundled
├── Submissions Done Till Now/                           record of what has gone out
├── Team Details/teamdetails.md
├── Organiser Notices/                                   this file, plus the notices
└── Archive/old renders/                                 stale screenshots, safe to delete
```

---

## 6. Status

| Item | State |
|---|---|
| Registration (Google Form) | Submitted — see `Submissions Done Till Now/` |
| Problem statement + solution text | Submitted with the registration form |
| PPT deck | Ready, 8 slides, not yet confirmed submitted |
| Written document (.md / .pdf / .zip) | Ready |
| Implementation / code | **Not started.** Nothing has been built yet. |

The project as it stands is a proposal. If asked to "build" or "run" the system, note that no
COBOL source, harness, or reimplementation exists in this folder yet.

---

## 7. Notes for agents working here

- **Do not touch `openswarm/`.** It is an unrelated cloned repository that happens to sit in
  this directory. Never read, list, walk, or modify it. Scope any recursive listing or search
  to the project folders named in the map above, or output will balloon.
- **The `.md` in `Work Done/Written/` is the source of truth.** The `.pdf` is generated from
  it. If you change the content, regenerate the PDF and rebuild `files.zip` rather than
  editing the PDF.
- **Toolchain on this machine:** Microsoft Office (PowerPoint/Word COM automation) and Chrome
  are installed. LibreOffice, pandoc, and poppler/`pdftoppm` are **not**. The PDF is produced
  by rendering the markdown to styled HTML and printing it with headless Chrome; slide images
  are exported via PowerPoint COM. `pypdf`, `pdfminer`, and `fitz` are available for reading
  PDFs.
- **The deck is edited as raw OOXML** — unzip, edit `ppt/slides/slide1.xml`, rezip. The title
  slide's project name is split across two text runs ("Legacy Banking" / "Modernisation
  Platform"). 40pt is the largest size at which the second line still fits on one line in its
  text box; going larger wraps it into the subtitle.
- **British spelling** is used throughout ("modernisation", "behavioural"). Keep it
  consistent.
- **`Organiser Notices/Hackathon registration form (printout).pdf`** is a printout of the
  registration Google Form, useful for seeing exactly which fields were asked for. It is not
  a brochure and contains no judging criteria, rounds, or prize information — none of that has
  been shared with the team.

---

## 8. Open questions

Things not answered by anything in this folder:

- Judging criteria, evaluation rounds, and prizes.
- Whether the PPT has actually been uploaded.
- The team lead's registration number (the registration form required it, but it is not
  recorded here).
- What happens after the PPT round — whether a build/demo phase follows.
