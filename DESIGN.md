---
name: Syed Abdul Rahman Al-Haddad Portfolio
description: Soft-white engineering portfolio with ocean-blue fields, coral actions, and a physical portrait pass.
colors:
  ground: "#f6f9fb"
  surface: "#e7f0f4"
  paper: "#ffffff"
  ink: "#163844"
  soft-ink: "#466673"
  accent: "#075d78"
  coral: "#c05241"
  inverse-ink: "#f6f9fb"
  project-press: "#d9e8ee"
typography:
  display:
    fontFamily: "Archivo, sans-serif"
    fontSize: "clamp(3rem, 2rem + 5vw, 7.25rem)"
    fontWeight: 650
    lineHeight: 0.96
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Archivo, sans-serif"
    fontSize: "clamp(2.5rem, 1rem + 4.1vw, 5rem)"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Archivo, sans-serif"
    fontSize: "clamp(1.5rem, 1rem + 1.4vw, 2.5rem)"
    fontWeight: 600
    lineHeight: 1.12
    letterSpacing: "-0.03em"
  lead:
    fontFamily: "Archivo, sans-serif"
    fontSize: "clamp(1.375rem, 1rem + 1vw, 2rem)"
    fontWeight: 420
    lineHeight: 1.4
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Archivo, sans-serif"
    fontSize: "clamp(1rem, .96rem + .16vw, 1.125rem)"
    fontWeight: 420
    lineHeight: 1.6
  action:
    fontFamily: "Archivo, sans-serif"
    fontSize: "clamp(1rem, .96rem + .16vw, 1.125rem)"
    fontWeight: 550
    lineHeight: 1.6
  label:
    fontFamily: "Archivo, sans-serif"
    fontSize: ".875rem"
    fontWeight: 420
    lineHeight: 1.6
  contact-display:
    fontFamily: "Archivo, sans-serif"
    fontSize: "clamp(2.5rem,7.8vw,7rem)"
    fontWeight: 500
    lineHeight: 1.04
    letterSpacing: "-0.035em"
rounded:
  square: "0"
  pill: "999px"
  pass: "18px"
  pass-mobile: "14px"
  portrait: "10px"
  portrait-mobile: "6px"
spacing:
  gutter: "clamp(20px, 4.4vw, 72px)"
  section: "clamp(80px, 9vw, 144px)"
  compact: "8px"
  icon-gap: "12px"
  inset: "18px"
  inline: "20px"
  block: "24px"
  content: "28px"
  group: "32px"
  wide: "36px"
  gallery: "40px"
  major: "64px"
  subsection: "80px"
components:
  button-primary:
    backgroundColor: "{colors.coral}"
    textColor: "{colors.paper}"
    typography: "{typography.action}"
    rounded: "{rounded.pill}"
    padding: "14px 22px"
  button-primary-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  button-primary-active:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.paper}"
  filter:
    backgroundColor: "{colors.ground}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "10px 16px"
  filter-selected:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "10px 16px"
  filter-hover:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
  marquee-toggle:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "8px 12px"
  navigation-link:
    textColor: "{colors.ink}"
    typography: "{typography.label}"
  project-record:
    backgroundColor: "{colors.ground}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.square}"
  project-summary:
    backgroundColor: "{colors.ground}"
    textColor: "{colors.ink}"
    typography: "{typography.title}"
    rounded: "{rounded.square}"
    padding: "30px"
  project-record-alternate:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
  project-summary-active:
    backgroundColor: "{colors.project-press}"
    textColor: "{colors.ink}"
  text-link:
    textColor: "inherit"
    typography: "{typography.action}"
  tool-item:
    textColor: "{colors.ink}"
    typography: "{typography.body}"
  portrait-pass:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pass}"
    padding: "18px"
    width: "min(300px, 80%)"
  portrait-pass-back:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.paper}"
    rounded: "{rounded.pass}"
    padding: "18px"
  contact-email:
    textColor: "{colors.paper}"
    typography: "{typography.contact-display}"
---

# Design System: Syed Abdul Rahman Al-Haddad Portfolio

## Overview

**Creative North Star: "The portrait pass"**

Soft-white space, ocean-blue fields, and coral actions frame a substantial Archivo voice. The existing portrait becomes a suspended pass with a real tether, direct manipulation, and a reversible face. This descriptive label records the implemented, owner-requested lanyard; it does not imply a new metaphor workshop or approved image comp.

The surrounding page stays open and readable. Rounded controls act within flat, square records; actual project screens, an authored architecture diagram, owner photographs, and genuine tool logos provide the visual evidence. This document records the finished implementation in `styles.css`, `index.html`, and `script.js`; product facts remain in `PRODUCT.md`.

**Key Characteristics:**

- Soft-white and paper-white reading surfaces with ocean text and coral action accents.
- One locally hosted variable typeface with fluid display and body roles.
- A physical portrait pass whose shadow, tether, and spring express suspension.
- Pill controls alongside square, independently expandable project records.
- Genuine local imagery and brand logos, with static and reduced-motion reading paths.

## Colors

The frontmatter preserves the source CSS palette; ocean and coral have distinct jobs within cool, pale reading surfaces.

### Primary

- **Ocean blue** (`accent`): experience/contact backgrounds, selected filters, pass reverse, front cord, and selection background. It also marks project results and title hover.

### Secondary

- **Coral** (`coral`): the primary work action, current-navigation underline, and the pass front's identity details and lower edge.

### Neutral

- **Soft white** (`ground`): page ground, hero, biography, recognition, unselected filters, and the first project record.
- **Cool surface** (`surface`): logo rail, toolkit, alternate project records, alternating award rows, and unselected filter hover.
- **Paper white** (`paper`): work field, pass front, and text/icons on ocean fields. Screen text selection pairs paper with ocean.
- **Deep ocean ink** (`ink`): default text, headings, icons, and the primary action's pointer-hover state.
- **Muted ocean ink** (`soft-ink`): supporting descriptions, dates, technical stacks, and image captions on pale fields.
- **Inverse alias** (`inverse-ink`): retained source custom property, currently equal to the ground; implemented ocean fields explicitly use paper text.
- **Pressed record** (`project-press`): immediate project-summary press feedback.

**The Ocean Field Rule.** Experience and contact pair ocean backgrounds with paper text, icons, and inherited focus outlines; selection reverses that pair.

The pass hardware adds the source's dark cord back, stitched seam, and metal clip locally; these material details are not a general accent palette. The sidecar's synthesized eight-step ramps are swatch references, not additional screen colors. Print substitutes white, near-black, and light gray.

## Typography

**Display Font:** Archivo, with sans-serif fallback.
**Body Font:** Archivo, with sans-serif fallback.

The Latin variable font is served from `assets/fonts/archivo-latin-variable.woff2` with `font-display: swap`, supported weights (100–900), and supported stretch (62%–125%). The roles are fluid rather than a fixed modular ratio. The frontmatter records observed default roles; components adjust weight, line height, and width as described below.

### Hierarchy

- **Display:** two name lines use the display role and slightly condensed width (93%). Each line clips its optional entry movement with vertical breathing room (0.035em). At the tablet breakpoint its size is `clamp(3rem, 1.5rem + 5vw, 6rem)`; at the phone breakpoint it is `clamp(2.75rem, 1.6rem + 7vw, 4.5rem)`. Text can wrap further when enlarged.
- **Headline:** section headings use the headline role with balanced wrapping. The smaller logo-rail heading uses the lead size, medium weight (500), and line height (1.3).
- **Title:** project names use the title role; phone records use the mobile lead size. Pass identity is smaller (1.375rem, weight 650, line height 1.15), becoming (1.0625rem) on phones.
- **Lead:** introduction and biography use the lead role. Role, toolkit, education, and recognition headings share its size with their observed weights (420–600) and line heights (1.2–1.4). Phone lead size is fixed (1.375rem).
- **Body:** running text uses the body role. Story, biography, and experience copy stay within a reading measure (65ch).
- **Action:** primary and underlined supporting actions use the body size with a stronger weight (550).
- **Label:** dates, captions, stack summaries, filters, and footer use the label role. Navigation becomes (1rem) on phones; compact résumé/pass notes use (0.8125rem).
- **Contact display:** the email uses the contact role with two block lines and word-break opportunities. At the phone breakpoint it uses the headline size and narrower width (90%).

**The One Family Rule.** Use the locally hosted Archivo weight and width axes for hierarchy, retaining the sans-serif fallback and native text semantics.

## Layout

Fluid side gutters and section padding come from the `gutter` and `section` tokens. Section fields span the document. At wide screens (1800px and above), the main padded regions center their content within an observed maximum span (1660px). Header side padding also respects safe-area insets; contact bottom padding respects the bottom inset.

The opening grid pairs introduction and actions with the suspended pass (1.1fr / 1fr). Its minimum height follows the viewport through `min(760px, calc(100svh - 92px))`. Section headings and the contact lead use a wider title column (1.25fr / 0.75fr); project bodies use a media/story grid (1fr / 0.85fr). Education and leadership use three columns, certificates use two, and biography pairs portrait/copy (0.8fr / 1.2fr). Project records are separated by a compact gap (12px), while subsections share the larger spacing token.

- **Tablet and narrower (1000px):** keep the two-column hero, reduce the pass, stack media-based project bodies, and use two columns for education/leadership. The project summary's metadata column narrows (155px).
- **Phone and narrower (700px):** introduction/actions precede a compact pass; section, biography, experience, toolkit, certificate, and contact grids stack. Enhanced navigation opens below the header through a menu button; without JavaScript the links remain visible. Project metadata sits below its title with a separate indicator column (44px). Award rows become year/title/result grids while preserving table semantics.
- **Large text:** running text wraps, pass height grows with its content, the stage is remeasured, and contact spans permit additional breaks. The default document does not depend on clipped overflow to hide page width.

The logo collection wraps statically by default. Only JavaScript plus a no-preference motion setting turns it into a repeated horizontal track. Portraits preserve their observed crops; project images retain their actual source proportions or the source's documented media frame.

## Elevation & Depth

Most surfaces are flat and distinguished by color, spacing, and type. The suspended portrait pass alone carries a material shadow; its rotation, clip, stitched cord, and reversible face explain its depth. The stage uses perspective (1100px) and an isolated stacking context. Project records, controls, certificates, and content fields carry no shadows.

### Shadow Vocabulary

- **Suspended pass:** `box-shadow: 0 24px 48px rgba(22,56,68,.18)` belongs to the draggable object.

**The Suspended Depth Rule.** Keep material shadow on the suspended pass; related reading surfaces use the implemented flat tonal hierarchy.

## Shapes

Primary actions, project filters, and the rail control use pill rounding. Project records, section fields, screenshots, certificates, and the biography portrait remain square. The pass uses its own rounded shell and inset portrait corners; the phone shell and portrait use the smaller corresponding tokens. This difference distinguishes an object that can be picked up from the surrounding reading surfaces. The metal clip has local rounded cutouts, rather than becoming a general container shape.

## Components

### Actions and navigation

The primary action is a coral pill with paper text, an inline arrow, the recorded padding, and a minimum height (54px). Fine-pointer hover changes it to deep ocean ink; press changes it to ocean. Supporting links are underlined, have an icon gap (12px), and keep a minimum target height (44px). Global SVG icons are (22px) with rounded strokes (1.7); the source supplies inline symbol paths rather than glyph icons.

Navigation is text-led, with a coral underline for the current section. All actionable links, buttons, and summaries use a visible outline (`3px solid currentColor`, offset `6px`). Fine-pointer hover adds or thickens underlining where implemented. Links, menu, filters, and rail control give immediate press opacity (0.8); the primary action retains full opacity and changes color. When motion is allowed, primary/menu/filter press feedback scales to (0.97).

### Filters and project records

Filters are pale pills with an explicit ocean/paper selected state, `aria-pressed`, and a live result count. They appear only after enhancement; without JavaScript the full project list is available. Filters have a minimum height (44px), the frontmatter padding, and narrower phone side padding (12px).

Six native disclosures expand independently; the first begins open. Summary records alternate ground and cool-surface fills, show an ocean title on hover, and use the dedicated pressed-record fill. Desktop summaries use a title, metadata, and indicator grid with the frontmatter padding. Tablet padding becomes (26px 22px); phone padding becomes (24px 18px). Project bodies use (8px 30px 40px) on desktop and (0 18px 28px) on phones. Disclosure labels remain accessible when the compact layout visually hides them.

Pointer-triggered disclosure height is enhanced for (200ms) with the source ease-out curve; reversals start from the current height. Keyboard activation and reduced motion retain immediate native expansion. The chevron rotates with the open state, with its transition removed for keyboard focus.

### Portrait pass

The pass starts as a readable, disabled static front; enhancement enables its button and interaction hint only after the locally hosted Motion runtime is available. The default shell width is the recorded `portrait-pass` width, with minimum height `calc(224px + 12.5rem)`, top position (142px), and resting rotation (-5deg). Tablet uses width `min(270px,88%)`, top (122px), and minimum height `calc(196px + 12.5rem)`; phones use width (210px), top (58px), and minimum height `calc(104px + 12.5rem)`. Text growth remains possible.

Dragging preserves the grab offset, uses pointer capture, updates the attached cord, resists boundary overshoot, carries release velocity, and permits re-grabbing while settling. The source spring uses mass (1), stiffness (100), and damping (10). Vertical touch intent keeps native page scrolling; touch dragging moves the pass horizontally. Clicking/tapping flips the face, keyboard activation resets its position before flipping, and Escape restores the portrait. The nonvisible face is hidden from assistive technology. The optional flip lasts (500ms) with the source ease-in-out curve; keyboard focus makes the face change immediate.

The shallow hero scroll offset is bounded (-4px to 20px). Rendering and spring work stop when the pass is offscreen or the document is hidden. Reduced motion removes the initial settling movement, scroll travel, release spring, and animated flip while preserving direct interaction and readable states. Without JavaScript, the pass stays in normal flow as a static portrait with a static name hint.

### Tools and imagery

Genuine brand marks are served locally with visible text labels. The skills list uses compact marks (26px; 24px on phones); the rail uses larger marks (32px; 28px on phones). Label text supplies the accessible name and adjacent logo images use empty alternative text. The duplicate rail group is hidden from assistive technology.

The enhanced rail travels right to left over (42s), linearly and continuously. Hover, keyboard focus, an explicit pause/resume toggle, offscreen state, and document visibility pause it. Reduced motion and no JavaScript show the wrapping collection and hide the motion control.

Use the existing owner portrait, owner-supplied Khazanah pass and certificate photographs, actual SmartShopper screens rendered from the supplied poster, the real Gaffaly capture, and the authored investment-lakehouse diagram. `assets/media/sources.json` records media origin, treatment, and hashes; `assets/logos/sources.json` and the accompanying license record the Simple Icons collection (16.36.0) and individual sources. `assets/README.md` records portrait, diagram, font, and runtime provenance. No generated portrait or invented application screen is part of this system.

### Entrances and contact

Content is visible before enhancement. Optional name entries last (800ms), with a second-line delay (80ms); observed content, media, and portrait entries last (600ms). Copy rises and fades, project media reveals its lower clip while rising, and the biography portrait gently scales/rotates to rest. Intersection-triggered entries run once, and keyboard navigation or reduced motion skips them. Contact keeps an oversized wrapping email, inherited focus, and an optional fine-pointer arrow movement (5px right, 5px up; 200ms).

## Do's and Don'ts

### Do:

- **Do** preserve the soft-white, ocean-blue, and coral roles recorded in the frontmatter.
- **Do** use locally hosted Archivo, pill actions, square project records, and the fluid gutter and section tokens.
- **Do** reserve the material shadow for the physical pass and keep its tether, keyboard face state, and native touch-scroll intent intact.
- **Do** keep content visible by default, independent native disclosures, explicit filter states, visible focus, and static/reduced-motion alternatives.
- **Do** use genuine owner/project imagery and locally hosted brand marks with their recorded provenance and descriptive text.

### Don't:

- **Don't** carry the obsolete cobalt/sand palette or square action controls into new surfaces for this redesign.
- **Don't** turn the pass's shadow and rounded shell into a default treatment for reading surfaces.
- **Don't** make essential content depend on motion, JavaScript-only rendering, dragging, or a moving rail.
- **Don't** turn functional dates, captions, or table headers into an invented decorative label system.
- **Don't** treat generated color ramps, a separate Taste draw, or unavailable Impeccable checks as approved palette or seed authority.

Documentation evidence: the finish review found no material UI corrections; its final ship disposition covers the resolved provenance wording. Browser evidence covers five viewport sizes and 18 interaction groups; no actual-phone hardware test is claimed. Impeccable concept-seed and detector attempts exited 127 because the protected cache could not initialize; formal seed verification remains unavailable. These limits are not new design rules or canonized UI defects.
