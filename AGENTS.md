# Instructions for AI assistants

This file is the entry point for any AI assistant working in this repository
(Claude Code, Cursor, Copilot, Codex, or a human following the same rules).
`CLAUDE.md` points here so both conventions resolve to one document.

Read this fully before your first edit. Several rules below are non-obvious and
breaking them silently damages work that took weeks.

---

## 1. What this repository is

Research, deck and submission material for a student hackathon entry — **Team
StudyEdge**, CII Eastern Region Hackathon 2026, Banking and Finance Technology.

**It contains no application code.** The working prototype is a separate private
repository: `Somu006/legacy-banking-modernisation-platform`. Do not add code
here; see `docs/DECISIONS.md` → ADR-001.

**The project in one sentence:** a tool that proves a COBOL→Java migration
behaves identically to the original, reports a verdict per business rule
(including rules it could *not* prove), and additionally checks the legacy
program against RBI regulation — which no existing product does.

---

## 2. Hard constraints

Violating any of these damages the work. They are not style preferences.

| # | Rule | Why |
|---|---|---|
| 1 | **Never edit a generated PDF.** Edit the markdown, then run `build-pdf.py`. | The PDF is a build artefact. Direct edits are destroyed on the next build. ADR-002 |
| 2 | **Never remove a `[contested]` or `[ASSUMPTION]` label** to make a claim sound stronger. | These mark claims that cannot be defended. Removing one sets up a public fact-check failure. ADR-003 |
| 3 | **Never write that the team invented differential testing**, or any "nobody does this" phrasing about it. | IBM, AWS and Mechanical Orchard all ship it. ADR-004 |
| 4 | **Never write "proof of correctness" or "we verified it."** Write *"evidence of equivalence over the executed input set."* | The strong claim is false and a formal-methods judge will catch it. ADR-004 |
| 5 | **Never invent numbers** — no ROI multiples, payback periods, market sizes or prices. | The research deliberately declines to claim these. `08 - Business Plan Research.md` §4 says so explicitly. If asked for one, say it does not exist. |
| 6 | **Never present the demo figures (31/11/5/94%) as measured results.** | They are illustrative. ADR-005 |
| 7 | **Do not make this repository public**, or move `Team Details/teamdetails.md` anywhere public. | It contains four people's phone numbers. ADR-007 |

If a user instruction conflicts with one of these, say so and ask — do not
silently comply, and do not silently refuse.

---

## 3. Orientation — read in this order

1. `README.md` — structure and navigation
2. `HANDOFF.md` — current state; what exists, what is open, what not to break
3. `docs/DECISIONS.md` — why everything is the way it is (8 ADRs)
4. The specific chapter you need, from the table below

### Where to find things

| You need | Go to |
|---|---|
| The pitch itself | `Research Work(IMPORTANT)/00 - Round-2 Briefing.md` |
| Evidence the problem is real | `01 - Problem Research.md` |
| Technical foundations (decimal arithmetic, the oracle problem) | `02 - Solution Research.md` |
| Who else does this — **read before any novelty claim** | `03 - Competitive Landscape.md` |
| What can actually be built | `04 - Feasibility and Build Plan.md` |
| Judge questions with prepared answers | `05 - Risks and Judge Questions.md` |
| Bibliography, confidence-rated A/B/C | `06 - Sources.md` |
| Our own fact-check: 12 confirmed, 6 corrected | `07 - Verification Pass.md` |
| Business-plan claims and their assumptions | `08 - Business Plan Research.md` |
| Exact pitch wording, four lengths + demo script | `Solution Folder/04 - Pitch Language.md` |
| Diagrams (SVG, editable as text) | `Visuals/` |
| The 13 deck slides as PNG | `deck-renders/` |
| Standalone answers to specific questions | `Q and A/` |

All paths above are relative to `Research Work(IMPORTANT)/`.

---

## 4. Gotchas that will bite you

### Filenames contain spaces, parentheses and non-ASCII characters

Always quote paths. Note `Organiser Notices(Details given by them))` has an
**unbalanced parenthesis** — one `(`, two `)`. That is the real name, not a typo
in this document.

**When comparing file lists, disable quotepath** — several filenames contain
en-dashes (`–`), which `git ls-files` escapes as `\342\200\223`, silently breaking
string comparisons:

```bash
git -c core.quotepath=false ls-files
```

### CRLF warnings on `git add` are normal

`.gitattributes` sets `* text=auto`. Git will print many *"LF will be replaced by
CRLF"* warnings on Windows. This is correct behaviour, not an error. ADR-008.

### The repository must stay outside Google Drive

Google Drive injects `desktop.ini` files inside `.git/`, which breaks git with
`fatal: bad object refs/desktop.ini`. This has already happened once. The working
copy is deliberately at `C:\Users\soumy\dev\legacy-banking-modernisation-research`.
**Do not suggest moving it back into the Drive folder.** ADR-006.

If you hit that error:

```bash
find .git -iname "desktop.ini" -delete && git fsck
```

### British spelling throughout

"Modernisation", "behaviour", "analyse". Match it in new prose.

### Indian numbering in demo material

₹1,00,000 (one lakh), not ₹100,000. Keep it consistent with existing text.

---

## 5. Common tasks

### Rebuild the research dossier after editing a chapter

```bash
python "Research Work(IMPORTANT)/build-pdf.py"
```

Requires Chrome and `pip install markdown`. Writes
`Legacy_Banking_Modernisation_Research_R2.pdf`. The chapter list and order live in
the `CHAPTERS` constant at the top of `build-pdf.py` — **add new chapters there**
or they will not appear in the dossier.

### Add a new claim to the research

1. Add the claim to the relevant chapter.
2. Add its source to `06 - Sources.md` with a confidence rating (A/B/C).
3. If you cannot find a primary source, label it `[contested]`.
4. If it is a team estimate, label it `[ASSUMPTION]`.
5. Rebuild the dossier.

**A claim without one of: a source, `[contested]`, or `[ASSUMPTION]` is a bug.**

### Edit a diagram

`Visuals/*.svg` are hand-written SVG — plain text, editable directly. Change a
label by editing its `<text>` element. Each has a `viewBox`, so scaling is
lossless. `build-pdf.py` inlines all ten into the dossier automatically.

### Build a new standalone PDF document

The three briefing PDFs were generated by standalone Python scripts using the
same pipeline as `build-pdf.py`: markdown/HTML string → styled HTML → headless
Chrome `--print-to-pdf`. Match the existing CSS (Georgia body, Segoe UI headings,
A4, 12–16 mm margins) so new documents look like part of the same family.

---

## 6. Tone and register

The existing prose is deliberate. Match it.

- **Plain and specific.** "RBI froze HDFC's card issuance from December 2020 into
  2022", not "regulatory challenges arose".
- **Concede weaknesses early and directly.** The dossier's credibility comes from
  volunteering what it cannot prove. This is the single most distinctive thing
  about the writing — do not sand it off.
- **No marketing language.** No "revolutionary", "game-changing",
  "cutting-edge", "seamless".
- **Prefer the honest narrower claim** over the impressive broader one, always.

---

## 7. Team

| Name | Presentation role |
|---|---|
| Adyasha Das | Introduction — slides 1–4 |
| Swayam Subhankar Sahoo | Architecture — slides 5–7 |
| Soumyajit Sarkar | Demo and working — slide 8 + live demo |
| Tamanna Panda | Business model — slides 9–12 |

Full run of show with timings and spoken lines:
`Research Work(IMPORTANT)/Presentation_Details.pdf`.

Use they/them for any team member whose pronouns you have not been told.
