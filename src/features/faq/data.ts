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
