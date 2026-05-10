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
