---
name: Budget Buddy
description: A welcoming impulse-purchase check for people managing tight monthly cash flow.
colors:
  background: "oklch(1 0 0)"
  foreground: "oklch(0.145 0 0)"
  card: "oklch(1 0 0)"
  card-foreground: "oklch(0.145 0 0)"
  primary: "oklch(0.205 0 0)"
  primary-foreground: "oklch(0.985 0 0)"
  secondary: "oklch(0.97 0 0)"
  secondary-foreground: "oklch(0.205 0 0)"
  muted: "oklch(0.97 0 0)"
  muted-foreground: "oklch(0.556 0 0)"
  accent: "oklch(0.97 0 0)"
  accent-foreground: "oklch(0.205 0 0)"
  destructive: "oklch(0.577 0.245 27.325)"
  border: "oklch(0.922 0 0)"
  input: "oklch(0.922 0 0)"
  ring: "oklch(0.708 0 0)"
  spend-positive: "oklch(0.627 0.194 149.214)"
  spend-positive-soft: "oklch(0.982 0.018 155.826)"
  hold-negative-soft: "oklch(0.971 0.013 17.38)"
typography:
  display:
    fontFamily: "Geist, Arial, sans-serif"
    fontSize: "clamp(2.5rem, 7vw, 4.5rem)"
    fontWeight: 650
    lineHeight: 1
    letterSpacing: "0"
  headline:
    fontFamily: "Geist, Arial, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 650
    lineHeight: 1.2
    letterSpacing: "0"
  title:
    fontFamily: "Geist, Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0"
  body:
    fontFamily: "Geist, Arial, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0"
  label:
    fontFamily: "Geist, Arial, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.35
    letterSpacing: "0"
rounded:
  sm: "6px"
  md: "8px"
  lg: "10px"
  xl: "14px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  page: "clamp(24px, 5vw, 48px)"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    height: "32px"
    padding: "0 10px"
  button-icon:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    rounded: "{rounded.md}"
    height: "32px"
    width: "32px"
  card:
    backgroundColor: "{colors.card}"
    textColor: "{colors.card-foreground}"
    rounded: "{rounded.xl}"
    padding: "16px"
  input:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.lg}"
    padding: "6px 12px"
---

# Design System: Budget Buddy

## 1. Overview

**Creative North Star: "The Calm Checkout Pause"**

Budget Buddy should feel like the small breath before a purchase: practical, friendly, and clear enough to use while the user is already thinking about money. The current interface is compact and utility-led, with shadcn-style tokens, Geist typography, flat surfaces, and precise borders. Future brand work should keep that crispness while making the experience warmer and more memorable.

The system rejects shame-based finance, dense spreadsheet energy, bank-dashboard intimidation, credit-card upsells, and generic navy-and-gold money branding. The user is often stressed or cash-constrained, so the visual language should lower pressure, not raise it.

**Key Characteristics:**
- Friendly but crisp controls.
- Plain-language hierarchy with short labels and direct recommendations.
- Softly lifted surfaces, with depth used sparingly.
- Recommendation states that pair color with icons, copy, and structure.
- Compact density for the app surface, with more expressive room allowed on marketing surfaces.

## 2. Colors

The current palette is a restrained monochrome shadcn base with semantic green and red recommendation states; future brand work should tint neutrals warmer while preserving high contrast.

### Primary
- **Ink Button** (`oklch(0.205 0 0)`): The current primary action color. Use for the main send button and the strongest call to action.
- **Soft Paper Action Text** (`oklch(0.985 0 0)`): Text on primary actions. Keep contrast high and avoid pure white in future palette refinement.

### Secondary
- **Quiet Surface** (`oklch(0.97 0 0)`): Secondary, muted, and accent surfaces. Use for low-pressure UI areas, hover fills, and calm grouping.

### Tertiary
- **Spend Signal** (`oklch(0.627 0.194 149.214)`): Positive spending recommendation accent. Always pair with clear wording and an icon.
- **Hold Signal** (`oklch(0.577 0.245 27.325)`): Caution and error accent. Use for hold-off guidance, errors, and destructive states.

### Neutral
- **Clean Page** (`oklch(1 0 0)`): Current page and card background.
- **Reading Ink** (`oklch(0.145 0 0)`): Primary text.
- **Soft Border** (`oklch(0.922 0 0)`): Borders, dividers, input strokes, and card outlines.
- **Muted Copy** (`oklch(0.556 0 0)`): Secondary labels, helper text, and empty-state copy.
- **Focus Ring** (`oklch(0.708 0 0)`): Focus rings and strong field focus feedback.

### Named Rules

**The Dignity Signal Rule.** Green and red are never the only carriers of meaning. Recommendation states must include text, iconography, and layout distinction.

**The No Bank Costume Rule.** Do not drift into navy-and-gold finance branding, metallic gradients, or institutional dashboard colors.

## 3. Typography

**Display Font:** Geist, with Arial and sans-serif fallback
**Body Font:** Geist, with Arial and sans-serif fallback
**Label/Mono Font:** Geist Mono is available for technical debugging only, not as a brand voice

**Character:** Geist keeps the current app clear and direct. It should be treated as a plainspoken interface face: friendly through spacing, copy, and hierarchy rather than decorative type choices.

### Hierarchy
- **Display** (650, `clamp(2.5rem, 7vw, 4.5rem)`, 1): Marketing hero headlines only. Use when the page needs brand presence.
- **Headline** (650, `1.5rem`, 1.2): Section-level headings and strong empty-state messages.
- **Title** (600, `1rem`, 1.4): Compact panel titles, card headings, and form section labels.
- **Body** (400, `0.875rem`, 1.5): Main UI copy and recommendation reasoning. Keep line length around 65 to 75 characters.
- **Label** (500, `0.75rem`, 1.35): Field labels, helper copy, and metadata. Avoid excessive uppercase.

### Named Rules

**The Plain Read Rule.** If copy needs a second pass to understand, simplify the words before changing the layout.

## 4. Elevation

Budget Buddy is softly lifted: surfaces are mostly flat at rest, with depth carried by borders, spacing, tonal fills, and subtle state response. The current code does not define box-shadow tokens, so shadows should be introduced carefully and reserved for high-attention moments like focused input groups, recommendation panels, or marketing hero objects.

### Shadow Vocabulary
- **Soft Lift** (`box-shadow: 0 12px 30px oklch(0.145 0 0 / 8%)`): Optional future token for important panels, never for every card.
- **Focus Glow** (`box-shadow: 0 0 0 3px oklch(0.708 0 0 / 30%)`): Current focus behavior is ring-based. Use it for keyboard-visible control feedback.

### Named Rules

**The Earned Lift Rule.** A surface gets shadow only when it helps the user understand priority, state, or focus.

## 5. Components

### Buttons

Friendly but crisp: buttons are compact, rounded, and direct.

- **Shape:** Rounded medium corners (`8px` to `10px` depending on size).
- **Primary:** Ink Button background with Soft Paper Action Text. Default height is `32px`, with icon buttons fixed at `32px` square.
- **Hover / Focus:** Primary hover darkens by opacity. Focus uses a visible ring and border-color shift.
- **Secondary / Ghost / Link:** Secondary and ghost buttons rely on muted fills and subtle hover backgrounds. Link buttons use the primary text color with underline on hover.

### Cards / Containers

Cards are practical grouping surfaces, not decoration.

- **Corner Style:** Rounded extra large (`14px`, from Tailwind `rounded-xl`).
- **Background:** Clean Page or card background.
- **Shadow Strategy:** Flat by default; optional Soft Lift only for priority surfaces.
- **Border:** Soft Border on all current cards and panels.
- **Internal Padding:** `16px` for form cards and result panels, `12px` for the message input container.

### Inputs / Fields

Inputs should feel lightweight and forgiving.

- **Style:** Clean Page background, Soft Border stroke, `10px` radius, compact vertical padding.
- **Focus:** Border shifts to Focus Ring and adds a soft `2px` ring at 30% opacity.
- **Error / Disabled:** Error text uses Hold Signal. Disabled fields reduce opacity without changing layout.

### Navigation

The current shell uses a simple top header with a bottom border, compact title, and tiny descriptor. Future brand pages can be more expressive, but the app surface should keep navigation quiet and stable.

### Recommendation Panels

Recommendation panels are the signature component.

- **Spend:** Soft green-tinted background, green icon, and direct positive title.
- **Hold:** Soft red-tinted background, caution icon, and direct hold-off title.
- **Rule:** Use plain, non-shaming copy. Never rely on color alone.

## 6. Do's and Don'ts

### Do:

- **Do** keep the interface welcoming, simple, and personable.
- **Do** pair green/red recommendation colors with icons and explicit text.
- **Do** use compact cards and fields for app workflows, with `14px` card radius and `16px` internal padding.
- **Do** preserve WCAG AA contrast for all text and controls.
- **Do** make spending advice feel practical and kind: direct, calm, and never moralizing.
- **Do** use softly lifted depth only for priority, focus, or narrative emphasis.

### Don't:

- **Don't** make Budget Buddy feel like a bank dashboard, a dense budgeting spreadsheet, a credit-card upsell, or a shame-based finance coach.
- **Don't** use intimidating fintech polish, generic navy-and-gold money branding, or hustle-culture advice.
- **Don't** write copy that makes users feel irresponsible for wanting things.
- **Don't** rely on green and red alone to communicate spending recommendations.
- **Don't** use side-stripe borders, gradient text, decorative glassmorphism, hero-metric templates, or endless identical card grids.
- **Don't** use monospace as a lazy shorthand for finance, technical skill, or trust.
