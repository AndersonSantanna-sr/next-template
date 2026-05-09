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
