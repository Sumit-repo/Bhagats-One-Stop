import type { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import { Timeline } from '@/components/Timeline';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { PublicFooter } from '@/components/PublicFooter';
import { siteMeta, googleReviews } from '@/lib/content';
import { Heart, Users, Award, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: "About Us | Bhagat's One-Stop Point",
  description:
    "Serving our community since 1999 — from a humble electronics shop to your neighborhood's most trusted general store and digital services hub.",
  openGraph: {
    title: "About Bhagat's One-Stop Point",
    description:
      "25+ years of serving our neighborhood with digital services, fresh dairy, and daily essentials.",
  },
};

const values = [
  {
    icon: Heart,
    title: 'Community First',
    desc: 'Every decision we make starts with one question: does this help our neighbors? We are not just a business — we are part of the fabric of this neighborhood.',
  },
  {
    icon: Award,
    title: 'Quality Without Compromise',
    desc: 'From Sudha and Amul dairy products to premium stationery, we stock only trusted brands that we would personally use at home.',
  },
  {
    icon: Users,
    title: 'Always Accessible',
    desc: "We keep our prices fair, our hours long, and our WhatsApp open. Whether you need a single printout or a month's groceries, you are always welcome.",
  },
  {
    icon: MapPin,
    title: 'Rooted Locally',
    desc: 'We know our customers by name. That personal connection drives us to go beyond a transaction and build a relationship with every visit.',
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-black uppercase tracking-widest rounded-full mb-6">
            Our Story
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-foreground tracking-tight mb-6 leading-tight">
            Built on Trust.<br />
            <span className="text-emerald-600">Grown by Community.</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-medium leading-relaxed">
            What started as a small electronics repair shop in 1999 has grown into the neighborhood&apos;s most
            complete one-stop destination — serving hundreds of families every single day.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-emerald-50 dark:bg-emerald-500/5 border-y border-emerald-100 dark:border-emerald-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '25+', label: 'Years Serving' },
              { value: '500+', label: 'Daily Customers' },
              { value: '1000+', label: 'Products Stocked' },
              { value: '4.5★', label: 'Google Rating' },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="text-4xl font-black text-emerald-600 dark:text-emerald-400">{value}</p>
                <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <Timeline />

      {/* Values */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-black uppercase tracking-widest rounded-full mb-4">
              What We Stand For
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-foreground tracking-tight">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="flex gap-5 p-6 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl hover:border-emerald-200 dark:hover:border-emerald-500/30 transition-colors"
              >
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-500/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-base font-black text-gray-900 dark:text-white mb-2">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900/50" id="reviews">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-black uppercase tracking-widest rounded-full mb-4">
              What Customers Say
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-foreground tracking-tight">Trusted by Our Neighbors</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {googleReviews.map((review) => (
              <div
                key={review.id}
                className="p-6 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl"
              >
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-amber-400 fill-amber-400" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">&ldquo;{review.text}&rdquo;</p>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-black text-gray-900 dark:text-white">{review.name}</p>
                  <p className="text-xs text-gray-400">{review.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-emerald-600">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Come Say Hello</h2>
          <p className="text-emerald-100 font-medium mb-8">
            We&apos;d love to see you in the store, or you can reach us instantly on WhatsApp for home delivery or any questions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={siteMeta.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-white text-emerald-700 rounded-2xl font-black hover:bg-emerald-50 transition-colors"
            >
              Get Directions
            </a>
            <a
              href={`https://wa.me/${siteMeta.phone}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-emerald-700 text-white rounded-2xl font-black hover:bg-emerald-800 transition-colors border border-emerald-500"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      <PublicFooter />
      <WhatsAppButton />
    </main>
  );
}
