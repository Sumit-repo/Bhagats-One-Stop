import type { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';

export const metadata: Metadata = {
  title: "Bhagat's One-Stop Point Kishanganj | Grocery, Dairy & Xerox",
  description:
    "Kishanganj's trusted general store for fresh Sudha & Amul dairy, groceries, Xerox, passport photos, and AEPS cash withdrawal. Home delivery via WhatsApp. Trusted since 1999.",
  openGraph: {
    title: "Bhagat's One-Stop Point — Kishanganj's Neighborhood Store",
    description:
      "Fresh dairy, groceries, Xerox, passport photos, and AEPS banking in Kishanganj, Bihar. WhatsApp us for home delivery.",
  },
};
import { Hero } from '@/components/Hero';
import { ServiceCards } from '@/components/ServiceCards';
import { Timeline } from '@/components/Timeline';
import { Testimonials } from '@/components/Testimonials';
import { Contact } from '@/components/Contact';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { PublicFooter } from '@/components/PublicFooter';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <div className="scroll-mt-24 min-h-[90vh]" id="services">
        <ServiceCards />
      </div>
      <div className="scroll-mt-24 min-h-[90vh]" id="legacy">
        <Timeline />
      </div>
      <div className="scroll-mt-24 min-h-[90vh]" id="reviews">
        <Testimonials />
      </div>
      <div className="scroll-mt-24 min-h-[90vh]" id="contact">
        <Contact />
      </div>

      <PublicFooter />

      <WhatsAppButton />
    </main>
  );
}
