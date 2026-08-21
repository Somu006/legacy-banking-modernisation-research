# Decisions, and why

This file records **why** things are the way they are — the reasoning that would
otherwise be lost when the person who made the decision is not in the room.

It is written in ADR form (Architecture Decision Record): each entry states the
situation, the decision, the reasoning, what it costs us, and how to undo it if
we later decide it was wrong.

**Read this before changing anything structural.** Several of these decisions
look arbitrary until you know the reasoning, and reversing one by accident is
easy.

| ADR | Decision | Status |
|---|---|---|
| [001](#adr-001) | Research and prototype code live in separate repositories | Active |
| [002](#adr-002) | Markdown is the source of truth; PDFs are generated | Active |
| [003](#adr-003) | Every claim carries a source, and unsourced claims are labelled | Active |
| [004](#adr-004) | We concede prior art instead of claiming novelty | Active |
| [005](#adr-005) | Demo numbers are presented as illustrative, never as measured | Active |
| [006](#adr-006) | The working copy lives outside Google Drive | Active — 21 Aug 2026 |
| [007](#adr-007) | The repository is private | Active |
| [008](#adr-008) | `.gitignore` excludes Drive and OS artefacts | Active |

---

<a name="adr-001"></a>
## ADR-001 — Research and prototype code live in separate repositories

**Status:** Active · decided before this repo existed, documented here 21 Aug 2026

### Context

The project has two very different kinds of material:

1. **Documents** — research chapters, the deck, diagrams, submissions, organiser
   notices. These change by editing prose. They are reviewed by reading them.
2. **Code** — the working differential-testing harness. It has a build, a test
   suite, CI, and a `tools/` directory of roughly 490 MB of compiler binaries
   (GnuCOBOL, a JDK, compiled COBOL executables).

### Decision

Two repositories:

- **This one** — `legacy-banking-modernisation-research` — documents only.
- **The prototype** — `legacy-banking-modernisation-platform` — code only.

### Why

- **Size and churn are incompatible.** The prototype's binaries are large and
  regenerated constantly. Putting them beside a research dossier would make every
  clone enormous for someone who only wants to read the pitch.
- **The audiences differ.** Tamanna and Adyasha need the research and the deck.
  They do not need a COBOL compiler on their laptop to read it.
- **Google Drive was actively hostile to the binaries.** The original reason the
  code was moved out of the Drive-synced folder: Drive repeatedly flagged
  `cobc.exe`, the JDK and the compiled COBOL executables. This is recorded in
  `HANDOFF.md` §2.
- **Different review rhythms.** Code changes want CI, diffs and tests. Prose
  changes want a human reading a paragraph.

### Cost

Two repositories to keep track of, and a cross-reference that can go stale. The
prototype URL appears in `README.md` and `HANDOFF.md` §2 — if it moves, both need
updating.

### How to reverse

Add the prototype as a git submodule, or merge with `git subtree`. Do not simply
copy the code in — you would lose its history and its CI configuration.

---

<a name="adr-002"></a>
## ADR-002 — Markdown is the source of truth; PDFs are generated

**Status:** Active

### Context

The research exists in two forms: numbered markdown chapters
(`Research Work(IMPORTANT)/01`–`08`), and a single compiled PDF dossier
(`Legacy_Banking_Modernisation_Research_R2.pdf`, 97 pages) that inlines every
diagram and deck slide.

### Decision

**The markdown is authoritative.** The PDF is a build artefact produced by
`Research Work(IMPORTANT)/build-pdf.py` (markdown → styled HTML → headless Chrome
print-to-PDF).

### Why

- **PDFs do not diff.** A change to a PDF in git is an opaque binary blob. A
  change to markdown is a reviewable line diff — which matters when four people
  are editing and someone needs to see what changed.
- **One edit, many outputs.** The same chapter feeds the dossier, the briefing
  documents and the deck notes. Editing the markdown updates everything on the
  next build.
- **It is reproducible.** Anyone with Chrome and `pip install markdown` can
  rebuild the identical PDF. Nothing depends on one person's machine.

### Consequence — the trap

**Editing the PDF directly does not work.** Your changes will be silently
destroyed the next time anyone runs `build-pdf.py`. If you want to change the
dossier, change the markdown and rebuild.

The compiled PDFs *are* committed despite being generated, because teammates need
to read them without installing Python and Chrome. This is a deliberate exception
to the usual "never commit build output" rule.

### How to reverse

Stop running `build-pdf.py` and edit the PDF in a PDF editor. You would lose
reviewable diffs and single-source editing. Not recommended.

---

<a name="adr-003"></a>
## ADR-003 — Every claim carries a source, and unsourced claims are labelled

**Status:** Active · this is the most important decision in the project

### Context

Cognizant is an organiser of this hackathon. Cognizant sells mainframe
modernisation services. It is likely that at least one person in the judging room
has worked on exactly this problem and knows the vendor landscape, the published
literature and the real numbers.

### Decision

Three labels, used consistently across every document:

| Label | Meaning | Behaviour in the room |
|---|---|---|
| *(unlabelled)* | Traced to a source in `06 - Sources.md`, rated A/B/C | Defend it |
| **`[contested]`** | Widely repeated but not traceable to a primary source | **Do not say it on stage** |
| **`[ASSUMPTION]`** | Our own estimate, no external source | Say so *before* being asked |

### Why

- **A confidently stated wrong number is worse than no number.** One
  fact-check failure in front of a panel discredits every other claim we make,
  including the true ones.
- **Volunteering a weakness is stronger than defending one.** Conceding "that is
  our own estimate" costs a sentence. Being caught presenting an estimate as a
  finding costs the pitch.
- **We already fact-checked ourselves and it changed our conclusions.**
  `07 - Verification Pass.md` records an independent re-check of every
  load-bearing claim against primary sources: **12 confirmed, 6 corrected, one
  novelty claim partially falsified**, and one piece of prior art found that was
  closer to our idea than anything in `03`. That pass is the reason the labels
  exist — it proved they were necessary.

### Concrete consequences

Numbers we deliberately **do not** use, and their safe replacements:

| Do not say | Because | Say instead |
|---|---|---|
| "95% of ATM swipes run on COBOL" | Traces to a single 2017 press item | "92 of the world's top 100 banks run on IBM mainframes" |
| "800 billion lines of COBOL" | Survey extrapolation, not a census | "hundreds of billions of lines" |
| Precise COBOL-workforce numbers | Vendor blogs and recruitment marketing | "the people who wrote the undocumented business rules are gone" |

### How to reverse

Do not. If a label is wrong, fix the label — do not remove the system.

---

<a name="adr-004"></a>
## ADR-004 — We concede prior art instead of claiming novelty

**Status:** Active

### Context

Our core mechanism is differential testing: run the legacy COBOL and the
rewritten Java on the same inputs, compare the outputs. During research (`03`)
and verification (`07`) we established that this mechanism is **already shipped**
by IBM (watsonx Code Assistant for Z, with a Validation Assistant), AWS (Blu Age
Compare, Mainframe Modernization Application Testing) and Mechanical Orchard
(Imogen's generate-validate loop) — and that a paper published five days before
our round-1 compilation, **Locksmith** (arXiv 2607.28271), builds the same
differential spine off-mainframe.

### Decision

**Name IBM, AWS and Mechanical Orchard ourselves, early, before making any claim
of novelty.** Claim only these three things:

1. **The regulatory third reference** — we check the legacy against the RBI
   Master Direction, not just against the rewrite.
2. **The per-business-rule verdict** — proven / unproven / refuted, including the
   three-condition definition of *proven*.
3. **Testing our own tests** — mutation of the legacy program to score whether
   our input corpus would have caught a change.

### Why

- **The claim would fail instantly.** Anyone who works in this field knows those
  products. Claiming to have invented differential testing marks us as
  unresearched in one sentence.
- **The convergence is evidence, not a threat.** Three serious vendors
  independently arriving at behavioural equivalence as the real deliverable is
  the strongest available proof that our diagnosis of the problem is correct.
  Framed that way, prior art *supports* us.
- **The narrower claims survive scrutiny.** `07` tested them against primary
  sources. What survived: the discrimination condition, the *refuted* verdict,
  and the regulatory third reference.

### Retired phrasings

- ~~"Everyone else's submission assumes their AI is right."~~ — true of the other
  hackathon teams, false of the market. Replaced by the one-sentence pitch.
- ~~Anything of the form "nobody does this"~~ about differential testing itself.

---

<a name="adr-005"></a>
## ADR-005 — Demo numbers are presented as illustrative, never as measured

**Status:** Active

### Context

The figures **31 proven / 11 unproven / 5 refuted / 94% mutation kill rate**
appear throughout the dossier, the deck and the briefing documents. They describe
the *shape* of the tool's output for a savings-interest accrual program.

### Decision

Present them as **the shape of the output**, not as results from a completed
production run. If asked directly whether they are measured, say plainly that
they are illustrative — **volunteer it rather than let it be discovered.**

### Why

Same logic as ADR-003, applied to our own output. The numbers do real work in the
pitch: they demonstrate that the tool reports what it *could not* prove, which is
the whole thesis. That value does not require them to be a measured result — and
being caught presenting illustrative figures as measured would destroy exactly
the credibility they are there to build.

`HANDOFF.md` §4 records the actual current measured results from the prototype.
Use those if you want a real number.

---

<a name="adr-006"></a>
## ADR-006 — The working copy lives outside Google Drive

**Status:** Active · decided 21 Aug 2026 · **this one has a war story**

### Context

The original folder,
`C:\Users\soumy\Desktop\college\Competitions\Digital Nurture Hackathon 2026`,
is synced by Google Drive for Desktop (v129.0.1.0).

### What actually happened

Within minutes of `git init` and the first push, Google Drive injected **132
`desktop.ini` files inside `.git/` itself** — one in every internal directory,
including:

- `.git/refs/` — git reads *every file* in `refs/` as a ref
- `.git/refs/heads/`, `.git/refs/remotes/origin/`
- `.git/objects/` and 120 of its fan-out subdirectories

The result was an immediate hard failure:

```
fatal: bad object refs/desktop.ini
error: ... did not send all necessary objects
```

The push had already succeeded, so nothing was lost — but `git fetch` was broken
until the junk was deleted. It came back again a few minutes later.

### Decision

1. The **working copy** is `C:\Users\soumy\dev\legacy-banking-modernisation-research`
   — outside any synced folder. All work happens here.
2. The **Drive folder** keeps its files as a frozen archive, but its `.git` was
   removed. It is no longer a repository.
3. **GitHub is the sync mechanism**, replacing Drive for this content.

### Why not just clean the junk repeatedly?

`.gitignore` cannot help — ignore rules do not apply inside `.git/`. Drive
re-creates the files whenever it touches the folder, so the corruption is not a
one-off; it recurs indefinitely. And the failure mode is silent until git
suddenly refuses to operate.

### Why not exclude the folder in Drive's settings?

That is the cleaner fix and remains available, but Drive for Desktop exposes sync
selection **only through its GUI** — there is no CLI and no config file. Its
state lives in an internal SQLite database (`mirror_metadata_sqlite.db`), and
hand-editing that risks corrupting the sync engine, which is a worse failure than
the one being solved. Doing it through the GUI is still worth doing; it just
could not be scripted.

### Consequence — read this

There are now **two copies of these files**:

| Copy | Path | Status |
|---|---|---|
| Working copy | `C:\Users\soumy\dev\legacy-banking-modernisation-research` | **Live.** Work here. |
| Drive archive | `...\Desktop\college\Competitions\Digital Nurture Hackathon 2026` | **Frozen** as of 21 Aug 2026. Not a git repo. |

**They will drift.** The Drive copy receives nothing you commit. Treat it as an
archive or delete it.

### Note for the prototype repository

`Digital Nurture Hackathon prototype` is **also** under `Desktop` and also
Drive-managed (118 marker files in its tree). Its `.git` was clean when checked on
21 Aug 2026, but it carries the same exposure. Consider moving it to
`C:\Users\soumy\dev\` too.

### Emergency command

If git ever reports `bad object` or `did not send all necessary objects` in a
Drive-synced repository:

```bash
find .git -iname "desktop.ini" -delete
git fsck
```

---

<a name="adr-007"></a>
## ADR-007 — The repository is private

**Status:** Active

### Decision

Private, with collaborators added individually.

### Why

- **`Team Details/teamdetails.md` contains all four members' phone numbers.**
  Three of those belong to people who did not choose to publish them. In a private
  repo shared between the four of us this is fine — everyone already has everyone's
  number. Public, it is a privacy problem we created for other people.
- **Competition material before the final round.** Finals are at ICT East,
  Kolkata on 24 September 2026. There is no reason to hand our competitive
  analysis and positioning to other teams.

### If you ever want to make it public

Deleting the file in a later commit **does not remove it from history.** Anyone
can read it from any earlier commit. You would need to either:

- rewrite history with `git filter-repo --path "Team Details/teamdetails.md" --invert-paths`
  and force-push (breaks every existing clone), or
- start a fresh repository from the current tree with no history.

Decide before publishing, not after.

---

<a name="adr-008"></a>
## ADR-008 — `.gitignore` excludes Drive and OS artefacts

**Status:** Active

### Context

The source folder is Drive-synced and Windows-based, which produces a large
amount of metadata that is not content. At the time of the initial commit: 311
files on disk, of which only 132 were real.

### Decision

Exclude, with reasoning per category:

| Pattern | What it is | Why excluded |
|---|---|---|
| `desktop.ini` | Google Drive folder-icon metadata (178 of them) | Not content. Points at a local `GoogleDriveFS.exe` path that means nothing on another machine. |
| `.tmp.driveupload/` | Drive's upload staging area | Transient. Was being actively written *during* our git operations. |
| `~$*` | Office lock files (e.g. `~$StudyEdge...pptx`) | Created when a file is open in PowerPoint; meaningless to anyone else. |
| `.env`, `*.key`, `*.pem` | Secrets | Defensive. No `.env` exists in this tree — the real one lives with the prototype — but this guarantees one can never be committed by accident. |
| `_build.html`, `_*_build.html` | `build-pdf.py` scratch | Written then deleted; only survives an interrupted run. |
| `__pycache__/`, `*.pyc` | Python bytecode | Regenerated automatically. |

### Verification

After the initial commit, disk contents were diffed against tracked files. Result:
132 tracked + 178 Drive artefacts + 1 Office lock file = 311. **No real content was
excluded.**

> **Method note, because it nearly caused a false alarm.** The first diff
> reported an organiser PDF as missing. It was not — `git ls-files` escapes
> non-ASCII characters, and that filename contains an en-dash (`–`), so the
> string comparison failed. Re-running with `git -c core.quotepath=false ls-files`
> showed it present. **If you ever compare file lists in this repo, disable
> `quotepath`** — several filenames contain en-dashes and non-ASCII punctuation.

### A known wart

`.gitattributes` sets `* text=auto`, so text files are stored with LF in the
repository and checked out as CRLF on Windows. This is correct and intentional,
but it makes git print a wall of *"LF will be replaced by CRLF"* warnings on the
first `add`. **Those warnings are normal.** Binary types (`*.pdf`, `*.pptx`,
`*.png`, `*.zip`) are explicitly marked `binary` so they are never mangled.

---

## Open structural question — not yet decided

Several folder names contain characters that are awkward for shell commands, URLs
and tooling:

| Current name | Problem |
|---|---|
| `Organiser Notices(Details given by them))/` | **Unbalanced parenthesis** — one `(` and two `)`. Breaks naive shell quoting. |
| `Research Work(IMPORTANT)/`, `Presentation(Work Here)/` | Parentheses and spaces need quoting in every command |
| `Presentation(Work Here)/2nd round submiites/` | Typo: "submiites" |

Renaming would make the repository substantially easier to script against and
easier for AI assistants to handle reliably. It was **not** done, because it
would rewrite 132 file paths, break the correspondence with the Drive archive,
and break any link anyone has already shared.

**This is a team decision.** If you want it, do it in a single dedicated commit
using `git mv` (which preserves history), and update the paths in `README.md`,
`AGENTS.md`, `HANDOFF.md` and `build-pdf.py`'s `CHAPTERS` list in the same commit.
