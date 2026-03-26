import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { ServiceCards } from '@/components/ServiceCards';
import { Timeline } from '@/components/Timeline';
import { Testimonials } from '@/components/Testimonials';
import { Contact } from '@/components/Contact';
import { WhatsAppButton } from '@/components/WhatsAppButton';

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

      {/* Professional Slim Footer */}
      <footer className="bg-slate-950 py-6 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src="/logo-light.png"
              alt="Bhagat's One-Stop Point"
              className="h-7 w-auto opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300"
            />
            <div className="h-4 w-px bg-slate-800 hidden md:block" />
            <p className="text-slate-500 text-[11px] font-bold uppercase tracking-[0.2em]">
              Trusted Since 1999
            </p>
          </div>
          <p className="text-slate-600 text-[10px] font-medium tracking-tight">
            © {new Date().getFullYear()} Bhagat's One-Stop Point. All Rights Reserved.
          </p>
        </div>
      </footer>

      <WhatsAppButton />
    </main>
  );
}
