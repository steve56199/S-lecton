---
name: Academic Precision
colors:
  surface: '#f8f9fb'
  surface-dim: '#d9dadc'
  surface-bright: '#f8f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f4f6'
  surface-container: '#edeef0'
  surface-container-high: '#e7e8ea'
  surface-container-highest: '#e1e2e4'
  on-surface: '#191c1e'
  on-surface-variant: '#3d4949'
  inverse-surface: '#2e3132'
  inverse-on-surface: '#f0f1f3'
  outline: '#6d7979'
  outline-variant: '#bdc9c9'
  surface-tint: '#00696b'
  primary: '#006768'
  on-primary: '#ffffff'
  primary-container: '#008284'
  on-primary-container: '#f3fffe'
  inverse-primary: '#70d6d8'
  secondary: '#446277'
  on-secondary: '#ffffff'
  secondary-container: '#c5e4fd'
  on-secondary-container: '#49667b'
  tertiary: '#5b5c5c'
  on-tertiary: '#ffffff'
  tertiary-container: '#747575'
  on-tertiary-container: '#fdfcfc'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#8df3f5'
  primary-fixed-dim: '#70d6d8'
  on-primary-fixed: '#002020'
  on-primary-fixed-variant: '#004f51'
  secondary-fixed: '#c8e6ff'
  secondary-fixed-dim: '#accae3'
  on-secondary-fixed: '#001e2f'
  on-secondary-fixed-variant: '#2c4a5e'
  tertiary-fixed: '#e3e2e2'
  tertiary-fixed-dim: '#c6c6c6'
  on-tertiary-fixed: '#1a1c1c'
  on-tertiary-fixed-variant: '#464747'
  background: '#f8f9fb'
  on-background: '#191c1e'
  surface-variant: '#e1e2e4'
typography:
  display-lg:
    fontFamily: Manrope
    fontSize: 48px
    fontWeight: '800'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Manrope
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.3'
  headline-md:
    fontFamily: Manrope
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-md:
    fontFamily: Manrope
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.01em
  timer-display:
    fontFamily: Manrope
    fontSize: 20px
    fontWeight: '700'
    lineHeight: '1'
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  section-gap: 48px
  input-padding: 12px 16px
---

## Brand & Style

The design system is engineered for high-stakes professional environments, prioritizing clarity, stability, and cognitive ease. The interface is designed to eliminate friction during critical user interactions.

The visual style follows a **Modern Corporate/Minimalist** aesthetic, borrowing the clarity and trust associated with high-end fintech platforms. It utilizes a structured information hierarchy to maintain focus during high-pressure scenarios. The user experience is defined by professional restraint, generous whitespace, and systematic technical feedback.

## Colors

The palette is dominated by **Royal Teal (#006768)** and **Navy (#446277)** to establish a sense of authority and calm.

- **Primary (Teal):** Used for primary actions, progress indicators, and active states.
- **Secondary (Navy):** Reserved for headers, high-level navigation, and prominent text to ground the interface.
- **Metallic Silver & Grey:** Utilized for structural borders, background layering, and disabled states to provide a "premium tool" feel.
- **Functional Colors:** Red (#ba1a1a) is defined for critical error/alert states.

## Typography

This design system utilizes **Manrope** exclusively to maintain a clean, professional, and highly readable atmosphere.

- **Readability:** Body-lg (18px) is the standard for long-form reading to minimize eye strain.
- **Hierarchy:** Bold weights are used sparingly for section headers to ensure users can scan content quickly.
- **Timer Typography:** The `timer-display` token uses wider letter-spacing and bold weight for maximum legibility.

## Layout & Spacing

The layout employs a **12-column fluid grid** for dashboards and **centered fixed-width container** for focused workflows.

- **Desktop:** 24px gutters with 48px margins.
- **Tablet:** 16px gutters with 24px margins.
- **All spacing:** Derived from a base unit of 8px to maintain mathematical consistency.

## Elevation & Depth

Depth is conveyed through **tonal layering** and **low-contrast outlines** rather than aggressive shadows, maintaining the professional aesthetic.

- **Level 0 (Surface):** #f8f9fb for main backgrounds.
- **Level 1 (Card):** #ffffff with 1px subtle border.
- **Level 2 (Active/Hover):** Subtle diffused shadow for interactive elements.

## Components

### Buttons
- **Primary:** Solid Teal with White text, bold weight.
- **Secondary:** Transparent with Navy border and text.
- **Tertiary:** Ghost style, Navy text, no border.

### Inputs
- Text areas use soft grey background with 1px border.
- Focus state: Teal border with subtle ring.
- Consistent padding: 12px 16px.

### Status Indicators
- Completed: Green pill with dark text.
- Pending: Grey pill with Navy text.
- Current: Teal pill with white text.
