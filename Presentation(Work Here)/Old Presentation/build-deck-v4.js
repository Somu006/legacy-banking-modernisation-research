const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE";           // 13.333 x 7.5 -- set BEFORE adding slides
pres.author = "Team StudyEdge";
pres.company = "Odisha University of Technology and Research";
pres.title = "Legacy Banking Modernisation Platform";

// ---------------------------------------------------------------- palette
const INK    = "0E2033";   // deep navy - dominant on dark slides
const INK_2  = "1A3A55";
const TEXT   = "16212E";
const MUTED  = "6B7785";
const RULE   = "D9DEE5";
const PANEL  = "F1F4F7";   // cool light panel on white
const WHITE  = "FFFFFF";
const AMBER  = "C8891B";   // accent - audit / rupee
const AMBER_L= "FBF2DF";
const GREEN  = "2E7D5B";
const GREEN_L= "E8F1EC";
const RED    = "B23C2A";
const RED_L  = "FAEBE7";
const BLUE   = "36678F";
const BLUE_L = "E8EEF4";

const HEAD = "Cambria";    // safe-list serif for headers
const BODY = "Calibri";    // safe-list sans for body
const MONO = "Consolas";   // code only; short strings, slack left

const W = 13.333, M = 0.62, CW = W - M * 2;

// ---------------------------------------------------------------- helpers
const shadow = () => ({ type: "outer", color: "8A94A0", blur: 8, offset: 1, angle: 90, opacity: 0.18 });

function kicker(s, txt, color) {
  s.addText(txt, {
    x: M, y: 0.42, w: CW, h: 0.26, margin: 0,
    fontFace: BODY, fontSize: 10.5, bold: true, charSpacing: 2.6,
    color: color || MUTED,
  });
}

function heading(s, txt, opts = {}) {
  s.addText(txt, {
    x: M, y: opts.y || 0.72, w: opts.w || CW, h: opts.h || 0.72, margin: 0,
    fontFace: HEAD, fontSize: opts.size || 32, bold: true,
    color: opts.color || TEXT, valign: "top",
  });
}

function card(s, o) {
  s.addShape(pres.ShapeType.roundRect, {
    x: o.x, y: o.y, w: o.w, h: o.h, rectRadius: 0.06,
    fill: { color: o.fill || PANEL },
    line: o.line ? { color: o.line, width: 1 } : { color: o.fill || PANEL, width: 0 },
    shadow: o.flat ? undefined : shadow(),
  });
}

function badge(s, o) {
  s.addShape(pres.ShapeType.ellipse, {
    x: o.x, y: o.y, w: o.d, h: o.d,
    fill: { color: o.fill }, line: { color: o.fill, width: 0 },
  });
  s.addText(o.txt, {
    x: o.x, y: o.y, w: o.d, h: o.d, margin: 0,
    fontFace: BODY, fontSize: o.size || 13, bold: true,
    color: o.color || WHITE, align: "center", valign: "middle",
  });
}

function footnote(s, txt) {
  s.addText(txt, {
    x: M, y: 6.94, w: CW, h: 0.3, margin: 0,
    fontFace: BODY, fontSize: 9.5, italic: true, color: MUTED,
  });
}

// ================================================================ 1. TITLE
{
  const s = pres.addSlide();
  s.background = { color: INK };

  s.addText("DIGITAL NURTURE HACKATHON 2026   ·   BANKING AND FINANCE TECHNOLOGY", {
    x: M, y: 0.62, w: CW, h: 0.3, margin: 0,
    fontFace: BODY, fontSize: 11, bold: true, charSpacing: 2.4, color: "8FA7BD",
  });

  s.addText("Legacy Banking", {
    x: M, y: 1.55, w: 10.5, h: 0.92, margin: 0,
    fontFace: HEAD, fontSize: 48, bold: true, color: WHITE,
  });
  s.addText("Modernisation Platform", {
    x: M, y: 2.42, w: 10.5, h: 0.92, margin: 0,
    fontFace: HEAD, fontSize: 48, bold: true, color: WHITE,
  });

  s.addText("Proving the rewrite behaves exactly like the original", {
    x: M, y: 3.46, w: 10.5, h: 0.42, margin: 0,
    fontFace: BODY, fontSize: 19, italic: true, color: AMBER,
  });

  s.addText(
    "Legacy migration fails on verification, not translation. We make behavioural equivalence something a bank can prove — and we check the answer against the regulator.",
    { x: M, y: 4.06, w: 9.6, h: 0.72, margin: 0, fontFace: BODY, fontSize: 13.5, color: "C3D2DF", lineSpacing: 21 }
  );

  s.addShape(pres.ShapeType.line, {
    x: M, y: 5.28, w: 4.2, h: 0, line: { color: "3A5470", width: 1 },
  });

  s.addText("Team StudyEdge", {
    x: M, y: 5.46, w: 6.2, h: 0.32, margin: 0,
    fontFace: BODY, fontSize: 16, bold: true, color: WHITE,
  });
  s.addText("Odisha University of Technology and Research, Bhubaneswar", {
    x: M, y: 5.8, w: 6.6, h: 0.28, margin: 0,
    fontFace: BODY, fontSize: 11.5, color: "8FA7BD",
  });
  s.addText("Tamanna Panda  ·  Swayam Subhankar Sahoo  ·  Adyasha Das  ·  Soumyajit Sarkar", {
    x: M, y: 6.12, w: 8.6, h: 0.28, margin: 0,
    fontFace: BODY, fontSize: 11, color: "8FA7BD",
  });

  // right-hand motif: the three verdicts
  const chips = [
    { t: "PROVEN",   c: GREEN, y: 1.75 },
    { t: "UNPROVEN", c: AMBER, y: 2.52 },
    { t: "REFUTED",  c: RED,   y: 3.29 },
  ];
  chips.forEach((ch) => {
    s.addShape(pres.ShapeType.roundRect, {
      x: 11.15, y: ch.y, w: 1.62, h: 0.54, rectRadius: 0.26,
      fill: { color: ch.c }, line: { color: ch.c, width: 0 },
    });
    s.addText(ch.t, {
      x: 11.15, y: ch.y, w: 1.62, h: 0.54, margin: 0,
      fontFace: BODY, fontSize: 10.5, bold: true, charSpacing: 1,
      color: WHITE, align: "center", valign: "middle",
    });
  });
  s.addText("a verdict per business rule", {
    x: 10.0, y: 3.95, w: 2.77, h: 0.3, margin: 0,
    fontFace: BODY, fontSize: 10, italic: true, color: "8FA7BD", align: "center",
  });

  s.addNotes(
    "One line: everyone proves the rewrite matches the legacy; we also ask whether the legacy matches the regulator, " +
    "and we report the answer per business rule.\n\n" +
    "Scope note if asked: COBOL interest-accrual programs executed via GnuCOBOL. Whole-system migration is out of scope."
  );
}

// ================================================================ 2. SITUATION
{
  const s = pres.addSlide();
  kicker(s, "THE SITUATION");
  heading(s, "India's banks run on code nobody can safely change");

  const stats = [
    { n: "92", u: "of the top 100", l: "banks worldwide run on\nIBM mainframes" },
    { n: "40%+", u: "of banking systems", l: "still run COBOL written\ndecades ago" },
    { n: "$1bn", u: "over 5–10 years", l: "to upgrade Indian core\nbanking systems (BCG)" },
    { n: "0", u: "specifications", l: "state what those\nprograms should do" },
  ];
  const cw = 2.92, gap = 0.15;
  stats.forEach((st, i) => {
    const x = M + i * (cw + gap);
    card(s, { x, y: 1.68, w: cw, h: 1.86 });
    s.addText(st.n, {
      x: x + 0.22, y: 1.8, w: cw - 0.44, h: 0.72, margin: 0,
      fontFace: HEAD, fontSize: 42, bold: true, color: INK,
    });
    s.addText(st.u, {
      x: x + 0.22, y: 2.52, w: cw - 0.44, h: 0.26, margin: 0,
      fontFace: BODY, fontSize: 11.5, bold: true, color: AMBER,
    });
    s.addText(st.l, {
      x: x + 0.22, y: 2.8, w: cw - 0.44, h: 0.62, margin: 0,
      fontFace: BODY, fontSize: 11, color: MUTED, lineSpacing: 15,
    });
  });

  s.addText("When a bank guesses wrong, it is not an engineering incident", {
    x: M, y: 3.76, w: CW, h: 0.34, margin: 0,
    fontFace: HEAD, fontSize: 18, bold: true, color: TEXT,
  });

  const cases = [
    {
      h: "TSB, United Kingdom — 2018",
      b: "A core migration failed at cutover. The FCA and PRA fined TSB £48.65m for operational risk and governance failings; £32.7m was paid in customer redress. Business as usual did not return for eight months.",
      c: RED, f: RED_L,
    },
    {
      h: "HDFC Bank, India — 2020",
      b: "After repeated outages the RBI halted all Digital 2.0 launches and froze new credit-card issuance. The card restriction lifted only in August 2021; the digital freeze ran into 2022.",
      c: BLUE, f: BLUE_L,
    },
  ];
  cases.forEach((c, i) => {
    const x = M + i * (6.14 + 0.18);
    card(s, { x, y: 4.2, w: 6.14, h: 1.66, fill: c.f, line: c.c });
    s.addText(c.h, {
      x: x + 0.26, y: 4.36, w: 5.62, h: 0.3, margin: 0,
      fontFace: BODY, fontSize: 13.5, bold: true, color: c.c,
    });
    s.addText(c.b, {
      x: x + 0.26, y: 4.68, w: 5.62, h: 1.06, margin: 0,
      fontFace: BODY, fontSize: 11.5, color: TEXT, lineSpacing: 16,
    });
  });

  s.addText(
    "A one-paisa divergence across millions of accounts is a reportable regulatory event, not a bug report. Refusing to touch the system is the correct decision under the bank's own risk framework.",
    { x: M, y: 6.06, w: CW, h: 0.5, margin: 0, fontFace: BODY, fontSize: 13, italic: true, color: INK, lineSpacing: 18 }
  );

  footnote(s, "Sources: FCA press release, Dec 2022 · BCG, Cloud-based Core Transformations, Aug 2024 · RBI supervisory action, Dec 2020. Full citations in the research dossier.");

  s.addNotes(
    "The 1.9 million customer figure often quoted for TSB is press reporting (The Register, IEEE Spectrum), not the FCA. " +
    "The FCA's own wording is 'a significant proportion of its 5.2 million customers' — that is what is on the slide.\n\n" +
    "The HDFC example is the one that matters for an Indian audience: an IT failure froze the bank's product roadmap for over a year."
  );
}

// ================================================================ 3. MISDIAGNOSIS
{
  const s = pres.addSlide();
  kicker(s, "THE MISDIAGNOSIS");
  heading(s, "Everyone assumes this is a translation problem");

  card(s, { x: M, y: 1.72, w: 6.14, h: 3.0, fill: PANEL });
  s.addText("Already solved, and shipping", {
    x: M + 0.3, y: 1.94, w: 5.54, h: 0.32, margin: 0,
    fontFace: BODY, fontSize: 14, bold: true, color: GREEN,
  });
  s.addText(
    [
      { text: "AWS Transform for mainframe — generally available since May 2025", options: { bullet: true, breakLine: true } },
      { text: "IBM watsonx Code Assistant for Z — COBOL refactored to Java", options: { bullet: true, breakLine: true } },
      { text: "TCS MasterCraft TransformPlus — automated COBOL-to-Java conversion", options: { bullet: true, breakLine: true } },
      { text: "Cognizant modernisation accelerators — rules extracted, specs generated", options: { bullet: true } },
    ],
    { x: M + 0.3, y: 2.36, w: 5.54, h: 1.6, margin: 0, fontFace: BODY, fontSize: 12, color: TEXT, paraSpaceAfter: 8, lineSpacing: 16 }
  );
  s.addText("Generating the new code was never the hard part.", {
    x: M + 0.3, y: 4.06, w: 5.54, h: 0.5, margin: 0,
    fontFace: BODY, fontSize: 13, bold: true, italic: true, color: INK,
  });

  card(s, { x: M + 6.32, y: 1.72, w: 6.14, h: 3.0, fill: RED_L, line: RED });
  s.addText("Still blocking every migration", {
    x: M + 6.62, y: 1.94, w: 5.54, h: 0.32, margin: 0,
    fontFace: BODY, fontSize: 14, bold: true, color: RED,
  });
  s.addText(
    "The generated code compiles. It passes the tests the team wrote. Should the bank deploy it?\n\nNobody can answer. No specification of the current behaviour exists, so nobody can show the new system does the same thing — and the tolerance for difference is zero.",
    { x: M + 6.62, y: 2.36, w: 5.54, h: 1.6, margin: 0, fontFace: BODY, fontSize: 12, color: TEXT, lineSpacing: 17 }
  );
  s.addText("So it does not ship.", {
    x: M + 6.62, y: 4.06, w: 5.54, h: 0.5, margin: 0,
    fontFace: BODY, fontSize: 13, bold: true, italic: true, color: RED,
  });

  card(s, { x: M, y: 4.96, w: CW, h: 1.62, fill: INK, flat: true });
  s.addText("The bottleneck is verification, not code generation.", {
    x: M + 0.34, y: 5.14, w: CW - 0.68, h: 0.44, margin: 0,
    fontFace: HEAD, fontSize: 24, bold: true, color: WHITE,
  });
  s.addText(
    "This is not a contrarian view. IBM, AWS and Mechanical Orchard have all converged on behavioural equivalence as the real deliverable. We agree with them — and then go one step further.",
    { x: M + 0.34, y: 5.66, w: CW - 0.68, h: 0.7, margin: 0, fontFace: BODY, fontSize: 13, color: "C3D2DF", lineSpacing: 18 }
  );

  s.addNotes(
    "Deliberately generous to the incumbents. If a Cognizant judge works in mainframe modernisation, claiming to have " +
    "invented differential verification would lose the room in one sentence. Agreeing with them first buys the right to " +
    "make a narrower, defensible claim later."
  );
}

// ================================================================ 4. REAL PROBLEM
{
  const s = pres.addSlide();
  kicker(s, "THE REAL PROBLEM");
  heading(s, "The specification was never written down");

  s.addText(
    "Accrual conventions. Rounding on the third decimal. Leap years. Accounts opened on the 31st. Hundreds of edge cases, each one patched in over four decades as a response to something real.",
    { x: M, y: 1.66, w: 7.2, h: 0.86, margin: 0, fontFace: BODY, fontSize: 14, color: TEXT, lineSpacing: 20 }
  );
  s.addText("So where do those rules live today?", {
    x: M, y: 2.58, w: 7.2, h: 0.34, margin: 0,
    fontFace: BODY, fontSize: 14, bold: true, color: MUTED,
  });
  s.addText("Nowhere. The code is the specification.", {
    x: M, y: 2.98, w: 7.2, h: 0.9, margin: 0,
    fontFace: HEAD, fontSize: 30, bold: true, color: INK, lineSpacing: 34,
  });
  s.addText(
    "The engineers who made those changes have retired. The only ways to learn a rule are to read four thousand undocumented lines, or to run the program and watch what it does.",
    { x: M, y: 3.96, w: 7.2, h: 0.7, margin: 0, fontFace: BODY, fontSize: 13, color: MUTED, lineSpacing: 18 }
  );

  // code card
  card(s, { x: 8.12, y: 1.66, w: 4.6, h: 3.0, fill: INK, flat: true });
  s.addText("ACCRUAL.CBL", {
    x: 8.36, y: 1.84, w: 4.12, h: 0.26, margin: 0,
    fontFace: BODY, fontSize: 10, bold: true, charSpacing: 1.8, color: "7E93A8",
  });
  s.addText(
    [
      { text: "COMPUTE WS-INT ", options: { color: "C3D2DF" } },
      { text: "ROUNDED", options: { color: AMBER, bold: true } },
      { text: " =", options: { color: "C3D2DF", breakLine: true } },
      { text: "    WS-PRIN * WS-RATE", options: { color: "C3D2DF", breakLine: true } },
      { text: "    * WS-DAYS / 36500", options: { color: "C3D2DF", breakLine: true } },
      { text: "IF WS-DOM > 28", options: { color: "C3D2DF", breakLine: true } },
      { text: "    PERFORM MONTH-END-FIX", options: { color: "C3D2DF" } },
    ],
    { x: 8.36, y: 2.2, w: 4.12, h: 1.6, margin: 0, fontFace: MONO, fontSize: 12.5, lineSpacing: 22 }
  );
  s.addText(
    "One word. ROUNDED decides how a few hundred crore of interest settles — and it is documented nowhere.",
    { x: 8.36, y: 3.92, w: 4.12, h: 0.6, margin: 0, fontFace: BODY, fontSize: 11, italic: true, color: "8FA7BD", lineSpacing: 15 }
  );

  card(s, { x: M, y: 4.94, w: CW, h: 1.5, fill: AMBER_L, line: AMBER });
  s.addText('"the resulting code cannot be trusted to correctly translate the original code"', {
    x: M + 0.34, y: 5.12, w: CW - 0.68, h: 0.42, margin: 0,
    fontFace: HEAD, fontSize: 19, bold: true, italic: true, color: "7A5410",
  });
  s.addText(
    "IBM Research — writing about the testing framework for IBM's own watsonx Code Assistant for Z.  (arXiv:2504.10548)",
    { x: M + 0.34, y: 5.62, w: CW - 0.68, h: 0.34, margin: 0, fontFace: BODY, fontSize: 12, color: "7A5410" }
  );
  s.addText(
    "If the vendor cannot trust its own output without validation, no bank can. That is the gap we build for.",
    { x: M + 0.34, y: 5.96, w: CW - 0.68, h: 0.34, margin: 0, fontFace: BODY, fontSize: 12, bold: true, color: "7A5410" }
  );

  s.addNotes(
    "The IBM quote is verbatim from the paper's abstract — verified word-for-word. It is the strongest single line " +
    "available, because it is a vendor writing about its own commercial product.\n\n" +
    "Do not paraphrase it as 'IBM says its product does not work.' The paper's point is that validation is necessary. " +
    "That is our point too."
  );
}

// ================================================================ 5. EXTRACTION FAILS
{
  const s = pres.addSlide();
  kicker(s, "WHY THE OBVIOUS APPROACH FAILS");
  heading(s, "Pointing an AI at the COBOL is not enough");

  s.addText(
    "The intuitive move is to ask a language model to explain the business rules. The output looks excellent — clean, confident, well organised. And a meaningful share of it is wrong.",
    { x: M, y: 1.66, w: CW, h: 0.6, margin: 0, fontFace: BODY, fontSize: 14, color: TEXT, lineSpacing: 20 }
  );

  const bigs = [
    { n: "62%", l: "precision of the best published\nCOBOL rule extractor", sub: "A-COBREX, ICSE 2025", c: AMBER },
    { n: "91.2%", l: "of business rules successfully\nextracted by a 2026 system", sub: "AgentModernize, arXiv 2605.17535", c: GREEN },
    { n: "<20%", l: "behavioural equivalence achieved\nby that same system", sub: "baselines scored 0.0%", c: RED },
  ];
  const bw = 3.98, bg = 0.2;
  bigs.forEach((b, i) => {
    const x = M + i * (bw + bg);
    card(s, { x, y: 2.4, w: bw, h: 2.06 });
    s.addText(b.n, {
      x: x + 0.26, y: 2.54, w: bw - 0.52, h: 0.82, margin: 0,
      fontFace: HEAD, fontSize: 46, bold: true, color: b.c,
    });
    s.addText(b.l, {
      x: x + 0.26, y: 3.38, w: bw - 0.52, h: 0.6, margin: 0,
      fontFace: BODY, fontSize: 12, color: TEXT, lineSpacing: 16,
    });
    s.addText(b.sub, {
      x: x + 0.26, y: 4.0, w: bw - 0.52, h: 0.28, margin: 0,
      fontFace: BODY, fontSize: 10, italic: true, color: MUTED,
    });
  });

  card(s, { x: M, y: 4.72, w: CW, h: 1.86, fill: INK, flat: true });
  s.addText("Extraction works. Behavioural equivalence does not follow from it.", {
    x: M + 0.34, y: 4.92, w: CW - 0.68, h: 0.42, margin: 0,
    fontFace: HEAD, fontSize: 23, bold: true, color: WHITE,
  });
  s.addText(
    "A confidently stated wrong rule is more dangerous than no rule at all, because an engineer will build on it. Measured hallucination rates in code explanation run as high as 66%.",
    { x: M + 0.34, y: 5.42, w: CW - 0.68, h: 0.5, margin: 0, fontFace: BODY, fontSize: 13, color: "C3D2DF", lineSpacing: 18 }
  );
  s.addText("So extraction cannot be the product. Verification has to be the product.", {
    x: M + 0.34, y: 5.96, w: CW - 0.68, h: 0.38, margin: 0,
    fontFace: BODY, fontSize: 14, bold: true, color: AMBER,
  });

  footnote(s, "Sources: A-COBREX, ICSE 2025 · AgentModernize, arXiv 2605.17535 · Hallucinations in LLM-Based Code Summarization, PACMSE 2026.");

  s.addNotes(
    "The 91.2% / under-20% pair is the sharpest argument we have and it comes from someone else's paper. " +
    "AgentModernize captured 91.2% of gold-standard rules but its Behavioural Equivalence Rate was 9.4%, 8.1% and 19.4% " +
    "across three models, with baselines at 0.0%.\n\n" +
    "If pressed: BER is measured against gold-standard test cases, which is a demanding definition. Say so — it is still the point."
  );
}

// ================================================================ 6. APPROACH
{
  const s = pres.addSlide();
  kicker(s, "OUR APPROACH");
  heading(s, "Treat modernisation as a verification problem");

  const steps = [
    { n: "01", t: "Extract", b: "Slice the legacy source into functional units and state each unit's business rules in plain language. Every rule carries the exact lines that produce it — written by the pipeline from the slice, never asserted by the model.", c: BLUE },
    { n: "02", t: "Reimplement", b: "Generate the modern equivalent. This is the commodity step, and deliberately the least interesting part of the system. The output is treated as untrusted by design.", c: MUTED },
    { n: "03", t: "Verify", b: "Generate inputs at the boundaries those rules imply, execute the original and the reimplementation against every one, and compare. Real execution on both sides, on a laptop.", c: GREEN },
  ];
  const sw = 3.98, sg = 0.2;
  steps.forEach((st, i) => {
    const x = M + i * (sw + sg);
    card(s, { x, y: 1.72, w: sw, h: 2.68 });
    badge(s, { x: x + 0.26, y: 1.94, d: 0.5, txt: st.n, fill: st.c, size: 13 });
    s.addText(st.t, {
      x: x + 0.9, y: 1.99, w: sw - 1.16, h: 0.4, margin: 0,
      fontFace: HEAD, fontSize: 21, bold: true, color: TEXT,
    });
    s.addText(st.b, {
      x: x + 0.26, y: 2.5, w: sw - 0.52, h: 1.72, margin: 0,
      fontFace: BODY, fontSize: 11.5, color: MUTED, lineSpacing: 16,
    });
  });

  // reciprocal loop band
  card(s, { x: M, y: 4.62, w: CW, h: 1.06, fill: AMBER_L, line: AMBER });
  s.addText("The reciprocal loop", {
    x: M + 0.34, y: 4.78, w: 2.5, h: 0.3, margin: 0,
    fontFace: BODY, fontSize: 13.5, bold: true, color: "7A5410",
  });
  s.addText(
    "The extracted rules tell the input generator where the boundaries are — ₹99,999 / ₹1,00,000 / ₹1,00,001. The differential run then catches the extraction layer stating rules that are wrong. Neither half works alone.",
    { x: M + 3.0, y: 4.76, w: CW - 3.34, h: 0.76, margin: 0, fontFace: BODY, fontSize: 12, color: "7A5410", lineSpacing: 16 }
  );

  card(s, { x: M, y: 5.86, w: CW, h: 0.86, fill: PANEL });
  s.addText("The legacy program is its own correctness oracle.", {
    x: M + 0.34, y: 5.98, w: 5.6, h: 0.3, margin: 0,
    fontFace: BODY, fontSize: 14, bold: true, color: INK,
  });
  s.addText(
    "It already defines the right answer by running, so nobody has to specify expected behaviour in advance.",
    { x: M + 0.34, y: 6.28, w: 11.6, h: 0.3, margin: 0, fontFace: BODY, fontSize: 12, color: MUTED }
  );

  s.addNotes(
    "Architecture is a deterministic pipeline with LLM calls confined to two bounded points. That is not a simplification — " +
    "a 2026 controlled study (arXiv 2605.09894) found deterministic orchestration matches agentic accuracy while reducing " +
    "token consumption by up to 3.5x, with better worst-case robustness."
  );
}

// ================================================================ 7. NOVELTY 1
{
  const s = pres.addSlide();
  s.background = { color: INK };
  kicker(s, "WHAT NOBODY ELSE DOES  ·  01", "8FA7BD");
  heading(s, "We check the legacy against the regulator", { color: WHITE });

  s.addText(
    'Every tool on the market compares two things and treats the legacy program as correct by definition. But "the legacy system is its own oracle" is true for equivalence and false for correctness — a program written in 1987 can breach a Master Direction issued decades later.',
    { x: M, y: 1.62, w: CW, h: 0.72, margin: 0, fontFace: BODY, fontSize: 13.5, color: "C3D2DF", lineSpacing: 19 }
  );

  s.addText("So we run three references, not two:", {
    x: M, y: 2.44, w: CW, h: 0.3, margin: 0,
    fontFace: BODY, fontSize: 13, bold: true, color: AMBER,
  });

  const cells = [
    { f: "L = R = Reg", h: "Verified compliant", b: "Nothing to do. This is what a sign-off is actually made of.", c: GREEN },
    { f: "L ≠ R", h: "Translation defect", b: "The rewrite is wrong. The only cell a two-way tool can see.", c: RED },
    { f: "L = R ≠ Reg", h: "Inherited breach", b: "Both agree — and both breach the Direction. Invisible to everyone else.", c: AMBER },
    { f: "L ≠ R = Reg", h: "Silent correction", b: "The rewrite \"fixed\" it. Not a win — the books change at cutover.", c: BLUE },
  ];
  const cwv = 2.92, cg = 0.15;
  cells.forEach((c, i) => {
    const x = M + i * (cwv + cg);
    s.addShape(pres.ShapeType.roundRect, {
      x, y: 2.84, w: cwv, h: 2.04, rectRadius: 0.06,
      fill: { color: INK_2 }, line: { color: c.c, width: 1.5 },
    });
    s.addText(c.f, {
      x: x + 0.2, y: 2.98, w: cwv - 0.4, h: 0.28, margin: 0,
      fontFace: MONO, fontSize: 12, bold: true, color: c.c, align: "center",
    });
    s.addText(c.h, {
      x: x + 0.2, y: 3.32, w: cwv - 0.4, h: 0.32, margin: 0,
      fontFace: HEAD, fontSize: 15.5, bold: true, color: WHITE, align: "center",
    });
    s.addText(c.b, {
      x: x + 0.2, y: 3.72, w: cwv - 0.4, h: 1.0, margin: 0,
      fontFace: BODY, fontSize: 11, color: "AEC0D0", align: "center", lineSpacing: 15,
    });
  });

  card(s, { x: M, y: 5.12, w: CW, h: 1.5, fill: INK_2, flat: true });
  s.addText("The third reference is written down, and it is Indian", {
    x: M + 0.34, y: 5.26, w: CW - 0.68, h: 0.32, margin: 0,
    fontFace: BODY, fontSize: 14, bold: true, color: AMBER,
  });
  s.addText(
    "RBI Master Direction (Interest Rate on Deposits), 2016 — clause 6(a): interest on savings deposits calculated on a daily product basis · clause 6(a)(1)–(2): uniform rate up to ₹1 lakh, differential rates above · clause 4(f): interest on rupee deposits rounded to the nearest rupee, two decimals for FCNR(B).",
    { x: M + 0.34, y: 5.62, w: CW - 0.68, h: 0.9, margin: 0, fontFace: BODY, fontSize: 11.5, color: "C3D2DF", lineSpacing: 16 }
  );

  s.addNotes(
    "This is the strongest claim in the deck and it survived a deliberate falsification pass. Verified: Locksmith " +
    "(arXiv 2607.28271) has no regulatory checks; AgentModernize has none; EvolveWare markets rule extraction for auditors " +
    "but is static documentation with no execution.\n\n" +
    "Likely reason nobody built it: a migration product that tells you your current system is non-compliant is selling a " +
    "problem its customer did not ask about. A student project has no such constraint.\n\n" +
    "Honest framing: we say 'this warrants a compliance review', never 'this is a breach'. The model covers arithmetic " +
    "conventions, not commercial terms."
  );
}

// ================================================================ 8. NOVELTY 2
{
  const s = pres.addSlide();
  kicker(s, "WHAT NOBODY ELSE DOES  ·  02");
  heading(s, "A rule is not proven because its lines ran");

  s.addText(
    "Executing a line is not testing the rule it encodes. A line can run a thousand times without its boundary ever mattering to the output. So we require three conditions, not one.",
    { x: M, y: 1.62, w: 7.5, h: 0.62, margin: 0, fontFace: BODY, fontSize: 13.5, color: TEXT, lineSpacing: 19 }
  );

  const conds = [
    { n: "1", t: "Reached", b: "Did any input execute the lines this rule came from?", c: MUTED, fail: "→ UNPROVEN", fc: AMBER },
    { n: "2", t: "Discriminating", b: "Did inputs on both sides of the boundary produce different legacy outputs — is the boundary actually live?", c: AMBER, fail: "→ REFUTED", fc: RED },
    { n: "3", t: "Agreed", b: "Did the reimplementation match the legacy on every one of them?", c: MUTED, fail: "→ DIVERGENCE", fc: RED },
  ];
  conds.forEach((c, i) => {
    const y = 2.42 + i * 1.06;
    card(s, { x: M, y, w: 8.5, h: 0.96, fill: i === 1 ? AMBER_L : PANEL, line: i === 1 ? AMBER : null });
    badge(s, { x: M + 0.24, y: y + 0.23, d: 0.5, txt: c.n, fill: c.c, size: 14 });
    s.addText(c.t, {
      x: M + 0.9, y: y + 0.15, w: 2.3, h: 0.3, margin: 0,
      fontFace: HEAD, fontSize: 16, bold: true, color: TEXT,
    });
    s.addText(c.b, {
      x: M + 0.9, y: y + 0.45, w: 5.5, h: 0.48, margin: 0,
      fontFace: BODY, fontSize: 11, color: MUTED, lineSpacing: 14,
    });
    s.addText(c.fail, {
      x: M + 6.5, y: y + 0.33, w: 1.86, h: 0.3, margin: 0,
      fontFace: BODY, fontSize: 12, bold: true, color: c.fc, align: "right",
    });
  });

  card(s, { x: M, y: 5.62, w: 8.5, h: 0.62, fill: GREEN_L, line: GREEN, flat: true });
  s.addText("All three hold  →  PROVEN", {
    x: M, y: 5.62, w: 8.5, h: 0.62, margin: 0,
    fontFace: HEAD, fontSize: 17, bold: true, color: GREEN, align: "center", valign: "middle",
  });

  card(s, { x: 9.42, y: 2.42, w: 3.3, h: 3.82, fill: RED_L, line: RED });
  s.addText("The middle test is the point", {
    x: 9.66, y: 2.6, w: 2.82, h: 0.56, margin: 0,
    fontFace: HEAD, fontSize: 16, bold: true, color: RED, lineSpacing: 20,
  });
  s.addText(
    "A rule whose boundary makes no difference to the output is not untested — it is contradicted.\n\nCondition 2 fails exactly when our own extraction layer invented a rule that is not in the program.\n\nWe report those as REFUTED, with the input that proves it, and we put them at the top of the report.",
    { x: 9.66, y: 3.24, w: 2.82, h: 2.6, margin: 0, fontFace: BODY, fontSize: 11, color: TEXT, lineSpacing: 15 }
  );

  footnote(s, "Rule-level scoring itself is not new — AgentModernize's Business Rule Preservation Score does it against human gold-standard rules. The discrimination condition and the refuted verdict are ours.");

  s.addNotes(
    "Be precise about the novelty here — it was narrowed by our own verification pass. Rule-level reporting exists in the " +
    "literature. What we could not find anywhere: requiring the boundary to be behaviourally live, and issuing a refutation " +
    "verdict on rules the system extracted itself with no ground truth available.\n\n" +
    "Wording discipline: REFUTED means 'contradicted by the evidence we have', never 'false'. Always show the counterexample."
  );
}

// ================================================================ 9. NOVELTY 3
{
  const s = pres.addSlide();
  kicker(s, "WHAT NOBODY ELSE DOES  ·  03");
  heading(s, "We test our own tests");

  s.addText(
    '"Everything passed" proves nothing unless the inputs could have caught a failure. So we break the legacy program on purpose and check whether our corpus notices.',
    { x: M, y: 1.62, w: CW, h: 0.6, margin: 0, fontFace: BODY, fontSize: 13.5, color: TEXT, lineSpacing: 19 }
  );

  card(s, { x: M, y: 2.36, w: 5.9, h: 2.2, fill: PANEL });
  s.addText("Inject a deliberate defect into the legacy", {
    x: M + 0.28, y: 2.54, w: 5.34, h: 0.3, margin: 0,
    fontFace: BODY, fontSize: 13.5, bold: true, color: TEXT,
  });
  s.addText(
    [
      { text: "100000  →  100001", options: { breakLine: true } },
      { text: ">  →  >=", options: { breakLine: true } },
      { text: "delete ROUNDED", options: { breakLine: true } },
      { text: "V99  →  V999", options: { breakLine: true } },
      { text: "360  →  365", options: {} },
    ],
    { x: M + 0.28, y: 2.94, w: 5.34, h: 1.4, margin: 0, fontFace: MONO, fontSize: 12.5, color: RED, lineSpacing: 19 }
  );

  const outs = [
    { h: "Mutant killed", b: "The corpus caught it. Our inputs really do exercise that threshold — the claim stands.", c: GREEN, f: GREEN_L, y: 2.36 },
    { h: "Mutant survived", b: "Nobody noticed a one-rupee change to the threshold. We downgrade that rule to unproven.", c: RED, f: RED_L, y: 3.52 },
  ];
  outs.forEach((o) => {
    card(s, { x: 6.78, y: o.y, w: 5.94, h: 1.04, fill: o.f, line: o.c });
    s.addText(o.h, {
      x: 7.04, y: o.y + 0.14, w: 5.42, h: 0.28, margin: 0,
      fontFace: BODY, fontSize: 13.5, bold: true, color: o.c,
    });
    s.addText(o.b, {
      x: 7.04, y: o.y + 0.44, w: 5.42, h: 0.5, margin: 0,
      fontFace: BODY, fontSize: 11.5, color: TEXT, lineSpacing: 15,
    });
  });

  card(s, { x: M, y: 4.78, w: CW, h: 1.44, fill: INK, flat: true });
  s.addText("The equivalence claim ships with its own strength score", {
    x: M + 0.34, y: 4.96, w: CW - 0.68, h: 0.4, margin: 0,
    fontFace: HEAD, fontSize: 22, bold: true, color: WHITE,
  });
  s.addText(
    "Measured, per rule, not asserted. If our corpus would not have caught a deliberate one-rupee change to a threshold, we do not claim that rule is verified — we say so instead.",
    { x: M + 0.34, y: 5.44, w: CW - 0.68, h: 0.62, margin: 0, fontFace: BODY, fontSize: 13, color: "C3D2DF", lineSpacing: 18 }
  );

  footnote(s, "Mutation testing is a textbook technique. Applying it to the oracle, to certify the adequacy of a migration equivalence claim, is the combination we could not find in any product or paper.");

  s.addNotes(
    "This is the answer to the hardest question we will get: 'everything passed, so what?'\n\n" +
    "Caveat to volunteer if pressed: equivalent mutants — a mutation that genuinely does not change behaviour cannot be " +
    "killed by anyone and inflates the miss rate. With textual operators on numeric constants it is rarer than usual."
  );
}

// ================================================================ 10. OUTPUT
{
  const s = pres.addSlide();
  kicker(s, "WHAT THE TOOL HANDS YOU");
  heading(s, "Three artifacts the bank never had");

  const tiles = [
    { n: "31", l: "rules proven", c: GREEN, f: GREEN_L },
    { n: "11", l: "unproven — named", c: AMBER, f: AMBER_L },
    { n: "5", l: "refuted — our AI was wrong", c: RED, f: RED_L },
    { n: "94%", l: "mutation kill rate", c: INK, f: PANEL },
  ];
  const tw = 2.92, tg = 0.15;
  tiles.forEach((t, i) => {
    const x = M + i * (tw + tg);
    card(s, { x, y: 1.66, w: tw, h: 1.24, fill: t.f, line: t.c === INK ? null : t.c });
    s.addText(t.n, {
      x: x + 0.22, y: 1.74, w: tw - 0.44, h: 0.66, margin: 0,
      fontFace: HEAD, fontSize: 36, bold: true, color: t.c,
    });
    s.addText(t.l, {
      x: x + 0.22, y: 2.42, w: tw - 0.44, h: 0.4, margin: 0,
      fontFace: BODY, fontSize: 11, color: TEXT,
    });
  });

  card(s, { x: M, y: 3.06, w: 6.14, h: 1.62, fill: RED_L, line: RED });
  s.addText("DIVERGENCE — minimised to one case", {
    x: M + 0.26, y: 3.2, w: 5.62, h: 0.26, margin: 0,
    fontFace: BODY, fontSize: 10, bold: true, charSpacing: 1.4, color: RED,
  });
  s.addText("balance ₹1,00,000.00 · 12 days · 3.5%", {
    x: M + 0.26, y: 3.5, w: 5.62, h: 0.26, margin: 0,
    fontFace: MONO, fontSize: 11.5, color: TEXT,
  });
  s.addText("legacy → ₹115        rewrite → ₹116", {
    x: M + 0.26, y: 3.78, w: 5.62, h: 0.28, margin: 0,
    fontFace: MONO, fontSize: 12.5, bold: true, color: RED,
  });
  s.addText("Traced to rule R-07, line 214. The Java uses RoundingMode.HALF_UP; the COBOL truncates at the PIC boundary.", {
    x: M + 0.26, y: 4.1, w: 5.62, h: 0.5, margin: 0,
    fontFace: BODY, fontSize: 11, color: TEXT, lineSpacing: 15,
  });

  card(s, { x: M + 6.32, y: 3.06, w: 6.14, h: 1.62, fill: BLUE_L, line: BLUE });
  s.addText("COMPLIANCE FINDING — needs the third reference", {
    x: M + 6.58, y: 3.2, w: 5.62, h: 0.26, margin: 0,
    fontFace: BODY, fontSize: 10, bold: true, charSpacing: 1.4, color: BLUE,
  });
  s.addText("Legacy and rewrite agree. Both round to two decimals.", {
    x: M + 6.58, y: 3.5, w: 5.62, h: 0.28, margin: 0,
    fontFace: BODY, fontSize: 12, bold: true, color: TEXT,
  });
  s.addText("RBI clause 4(f) requires rounding to the nearest rupee.", {
    x: M + 6.58, y: 3.78, w: 5.62, h: 0.28, margin: 0,
    fontFace: BODY, fontSize: 12, bold: true, color: BLUE,
  });
  s.addText("Not a migration defect. This has been running for forty years, and warrants a compliance review.", {
    x: M + 6.58, y: 4.1, w: 5.62, h: 0.5, margin: 0,
    fontFace: BODY, fontSize: 11, color: TEXT, lineSpacing: 15,
  });

  const arts = [
    { n: "A specification", b: "Readable, traceable documentation for a system that never had any." },
    { n: "A regression suite", b: "Thousands of input–output pairs, retained permanently by the institution." },
    { n: "An equivalence claim", b: "Evidence-backed, with its own strength score — the artifact someone can sign." },
  ];
  arts.forEach((a, i) => {
    const x = M + i * (3.98 + 0.2);
    card(s, { x, y: 4.94, w: 3.98, h: 1.24, fill: PANEL });
    s.addText(a.n, {
      x: x + 0.24, y: 5.08, w: 3.5, h: 0.3, margin: 0,
      fontFace: BODY, fontSize: 13.5, bold: true, color: INK,
    });
    s.addText(a.b, {
      x: x + 0.24, y: 5.4, w: 3.5, h: 0.66, margin: 0,
      fontFace: BODY, fontSize: 11, color: MUTED, lineSpacing: 15,
    });
  });

  footnote(s, "Illustrative figures for a savings-interest accrual program. The first two artifacts hold their value even if the migration is never approved.");

  s.addNotes(
    "Slide order in the live demo: the refuted rule is the moment the room understands the thesis — an AI system catching " +
    "its own AI lying, with a reproducible counterexample. The compliance finding is the moment a banker starts caring."
  );
}

// ================================================================ 11. POSITIONING
{
  const s = pres.addSlide();
  kicker(s, "WHERE THIS SITS");
  heading(s, "What we claim, and what we do not");

  s.addText(
    "We checked. The differential mechanism is prior art in three products and a paper published five days ago. Saying otherwise would not survive one question from this room.",
    { x: M, y: 1.6, w: CW, h: 0.42, margin: 0, fontFace: BODY, fontSize: 13, color: TEXT }
  );

  const yes = (t) => ({ text: t, options: { color: GREEN, bold: true, align: "center", fontSize: 11 } });
  const no  = (t) => ({ text: t, options: { color: MUTED, align: "center", fontSize: 11 } });
  const hdr = (t) => ({ text: t, options: { bold: true, color: WHITE, fill: { color: INK }, fontSize: 10.5, align: "center", valign: "middle" } });
  const row = (t) => ({ text: t, options: { color: TEXT, fontSize: 11, bold: false } });

  const rows = [
    [{ text: "", options: { fill: { color: INK } } }, hdr("IBM\nWCA for Z"), hdr("AWS\nTransform"), hdr("Mechanical\nOrchard"), hdr("Locksmith\narXiv 2607.28271"), hdr("This\nproject")],
    [row("Proves behavioural equivalence"), yes("Yes"), yes("Yes"), yes("Yes"), yes("Yes"), yes("Yes")],
    [row("Runs without a mainframe"), no("No"), no("No"), no("No"), yes("Yes"), yes("Yes")],
    [row("Runs without captured production traffic"), yes("Yes"), no("No"), no("No"), yes("Yes"), yes("Yes")],
    [row("Usable before a migration is funded"), no("No"), no("No"), no("No"), no("Research"), yes("Yes")],
    [row("Verdict per business rule, incl. refuted"), no("No"), no("No"), no("No"), no("No"), yes("Yes")],
    [row("Measures the strength of its own claim"), no("No"), no("No"), no("No"), no("No"), yes("Yes")],
    [{ text: "Checks the legacy against the regulator", options: { color: TEXT, fontSize: 11, bold: true } }, no("No"), no("No"), no("No"), no("No"), yes("Yes")],
  ];

  s.addTable(rows, {
    x: M, y: 2.16, w: CW, colW: [4.33, 1.56, 1.56, 1.56, 1.56, 1.56],
    rowH: [0.46, 0.36, 0.36, 0.36, 0.36, 0.36, 0.36, 0.36],
    border: { type: "solid", color: RULE, pt: 0.5 },
    fill: { color: WHITE }, valign: "middle",
    fontFace: BODY, margin: 5,
  });

  card(s, { x: M, y: 5.42, w: CW, h: 1.26, fill: AMBER_L, line: AMBER });
  s.addText("The honest version of the pitch", {
    x: M + 0.32, y: 5.56, w: 3.2, h: 0.3, margin: 0,
    fontFace: BODY, fontSize: 13, bold: true, color: "7A5410",
  });
  s.addText(
    "The industry converged on behavioural equivalence independently — that is evidence our diagnosis is right, not a problem. Every shipping product needs your mainframe, your production traffic and a commercial engagement first. We need the source file. And we report per rule, including the rules we could not prove and the ones our own AI got wrong.",
    { x: M + 0.32, y: 5.88, w: CW - 0.64, h: 0.72, margin: 0, fontFace: BODY, fontSize: 11.5, color: "7A5410", lineSpacing: 15 }
  );

  s.addNotes(
    "If asked about Locksmith: arXiv 2607.28271, published 30 July 2026, five days before we compiled this. Same spine — " +
    "legacy as oracle, both targets off-mainframe, parity gate, 91.90% branch coverage. We would rather they heard it from " +
    "us. Verified against the paper: no business-rule verdicts, no regulatory checks, and its mutations are " +
    "parity-preserving for path exploration — the opposite of injecting faults to test corpus adequacy."
  );
}

// ================================================================ 12. SCOPE
{
  const s = pres.addSlide();
  kicker(s, "SCOPE AND FEASIBILITY");
  heading(s, "Narrow by design, and buildable now");

  card(s, { x: M, y: 1.7, w: 6.14, h: 2.28, fill: GREEN_L, line: GREEN });
  s.addText("In scope", {
    x: M + 0.28, y: 1.86, w: 5.58, h: 0.3, margin: 0,
    fontFace: BODY, fontSize: 14, bold: true, color: GREEN,
  });
  s.addText(
    [
      { text: "COBOL, compiled and executed via GnuCOBOL — free, open source, runs on a laptop", options: { bullet: true, breakLine: true } },
      { text: "Retail banking interest accrual", options: { bullet: true, breakLine: true } },
      { text: "Pure computation: input in, output out", options: { bullet: true, breakLine: true } },
      { text: "Third-party COBOL — AWS's own CardDemo sample", options: { bullet: true } },
    ],
    { x: M + 0.28, y: 2.24, w: 5.58, h: 1.6, margin: 0, fontFace: BODY, fontSize: 11.5, color: TEXT, paraSpaceAfter: 7, lineSpacing: 15 }
  );

  card(s, { x: M + 6.32, y: 1.7, w: 6.14, h: 2.28, fill: PANEL });
  s.addText("Out of scope — and detected, not ignored", {
    x: M + 6.6, y: 1.86, w: 5.58, h: 0.3, margin: 0,
    fontFace: BODY, fontSize: 14, bold: true, color: MUTED,
  });
  s.addText(
    [
      { text: "CICS screens and JCL orchestration", options: { bullet: true, breakLine: true } },
      { text: "Database-coupled programs", options: { bullet: true, breakLine: true } },
      { text: "Anything non-deterministic — system clocks, randomness, external state", options: { bullet: true } },
    ],
    { x: M + 6.6, y: 2.24, w: 5.58, h: 1.1, margin: 0, fontFace: BODY, fontSize: 11.5, color: TEXT, paraSpaceAfter: 7, lineSpacing: 15 }
  );
  s.addText(
    "Differential testing compares outputs for equality, so non-determinism makes the verdict meaningless. The tool refuses these at intake, with a reason — it tells you when it cannot help you.",
    { x: M + 6.6, y: 3.34, w: 5.58, h: 0.54, margin: 0, fontFace: BODY, fontSize: 11, italic: true, color: MUTED, lineSpacing: 15 }
  );

  s.addText("Build stages — the spine first, the novelty protected", {
    x: M, y: 4.22, w: CW, h: 0.34, margin: 0,
    fontFace: HEAD, fontSize: 18, bold: true, color: TEXT,
  });

  const stages = [
    { n: "01", t: "Differential harness", b: "GnuCOBOL compiles and runs; diff two implementations across an input list.", c: GREEN },
    { n: "02", t: "Rules and boundaries", b: "Slice, extract with line citations, derive boundary inputs from the rules.", c: BLUE },
    { n: "03", t: "Three-valued verdict", b: "Coverage mapped to rules; proven, unproven, refuted. Protected.", c: AMBER },
    { n: "04", t: "Regulation and mutation", b: "The RBI reference model, then fault injection to score the corpus.", c: RED },
  ];
  const gw = 2.92, gg = 0.15;
  stages.forEach((st, i) => {
    const x = M + i * (gw + gg);
    card(s, { x, y: 4.66, w: gw, h: 1.6 });
    badge(s, { x: x + 0.22, y: 4.82, d: 0.42, txt: st.n, fill: st.c, size: 11 });
    s.addText(st.t, {
      x: x + 0.74, y: 4.84, w: gw - 0.96, h: 0.34, margin: 0,
      fontFace: BODY, fontSize: 12.5, bold: true, color: TEXT,
    });
    s.addText(st.b, {
      x: x + 0.22, y: 5.34, w: gw - 0.44, h: 0.8, margin: 0,
      fontFace: BODY, fontSize: 10.5, color: MUTED, lineSpacing: 14,
    });
  });

  footnote(s, "GnuCOBOL passes 9,700 of 9,748 NIST COBOL-85 conformance tests, though the project does not claim to be a Standard Conforming implementation. The methodology is compiler-agnostic — a bank points it at its own compiler.");

  s.addNotes(
    "Known limitation to volunteer: input generation quality caps everything. We can only verify rules we reach — which is " +
    "exactly why stage 04's mutation scoring exists.\n\n" +
    "On CardDemo: CBACT04C.cbl is an interest calculator but reads four VSAM files and calls FUNCTION CURRENT-DATE, so our " +
    "own intake gate refuses it. We use that as the refusal demo and lift the arithmetic into a pure unit for verification."
  );
}

// ================================================================ 13. CLOSE
{
  const s = pres.addSlide();
  s.background = { color: INK };

  s.addText("THE CLAIM", {
    x: M, y: 1.5, w: CW, h: 0.3, margin: 0,
    fontFace: BODY, fontSize: 11, bold: true, charSpacing: 2.6, color: "8FA7BD",
  });

  s.addText(
    "Everyone proves the rewrite matches the legacy.\nWe also ask whether the legacy matches the regulator —\nand we report the answer per business rule.",
    { x: M, y: 2.0, w: 11.4, h: 2.0, margin: 0, fontFace: HEAD, fontSize: 30, bold: true, color: WHITE, lineSpacing: 46 }
  );

  s.addText(
    "Including the rules we could not prove, and the ones our own AI got wrong.",
    { x: M, y: 4.06, w: 11.4, h: 0.4, margin: 0, fontFace: BODY, fontSize: 17, italic: true, color: AMBER }
  );

  const ends = [
    { h: "Proven", b: "confirmed by execution, with the boundary shown to be live" },
    { h: "Unproven", b: "never exercised, named rather than silently trusted" },
    { h: "Refuted", b: "contradicted by evidence — with the input that proves it" },
  ];
  ends.forEach((e, i) => {
    const x = M + i * (3.98 + 0.2);
    s.addShape(pres.ShapeType.roundRect, {
      x, y: 4.86, w: 3.98, h: 1.06, rectRadius: 0.06,
      fill: { color: INK_2 }, line: { color: INK_2, width: 0 },
    });
    s.addText(e.h, {
      x: x + 0.26, y: 4.98, w: 3.46, h: 0.3, margin: 0,
      fontFace: BODY, fontSize: 14, bold: true, color: AMBER,
    });
    s.addText(e.b, {
      x: x + 0.26, y: 5.3, w: 3.46, h: 0.52, margin: 0,
      fontFace: BODY, fontSize: 11, color: "AEC0D0", lineSpacing: 14,
    });
  });

  s.addText("Team StudyEdge  ·  OUTR, Bhubaneswar  ·  Digital Nurture Hackathon 2026", {
    x: M, y: 6.34, w: CW, h: 0.3, margin: 0,
    fontFace: BODY, fontSize: 11, color: "6E869C",
  });

  s.addNotes(
    "Close on the coverage table, not on a promise. The line that lands is: 'these eleven, we could not prove — and we are " +
    "telling you which ones.'\n\n" +
    "Do not use the old closing line ('everyone else assumes their AI is right'). It is true of the other teams in the room " +
    "and false of the market, and a Cognizant judge who works in mainframe modernisation will know it."
  );
}

pres.writeFile({ fileName: "Legacy_Banking_Modernisation_Platform.pptx" })
  .then((f) => console.log("wrote", f));
