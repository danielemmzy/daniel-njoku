# V2 redesign research brief

## Scope and route map

| Source | Local destination | Content and owner |
| --- | --- | --- |
| `https://daniel-njoku.vercel.app/` | `/` | Daniel Njoku portfolio. Existing Vite app, images, résumé, project data, links, work history, testimonials, and EmailJS contact submission. |
| `https://www.ssannishittu.pro/` | Design reference for `/` | Single-page product designer portfolio. Use its visual system and interaction patterns with Daniel’s own content and assets. |

The original portfolio remains available on `main`; this redesign lives on the separate `v2-redesign` branch. Existing V1 section modules are left in place in this branch for reference. The new route is composed from `src/v2/PortfolioV2.jsx`, with the content model in `src/v2/data.js` and page styling in `src/v2/portfolio-v2.css`.

## Reference observations

- **Page order:** fixed compact nav; oversized editorial hero; looping skills marquee; featured work; about and proof points; four-step process; chronological experience; testimonial; toolkit; contact form; footer. The local version adds a toolkit section using Daniel’s existing skill data and retains his testimonial carousel.
- **Visual system:** the first V2 pass used warm beige paper; the motion polish replaces it with cool mineral-sage `#e8efed`, a deeper sage surface `#dce6e3`, forest-charcoal ink `#182220`, muted slate-sage `#53615f`, persimmon orange `#ff5a1f`, and softened chartreuse `#d5ed7d`. Dark mode uses green-black `#151c1a`, raised surface `#202a27`, and pale mint text `#eef3ef`.
- **Typography:** Inter Tight for display/body, Instrument Serif for italic contrast, and JetBrains Mono for small labels and section numbering. The Latin font subsets are stored locally in `public/fonts/`.
- **Layout:** content capped around 1440px with fluid horizontal gutters; large asymmetric two-column hero; editorial section headings; image-led work cards; thin rules and generous vertical spacing. At narrow widths the hero and work cards stack, the navigation becomes a menu, and experience detail moves below its role.
- **Observed interactions from supplied screenshots:** a progressive blur on the hero while scrolling; two bold, diagonal skill bands crossing beneath it; a pinned horizontal project reel with a progress rule; a process curve that changes as scroll progresses; and expandable experience rows with plus/minus states. A supplied contact screenshot also shows the reference's dark contact panel.
- **V2 interaction implementation:** a branded GSAP preloader reveals a short progress line then exits as a curtain; the hero stays sharp until its final scroll-out phase, where text and photo blur together; all main sections soften with scroll progress only in their final exit range and restore on reverse scroll. The paired skills marquees loop in opposite directions and pause on hover; the desktop project reel advances horizontally with page scroll and releases after the final card; mobile/reduced-motion layouts show a normal project list; GSAP shapes the process SVG curve as you scroll; experience roles expand/collapse by click and keyboard; project images retain a subtle hover zoom. The light/dark toggle remains available in the fixed navigation.
- **Inspection limit:** the screenshots supplied by the user give representative visual states across the page, and the earlier source HTML/CSS inspection informed the existing brief. A fresh direct browser open through the web tool was unavailable, so live source interaction and exact same-viewport pixel comparisons could not be verified. The local screenshots in `screenshots/` document the V2 preview only.

## Daniel’s assets and existing functionality

| Source asset / behavior | V2 use |
| --- | --- |
| `/projects/profilephoto.jpg` | Hero and about portrait |
| `/projects/health101.png`, `vivid_gen.png`, `pred_form.png`, `1.png`, `herobg2.jpg` | Five project cards, in the order represented by the existing portfolio |
| `/projects/DannysResumeAi.pdf` | Downloadable résumé links |
| Existing GitHub and LinkedIn profile URLs | Hero and footer links |
| Existing EmailJS service/template/public-key environment variables | Contact form submit and success/failure feedback; direct-email fallback when config is absent. The ignored local `.env` is present in this worktree for preview. |
| Inter Tight, Instrument Serif, JetBrains Mono | Local font subsets in `public/fonts/`, with SIL Open Font License copies alongside them |
| Existing experience and testimonial records | V2 experience list and interactive testimonial carousel |

GSAP was added for the requested preloader and scroll-linked motion. No backend service was added. The contact form continues to call the existing EmailJS integration. I verified the form’s implementation and validation markup but did not send a test email.

## Local ownership

- `src/App.jsx`: V2 entry point.
- `src/v2/PortfolioV2.jsx`: page sections, GSAP preloader and scroll-linked effects, accordion experience, menu/theme controls, reveal observers, carousel, and EmailJS contact form.
- `src/v2/data.js`: skills, existing project/experience/testimonial content, and the engineering process copy.
- `src/v2/portfolio-v2.css`: responsive visual system, motion, and reduced-motion treatment.
- `src/index.css`, `index.html`: stylesheet entry, page metadata, and title.
- `public/fonts/`: local reference typefaces used under their respective font licenses.
