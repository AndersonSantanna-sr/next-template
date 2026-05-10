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
