# Handoff — Legacy Banking Modernisation Platform

**Team StudyEdge** · Odisha University of Technology and Research, Bhubaneswar
CII Eastern Region Hackathon 2026 · Banking and Finance Technology

Written 21 August 2026. Everything a teammate or a future session needs to pick
this up cold. Read `Research Work(IMPORTANT)/00 - Round-2 Briefing.md` next for
the pitch itself; this file is about *state* — what exists, where, and what is
still open.

---

## 1. The idea, in one paragraph

Indian banks run core interest arithmetic on COBOL written in the 1980s. The
barrier to modernising is **not** translation — AWS, IBM and TCS all sell that.
It is that the business rules were never documented anywhere except the code,
so nobody can prove a rewrite behaves identically, and a one-paisa divergence
across millions of accounts is a regulatory event. We treat the proof as the
product: extract rules with line citations, generate inputs at the boundaries
those rules imply, run the legacy program *and* the rewrite on every input, and
diff. **The legacy binary is its own oracle.** Every rule ends PROVEN,
UNPROVEN, REFUTED or DIVERGENT — coverage is reported, never assumed.

One line to remember: *the bottleneck is verification, not code generation, so
we sell the proof, not the code.*

---

## 2. Where everything lives

Two sibling folders on the Desktop. **They are deliberately separate.**

| Folder | What | Why separate |
|---|---|---|
| `Digital Nurture Hackathon 2026/` | Deck, research, submissions, notices | Google Drive-synced |
| `Digital Nurture Hackathon prototype/` | The working code | Drive flags the compiled binaries (`cobc.exe`, JDK, COBOL executables), so the code lives outside the synced folder |

The prototype is also on GitHub — **private**:
<https://github.com/Somu006/legacy-banking-modernisation-platform>

---

## 3. Status of every deliverable

| Deliverable | State | Where |
|---|---|---|
| Round-1 registration + problem/solution text | **Submitted** | `Submissions Done Till Now/` |
| Round-1 deck (8 slides) | **Submitted** 4 Aug | `Presentation(Work Here)/Modernist_presentation_rebuild (The ppt submitted).pptx` |
| Round-2 deck (10 slides) | **Submitted** 13 Aug by email to karishma.singh@cii.in | `Presentation(Work Here)/StudyEdge_Banking and Finance Technology.pptx` |
| Research dossier | Complete, 97 pages | `Research Work(IMPORTANT)/Legacy_Banking_Modernisation_Research_R2.pdf` |
| Round-2 written report | Complete | `Research Work(IMPORTANT)/Work Done/Written/…_R2.md` + `.pdf` |
| Visuals | 10 SVG diagrams | `Research Work(IMPORTANT)/Visuals/` |
| **Working prototype** | **Runs end to end** | the prototype folder / GitHub |
| Results of round 2 | **Awaiting** — a follow-up email asking about timing was drafted but check whether it was sent | — |

**Finals:** if shortlisted, ICT East, Kolkata, **24 September 2026**. Travel at
the team's own cost. Preliminary rounds are virtual.

### Deck version history — do not lose this

The submission file is `StudyEdge_Banking and Finance Technology.pptx`. Its
content equals **V8**. The `_V2`…`V8` files are the trail:

- **V3** = teammate's edit + fixes (CII kicker, title diagram, aligned columns)
- **V4** = + "The finding" slide, RBI ombudsman stat swap (14 slides)
- **V5** = V4 with body copy trimmed
- **V6** = V5 with the two business-plan slides condensed
- **V7** = 9 slides, business plan merged onto one page
- **V8** = 10 slides, **both** CII business-plan pages restored in full ← submitted

V8 keeps both template pages because CII mandates that structure. Slide count
lost to that, deliberately.

---

## 4. The prototype

```bat
cd "C:\Users\soumy\Desktop\college\Competitions\Digital Nurture Hackathon prototype"
.\run.cmd
```

**PowerShell needs the `.\` prefix** — a bare `run.cmd` fails with "not
recognized". That single gotcha cost an hour; it is not a broken build.

From a **fresh clone**, `tools/` is not in the repo (490 MB of binaries), so:

```bat
bootstrap.cmd     :: downloads GnuCOBOL + a JDK into tools\, ~1 min, no admin
.\run.cmd
```

Or `docker build -t studyedge-harness . && docker run --rm studyedge-harness`.
CI builds and runs the image on every push, so the container path is known good.
(Docker Desktop on Soumyajit's machine is broken — an inference-manager crash —
which is why CI is the test bed. Nobody needs local Docker.)

### What a run produces (~20 s)

Four artefacts in `out/`, matching the four the deck promises:

| File | What |
|---|---|
| `spec.md` | The specification that never existed — rules with line citations and verdicts |
| `regression_suite.csv` | ~120 input→output pairs, each tagged with which rule or generator produced it |
| `equivalence_claim.md` | The signable artefact. Currently **NOT ESTABLISHED**, with the defect named |
| `findings.md` | Compliance findings vs the RBI Master Direction |

### Current measured results (hand-written rulebook)

```
6 PROVEN · 2 UNPROVEN · 1 REFUTED · 1 DIVERGENT      corpus 123
minimal counterexample:  balance 10,000, 10 days -> legacy Rs.10, rewrite Rs.11
three-way: all 50 divergences are SILENT CORRECTIONS - the legacy breaches
           Master Direction 4(f); the REWRITE is the compliant one
mutation:  4/5 killed (the survivor is an analysed equivalent mutant)
equivalence claim: NOT ESTABLISHED
```

Same verdicts on Windows (GnuCOBOL 3.2) and in CI on Linux (GnuCOBOL 3.1.2) —
the behaviour is a property of the COBOL, not of one machine.

### Stage 2 (LLM rule extraction) — DONE, ran live

Ran against **Google Gemini `gemini-3.7-flash`** (free tier), 8 bounded calls,
one per program slice. Raw output committed as
`harness/extraction.recorded.json`; `make replay` rebuilds the rulebook from it
with no network.

```bat
python harness\extract.py --provider gemini
python harness\run.py --rules rules.generated.json --mutate
```

Gemini extracted 4 rules from 3 of 8 slices → **3 PROVEN, 1 DIVERGENT**.

**Say this accurately on stage.** For `400-DORMANCY-CHECK` — the paragraph with
a dead `CONTINUE` body and a stale 2009 comment — Gemini correctly returned
*"implements no business rule"*. It was **not** fooled. So the honest line is
**not** "our AI hallucinated and we caught it". What the live run actually
demonstrated is better and more defensible: it exposed a **false refutation** in
our own verdict logic (see §6).

---

## 5. Decisions someone might undo by accident

- **`rewrite/Accrual.java` is untrusted by design.** Never hand-fix it to match
  the COBOL. If it diverges, the harness is working.
- **`SAVINT.cbl` is our own fixture**, presented as a demo fixture, not as
  evidence. Say so — the research (`04 §4`) warns that testing your tool on code
  you wrote is circular and a judge will say so.
- **The 5%-vs-7–9% IT-spend figure has no primary source.** It was demoted to a
  footnote in V4 and the slide-10 stat tile is now the RBI ombudsman figure
  (40,000+ complaints, FY22–23), which is regulator-sourced.
- **Contested figures are deliberately absent** from the deck: the
  800bn-lines-of-COBOL estimate and the 95%-of-ATM-swipes claim. Do not add them.
- **The closing line was rewritten.** The round-1 line — *"everyone else's
  submission assumes their AI is right"* — is false of the market (IBM, AWS and
  Mechanical Orchard all ship differential validation). The R2 close acknowledges
  that and claims only the three things that survived falsification.
- **The equivalence claim can say no.** That is the design, not a failure.

---

## 6. Traps that already bit us

All in `docs/design-notes.md` in the repo. The ones worth knowing:

- **A correct rule can look refuted.** Gemini stated the tier-split rule
  correctly but probed ₹1,00,000 vs ₹1,00,001 over 30 days — a difference of
  ₹0.004, below the rupee the program pays. Both sides printed the same number.
  REFUTED now requires that *no* probe form separates the boundary: the model's,
  the untuned, and the same boundary at maximum leverage.
- **Discrimination and agreement need different evidence.** Twice, a new probe
  form (untuned, then amplified) was accidentally counted toward *agreement* and
  flipped correct rules to DIVERGENT. Watch for this whenever a probe form is
  added.
- **`END-IF.` parses as a COBOL paragraph header**, silently truncating spans.
- **Hardcoded rule IDs** in the report crashed on any generated rulebook.
- **`subprocess` ignores `env` for executable lookup on Windows.**
- **CRLF breaks the container build** — `.gitattributes` forces LF.
- **A failed extraction used to write an empty rulebook**, silently clobbering a
  good one. It now writes nothing and quotes the provider's own error.

---

## 7. Credentials

- **`.env`** at the prototype root holds API keys. It is **gitignored**
  (verified) and must never be committed. `.env.example` is the template.
- `GEMINI_API_KEY` — set and working, free tier. Rate-limited per minute, so
  `extract.py` paces calls 6 s apart and backs off on 429.
- `XAI_API_KEY` — set, valid, but the xAI team has **no credits**, so every call
  returns 403. Grok is paid-only; there is no free tier.
- GitHub: `gh` authenticated as **Somu006**. A collaborator has been added.

---

## 8. Open items

1. **Chase the round-2 result.** A short email asking when results are expected
   was drafted; confirm whether it went out.
2. **Update the deck for the finals.** It currently *under-claims* — slide 5
   still says the finding is illustrative, but there are measured numbers now
   (₹10 vs ₹11, corpus 123, 4/5 mutants, a real NOT ESTABLISHED claim). This is
   the single highest-value change before Kolkata.
3. **Make a presenter's cut.** The deck is dense — correct for a file judged
   offline, wrong for a live jury. Same slides, half the body text.
4. **Close the research open items** (`08`): pin the IT-spend figure to a named
   report, and validate the four stakeholder pain statements with one real
   practitioner. One conversation upgrades them from inference to testimony.
5. **Optional:** re-run extraction on a *third-party* COBOL program (AWS
   CardDemo) rather than our own fixture. That removes the circularity caveat
   entirely and is the strongest remaining credibility gain.

---

## 9. One-line summary for whoever picks this up

The deck is submitted and the prototype works end to end, including a live LLM
extraction; what remains is telling the story with the measured numbers instead
of the illustrative ones.
