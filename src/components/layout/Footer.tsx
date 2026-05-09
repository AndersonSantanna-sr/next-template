import Link from 'next/link';
import { Share2, ExternalLink, Mail } from 'lucide-react';

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
  { icon: Mail, href: '#', label: 'Email' },
  { icon: ExternalLink, href: '#', label: 'Website' },
  { icon: Share2, href: '#', label: 'Share' },
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
          {/* TODO: update company name */}© {new Date().getFullYear()} ProductName. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
