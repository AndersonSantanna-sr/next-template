# Next.js LP Template Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the bare Next.js 16 scaffold into a production-ready landing page template with feature-based architecture, dark mode, scroll animations, and full LP sections.

**Architecture:** Feature-based `src/features/` structure mirrors `vite-react-template`. All LP sections live in isolated feature folders. `app/page.tsx` only composes them in order. All section components are Client Components (`'use client'`) for Motion animations. One Server Action (`features/contact/action.ts`) handles form submission. Path alias `@/*` points to `./src/*`.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, shadcn/ui, Motion (Framer Motion), next-themes, react-hook-form + @hookform/resolvers, Zod, Sonner, lucide-react, clsx, tailwind-merge, Vitest, Husky v9, lint-staged, Prettier.

**Spec:** `docs/superpowers/specs/2026-05-09-next-lp-template-design.md`

---

## File Map

**New files:**
```
src/
  features/
    hero/HeroSection.tsx
    benefits/BenefitsSection.tsx
    benefits/data.ts
    pricing/PricingSection.tsx
    pricing/data.ts
    testimonials/TestimonialsSection.tsx
    testimonials/data.ts
    faq/FAQSection.tsx
    faq/data.ts
    contact/ContactSection.tsx
    contact/action.ts
    contact/schema.ts
    contact/__tests__/schema.test.ts
    not-found/NotFoundPage.tsx
  components/
    ui/                          ← shadcn generated
    layout/Navbar.tsx
    layout/Footer.tsx
  providers/ThemeProvider.tsx
  lib/utils.ts
  lib/animations.ts
  lib/__tests__/utils.test.ts
  test-setup.ts
vitest.config.ts
.prettierrc
.prettierignore
.lintstagedrc.mjs
.husky/pre-commit
```

**Modified files:**
```
package.json          ← add scripts + deps
tsconfig.json         ← update @/* alias to ./src/*
app/layout.tsx        ← ThemeProvider + metadata + Toaster
app/globals.css       ← shadcn CSS vars + class-based dark mode
app/not-found.tsx     ← delegate to NotFoundPage feature
app/page.tsx          ← compose all features
README.md             ← kickoff checklist + TODOs
```

---

## Task 1: Install dependencies

**Files:** `package.json`

- [ ] **Step 1: Install runtime dependencies**

```bash
cd /Users/andersonsantanna/Documents/react/next-template && pnpm add motion next-themes react-hook-form @hookform/resolvers zod sonner lucide-react clsx tailwind-merge
```

Expected: packages added to `dependencies` in `package.json`.

- [ ] **Step 2: Install dev dependencies**

```bash
pnpm add -D husky lint-staged prettier @vitejs/plugin-react vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom @vitest/coverage-v8 @types/node
```

Expected: packages added to `devDependencies`.

- [ ] **Step 3: Update package.json scripts**

Open `package.json` and replace the `"scripts"` block with:

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "eslint",
  "typecheck": "tsc --noEmit",
  "format": "prettier --write .",
  "test": "vitest",
  "test:run": "vitest run",
  "prepare": "husky"
},
```

- [ ] **Step 4: Commit**

```bash
git add package.json pnpm-lock.yaml
git commit -m "chore: install template dependencies"
```

---

## Task 2: Tooling — Prettier, Husky, lint-staged

**Files:** `.prettierrc`, `.prettierignore`, `.lintstagedrc.mjs`, `.husky/pre-commit`

- [ ] **Step 1: Create `.prettierrc`**

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

- [ ] **Step 2: Create `.prettierignore`**

```
node_modules
.next
dist
pnpm-lock.yaml
```

- [ ] **Step 3: Create `.lintstagedrc.mjs`**

```js
export default {
  'src/**/*.{ts,tsx}': ['eslint --max-warnings 0', 'prettier --write'],
  '*.{json,md}': ['prettier --write'],
};
```

- [ ] **Step 4: Init Husky and create pre-commit hook**

```bash
pnpm exec husky init
```

Then replace the content of `.husky/pre-commit` with:

```sh
npx lint-staged
```

- [ ] **Step 5: Verify pre-commit is executable**

```bash
chmod +x .husky/pre-commit && cat .husky/pre-commit
```

Expected output: `npx lint-staged`

- [ ] **Step 6: Commit**

```bash
git add .prettierrc .prettierignore .lintstagedrc.mjs .husky/
git commit -m "chore: add Prettier, Husky, and lint-staged"
```

---

## Task 3: Update tsconfig path alias

**Files:** `tsconfig.json`

- [ ] **Step 1: Update `@/*` alias to point to `src/`**

In `tsconfig.json`, change:
```json
"paths": {
  "@/*": ["./*"]
}
```
to:
```json
"paths": {
  "@/*": ["./src/*"]
}
```

- [ ] **Step 2: Verify typecheck passes (no src/ yet, so just confirm no errors)**

```bash
pnpm typecheck
```

Expected: exits 0 (no TypeScript errors from the change itself).

- [ ] **Step 3: Commit**

```bash
git add tsconfig.json
git commit -m "chore: update @/* alias to ./src/*"
```

---

## Task 4: Vitest configuration

**Files:** `vitest.config.ts`, `src/test-setup.ts`

- [ ] **Step 1: Create `vitest.config.ts`**

```ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test-setup.ts'],
    globals: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

- [ ] **Step 2: Create `src/test-setup.ts`**

```ts
import '@testing-library/jest-dom';
```

- [ ] **Step 3: Run vitest to confirm setup works**

```bash
pnpm test:run
```

Expected: "No test files found" — no error, just 0 tests.

- [ ] **Step 4: Commit**

```bash
git add vitest.config.ts src/test-setup.ts
git commit -m "chore: add Vitest configuration"
```

---

## Task 5: `lib/utils.ts` (TDD)

**Files:** `src/lib/__tests__/utils.test.ts`, `src/lib/utils.ts`

- [ ] **Step 1: Write failing test — create `src/lib/__tests__/utils.test.ts`**

```ts
import { describe, it, expect } from 'vitest';
import { cn } from '../utils';

describe('cn', () => {
  it('merges class names', () => {
    expect(cn('foo', 'bar')).toBe('foo bar');
  });

  it('resolves tailwind conflicts — last wins', () => {
    expect(cn('p-2', 'p-4')).toBe('p-4');
  });

  it('ignores falsy values', () => {
    expect(cn('base', false && 'skip', 'keep')).toBe('base keep');
  });

  it('handles undefined input', () => {
    expect(cn(undefined, 'foo')).toBe('foo');
  });
});
```

- [ ] **Step 2: Run test — verify it fails**

```bash
pnpm test:run
```

Expected: FAIL — `Cannot find module '../utils'`

- [ ] **Step 3: Create `src/lib/utils.ts`**

```ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

- [ ] **Step 4: Run test — verify it passes**

```bash
pnpm test:run
```

Expected: PASS — 4 tests

- [ ] **Step 5: Commit**

```bash
git add src/lib/utils.ts src/lib/__tests__/utils.test.ts
git commit -m "feat: add cn utility with tests"
```

---

## Task 6: `lib/animations.ts`

**Files:** `src/lib/animations.ts`

- [ ] **Step 1: Create `src/lib/animations.ts`**

```ts
import type { Variants } from 'motion/react';

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
};
```

- [ ] **Step 2: Run typecheck**

```bash
pnpm typecheck
```

Expected: exits 0.

- [ ] **Step 3: Commit**

```bash
git add src/lib/animations.ts
git commit -m "feat: add shared Motion animation variants"
```

---

## Task 7: Contact schema (TDD)

**Files:** `src/features/contact/__tests__/schema.test.ts`, `src/features/contact/schema.ts`

- [ ] **Step 1: Write failing test — create `src/features/contact/__tests__/schema.test.ts`**

```ts
import { describe, it, expect } from 'vitest';
import { contactSchema } from '../schema';

describe('contactSchema', () => {
  const valid = {
    name: 'Ana Lima',
    email: 'ana@example.com',
    message: 'Hello, I have a question about pricing.',
  };

  it('passes with valid data', () => {
    expect(contactSchema.safeParse(valid).success).toBe(true);
  });

  it('rejects name shorter than 2 chars', () => {
    const result = contactSchema.safeParse({ ...valid, name: 'A' });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].path[0]).toBe('name');
  });

  it('rejects invalid email', () => {
    const result = contactSchema.safeParse({ ...valid, email: 'not-an-email' });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].path[0]).toBe('email');
  });

  it('rejects message shorter than 10 chars', () => {
    const result = contactSchema.safeParse({ ...valid, message: 'Hi' });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].path[0]).toBe('message');
  });
});
```

- [ ] **Step 2: Run test — verify it fails**

```bash
pnpm test:run
```

Expected: FAIL — `Cannot find module '../schema'`

- [ ] **Step 3: Create `src/features/contact/schema.ts`**

```ts
import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export type ContactFormData = z.infer<typeof contactSchema>;
```

- [ ] **Step 4: Run test — verify it passes**

```bash
pnpm test:run
```

Expected: PASS — 8 tests total (4 utils + 4 schema)

- [ ] **Step 5: Commit**

```bash
git add src/features/contact/schema.ts src/features/contact/__tests__/schema.test.ts
git commit -m "feat: add contact form schema with tests"
```

---

## Task 8: shadcn/ui setup

**Files:** `components.json`, `app/globals.css`, `src/lib/utils.ts` (shadcn may update), `src/components/ui/*`

- [ ] **Step 1: Run shadcn init**

```bash
pnpm dlx shadcn@latest init
```

When prompted:
- Style: **Default**
- Base color: **Neutral**
- CSS variables: **Yes**
- Dark mode: choose **class** (not media query) if asked
- Components path: `@/components` → accept default or set to `src/components`
- Utils path: `@/lib/utils` → accept (resolves to `src/lib/utils`)
- Tailwind CSS: `app/globals.css`

If shadcn rewrites `src/lib/utils.ts`, verify it still exports `cn()` (it should, as that's the shadcn convention). Re-run tests after.

- [ ] **Step 2: Run tests to confirm utils still pass**

```bash
pnpm test:run
```

Expected: PASS — all 8 tests.

- [ ] **Step 3: Add all required shadcn components**

```bash
pnpm dlx shadcn@latest add button card input textarea label accordion badge sheet sonner separator
```

Expected: components created in `src/components/ui/`.

- [ ] **Step 4: Update `app/globals.css` — ensure class-based dark mode**

After shadcn init, `globals.css` should already use `.dark { ... }`. Verify it does NOT use `@media (prefers-color-scheme: dark)`. If it still uses media query, replace it:

Find any `@media (prefers-color-scheme: dark) { :root { ... } }` block and change to `.dark { ... }` (same CSS variables, just the selector changes).

Also add font variables to `@theme` if missing:
```css
@theme inline {
  /* existing theme variables from shadcn... */
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}
```

- [ ] **Step 5: Run typecheck**

```bash
pnpm typecheck
```

Expected: exits 0.

- [ ] **Step 6: Commit**

```bash
git add components.json app/globals.css src/components/
git commit -m "feat: initialize shadcn/ui with LP components"
```

---

## Task 9: ThemeProvider

**Files:** `src/providers/ThemeProvider.tsx`

- [ ] **Step 1: Create `src/providers/ThemeProvider.tsx`**

```tsx
'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
      {children}
    </NextThemesProvider>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/providers/ThemeProvider.tsx
git commit -m "feat: add ThemeProvider for next-themes"
```

---

## Task 10: `app/layout.tsx`

**Files:** `app/layout.tsx`

- [ ] **Step 1: Replace `app/layout.tsx`**

```tsx
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { Toaster } from '@/components/ui/sonner';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

// TODO: update title, description, and metadataBase URL for each project
export const metadata: Metadata = {
  title: { default: 'Product Name', template: '%s | Product Name' },
  description: 'Your product description here.',
  openGraph: {
    title: 'Product Name',
    description: 'Your product description here.',
    images: ['/og-image.png'],
  },
  twitter: { card: 'summary_large_image' },
  metadataBase: new URL('https://yoursite.com'),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang='en'
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className='min-h-screen bg-background font-sans antialiased'>
        <ThemeProvider>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Typecheck**

```bash
pnpm typecheck
```

Expected: exits 0.

- [ ] **Step 3: Commit**

```bash
git add app/layout.tsx
git commit -m "feat: update layout with ThemeProvider, metadata, and Toaster"
```

---

## Task 11: Navbar

**Files:** `src/components/layout/Navbar.tsx`

- [ ] **Step 1: Create `src/components/layout/Navbar.tsx`**

```tsx
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Menu, Moon, Sun } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

// TODO: update nav links to match your sections
const navLinks = [
  { href: '#benefits', label: 'Benefits' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#faq', label: 'FAQ' },
  { href: '#contact', label: 'Contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn(
        'sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm transition-shadow',
        scrolled && 'shadow-sm',
      )}
    >
      <div className='mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6'>
        {/* TODO: replace with your logo/brand name */}
        <Link href='/' className='text-xl font-bold tracking-tight'>
          ProductName
        </Link>

        <nav className='hidden items-center gap-6 md:flex'>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className='text-sm text-muted-foreground transition-colors hover:text-foreground'
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className='flex items-center gap-2'>
          <Button
            variant='ghost'
            size='icon'
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label='Toggle theme'
          >
            <Sun className='h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
            <Moon className='absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
          </Button>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild className='md:hidden'>
              <Button variant='ghost' size='icon' aria-label='Open menu'>
                <Menu className='h-5 w-5' />
              </Button>
            </SheetTrigger>
            <SheetContent side='right' className='w-64'>
              <nav className='flex flex-col gap-4 pt-8'>
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className='text-base font-medium transition-colors hover:text-foreground'
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}
```

- [ ] **Step 2: Typecheck**

```bash
pnpm typecheck
```

Expected: exits 0.

- [ ] **Step 3: Commit**

```bash
git add src/components/layout/Navbar.tsx
git commit -m "feat: add Navbar with dark mode toggle and mobile Sheet"
```

---

## Task 12: Footer

**Files:** `src/components/layout/Footer.tsx`

- [ ] **Step 1: Create `src/components/layout/Footer.tsx`**

```tsx
import Link from 'next/link';
import { Github, Linkedin, Twitter } from 'lucide-react';

// TODO: update links, social URLs, and brand info
const footerLinks = {
  Product: [
    { label: 'Benefits', href: '#benefits' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'FAQ', href: '#faq' },
  ],
  Company: [
    { label: 'About', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Careers', href: '#' },
  ],
  Legal: [
    { label: 'Privacy', href: '#' },
    { label: 'Terms', href: '#' },
    { label: 'Cookies', href: '#' },
  ],
};

const socialLinks = [
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
];

export function Footer() {
  return (
    <footer className='border-t bg-background'>
      <div className='mx-auto max-w-6xl px-4 py-12 sm:px-6'>
        <div className='grid grid-cols-2 gap-8 md:grid-cols-4'>
          <div className='col-span-2 md:col-span-1'>
            {/* TODO: replace with your logo/brand name */}
            <p className='text-xl font-bold tracking-tight'>ProductName</p>
            <p className='mt-2 text-sm text-muted-foreground'>Build something people love.</p>
            <div className='mt-4 flex gap-3'>
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className='text-muted-foreground transition-colors hover:text-foreground'
                >
                  <Icon className='h-5 w-5' />
                </Link>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <p className='text-sm font-semibold'>{title}</p>
              <ul className='mt-3 space-y-2'>
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className='text-sm text-muted-foreground transition-colors hover:text-foreground'
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className='mt-8 border-t pt-6 text-center text-sm text-muted-foreground'>
          {/* TODO: update company name */}
          © {new Date().getFullYear()} ProductName. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/layout/Footer.tsx
git commit -m "feat: add Footer with link columns and social icons"
```

---

## Task 13: Hero section

**Files:** `src/features/hero/HeroSection.tsx`

- [ ] **Step 1: Create `src/features/hero/HeroSection.tsx`**

```tsx
'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { staggerContainer, fadeUp } from '@/lib/animations';

export function HeroSection() {
  return (
    <section className='relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden py-20 text-center'>
      <motion.div
        variants={staggerContainer}
        initial='hidden'
        animate='visible'
        className='mx-auto max-w-4xl px-4 sm:px-6'
      >
        {/* TODO: replace mock content with real copy */}
        <motion.p variants={fadeUp} className='mb-4 text-sm font-medium text-primary'>
          Introducing v2.0 ✨
        </motion.p>

        <motion.h1
          variants={fadeUp}
          className='text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl'
        >
          Build something{' '}
          <span className='text-primary'>people love</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className='mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl'
        >
          A modern landing page template with everything you need to ship fast.
          Clean, accessible, and fully customizable.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className='mt-10 flex flex-wrap justify-center gap-4'
        >
          {/* TODO: update CTA href and labels */}
          <Button size='lg' asChild>
            <Link href='#contact'>
              Get started <ArrowRight className='ml-2 h-4 w-4' />
            </Link>
          </Button>
          <Button size='lg' variant='outline' asChild>
            <Link href='#benefits'>See how it works</Link>
          </Button>
        </motion.div>

        {/* TODO: replace with real hero image or illustration */}
        <motion.div
          variants={fadeUp}
          className='mt-16 h-64 w-full rounded-2xl bg-muted sm:h-80 md:h-96'
        />
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/features/hero/HeroSection.tsx
git commit -m "feat: add Hero section with staggered entrance animation"
```

---

## Task 14: Benefits section

**Files:** `src/features/benefits/data.ts`, `src/features/benefits/BenefitsSection.tsx`

- [ ] **Step 1: Create `src/features/benefits/data.ts`**

```ts
import type { LucideIcon } from 'lucide-react';
import { Zap, Code2, Palette, Moon, Accessibility, GitFork } from 'lucide-react';

export type Benefit = {
  icon: LucideIcon;
  title: string;
  description: string;
};

// TODO: replace with your product's actual benefits
export const benefits: Benefit[] = [
  {
    icon: Zap,
    title: 'Fast by default',
    description: 'Optimized for performance from day one with zero-config setup.',
  },
  {
    icon: Code2,
    title: 'Developer friendly',
    description: 'Built with tools you already know and love. TypeScript throughout.',
  },
  {
    icon: Palette,
    title: 'Fully customizable',
    description: 'Every component is yours to own and modify with shadcn/ui.',
  },
  {
    icon: Moon,
    title: 'Dark mode ready',
    description: 'Ships with a beautiful dark mode out of the box via next-themes.',
  },
  {
    icon: Accessibility,
    title: 'Accessible',
    description: 'Follows WCAG 2.1 guidelines so everyone can use your product.',
  },
  {
    icon: GitFork,
    title: 'Open source',
    description: 'Free to use, fork, and build upon. No lock-in, ever.',
  },
];
```

- [ ] **Step 2: Create `src/features/benefits/BenefitsSection.tsx`**

```tsx
'use client';

import { motion } from 'motion/react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { staggerContainer, fadeUp } from '@/lib/animations';
import { benefits } from './data';

export function BenefitsSection() {
  return (
    <section id='benefits' className='py-20'>
      <div className='mx-auto max-w-6xl px-4 sm:px-6'>
        <motion.div
          variants={staggerContainer}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
        >
          {/* TODO: update section title and subtitle */}
          <motion.div variants={fadeUp} className='mx-auto max-w-2xl text-center'>
            <h2 className='text-3xl font-bold tracking-tight sm:text-4xl'>
              Everything you need
            </h2>
            <p className='mt-4 text-muted-foreground'>
              Built with the tools and patterns that ship great products, fast.
            </p>
          </motion.div>

          <div className='mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
            {benefits.map((benefit) => (
              <motion.div key={benefit.title} variants={fadeUp}>
                <Card className='h-full'>
                  <CardHeader>
                    <benefit.icon className='h-8 w-8 text-primary' />
                    <p className='mt-2 font-semibold'>{benefit.title}</p>
                  </CardHeader>
                  <CardContent>
                    <p className='text-sm text-muted-foreground'>{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/features/benefits/
git commit -m "feat: add Benefits section with scroll animation"
```

---

## Task 15: Pricing section

**Files:** `src/features/pricing/data.ts`, `src/features/pricing/PricingSection.tsx`

- [ ] **Step 1: Create `src/features/pricing/data.ts`**

```ts
export type PricingPlan = {
  name: string;
  monthlyPrice: number;
  annualPrice: number;
  description: string;
  features: string[];
  cta: string;
  recommended?: boolean;
};

// TODO: replace with your actual pricing plans
export const plans: PricingPlan[] = [
  {
    name: 'Free',
    monthlyPrice: 0,
    annualPrice: 0,
    description: 'For personal projects and exploration.',
    features: ['1 project', 'Up to 5 pages', 'Basic analytics', 'Community support'],
    cta: 'Get started',
  },
  {
    name: 'Pro',
    monthlyPrice: 29,
    annualPrice: 23,
    description: 'For growing teams and businesses.',
    features: [
      'Unlimited projects',
      'Up to 50 pages',
      'Advanced analytics',
      'Priority support',
      'Custom domain',
      'Remove branding',
    ],
    cta: 'Start free trial',
    recommended: true,
  },
  {
    name: 'Enterprise',
    monthlyPrice: 99,
    annualPrice: 79,
    description: 'For large organizations with custom needs.',
    features: [
      'Everything in Pro',
      'Unlimited pages',
      'SSO / SAML',
      'SLA guarantee',
      'Dedicated account manager',
      'Custom integrations',
      'Invoice billing',
      'Security audit logs',
    ],
    cta: 'Contact sales',
  },
];
```

- [ ] **Step 2: Create `src/features/pricing/PricingSection.tsx`**

```tsx
'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { staggerContainer, fadeUp } from '@/lib/animations';
import { cn } from '@/lib/utils';
import { plans } from './data';

export function PricingSection() {
  const [annual, setAnnual] = useState(false);

  return (
    <section id='pricing' className='bg-muted/30 py-20'>
      <div className='mx-auto max-w-6xl px-4 sm:px-6'>
        <motion.div
          variants={staggerContainer}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
        >
          <motion.div variants={fadeUp} className='mx-auto max-w-2xl text-center'>
            {/* TODO: update section title */}
            <h2 className='text-3xl font-bold tracking-tight sm:text-4xl'>
              Simple, transparent pricing
            </h2>
            <p className='mt-4 text-muted-foreground'>No hidden fees. Cancel anytime.</p>

            <div className='mt-6 flex items-center justify-center gap-3'>
              <span className={cn('text-sm', !annual && 'font-semibold')}>Monthly</span>
              <button
                onClick={() => setAnnual((v) => !v)}
                className={cn(
                  'relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                  annual ? 'bg-primary' : 'bg-muted-foreground/30',
                )}
                role='switch'
                aria-checked={annual}
              >
                <span
                  className={cn(
                    'inline-block h-4 w-4 transform rounded-full bg-white shadow-md transition-transform',
                    annual ? 'translate-x-6' : 'translate-x-1',
                  )}
                />
              </button>
              <span className={cn('text-sm', annual && 'font-semibold')}>
                Annual{' '}
                <Badge variant='secondary' className='ml-1'>
                  Save 20%
                </Badge>
              </span>
            </div>
          </motion.div>

          <div className='mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
            {plans.map((plan) => (
              <motion.div
                key={plan.name}
                variants={fadeUp}
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Card className={cn('relative h-full', plan.recommended && 'border-primary shadow-lg')}>
                  {plan.recommended && (
                    <Badge className='absolute -top-3 left-1/2 -translate-x-1/2'>
                      Recommended
                    </Badge>
                  )}
                  <CardHeader>
                    <p className='font-semibold'>{plan.name}</p>
                    <div className='mt-2 flex items-baseline gap-1'>
                      <span className='text-4xl font-bold'>
                        ${annual ? plan.annualPrice : plan.monthlyPrice}
                      </span>
                      <span className='text-sm text-muted-foreground'>/mo</span>
                    </div>
                    <p className='text-sm text-muted-foreground'>{plan.description}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className='space-y-2'>
                      {plan.features.map((f) => (
                        <li key={f} className='flex items-center gap-2 text-sm'>
                          <Check className='h-4 w-4 shrink-0 text-primary' />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    {/* TODO: update CTA href per plan */}
                    <Button className='w-full' variant={plan.recommended ? 'default' : 'outline'}>
                      {plan.cta}
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/features/pricing/
git commit -m "feat: add Pricing section with monthly/annual toggle"
```

---

## Task 16: Testimonials section

**Files:** `src/features/testimonials/data.ts`, `src/features/testimonials/TestimonialsSection.tsx`

- [ ] **Step 1: Create `src/features/testimonials/data.ts`**

```ts
export type Testimonial = {
  name: string;
  role: string;
  company: string;
  quote: string;
};

// TODO: replace with real testimonials
export const testimonials: Testimonial[] = [
  {
    name: 'Ana Lima',
    role: 'CEO',
    company: 'Startup X',
    quote: 'This template saved us weeks of setup. Shipped our landing page in a day.',
  },
  {
    name: 'Carlos Mendes',
    role: 'Lead Engineer',
    company: 'Tech Co',
    quote: 'The feature-based structure keeps the codebase sane as we grow. Highly recommended.',
  },
  {
    name: 'Sofia Andrade',
    role: 'Product Designer',
    company: 'Design Studio',
    quote: 'Dark mode looks stunning. Our users love it and so do we.',
  },
  {
    name: 'Lucas Ferreira',
    role: 'Founder',
    company: 'SaaS Inc',
    quote: 'Contact form, pricing, FAQ — everything works out of the box. Just customize and ship.',
  },
  {
    name: 'Mariana Costa',
    role: 'Marketing Lead',
    company: 'Growth Co',
    quote: 'SEO metadata is already set up. We ranked on page 1 within a week of launch.',
  },
  {
    name: 'Rafael Souza',
    role: 'CTO',
    company: 'Dev House',
    quote: 'Finally a template that follows real-world patterns. Not just a pretty UI dump.',
  },
];
```

- [ ] **Step 2: Create `src/features/testimonials/TestimonialsSection.tsx`**

```tsx
'use client';

import { motion } from 'motion/react';
import { Quote } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { staggerContainer, fadeUp } from '@/lib/animations';
import { testimonials } from './data';

export function TestimonialsSection() {
  return (
    <section id='testimonials' className='py-20'>
      <div className='mx-auto max-w-6xl px-4 sm:px-6'>
        <motion.div
          variants={staggerContainer}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
        >
          {/* TODO: update section title */}
          <motion.div variants={fadeUp} className='mx-auto max-w-2xl text-center'>
            <h2 className='text-3xl font-bold tracking-tight sm:text-4xl'>
              Loved by developers
            </h2>
            <p className='mt-4 text-muted-foreground'>
              Don&apos;t take our word for it. Here&apos;s what people are saying.
            </p>
          </motion.div>

          <div className='mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
            {testimonials.map((t) => (
              <motion.div key={t.name} variants={fadeUp}>
                <Card className='flex h-full flex-col'>
                  <CardContent className='flex-1 pt-6'>
                    <Quote className='h-6 w-6 text-primary' />
                    <p className='mt-3 text-sm leading-relaxed text-muted-foreground'>
                      &ldquo;{t.quote}&rdquo;
                    </p>
                  </CardContent>
                  <CardFooter className='flex items-center gap-3'>
                    {/* TODO: replace with real avatar images */}
                    <div className='h-9 w-9 rounded-full bg-muted' />
                    <div>
                      <p className='text-sm font-semibold'>{t.name}</p>
                      <p className='text-xs text-muted-foreground'>
                        {t.role}, {t.company}
                      </p>
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/features/testimonials/
git commit -m "feat: add Testimonials section with scroll animation"
```

---

## Task 17: FAQ section

**Files:** `src/features/faq/data.ts`, `src/features/faq/FAQSection.tsx`

- [ ] **Step 1: Create `src/features/faq/data.ts`**

```ts
export type FAQItem = {
  question: string;
  answer: string;
};

// TODO: replace with your product's actual FAQ
export const faqItems: FAQItem[] = [
  {
    question: 'Is this template free to use?',
    answer: 'Yes, completely free and open source. Use it for personal and commercial projects.',
  },
  {
    question: 'Do I need to credit the author?',
    answer: 'No attribution required. Clone it, modify it, and ship it as your own.',
  },
  {
    question: 'Which tech stack does this use?',
    answer:
      'Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, shadcn/ui, Motion, and next-themes.',
  },
  {
    question: 'Does it support dark mode?',
    answer:
      'Yes. Dark mode is built in via next-themes and switches automatically based on system preference, with a manual toggle in the navbar.',
  },
  {
    question: 'How do I set up the contact form?',
    answer:
      'The contact form uses a Server Action. Add your email provider (Resend, Nodemailer, etc.) to src/features/contact/action.ts to start receiving messages.',
  },
  {
    question: 'Can I add more sections?',
    answer:
      'Absolutely. Create a new folder under src/features/, build your section component, and import it into app/page.tsx.',
  },
  {
    question: 'Is there a blog or MDX support?',
    answer:
      "Not in this template — it's focused on landing pages. For blog/MDX, consider extending with next-mdx-remote.",
  },
  {
    question: 'How do I deploy this?',
    answer:
      'Deploy to Vercel with zero config. Connect your GitHub repo and update metadataBase in app/layout.tsx with your production URL.',
  },
];
```

- [ ] **Step 2: Create `src/features/faq/FAQSection.tsx`**

```tsx
'use client';

import { motion } from 'motion/react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { staggerContainer, fadeUp } from '@/lib/animations';
import { faqItems } from './data';

export function FAQSection() {
  return (
    <section id='faq' className='bg-muted/30 py-20'>
      <div className='mx-auto max-w-3xl px-4 sm:px-6'>
        <motion.div
          variants={staggerContainer}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
        >
          {/* TODO: update section title */}
          <motion.div variants={fadeUp} className='text-center'>
            <h2 className='text-3xl font-bold tracking-tight sm:text-4xl'>
              Frequently asked questions
            </h2>
            <p className='mt-4 text-muted-foreground'>
              Can&apos;t find the answer? Reach out via the contact form.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className='mt-12'>
            <Accordion type='single' collapsible className='space-y-2'>
              {faqItems.map((item, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/features/faq/
git commit -m "feat: add FAQ section with Accordion"
```

---

## Task 18: Contact section + Server Action

**Files:** `src/features/contact/action.ts`, `src/features/contact/ContactSection.tsx`

- [ ] **Step 1: Create `src/features/contact/action.ts`**

```ts
'use server';

import { contactSchema } from './schema';

export async function sendContactMessage(data: {
  name: string;
  email: string;
  message: string;
}): Promise<{ success: boolean; error?: string }> {
  const result = contactSchema.safeParse(data);

  if (!result.success) {
    return { success: false, error: 'Invalid form data.' };
  }

  // TODO: replace with real email provider (Resend, Nodemailer, etc.)
  console.log('Contact form submission:', result.data);

  return { success: true };
}
```

- [ ] **Step 2: Create `src/features/contact/ContactSection.tsx`**

```tsx
'use client';

import { motion } from 'motion/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { staggerContainer, fadeUp } from '@/lib/animations';
import { contactSchema, type ContactFormData } from './schema';
import { sendContactMessage } from './action';

export function ContactSection() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  async function onSubmit(data: ContactFormData) {
    const result = await sendContactMessage(data);
    if (result.success) {
      toast.success("Message sent! We'll get back to you soon.");
      reset();
    } else {
      toast.error(result.error ?? 'Something went wrong. Please try again.');
    }
  }

  return (
    <section id='contact' className='py-20'>
      <div className='mx-auto max-w-xl px-4 sm:px-6'>
        <motion.div
          variants={staggerContainer}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
        >
          {/* TODO: update section title and subtitle */}
          <motion.div variants={fadeUp} className='text-center'>
            <h2 className='text-3xl font-bold tracking-tight sm:text-4xl'>Get in touch</h2>
            <p className='mt-4 text-muted-foreground'>
              Have a question or want to work together? Send us a message.
            </p>
          </motion.div>

          <motion.form
            variants={fadeUp}
            onSubmit={handleSubmit(onSubmit)}
            className='mt-10 space-y-5'
          >
            <div className='space-y-1.5'>
              <Label htmlFor='name'>Name</Label>
              <Input id='name' placeholder='Your name' {...register('name')} />
              {errors.name && (
                <p className='text-xs text-destructive'>{errors.name.message}</p>
              )}
            </div>

            <div className='space-y-1.5'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                type='email'
                placeholder='you@example.com'
                {...register('email')}
              />
              {errors.email && (
                <p className='text-xs text-destructive'>{errors.email.message}</p>
              )}
            </div>

            <div className='space-y-1.5'>
              <Label htmlFor='message'>Message</Label>
              <Textarea
                id='message'
                placeholder="Tell us what's on your mind..."
                rows={5}
                {...register('message')}
              />
              {errors.message && (
                <p className='text-xs text-destructive'>{errors.message.message}</p>
              )}
            </div>

            <Button type='submit' className='w-full' disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send message'}
            </Button>
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Typecheck**

```bash
pnpm typecheck
```

Expected: exits 0.

- [ ] **Step 4: Commit**

```bash
git add src/features/contact/action.ts src/features/contact/ContactSection.tsx
git commit -m "feat: add Contact section with Server Action and Sonner toast"
```

---

## Task 19: Not found page

**Files:** `src/features/not-found/NotFoundPage.tsx`, `app/not-found.tsx`

- [ ] **Step 1: Create `src/features/not-found/NotFoundPage.tsx`**

```tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function NotFoundPage() {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center'>
      <p className='text-6xl font-bold text-muted-foreground'>404</p>
      <h1 className='text-2xl font-semibold'>Página não encontrada</h1>
      <p className='max-w-sm text-muted-foreground'>
        A página que você está procurando não existe ou foi movida.
      </p>
      <Button asChild>
        <Link href='/'>Voltar para o início</Link>
      </Button>
    </div>
  );
}
```

- [ ] **Step 2: Replace `app/not-found.tsx`**

```tsx
import { NotFoundPage } from '@/features/not-found/NotFoundPage';

export default function NotFound() {
  return <NotFoundPage />;
}
```

- [ ] **Step 3: Commit**

```bash
git add src/features/not-found/NotFoundPage.tsx app/not-found.tsx
git commit -m "feat: add 404 Not Found page"
```

---

## Task 20: `app/page.tsx`

**Files:** `app/page.tsx`

- [ ] **Step 1: Replace `app/page.tsx`**

```tsx
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/features/hero/HeroSection';
import { BenefitsSection } from '@/features/benefits/BenefitsSection';
import { PricingSection } from '@/features/pricing/PricingSection';
import { TestimonialsSection } from '@/features/testimonials/TestimonialsSection';
import { FAQSection } from '@/features/faq/FAQSection';
import { ContactSection } from '@/features/contact/ContactSection';

// TODO: remove/reorder sections as needed for each project
export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <BenefitsSection />
        <PricingSection />
        <TestimonialsSection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Typecheck**

```bash
pnpm typecheck
```

Expected: exits 0.

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat: compose all LP sections in page.tsx"
```

---

## Task 21: README + placeholder og-image

**Files:** `README.md`, `public/og-image.png`

- [ ] **Step 1: Replace `README.md`**

```markdown
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

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start dev server |
| `pnpm build` | Production build |
| `pnpm lint` | Run ESLint |
| `pnpm typecheck` | TypeScript check |
| `pnpm test` | Run tests (watch) |
| `pnpm test:run` | Run tests once |
| `pnpm format` | Format all files |

## Email provider (contact form)

The contact form Server Action is in `src/features/contact/action.ts`.
Currently it logs to console. To send real emails, add your provider:

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
```

- [ ] **Step 2: Add og-image placeholder**

Create a 1200×630 placeholder. If ImageMagick is available:

```bash
convert -size 1200x630 xc:#0a0a0a -fill white -gravity Center -pointsize 48 -annotate 0 "og-image — replace me" public/og-image.png 2>/dev/null || echo "Add a 1200x630 image manually to public/og-image.png"
```

If ImageMagick is not available, create `public/og-image.png` with any placeholder image tool (Figma, Canva, etc.). The file must exist for metadata to work in production.

- [ ] **Step 3: Commit**

```bash
git add README.md public/
git commit -m "docs: add README with kickoff checklist"
```

---

## Task 22: Final verification

- [ ] **Step 1: Run all tests**

```bash
pnpm test:run
```

Expected: PASS — 8 tests (4 utils + 4 schema)

- [ ] **Step 2: Run typecheck**

```bash
pnpm typecheck
```

Expected: exits 0.

- [ ] **Step 3: Run lint**

```bash
pnpm lint
```

Expected: exits 0, no warnings.

- [ ] **Step 4: Start dev server and verify visually**

```bash
pnpm dev
```

Open `http://localhost:3000` and verify:
- [ ] Navbar sticks and shows shadow on scroll
- [ ] Dark mode toggle works
- [ ] Mobile menu opens/closes
- [ ] All sections render with mock content
- [ ] Benefits cards fade up on scroll
- [ ] Pricing monthly/annual toggle works
- [ ] FAQ accordion expands/collapses
- [ ] Contact form validates (try submitting empty)
- [ ] Contact form submits successfully (check terminal for console.log)
- [ ] Sonner toast appears on submit
- [ ] Visit `/nonexistent` — 404 page renders
- [ ] Dark mode looks correct in all sections

- [ ] **Step 5: Run production build**

```bash
pnpm build
```

Expected: exits 0. No build errors.

- [ ] **Step 6: Final commit**

```bash
git add -A
git commit -m "chore: verify build and complete LP template implementation"
```
