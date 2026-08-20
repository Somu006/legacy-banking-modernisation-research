const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE";
pres.author = "Team StudyEdge";
pres.company = "Odisha University of Technology and Research";
pres.title = "Legacy Banking Modernisation Platform";

// ------------------------------------------------------------------ palette
// Six values. One block fill, one dark, one accent used as TEXT ONLY.
const INK    = "0E2033";  // cover background, takeaway band, headings
const TEXT   = "16212E";
const MUTED  = "6B7785";
const PANEL  = "EDF1F5";  // the only block fill on white
const HAIR   = "D5DCE3";  // the only line/arrow colour
const ACCENT = "B07A16";  // amber — never a fill, never a border
const WHITE  = "FFFFFF";
const ON_DARK = "C3D2DF";

const HEAD = "Cambria";
const BODY = "Calibri";
const MONO = "Consolas";

const W = 13.333, M = 0.62, CW = W - M * 2;
const H_SIZE = 31;        // one heading size, every slide
const RAD = 0.06;         // one corner radius, every block

// ------------------------------------------------------------------ helpers
function kicker(s, txt) {
  s.addText(txt, { x: M, y: 0.4, w: CW, h: 0.26, margin: 0,
    fontFace: BODY, fontSize: 10.5, bold: true, charSpacing: 2.6, color: MUTED });
}
function heading(s, txt) {
  s.addText(txt, { x: M, y: 0.7, w: CW, h: 0.7, margin: 0,
    fontFace: HEAD, fontSize: H_SIZE, bold: true, color: TEXT, valign: "top" });
}
// Every block on a white slide is this. No borders, no shadows, no variants.
function block(s, x, y, w, h) {
  s.addShape(pres.ShapeType.roundRect, { x, y, w, h, rectRadius: RAD,
    fill: { color: PANEL }, line: { color: PANEL, width: 0 } });
}
// The one dark element used on content slides: the takeaway band.
function band(s, y, h) {
  s.addShape(pres.ShapeType.roundRect, { x: M, y, w: CW, h, rectRadius: RAD,
    fill: { color: INK }, line: { color: INK, width: 0 } });
}
function boxText(s, o) {
  if (o.t) s.addText(o.t, { x: o.x, y: o.y + (o.tOff || 0.16), w: o.w, h: 0.34, margin: 0,
    fontFace: HEAD, fontSize: o.ts || 16, bold: true, color: o.tc || TEXT, align: "center" });
  if (o.b) s.addText(o.b, { x: o.x + 0.12, y: o.y + (o.bOff || 0.56), w: o.w - 0.24, h: o.bh || 0.5, margin: 0,
    fontFace: BODY, fontSize: o.bs || 10.5, color: MUTED, align: "center", lineSpacing: 14 });
}
function arrowR(s, x, y, w) {
  s.addShape(pres.ShapeType.rightArrow, { x, y, w, h: 0.26,
    fill: { color: HAIR }, line: { color: HAIR, width: 0 } });
}
function arrowD(s, x, y, h) {
  s.addShape(pres.ShapeType.downArrow, { x, y, w: 0.26, h,
    fill: { color: HAIR }, line: { color: HAIR, width: 0 } });
}
function line(s, x, y, w, h) {
  s.addShape(pres.ShapeType.line, { x, y, w, h, line: { color: HAIR, width: 1.5 } });
}
function footnote(s, txt) {
  s.addText(txt, { x: M, y: 6.92, w: CW, h: 0.32, margin: 0,
    fontFace: BODY, fontSize: 9.5, italic: true, color: MUTED, lineSpacing: 12 });
}

// ================================================================== 1 · COVER
{
  const s = pres.addSlide();
  s.background = { color: INK };

  s.addText("DIGITAL NURTURE HACKATHON 2026   ·   BANKING AND FINANCE TECHNOLOGY", {
    x: M, y: 0.62, w: CW, h: 0.3, margin: 0,
    fontFace: BODY, fontSize: 11, bold: true, charSpacing: 2.4, color: MUTED });

  s.addText("Legacy Banking", { x: M, y: 1.72, w: 9.4, h: 0.92, margin: 0,
    fontFace: HEAD, fontSize: 48, bold: true, color: WHITE });
  s.addText("Modernisation Platform", { x: M, y: 2.59, w: 9.4, h: 0.92, margin: 0,
    fontFace: HEAD, fontSize: 48, bold: true, color: WHITE });

  s.addText("Proving the rewrite behaves exactly like the original", {
    x: M, y: 3.64, w: 9.4, h: 0.42, margin: 0,
    fontFace: BODY, fontSize: 19, italic: true, color: ACCENT });

  s.addText(
    "Legacy migration fails on verification, not translation. We make behavioural equivalence something a bank can prove, then check that answer against the regulator.",
    { x: M, y: 4.24, w: 9.0, h: 0.72, margin: 0, fontFace: BODY, fontSize: 13.5, color: ON_DARK, lineSpacing: 21 });

  line(s, M, 5.42, 4.2, 0);
  s.addText("Team StudyEdge", { x: M, y: 5.58, w: 6.2, h: 0.32, margin: 0,
    fontFace: BODY, fontSize: 16, bold: true, color: WHITE });
  s.addText("Odisha University of Technology and Research, Bhubaneswar", {
    x: M, y: 5.92, w: 6.6, h: 0.28, margin: 0, fontFace: BODY, fontSize: 11.5, color: ON_DARK });
  s.addText("Tamanna Panda  ·  Swayam Subhankar Sahoo  ·  Adyasha Das  ·  Soumyajit Sarkar", {
    x: M, y: 6.24, w: 8.6, h: 0.28, margin: 0, fontFace: BODY, fontSize: 11, color: ON_DARK });

  s.addText("THREE REFERENCES, NOT TWO", {
    x: 10.28, y: 1.86, w: 2.44, h: 0.26, margin: 0,
    fontFace: BODY, fontSize: 9, bold: true, charSpacing: 1.4, color: ACCENT });
  line(s, 10.28, 2.2, 2.44, 0);
  ["Legacy COBOL", "Reimplementation", "RBI Master Direction"].forEach((t, i) => {
    s.addText(t, { x: 10.28, y: 2.36 + i * 0.44, w: 2.44, h: 0.3, margin: 0,
      fontFace: BODY, fontSize: 12.5, color: i === 2 ? ACCENT : WHITE });
  });
  s.addText("Same input. Three outputs. Every difference explained.", {
    x: 10.28, y: 3.8, w: 2.44, h: 0.6, margin: 0,
    fontFace: BODY, fontSize: 10, italic: true, color: ON_DARK, lineSpacing: 14 });

  s.addNotes(
    "One line: everyone proves the rewrite matches the legacy; we also ask whether the legacy matches the regulator.\n\n" +
    "Scope: COBOL interest-accrual programs executed via GnuCOBOL. Whole-system migration is out of scope."
  );
}

// ================================================================ 2 · PROBLEM
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
    block(s, x, 1.62, cw, 1.8);
    s.addText(st.n, { x: x + 0.22, y: 1.72, w: cw - 0.44, h: 0.7, margin: 0,
      fontFace: HEAD, fontSize: 40, bold: true, color: INK });
    s.addText(st.u, { x: x + 0.22, y: 2.42, w: cw - 0.44, h: 0.26, margin: 0,
      fontFace: BODY, fontSize: 11.5, bold: true, color: ACCENT });
    s.addText(st.l, { x: x + 0.22, y: 2.7, w: cw - 0.44, h: 0.62, margin: 0,
      fontFace: BODY, fontSize: 11, color: MUTED, lineSpacing: 15 });
  });

  s.addText("When a bank guesses wrong, it is a supervisory event, not a bug report", {
    x: M, y: 3.62, w: CW, h: 0.34, margin: 0, fontFace: HEAD, fontSize: 18, bold: true, color: TEXT });

  [
    { h: "TSB, United Kingdom — 2018",
      b: "A core migration failed at cutover. The FCA and PRA fined TSB £48.65m for operational risk and governance failings, and £32.7m went in customer redress. Business as usual took eight months to return." },
    { h: "HDFC Bank, India — 2020",
      b: "After repeated outages the RBI halted every Digital 2.0 launch and froze new credit-card issuance. The card freeze lifted only in August 2021; the digital freeze ran into 2022." },
  ].forEach((c, i) => {
    const x = M + i * (6.14 + 0.18);
    block(s, x, 4.04, 6.14, 1.62);
    s.addText(c.h, { x: x + 0.26, y: 4.2, w: 5.62, h: 0.3, margin: 0,
      fontFace: BODY, fontSize: 13.5, bold: true, color: INK });
    s.addText(c.b, { x: x + 0.26, y: 4.52, w: 5.62, h: 1.04, margin: 0,
      fontFace: BODY, fontSize: 11.5, color: TEXT, lineSpacing: 16 });
  });

  s.addText(
    "A one-paisa divergence across millions of accounts is a reportable regulatory event. Refusing to touch the system is the correct decision under the bank's own risk framework, and that is why the backlog is measured in decades.",
    { x: M, y: 5.86, w: CW, h: 0.6, margin: 0, fontFace: BODY, fontSize: 13, italic: true, color: INK, lineSpacing: 18 });

  footnote(s, "Sources: FCA press release, Dec 2022 · BCG, Cloud-based Core Transformations, Aug 2024 · RBI supervisory action, Dec 2020.");

  s.addNotes(
    "The 1.9 million customer figure often quoted for TSB is press reporting, not the FCA. The regulator says 'a significant " +
    "proportion of its 5.2 million customers', which is why the slide does not use it.\n\n" +
    "HDFC is the example that lands with an Indian panel: an IT failure froze the bank's product roadmap for over a year."
  );
}

// ============================================================= 3 · BOTTLENECK
{
  const s = pres.addSlide();
  kicker(s, "THE MISDIAGNOSIS");
  heading(s, "Translation is solved. Proof is not.");

  const yB = 1.86, hB = 1.2;

  block(s, M, yB, 2.5, hB);
  boxText(s, { x: M, y: yB, w: 2.5, t: "COBOL source", b: "4,000 lines · 1987\n~200 undocumented edits", bh: 0.56 });

  arrowR(s, 3.26, yB + 0.47, 0.34);

  block(s, 3.72, yB, 2.7, hB);
  boxText(s, { x: 3.72, y: yB, w: 2.7, t: "Translate", tc: ACCENT,
    b: "transpilers · LLMs\nAWS · IBM · TCS ship this", bh: 0.56 });

  arrowR(s, 6.6, yB + 0.47, 0.34);

  block(s, 7.06, yB, 2.5, hB);
  boxText(s, { x: 7.06, y: yB, w: 2.5, t: "Modern Java", b: "compiles · passes the\ntests you wrote", bh: 0.56 });

  s.addShape(pres.ShapeType.rect, { x: 9.86, y: yB - 0.22, w: 0.34, h: hB + 0.44,
    fill: { color: INK }, line: { color: INK, width: 0 } });
  s.addText("VERIFICATION", { x: 8.72, y: yB + hB + 0.28, w: 2.62, h: 0.26, margin: 0,
    fontFace: BODY, fontSize: 10, bold: true, charSpacing: 1.4, color: INK, align: "center" });

  block(s, 10.5, yB, 2.21, hB);
  boxText(s, { x: 10.5, y: yB, w: 2.21, t: "Production", tc: MUTED, b: "never reached" });

  block(s, M, 3.72, CW, 1.06);
  s.addText("Can anyone prove the new program behaves identically to the old one?", {
    x: M + 0.32, y: 3.88, w: CW - 0.64, h: 0.34, margin: 0,
    fontFace: HEAD, fontSize: 20, bold: true, color: INK });
  s.addText(
    "No specification was ever written. The rules live only inside the code, and the engineers who put them there have retired. The tolerance for difference is zero.",
    { x: M + 0.32, y: 4.26, w: CW - 0.64, h: 0.42, margin: 0, fontFace: BODY, fontSize: 12.5, color: TEXT });

  band(s, 5.08, 1.5);
  s.addText('"the resulting code cannot be trusted to correctly translate the original code"', {
    x: M + 0.34, y: 5.28, w: CW - 0.68, h: 0.4, margin: 0,
    fontFace: HEAD, fontSize: 19, bold: true, italic: true, color: WHITE });
  s.addText(
    "IBM Research, on the testing framework for IBM's own watsonx Code Assistant for Z (arXiv:2504.10548). If the vendor cannot trust its own output without validation, no bank can.",
    { x: M + 0.34, y: 5.78, w: CW - 0.68, h: 0.62, margin: 0, fontFace: BODY, fontSize: 12.5, color: ON_DARK, lineSpacing: 17 });

  footnote(s, "Quoted verbatim from the paper's abstract. The point is that validation is necessary, which is our point too.");

  s.addNotes(
    "The quote is verbatim from the paper's abstract, checked word for word. Do not paraphrase it as 'IBM says its product " +
    "does not work'.\n\nBe generous to the incumbents here. Claiming to have invented differential verification would lose " +
    "a Cognizant mainframe judge in one sentence."
  );
}

// ======================================================== 4 · EXTRACTION FAILS
{
  const s = pres.addSlide();
  kicker(s, "WHY THE OBVIOUS APPROACH FAILS");
  heading(s, "Pointing an AI at the COBOL is not enough");

  s.addText(
    "The intuitive move is to ask a language model to explain the business rules. The output looks excellent, clean and confident and well organised. And a meaningful share of it is wrong.",
    { x: M, y: 1.6, w: CW, h: 0.58, margin: 0, fontFace: BODY, fontSize: 14, color: TEXT, lineSpacing: 20 });

  const bigs = [
    { n: "62%", l: "precision of the best published\nCOBOL rule extractor", sub: "A-COBREX, ICSE 2025", key: false },
    { n: "91.2%", l: "of business rules successfully\nextracted by a 2026 system", sub: "AgentModernize, arXiv 2605.17535", key: false },
    { n: "<20%", l: "behavioural equivalence reached\nby that same system", sub: "baselines scored 0.0%", key: true },
  ];
  const bw = 3.98, bg = 0.2;
  bigs.forEach((b, i) => {
    const x = M + i * (bw + bg);
    block(s, x, 2.32, bw, 2.0);
    s.addText(b.n, { x: x + 0.26, y: 2.44, w: bw - 0.52, h: 0.8, margin: 0,
      fontFace: HEAD, fontSize: 44, bold: true, color: b.key ? ACCENT : INK });
    s.addText(b.l, { x: x + 0.26, y: 3.26, w: bw - 0.52, h: 0.58, margin: 0,
      fontFace: BODY, fontSize: 12, color: TEXT, lineSpacing: 16 });
    s.addText(b.sub, { x: x + 0.26, y: 3.88, w: bw - 0.52, h: 0.28, margin: 0,
      fontFace: BODY, fontSize: 10, italic: true, color: MUTED });
  });

  arrowR(s, 8.5, 3.2, 0.4);

  band(s, 4.6, 1.92);
  s.addText("Extraction works. Behavioural equivalence does not follow from it.", {
    x: M + 0.34, y: 4.8, w: CW - 0.68, h: 0.42, margin: 0,
    fontFace: HEAD, fontSize: 23, bold: true, color: WHITE });
  s.addText(
    "A confidently stated wrong rule is more dangerous than no rule at all, because an engineer will build on it. Measured hallucination rates in code explanation run as high as 66%.",
    { x: M + 0.34, y: 5.3, w: CW - 0.68, h: 0.5, margin: 0, fontFace: BODY, fontSize: 13, color: ON_DARK, lineSpacing: 18 });
  s.addText("So extraction cannot be the product. Verification has to be the product.", {
    x: M + 0.34, y: 5.9, w: CW - 0.68, h: 0.38, margin: 0,
    fontFace: BODY, fontSize: 14, bold: true, color: ACCENT });

  footnote(s, "Sources: A-COBREX, ICSE 2025 · AgentModernize, arXiv 2605.17535 · Hallucinations in LLM-Based Code Summarization, PACMSE 2026.");

  s.addNotes(
    "The 91.2% against sub-20% pair is the sharpest argument in the deck and it comes from someone else's paper. " +
    "AgentModernize captured 91.2% of gold-standard rules but its Behavioural Equivalence Rate was 9.4%, 8.1% and 19.4% " +
    "across three models, with baselines at 0.0%."
  );
}

// =========================================================== 5 · ARCHITECTURE
{
  const s = pres.addSlide();
  kicker(s, "THE SYSTEM");
  heading(s, "A deterministic pipeline, with the AI on a short leash");

  const yA = 1.62, hA = 0.86, wA = 2.7;
  const xs = [M, 3.68, 6.74, 9.8];

  block(s, xs[0], yA, wA, hA);
  boxText(s, { x: xs[0], y: yA, w: wA, t: "COBOL source", ts: 14, tOff: 0.28 });

  arrowR(s, 3.36, yA + 0.3, 0.26);

  block(s, xs[1], yA, wA, hA);
  boxText(s, { x: xs[1], y: yA, w: wA, t: "0 · Intake gate", ts: 13.5, tOff: 0.12,
    b: "clock / DB / CICS detected?", bOff: 0.46, bs: 10 });

  arrowR(s, 6.42, yA + 0.3, 0.26);

  block(s, xs[2], yA, wA, hA);
  boxText(s, { x: xs[2], y: yA, w: wA, t: "1 · Parse & slice", ts: 13.5, tOff: 0.12,
    b: "ProLeap AST → rule slices", bOff: 0.46, bs: 10 });

  arrowR(s, 9.48, yA + 0.3, 0.26);

  block(s, xs[3], yA, wA, hA);
  boxText(s, { x: xs[3], y: yA, w: wA, t: "2 · Extract rules", ts: 13.5, tOff: 0.12, tc: ACCENT,
    b: "+ line citations from the slice", bOff: 0.46, bs: 10 });

  line(s, xs[1] + wA / 2, yA + hA, 0, 0.36);
  s.addText("REFUSED — non-deterministic, cannot be verified soundly", {
    x: 1.9, y: yA + hA + 0.34, w: 4.3, h: 0.26, margin: 0,
    fontFace: BODY, fontSize: 10, bold: true, color: MUTED, align: "center" });

  const yBb = 3.04;
  line(s, xs[3] + wA / 2, yA + hA, 0, 0.3);
  line(s, 7.15, 2.78, 4.0, 0);
  arrowD(s, 7.02, 2.78, 0.26);

  block(s, M, yBb, CW, 0.82);
  s.addText("3 · Rule-directed input generation", {
    x: M + 0.3, y: yBb + 0.1, w: 4.2, h: 0.3, margin: 0,
    fontFace: BODY, fontSize: 13.5, bold: true, color: INK });
  s.addText("the extracted rules say where the boundaries are", {
    x: M + 0.3, y: yBb + 0.42, w: 4.4, h: 0.28, margin: 0,
    fontFace: BODY, fontSize: 10.5, italic: true, color: MUTED });
  s.addText(
    "₹99,999 / ₹1,00,000 / ₹1,00,001   ·   ₹0.50 rounding midpoints\n29 February  ·  month and quarter ends  ·  zero and maximum values",
    { x: 5.5, y: yBb + 0.14, w: 7.0, h: 0.56, margin: 0,
      fontFace: MONO, fontSize: 10, color: TEXT, lineSpacing: 15 });

  const yC = 4.28;
  arrowD(s, 6.6, yBb + 0.82, 0.26);

  block(s, M, yC, CW, 1.12);
  s.addText("4 · Execute and compare, three ways", {
    x: M + 0.3, y: yC + 0.14, w: 4.6, h: 0.3, margin: 0,
    fontFace: BODY, fontSize: 13.5, bold: true, color: INK });
  s.addText("same input, three outputs", {
    x: M + 0.3, y: yC + 0.46, w: 4.6, h: 0.28, margin: 0,
    fontFace: BODY, fontSize: 10.5, italic: true, color: MUTED });

  [
    { t: "Legacy COBOL", s2: "GnuCOBOL, the oracle", key: false },
    { t: "Reimplementation", s2: "generated Java, untrusted", key: false },
    { t: "RBI Direction", s2: "the third reference", key: true },
  ].forEach((c, i) => {
    const x = 5.2 + i * 2.52;
    s.addShape(pres.ShapeType.roundRect, { x, y: yC + 0.2, w: 2.36, h: 0.72, rectRadius: 0.05,
      fill: { color: WHITE }, line: { color: WHITE, width: 0 } });
    s.addText(c.t, { x, y: yC + 0.28, w: 2.36, h: 0.26, margin: 0,
      fontFace: BODY, fontSize: 11.5, bold: true, color: c.key ? ACCENT : INK, align: "center" });
    s.addText(c.s2, { x, y: yC + 0.54, w: 2.36, h: 0.24, margin: 0,
      fontFace: BODY, fontSize: 9.5, color: MUTED, align: "center" });
  });

  const yD = 5.9;
  arrowD(s, 6.6, yC + 1.12, 0.24);

  const outs = [
    { t: "Rule coverage", b: "which rules the tests reached" },
    { t: "Mutation score", b: "how strong is this claim?" },
    { t: "Compliance findings", b: "legacy against the regulator" },
    { t: "Evidence bundle", b: "spec · tests · signed claim" },
  ];
  const ow = 2.92, og = 0.15;
  outs.forEach((o, i) => {
    const x = M + i * (ow + og);
    block(s, x, yD, ow, 0.78);
    s.addText(o.t, { x: x + 0.16, y: yD + 0.1, w: ow - 0.32, h: 0.28, margin: 0,
      fontFace: BODY, fontSize: 12.5, bold: true, color: INK, align: "center" });
    s.addText(o.b, { x: x + 0.16, y: yD + 0.38, w: ow - 0.32, h: 0.28, margin: 0,
      fontFace: BODY, fontSize: 10, color: MUTED, align: "center" });
  });

  footnote(s, "Titles in amber are the two bounded LLM calls; everything else is deterministic. Deterministic orchestration matches agentic accuracy at up to 3.5× lower token cost (arXiv 2605.09894).");

  s.addNotes(
    "The line from Extract rules back into input generation is the reciprocal loop: extracted rules feed the generator, and " +
    "the differential run then catches the extraction layer stating rules that are wrong.\n\n" +
    "The intake gate matters: the tool refuses programs it cannot verify soundly, with a reason, rather than producing a " +
    "confident wrong answer."
  );
}

// ================================================== 6 · THREE-WAY CONFORMANCE
{
  const s = pres.addSlide();
  kicker(s, "WHAT NOBODY ELSE DOES  ·  01");
  heading(s, "We check the legacy against the regulator");

  s.addText(
    'Every tool on the market compares two things and treats the legacy as correct by definition. But "the legacy is its own oracle" is true for equivalence and false for correctness: a program written in 1987 can breach a Direction issued decades later.',
    { x: M, y: 1.56, w: CW, h: 0.62, margin: 0, fontFace: BODY, fontSize: 13, color: TEXT, lineSpacing: 18 });

  const yS = 2.36, hS = 0.76, wS = 3.6;
  [
    { t: "Legacy COBOL", b: "what the bank does today", key: false },
    { t: "Reimplementation", b: "generated Java, untrusted", key: false },
    { t: "RBI Master Direction", b: "daily product · nearest rupee · ₹1 lakh", key: true },
  ].forEach((o, i) => {
    const x = M + i * (wS + 0.44);
    block(s, x, yS, wS, hS);
    s.addText(o.t, { x, y: yS + 0.1, w: wS, h: 0.28, margin: 0,
      fontFace: BODY, fontSize: 13, bold: true, color: o.key ? ACCENT : INK, align: "center" });
    s.addText(o.b, { x: x + 0.1, y: yS + 0.4, w: wS - 0.2, h: 0.26, margin: 0,
      fontFace: BODY, fontSize: 10, color: MUTED, align: "center" });
    if (o.key) s.addText("OUR ADDITION", { x, y: yS - 0.28, w: wS, h: 0.24, margin: 0,
      fontFace: BODY, fontSize: 9, bold: true, charSpacing: 1.2, color: ACCENT, align: "center" });
  });

  line(s, M + wS / 2, yS + hS, 0, 0.28);
  line(s, M + wS + 0.44 + wS / 2, yS + hS, 0, 0.28);
  line(s, M + 2 * (wS + 0.44) + wS / 2, yS + hS, 0, 0.28);
  line(s, M + wS / 2, yS + hS + 0.28, 10.32, 0);
  arrowD(s, 6.54, yS + hS + 0.28, 0.24);

  block(s, 4.9, 3.72, 3.55, 0.44);
  s.addText("Same input, three outputs", { x: 4.9, y: 3.72, w: 3.55, h: 0.44, margin: 0,
    fontFace: BODY, fontSize: 13, bold: true, color: INK, align: "center", valign: "middle" });

  line(s, 6.67, 4.16, 0, 0.2);
  line(s, 2.08, 4.36, 9.18, 0);

  const cells = [
    { f: "L = R = Reg", h: "Verified compliant", b: "Nothing to do. What a sign-off is actually made of.", key: false },
    { f: "L ≠ R", h: "Translation defect", b: "The rewrite is wrong. The only cell a two-way tool sees.", key: false },
    { f: "L = R ≠ Reg", h: "Inherited breach", b: "Both agree, and both breach. Invisible to everyone else.", key: true },
    { f: "L ≠ R = Reg", h: "Silent correction", b: 'The rewrite "fixed" it. The books change at cutover.', key: false },
  ];
  const cwv = 2.92, cg = 0.15;
  cells.forEach((c, i) => {
    const x = M + i * (cwv + cg);
    line(s, x + cwv / 2, 4.36, 0, 0.2);
    arrowD(s, x + cwv / 2 - 0.13, 4.44, 0.2);
    block(s, x, 4.72, cwv, 1.6);
    s.addText(c.f, { x: x + 0.14, y: 4.84, w: cwv - 0.28, h: 0.26, margin: 0,
      fontFace: MONO, fontSize: 11.5, bold: true, color: c.key ? ACCENT : MUTED, align: "center" });
    s.addText(c.h, { x: x + 0.14, y: 5.14, w: cwv - 0.28, h: 0.3, margin: 0,
      fontFace: HEAD, fontSize: 15, bold: true, color: c.key ? ACCENT : INK, align: "center" });
    s.addText(c.b, { x: x + 0.16, y: 5.5, w: cwv - 0.32, h: 0.74, margin: 0,
      fontFace: BODY, fontSize: 10.5, color: MUTED, align: "center", lineSpacing: 14 });
  });

  footnote(s, "RBI Master Direction (Interest Rate on Deposits), 2016 — clause 6(a) daily product basis · 6(a)(1)–(2) uniform rate to ₹1 lakh, differential above · 4(f) rounded to the nearest rupee.");

  s.addNotes(
    "The strongest claim in the deck, and it survived a deliberate falsification pass. Verified: Locksmith (arXiv 2607.28271) " +
    "has no regulatory checks; AgentModernize has none; EvolveWare markets rule extraction for auditors but is static " +
    "documentation with no execution.\n\n" +
    "Likely reason nobody built it: a migration product that tells you your current system is non-compliant is selling a " +
    "problem its customer did not ask about.\n\n" +
    "Wording discipline: say 'warrants a compliance review', never 'this is a breach'."
  );
}

// ======================================================= 7 · TESTING THE TESTS
{
  const s = pres.addSlide();
  kicker(s, "WHAT NOBODY ELSE DOES  ·  02 AND 03");
  heading(s, "We test the rules, then we test the tests");

  s.addText("When has a business rule actually been tested?", {
    x: M, y: 1.56, w: 7.4, h: 0.3, margin: 0, fontFace: BODY, fontSize: 13.5, bold: true, color: INK });
  s.addText("Executing a line is not testing the rule it encodes. Three checks, not one.", {
    x: M, y: 1.86, w: 7.4, h: 0.28, margin: 0, fontFace: BODY, fontSize: 11.5, color: MUTED });

  const gates = [
    { n: "1", t: "Reached", b: "did any input execute this rule's lines?", out: "if not: never exercised", key: false },
    { n: "2", t: "Discriminating", b: "did both sides of the boundary give different legacy outputs?", out: "if not: the rule is not in the program", key: true },
    { n: "3", t: "Agreed", b: "did the rewrite match the legacy every time?", out: "if not: a reproducible divergence", key: false },
  ];
  gates.forEach((g, i) => {
    const y = 2.26 + i * 1.06;
    block(s, M, y, 5.5, 0.86);
    s.addShape(pres.ShapeType.ellipse, { x: M + 0.2, y: y + 0.22, w: 0.42, h: 0.42,
      fill: { color: g.key ? ACCENT : MUTED }, line: { color: g.key ? ACCENT : MUTED, width: 0 } });
    s.addText(g.n, { x: M + 0.2, y: y + 0.22, w: 0.42, h: 0.42, margin: 0,
      fontFace: BODY, fontSize: 12, bold: true, color: WHITE, align: "center", valign: "middle" });
    s.addText(g.t, { x: M + 0.76, y: y + 0.12, w: 2.4, h: 0.28, margin: 0,
      fontFace: HEAD, fontSize: 15, bold: true, color: g.key ? ACCENT : INK });
    s.addText(g.b, { x: M + 0.76, y: y + 0.4, w: 4.5, h: 0.4, margin: 0,
      fontFace: BODY, fontSize: 10.5, color: MUTED, lineSpacing: 13 });

    arrowR(s, 6.22, y + 0.3, 0.3);
    s.addText(g.out, { x: 6.6, y: y + 0.22, w: 2.3, h: 0.44, margin: 0,
      fontFace: BODY, fontSize: 10.5, italic: true, color: MUTED, valign: "middle" });

    if (i < 2) arrowD(s, M + 2.62, y + 0.86, 0.2);
  });

  arrowD(s, M + 2.62, 5.34, 0.2);
  block(s, M, 5.6, 5.5, 0.56);
  s.addText("All three hold: the rule is confirmed by execution", { x: M, y: 5.6, w: 5.5, h: 0.56, margin: 0,
    fontFace: HEAD, fontSize: 14.5, bold: true, color: INK, align: "center", valign: "middle" });

  s.addText("How strong is that claim?", {
    x: 9.3, y: 1.56, w: 3.42, h: 0.3, margin: 0, fontFace: BODY, fontSize: 13.5, bold: true, color: INK });
  s.addText("We break the legacy on purpose and see if our inputs notice.", {
    x: 9.3, y: 1.86, w: 3.42, h: 0.3, margin: 0, fontFace: BODY, fontSize: 11.5, color: MUTED, lineSpacing: 14 });

  block(s, 9.3, 2.26, 3.42, 0.62);
  s.addText("Legacy COBOL, the oracle", { x: 9.3, y: 2.26, w: 3.42, h: 0.62, margin: 0,
    fontFace: BODY, fontSize: 12, bold: true, color: INK, align: "center", valign: "middle" });
  arrowD(s, 10.88, 2.94, 0.22);

  block(s, 9.3, 3.22, 3.42, 0.92);
  s.addText("Inject a deliberate defect", { x: 9.3, y: 3.3, w: 3.42, h: 0.26, margin: 0,
    fontFace: BODY, fontSize: 12, bold: true, color: ACCENT, align: "center" });
  s.addText("100000 → 100001   ·   > → >=\ndelete ROUNDED   ·   360 → 365", {
    x: 9.4, y: 3.58, w: 3.22, h: 0.48, margin: 0,
    fontFace: MONO, fontSize: 9.5, color: TEXT, align: "center", lineSpacing: 14 });
  arrowD(s, 10.88, 4.2, 0.22);

  block(s, 9.3, 4.48, 3.42, 0.62);
  s.addText("Re-run the same input corpus", { x: 9.3, y: 4.48, w: 3.42, h: 0.62, margin: 0,
    fontFace: BODY, fontSize: 12, bold: true, color: INK, align: "center", valign: "middle" });

  line(s, 10.05, 5.1, 0, 0.18);
  line(s, 11.95, 5.1, 0, 0.18);
  line(s, 10.05, 5.1, 1.9, 0);

  block(s, 9.3, 5.34, 1.62, 0.82);
  s.addText("Caught", { x: 9.3, y: 5.42, w: 1.62, h: 0.26, margin: 0,
    fontFace: BODY, fontSize: 11.5, bold: true, color: INK, align: "center" });
  s.addText("the claim\nstands", { x: 9.3, y: 5.68, w: 1.62, h: 0.42, margin: 0,
    fontFace: BODY, fontSize: 10, color: MUTED, align: "center", lineSpacing: 13 });

  block(s, 11.1, 5.34, 1.62, 0.82);
  s.addText("Missed", { x: 11.1, y: 5.42, w: 1.62, h: 0.26, margin: 0,
    fontFace: BODY, fontSize: 11.5, bold: true, color: INK, align: "center" });
  s.addText("we do not\nclaim it", { x: 11.1, y: 5.68, w: 1.62, h: 0.42, margin: 0,
    fontFace: BODY, fontSize: 10, color: MUTED, align: "center", lineSpacing: 13 });

  footnote(s, "A rule whose boundary makes no difference to the output has not been tested at all. That is our own AI, caught by our own harness.");

  s.addNotes(
    "Be precise about the novelty, because our own verification pass narrowed it. Rule-level reporting already exists " +
    "(AgentModernize's Business Rule Preservation Score, measured against human gold-standard rules). What we could not " +
    "find anywhere: requiring the boundary to be behaviourally live, flagging rules the evidence contradicts, and " +
    "injecting faults into the oracle to score corpus adequacy.\n\n" +
    "If a rule fails check 2, say 'contradicted by the evidence we have', never 'false'. Always show the counterexample."
  );
}

// ================================================================= 8 · OUTPUT
{
  const s = pres.addSlide();
  kicker(s, "WHAT THE BANK ACTUALLY GETS");
  heading(s, "Three artifacts it never had, and an honest claim");

  const tiles = [
    { n: "47", l: "business rules extracted", key: false },
    { n: "31", l: "confirmed by execution", key: false },
    { n: "16", l: "not confirmed, and named", key: true },
    { n: "94%", l: "mutation kill rate", key: false },
  ];
  const tw = 2.92, tg = 0.15;
  tiles.forEach((t, i) => {
    const x = M + i * (tw + tg);
    block(s, x, 1.62, tw, 1.14);
    s.addText(t.n, { x: x + 0.22, y: 1.68, w: tw - 0.44, h: 0.62, margin: 0,
      fontFace: HEAD, fontSize: 34, bold: true, color: t.key ? ACCENT : INK });
    s.addText(t.l, { x: x + 0.22, y: 2.3, w: tw - 0.44, h: 0.38, margin: 0,
      fontFace: BODY, fontSize: 11, color: TEXT });
  });

  block(s, M, 2.92, 6.14, 1.5);
  s.addText("DIVERGENCE, MINIMISED TO ONE CASE", { x: M + 0.24, y: 3.04, w: 5.66, h: 0.24, margin: 0,
    fontFace: BODY, fontSize: 9.5, bold: true, charSpacing: 1.4, color: MUTED });
  s.addText("balance ₹1,00,000.00 · 12 days · 3.5%", { x: M + 0.24, y: 3.3, w: 5.66, h: 0.26, margin: 0,
    fontFace: MONO, fontSize: 11, color: TEXT });
  s.addText("legacy → ₹115        rewrite → ₹116", { x: M + 0.24, y: 3.56, w: 5.66, h: 0.28, margin: 0,
    fontFace: MONO, fontSize: 12, bold: true, color: INK });
  s.addText("Rule R-07, line 214. The Java uses HALF_UP; the COBOL truncates at the PIC boundary.", {
    x: M + 0.24, y: 3.86, w: 5.66, h: 0.46, margin: 0, fontFace: BODY, fontSize: 10.5, color: TEXT, lineSpacing: 14 });

  block(s, M + 6.32, 2.92, 6.14, 1.5);
  s.addText("COMPLIANCE FINDING, NEEDS THE THIRD REFERENCE", { x: M + 6.56, y: 3.04, w: 5.66, h: 0.24, margin: 0,
    fontFace: BODY, fontSize: 9.5, bold: true, charSpacing: 1.4, color: ACCENT });
  s.addText("Legacy and rewrite agree. Both round to two decimals.", {
    x: M + 6.56, y: 3.3, w: 5.66, h: 0.26, margin: 0, fontFace: BODY, fontSize: 11.5, bold: true, color: TEXT });
  s.addText("RBI clause 4(f) requires rounding to the nearest rupee.", {
    x: M + 6.56, y: 3.58, w: 5.66, h: 0.26, margin: 0, fontFace: BODY, fontSize: 11.5, bold: true, color: ACCENT });
  s.addText("Not a migration defect. It has been running for forty years, and warrants a compliance review.", {
    x: M + 6.56, y: 3.86, w: 5.66, h: 0.46, margin: 0, fontFace: BODY, fontSize: 10.5, color: TEXT, lineSpacing: 14 });

  block(s, M, 4.62, CW, 0.62);
  s.addText(
    [
      { text: "Retained by the bank:   ", options: { bold: true, color: INK } },
      { text: "a specification  ·  a regression suite  ·  an evidence-backed equivalence claim", options: { color: TEXT } },
    ],
    { x: M + 0.3, y: 4.62, w: CW - 0.6, h: 0.62, margin: 0, fontFace: BODY, fontSize: 12, valign: "middle" });

  band(s, 5.44, 1.36);
  s.addText("Everyone proves the rewrite matches the legacy.\nWe also ask whether the legacy matches the regulator.", {
    x: M + 0.34, y: 5.56, w: CW - 0.68, h: 0.64, margin: 0,
    fontFace: HEAD, fontSize: 18, bold: true, color: WHITE, lineSpacing: 25 });
  s.addText(
    "The differential mechanism is prior art. IBM, AWS, Mechanical Orchard and a paper published five days ago all do a version of it, and we say so. Ours is the coverage reported per business rule including the rules we could not confirm, a score for our own test corpus, and the regulator as a third reference.",
    { x: M + 0.34, y: 6.24, w: CW - 0.68, h: 0.48, margin: 0, fontFace: BODY, fontSize: 11, color: ON_DARK, lineSpacing: 14 });

  footnote(s, "Figures illustrative, for a savings-interest accrual program. Full sources and the competitive landscape are in the research dossier.");

  s.addNotes(
    "Close on the coverage numbers, not a promise: 'these sixteen we could not confirm, and we are telling you which ones.'\n\n" +
    "Of the 16 not confirmed, some were never exercised and some were contradicted by the evidence. If asked, that second " +
    "group is the interesting one: it is where our own extraction layer invented a rule that is not in the program.\n\n" +
    "If asked about Locksmith: arXiv 2607.28271, 30 July 2026. Same spine, legacy as oracle, both targets off-mainframe, " +
    "parity gate, 91.90% branch coverage. Verified: no business-rule reporting, no regulatory checks, and its mutations are " +
    "parity-preserving for path exploration, not fault injection for adequacy."
  );
}

pres.writeFile({ fileName: "Legacy_Banking_Modernisation_Platform_v6.pptx" })
  .then((f) => console.log("wrote", f));
