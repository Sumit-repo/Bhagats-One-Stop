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
      <ServiceCards />
      <Timeline />
      <Testimonials />
      <Contact />
      
      {/* Footer */}
      <footer className="bg-slate-900 py-16 px-4 border-t border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <img 
            src="/logo-light.png" 
            alt="Bhagat's One-Stop Point" 
            className="h-16 w-auto mb-8 opacity-90 transition-opacity hover:opacity-100 object-contain"
          />
          <p className="text-slate-400 text-sm font-semibold tracking-wide">
            © {new Date().getFullYear()} Bhagat's One-Stop Point. Trusted Service Since 1999.
          </p>
        </div>
      </footer>

      <WhatsAppButton />
    </main>
  );
}
