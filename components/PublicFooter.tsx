import Link from 'next/link';
import { siteMeta } from '@/lib/content';

export function PublicFooter() {
  return (
    <footer className="bg-slate-950 py-8 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img
              src="/logo-light.png"
              alt="Bhagat's"
              className="h-7 w-auto opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300"
            />
            <div className="flex flex-col leading-tight">
              <span className="text-slate-300 text-sm font-black">Bhagat&apos;s</span>
              <span className="text-emerald-500 text-[9px] font-bold uppercase tracking-[0.2em]">One-Stop Point</span>
            </div>
            <div className="h-4 w-px bg-slate-800 hidden md:block" />
            <p className="text-slate-500 text-[11px] font-bold uppercase tracking-[0.2em] hidden md:block">
              Trusted Since 1999 · Kishanganj
            </p>
          </div>

          <nav className="flex flex-wrap justify-center gap-6">
            <Link href="/shop" className="text-slate-500 hover:text-emerald-400 text-xs font-medium transition-colors">Shop</Link>
            <Link href="/services" className="text-slate-500 hover:text-emerald-400 text-xs font-medium transition-colors">Services</Link>
            <Link href="/about" className="text-slate-500 hover:text-emerald-400 text-xs font-medium transition-colors">About</Link>
            <Link href="/contact" className="text-slate-500 hover:text-emerald-400 text-xs font-medium transition-colors">Contact</Link>
            <a
              href={siteMeta.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-emerald-400 text-xs font-medium transition-colors"
            >
              Find Us
            </a>
            <Link href="/login" className="text-slate-700 hover:text-slate-500 text-xs font-medium transition-colors">
              Staff Login
            </Link>
          </nav>
        </div>

        <div className="mt-6 pt-6 border-t border-slate-900 text-center">
          <p className="text-slate-700 text-[10px] font-medium tracking-tight">
            © {new Date().getFullYear()} Bhagat&apos;s — One-Stop Point, Kishanganj. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
