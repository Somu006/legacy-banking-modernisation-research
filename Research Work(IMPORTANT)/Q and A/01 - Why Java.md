# 01 — Why Java?

**The question.** The pipeline reimplements the legacy COBOL in Java. Why Java
specifically, and not Python, C#, Go or anything else?

---

## The short answer

Two reasons, and both are already in `02 §3`:

1. **Java is the migration that actually exists.** Every piece of prior art we
   cite is COBOL→Java specifically. Verifying a different language pair would
   mean proving equivalence for a migration almost no bank is performing.
2. **Java is the only mainstream target that can reproduce COBOL's decimal
   arithmetic exactly**, because of `BigDecimal`.

Everything below is the evidence for those two claims.

---

## 1. The prior art is COBOL→Java, without exception

| What | Language pair | Where we cite it |
|---|---|---|
| IBM watsonx Code Assistant for Z | COBOL → Java | `03`, deck slide 6 |
| AWS Blu Age / Transform for mainframe | COBOL → Java | `03`, `01 §5` |
| IBM Research, *Automated Testing of COBOL to Java Transformation* | COBOL → Java | arXiv 2504.10548 — quoted on deck slide 3 |

The IBM Research paper we quote on the deck — *"the resulting code cannot be
trusted to correctly translate the original code"* — is **literally titled**
*Automated Testing of COBOL to Java Transformation*. Our headline piece of
evidence is about this exact language pair.

**Why that matters for positioning.** Slide 6 claims three things the shipping
vendors do not do. That comparison is only apples-to-apples if we are verifying
the same transformation they are. Switch to COBOL→Python and the vendors are no
longer a comparable baseline, and the strongest line in the deck weakens.

*(Note: COBOL→Python work does exist — Lwin & Kumar, arXiv 2605.09894, which we
cite for the deterministic-orchestration cost figure. It is research, not the
enterprise migration path.)*

---

## 2. Decimal arithmetic — the technical reason

This is the deeper answer, and the one worth giving a technical judge.

**COBOL money fields are exact decimal.** Financial fields are typically
`USAGE PACKED-DECIMAL` (`COMP-3`): each digit in 4 bits, trailing 4-bit sign
nibble. `PIC S9(7)V99 COMP-3` means precisely seven digits and two decimal
places, in base 10, with no representation error. That exactness is *why* COBOL
is used for money.

**Java is the documented partner for it.** Per `02 §3`:

- `BigDecimal`, with an explicit scale and an explicit `RoundingMode`, is the
  **documented legal partner** for zoned and packed decimal items in IBM's
  COBOL/Java interoperability documentation.
- Micro Focus COBOL uses `BigDecimal` **under the covers** when compiling COBOL
  to JVM bytecode.

So exact reproduction of COBOL arithmetic in Java is not a hope — it is the
documented, vendor-implemented mapping. No other mainstream target has that
standing.

**And Java also hands you the wrong tool.** IBM's own interoperability
documentation warns about `COMP-1`/`COMP-2` ↔ `double`/`float` conversions.
Binary floating point cannot represent 0.1 exactly, so money arithmetic in
`double` goes wrong invisibly.

---

## 3. Why this makes our demo bug realistic

The finding on deck slide 5 (₹115 vs ₹116) is not contrived. Java gives a
competent engineer both the correct instrument and the classic trap, and the
three ways to get it wrong are all documented in `02 §3`:

| Mistake | Consequence |
|---|---|
| Using `double` / `float` | Binary representation error; silent drift |
| `BigDecimal` with the wrong `RoundingMode` | `HALF_UP` where the legacy truncates — our demo case |
| `BigDecimal`, right mode, wrong *place* | Keeping full precision through a chain where the COBOL truncates at an intermediate store |

None of these produces a crash, an exception, or a compiler warning. They
produce a different number. That is precisely the failure class our harness
exists to catch, and it is only this rich *because* the target is Java.

Supporting evidence that silent cross-language semantic drift is real and not
hypothetical: arXiv 2605.02195 documents operator-semantics differences that
fail silently — the canonical case being modulo on negative operands, where
Python takes the divisor's sign while Java and C take the dividend's.

---

## 4. The honest caveat — have this ready

**The harness itself is language-agnostic.** It compiles both sides, runs them
on the same inputs, and diffs process outputs. Nothing in the pipeline depends
on the rewrite being Java — point it at Python or C# and the method is
unchanged.

So the correct framing for a judge is:

> Java because that is where the market is, not because the technique requires
> it. The verification method does not care what the target language is; we
> chose the target that banks are actually migrating to, so our results speak to
> a migration that is really happening.

Volunteering this is stronger than being caught by it — the same principle as
volunteering the GnuCOBOL conformance caveat (`04 §1`).

---

## Cross-references

- `02 §3` — COBOL decimal arithmetic, `BigDecimal`, the three failure modes
- `01 §5` — the translation-trust evidence, including the IBM quote
- `03`, `07` — the competitive landscape and what survived falsification
- Deck slides 3, 5 and 6 — where this material appears in the submission
