# How to work in this repository

For teammates. If you are an AI assistant, read [`AGENTS.md`](AGENTS.md) instead
— it covers the same ground with the constraints stated more strictly.

---

## Getting set up

```bash
git clone https://github.com/Somu006/legacy-banking-modernisation-research.git
cd legacy-banking-modernisation-research
```

That is the whole setup. You do not need Python, Chrome or a COBOL compiler to
read anything — only to rebuild the compiled dossier.

### Do not work in the Google Drive folder

There is a copy of these files on Soumyajit's machine under
`Desktop\college\Competitions\Digital Nurture Hackathon 2026`. **That copy is a
frozen archive.** It is no longer a git repository, and nothing you commit here
appears there.

Google Drive corrupted the git repository within minutes of it being created — it
writes `desktop.ini` files inside `.git/`, which makes git fail with
`fatal: bad object refs/desktop.ini`. The full story is in
[`docs/DECISIONS.md`](docs/DECISIONS.md) → ADR-006.

**GitHub is now how we sync. Not Drive.**

---

## The one rule that matters most

**Markdown is the source of truth. The big PDF is generated from it.**

If you edit `Legacy_Banking_Modernisation_Research_R2.pdf` directly, your work is
destroyed the next time anyone rebuilds. Edit the markdown chapter instead:

```bash
# 1. edit e.g. Research Work(IMPORTANT)/01 - Problem Research.md
# 2. rebuild
python "Research Work(IMPORTANT)/build-pdf.py"
# 3. commit BOTH the markdown and the regenerated PDF
```

Rebuilding needs Google Chrome and `pip install markdown`.

If you cannot rebuild — no Python, or Chrome missing — **still commit the
markdown change** and say so in the commit message. Someone else will rebuild.
A markdown edit without a rebuild is fine. A PDF edit without a markdown edit is
not.

---

## Before you write a single claim

Every substantive claim needs one of three things. This is the discipline the
whole dossier rests on.

| | When to use | Example |
|---|---|---|
| **A source** | You found it in a primary source | Add it to `06 - Sources.md` with a confidence rating A/B/C |
| **`[contested]`** | It is widely repeated but you could not trace it | "95% of ATM swipes run on COBOL **[contested]**" |
| **`[ASSUMPTION]`** | It is our own estimate | "4 engineers × 12 weeks **[ASSUMPTION]**" |

**A claim with none of the three is a bug**, exactly like a broken link.

Why we are strict about this: Cognizant organises this hackathon and sells
mainframe modernisation. Someone in that room knows the real numbers. One
fact-check failure discredits everything else we say — including the parts that
are true. Full reasoning in [`docs/DECISIONS.md`](docs/DECISIONS.md) → ADR-003.

### Things we never say

| Never | Say instead |
|---|---|
| "We invented differential testing" / "nobody does this" | "IBM, AWS and Mechanical Orchard all ship a version — these three things are ours" |
| "Proof of correctness", "we verified it" | "Evidence of equivalence over the executed input set" |
| "95% of ATM swipes run on COBOL" | "92 of the world's top 100 banks run on IBM mainframes" |
| "800 billion lines of COBOL" | "hundreds of billions of lines" |
| Any invented ROI figure, payback period or price | "We have not done pricing research and will not invent a figure" |

---

## Branches and commits

The team is four people working mostly on different documents, so this is
deliberately lightweight.

**Small edits** — typo, a number, one paragraph — commit straight to `main`:

```bash
git pull
# edit
git add -A
git commit -m "01: correct the BCG figure to $1bn over 5-10 years"
git push
```

**Larger work** — a new chapter, a restructure, a deck rebuild — use a branch so
others can see it before it lands:

```bash
git checkout -b adyasha/intro-rewrite
# work, commit
git push -u origin adyasha/intro-rewrite
```

Then open a pull request on GitHub and tag whoever should look.

### Always `git pull` before you start

Four people editing the same folder will conflict otherwise. Markdown conflicts
are readable and easy to resolve. **PDF and PPTX conflicts are not** — they are
binary, and git cannot merge them. If two people rebuild the dossier
independently, one of you will have to discard and rebuild.

Practical consequence: **tell the group before you rebuild the dossier or edit
the deck.**

### Commit messages

Say what changed and why, not what file you touched.

```
good:  05: add the Locksmith answer for the prior-art question
good:  visuals: fix the rupee threshold in diagram 4 (was 1,00,00 - missing a zero)
poor:  update
poor:  changes
```

Prefix with the chapter number or folder when it is obvious — `01:`, `visuals:`,
`deck:`. It makes `git log --oneline` readable.

---

## Where things live

Full map in [`README.md`](README.md). The short version:

| Folder | What |
|---|---|
| `Research Work(IMPORTANT)/` | **The source of truth.** Chapters 00–08, diagrams, citations, compiled dossiers |
| `Presentation(Work Here)/` | Deck builds and version history |
| `Submissions Done Till Now/` | What was actually submitted |
| `Organiser Notices(...)/` | Everything CII and Cognizant sent us |
| `Team Details/` | Roster and deadlines |
| `Archive/` | Superseded material — kept on purpose, do not delete |
| `docs/` | Decision records |

### A quirk you will hit immediately

Folder names contain spaces and parentheses, and
`Organiser Notices(Details given by them))` has an **unbalanced parenthesis**
(one `(`, two `)`). Always quote paths in the terminal:

```bash
python "Research Work(IMPORTANT)/build-pdf.py"     # quoted - works
python Research Work(IMPORTANT)/build-pdf.py       # unquoted - fails
```

There is an open proposal to rename these — see the end of
[`docs/DECISIONS.md`](docs/DECISIONS.md). It is a team decision, not something to
do unilaterally, because it rewrites every path in the repo.

---

## Things that will confuse you the first time

**"LF will be replaced by CRLF" warnings on `git add`.** Normal. Expected on
Windows. Not an error. ADR-008.

**`fatal: bad object refs/desktop.ini`.** You are working inside a Google
Drive-synced folder. Move the repo out of Drive. Emergency fix:

```bash
find .git -iname "desktop.ini" -delete && git fsck
```

**The PDF changed but you did not edit it.** Someone rebuilt the dossier. That is
expected — the PDF is a build artefact that we commit anyway, so teammates can
read it without installing Python.

---

## Before making this repository public

Do not, without reading [`docs/DECISIONS.md`](docs/DECISIONS.md) → ADR-007.
`Team Details/teamdetails.md` contains all four members' phone numbers, and
deleting a file in a later commit does **not** remove it from git history.
