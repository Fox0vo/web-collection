# Web Collection Design System

## 0. Research Log

- Embedded references: shortlisted Notion, WIRED, and Claude. Selected the restraint of `minimalist-skill.md` with WIRED's paper-and-rule editorial grammar, adapted into an original product collection without copied branding, logo, or copy.
- UI/UX Pro Max: queried `editorial product image gallery` with balanced variance, subtle motion, and standard density. Applied the verified focus, keyboard navigation, responsive-image, and static-Astro guidance.
- Stack research: Astro guidance confirms static `.astro` components and optimized local imagery through `astro:assets`; responsive image sources are used when art direction is needed.
- Lazyweb: skipped because the design references above establish the required editorial grammar without copying a live product screen.
- Imagen drafts: skipped because image-generation tooling is unavailable in this session; the first version uses original locally generated SVG artwork and image geometry as the visual contract.

## 1. Atmosphere & Identity

Web Collection is a quiet product journal: a paper-white reading surface where products are introduced as visual stories rather than sales units. Its signature is the **print spread**: square photography, black editorial rules, mono section labels, and large serif titles in asymmetric image-and-prose compositions. It should feel like a useful magazine catalogue, not a storefront or a SaaS dashboard.

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

- Chrome uses only paper, ink, grays, and link blue. Product artwork supplies any additional color.
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
| Story title | `--type-story-title` | `clamp(1.45rem, 2.2vw, 2.1rem)` | `1.12` | Product story heading |
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

### Figure

- Structure: semantic `<figure>` with responsive image, fixed aspect-ratio wrapper, caption.
- Variants: `hero-16x9`, `story-4x3`, `detail-portrait`, `detail-landscape`.
- Accessibility: explicit width/height or aspect ratio reserves layout space; decorative artwork uses empty alt; meaningful imagery uses specific alt.

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

- Motion communicates navigation and state; Lightbox changes are intentionally instant, and motion is never ornamental.
- Only `opacity`, `transform`, and carefully bounded `filter` animate. Width, height, margin, position, and layout grids never animate.
- IntersectionObserver may reveal non-critical story modules; all content remains visible if JavaScript is unavailable.
- Under `prefers-reduced-motion: reduce`, non-essential transitions stop and menu states render immediately; Lightbox states are already instant.

## 7. Depth & Surface

### Strategy: Rules, Not Elevation

- Rectangular surfaces use `border-radius: 0`.
- No box shadows, gradients, glass effects, glow, rounded cards, or floating panels.
- Separation uses white space, a `1px` quiet rule, a `1px` ink structural rule, or a `2px` ink interactive border.
- Black fill is reserved for ribbons and the footer. Product images, not UI chrome, provide dimensional depth.

## 8. Accessibility Constraints & Accepted Debt

### Constraints

- WCAG 2.2 AA target: full keyboard navigation, logical visual/tab order, semantic landmarks, visible focus, and 44px preferred touch controls.
- Focus must not be hidden by fixed navigation or dialogs; use scroll padding where a persistent header exists.
- Images reserve their size to prevent layout shift, while below-the-fold images load lazily.
- Every route has a unique title, language metadata, description, and canonical URL once deployment host is configured.
- Meaningful image alternatives describe the product/material/composition rather than repeat nearby text. Decorative SVG art is explicitly marked decorative.

### Accepted Debt

| Item | Location | Why accepted | Owner / Exit |
| --- | --- | --- | --- |
| Initial product imagery is original local SVG artwork rather than photography | Gallery seed content | No licensed product photography was supplied | Replace per product entry when licensed assets are available |
