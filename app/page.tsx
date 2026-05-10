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
