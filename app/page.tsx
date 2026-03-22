import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { ServiceCards } from '@/components/ServiceCards';
import { Timeline } from '@/components/Timeline';
import { WhatsAppButton } from '@/components/WhatsAppButton';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <ServiceCards />
      <Timeline />
      
      {/* Footer */}
      <footer className="bg-gray-900 py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400 text-sm font-medium">
            © {new Date().getFullYear()} Bhagat's One-Stop Point. All rights reserved.
          </p>
        </div>
      </footer>

      <WhatsAppButton />
    </main>
  );
}
