# 05 — Risks and Judge Questions

Cognizant is an organiser. Assume at least one person in the room has worked on
mainframe modernisation and knows the vendor landscape. These are the questions
that follow from that, with answers grounded in `01`–`04`.

---

## The eight questions that will actually be asked

### 1. "IBM watsonx Code Assistant for Z already validates COBOL against Java. AWS ships Blu Age Compare. What's new here?"

**The one to prepare hardest for.** See `03`.

> Correct — and we'd argue that's the strongest evidence our diagnosis is right,
> because IBM, AWS and Mechanical Orchard all independently converged on
> behavioural equivalence as the real deliverable. Three things differ. First,
> every one of those tools needs your mainframe: Blu Age Compare needs reference
> datasets from the mainframe, AWS Application Testing works by capturing and
> replaying mainframe traffic, Mechanical Orchard observes live production data
> flows, WCA4Z needs IBM Z. We need the source file and nothing else, because we
> generate our inputs instead of capturing them. Second, they report equivalence
> per test case; we report it per business rule — of 47 rules extracted, 31
> proven, 16 unproven, named. Third, that means we're usable at the decision
> stage, before a bank has selected a vendor or approved a budget. That's the
> stage most Indian institutions are actually stuck at.

Do not claim the mechanism is novel. Claim the deployment point and the unit of
reporting are.

### 2. "Your extraction layer is an LLM. How do you know the rules are right?"

> We don't, and that's the design. The best published COBOL rule extractor gets
> about 62% precision and 74% recall; the best LLM approach reports F1 around
> 0.73. We assume roughly a quarter of our rules are wrong. That's exactly why
> extraction isn't the deliverable. A rule only gets marked verified when
> execution confirms it — the differential run is what catches the extraction
> layer lying. And every rule carries the line numbers it came from, so a
> reviewer confirms or rejects it by reading three lines instead of four
> thousand.

### 3. "GnuCOBOL isn't IBM Enterprise COBOL. Doesn't that invalidate the whole thing?"

> For the demo, GnuCOBOL is the free stand-in that lets us run this on a laptop
> — it supports 19 dialects including an IBM-strict mode aligned to Enterprise
> COBOL 6.3, and it passes 9,700 of 9,748 NIST COBOL-85 conformance tests. But
> the methodology is compiler-agnostic. In a bank, you point the harness at the
> bank's own compiler and the architecture is unchanged, because the harness
> only needs to compile, execute and capture output. The compiler is a
> dependency, not an assumption.

### 4. "Interest accrual is a toy problem. What about a real core banking system?"

> Deliberately narrow, for a specific reason: differential testing needs
> determinism. Same input, same output, every run. Programs that read the system
> clock, hit DB2, or depend on CICS terminal state break that guarantee, so we
> exclude them — and the tool detects and refuses them at intake rather than
> silently producing an unsound verdict. Pure-computation programs are where the
> method is *sound*, not where it's easy. Interest accrual is also where the
> money is: RBI prescribes daily product basis and rounding to the nearest rupee
> for rupee deposits, so a rounding drift there is a Master Direction breach
> across the entire deposit book, not a bug report.

### 5. "How do you generate inputs good enough to find a real bug? Random inputs won't."

> Agreed, and we say so in the write-up — input quality caps everything. We
> don't generate randomly. The extracted rules tell us where the boundaries are.
> If a rule says a uniform rate applies up to one lakh and a differential rate
> above it, the generator emits 99,999, 1,00,000 and 1,00,001. If a rule
> involves rounding, we generate accruals that land on exact midpoints. If it
> involves dates, we generate 28 and 29 February, month ends, quarter ends. The
> `PIC` clauses give us the domain, sign and extremes for free. And when we find
> a divergence, we shrink it by delta debugging to a minimal counterexample, so
> the engineer gets one failing case, not four hundred.
>
> The scaling path is symbolic execution — that's what IBM's own testing
> framework for WCA4Z uses to generate unit tests from COBOL. We're not
> attempting that at this scale.

### 6. "What if the two programs agree on everything? Have you proved anything?"

> We've proved equivalence over the inputs we ran, and we say exactly that — no
> more. That's why the coverage table exists. If 16 rules were never exercised,
> we report 16 unproven rules by name. Practitioners doing dual-run migrations
> in banks make this point themselves: running two systems in parallel without
> rigorous reconciliation creates *false confidence*. Reporting what we didn't
> prove is what separates evidence from reassurance.

### 7. "Who buys this, and why wouldn't they just call Cognizant?"

> Many of them should, and this doesn't compete with a migration engagement — it
> precedes one. A regional or cooperative bank deciding *whether* modernisation
> is feasible can't start with an enterprise platform engagement. BCG puts the
> Indian core-banking upgrade bill at about a billion dollars, and Indian banks
> spend up to 5% of revenue on IT against 7–9% globally. The first artifact
> those institutions need is a specification and a regression suite for a system
> they currently can't touch — and they keep both even if they never migrate.
> That output makes a modernisation programme *scopeable*, which makes it
> sellable. It's an on-ramp, not a substitute.

### 8. "What's the hardest part, and what have you not solved?"

Answer this one straight; hedging costs more than the admission.

> Three things. Input generation quality caps everything — we can only verify
> rules we reach. Coverage instrumentation through GnuCOBOL's C backend is
> fiddly, and there's an open bug on recent Ubuntu; our fallback is
> paragraph-level tracing, which is coarser. And the extraction layer is
> genuinely unreliable — a quarter of its output is probably wrong, which is why
> it's a suggestion engine for the verifier rather than a deliverable. The thing
> we have *not* solved is proving a rule holds for all inputs. We prove it for
> the inputs we ran. That's differential testing, not formal verification, and
> we're not going to call it verification of the stronger kind.

---

## Risks to the project, ranked

| Risk | Severity | Mitigation |
|---|---|---|
| **Judge knows the vendor landscape and reads the pitch as unaware of it** | **High** | Lead with the landscape (`03 §5`). Naming IBM and AWS yourselves converts the objection into evidence of research depth. |
| Nothing is built; the deck promises a system that doesn't exist | High | Stages 0–2 of `04 §7` produce a working differential harness quickly. A running diff beats a perfect diagram. |
| gcov / GnuCOBOL coverage toolchain friction | Medium | Paragraph-level `DISPLAY` tracing fallback; `cobc -fgen-c-line-directives` for C→COBOL line mapping. |
| ProLeap is Java, rest of stack likely Python | Medium | Run ProLeap as a subprocess emitting JSON, or use a heuristic sectioniser (division/section/paragraph boundaries) for the demo. Don't let the parser become the project. |
| Demo COBOL written by the team → circular reasoning | Medium | Use `aws-samples/aws-mainframe-modernization-carddemo` as the primary target. Third-party code the team didn't write. |
| Contested statistics get challenged | Low-medium | `01` flags every soft figure. Use the defensible ones: 92 of top 100 banks; £48.65m TSB fine; BCG's $1bn; A-COBREX's 62%/74%. |
| Overclaiming "verification" in the formal-methods sense | Low-medium | Consistently say "evidence of equivalence over the executed input set." Never "proof of correctness." A judge with a formal methods background will pounce on the latter. |

---

## Three things to stop saying

1. **"Everyone else's submission assumes their AI is right."** True of the room,
   false of the market. Replace with the `03 §5` framing.
2. **"95% of ATM swipes run on COBOL."** Traces to a single press item. Use
   "92 of the world's top 100 banks run on mainframes" instead — same point,
   defensible.
3. **Anything phrased as "we invented" or "nobody does this."** Three vendors
   do. The originality is the rule-level verdict and the zero-dependency
   deployment, and those claims survive scrutiny.

## Three things to start saying

1. **"The industry converged on this independently — IBM Research's own paper on
   their translation product says the output cannot be trusted."** Quoting IBM
   against IBM's product is the strongest single line available.
2. **"RBI prescribes rounding to the nearest rupee on a daily product basis."**
   Concrete, Indian, regulatory, and it makes the rounding-bug demo land.
3. **"Of 47 rules extracted, 31 proven, 16 unproven — here are the 16."**
   The whole thesis in one sentence, and nothing surveyed does it.
