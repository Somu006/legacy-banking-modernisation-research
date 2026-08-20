# Legacy Banking Modernisation Platform — research, deck and submissions

**Team StudyEdge** · Odisha University of Technology and Research, Bhubaneswar
CII Eastern Region Hackathon 2026 · Banking and Finance Technology

Tamanna Panda · Swayam Subhankar Sahoo · Adyasha Das · Soumyajit Sarkar

---

## Start here

**New to the project? Read [`HANDOFF.md`](HANDOFF.md) first.** It is the state
document — what exists, where it lives, what is still open, and which decisions
must not be undone by accident.

Then read `Research Work(IMPORTANT)/00 - Round-2 Briefing.md` for the pitch
itself.

If you are presenting and want the short version, these three PDFs are the whole
project condensed:

| File | What it is | Read time |
|---|---|---|
| `Research Work(IMPORTANT)/Team_Briefing_Gist.pdf` | The entire project in a gist | ~15 min |
| `Research Work(IMPORTANT)/Presentation_Run_of_Show.pdf` | Who says what, when — one page per speaker | ~5 min |
| `Research Work(IMPORTANT)/Meeting_Questions_Answered.pdf` | The five questions from the 20 Aug meeting | ~10 min |

---

## The idea in one sentence

> Everyone proves the rewrite matches the legacy; we also ask whether the legacy
> matches the regulator — and we report the answer per business rule, including
> the rules we could not prove and the ones our own AI got wrong.

---

## What is in this repository

| Folder | Contents |
|---|---|
| `Research Work(IMPORTANT)/` | The evidence base. Numbered markdown chapters `00`–`08`, the compiled research dossiers (R1 and R2), diagrams, deck renders, and the full citation library. **This is the source of truth.** |
| `Presentation(Work Here)/` | Deck builds, including the version history of every iteration |
| `Round 2 presentation/` | Round-2 specific deck material |
| `Submissions Done Till Now/` | What has actually been submitted, and when |
| `Organiser Notices(Details given by them))/` | Everything CII and Cognizant have sent us |
| `Team Details/` | Roster and deadlines |
| `Archive/` | Superseded material, kept deliberately |

### What is *not* in this repository

The **working prototype code** lives in a separate sibling folder and its own
private repository:

<https://github.com/Somu006/legacy-banking-modernisation-platform>

The two are deliberately kept apart — this folder is Google Drive-synced, and
Drive flags the prototype's compiled binaries (`cobc.exe`, the JDK, COBOL
executables). Do not move the code in here.

---

## Regenerating the research dossier

The markdown is the source of truth; the PDF is built from it. After editing any
chapter:

```bash
python "Research Work(IMPORTANT)/build-pdf.py"
```

That rebuilds `Legacy_Banking_Modernisation_Research_R2.pdf` with all diagrams
and deck slides inlined. Requires Google Chrome (headless print-to-PDF) and the
`markdown` package.

---

## Working conventions

These are load-bearing. The dossier's credibility depends on them:

- **Every substantive claim carries a source.** The bibliography is
  `Research Work(IMPORTANT)/06 - Sources.md`.
- **`[contested]`** marks a figure that could not be traced to a primary source.
  Do not quote these in the pitch — `01 - Problem Research.md` lists the safe
  alternatives.
- **`[ASSUMPTION]`** marks a team-authored estimate with no external source.
  Never present one as a finding. If challenged, concede it immediately.
- **Never claim we invented differential testing.** IBM, AWS and Mechanical
  Orchard all ship a version. The claims that survive scrutiny are the
  regulatory third reference, the per-rule verdict, and testing our own tests.
- **Never say "proof of correctness."** Say "evidence of equivalence over the
  executed input set."

---

## A note on privacy before you push anywhere public

`Team Details/teamdetails.md` contains all four team members' **phone numbers**.
That is fine in a private repository shared between the four of us. If this ever
becomes public, remove it first — and remember that deleting it in a later commit
does **not** remove it from history.
