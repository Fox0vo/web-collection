# Web Collection Redesign Foundation

## 0. Research Log

### Observed reference facts

- Playwright captures inspected at 375px, 768px, and 1280px (`mchose-connect-375.png`, `mchose-connect-768.png`, and `mchose-connect-1280.png`) showed a 60px transparent header over an `rgb(230, 231, 237)` canvas.
- The reference centers sparse content inside a white panel with approximately 8-12px corner radii. Typography is sans-serif, one bright color carries actions, there is no visible shadow, and large whitespace isolates the product.
- The user-supplied device-card screenshot clarifies the selector anatomy: a pale neutral canvas holds large white, image-first cards with approximately 12px radii, near-black model titles, and compact factual metadata below the image. Fresh visual QA found the system coherent but the current captions and metadata too small and low-contrast.
- The captures also exposed a fixed/min-width 1440px responsive defect: narrow viewports show a desktop-width composition rather than a true reflow. That defect is evidence, not a behavior to copy.

### Adaptation decision

- This is an original, simpler adaptation of the reference's hierarchy: quiet blue-gray canvas, white product surfaces, sparse centered product imagery, restrained rounded geometry, and one action blue.
- The reference is not a pixel-clone contract. Do not copy MCHOSE's logo, exact blue, product copy, assets, proprietary icons, toolbar pattern, or defective fixed-width layout.
- Deliberate omissions: no wallpaper or media backgrounds, utility-icon toolbar clutter, theme switch, gradients, glass, shadows, glow, decorative motion, or dark mode.
- Existing audit: the project is static Astro with vanilla global CSS, a 4px spacing scale, semantic shared components, local optimized images, native disclosure/dialog behavior, and progressive enhancement. This redesign changes the documented and shared styling foundation without changing markup or route data.

## 1. Product Intent and Route Roles

Web Collection has two related visual roles, not one template stretched across every route:

| Route | Role | Content priority | Visual behavior |
| --- | --- | --- | --- |
| `/` | Blog/archive start page | Orient, summarize, and route into the collection | Reading-first hierarchy, archive-like modules, editorial cadence, and more visible text than product routes |
| `/gallery/` | Primary product showcase and device selector | Compare keyboard families and choose a model | Product-facing introduction, sparse controls, centered imagery, calm white product panels, and clear model actions |
| `/gallery/[model]/` | Full product detail and canonical fallback | Show every color and local image variant | Complete model information, anchored color sections, contained product images, and a reliable destination when enhancement is unavailable |
| `/showcase/` | Internal primitive proof | Verify shared primitives and states | `noindex`; demonstrates default, hover, active, focus, disabled, empty, long-copy, and responsive states before route-specific composition |

The home page keeps a blog/archive voice. Gallery and model pages adopt the simpler connect-device-inspired product-showcase grammar. Shared primitives bridge the roles through typography, color, spacing, and state consistency rather than forcing identical layouts.

## 2. Color Tokens

### Primitive and semantic palette

| Role | Token | Value | Contract |
| --- | --- | --- | --- |
| Canvas | `--color-canvas` | `#e9edf3` | Original, slightly darker neutral blue-gray page field |
| Surface | `--color-surface` | `#ffffff` | Primary panels and large model cards |
| Muted surface | `--color-surface-muted` | `#f5f7fa` | Inner product-image wells, quiet tags, and fallback contrast |
| Text | `--color-text` | `#161a22` | Near-black headings, body, and controls |
| Muted text | `--color-text-muted` | `#4e5a68` | Supporting copy and captions; remains AA-readable on canvas and surface |
| Border | `--color-border` | `#d8dee7` | Subtle surface and component boundaries |
| Strong border | `--color-border-strong` | `#99a5b3` | Controls and structural states requiring more definition |
| Accent | `--color-accent` | `#1d61d6` | Original action/link blue, intentionally not MCHOSE brand blue |
| Accent hover | `--color-accent-hover` | `#164da9` | Hover/pressed action state |
| Inverse text | `--color-inverse` | `#ffffff` | Text on accent or inverse surfaces |
| Inverse surface | `--color-inverse-surface` | `#161a22` | Existing footer and rare high-contrast utility surfaces |

Existing names (`--color-paper`, `--color-ink`, `--color-ink-soft`, `--color-caption`, `--color-rule`, `--color-rule-strong`, `--color-link`, and `--color-footer`) remain aliases so untouched styles stay valid. New work uses semantic names.

### Color rules

- The page canvas is neutral blue-gray; cards are white; their inner product-image wells use the lighter muted surface. Tonal contrast and borders provide separation, never shadow.
- Accent is functional: links, selected/action states, and focus. It is not a broad background decoration.
- Regular text and control states meet WCAG 2.2 AA: at least 4.5:1 for normal text and 3:1 for large text and non-text indicators.
- Raw colors belong only in `tokens.css`; component CSS consumes custom properties.

## 3. Typography

### Families

- All typography is local/system sans. No remote font requests are allowed.
- `--font-sans` uses the native UI stack, with CJK glyph fallback prioritizing `PingFang SC`, `Microsoft YaHei`, `Noto Sans CJK SC`, and compatible system sans.
- Existing family tokens (`--font-display`, `--font-reading`, `--font-ui`, and `--font-meta`) alias the same sans stack. Hierarchy comes from size, weight, and spacing rather than mixing serif and mono families.

### Restrained scale

| Role | Token | Size | Line height | Weight |
| --- | --- | --- | --- | --- |
| Display | `--type-display` | `clamp(2.5rem, 6vw, 4.75rem)` | tight | 600 |
| Page title | `--type-page-title` | `clamp(2.25rem, 5vw, 4rem)` | tight | 600 |
| Feature title | `--type-feature-title` | `clamp(1.75rem, 3.5vw, 2.75rem)` | tight | 600 |
| Story title | `--type-story-title` | `clamp(1.25rem, 2vw, 1.75rem)` | tight | 600 |
| Lead | `--type-lead` | `1.125rem` | body | 400 |
| Body | `--type-body` | `1rem` | body | 400 |
| UI | `--type-ui` | `0.9375rem` | UI | 600 |
| Meta | `--type-meta` | `0.875rem` | UI | 500 |

- Body text never drops below 16px. Text measures remain approximately 42-70ch for Latin-heavy prose.
- Headings use balanced wrapping. Chinese text uses `line-break: strict`, readable system CJK fonts, and phrase-safe wrapping; body copy receives no forced tracking.
- Labels use sentence case or restrained uppercase only when existing content already requires it. Avoid faux-technical mono styling.

## 4. Spacing, Geometry, and Responsive Layout

### Spacing and control contracts

- All intentional spacing derives from the retained 4px scale: `--space-1` (4px), `--space-2` (8px), `--space-3` (12px), `--space-4` (16px), `--space-6` (24px), `--space-8` (32px), `--space-12` (48px), `--space-16` (64px), and `--space-24` (96px).
- Page gutters remain 16px at 375px, 24px from 768px, and 48px from 1280px.
- Controls retain a 44px minimum block size. Focus uses a visible 2px accent outline with 4px offset.
- `--radius-sm` is 8px for controls, labels, and inner media; `--radius-md` is 12px for cards and panels. Do not introduce pills or larger ornamental radii.

### Fluid behavior

- The content frame remains `min(100% - 2 * var(--page-gutter), 1440px)`, but no child may establish a 1440px minimum width.
- At 375px: one fluid column, 16px gutters, product media fully contained, controls wrap without clipping, and primary content never scrolls horizontally.
- At 768px: layouts may use two columns where content supports comparison; text and product media retain flexible `minmax(0, 1fr)` tracks.
- At 1280px: whitespace increases, product imagery may take visual priority, and grids may expand without fixing the viewport or stretching reading measures.
- The implementation must genuinely reflow at 375/768/1280. The reference's fixed/min-width 1440px failure must never be reproduced.

## 5. Shared Primitives and States

### Figure

- Semantic `<figure>` with a stable aspect-ratio media well and selectable caption.
- Media wells are white or muted, 8-12px rounded, and separated by a subtle border or surface contrast only.
- `catalog-4x3` and `detail-landscape` keyboard imagery uses `object-fit: contain`. Detail-page and Lightbox photography remains fully contained and uncropped. Only `.model-entry` and `.model-dialog-figure` media may use a bounded, static no-clip zoom to trim baked-in source whitespace; the complete keyboard edges, legends, and switch callouts must remain visible.
- Meaningful images receive specific alt text; decorative imagery uses empty alt. Explicit image dimensions/aspect ratio reserve layout space.

### EditorialRibbon

- A quiet contextual label, not a black editorial banner: muted surface, accent text, 8px radius, compact sans label typography.
- Static only. Text remains selectable and meaning never relies on color alone.

### StoryTile

- Semantic article with one descriptive link, Figure, kicker, heading, and summary.
- Calm white 12px panel with subtle border and no elevation. The `lead`, `standard`, `compact`, and `numbered` markup contracts remain valid.
- Default: dark text and border. Hover: heading/action shifts to accent hover. Active: action color deepens without layout movement. Focus-visible: the shared 2px outline is unambiguous. Images never zoom or lift.
- Home uses StoryTile as an archive/story primitive; gallery may use the same structure as a product selector without changing markup.

### Gallery Card Selector

- Each brand remains a native expandable `<details>/<summary>` row. The row names the brand and model count; it does not imitate a device-status toolbar.
- When a brand is expanded, its models render as large white 12px cards. Each card has an image-dominant upper area containing the complete keyboard inside a light muted well, followed by a concise factual metadata area.
- The lower area uses a near-black model name as the primary label. Supporting metadata is limited to the brand, number of colorways, factual model summary, and a derived local-image count when useful.
- Never invent battery percentage, connection status, availability, performance claims, color swatches, or other data not present in the catalog. Do not add copied reference icons or decorative device telemetry.
- The card remains one clear canonical model link and retains its no-JavaScript fallback. Hover, active, and focus states follow StoryTile without interaction-triggered image zoom, lift, or shadow.

### TagList

- Wrapped list of compact 8px rounded labels using muted surface and subtle border.
- Default and empty states use readable muted text. Linked tags, if introduced through existing markup, use accent hover/focus and preserve a visible focus outline.
- Tags never communicate status only by color or shape.

### OutlineButton

- Native `<a>` or `<button>` with 44px minimum height, 8px radius, 2px accent border, white surface, and semibold sans label.
- Hover uses accent fill with inverse text; active uses accent hover. Focus-visible keeps the global 2px outline outside the component border. Disabled uses muted text/border, remains legible, and does not imply clickability.

### Existing interactive primitives

- SiteHeader remains semantically transparent/light and approximately one control-row high; no utility-icon toolbar is added.
- Brand Accordion remains native `<details>/<summary>` with complete no-JavaScript access to model links. Disclosure changes are instant.
- ModelDialog and Lightbox remain native `<dialog>` experiences. Escape/backdrop close, focus is managed and returned, controls are labelled, and image/panel changes are instant.
- Without JavaScript, gallery model links still reach canonical model routes, native details remain operable, and all route content and figures remain readable.

### Primitive Showcase

- `/showcase/` remains internal and `noindex`.
- It proves every shared primitive at 375px, 768px, and 1280px, including default, hover, active, keyboard focus, disabled, empty, long-copy/CJK, and reduced-motion states.

## 6. Motion and Interaction

| Contract | Token | Value | Use |
| --- | --- | --- | --- |
| Micro | `--motion-micro` | 150ms | Color and control feedback |
| Standard | `--motion-standard` | 240ms | Existing navigation state where retained |
| Entry | `--motion-entry` | 400ms | Existing non-critical progressive reveal contract only |
| Easing | `--ease-standard` | `cubic-bezier(0.16, 1, 0.3, 1)` | Existing transform/opacity transitions |

- Motion is restrained and functional. No decorative motion, parallax, animated or interaction-triggered image zoom, lift, animated shadow, or layout animation.
- Accordion, dialog, lightbox, and model/image changes are intentionally instant.
- Only `transform`, `opacity`, or bounded `filter` may animate; no width, height, position, margin, padding, or grid animation.
- Under `prefers-reduced-motion: reduce`, non-essential transition and animation duration becomes zero. Content and no-JavaScript fallbacks remain complete.

## 7. Surface and Depth

- Strategy: tonal separation plus borders, never elevation.
- Canvas is a slightly darker neutral blue-gray; primary content surfaces are white; inner image wells and labels use a lighter neutral muted surface so cards and products remain distinct without elevation.
- Cards and panels use 12px radii; controls and inner media use 8px. Nested boxes are minimized.
- No `box-shadow`, gradient, glass, blur, glow, wallpaper/media background, or dark-mode surface is permitted.
- Product photography supplies the only visual dimensionality. UI chrome remains calm and flat by intent.

## 8. Accessibility Constraints, Handoff, and Accepted Debt

### Constraints

- WCAG 2.2 AA target with logical source/tab order, semantic landmarks, full keyboard operation, visible 2px focus, and 44px controls.
- Focus must not be obscured by headers or dialogs. Dialog focus stays inside while open and returns to the invoker on close.
- Color is never the sole state indicator. Hover has a keyboard-equivalent focus state; disabled controls remain perceivable.
- Images reserve space, local optimized assets remain the source, and below-the-fold images may lazy-load without hiding content.
- CJK line breaks must avoid orphaned particles, detached short clauses, clipped glyphs, and forced letter spacing.
- Validate all routes and primitive states at 375px, 768px, and 1280px with no horizontal primary-content overflow.

### Implementation boundaries

- This foundation preserves Astro markup, selectors, data, routes, assets, native details/dialog/lightbox behavior, and static/no-JavaScript fallbacks.
- Future route-specific redesign work must extend this document before adding new tokens, variants, states, or motion.
- MCHOSE branding and proprietary materials remain out of scope; the adaptation must continue using project-owned content and original tokens.

### Accepted debt

- Route-specific layout files still carry the previous editorial compositions until subsequent scoped work migrates them. The aliases in `tokens.css` keep those surfaces coherent during transition.
- Some source images retain baked-in whitespace; the bounded `.model-entry` and `.model-dialog-figure` presentation exception compensates only on those listing surfaces until the assets are normalized.
- No accessibility debt is accepted for the shared primitives in this foundation.
