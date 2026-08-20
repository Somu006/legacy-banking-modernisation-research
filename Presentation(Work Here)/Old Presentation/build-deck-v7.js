const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE";
pres.author = "Team StudyEdge";
pres.company = "Odisha University of Technology and Research";
pres.title = "Legacy Banking Modernisation Platform";

// ------------------------------------------------------------------ palette
const INK    = "0E2033";
const TEXT   = "16212E";
const MUTED  = "6B7785";
const PANEL  = "EDF1F5";
const HAIR   = "D5DCE3";
const ACCENT = "B07A16";
const WHITE  = "FFFFFF";
const ON_DARK = "C3D2DF";

const HEAD = "Cambria";
const BODY = "Calibri";
const MONO = "Consolas";

const W = 13.333, M = 0.62, CW = W - M * 2;
const H_SIZE = 31, RAD = 0.06;

// ------------------------------------------------------------------ helpers
function kicker(s, txt) {
  s.addText(txt, { x: M, y: 0.4, w: CW, h: 0.26, margin: 0,
    fontFace: BODY, fontSize: 10.5, bold: true, charSpacing: 2.6, color: MUTED });
}
function heading(s, txt) {
  s.addText(txt, { x: M, y: 0.7, w: CW, h: 0.7, margin: 0,
    fontFace: HEAD, fontSize: H_SIZE, bold: true, color: TEXT, valign: "top" });
}
function block(s, x, y, w, h, fill) {
  s.addShape(pres.ShapeType.roundRect, { x, y, w, h, rectRadius: RAD,
    fill: { color: fill || PANEL }, line: { color: fill || PANEL, width: 0 } });
}
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
function badge(s, x, y, d, txt, fill) {
  s.addShape(pres.ShapeType.ellipse, { x, y, w: d, h: d,
    fill: { color: fill || MUTED }, line: { color: fill || MUTED, width: 0 } });
  s.addText(txt, { x, y, w: d, h: d, margin: 0,
    fontFace: BODY, fontSize: 12, bold: true, color: WHITE, align: "center", valign: "middle" });
}
function arrowR(s, x, y, w) {
  s.addShape(pres.ShapeType.rightArrow, { x, y, w, h: 0.26, fill: { color: HAIR }, line: { color: HAIR, width: 0 } });
}
function arrowD(s, x, y, h) {
  s.addShape(pres.ShapeType.downArrow, { x, y, w: 0.26, h, fill: { color: HAIR }, line: { color: HAIR, width: 0 } });
}
function line(s, x, y, w, h) {
  s.addShape(pres.ShapeType.line, { x, y, w, h, line: { color: HAIR, width: 1.5 } });
}
function footnote(s, txt) {
  s.addText(txt, { x: M, y: 6.92, w: CW, h: 0.32, margin: 0,
    fontFace: BODY, fontSize: 9.5, italic: true, color: MUTED, lineSpacing: 12 });
}

// ================================================================== 1 · TITLE
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

  s.addNotes("Everyone proves the rewrite matches the legacy; we also ask whether the legacy matches the regulator.");
}

// ================================================================ 2 · PROBLEM
{
  const s = pres.addSlide();
  kicker(s, "PROBLEM");
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
    "The 1.9 million customer figure often quoted for TSB is press reporting, not the FCA, which says 'a significant " +
    "proportion of its 5.2 million customers'. HDFC is the example that lands with an Indian panel."
  );
}

// ========================================================= 3 · WHY UNSOLVED
{
  const s = pres.addSlide();
  kicker(s, "WHY IT'S UNSOLVED");
  heading(s, "Translation is solved. Proof is not.");

  const yB = 1.6, hB = 1.02;
  block(s, M, yB, 2.36, hB);
  boxText(s, { x: M, y: yB, w: 2.36, t: "COBOL source", ts: 14, tOff: 0.14, b: "4,000 lines · 1987", bOff: 0.52, bs: 10 });

  arrowR(s, 3.1, yB + 0.38, 0.3);

  block(s, 3.52, yB, 2.5, hB);
  boxText(s, { x: 3.52, y: yB, w: 2.5, t: "Translate", ts: 14, tOff: 0.14, tc: ACCENT,
    b: "AWS · IBM · TCS ship this", bOff: 0.52, bs: 10 });

  arrowR(s, 6.14, yB + 0.38, 0.3);

  block(s, 6.56, yB, 2.36, hB);
  boxText(s, { x: 6.56, y: yB, w: 2.36, t: "Modern Java", ts: 14, tOff: 0.14, b: "compiles, passes tests", bOff: 0.52, bs: 10 });

  s.addShape(pres.ShapeType.rect, { x: 9.2, y: yB - 0.16, w: 0.3, h: hB + 0.32,
    fill: { color: INK }, line: { color: INK, width: 0 } });
  s.addText("VERIFICATION", { x: 8.2, y: yB + hB + 0.2, w: 2.3, h: 0.24, margin: 0,
    fontFace: BODY, fontSize: 9.5, bold: true, charSpacing: 1.3, color: INK, align: "center" });

  block(s, 9.8, yB, 2.91, hB);
  boxText(s, { x: 9.8, y: yB, w: 2.91, t: "Production", ts: 14, tOff: 0.14, tc: MUTED, b: "never reached", bOff: 0.52, bs: 10 });

  // two reasons
  block(s, M, 3.06, 5.95, 1.94);
  s.addText("The specification was never written", {
    x: M + 0.28, y: 3.2, w: 5.39, h: 0.32, margin: 0, fontFace: HEAD, fontSize: 17, bold: true, color: INK });
  s.addText(
    "Accrual conventions, rounding on the third decimal, leap years, accounts opened on the 31st. Hundreds of edge cases patched in over four decades, none of them documented, and the engineers who added them have retired.\n\nThe code is the specification. There is no other one.",
    { x: M + 0.28, y: 3.56, w: 5.39, h: 1.3, margin: 0, fontFace: BODY, fontSize: 11.5, color: TEXT, lineSpacing: 16 });

  block(s, M + 6.16, 3.06, 5.93, 1.94);
  s.addText("And asking an AI does not recover it", {
    x: M + 6.44, y: 3.2, w: 5.37, h: 0.32, margin: 0, fontFace: HEAD, fontSize: 17, bold: true, color: INK });
  [
    { n: "91.2%", l: "of business rules extracted by a 2026 system", key: false },
    { n: "<20%", l: "behavioural equivalence that same system reached", key: true },
  ].forEach((r, i) => {
    const y = 3.6 + i * 0.62;
    s.addText(r.n, { x: M + 6.44, y, w: 1.3, h: 0.42, margin: 0,
      fontFace: HEAD, fontSize: 24, bold: true, color: r.key ? ACCENT : INK });
    s.addText(r.l, { x: M + 7.8, y: y + 0.06, w: 4.0, h: 0.4, margin: 0,
      fontFace: BODY, fontSize: 11, color: TEXT, lineSpacing: 14 });
  });
  s.addText("Extraction works. Behavioural equivalence does not follow from it.", {
    x: M + 6.44, y: 4.72, w: 5.37, h: 0.28, margin: 0, fontFace: BODY, fontSize: 10.5, italic: true, color: MUTED });

  band(s, 5.24, 1.28);
  s.addText('"the resulting code cannot be trusted to correctly translate the original code"', {
    x: M + 0.34, y: 5.4, w: CW - 0.68, h: 0.38, margin: 0,
    fontFace: HEAD, fontSize: 18, bold: true, italic: true, color: WHITE });
  s.addText(
    "IBM Research, on the testing framework for IBM's own watsonx Code Assistant for Z. If the vendor cannot trust its own output without validation, no bank can. The bottleneck is verification, not code generation.",
    { x: M + 0.34, y: 5.84, w: CW - 0.68, h: 0.56, margin: 0, fontFace: BODY, fontSize: 12, color: ON_DARK, lineSpacing: 16 });

  footnote(s, "Sources: arXiv 2504.10548 (quoted verbatim from the abstract) · AgentModernize, arXiv 2605.17535 · A-COBREX, ICSE 2025.");

  s.addNotes(
    "AgentModernize captured 91.2% of gold-standard rules but its Behavioural Equivalence Rate was 9.4%, 8.1% and 19.4% " +
    "across three models, with baselines at 0.0%. That pair is the sharpest argument in the deck and it is someone else's data.\n\n" +
    "Be generous to the incumbents. Claiming to have invented differential verification would lose a Cognizant mainframe " +
    "judge in one sentence."
  );
}

// ============================================================ 4 · OUR SOLUTION
{
  const s = pres.addSlide();
  kicker(s, "OUR SOLUTION");
  heading(s, "Treat modernisation as a verification problem");

  s.addText(
    "If nobody can write the specification, stop trying to write it first. Run the old program and the new one against the same inputs, and let the difference be the finding.",
    { x: M, y: 1.58, w: CW, h: 0.4, margin: 0, fontFace: BODY, fontSize: 14, color: TEXT, lineSpacing: 20 });

  const steps = [
    { n: "01", t: "Extract", b: "Slice the legacy source into functional units and state each unit's business rules in plain language. Every rule carries the exact lines that produce it, written by the pipeline from the slice rather than asserted by the model." },
    { n: "02", t: "Reimplement", b: "Generate the modern equivalent. This is the commodity step and deliberately the least interesting part of the system. The output is treated as untrusted by design." },
    { n: "03", t: "Verify", b: "Generate inputs at the boundaries those rules imply, execute both programs against every one, and compare. Real execution on both sides, on a laptop, with nothing hand-waved." },
  ];
  const sw = 3.9, sg = 0.2;
  steps.forEach((st, i) => {
    const x = M + i * (sw + sg);
    block(s, x, 2.16, sw, 2.34);
    badge(s, x + 0.26, 2.38, 0.5, st.n, i === 2 ? ACCENT : MUTED);
    s.addText(st.t, { x: x + 0.9, y: 2.43, w: sw - 1.16, h: 0.4, margin: 0,
      fontFace: HEAD, fontSize: 20, bold: true, color: i === 2 ? ACCENT : INK });
    s.addText(st.b, { x: x + 0.26, y: 3.04, w: sw - 0.52, h: 1.34, margin: 0,
      fontFace: BODY, fontSize: 11, color: MUTED, lineSpacing: 15 });
  });

  block(s, M, 4.72, CW, 0.92);
  s.addText("The legacy program is its own correctness oracle.", {
    x: M + 0.3, y: 4.84, w: 5.4, h: 0.3, margin: 0, fontFace: BODY, fontSize: 14, bold: true, color: INK });
  s.addText(
    "It already defines the right answer by running, so nobody has to specify the expected behaviour in advance. Ground truth comes free from the thing being replaced.",
    { x: M + 0.3, y: 5.14, w: 11.5, h: 0.36, margin: 0, fontFace: BODY, fontSize: 11.5, color: MUTED });

  band(s, 5.86, 0.86);
  s.addText("The reciprocal loop", {
    x: M + 0.34, y: 5.98, w: 2.6, h: 0.3, margin: 0, fontFace: BODY, fontSize: 13, bold: true, color: ACCENT });
  s.addText(
    "The extracted rules tell the input generator where the boundaries are. The differential run then catches the extraction layer stating rules that are wrong. Neither half works alone.",
    { x: M + 3.1, y: 5.98, w: 8.6, h: 0.56, margin: 0, fontFace: BODY, fontSize: 12, color: ON_DARK, lineSpacing: 16 });

  s.addNotes(
    "This is the pivot of the whole pitch. Testing normally requires knowing the correct answer in advance; here that " +
    "requirement disappears because the program being replaced already defines it by running.\n\n" +
    "Every mismatch becomes a concrete reproducible finding rather than a confidence score."
  );
}

// ============================================================ 5 · HOW IT WORKS
{
  const s = pres.addSlide();
  kicker(s, "HOW IT WORKS");
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
    x: M + 0.3, y: yBb + 0.1, w: 4.2, h: 0.3, margin: 0, fontFace: BODY, fontSize: 13.5, bold: true, color: INK });
  s.addText("the extracted rules say where the boundaries are", {
    x: M + 0.3, y: yBb + 0.42, w: 4.4, h: 0.28, margin: 0, fontFace: BODY, fontSize: 10.5, italic: true, color: MUTED });
  s.addText(
    "₹99,999 / ₹1,00,000 / ₹1,00,001   ·   ₹0.50 rounding midpoints\n29 February  ·  month and quarter ends  ·  zero and maximum values",
    { x: 5.5, y: yBb + 0.14, w: 7.0, h: 0.56, margin: 0, fontFace: MONO, fontSize: 10, color: TEXT, lineSpacing: 15 });

  const yC = 4.28;
  arrowD(s, 6.6, yBb + 0.82, 0.26);
  block(s, M, yC, CW, 1.12);
  s.addText("4 · Execute and compare, three ways", {
    x: M + 0.3, y: yC + 0.14, w: 4.6, h: 0.3, margin: 0, fontFace: BODY, fontSize: 13.5, bold: true, color: INK });
  s.addText("same input, three outputs", {
    x: M + 0.3, y: yC + 0.46, w: 4.6, h: 0.28, margin: 0, fontFace: BODY, fontSize: 10.5, italic: true, color: MUTED });

  [
    { t: "Legacy COBOL", s2: "GnuCOBOL, the oracle", key: false },
    { t: "Reimplementation", s2: "generated Java, untrusted", key: false },
    { t: "RBI Direction", s2: "the third reference", key: true },
  ].forEach((c, i) => {
    const x = 5.2 + i * 2.52;
    block(s, x, yC + 0.2, 2.36, 0.72, WHITE);
    s.addText(c.t, { x, y: yC + 0.28, w: 2.36, h: 0.26, margin: 0,
      fontFace: BODY, fontSize: 11.5, bold: true, color: c.key ? ACCENT : INK, align: "center" });
    s.addText(c.s2, { x, y: yC + 0.54, w: 2.36, h: 0.24, margin: 0,
      fontFace: BODY, fontSize: 9.5, color: MUTED, align: "center" });
  });

  const yD = 5.9;
  arrowD(s, 6.6, yC + 1.12, 0.24);
  [
    { t: "Rule coverage", b: "which rules the tests reached" },
    { t: "Mutation score", b: "how strong is this claim?" },
    { t: "Compliance findings", b: "legacy against the regulator" },
    { t: "Evidence bundle", b: "spec · tests · signed claim" },
  ].forEach((o, i) => {
    const x = M + i * (2.92 + 0.15);
    block(s, x, yD, 2.92, 0.78);
    s.addText(o.t, { x: x + 0.16, y: yD + 0.1, w: 2.6, h: 0.28, margin: 0,
      fontFace: BODY, fontSize: 12.5, bold: true, color: INK, align: "center" });
    s.addText(o.b, { x: x + 0.16, y: yD + 0.38, w: 2.6, h: 0.28, margin: 0,
      fontFace: BODY, fontSize: 10, color: MUTED, align: "center" });
  });

  footnote(s, "Titles in amber are the two bounded LLM calls; everything else is deterministic. Deterministic orchestration matches agentic accuracy at up to 3.5× lower token cost (arXiv 2605.09894).");

  s.addNotes(
    "The line from Extract rules back into input generation is the reciprocal loop.\n\n" +
    "The intake gate matters: the tool refuses programs it cannot verify soundly, with a reason, rather than producing a " +
    "confident wrong answer."
  );
}

// ====================================================== 6 · WHAT'S DIFFERENT
{
  const s = pres.addSlide();
  kicker(s, "WHAT MAKES IT DIFFERENT");
  heading(s, "Three things nobody else does");

  s.addText(
    "The differential mechanism itself is prior art. IBM, AWS, Mechanical Orchard and a paper published five days ago all ship a version of it, and we say so. These three are ours.",
    { x: M, y: 1.58, w: CW, h: 0.4, margin: 0, fontFace: BODY, fontSize: 13, color: TEXT });

  const cw3 = 3.9, cg3 = 0.2;

  // ---- 01 three-way conformance
  {
    const x = M;
    block(s, x, 2.12, cw3, 4.2);
    badge(s, x + 0.26, 2.32, 0.46, "01", ACCENT);
    s.addText("We check the legacy\nagainst the regulator", { x: x + 0.86, y: 2.3, w: cw3 - 1.1, h: 0.56, margin: 0,
      fontFace: HEAD, fontSize: 15.5, bold: true, color: INK, lineSpacing: 19 });
    s.addText(
      "Every tool treats the legacy as correct by definition. A program written in 1987 can breach a Direction issued decades later, so we add a third reference.",
      { x: x + 0.26, y: 3.0, w: cw3 - 0.52, h: 0.86, margin: 0, fontFace: BODY, fontSize: 10.5, color: MUTED, lineSpacing: 14 });

    [
      { f: "L = R = Reg", t: "verified compliant", key: false },
      { f: "L ≠ R", t: "translation defect", key: false },
      { f: "L = R ≠ Reg", t: "inherited breach", key: true },
      { f: "L ≠ R = Reg", t: "silent correction", key: false },
    ].forEach((r, i) => {
      const y = 3.94 + i * 0.5;
      block(s, x + 0.26, y, cw3 - 0.52, 0.42, WHITE);
      s.addText(r.f, { x: x + 0.38, y, w: 1.5, h: 0.42, margin: 0,
        fontFace: MONO, fontSize: 10, bold: true, color: r.key ? ACCENT : MUTED, valign: "middle" });
      s.addText(r.t, { x: x + 1.9, y, w: 1.86, h: 0.42, margin: 0,
        fontFace: BODY, fontSize: 10.5, bold: r.key, color: r.key ? ACCENT : TEXT, valign: "middle" });
    });
    s.addText("Only the third row needs a regulator. No other tool can see it.", {
      x: x + 0.26, y: 5.98, w: cw3 - 0.52, h: 0.28, margin: 0,
      fontFace: BODY, fontSize: 9.5, italic: true, color: MUTED });
  }

  // ---- 02 rule-level verdict
  {
    const x = M + cw3 + cg3;
    block(s, x, 2.12, cw3, 4.2);
    badge(s, x + 0.26, 2.32, 0.46, "02", MUTED);
    s.addText("A result for every rule,\nnot every test case", { x: x + 0.86, y: 2.3, w: cw3 - 1.1, h: 0.56, margin: 0,
      fontFace: HEAD, fontSize: 15.5, bold: true, color: INK, lineSpacing: 19 });
    s.addText(
      "Executing a line is not testing the rule it encodes. A rule counts as confirmed only when all three checks hold.",
      { x: x + 0.26, y: 3.0, w: cw3 - 0.52, h: 0.7, margin: 0, fontFace: BODY, fontSize: 10.5, color: MUTED, lineSpacing: 14 });

    [
      { n: "1", t: "Reached", b: "the rule's lines ran", key: false },
      { n: "2", t: "Discriminating", b: "the boundary changed the output", key: true },
      { n: "3", t: "Agreed", b: "the rewrite matched every time", key: false },
    ].forEach((g, i) => {
      const y = 3.78 + i * 0.6;
      block(s, x + 0.26, y, cw3 - 0.52, 0.52, WHITE);
      badge(s, x + 0.4, y + 0.11, 0.3, g.n, g.key ? ACCENT : MUTED);
      s.addText(g.t, { x: x + 0.8, y: y + 0.03, w: 2.9, h: 0.24, margin: 0,
        fontFace: BODY, fontSize: 11, bold: true, color: g.key ? ACCENT : INK });
      s.addText(g.b, { x: x + 0.8, y: y + 0.26, w: 2.9, h: 0.22, margin: 0,
        fontFace: BODY, fontSize: 9.5, color: MUTED });
    });
    s.addText("Check 2 is the one that catches our own extraction inventing a rule that is not in the program.", {
      x: x + 0.26, y: 5.66, w: cw3 - 0.52, h: 0.44, margin: 0,
      fontFace: BODY, fontSize: 9.5, italic: true, color: MUTED, lineSpacing: 13 });
  }

  // ---- 03 mutation
  {
    const x = M + 2 * (cw3 + cg3);
    block(s, x, 2.12, cw3, 4.2);
    badge(s, x + 0.26, 2.32, 0.46, "03", MUTED);
    s.addText("We test our own tests", { x: x + 0.86, y: 2.38, w: cw3 - 1.1, h: 0.4, margin: 0,
      fontFace: HEAD, fontSize: 15.5, bold: true, color: INK });
    s.addText(
      '"Everything passed" proves nothing unless the inputs could have caught a failure. So we break the legacy on purpose.',
      { x: x + 0.26, y: 3.0, w: cw3 - 0.52, h: 0.7, margin: 0, fontFace: BODY, fontSize: 10.5, color: MUTED, lineSpacing: 14 });

    block(s, x + 0.26, 3.78, cw3 - 0.52, 0.74, WHITE);
    s.addText("Inject a deliberate defect", { x: x + 0.26, y: 3.84, w: cw3 - 0.52, h: 0.24, margin: 0,
      fontFace: BODY, fontSize: 10.5, bold: true, color: ACCENT, align: "center" });
    s.addText("100000 → 100001  ·  > → >=\ndelete ROUNDED  ·  360 → 365", {
      x: x + 0.3, y: 4.08, w: cw3 - 0.6, h: 0.4, margin: 0,
      fontFace: MONO, fontSize: 8.5, color: TEXT, align: "center", lineSpacing: 12 });

    arrowD(s, x + cw3 / 2 - 0.13, 4.56, 0.2);

    block(s, x + 0.26, 4.84, cw3 - 0.52, 0.44, WHITE);
    s.addText("Re-run the same input corpus", { x: x + 0.26, y: 4.84, w: cw3 - 0.52, h: 0.44, margin: 0,
      fontFace: BODY, fontSize: 10.5, bold: true, color: INK, align: "center", valign: "middle" });

    [
      { t: "Caught", b: "the claim stands" },
      { t: "Missed", b: "we do not claim it" },
    ].forEach((o, i) => {
      const bx = x + 0.26 + i * ((cw3 - 0.52) / 2 + 0.08);
      block(s, bx, 5.44, (cw3 - 0.6) / 2, 0.6, WHITE);
      s.addText(o.t, { x: bx, y: 5.5, w: (cw3 - 0.6) / 2, h: 0.24, margin: 0,
        fontFace: BODY, fontSize: 10.5, bold: true, color: INK, align: "center" });
      s.addText(o.b, { x: bx, y: 5.73, w: (cw3 - 0.6) / 2, h: 0.24, margin: 0,
        fontFace: BODY, fontSize: 9, color: MUTED, align: "center" });
    });
    s.addText("The equivalence claim ships with its own strength score.", {
      x: x + 0.26, y: 6.1, w: cw3 - 0.52, h: 0.26, margin: 0,
      fontFace: BODY, fontSize: 9.5, italic: true, color: MUTED });
  }

  footnote(s, "Checked against Locksmith (arXiv 2607.28271), AgentModernize (arXiv 2605.17535) and the shipping vendor tools. None reports per-rule results, scores its own corpus, or consults a regulator.");

  s.addNotes(
    "Novelty 01 is the strongest and survived a deliberate falsification pass. Locksmith has no regulatory checks; " +
    "AgentModernize has none; EvolveWare is static documentation with no execution.\n\n" +
    "Be precise on 02: rule-level scoring itself exists (AgentModernize's Business Rule Preservation Score, against human " +
    "gold-standard rules). The discrimination check and flagging contradicted rules are ours.\n\n" +
    "On 03: mutation testing is textbook. Applying it to the oracle to certify a migration equivalence claim is the " +
    "combination we could not find anywhere."
  );
}

// ==================================================== 7 · FEASIBILITY & SCOPE
{
  const s = pres.addSlide();
  kicker(s, "FEASIBILITY & SCOPE");
  heading(s, "Narrow by design, and buildable now");

  block(s, M, 1.6, 5.95, 2.24);
  s.addText("In scope", { x: M + 0.28, y: 1.74, w: 5.39, h: 0.3, margin: 0,
    fontFace: BODY, fontSize: 14, bold: true, color: ACCENT });
  s.addText(
    [
      { text: "COBOL, compiled and executed via GnuCOBOL — free, open source, runs on a laptop", options: { bullet: true, breakLine: true } },
      { text: "Retail banking interest accrual", options: { bullet: true, breakLine: true } },
      { text: "Pure computation: input in, output out", options: { bullet: true, breakLine: true } },
      { text: "Third-party COBOL, including AWS's own CardDemo sample", options: { bullet: true } },
    ],
    { x: M + 0.28, y: 2.1, w: 5.39, h: 1.6, margin: 0, fontFace: BODY, fontSize: 11.5, color: TEXT, paraSpaceAfter: 7, lineSpacing: 15 });

  block(s, M + 6.16, 1.6, 5.93, 2.24);
  s.addText("Out of scope, and detected rather than ignored", { x: M + 6.44, y: 1.74, w: 5.37, h: 0.3, margin: 0,
    fontFace: BODY, fontSize: 14, bold: true, color: INK });
  s.addText(
    [
      { text: "CICS screens and JCL orchestration", options: { bullet: true, breakLine: true } },
      { text: "Database-coupled programs", options: { bullet: true, breakLine: true } },
      { text: "Anything non-deterministic — system clocks, randomness, external state", options: { bullet: true } },
    ],
    { x: M + 6.44, y: 2.1, w: 5.37, h: 1.1, margin: 0, fontFace: BODY, fontSize: 11.5, color: TEXT, paraSpaceAfter: 7, lineSpacing: 15 });
  s.addText(
    "Differential testing compares outputs for equality, so non-determinism makes the verdict meaningless. The tool refuses these at intake, with a reason.",
    { x: M + 6.44, y: 3.2, w: 5.37, h: 0.52, margin: 0, fontFace: BODY, fontSize: 10.5, italic: true, color: MUTED, lineSpacing: 14 });

  s.addText("Build stages — the spine first, the novelty protected", {
    x: M, y: 4.06, w: CW, h: 0.34, margin: 0, fontFace: HEAD, fontSize: 18, bold: true, color: TEXT });

  const stages = [
    { n: "01", t: "Differential harness", b: "GnuCOBOL compiles and runs; diff two implementations across an input list." },
    { n: "02", t: "Rules and boundaries", b: "Slice, extract with line citations, derive boundary inputs from the rules." },
    { n: "03", t: "Per-rule results", b: "Coverage mapped back to rules, including the ones we could not confirm." },
    { n: "04", t: "Regulation and mutation", b: "The RBI reference model, then fault injection to score the corpus." },
  ];
  stages.forEach((st, i) => {
    const x = M + i * (2.92 + 0.15);
    block(s, x, 4.5, 2.92, 1.6);
    badge(s, x + 0.22, 4.66, 0.42, st.n, i === 3 ? ACCENT : MUTED);
    s.addText(st.t, { x: x + 0.74, y: 4.68, w: 2.0, h: 0.34, margin: 0,
      fontFace: BODY, fontSize: 12, bold: true, color: INK });
    s.addText(st.b, { x: x + 0.22, y: 5.18, w: 2.5, h: 0.82, margin: 0,
      fontFace: BODY, fontSize: 10.5, color: MUTED, lineSpacing: 14 });
  });

  s.addText(
    "Known limitation, stated up front: input-generation quality caps everything. We can only confirm rules our inputs reach — which is exactly why stage 04 scores the corpus instead of trusting it.",
    { x: M, y: 6.26, w: CW, h: 0.44, margin: 0, fontFace: BODY, fontSize: 12, italic: true, color: INK, lineSpacing: 16 });

  footnote(s, "GnuCOBOL passes 9,700 of 9,748 NIST COBOL-85 conformance tests, though the project does not claim to be a Standard Conforming implementation. The method is compiler-agnostic: a bank points it at its own compiler.");

  s.addNotes(
    "On CardDemo: CBACT04C.cbl is an interest calculator but reads four VSAM files and calls FUNCTION CURRENT-DATE, so our " +
    "own intake gate refuses it. We use that as the refusal demo and lift the arithmetic into a pure unit for verification."
  );
}

// ================================================================= 8 · IMPACT
{
  const s = pres.addSlide();
  kicker(s, "IMPACT");
  heading(s, "Three artifacts the bank never had");

  const tiles = [
    { n: "47", l: "business rules extracted", key: false },
    { n: "31", l: "confirmed by execution", key: false },
    { n: "16", l: "not confirmed, and named", key: true },
    { n: "94%", l: "mutation kill rate", key: false },
  ];
  tiles.forEach((t, i) => {
    const x = M + i * (2.92 + 0.15);
    block(s, x, 1.6, 2.92, 1.14);
    s.addText(t.n, { x: x + 0.22, y: 1.66, w: 2.48, h: 0.62, margin: 0,
      fontFace: HEAD, fontSize: 34, bold: true, color: t.key ? ACCENT : INK });
    s.addText(t.l, { x: x + 0.22, y: 2.28, w: 2.48, h: 0.38, margin: 0,
      fontFace: BODY, fontSize: 11, color: TEXT });
  });

  block(s, M, 2.9, 6.14, 1.44);
  s.addText("DIVERGENCE, MINIMISED TO ONE CASE", { x: M + 0.24, y: 3.0, w: 5.66, h: 0.24, margin: 0,
    fontFace: BODY, fontSize: 9.5, bold: true, charSpacing: 1.4, color: MUTED });
  s.addText("balance ₹1,00,000.00 · 12 days · 3.5%", { x: M + 0.24, y: 3.26, w: 5.66, h: 0.26, margin: 0,
    fontFace: MONO, fontSize: 11, color: TEXT });
  s.addText("legacy → ₹115        rewrite → ₹116", { x: M + 0.24, y: 3.52, w: 5.66, h: 0.28, margin: 0,
    fontFace: MONO, fontSize: 12, bold: true, color: INK });
  s.addText("Rule R-07, line 214. The Java uses HALF_UP; the COBOL truncates at the PIC boundary.", {
    x: M + 0.24, y: 3.82, w: 5.66, h: 0.44, margin: 0, fontFace: BODY, fontSize: 10.5, color: TEXT, lineSpacing: 14 });

  block(s, M + 6.32, 2.9, 6.14, 1.44);
  s.addText("COMPLIANCE FINDING, NEEDS THE THIRD REFERENCE", { x: M + 6.56, y: 3.0, w: 5.66, h: 0.24, margin: 0,
    fontFace: BODY, fontSize: 9.5, bold: true, charSpacing: 1.4, color: ACCENT });
  s.addText("Legacy and rewrite agree. Both round to two decimals.", {
    x: M + 6.56, y: 3.26, w: 5.66, h: 0.26, margin: 0, fontFace: BODY, fontSize: 11.5, bold: true, color: TEXT });
  s.addText("RBI clause 4(f) requires rounding to the nearest rupee.", {
    x: M + 6.56, y: 3.54, w: 5.66, h: 0.26, margin: 0, fontFace: BODY, fontSize: 11.5, bold: true, color: ACCENT });
  s.addText("Not a migration defect. It has been running for forty years, and warrants a compliance review.", {
    x: M + 6.56, y: 3.82, w: 5.66, h: 0.44, margin: 0, fontFace: BODY, fontSize: 10.5, color: TEXT, lineSpacing: 14 });

  const arts = [
    { t: "A specification", b: "Readable, traceable documentation for a system that never had any." },
    { t: "A regression suite", b: "Thousands of input–output pairs, retained permanently by the institution." },
    { t: "An equivalence claim", b: "Evidence-backed, with its own strength score. The artifact someone can sign." },
  ];
  arts.forEach((a, i) => {
    const x = M + i * (3.9 + 0.2);
    block(s, x, 4.52, 3.9, 1.0);
    s.addText(a.t, { x: x + 0.24, y: 4.62, w: 3.42, h: 0.28, margin: 0,
      fontFace: BODY, fontSize: 12.5, bold: true, color: INK });
    s.addText(a.b, { x: x + 0.24, y: 4.9, w: 3.42, h: 0.52, margin: 0,
      fontFace: BODY, fontSize: 10.5, color: MUTED, lineSpacing: 14 });
  });

  band(s, 5.7, 1.06);
  s.addText("The first two hold their value even if the migration is never approved.", {
    x: M + 0.34, y: 5.8, w: CW - 0.68, h: 0.32, margin: 0,
    fontFace: HEAD, fontSize: 17, bold: true, color: WHITE });
  s.addText(
    "A bank that has deferred this decision for a decade ends up with documentation and tests for a system it previously could not touch. That is what makes the modernisation programme scopeable, and therefore fundable.",
    { x: M + 0.34, y: 6.14, w: CW - 0.68, h: 0.5, margin: 0, fontFace: BODY, fontSize: 12, color: ON_DARK, lineSpacing: 16 });

  footnote(s, "Figures illustrative, for a savings-interest accrual program.");

  s.addNotes(
    "Close on the coverage numbers, not a promise: 'these sixteen we could not confirm, and we are telling you which ones.'\n\n" +
    "Of the 16, some were never exercised and some were contradicted by the evidence. That second group is the interesting " +
    "one: it is where our own extraction layer invented a rule that is not in the program."
  );
}

// ============================================================= 9 · REFERENCES
{
  const s = pres.addSlide();
  kicker(s, "REFERENCES");
  heading(s, "Sources");

  const colW = 5.95;
  const L = M, R = M + 6.16;

  function group(x, y, title, items) {
    s.addText(title, { x, y, w: colW, h: 0.26, margin: 0,
      fontFace: BODY, fontSize: 10, bold: true, charSpacing: 1.6, color: ACCENT });
    const runs = [];
    items.forEach((it, i) => {
      runs.push({ text: it[0] + "  ", options: { bold: true, color: TEXT } });
      runs.push({ text: it[1], options: { color: MUTED, breakLine: i < items.length - 1 } });
    });
    s.addText(runs, { x, y: y + 0.38, w: colW, h: items.length * 0.38 + 0.1, margin: 0, valign: "top",
      fontFace: BODY, fontSize: 10, lineSpacing: 14, paraSpaceAfter: 5 });
  }

  group(L, 1.56, "PEER-REVIEWED AND PREPRINTS", [
    ["Hans, S. et al. (2025).", "Automated Testing of COBOL to Java Transformation. arXiv:2504.10548."],
    ["Pan, R. et al. (2024).", "Lost in Translation: A Study of Bugs Introduced by LLMs while Translating Code. ICSE 2024, arXiv:2308.03109."],
    ["Ahmed, S. N. & Galib, M. (2026).", "AgentModernize: Preserving Business Logic in Legacy Modernization. arXiv:2605.17535."],
    ["Ferenczi, A. et al. (2026).", "Agentic Method for Deterministic Validation of Legacy Code Migration. arXiv:2607.28271."],
    ["Shah, S. et al. (2025).", "A-COBREX: Identifying Business Rules in COBOL Programs. ICSE 2025, Demonstrations."],
    ["B S, C. & Chimalakonda, S. (2025).", "LLM vs Rule-Based: the COBRAIN Tool. EASE 2025, doi:10.1145/3756681.3756982."],
    ["Lwin, N. O. & Kumar, R. (2026).", "Deterministic vs LLM-Controlled Orchestration for COBOL-to-Python Modernization. arXiv:2605.09894."],
    ["Barr, E. T. et al. (2015).", "The Oracle Problem in Software Testing: A Survey. IEEE TSE 41(5), 507–525."],
  ]);

  group(R, 1.56, "REGULATORY AND SUPERVISORY", [
    ["Reserve Bank of India (2016, upd. 2024).", "Master Direction — Interest Rate on Deposits Directions. Clauses 4(f), 6(a), 6(a)(1)–(2)."],
    ["Reserve Bank of India (2023).", "Master Direction on Information Technology Governance, Risk, Controls and Assurance Practices."],
    ["Financial Conduct Authority (2022).", "TSB fined £48.65m for operational resilience failings."],
  ]);

  group(R, 3.42, "INDUSTRY AND MARKET", [
    ["Boston Consulting Group (2024).", "Cloud-based Core Transformations, via Business Standard."],
    ["IBM.", "watsonx Code Assistant for Z — Validation Assistant documentation."],
    ["Amazon Web Services (2025).", "AWS Transform for mainframe, generally available."],
    ["Mechanical Orchard.", "Imogen platform — generate-validate loop."],
  ]);

  group(R, 5.18, "TOOLS AND STANDARDS", [
    ["GnuCOBOL Project.", "GnuCOBOL compiler, GPL/LGPL. NIST COBOL-85: 9,700 of 9,748."],
    ["Wolf, U.", "ProLeap COBOL Parser, MIT licence."],
    ["NIST (1992).", "COBOL Compiler Validation System, CCVS85."],
  ]);

  footnote(s, "Full annotated bibliography, with a confidence rating per source and a record of which claims were independently re-verified, is in the research dossier accompanying this submission.");

  s.addNotes(
    "Every figure in the deck traces to one of these. The dossier also records six corrections found during a deliberate " +
    "falsification pass, including the RBI clause numbering and the fact that the differential mechanism is prior art."
  );
}

pres.writeFile({ fileName: "Legacy_Banking_Modernisation_Platform_v7.pptx" })
  .then((f) => console.log("wrote", f));
