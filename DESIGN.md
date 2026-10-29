---
name: "Syed Abdul Rahman Al-Haddad Portfolio"
description: "A typographic portfolio for AI and data engineering work."
colors:
  ink: "#062b8a"
  soft-ink: "#304e91"
  ground: "#e6dbc7"
  surface: "#ddd0b9"
  paper: "#e9e7e1"
typography:
  display:
    fontFamily: "Archivo, sans-serif"
    fontSize: "clamp(76px, 16vw, 260px)"
    fontWeight: 850
    lineHeight: 0.88
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Archivo, sans-serif"
    fontSize: "clamp(2.625rem, 1rem + 4.8vw, 5.5rem)"
    fontWeight: 650
    lineHeight: 1
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Archivo, sans-serif"
    fontSize: "clamp(1.75rem, 0.9rem + 2.3vw, 3.25rem)"
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: "-0.025em"
  lead:
    fontFamily: "Archivo, sans-serif"
    fontSize: "clamp(1.375rem, 1rem + 1vw, 2rem)"
    fontWeight: 400
    lineHeight: 1.3
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Archivo, sans-serif"
    fontSize: "clamp(1rem, 0.96rem + 0.16vw, 1.125rem)"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Archivo, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.55
  contact-display:
    fontFamily: "Archivo, sans-serif"
    fontSize: "clamp(42px, 9.8vw, 155px)"
    fontWeight: 500
    lineHeight: 0.98
    letterSpacing: "-0.035em"
rounded:
  square: "0"
spacing:
  gutter: "clamp(20px, 2.25vw, 40px)"
  section: "clamp(88px, 10.4vw, 160px)"
  compact: "8px"
  icon-gap: "12px"
  inline: "20px"
  block: "24px"
  content: "28px"
  grid: "32px"
  wide: "36px"
  major: "64px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.ground}"
    typography: "{typography.body}"
    rounded: "{rounded.square}"
    padding: "14px 20px"
  button-primary-hover:
    backgroundColor: "{colors.soft-ink}"
    textColor: "{colors.ground}"
  filter:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.square}"
    padding: "10px 14px"
  filter-selected:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.ground}"
  filter-hover:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
  project-summary:
    backgroundColor: "{colors.ground}"
    textColor: "{colors.ink}"
    typography: "{typography.title}"
    rounded: "{rounded.square}"
    padding: "30px 28px"
  project-summary-alternate:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
  text-link:
    textColor: "inherit"
    typography: "{typography.body}"
  contact-email:
    textColor: "{colors.ground}"
    typography: "{typography.contact-display}"
---

# Design System: Syed Abdul Rahman Al-Haddad Portfolio

## Overview

**Creative North Star: "Type and nothing else"**

The recorded direction is expressed through Archivo variable type, cobalt ink, warm sand fields, and square controls. Oversized identity and contact type frame an engineering portfolio whose project index opens into specific results and architecture diagrams. The title is the direction label already recorded in the surface brief; no additional qualitative preference or comp approval is implied.

The implemented system is spacious at the section level and more compact within project records. Color inversion separates experience and contact; tonal changes organize the other fields. The existing portrait and three original architecture diagrams provide the visual evidence. This document describes the shipped rules observed in `styles.css`, `index.html`, `script.js`, and browser captures, with product facts maintained separately in `PRODUCT.md`.

**Key Characteristics:**

- One variable sans-serif family with strong changes in size, weight, and width.
- Cobalt text and controls across sand and chalk surfaces.
- Flat, square fields with hierarchy created by type, spacing, and tone.
- Native project disclosures, explicit filters, and progressive enhancement.
- Short state feedback and restrained, optional one-time entrances.

## Colors

Warm neutral fields support a single cobalt ink family; the frontmatter preserves the source CSS color values.

### Primary

- **Cobalt ink** (`ink`): body copy, headings, icons, primary actions, selected filters, and the inverted experience/contact backgrounds. The source aliases `accent` to this same color.
- **Soft cobalt** (`soft-ink`): technical-stack copy and the primary action's pointer-hover background.

### Neutral

- **Sand ground** (`ground`): the default page and project surface, and text on cobalt. The source aliases `inverse-ink` to this same color.
- **Deeper sand** (`surface`): the work field and alternating recognition rows.
- **Chalk** (`paper`): the skills field, alternating project records, and unselected filter hover.

**The Inverted Field Rule.** On the cobalt experience and contact fields, text, links, icons, and focus outlines inherit sand; selection reverses that pair.

The sidecar's eight-step color strips are generated reference ramps, not additional approved UI colors. Print explicitly substitutes white, near-black, and light gray for the screen palette.

## Typography

**Display Font:** Archivo, with sans-serif fallback.
**Body Font:** Archivo, with sans-serif fallback.

One self-hosted Latin variable font supplies weight and width variation. Its declaration supports weights (100–900) and stretch (62%–125%) with `font-display: swap`. The scale is fluid and role-based rather than a fixed modular ratio; frontmatter roles record defaults, with component-specific weights and line heights below.

### Hierarchy

- **Display:** two-line name, compressed to (82%) width. Each line is a block with clipping and small vertical padding (0.025em). At the mobile breakpoint, size becomes (15.8vw) and tracking becomes (-0.02em).
- **Headline:** section headings use the headline role, balanced wrapping, and a tight single-line-height rhythm.
- **Title:** project names use the title role and compressed width (85%). On mobile they use the mobile lead size.
- **Lead:** hero introduction, results, section subheadings, role names, skill categories, and recognition titles. At the mobile breakpoint the size is (1.375rem). Results increase weight to (600) and use line height (1.25); role and tertiary section headings use weight (550). The about introduction uses line height (1.35).
- **Body:** running copy inherits the body role. Project, experience, biography, and skill detail columns generally cap at (65ch); tablet project copy can reach (70ch).
- **Label:** dates, metadata, technical stacks, figure captions, file notes, table column headings, and footer copy use the label role. Navigation uses this size until mobile, where it becomes (1rem). Numeric counts and years use tabular figures where coded.
- **Contact display:** the two-line email uses expanded width (105%). On mobile it takes the headline size and compressed width (82%). Its arrow scales with the type (0.68em).

**The One Family Rule.** Use Archivo's observed weight and width axes for hierarchy; retain the existing sans-serif fallback and browser text semantics.

Heading text uses balanced wrapping and paragraphs use pretty wrapping. Ordinary links have underline thickness (1.5px) and offset (5px). Real recognition-table headers are functional labels; they do not establish a decorative eyebrow component.

## Layout

The viewport-wide layout uses the fluid gutter and section padding in frontmatter. At widths of (1800px) and above, major field padding also enforces a centered content region of (1720px). There is no general narrow card-grid container. The header includes safe-area horizontal padding and the contact field includes bottom safe-area padding.

The recurring two-column arrangement uses proportions (1.2fr / 0.8fr) for section headings, hero support, experience, and contact. Gaps vary by context: heading pairs use (32px); hero and experience use (64px). The biography uses (0.75fr / 1.25fr) with a fluid gap. Education, certifications, and leadership share a three-column arrangement (0.7fr / 1.3fr / 1fr) with a (36px) gap. Skill rows use (1.2fr / 1.8fr) with a (44px) gap.

The hero has its own vertical rhythm: header minimum height (88px); hero top/bottom padding (46px / 56px); internal gap (64px); and minimum height `min(820px, calc(100svh - 88px))`. This minimum is removed at the tablet breakpoint.

- **Tablet, max-width (1000px):** project visual/story columns stack, except text-only project bodies; diagrams cap at (640px). Main heading, experience, and contact pairs become equal columns. Education, certifications, and leadership become two columns with their heading spanning both.
- **Mobile, max-width (600px):** header minimum height becomes (80px), navigation expands below the wordmark, primary content grids become single-column, and project controls stack. Filters wrap with a (6px) gap and horizontal padding (12px). The portrait occupies (76%) width and caps at (390px) height. Education, certification, and leadership groups use top spacing (56px).
- **Recognition on mobile:** the semantic table remains a table in HTML, while rows render as a two-column grid (52px / remaining width). Column headings remain accessible but visually clipped; result copy occupies the second column.

Project graphics retain an aspect ratio of (16 / 11). The portrait uses (3 / 4), object fit `cover`, and focal position (50% 24%). At desktop it caps at (580px) height.

Print hides navigation, filter controls, and project expansion controls; it prints summaries with smaller headings and simplified spacing.

## Elevation & Depth

The interface uses no box shadows, gradients, translucent panels, or blur. Tonal fields, alternating project/recognition surfaces, and type scale establish grouping. Hover changes color or underline weight; it does not lift a surface. The focus outline is functional state feedback rather than elevation.

**The Flat Field Rule.** Continue the observed tonal hierarchy and square surfaces when adding a related section.

## Shapes

Controls and content fields use square corners. Native button borders are removed; the project index and recognition rows are separated by background tone and spacing. Regular icons are inline SVG strokes (22px square), with stroke width (1.7), rounded caps, and rounded joins. The email arrow uses a finer stroke (1.1). Graphic artwork has its own internal geometry and does not define new UI radii.

## Components

### Primary action

A solid, square link button carries the hero action. It uses the primary component tokens, body-size type at weight (550), minimum height (52px), and an icon gap (42px), reduced to (32px) on mobile. Fine-pointer hover uses soft cobalt; active press scales to (0.97). Transform transitions use (160ms) with the shared ease-out curve; background transitions use (160ms ease).

### Filter controls

Square buttons form a labelled group. Each has minimum height (44px); selection is exposed through `aria-pressed` and shown with cobalt fill and sand text. Unselected fine-pointer hover uses chalk; active press scales to (0.97). The live count uses `role="status"`, polite announcements, atomic updates, and tabular numbers. Filters are initially hidden and become available with JavaScript; native project content remains available without it.

### Project disclosure index

Each project is native `details`/`summary`, with title, description, metadata, and an explicit View/Close state. The first three start open. Desktop summaries use columns (remaining width / 210px / 46px), a (28px) gap, and the summary token padding. Tablet columns become (remaining width / 175px / 44px) with (20px) gaps and padding (28px 22px). Mobile summaries use (remaining width / 32px), padding (24px 18px), metadata below the title, and the state control spanning those rows.

Open bodies use columns (1fr / 0.85fr), padding (8px 28px 36px), and a fluid gap (28px–64px). Mobile bodies use padding (0 18px 28px). Alternate records use chalk. Fine-pointer hover underlines the title (2px thick, 7px offset). Expansion uses native behavior without a height animation. Deep links reveal the target and reset a filter that would conceal it.

### Text links

Inline links with SVG arrows or download marks have minimum height (44px), gap (12px), and weight (550). Pointer hover increases underline thickness to (3px). Download file metadata wraps onto its own line. External links preserve their new-tab announcement and `rel` attributes.

### Navigation

The wordmark pairs an (800) weight abbreviation with a (500) weight surname label. Header links have minimum height (44px), a desktop gap (32px), and an underline for both fine-pointer hover and `aria-current="location"`. Returning to the hero clears the current section state.

At mobile width the menu toggle occupies (44px square), displays an inline SVG menu/close icon, and manages `aria-expanded`. The navigation opens in document flow. Choosing a link closes it; Escape closes it and returns focus to the toggle; changing across the mobile breakpoint resets it. Without JavaScript, the navigation links stay visible.

### Recognition table

A semantic caption, scoped column headers, and scoped row headers preserve relationships. Column header padding is (14px 24px); body cells use (28px 24px). Odd body rows use deeper sand. The year column uses tabular figures, and award titles use lead typography. Mobile layout changes are described in Layout; the table labels remain real data headers.

### Contact field

Sand email text occupies two lines on cobalt. Link content includes an explicit full-address accessible label. The arrow moves (5px right, 5px up) on fine-pointer hover with a (200ms) ease-out transform. Supplemental links wrap on desktop and stack on mobile; the footer remains within this closing field.

### Focus and motion

All links, buttons, and summaries use a `:focus-visible` outline (3px solid current color, 6px offset). The skip link moves into view on focus, and its target main region accepts programmatic focus. Touch actions use `manipulation`; hover decoration is restricted to `(hover: hover) and (pointer: fine)`.

The shared easing is `cubic-bezier(0.23, 1, 0.32, 1)`. With no reduced-motion preference, the two name lines arrive from (75%) vertical translation over (800ms), with a (100ms) delay on the second. One-time diagram/email entrances take (480ms) with (12px) vertical movement; experience detail takes (420ms) with (10px) horizontal movement; the portrait takes (520ms) from scale (1.015). Content entrances start at opacity (0.9). They are observed at an intersection threshold (0.12), skipped during keyboard navigation, and leave content visible before JavaScript runs. Reduced motion suppresses those entrances and smooth scrolling; a changed preference cancels running animations. Short control-state transitions remain as implemented.

## Do's and Don'ts

### Do:

- **Do** keep cobalt and sand as the primary text/surface pair and use the recorded inverse pairing on cobalt fields.
- **Do** use Archivo's established type roles, square controls, and fluid section gutters.
- **Do** preserve native disclosure behavior, visible keyboard focus, accessible labels, and useful content without JavaScript.
- **Do** use actual project diagrams and the existing portrait with their source aspect ratios and descriptive alternative text.
- **Do** keep motion optional, brief, and limited to the observed state feedback and one-time entrances.

### Don't:

- **Don't** turn the functional table headers into a decorative eyebrow pattern.
- **Don't** introduce rounded cards, shadows, or blur as default treatments for these flat content fields.
- **Don't** hide essential project copy behind JavaScript-only rendering or animate disclosure height.
- **Don't** treat generated tonal ramps as an expanded approved palette.
- **Don't** describe the unavailable Impeccable engine, FORM gate, or detector as a successful check or a user-approved comp.

Documentation limitation: the Impeccable engine/cache could not initialize, so no successful FORM roll, detector result, or comp/seed approval exists. This scan records observed implementation rather than asserting those approvals. No known craft-floor defect is promoted into a reusable token; table headers are documented as functional semantics only.
