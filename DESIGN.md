# Web Collection Design System

## 0. Research Log

- Embedded references: shortlisted Notion, WIRED, and Claude. Selected the restraint of `minimalist-skill.md` with WIRED's paper-and-rule editorial grammar, adapted into an original product collection without copied branding, logo, or copy.
- UI/UX Pro Max: queried `editorial product image gallery` with balanced variance, subtle motion, and standard density. Applied the verified focus, keyboard navigation, responsive-image, and static-Astro guidance.
- Stack research: Astro guidance confirms static `.astro` components and optimized local imagery through `astro:assets`; responsive image sources are used when art direction is needed.
- Lazyweb: skipped because the design references above establish the required editorial grammar without copying a live product screen.
- Imagen drafts: skipped because image-generation tooling is unavailable in this session; the catalog now uses the supplied local keyboard front-image inventory as its visual contract.

## 1. Atmosphere & Identity

Web Collection is a quiet keyboard catalog: a paper-white reading surface where real models and color variants are indexed rather than sold. Its signature is the **print spread**: front-view product photography, black editorial rules, mono section labels, and large serif titles in asymmetric image-and-prose compositions. It should feel like a useful magazine catalogue, not a storefront or a SaaS dashboard.

## 2. Color

### Palette

| Role | Token | Value | Usage |
| --- | --- | --- | --- |
| Paper | `--color-paper` | `#ffffff` | Page canvas and cards |
| Ink | `--color-ink` | `#18181b` | Headings, rules, controls |
| Ink soft | `--color-ink-soft` | `#45454d` | Long-form body text |
| Caption | `--color-caption` | `#73737d` | Metadata and captions |
| Rule | `--color-rule` | `#d9d9df` | Quiet separators |
| Rule strong | `--color-rule-strong` | `#18181b` | Editorial boundaries and buttons |
| Link | `--color-link` | `#057dbc` | Text-link hover and focus accent only |
| Inverse | `--color-inverse` | `#ffffff` | Text on the footer/ribbon |
| Footer | `--color-footer` | `#18181b` | Inverted footer and section ribbons |

### Rules

- Chrome uses only paper, ink, grays, and link blue. Keyboard imagery supplies any additional color.
- `--color-link` never becomes a decorative fill or a broad page background.
- No raw color values appear in components; all components consume these tokens.
- Contrast meets WCAG 2.2 AA: 4.5:1 for regular text and 3:1 for large text and non-text indicators.

## 3. Typography

### Families

- Display serif: `Iowan Old Style`, `Palatino Linotype`, `Book Antiqua`, serif.
- Reading serif: `Source Serif 4`, `Georgia`, serif.
- UI sans: `Arial`, `Helvetica Neue`, sans-serif.
- Metadata mono: `SFMono-Regular`, `Consolas`, `Liberation Mono`, monospace.

### Scale

| Role | Token | Size | Line height | Usage |
| --- | --- | --- | --- | --- |
| Display | `--type-display` | `clamp(3rem, 8vw, 6.5rem)` | `0.98` | Home and feature titles |
| Page title | `--type-page-title` | `clamp(2.5rem, 6vw, 5rem)` | `1.02` | Gallery title |
| Feature title | `--type-feature-title` | `clamp(2rem, 4vw, 3.5rem)` | `1.05` | Lead story |
| Story title | `--type-story-title` | `clamp(1.45rem, 2.2vw, 2.1rem)` | `1.12` | Model card heading |
| Lead | `--type-lead` | `1.25rem` | `1.55` | Page introduction |
| Body | `--type-body` | `1rem` | `1.65` | Article prose |
| UI | `--type-ui` | `0.875rem` | `1.3` | Navigation and links |
| Meta | `--type-meta` | `0.75rem` | `1.35` | Kicker, date, image caption |

### Rules

- Mono metadata is uppercase with `0.1em` tracking; product names and prose never use mono.
- Headlines use display serif with slightly negative tracking; reading text uses the reading serif.
- Chinese text may use the browser's CJK serif fallback. Do not force letter spacing in body copy; use `text-wrap: pretty` with `line-break: strict` on headings and reading text, plus narrowly scoped no-wrap phrase spans where needed.
- Body text never falls below 16px, and a readable article measure stays between 42ch and 70ch where Latin text is dominant.

## 4. Spacing & Layout

### Base Unit

All intent spacing derives from 4px.

| Token | Value | Usage |
| --- | --- | --- |
| `--space-1` | 4px | Kicker-to-title |
| `--space-2` | 8px | Inline metadata |
| `--space-3` | 12px | Caption spacing |
| `--space-4` | 16px | Mobile gutter |
| `--space-6` | 24px | Story gaps |
| `--space-8` | 32px | Module padding |
| `--space-12` | 48px | Editorial section gap |
| `--space-16` | 64px | Desktop module gap |
| `--space-24` | 96px | Major page break |

### Layout Rules

- Content frame: `min(100% - 2 * var(--page-gutter), 1440px)` with `--page-gutter` of 16px at 375px, 24px at 768px, and 48px at 1280px.
- Desktop at 1280px: 12-column editorial grid with 24px gutters. The gallery uses one lead span plus an intentionally uneven secondary column, separated by hairline rules.
- Tablet at 768px: two-column story flow; nav is condensed; feature story remains visually dominant.
- Mobile at 375px: one reading column; all image/story pairs stack in source order; navigation remains fully keyboard reachable; no horizontal primary-content scroll.
- Squares and 4:3/16:9 image ratios are semantic image treatments, not arbitrary decorative boxes.

## 5. Components

### SiteHeader

- Structure: `<header><a brand><nav><a route links></nav><button menu></button></header>`.
- States: default, hover, keyboard focus, active route, mobile menu open.
- Accessibility: semantic `<nav aria-label="主导航">`, 44px minimum touch targets, visible 2px focus outline, Escape closes mobile menu, focus returns to trigger.
- Motion: opacity and transform only; menu entry is disabled under reduced motion.

### EditorialRibbon

- Structure: black rectangular label with white uppercase mono text.
- States: static only.
- Accessibility: text remains selectable; never encodes essential meaning by color alone.

### StoryTile

- Structure: `<article><a><figure><img><figcaption></figure><p kicker><h2><p deck></a></article>`.
- Variants: `lead`, `standard`, `compact`, `numbered`.
- States: default, link hover, visible focus, active.
- Accessibility: a single descriptive link target, non-empty image alt text, headline remains useful when image fails.
- Motion: text color and underline only; images do not zoom, lift, or gain shadows.
- Catalog usage: props remain content-agnostic so brand/model records can supply the link, kicker, title, summary, and resolved local image metadata.

### Figure

- Structure: semantic `<figure>` with responsive image, fixed aspect-ratio wrapper, caption.
- Variants: `hero-16x9`, `story-4x3`, `catalog-4x3`, `detail-portrait`, `detail-landscape`.
- Accessibility: explicit width/height or aspect ratio reserves layout space; decorative artwork uses empty alt; meaningful imagery uses specific alt.
- Keyboard treatment: `catalog-4x3` and `detail-landscape` use `object-fit: contain` so the complete front view remains visible.

### Brand Accordion

- Structure: four vertically stacked native `<details data-brand-section>` elements; each `<summary>` contains the brand index, heading, model count, and disclosure mark, followed by that brand's model-link grid.
- States: collapsed on initial catalog entry, expanded, and summary focus-visible. A matching `#brand-<slug>` hash opens only its target accordion as progressive enhancement.
- Accessibility: native summary keyboard behavior is preserved, the complete summary is a 44px minimum target, and every model remains a real link to its canonical model page when JavaScript is unavailable.
- Motion: disclosure state changes are instant. The model grid never animates height, position, or layout.

### ModelDialog

- Structure: one native `<dialog>` for the catalog, with one hidden panel per model. The active panel contains a model heading, every color, every switch or official-image variant as a `Figure` with caption, a close control, and a full-page fallback link.
- States: closed or open with exactly one model panel visible.
- Accessibility: model links are progressively enhanced as openers; the dialog receives the matching model panel, Escape and backdrop close it, focus moves to the close control on open, and focus returns to the invoking model link on close. Dialogs are never nested.
- Motion: opening, closing, and model-panel changes are instant with no transient animation.

### Color Sections

- Model page: one anchored `<section id="color-<slug>">` per color; every local image variant is visible inside its color section without client-side filtering.
- Multi-image colors: each switch or official-image variant is named in selectable text and its figure caption.

### TagList

- Structure: semantic list of small text links or spans.
- States: default, interactive hover/focus where linked, and a visible caption/mono empty state.
- Accessibility: tags never convey status solely by shape or color.

### TextLink and OutlineButton

- Structure: native `<a>` and `<button>` only.
- States: default, hover, active, focus-visible, disabled when applicable.
- Accessibility: visible focus is never removed; 44px target for button controls; text links preserve an underline on hover and focus.

### Lightbox

- Structure: native `<dialog>` with image, caption, previous, next, and close buttons.
- States: closed and open; the current image may change while open.
- Accessibility: click is optional; Enter/Space opens, Escape closes, left/right navigate, focus stays within the dialog, opener receives focus on close, controls are labelled, and focus cannot sit behind the dialog.
- Motion: the dialog appears, closes, and switches images instantly with no transient animation.

### SiteFooter

- Structure: inverted footer with concise route links and project note.
- States: link hover/focus.
- Accessibility: dark surface maintains AA contrast; route links retain visible focus.

### Primitive Showcase

- Route: `/showcase`, excluded from indexing.
- Shows all components and their keyboard, hover, active, long-text, empty, and mobile states before production screens are composed.

## 6. Motion & Interaction

| Type | Token | Duration | Easing | Usage |
| --- | --- | --- | --- | --- |
| Micro | `--motion-micro` | 150ms | `ease-out` | Link, button press |
| Standard | `--motion-standard` | 240ms | `cubic-bezier(0.16, 1, 0.3, 1)` | Menu |
| Entry | `--motion-entry` | 400ms | `cubic-bezier(0.16, 1, 0.3, 1)` | Story reveal |

- Motion communicates navigation and state; Brand Accordion, ModelDialog, and Lightbox state changes are intentionally instant, and motion is never ornamental.
- Only `opacity`, `transform`, and carefully bounded `filter` animate. Width, height, margin, position, and layout grids never animate.
- IntersectionObserver may reveal non-critical story modules; all content remains visible if JavaScript is unavailable.
- Under `prefers-reduced-motion: reduce`, non-essential transitions stop and menu states render immediately; Brand Accordion, ModelDialog, and Lightbox states are already instant.

## 7. Depth & Surface

### Strategy: Rules, Not Elevation

- Rectangular surfaces use `border-radius: 0`.
- No box shadows, gradients, glass effects, glow, rounded cards, or floating panels.
- Separation uses white space, a `1px` quiet rule, a `1px` ink structural rule, or a `2px` ink interactive border.
- Black fill is reserved for ribbons and the footer. Keyboard images, not UI chrome, provide dimensional depth.

## 8. Accessibility Constraints & Accepted Debt

### Constraints

- WCAG 2.2 AA target: full keyboard navigation, logical visual/tab order, semantic landmarks, visible focus, and 44px preferred touch controls.
- Focus must not be hidden by fixed navigation or dialogs; use scroll padding where a persistent header exists.
- Images reserve their size to prevent layout shift, while below-the-fold images load lazily.
- Every route has a unique title, language metadata, description, and canonical URL once deployment host is configured.
- Meaningful image alternatives describe the product/material/composition rather than repeat nearby text. Decorative SVG art is explicitly marked decorative.

### Accepted Debt

- None for the local catalog migration. The supplied inventory is copied into `src/assets/keyboards/`, and runtime pages contain no remote image or source-attribution URLs.
