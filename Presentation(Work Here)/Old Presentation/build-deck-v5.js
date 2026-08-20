const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE";
pres.author = "Team StudyEdge";
pres.company = "Odisha University of Technology and Research";
pres.title = "Legacy Banking Modernisation Platform";

// ------------------------------------------------------------------ palette
// Two colours and a grey ramp. Navy carries structure, amber is the only
// accent and is used sparingly. No semantic traffic-light colouring.
const INK     = "0E2033";   // navy, dominant
const INK_2   = "1A3A55";   // raised block on navy
const INK_3   = "2A4A66";   // nested block on navy
const TEXT    = "16212E";
const MUTED   = "6B7785";
const FAINT   = "9AA5B1";
const ON_DARK = "C3D2DF";
const ON_DARK_2 = "8FA7BD";
const PANEL   = "F1F4F7";   // neutral block on white
const PANEL_2 = "E4E9EF";   // emphasis block on white
const HAIR    = "CFD6DE";
const ACCENT  = "B07A16";   // the single accent
const ACCENT_L= "FAF2E2";
const WHITE   = "FFFFFF";

const HEAD = "Cambria";
const BODY = "Calibri";
const MONO = "Consolas";

const W = 13.333, M = 0.62, CW = W - M * 2;

// ------------------------------------------------------------------ helpers
// Three levels, nothing else:
//   neutral  -> PANEL fill, no border
//   emphasis -> PANEL_2 or ACCENT_L fill, hairline or accent border
//   node     -> diagram box; border distinguishes state, never sentiment
function kicker(s, txt, color) {
  s.addText(txt, { x: M, y: 0.4, w: CW, h: 0.26, margin: 0,
    fontFace: BODY, fontSize: 10.5, bold: true, charSpacing: 2.6, color: color || MUTED });
}
function heading(s, txt, o = {}) {
  s.addText(txt, { x: M, y: o.y || 0.7, w: o.w || CW, h: 0.7, margin: 0,
    fontFace: HEAD, fontSize: o.size || 31, bold: true, color: o.color || TEXT, valign: "top" });
}
function card(s, o) {
  s.addShape(pres.ShapeType.roundRect, {
    x: o.x, y: o.y, w: o.w, h: o.h, rectRadius: 0.06,
    fill: { color: o.fill || PANEL },
    line: o.line ? { color: o.line, width: o.lw || 1, dashType: o.dash } : { color: o.fill || PANEL, width: 0 },
  });
}
function boxText(s, o) {
  if (o.t) s.addText(o.t, { x: o.x, y: o.y + (o.tOff || 0.16), w: o.w, h: 0.34, margin: 0,
    fontFace: HEAD, fontSize: o.ts || 16, bold: true, color: o.tc || TEXT, align: "center" });
  if (o.b) s.addText(o.b, { x: o.x + 0.12, y: o.y + (o.bOff || 0.56), w: o.w - 0.24, h: o.bh || 0.5, margin: 0,
    fontFace: BODY, fontSize: o.bs || 10.5, color: o.bc || MUTED, align: "center", lineSpacing: 14 });
}
function arrowR(s, x, y, w, color) {
  s.addShape(pres.ShapeType.rightArrow, { x, y, w, h: 0.26,
    fill: { color: color || HAIR }, line: { color: color || HAIR, width: 0 } });
}
function arrowD(s, x, y, h, color) {
  s.addShape(pres.ShapeType.downArrow, { x, y, w: 0.26, h,
    fill: { color: color || HAIR }, line: { color: color || HAIR, width: 0 } });
}
function line(s, x, y, w, h, color, dash) {
  s.addShape(pres.ShapeType.line, { x, y, w, h,
    line: { color: color || HAIR, width: 1.5, dashType: dash } });
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
    fontFace: BODY, fontSize: 11, bold: true, charSpacing: 2.4, color: ON_DARK_2 });

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

  line(s, M, 5.42, 4.2, 0, "3A5470");
  s.addText("Team StudyEdge", { x: M, y: 5.58, w: 6.2, h: 0.32, margin: 0,
    fontFace: BODY, fontSize: 16, bold: true, color: WHITE });
  s.addText("Odisha University of Technology and Research, Bhubaneswar", {
    x: M, y: 5.92, w: 6.6, h: 0.28, margin: 0, fontFace: BODY, fontSize: 11.5, color: ON_DARK_2 });
  s.addText("Tamanna Panda  ·  Swayam Subhankar Sahoo  ·  Adyasha Das  ·  Soumyajit Sarkar", {
    x: M, y: 6.24, w: 8.6, h: 0.28, margin: 0, fontFace: BODY, fontSize: 11, color: ON_DARK_2 });

  // the three references — the actual differentiator, stated plainly
  s.addText("THREE REFERENCES, NOT TWO", {
    x: 10.28, y: 1.86, w: 2.44, h: 0.26, margin: 0,
    fontFace: BODY, fontSize: 9, bold: true, charSpacing: 1.4, color: ACCENT });
  line(s, 10.28, 2.2, 2.44, 0, "3A5470");
  ["Legacy COBOL", "Reimplementation", "RBI Master Direction"].forEach((t, i) => {
    s.addText(t, { x: 10.28, y: 2.36 + i * 0.44, w: 2.44, h: 0.3, margin: 0,
      fontFace: BODY, fontSize: 12.5, color: i === 2 ? ACCENT : WHITE });
  });
  s.addText("Same input. Three outputs. Every difference explained.", {
    x: 10.28, y: 3.8, w: 2.44, h: 0.6, margin: 0,
    fontFace: BODY, fontSize: 10, italic: true, color: ON_DARK_2, lineSpacing: 14 });

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
    card(s, { x, y: 1.62, w: cw, h: 1.8 });
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
    card(s, { x, y: 4.04, w: 6.14, h: 1.62, fill: PANEL });
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
  heading(s, "Translation is solved. Proof is not.", { size: 36 });

  const yB = 2.24, hB = 1.2;

  card(s, { x: M, y: yB, w: 2.5, h: hB });
  boxText(s, { x: M, y: yB, w: 2.5, t: "COBOL source", b: "4,000 lines · 1987\n~200 undocumented edits", bh: 0.56 });

  arrowR(s, 3.26, yB + 0.47, 0.34);

  card(s, { x: 3.72, y: yB, w: 2.7, h: hB, fill: ACCENT_L, line: ACCENT });
  boxText(s, { x: 3.72, y: yB, w: 2.7, t: "Translate", tc: ACCENT,
    b: "transpilers · LLMs\nAWS · IBM · TCS ship this", bc: ACCENT, bh: 0.56 });

  arrowR(s, 6.6, yB + 0.47, 0.34);

  card(s, { x: 7.06, y: yB, w: 2.5, h: hB });
  boxText(s, { x: 7.06, y: yB, w: 2.5, t: "Modern Java", b: "compiles · passes the\ntests you wrote", bh: 0.56 });

  // the wall
  s.addShape(pres.ShapeType.rect, { x: 9.86, y: yB - 0.22, w: 0.34, h: hB + 0.44,
    fill: { color: INK }, line: { color: INK, width: 0 } });
  s.addText("VERIFICATION", { x: 8.72, y: yB + hB + 0.28, w: 2.62, h: 0.26, margin: 0,
    fontFace: BODY, fontSize: 10, bold: true, charSpacing: 1.4, color: INK, align: "center" });

  card(s, { x: 10.5, y: yB, w: 2.21, h: hB, fill: WHITE, line: HAIR, dash: "dash" });
  boxText(s, { x: 10.5, y: yB, w: 2.21, t: "Production", tc: FAINT, b: "never reached", bc: FAINT });

  card(s, { x: M, y: 4.18, w: CW, h: 1.06, fill: PANEL_2 });
  s.addText("Can anyone prove the new program behaves identically to the old one?", {
    x: M + 0.32, y: 4.34, w: CW - 0.64, h: 0.34, margin: 0,
    fontFace: HEAD, fontSize: 20, bold: true, color: INK });
  s.addText(
    "No specification was ever written. The rules live only inside the code, and the engineers who put them there have retired. The tolerance for difference is zero.",
    { x: M + 0.32, y: 4.72, w: CW - 0.64, h: 0.42, margin: 0, fontFace: BODY, fontSize: 12.5, color: TEXT });

  card(s, { x: M, y: 5.46, w: CW, h: 1.22, fill: ACCENT_L, line: ACCENT });
  s.addText('"the resulting code cannot be trusted to correctly translate the original code"', {
    x: M + 0.32, y: 5.62, w: CW - 0.64, h: 0.4, margin: 0,
    fontFace: HEAD, fontSize: 18, bold: true, italic: true, color: ACCENT });
  s.addText(
    "IBM Research, on the testing framework for IBM's own watsonx Code Assistant for Z (arXiv:2504.10548). If the vendor cannot trust its own output without validation, no bank can.",
    { x: M + 0.32, y: 6.06, w: CW - 0.64, h: 0.44, margin: 0, fontFace: BODY, fontSize: 12, color: TEXT, lineSpacing: 16 });

  s.addNotes(
    "The quote is verbatim from the paper's abstract, checked word for word. Do not paraphrase it as 'IBM says its product " +
    "does not work' — the paper's point is that validation is necessary, which is our point too.\n\n" +
    "Be generous to the incumbents here. Claiming to have invented differential verification would lose a Cognizant " +
    "mainframe judge in one sentence."
  );
}

// ======================================================== 4 · EXTRACTION FAILS
{
  const s = pres.addSlide();
  kicker(s, "WHY THE OBVIOUS APPROACH FAILS");
  heading(s, "Pointing an AI at the COBOL is not enough", { size: 33 });

  s.addText(
    "The intuitive move is to ask a language model to explain the business rules. The output looks excellent, clean and confident and well organised. And a meaningful share of it is wrong.",
    { x: M, y: 1.6, w: CW, h: 0.58, margin: 0, fontFace: BODY, fontSize: 14, color: TEXT, lineSpacing: 20 });

  const bigs = [
    { n: "62%", l: "precision of the best published\nCOBOL rule extractor", sub: "A-COBREX, ICSE 2025", c: INK, f: PANEL },
    { n: "91.2%", l: "of business rules successfully\nextracted by a 2026 system", sub: "AgentModernize, arXiv 2605.17535", c: INK, f: PANEL },
    { n: "<20%", l: "behavioural equivalence reached\nby that same system", sub: "baselines scored 0.0%", c: ACCENT, f: ACCENT_L },
  ];
  const bw = 3.98, bg = 0.2;
  bigs.forEach((b, i) => {
    const x = M + i * (bw + bg);
    card(s, { x, y: 2.32, w: bw, h: 2.0, fill: b.f, line: i === 2 ? ACCENT : null });
    s.addText(b.n, { x: x + 0.26, y: 2.44, w: bw - 0.52, h: 0.8, margin: 0,
      fontFace: HEAD, fontSize: 44, bold: true, color: b.c });
    s.addText(b.l, { x: x + 0.26, y: 3.26, w: bw - 0.52, h: 0.58, margin: 0,
      fontFace: BODY, fontSize: 12, color: TEXT, lineSpacing: 16 });
    s.addText(b.sub, { x: x + 0.26, y: 3.88, w: bw - 0.52, h: 0.28, margin: 0,
      fontFace: BODY, fontSize: 10, italic: true, color: MUTED });
  });

  arrowR(s, 8.5, 3.2, 0.4, ACCENT);

  card(s, { x: M, y: 4.6, w: CW, h: 1.92, fill: INK });
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
  heading(s, "A deterministic pipeline, with the AI on a short leash", { size: 29.5 });

  s.addShape(pres.ShapeType.rect, { x: 9.42, y: 0.44, w: 0.15, h: 0.15, fill: { color: PANEL }, line: { color: HAIR, width: 1 } });
  s.addText("deterministic", { x: 9.65, y: 0.36, w: 1.2, h: 0.3, margin: 0, fontFace: BODY, fontSize: 10, color: MUTED });
  s.addShape(pres.ShapeType.rect, { x: 10.98, y: 0.44, w: 0.15, h: 0.15, fill: { color: ACCENT_L }, line: { color: ACCENT, width: 1 } });
  s.addText("bounded LLM call", { x: 11.21, y: 0.36, w: 1.5, h: 0.3, margin: 0, fontFace: BODY, fontSize: 10, color: MUTED });

  const yA = 1.5, hA = 0.86, wA = 2.7;
  const xs = [M, 3.68, 6.74, 9.8];

  card(s, { x: xs[0], y: yA, w: wA, h: hA, fill: WHITE, line: INK, lw: 1.5 });
  boxText(s, { x: xs[0], y: yA, w: wA, t: "COBOL source", ts: 14, tOff: 0.28 });

  arrowR(s, 3.36, yA + 0.3, 0.26);

  card(s, { x: xs[1], y: yA, w: wA, h: hA });
  boxText(s, { x: xs[1], y: yA, w: wA, t: "0 · Intake gate", ts: 13.5, tOff: 0.12,
    b: "clock / DB / CICS detected?", bOff: 0.46, bs: 10 });

  arrowR(s, 6.42, yA + 0.3, 0.26);

  card(s, { x: xs[2], y: yA, w: wA, h: hA });
  boxText(s, { x: xs[2], y: yA, w: wA, t: "1 · Parse & slice", ts: 13.5, tOff: 0.12,
    b: "ProLeap AST → rule slices", bOff: 0.46, bs: 10 });

  arrowR(s, 9.48, yA + 0.3, 0.26);

  card(s, { x: xs[3], y: yA, w: wA, h: hA, fill: ACCENT_L, line: ACCENT });
  boxText(s, { x: xs[3], y: yA, w: wA, t: "2 · Extract rules", ts: 13.5, tOff: 0.12, tc: ACCENT,
    b: "+ line citations from the slice", bOff: 0.46, bs: 10, bc: ACCENT });

  line(s, xs[1] + wA / 2, yA + hA, 0, 0.36, MUTED);
  s.addText("REFUSED — non-deterministic, cannot be verified soundly", {
    x: 1.9, y: yA + hA + 0.34, w: 4.3, h: 0.26, margin: 0,
    fontFace: BODY, fontSize: 10, bold: true, color: MUTED, align: "center" });

  const yBb = 2.92;
  line(s, xs[3] + wA / 2, yA + hA, 0, 0.3, ACCENT);
  line(s, 7.15, 2.66, 4.0, 0, ACCENT);
  arrowD(s, 7.02, 2.66, 0.26, ACCENT);

  card(s, { x: M, y: yBb, w: CW, h: 0.82, fill: PANEL_2 });
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

  const yC = 4.16;
  arrowD(s, 6.6, yBb + 0.82, 0.26);

  card(s, { x: M, y: yC, w: CW, h: 1.12, fill: INK });
  s.addText("4 · Execute and compare, three ways", {
    x: M + 0.3, y: yC + 0.12, w: 4.6, h: 0.3, margin: 0,
    fontFace: BODY, fontSize: 13.5, bold: true, color: WHITE });
  s.addText("same input, three outputs", {
    x: M + 0.3, y: yC + 0.44, w: 4.6, h: 0.28, margin: 0,
    fontFace: BODY, fontSize: 10.5, italic: true, color: ON_DARK_2 });

  [
    { t: "Legacy COBOL", s2: "GnuCOBOL, the oracle" },
    { t: "Reimplementation", s2: "generated Java, untrusted" },
    { t: "RBI Direction", s2: "the third reference" },
  ].forEach((c, i) => {
    const x = 5.2 + i * 2.52;
    s.addShape(pres.ShapeType.roundRect, { x, y: yC + 0.2, w: 2.36, h: 0.72, rectRadius: 0.05,
      fill: { color: INK_3 }, line: { color: i === 2 ? ACCENT : INK_3, width: i === 2 ? 1.4 : 0 } });
    s.addText(c.t, { x, y: yC + 0.28, w: 2.36, h: 0.26, margin: 0,
      fontFace: BODY, fontSize: 11.5, bold: true, color: i === 2 ? ACCENT : WHITE, align: "center" });
    s.addText(c.s2, { x, y: yC + 0.54, w: 2.36, h: 0.24, margin: 0,
      fontFace: BODY, fontSize: 9.5, color: ON_DARK_2, align: "center" });
  });

  const yD = 5.78;
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
    card(s, { x, y: yD, w: ow, h: 0.78 });
    s.addText(o.t, { x: x + 0.16, y: yD + 0.1, w: ow - 0.32, h: 0.28, margin: 0,
      fontFace: BODY, fontSize: 12.5, bold: true, color: INK, align: "center" });
    s.addText(o.b, { x: x + 0.16, y: yD + 0.38, w: ow - 0.32, h: 0.28, margin: 0,
      fontFace: BODY, fontSize: 10, color: MUTED, align: "center" });
  });

  footnote(s, "Deterministic orchestration matches agentic accuracy at up to 3.5× lower token cost, with better worst-case robustness (arXiv 2605.09894), so the fixed pipeline is a defended choice, not a simplification.");

  s.addNotes(
    "The amber line is the reciprocal loop: extracted rules feed the input generator, and the differential run then catches " +
    "the extraction layer stating rules that are wrong. Neither half works alone.\n\n" +
    "The intake gate matters: the tool refuses programs it cannot verify soundly, with a reason, rather than producing a " +
    "confident wrong answer."
  );
}

// ================================================== 6 · THREE-WAY CONFORMANCE
{
  const s = pres.addSlide();
  s.background = { color: INK };
  kicker(s, "WHAT NOBODY ELSE DOES  ·  01", ON_DARK_2);
  heading(s, "We check the legacy against the regulator", { color: WHITE, size: 33 });

  s.addText(
    'Every tool on the market compares two things and treats the legacy as correct by definition. But "the legacy is its own oracle" is true for equivalence and false for correctness: a program written in 1987 can breach a Direction issued decades later.',
    { x: M, y: 1.54, w: CW, h: 0.62, margin: 0, fontFace: BODY, fontSize: 13, color: ON_DARK, lineSpacing: 18 });

  const yS = 2.26, hS = 0.76, wS = 3.6;
  [
    { t: "Legacy COBOL", b: "what the bank does today", key: false },
    { t: "Reimplementation", b: "generated Java, untrusted", key: false },
    { t: "RBI Master Direction", b: "daily product · nearest rupee · ₹1 lakh", key: true },
  ].forEach((o, i) => {
    const x = M + i * (wS + 0.44);
    s.addShape(pres.ShapeType.roundRect, { x, y: yS, w: wS, h: hS, rectRadius: 0.05,
      fill: { color: INK_2 }, line: { color: o.key ? ACCENT : INK_3, width: o.key ? 1.6 : 1 } });
    s.addText(o.t, { x, y: yS + 0.1, w: wS, h: 0.28, margin: 0,
      fontFace: BODY, fontSize: 13, bold: true, color: o.key ? ACCENT : WHITE, align: "center" });
    s.addText(o.b, { x: x + 0.1, y: yS + 0.4, w: wS - 0.2, h: 0.26, margin: 0,
      fontFace: BODY, fontSize: 10, color: ON_DARK_2, align: "center" });
    if (o.key) s.addText("OUR ADDITION", { x, y: yS - 0.28, w: wS, h: 0.24, margin: 0,
      fontFace: BODY, fontSize: 9, bold: true, charSpacing: 1.2, color: ACCENT, align: "center" });
  });

  line(s, M + wS / 2, yS + hS, 0, 0.28, "5A7590");
  line(s, M + wS + 0.44 + wS / 2, yS + hS, 0, 0.28, "5A7590");
  line(s, M + 2 * (wS + 0.44) + wS / 2, yS + hS, 0, 0.28, ACCENT);
  line(s, M + wS / 2, yS + hS + 0.28, 10.32, 0, "5A7590");
  arrowD(s, 6.54, yS + hS + 0.28, 0.24, "5A7590");

  s.addShape(pres.ShapeType.roundRect, { x: 4.9, y: 3.62, w: 3.55, h: 0.44, rectRadius: 0.05,
    fill: { color: INK_3 }, line: { color: INK_3, width: 0 } });
  s.addText("Same input, three outputs", { x: 4.9, y: 3.62, w: 3.55, h: 0.44, margin: 0,
    fontFace: BODY, fontSize: 13, bold: true, color: WHITE, align: "center", valign: "middle" });

  line(s, 6.67, 4.06, 0, 0.2, "5A7590");
  line(s, 2.08, 4.26, 9.18, 0, "5A7590");

  const cells = [
    { f: "L = R = Reg", h: "Verified compliant", b: "Nothing to do. What a sign-off is actually made of.", key: false },
    { f: "L ≠ R", h: "Translation defect", b: "The rewrite is wrong. The only cell a two-way tool sees.", key: false },
    { f: "L = R ≠ Reg", h: "Inherited breach", b: "Both agree, and both breach. Invisible to everyone else.", key: true },
    { f: "L ≠ R = Reg", h: "Silent correction", b: 'The rewrite "fixed" it. The books change at cutover.', key: false },
  ];
  const cwv = 2.92, cg = 0.15;
  cells.forEach((c, i) => {
    const x = M + i * (cwv + cg);
    line(s, x + cwv / 2, 4.26, 0, 0.2, "5A7590");
    arrowD(s, x + cwv / 2 - 0.13, 4.34, 0.2, "5A7590");
    s.addShape(pres.ShapeType.roundRect, { x, y: 4.6, w: cwv, h: 1.62, rectRadius: 0.06,
      fill: { color: c.key ? INK_3 : INK_2 },
      line: { color: c.key ? ACCENT : INK_3, width: c.key ? 2 : 1 } });
    s.addText(c.f, { x: x + 0.14, y: 4.72, w: cwv - 0.28, h: 0.26, margin: 0,
      fontFace: MONO, fontSize: 11.5, bold: true, color: c.key ? ACCENT : ON_DARK_2, align: "center" });
    s.addText(c.h, { x: x + 0.14, y: 5.02, w: cwv - 0.28, h: 0.3, margin: 0,
      fontFace: HEAD, fontSize: 15, bold: true, color: WHITE, align: "center" });
    s.addText(c.b, { x: x + 0.16, y: 5.38, w: cwv - 0.32, h: 0.74, margin: 0,
      fontFace: BODY, fontSize: 10.5, color: ON_DARK, align: "center", lineSpacing: 14 });
  });

  s.addText(
    "RBI Master Direction (Interest Rate on Deposits), 2016 — clause 6(a) daily product basis · 6(a)(1)–(2) uniform rate to ₹1 lakh, differential above · 4(f) rounded to the nearest rupee.",
    { x: M, y: 6.42, w: CW, h: 0.34, margin: 0, fontFace: BODY, fontSize: 10.5, italic: true, color: ON_DARK_2, align: "center" });

  s.addNotes(
    "The strongest claim in the deck, and it survived a deliberate falsification pass. Verified: Locksmith (arXiv 2607.28271) " +
    "has no regulatory checks; AgentModernize has none; EvolveWare markets rule extraction for auditors but is static " +
    "documentation with no execution.\n\n" +
    "Likely reason nobody built it: a migration product that tells you your current system is non-compliant is selling a " +
    "problem its customer did not ask about.\n\n" +
    "Wording discipline: say 'warrants a compliance review', never 'this is a breach'."
  );
}

// ============================================== 7 · TESTING THE TESTS
{
  const s = pres.addSlide();
  kicker(s, "WHAT NOBODY ELSE DOES  ·  02 AND 03");
  heading(s, "We test the rules, then we test the tests", { size: 32 });

  s.addText("When has a business rule actually been tested?", {
    x: M, y: 1.52, w: 7.4, h: 0.3, margin: 0, fontFace: BODY, fontSize: 13.5, bold: true, color: TEXT });
  s.addText("Executing a line is not testing the rule it encodes. Three checks, not one.", {
    x: M, y: 1.82, w: 7.4, h: 0.28, margin: 0, fontFace: BODY, fontSize: 11.5, color: MUTED });

  const gates = [
    { n: "1", t: "Reached", b: "did any input execute this rule's lines?", out: "if not: never exercised", key: false },
    { n: "2", t: "Discriminating", b: "did both sides of the boundary give different legacy outputs?", out: "if not: the rule is not in the program", key: true },
    { n: "3", t: "Agreed", b: "did the rewrite match the legacy every time?", out: "if not: a reproducible divergence", key: false },
  ];
  gates.forEach((g, i) => {
    const y = 2.22 + i * 1.06;
    card(s, { x: M, y, w: 5.5, h: 0.86, fill: g.key ? ACCENT_L : PANEL, line: g.key ? ACCENT : null, lw: 1.2 });
    s.addShape(pres.ShapeType.ellipse, { x: M + 0.2, y: y + 0.22, w: 0.42, h: 0.42,
      fill: { color: g.key ? ACCENT : MUTED }, line: { color: g.key ? ACCENT : MUTED, width: 0 } });
    s.addText(g.n, { x: M + 0.2, y: y + 0.22, w: 0.42, h: 0.42, margin: 0,
      fontFace: BODY, fontSize: 12, bold: true, color: WHITE, align: "center", valign: "middle" });
    s.addText(g.t, { x: M + 0.76, y: y + 0.12, w: 2.4, h: 0.28, margin: 0,
      fontFace: HEAD, fontSize: 15, bold: true, color: TEXT });
    s.addText(g.b, { x: M + 0.76, y: y + 0.4, w: 4.5, h: 0.4, margin: 0,
      fontFace: BODY, fontSize: 10.5, color: MUTED, lineSpacing: 13 });

    arrowR(s, 6.22, y + 0.3, 0.3, HAIR);
    s.addText(g.out, { x: 6.6, y: y + 0.22, w: 2.3, h: 0.44, margin: 0,
      fontFace: BODY, fontSize: 10.5, italic: true, color: MUTED, valign: "middle" });

    if (i < 2) arrowD(s, M + 2.62, y + 0.86, 0.2);
  });

  arrowD(s, M + 2.62, 5.3, 0.2);
  card(s, { x: M, y: 5.56, w: 5.5, h: 0.56, fill: PANEL_2 });
  s.addText("All three hold: the rule is confirmed by execution", { x: M, y: 5.56, w: 5.5, h: 0.56, margin: 0,
    fontFace: HEAD, fontSize: 14.5, bold: true, color: INK, align: "center", valign: "middle" });

  s.addText("How strong is that claim?", {
    x: 9.3, y: 1.52, w: 3.42, h: 0.3, margin: 0, fontFace: BODY, fontSize: 13.5, bold: true, color: TEXT });
  s.addText("We break the legacy on purpose and see if our inputs notice.", {
    x: 9.3, y: 1.82, w: 3.42, h: 0.3, margin: 0, fontFace: BODY, fontSize: 11.5, color: MUTED, lineSpacing: 14 });

  card(s, { x: 9.3, y: 2.22, w: 3.42, h: 0.62 });
  s.addText("Legacy COBOL, the oracle", { x: 9.3, y: 2.22, w: 3.42, h: 0.62, margin: 0,
    fontFace: BODY, fontSize: 12, bold: true, color: INK, align: "center", valign: "middle" });
  arrowD(s, 10.88, 2.9, 0.22);

  card(s, { x: 9.3, y: 3.18, w: 3.42, h: 0.92, fill: ACCENT_L, line: ACCENT });
  s.addText("Inject a deliberate defect", { x: 9.3, y: 3.26, w: 3.42, h: 0.26, margin: 0,
    fontFace: BODY, fontSize: 12, bold: true, color: ACCENT, align: "center" });
  s.addText("100000 → 100001   ·   > → >=\ndelete ROUNDED   ·   360 → 365", {
    x: 9.4, y: 3.54, w: 3.22, h: 0.48, margin: 0,
    fontFace: MONO, fontSize: 9.5, color: TEXT, align: "center", lineSpacing: 14 });
  arrowD(s, 10.88, 4.16, 0.22);

  card(s, { x: 9.3, y: 4.44, w: 3.42, h: 0.62, fill: PANEL_2 });
  s.addText("Re-run the same input corpus", { x: 9.3, y: 4.44, w: 3.42, h: 0.62, margin: 0,
    fontFace: BODY, fontSize: 12, bold: true, color: INK, align: "center", valign: "middle" });

  line(s, 10.05, 5.06, 0, 0.18);
  line(s, 11.95, 5.06, 0, 0.18);
  line(s, 10.05, 5.06, 1.9, 0);

  card(s, { x: 9.3, y: 5.3, w: 1.62, h: 0.82 });
  s.addText("Caught", { x: 9.3, y: 5.38, w: 1.62, h: 0.26, margin: 0,
    fontFace: BODY, fontSize: 11.5, bold: true, color: INK, align: "center" });
  s.addText("the claim\nstands", { x: 9.3, y: 5.64, w: 1.62, h: 0.42, margin: 0,
    fontFace: BODY, fontSize: 10, color: MUTED, align: "center", lineSpacing: 13 });

  card(s, { x: 11.1, y: 5.3, w: 1.62, h: 0.82, fill: PANEL_2 });
  s.addText("Missed", { x: 11.1, y: 5.38, w: 1.62, h: 0.26, margin: 0,
    fontFace: BODY, fontSize: 11.5, bold: true, color: INK, align: "center" });
  s.addText("we do not\nclaim it", { x: 11.1, y: 5.64, w: 1.62, h: 0.42, margin: 0,
    fontFace: BODY, fontSize: 10, color: MUTED, align: "center", lineSpacing: 13 });

  card(s, { x: M, y: 6.3, w: CW, h: 0.5, fill: INK });
  s.addText("A rule whose boundary makes no difference to the output has not been tested at all. That is our own AI, caught by our own harness.", {
    x: M, y: 6.3, w: CW, h: 0.5, margin: 0,
    fontFace: BODY, fontSize: 12.5, bold: true, color: WHITE, align: "center", valign: "middle" });

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
  heading(s, "Three artifacts it never had, and an honest claim", { size: 32 });

  const tiles = [
    { n: "47", l: "business rules extracted", key: false },
    { n: "31", l: "confirmed by execution", key: false },
    { n: "16", l: "not confirmed, and named", key: true },
    { n: "94%", l: "mutation kill rate", key: false },
  ];
  const tw = 2.92, tg = 0.15;
  tiles.forEach((t, i) => {
    const x = M + i * (tw + tg);
    card(s, { x, y: 1.56, w: tw, h: 1.14, fill: t.key ? ACCENT_L : PANEL, line: t.key ? ACCENT : null });
    s.addText(t.n, { x: x + 0.22, y: 1.62, w: tw - 0.44, h: 0.62, margin: 0,
      fontFace: HEAD, fontSize: 34, bold: true, color: t.key ? ACCENT : INK });
    s.addText(t.l, { x: x + 0.22, y: 2.24, w: tw - 0.44, h: 0.38, margin: 0,
      fontFace: BODY, fontSize: 11, color: TEXT });
  });

  card(s, { x: M, y: 2.86, w: 6.14, h: 1.5, fill: PANEL_2 });
  s.addText("DIVERGENCE, MINIMISED TO ONE CASE", { x: M + 0.24, y: 2.98, w: 5.66, h: 0.24, margin: 0,
    fontFace: BODY, fontSize: 9.5, bold: true, charSpacing: 1.4, color: MUTED });
  s.addText("balance ₹1,00,000.00 · 12 days · 3.5%", { x: M + 0.24, y: 3.24, w: 5.66, h: 0.26, margin: 0,
    fontFace: MONO, fontSize: 11, color: TEXT });
  s.addText("legacy → ₹115        rewrite → ₹116", { x: M + 0.24, y: 3.5, w: 5.66, h: 0.28, margin: 0,
    fontFace: MONO, fontSize: 12, bold: true, color: INK });
  s.addText("Rule R-07, line 214. The Java uses HALF_UP; the COBOL truncates at the PIC boundary.", {
    x: M + 0.24, y: 3.8, w: 5.66, h: 0.46, margin: 0, fontFace: BODY, fontSize: 10.5, color: TEXT, lineSpacing: 14 });

  card(s, { x: M + 6.32, y: 2.86, w: 6.14, h: 1.5, fill: ACCENT_L, line: ACCENT });
  s.addText("COMPLIANCE FINDING, NEEDS THE THIRD REFERENCE", { x: M + 6.56, y: 2.98, w: 5.66, h: 0.24, margin: 0,
    fontFace: BODY, fontSize: 9.5, bold: true, charSpacing: 1.4, color: ACCENT });
  s.addText("Legacy and rewrite agree. Both round to two decimals.", {
    x: M + 6.56, y: 3.24, w: 5.66, h: 0.26, margin: 0, fontFace: BODY, fontSize: 11.5, bold: true, color: TEXT });
  s.addText("RBI clause 4(f) requires rounding to the nearest rupee.", {
    x: M + 6.56, y: 3.52, w: 5.66, h: 0.26, margin: 0, fontFace: BODY, fontSize: 11.5, bold: true, color: ACCENT });
  s.addText("Not a migration defect. It has been running for forty years, and warrants a compliance review.", {
    x: M + 6.56, y: 3.8, w: 5.66, h: 0.46, margin: 0, fontFace: BODY, fontSize: 10.5, color: TEXT, lineSpacing: 14 });

  card(s, { x: M, y: 4.6, w: CW, h: 0.62 });
  s.addText(
    [
      { text: "Retained by the bank:   ", options: { bold: true, color: INK } },
      { text: "a specification  ·  a regression suite  ·  an evidence-backed equivalence claim", options: { color: TEXT } },
    ],
    { x: M + 0.3, y: 4.6, w: CW - 0.6, h: 0.62, margin: 0, fontFace: BODY, fontSize: 12, valign: "middle" });

  card(s, { x: M, y: 5.42, w: CW, h: 1.36, fill: INK });
  s.addText("Everyone proves the rewrite matches the legacy.\nWe also ask whether the legacy matches the regulator.", {
    x: M + 0.34, y: 5.54, w: CW - 0.68, h: 0.64, margin: 0,
    fontFace: HEAD, fontSize: 18, bold: true, color: WHITE, lineSpacing: 25 });
  s.addText(
    "The differential mechanism is prior art. IBM, AWS, Mechanical Orchard and a paper published five days ago all do a version of it, and we say so. Ours is the coverage reported per business rule including the rules we could not confirm, a score for our own test corpus, and the regulator as a third reference.",
    { x: M + 0.34, y: 6.22, w: CW - 0.68, h: 0.48, margin: 0, fontFace: BODY, fontSize: 11, color: ON_DARK, lineSpacing: 14 });

  footnote(s, "Figures illustrative, for a savings-interest accrual program. The first two artifacts hold their value even if the migration is never approved. Full sources and the competitive landscape are in the research dossier.");

  s.addNotes(
    "Close on the coverage numbers, not a promise: 'these sixteen we could not confirm, and we are telling you which ones.'\n\n" +
    "Of the 16 not confirmed, some were never exercised and some were contradicted by the evidence. If asked, that second " +
    "group is the interesting one: it is where our own extraction layer invented a rule that is not in the program.\n\n" +
    "If asked about Locksmith: arXiv 2607.28271, 30 July 2026. Same spine, legacy as oracle, both targets off-mainframe, " +
    "parity gate, 91.90% branch coverage. Verified: no business-rule reporting, no regulatory checks, and its mutations are " +
    "parity-preserving for path exploration, not fault injection for adequacy."
  );
}

pres.writeFile({ fileName: "Legacy_Banking_Modernisation_Platform_v5.pptx" })
  .then((f) => console.log("wrote", f));
