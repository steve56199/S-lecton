# S-Lecton - Academic Precision Design System

A comprehensive, cohesive branding system engineered for high-stakes professional environments. The design system prioritizes clarity, stability, and cognitive ease through systematic use of color, typography, and spacing.

## Overview

S-Lecton implements an **Academic Precision** design language featuring:

- **Primary Colors:** Royal Teal (#006768) for actions and highlights
- **Secondary Colors:** Navy (#446277) for headers and navigation
- **Typography:** Exclusive use of Manrope font family
- **Spacing:** 8px base unit with consistent rhythm
- **Components:** Pre-built, cohesive UI elements

## Directory Structure

```
s-lecton/
├── DESIGN.md                 # Complete design system documentation
├── tailwind.config.js        # Tailwind CSS configuration
├── styles.css               # Global styles and utilities
├── index.html               # Component showcase and demo page
├── package.json             # Project dependencies
└── README.md                # This file
```

## Color Palette

### Primary Colors
- **Primary Teal:** `#006768` - Main actions, progress indicators
- **Primary Container:** `#008284` - Hover states
- **Inverse Primary:** `#70d6d8` - Light backgrounds

### Secondary Colors
- **Secondary Navy:** `#446277` - Headers, navigation
- **Secondary Container:** `#c5e4fd` - Subtle backgrounds
- **Secondary Fixed:** `#c8e6ff` - Light accents

### Surfaces & Backgrounds
- **Surface:** `#f8f9fb` - Main background
- **Surface Container Low:** `#f3f4f6` - Subtle elevation
- **Surface Container:** `#edeef0` - Medium elevation
- **White:** `#ffffff` - Cards and content areas

### Functional Colors
- **Error:** `#ba1a1a` - Error states
- **Outline:** `#6d7979` - Borders
- **Outline Variant:** `#bdc9c9` - Subtle borders

## Typography

All typography uses **Manrope** font family exclusively.

### Type Scales

| Style | Size | Weight | Line Height |
|-------|------|--------|-------------|
| Display Large | 48px | 800 | 1.2 |
| Headline Large | 32px | 700 | 1.3 |
| Headline Medium | 24px | 600 | 1.4 |
| Body Large | 18px | 400 | 1.6 |
| Body Medium | 16px | 400 | 1.5 |
| Label Medium | 14px | 600 | 1.2 |
| Timer Display | 20px | 700 | 1.0 |

## Components

### Buttons

**Primary Button**
```html
<button class="px-6 py-2 bg-primary text-on-primary rounded-lg font-label-md hover:bg-primary-container transition shadow-sm">
  Button Text
</button>
```

**Secondary Button**
```html
<button class="px-6 py-2 border-2 border-primary text-primary rounded-lg font-label-md hover:bg-surface-container-low transition">
  Button Text
</button>
```

### Cards

```html
<div class="bg-white p-6 rounded-lg shadow-sm border border-outline-variant/20 hover:shadow-md transition">
  <h3 class="text-headline-md font-semibold">Card Title</h3>
  <p class="text-body-md text-on-surface-variant">Card content goes here.</p>
</div>
```

### Input Fields

```html
<input type="text" placeholder="Enter text..." 
  class="w-full px-4 py-2 bg-surface-container-low border border-outline-variant rounded-lg text-on-surface focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20 transition">
```

### Status Pills

```html
<span class="px-4 py-2 bg-primary text-on-primary rounded-full text-label-md font-semibold">
  Active Status
</span>
```

### Progress Bar

```html
<div class="w-full h-2 bg-surface-container-high rounded-full overflow-hidden">
  <div class="h-full bg-primary w-[65%] transition-all duration-300"></div>
</div>
```

## Installation

### Using Tailwind CSS

The project includes a pre-configured `tailwind.config.js` with all design tokens.

```bash
npm install tailwindcss
npx tailwindcss init
```

Then import the configuration:

```javascript
// tailwind.config.js
module.exports = require('./tailwind.config.js')
```

### Using CSS

Include the global styles in your HTML:

```html
<link rel="stylesheet" href="styles.css">
```

## Spacing System

All spacing is derived from an 8px base unit:

- **Base Unit:** 8px
- **Container Max Width:** 1280px
- **Gutter:** 24px
- **Section Gap:** 48px
- **Input Padding:** 12px 16px

## Border Radius

Consistent rounded corners throughout:

- **Small:** 0.25rem
- **Default:** 0.5rem (8px)
- **Medium:** 0.75rem
- **Large:** 1rem
- **Extra Large:** 1.5rem
- **Full:** 9999px (pills)

## Usage Examples

### Hero Section

```html
<section class="py-20 px-6 bg-gradient-to-b from-surface to-surface-container-low">
  <div class="max-w-4xl mx-auto text-center">
    <h2 class="text-display-lg font-bold mb-4">Main Headline</h2>
    <p class="text-body-lg text-on-surface-variant mb-8">Description text</p>
  </div>
</section>
```

### Header Navigation

```html
<header class="fixed top-0 w-full bg-surface-container-highest shadow-sm border-b border-outline-variant/20">
  <nav class="flex gap-6 px-6 py-4">
    <a href="#" class="text-body-md text-on-surface-variant hover:text-primary">Link</a>
  </nav>
</header>
```

### Card Grid

```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <div class="bg-white p-6 rounded-lg shadow-sm border border-outline-variant/20">
    <!-- Content -->
  </div>
</div>
```

## Best Practices

1. **Color Usage:** Use primary colors for interactive elements, secondary for navigation
2. **Typography:** Maintain hierarchy using the defined type scale
3. **Spacing:** Always use multiples of 8px for spacing
4. **Shadows:** Use subtle shadows; avoid aggressive drop shadows
5. **Focus States:** Always provide clear focus indicators for accessibility
6. **Consistency:** Reference `DESIGN.md` for all design decisions

## Accessibility

- All interactive elements have clear focus states (primary color ring)
- Color contrast ratios meet WCAG AA standards
- Semantic HTML structure maintained throughout
- Proper heading hierarchy (h1, h2, h3, etc.)
- Icon labels include descriptive text

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Contributing

When adding new components:

1. Follow the established color palette
2. Use Manrope font exclusively
3. Maintain 8px spacing rhythm
4. Reference `DESIGN.md` for specifications
5. Test across light/dark modes if applicable

## Resources

- **Design File:** `DESIGN.md`
- **Configuration:** `tailwind.config.js`
- **Demo Page:** `index.html`
- **Styles:** `styles.css`

## License

All design assets and components are proprietary to S-Lecton.

---

**Version:** 1.0.0  
**Last Updated:** August 2024  
**Maintained By:** S-Lecton Team
