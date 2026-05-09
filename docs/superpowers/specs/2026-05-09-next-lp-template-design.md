# Next.js LP Template — Design Spec

**Date:** 2026-05-09
**Purpose:** Landing page template with feature-based architecture, dark mode, animations, and LP-focused tooling. Mirrors Vite template conventions for consistency across projects.

---

## Goal

Configure `next-template` as a production-ready Next.js LP template with:

- Feature-based folder structure (mirrors `vite-react-template`)
- All common LP sections pre-built with mock content
- Smooth scroll animations (Motion/Framer Motion)
- Dark mode (next-themes + shadcn/ui CSS variables)
- Contact form (react-hook-form + Zod + Server Action + Sonner)
- SEO metadata base ready to customize
- Tooling parity with Vite template (Prettier, Husky, lint-staged, Vitest)
- TODO comments throughout guiding what to replace per project

---

## Stack

| Layer       | Library                                              |
| ----------- | ---------------------------------------------------- |
| Framework   | Next.js 16 (App Router) + TypeScript                 |
| UI          | React 19 + Tailwind CSS v4 + shadcn/ui               |
| Animation   | Motion (Framer Motion)                               |
| Dark mode   | next-themes                                          |
| Forms       | react-hook-form + @hookform/resolvers + Zod          |
| Icons       | lucide-react                                         |
| Toasts      | sonner                                               |
| Tests       | Vitest + @testing-library/react                      |
| Git hooks   | Husky + lint-staged                                  |

### Prettier config (mirrors Vite template)

```json
{
  "singleQuote": true,
  "jsxSingleQuote": true,
  "trailingComma": "all",
  "tabWidth": 2,
  "printWidth": 100,
  "semi": true,
  "endOfLine": "lf"
}
```

### lint-staged

- `src/**/*.{ts,tsx}` → eslint + prettier
- `*.{json,md}` → prettier

---

## Folder Structure

```
src/
  features/
    hero/
      HeroSection.tsx         ← headline, subheadline, 2 CTAs, image placeholder
    benefits/
      BenefitsSection.tsx     ← 6 cards (icon + title + description)
      data.ts                 ← mock benefits array
    pricing/
      PricingSection.tsx      ← 3 tiers + monthly/annual toggle
      data.ts                 ← mock plans array
    testimonials/
      TestimonialsSection.tsx ← 6 testimonial cards
      data.ts                 ← mock testimonials array
    faq/
      FAQSection.tsx          ← shadcn Accordion + AnimatePresence
      data.ts                 ← mock Q&A array
    contact/
      ContactSection.tsx      ← form (name, email, message) + toast feedback
      action.ts               ← Server Action: validates + sends (mock)
      schema.ts               ← Zod schema
    not-found/
      NotFoundPage.tsx        ← 404 message + link to /
  components/
    ui/                       ← shadcn generated components
    layout/
      Navbar.tsx              ← logo + anchor links + dark mode toggle + mobile Sheet
      Footer.tsx              ← logo, link columns, social icons, copyright
  lib/
    utils.ts                  ← cn() helper (clsx + tailwind-merge)
    animations.ts             ← shared Motion variants (fadeUp, staggerContainer)
app/
  page.tsx                    ← composes all features in order
  layout.tsx                  ← ThemeProvider + fonts + base metadata
  not-found.tsx               ← delegates to features/not-found
  globals.css
public/
  og-image.png                ← placeholder 1200×630
```

---

## Sections

### Navbar (`components/layout/Navbar.tsx`)

- Logo (text or SVG) + anchor nav links (`#benefits`, `#pricing`, `#contact`)
- Dark mode toggle (sun/moon icon via lucide-react)
- Mobile: Sheet (shadcn) with hamburger trigger
- Sticky, subtle shadow on scroll
- Animation: fade-in on mount

### Hero (`features/hero/HeroSection.tsx`)

- Headline + subheadline + 2 CTAs (primary + secondary)
- Image/illustration placeholder
- Animation: staggered entrance — headline → subheadline → CTAs → image

### Benefits (`features/benefits/`)

- Section title + subtitle
- 6 cards in responsive grid (1 → 2 → 3 cols)
- Each card: lucide icon + title + description
- Animation: `whileInView` staggered fade-up

### Pricing (`features/pricing/`)

- Section title + monthly/annual toggle (annual = 20% off badge)
- 3 plans: Free, Pro, Enterprise
- Each plan: name, price, feature list, CTA button
- Pro plan highlighted (recommended badge)
- Animation: `whileInView` fade-up + hover scale on cards

### Testimonials (`features/testimonials/`)

- Section title
- 6 testimonial cards: avatar placeholder, name, role, quote
- Responsive grid (1 → 2 → 3 cols)
- Animation: `whileInView` staggered fade-up

### FAQ (`features/faq/`)

- Section title
- 8 Q&A pairs in shadcn Accordion
- AnimatePresence for smooth expand/collapse
- Animation: `whileInView` fade-up on section enter

### Contact (`features/contact/`)

- Section title + subtitle
- Fields: name, email, message (react-hook-form + Zod)
- Submit → Server Action → Sonner toast (success/error)
- Server Action currently mocks send (TODO: wire real email provider)
- Animation: `whileInView` fade-up

### Footer (`components/layout/Footer.tsx`)

- Logo + tagline
- 3 link columns (Product, Company, Legal) — mock links
- Social icons (Twitter/X, GitHub, LinkedIn)
- Copyright line

---

## Animations

Shared variants in `lib/animations.ts`:

```ts
export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}
```

All scroll-triggered sections use `whileInView` + `viewport={{ once: true }}` — animates once, no repeat.

---

## Dark Mode

- `next-themes` ThemeProvider wraps layout
- shadcn/ui uses CSS variables → dark mode works automatically
- Toggle in Navbar switches `class="dark"` on `<html>`

---

## Contact Server Action

`features/contact/action.ts`:
1. Receives FormData
2. Validates with Zod schema (name min 2, email valid, message min 10)
3. Mock: logs to console, returns `{ success: true }`
4. TODO: replace mock with real email provider (Resend, Nodemailer, etc.)

---

## SEO / Metadata

`app/layout.tsx` exports base metadata:

```ts
export const metadata: Metadata = {
  title: { default: 'Product Name', template: '%s | Product Name' },
  description: 'Your product description here.',
  openGraph: { title: '...', description: '...', images: ['/og-image.png'] },
  twitter: { card: 'summary_large_image' },
  metadataBase: new URL('https://yoursite.com'),
}
```

`public/og-image.png` → placeholder 1200×630 (replace per project).

---

## TODO Pattern

Every file that needs per-project customization includes a `// TODO:` comment:

```tsx
// TODO: replace with your product name
// TODO: replace with your logo
// TODO: update og-image.png (1200×630) in /public
// TODO: wire real email provider in features/contact/action.ts
// TODO: update metadata in app/layout.tsx
// TODO: update social links in components/layout/Footer.tsx
// TODO: replace mock data in features/*/data.ts
```

README also lists all TODOs as a checklist for project kickoff.

---

## Testing

- Vitest + @testing-library/react + jsdom
- `features/contact/schema.ts` → validates Zod schema (name, email, message)
- `lib/utils.ts` → tests `cn()` helper

---

## README Checklist (project kickoff)

```markdown
## Starting a new project from this template

- [ ] Update `app/layout.tsx` — title, description, metadataBase URL
- [ ] Replace `public/og-image.png` (1200×630)
- [ ] Update logo in `components/layout/Navbar.tsx` and `Footer.tsx`
- [ ] Replace mock data in `features/*/data.ts`
- [ ] Wire email provider in `features/contact/action.ts`
- [ ] Update social links in `components/layout/Footer.tsx`
- [ ] Update footer link columns with real URLs
- [ ] Remove/add sections in `app/page.tsx` as needed
- [ ] Run `pnpm install` and `pnpm dev`
```

---

## Out of Scope

- Auth flow (use Vite template for apps with login)
- Zustand / client state management
- Axios / React Query (LP has no complex data fetching)
- i18n
- CMS integration (Contentful, Sanity, etc.)
- Blog / MDX
- Analytics integration
