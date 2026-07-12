import type { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { PublicFooter } from '@/components/PublicFooter';
import { siteMeta } from '@/lib/content';
import { ShoppingBag, ArrowRight, ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: "General Store | Bhagat's One-Stop Point",
  description:
    "Rice, pulses, cooking oils, spices, detergents, stationery and 1000+ daily essentials. Your complete neighborhood general store for home delivery or in-store.",
  openGraph: {
    title: "General Store — Bhagat's One-Stop Point",
    description: 'Rice, oils, spices, stationery, cleaning supplies and 1000+ daily essentials.',
  },
};

const sections = [
  {
    title: 'Staples & Kitchen',
    items: [
      { name: 'Basmati Rice (India Gate)', price: 'From ₹90 / kg' },
      { name: 'Toor Dal / Masoor Dal', price: '₹85–₹100 / kg' },
      { name: 'Soyabean / Sunflower Oil', price: 'From ₹120 / L' },
      { name: 'Aashirvaad Atta (5kg)', price: '₹210' },
      { name: 'MDH / Everest Spices', price: 'From ₹25' },
      { name: 'Salt & Sugar', price: '₹20–₹45 / kg' },
    ],
  },
  {
    title: 'Personal Care',
    items: [
      { name: 'Dove / Lux Soap', price: 'From ₹40' },
      { name: 'Colgate Toothpaste', price: 'From ₹55' },
      { name: 'Head & Shoulders Shampoo', price: 'From ₹85 / 100ml' },
      { name: 'Dettol Hand Wash', price: '₹80 / 200ml' },
      { name: 'Nivea / Parachute Oil', price: 'From ₹60' },
      { name: 'Garnier Face Wash', price: 'From ₹80' },
    ],
  },
  {
    title: 'Household & Cleaning',
    items: [
      { name: 'Surf Excel Detergent', price: 'From ₹50 / 500g' },
      { name: 'Vim Dishwash Bar', price: '₹20 each' },
      { name: 'Harpic Toilet Cleaner', price: '₹85 / 500ml' },
      { name: 'Colin Glass Cleaner', price: '₹75 / 250ml' },
      { name: 'Plastic Containers / Boxes', price: 'From ₹35' },
      { name: 'Brooms & Mops', price: 'From ₹60' },
    ],
  },
  {
    title: 'Stationery & School',
    items: [
      { name: 'Classmate Notebooks', price: 'From ₹25' },
      { name: 'Ball Pens (Reynolds/Cello)', price: 'From ₹8' },
      { name: 'Geometry Box / Scales', price: 'From ₹30' },
      { name: 'Sketch Pens / Crayons', price: 'From ₹40' },
      { name: 'A4 Paper (1 Ream)', price: '₹250' },
      { name: 'Envelopes / Files', price: 'From ₹5' },
    ],
  },
];

export default function GeneralPage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Breadcrumb */}
      <div className="pt-24 pb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
            <Link href="/" className="hover:text-emerald-600 transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/shop" className="hover:text-emerald-600 transition-colors">Shop</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-900 dark:text-white font-bold">General Store</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="pb-12 pt-6 bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-500/5 dark:to-green-500/5 border-b border-emerald-100 dark:border-emerald-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-500/10 rounded-2xl flex items-center justify-center">
              <ShoppingBag className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400">1000+ Items</span>
              <h1 className="text-3xl md:text-5xl font-black text-foreground tracking-tight">General Store</h1>
            </div>
          </div>
          <p className="text-muted-foreground font-medium max-w-xl leading-relaxed">
            Everything for your home — rice, pulses, oils, spices, cleaning supplies, personal care, and stationery.
            All your monthly grocery shopping, sorted in one visit.
          </p>
        </div>
      </section>

      {/* Product Sections */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {sections.map(({ title, items }) => (
            <div key={title}>
              <h2 className="text-lg font-black text-foreground mb-5 flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full" />
                {title}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {items.map(({ name, price }) => (
                  <div
                    key={name}
                    className="flex items-center justify-between p-4 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-xl hover:border-emerald-200 dark:hover:border-emerald-500/30 transition-colors"
                  >
                    <p className="text-sm font-bold text-gray-900 dark:text-white">{name}</p>
                    <p className="text-sm font-black text-emerald-600 dark:text-emerald-400 flex-shrink-0 ml-4">{price}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <p className="text-sm text-muted-foreground italic">
            * Prices and availability subject to change. WhatsApp us for the latest pricing or to check stock.
          </p>
        </div>
      </section>

      {/* Order CTA */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-emerald-600 rounded-3xl p-10 text-center">
            <h2 className="text-2xl font-black text-white mb-3">Send Your Monthly Grocery List</h2>
            <p className="text-emerald-100 font-medium mb-6">
              WhatsApp us your list and we will confirm availability, total, and delivery time. Easy, local, reliable.
            </p>
            <a
              href={`https://wa.me/${siteMeta.phone}?text=Hi%2C%20I%20would%20like%20to%20place%20a%20grocery%20order.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-emerald-700 rounded-2xl font-black hover:bg-emerald-50 transition-colors"
            >
              WhatsApp Your Order
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      <PublicFooter />
      <WhatsAppButton />
    </main>
  );
}
