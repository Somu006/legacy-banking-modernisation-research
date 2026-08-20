"""Render the Research Work markdown into a single PDF.

Markdown -> styled HTML -> headless Chrome print-to-pdf. SVGs referenced from
the Visuals README are inlined so the PDF is self-contained.

Usage:  python build-pdf.py
Output: Research Work/Legacy_Banking_Modernisation_Research.pdf
"""

import html
import pathlib
import re
import shutil
import subprocess
import sys

import markdown

ROOT = pathlib.Path(__file__).resolve().parent
OUT_PDF = ROOT / "Legacy_Banking_Modernisation_Research_R2.pdf"

# Chapter order. Sources go last; the visuals sit before the detailed design docs.
# R2 edition (12 Aug 2026): adds Part 13 (business-plan research) and Part 14
# (the round-2 written report). The round-1 PDF is kept as a historical artifact.
CHAPTERS = [
    ("README.md",                          "Overview"),
    ("00 - Round-2 Briefing.md",           "Part 0 — Round-2 Briefing (read first)"),
    ("01 - Problem Research.md",           "Part 1 — Problem Research"),
    ("02 - Solution Research.md",          "Part 2 — Solution Research"),
    ("03 - Competitive Landscape.md",      "Part 3 — Competitive Landscape"),
    ("04 - Feasibility and Build Plan.md", "Part 4 — Feasibility and Build Plan"),
    ("05 - Risks and Judge Questions.md",  "Part 5 — Risks and Judge Questions"),
    ("Solution Folder/README.md",          "Part 6 — Solution Folder: Overview"),
    ("Visuals/README.md",                  "Part 7 — Visuals"),
    ("Solution Folder/01 - Solution Options.md",         "Part 8 — Solution Options"),
    ("Solution Folder/02 - Novelty Proposals.md",        "Part 9 — Novelty Proposals"),
    ("Solution Folder/03 - Recommended Architecture.md", "Part 10 — Recommended Architecture"),
    ("Solution Folder/04 - Pitch Language.md",           "Part 11 — Pitch Language"),
    ("07 - Verification Pass.md",           "Part 12 — Verification Pass"),
    ("08 - Business Plan Research.md",      "Part 13 — Business Plan Research (Round 2)"),
    ("Work Done/Written/Legacy_Banking_Modernisation_Platform_R2.md",
                                            "Part 14 — Round-2 Written Report"),
    ("deck-renders/README.md",              "Part 15 — The Round-2 Deck"),
    ("06 - Sources.md",                    "Part 16 — Sources"),
]

CSS = """
@page { size: A4; margin: 16mm 14mm 18mm 14mm; }
* { box-sizing: border-box; }
body {
  font: 10.5pt/1.55 Georgia, "Times New Roman", serif;
  color: #1a1a1a; margin: 0;
  -webkit-print-color-adjust: exact; print-color-adjust: exact;
}
.chapter { page-break-before: always; }
.chapter-label {
  font: 600 8.5pt/1 "Segoe UI", Helvetica, sans-serif;
  letter-spacing: .16em; text-transform: uppercase;
  color: #9a948c; margin: 0 0 14pt 0;
  padding-bottom: 6pt; border-bottom: .5pt solid #d4d0c8;
}
h1 { font: 600 19pt/1.25 "Segoe UI", Helvetica, sans-serif; margin: 0 0 12pt; letter-spacing: -.2pt; }
h2 { font: 600 13.5pt/1.3 "Segoe UI", Helvetica, sans-serif; margin: 20pt 0 7pt;
     page-break-after: avoid; border-top: .5pt solid #e8e4de; padding-top: 10pt; }
h3 { font: 600 11pt/1.35 "Segoe UI", Helvetica, sans-serif; margin: 14pt 0 5pt; page-break-after: avoid; }
h4 { font: 600 10pt/1.35 "Segoe UI", Helvetica, sans-serif; margin: 11pt 0 4pt; color: #4a4a4a; page-break-after: avoid; }
p, li { orphans: 3; widows: 3; }
p { margin: 0 0 8pt; }
ul, ol { margin: 0 0 8pt; padding-left: 18pt; }
li { margin-bottom: 3pt; }
strong { font-weight: 700; }
em { font-style: italic; }
a { color: #2c5f8a; text-decoration: none; word-break: break-word; }
hr { border: 0; border-top: .5pt solid #d4d0c8; margin: 16pt 0; }
blockquote {
  margin: 10pt 0; padding: 8pt 12pt; border-left: 2.5pt solid #b8b2a8;
  background: #faf9f7; font-style: italic; color: #3a3a3a; page-break-inside: avoid;
}
blockquote p:last-child { margin-bottom: 0; }
code {
  font: 8.6pt/1.4 Consolas, "Courier New", monospace;
  background: #f4f2ee; padding: .5pt 3pt; border-radius: 2pt; word-break: break-word;
}
pre {
  background: #f7f5f2; border: .5pt solid #e0dcd5; border-radius: 3pt;
  padding: 8pt 10pt; overflow: hidden; page-break-inside: avoid; margin: 0 0 10pt;
}
pre code { font-size: 7.6pt; line-height: 1.45; background: none; padding: 0; white-space: pre-wrap; }
table {
  width: 100%; border-collapse: collapse; margin: 8pt 0 12pt;
  font: 8.4pt/1.4 "Segoe UI", Helvetica, sans-serif; page-break-inside: avoid;
}
th, td { border: .5pt solid #d9d5ce; padding: 4pt 6pt; text-align: left; vertical-align: top; overflow-wrap: break-word; }
th { background: #f2efea; font-weight: 600; }
tbody tr:nth-child(even) td { background: #fbfaf8; }
figure { margin: 12pt 0 16pt; page-break-inside: avoid; text-align: center; }
figure svg { max-width: 100%; height: auto; border: .5pt solid #e0dcd5; border-radius: 3pt; }
img { max-width: 100%; height: auto; border: .5pt solid #e0dcd5; border-radius: 3pt;
      display: block; margin: 8pt 0 14pt; page-break-inside: avoid; }

/* title page */
.title-page { height: 252mm; display: flex; flex-direction: column; justify-content: center; }
.title-page .kicker { font: 600 9pt/1 "Segoe UI", sans-serif; letter-spacing: .2em;
  text-transform: uppercase; color: #9a948c; margin-bottom: 16pt; }
.title-page h1 { font-size: 30pt; line-height: 1.15; margin-bottom: 10pt; }
.title-page .sub { font-size: 13pt; color: #5a5a5a; font-style: italic; margin-bottom: 26pt; }
.title-page .meta { font: 10pt/1.7 "Segoe UI", sans-serif; color: #4a4a4a;
  border-top: .5pt solid #d4d0c8; padding-top: 14pt; }
.title-page .note { margin-top: 22pt; font: 9pt/1.5 "Segoe UI", sans-serif; color: #8a857e; }
.toc { font: 9.5pt/1.9 "Segoe UI", sans-serif; }
.toc div { border-bottom: .5pt dotted #ddd9d2; }
.toc span { color: #9a948c; display: inline-block; width: 26pt; }
"""

TITLE_PAGE = """
<div class="title-page">
  <div class="kicker">CII Eastern Region Hackathon &middot; Banking and Finance Technology</div>
  <h1>Legacy Banking<br>Modernisation Platform</h1>
  <div class="sub">Research dossier, solution design and novelty analysis &mdash; round-2 edition</div>
  <div class="meta">
    <strong>Team StudyEdge</strong> &middot; Odisha University of Technology and Research, Bhubaneswar<br>
    Tamanna Panda &middot; Swayam Subhankar Sahoo &middot; Adyasha Das &middot; Soumyajit Sarkar<br>
    Compiled 4 August 2026 &middot; Revised 12 August 2026 for round 2
  </div>
  <div class="note">
    Every substantive claim carries a source; the bibliography is the final part.
    Figures that could not be traced to a primary source are marked
    <strong>[contested]</strong>; team-authored estimates in the round-2 material
    are marked <strong>[ASSUMPTION]</strong> rather than presented as fact.
  </div>
</div>
"""


def inline_svgs(html_text: str, base: pathlib.Path) -> str:
    """Replace <img src="*.svg"> with the SVG markup itself."""

    def sub(match: re.Match) -> str:
        tag = match.group(0)
        src = re.search(r'src="([^"]+\.svg)"', tag)
        if not src:
            return tag
        path = (base / src.group(1)).resolve()
        if not path.exists():
            print(f"  ! missing svg: {path}", file=sys.stderr)
            return tag
        svg = path.read_text(encoding="utf-8")
        svg = re.sub(r'\s(width|height)="\d+"', "", svg, count=2)
        return f"<figure>{svg}</figure>"

    return re.sub(r"<img[^>]*\.svg[^>]*>", sub, html_text)


def resolve_imgs(html_text: str, base: pathlib.Path) -> str:
    """Rewrite relative raster <img src> paths to be relative to ROOT, so
    chapter markdown stays portable while the built HTML (which lives at
    ROOT) still finds the files."""

    def sub(match: re.Match) -> str:
        src = match.group(1)
        if src.startswith(("http:", "https:", "data:", "/")) or src.endswith(".svg"):
            return match.group(0)
        resolved = (base / src).resolve()
        if not resolved.exists():
            print(f"  ! missing image: {resolved}", file=sys.stderr)
            return match.group(0)
        rel = resolved.relative_to(ROOT).as_posix()
        return match.group(0).replace(f'src="{src}"', f'src="{rel}"')

    return re.sub(r'<img[^>]*src="([^"]+)"[^>]*>', sub, html_text)


def main() -> int:
    md = markdown.Markdown(
        extensions=["tables", "fenced_code", "sane_lists", "attr_list", "md_in_html"]
    )

    toc = "".join(
        f'<div><span>{i:02d}</span>{html.escape(label)}</div>'
        for i, (_, label) in enumerate(CHAPTERS, 1)
    )

    body = [TITLE_PAGE]
    body.append(
        '<div class="chapter"><div class="chapter-label">Contents</div>'
        f'<div class="toc">{toc}</div></div>'
    )

    for rel, label in CHAPTERS:
        path = ROOT / rel
        if not path.exists():
            print(f"  ! missing: {rel}", file=sys.stderr)
            continue
        md.reset()
        chunk = md.convert(path.read_text(encoding="utf-8"))
        chunk = inline_svgs(chunk, path.parent)
        chunk = resolve_imgs(chunk, path.parent)
        body.append(
            f'<div class="chapter"><div class="chapter-label">{html.escape(label)}</div>{chunk}</div>'
        )
        print(f"  + {rel}")

    doc = (
        "<!doctype html><html><head><meta charset='utf-8'>"
        "<title>Legacy Banking Modernisation Platform — Research</title>"
        f"<style>{CSS}</style></head><body>{''.join(body)}</body></html>"
    )

    tmp_html = ROOT / "_build.html"
    tmp_html.write_text(doc, encoding="utf-8")

    chrome = next(
        (
            p
            for p in (
                r"C:\Program Files\Google\Chrome\Application\chrome.exe",
                r"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe",
            )
            if pathlib.Path(p).exists()
        ),
        shutil.which("chrome") or shutil.which("google-chrome"),
    )
    if not chrome:
        print("Chrome not found; leaving _build.html for manual printing.", file=sys.stderr)
        return 1

    subprocess.run(
        [
            chrome,
            "--headless=new",
            "--disable-gpu",
            "--no-sandbox",
            "--no-pdf-header-footer",
            "--virtual-time-budget=10000",
            f"--print-to-pdf={OUT_PDF}",
            tmp_html.as_uri(),
        ],
        check=True,
        capture_output=True,
    )
    tmp_html.unlink(missing_ok=True)
    print(f"\n{OUT_PDF.name} — {OUT_PDF.stat().st_size / 1024:.0f} KB")
    return 0


if __name__ == "__main__":
    sys.exit(main())
