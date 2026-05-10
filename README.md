# Next.js LP Template

Production-ready landing page template built with Next.js 16 (App Router), Tailwind CSS v4, shadcn/ui, Motion, and next-themes.

## Stack

- **Framework:** Next.js 16 + TypeScript
- **UI:** Tailwind CSS v4 + shadcn/ui
- **Animations:** Motion (Framer Motion)
- **Dark mode:** next-themes
- **Forms:** react-hook-form + Zod + Server Action
- **Icons:** lucide-react
- **Tests:** Vitest + Testing Library
- **Tooling:** Prettier + Husky + lint-staged

## Sections included

- Navbar (sticky, dark mode toggle, mobile menu)
- Hero (staggered entrance animation)
- Benefits (6 cards, scroll animation)
- Pricing (3 tiers, monthly/annual toggle)
- Testimonials (6 cards, scroll animation)
- FAQ (Accordion)
- Contact (form + Server Action + toast feedback)
- Footer (links + social icons)
- 404 page

## Getting started

```bash
pnpm install
pnpm dev
```

## Starting a new project from this template

- [ ] Update `app/layout.tsx` — `title`, `description`, `metadataBase` URL
- [ ] Replace `public/og-image.png` (1200×630)
- [ ] Update logo/brand name in `src/components/layout/Navbar.tsx` and `Footer.tsx`
- [ ] Replace mock data in `src/features/*/data.ts`
- [ ] Wire real email provider in `src/features/contact/action.ts`
- [ ] Update social links in `src/components/layout/Footer.tsx`
- [ ] Update footer link columns with real URLs
- [ ] Remove/reorder sections in `app/page.tsx` as needed
- [ ] Run `pnpm build` to confirm no errors before deploying

## Commands

| Command          | Description       |
| ---------------- | ----------------- |
| `pnpm dev`       | Start dev server  |
| `pnpm build`     | Production build  |
| `pnpm lint`      | Run ESLint        |
| `pnpm typecheck` | TypeScript check  |
| `pnpm test`      | Run tests (watch) |
| `pnpm test:run`  | Run tests once    |
| `pnpm format`    | Format all files  |

## Email provider (contact form)

The contact form Server Action is in `src/features/contact/action.ts`.
Currently logs to console. To send real emails, add your provider:

**Resend:**

```bash
pnpm add resend
```

```ts
// in action.ts
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);
await resend.emails.send({ from: '...', to: '...', subject: '...', text: message });
```

## Deploying

Deploy to Vercel with zero config. After deploy, update `metadataBase` in `app/layout.tsx` with your production URL.
