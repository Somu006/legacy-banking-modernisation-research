# Presentation versions

All versions are kept. Nothing here is deleted or overwritten — each change
produces a new file so you can go back to any of them.

**Current: `Legacy_Banking_Modernisation_Platform_v7.pptx`** — 9 slides, restructured
to the standard outline.

---

| File | Slides | What it is |
|---|---|---|
| `Legacy_Banking_Modernisation_Platform.pptx` | 8 | The original deck, written before the research pass. Superseded on content, but keep it — it is what was prepared for the first submission. |
| `..._v3.0.pptx` | 12 | Yours. Not touched. |
| `..._v3.1.pptx` | 8 | Yours. Not touched. |
| `..._v4.pptx` | 13 | First research-backed rebuild. Full-length version with a competitive-landscape table and a separate scope-and-roadmap slide. Useful if a longer slot is ever available. |
| `..._8slide.pptx` | 8 | Cut to 8 and made diagram-led. Traffic-light palette (green / amber / red) with PROVEN / UNPROVEN / REFUTED verdict labels. |
| `..._v5.pptx` | 8 | Single accent colour, verdict labels removed. Still had a dark slide mid-deck and three different block tints. |
| `..._v6.pptx` | 8 | Fully uniform: one block fill, one heading size, one line colour, one light background on every content slide. |
| **`..._v7.pptx`** | **9** | **Current.** Same visual system as v6, restructured to the standard 9-slide outline. |

---

## What changed in v7

Restructured to the requested outline. The visual system from v6 is unchanged —
still 8 colours, one block fill, one heading size, no borders, no shadows.

| # | Slide | Where it came from |
|---|---|---|
| 1 | Title | v6 slide 1, unchanged |
| 2 | Problem | v6 slide 2, unchanged |
| 3 | Why it's unsolved | **merged** v6 slides 3 + 4 — the translation-is-solved flow, the missing specification, and the extraction statistics now share one slide |
| 4 | Your solution | **new** — Extract / Reimplement / Verify, the legacy-as-oracle idea, and the reciprocal loop. This was missing from the 8-slide cut and is the pivot of the argument |
| 5 | How it works | v6 slide 5, the pipeline diagram, unchanged |
| 6 | What makes it different | **merged** v6 slides 6 + 7 into three columns, one per differentiator |
| 7 | Feasibility & scope | **new** in this cut — in scope, out of scope, four build stages, and the known limitation stated up front |
| 8 | Impact | v6 slide 8, reframed from "what you get" to what changes for the institution |
| 9 | References | **new** — 18 sources in four groups |

Two slides absorbed a merge, so they are the densest in the deck. If either
feels tight when presented, slide 3 splits cleanly back into two (the flow, then
the statistics), and slide 6 splits into one slide per differentiator — that is
exactly what v6 did.

## What changed in v6

Everything on a content slide is now the same treatment. The audit on the
compiled file:

| | v5 | v6 |
|---|---|---|
| Distinct colours in the deck | 16 | **8** |
| Block fills | 3 (`PANEL`, `PANEL_2`, amber tint) | **1** |
| Heading sizes | 5 (29.5–36pt) | **1** (31pt) |
| Backgrounds | navy cover + navy slide 6 + white | **navy cover, white everywhere else** |
| Border styles | solid, dashed, accent, hairline | **none** |
| Drop shadows | 0 | 0 |

**Slide 6 is no longer dark.** It was the one content slide on a navy
background, which was the biggest inconsistency left. It now matches slides
2–5, 7 and 8 exactly.

**One block fill.** Every box on every content slide is the same light grey
(`EDF1F5`), with no border. Nothing is tinted amber, red or green. Contrast
comes from whitespace and type weight instead of from fills.

**Amber is text only.** It never appears as a fill or a border anywhere — only
as the colour of a word, and only where the point is genuinely ours: the third
reference, the key check, the compliance finding, the one number that matters.
Counting them, amber appears on eight elements in the whole deck.

**One dark element.** The navy takeaway band, used identically on slides 3, 4
and 8. Slides 2, 5, 6 and 7 end in a footnote line instead, in the same
position and style on every slide.

The colour list, in full: navy `0E2033`, text `16212E`, muted `6B7785`, amber
`B07A16`, on-dark text `C3D2DF`, line `D5DCE3`, block `EDF1F5`, white.

**Palette cut to two colours.** Navy plus one amber accent, over a grey ramp.
No green, no red, no blue anywhere in the deck. Amber appears only where it
marks the thing that is ours — the third reference, the key rule check, the
compliance finding — so it stays meaningful rather than decorative.

**Verdict labels removed.** The PROVEN / UNPROVEN / REFUTED chips are gone from
the title slide, the pipeline output box, the rule-check flow and the results
tiles.

The underlying distinction is still there, described in plain language instead
of colour-coded labels:

- Slide 7 — three checks, each with a plain outcome line ("if not: never
  exercised", "if not: the rule is not in the program", "if not: a reproducible
  divergence"), ending in *"All three hold: the rule is confirmed by execution."*
- Slide 8 — the tiles now read **47 extracted / 31 confirmed by execution / 16
  not confirmed and named / 94% mutation kill rate**. The arithmetic is
  consistent: 31 + 16 = 47.

**Note.** The old three-way split was 31 confirmed, 11 never exercised, 5
contradicted by the evidence. v5 merges the last two into "16 not confirmed".
The speaker notes on slide 8 keep the distinction, because the contradicted
group is the interesting one — it is where the extraction layer invented a rule
that is not in the program. If you want that distinction back on the slide
itself, it can be restored without bringing back the traffic-light colouring.

**Design system, carried over from `_8slide` and enforced in the generator:**

- *neutral* — flat tint, no border
- *emphasis* — a slightly darker tint or the amber tint, with a hairline border
- *node* — a diagram box, where the border marks state rather than sentiment

No drop shadows anywhere. Heading sizes vary with line length rather than being
one fixed size on every slide.

---

## Rebuilding

Each deck has its generator alongside it. Edit the script and re-run it rather
than hand-editing the `.pptx`, so the deck stays reproducible.

```bash
node build-deck-v5.js
```

`build-deck-8slide.js` and `build-deck-v4.js` rebuild their respective versions.
They need `pptxgenjs`; if it is missing, `npm install pptxgenjs` in the same
folder first.

**One trap worth knowing.** A shape given a negative width or height produces a
file that `python-pptx` and the XSD validator both accept and PowerPoint
refuses to open. If a build ever fails to open, scan the slide XML for negative
`<a:ext>` values before looking anywhere else.
