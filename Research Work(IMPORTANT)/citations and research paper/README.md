# Citations and Research Papers

Every source used to build this research dossier, organised for citation.

Compiled 4 August 2026. **Author lists and venues in `references.bib` and
`01` were verified individually against arXiv, conference and publisher pages
on 4 August 2026** — not written from memory. Where metadata could not be
verified, the entry is marked **`INCOMPLETE`** rather than guessed. Do not cite
an incomplete entry without confirming it first; a fabricated author list in a
bibliography is worse than a missing one.

---

## Files

| File | Contents |
|---|---|
| `references.bib` | BibTeX for everything with verified metadata. Drop straight into LaTeX or Zotero. Incomplete entries are in a clearly separated block at the bottom, commented out so they cannot silently enter a build. |
| `01 - Peer-reviewed and preprints.md` | The academic sources — full metadata, what each was used for in this dossier, and the specific finding taken from it. |
| `02 - Regulatory and legal sources.md` | RBI Master Directions with clause numbers, FCA/PRA enforcement, and the compliance context. |
| `03 - Vendor and industry sources.md` | IBM, AWS, Mechanical Orchard, Cognizant, TCS product documentation and analyst material. |
| `04 - Tools, standards and datasets.md` | GnuCOBOL, ProLeap, NIST CCVS85, CardDemo, Diffy — the things you would actually install or download. |
| `05 - Verified quotes.md` | Exact quotes checked word-for-word against the source, with a note on which are safe to reproduce in a deck. Use this rather than re-typing from memory. |
| `pdfs/` | **15 open-access PDFs, 17.3 MB**, downloaded 4 August 2026. Each verified to be a real PDF whose first page carries the expected title. See `pdfs/CONTENTS.md` for the inventory and a priority reading order. |

---

## What is here and what is not

**Here:** complete bibliographic records, stable URLs, DOIs and arXiv IDs,
verified quotes, and a note against each source saying what it was used for and
how much weight it can bear.

**Also here:** `pdfs/` — the 15 open-access source documents themselves, 17.3 MB.

**Not here:** the paywalled sources. COBRAIN, the metamorphic testing survey and
the hallucination study sit behind the ACM Digital Library; the version of
record of the oracle problem survey is on IEEE Xplore (an open preprint is in
`pdfs/`). Check whether OUTR has institutional access — the abstracts and every
figure cited in this dossier are available without it.

Downloading the PDFs paid for itself twice: **four incomplete BibTeX entries
were completed** from the papers' own title pages, and **RBI's 2025 FAQ
confirmed that the 2025 Direction renumbered its paragraphs**, so the 2016
clause references genuinely do not carry over. Details in `pdfs/CONTENTS.md`.

---

## Confidence key, carried over from `../06 - Sources.md`

- **A** — primary source: a regulator, a standards body, a peer-reviewed paper
  or preprint, or vendor documentation about that vendor's own product.
- **B** — reputable secondary reporting.
- **C** — vendor marketing or content-marketing blog. Directionally useful,
  numerically soft. **Do not put a C-rated number on a slide.**

Anything marked **[contested]** in `../01 - Problem Research.md` traces to a
C-rated source or to a figure that could not be tracked to an origin. The
workforce statistics and the "95% of ATM swipes" claim are the main ones.

---

## Citation style

The competition has not specified one. Defaults that would be uncontroversial:

- **IEEE numeric** — standard for a computing submission, and what a Cognizant
  reviewer would expect.
- **ACM** — if you write this up as a paper later.

`references.bib` uses standard BibTeX types (`@article`, `@inproceedings`,
`@misc`) so either style renders from the same file. Every entry carries a
`note` field recording the access date, because several of these sources —
particularly the vendor pages and the AWS product naming — have already changed
under us once during this research. See `../07 - Verification Pass.md §C6`.
