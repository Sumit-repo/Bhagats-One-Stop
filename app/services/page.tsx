import type { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { PublicFooter } from '@/components/PublicFooter';
import { siteMeta } from '@/lib/content';
import {
  Printer,
  Camera,
  Shield,
  Fingerprint,
  CheckCircle,
  ArrowRight,
  Clock,
  Phone,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Xerox, AEPS Banking & Digital Services in Kishanganj | Bhagat\'s One-Stop Point',
  description:
    "Kishanganj's go-to center for Xerox printing, passport photos, document lamination, and AEPS Aadhaar-based cash withdrawal. Fast, reliable, affordable — open daily 7 AM to 9 PM.",
  openGraph: {
    title: 'Digital Services in Kishanganj — Xerox, AEPS, Passport Photos',
    description:
      'Xerox, colour printing, passport photos, document lamination, and AEPS cash withdrawal in Kishanganj, Bihar.',
  },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Digital Services at Bhagat\'s One-Stop Point, Kishanganj',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      item: {
        '@type': 'Service',
        name: 'Xerox & Photocopying',
        description:
          'High-speed black & white and colour photocopies. Documents, ID cards, certificates. Crystal-clear output at affordable rates.',
        provider: { '@type': 'LocalBusiness', name: "Bhagat's One-Stop Point" },
        areaServed: 'Kishanganj',
      },
    },
    {
      '@type': 'ListItem',
      position: 2,
      item: {
        '@type': 'Service',
        name: 'Passport & Visa Photographs',
        description:
          'Studio-quality passport and visa photographs printed in minutes. Correct dimensions for all government and consulate requirements.',
        provider: { '@type': 'LocalBusiness', name: "Bhagat's One-Stop Point" },
        areaServed: 'Kishanganj',
      },
    },
    {
      '@type': 'ListItem',
      position: 3,
      item: {
        '@type': 'Service',
        name: 'Document Lamination',
        description:
          'Protect important certificates, ID cards, and documents with durable hot lamination. Available in multiple sizes.',
        provider: { '@type': 'LocalBusiness', name: "Bhagat's One-Stop Point" },
        areaServed: 'Kishanganj',
      },
    },
    {
      '@type': 'ListItem',
      position: 4,
      item: {
        '@type': 'Service',
        name: 'AEPS Cash Withdrawal',
        description:
          'Secure Aadhaar-enabled cash withdrawal using fingerprint authentication. Instant, bank-grade security — no card or PIN required.',
        provider: { '@type': 'LocalBusiness', name: "Bhagat's One-Stop Point" },
        areaServed: 'Kishanganj',
      },
    },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Where can I get Xerox done in Kishanganj?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Bhagat's One-Stop Point (Uma Xerox) in Kishanganj, Bihar offers high-speed black & white and colour Xerox printing, open daily 7 AM to 9 PM. Call or WhatsApp +91 70042 11630.",
      },
    },
    {
      '@type': 'Question',
      name: 'Where can I get passport photos taken in Kishanganj?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Bhagat's One-Stop Point in Kishanganj offers professional passport and visa photographs printed in minutes, correctly sized for all government requirements. Open 7 AM–9 PM daily.",
      },
    },
    {
      '@type': 'Question',
      name: 'Where can I withdraw cash using AEPS Aadhaar in Kishanganj?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Bhagat's One-Stop Point in Kishanganj offers AEPS (Aadhaar-Enabled Payment System) cash withdrawal using fingerprint authentication. Instant, secure, no card needed. Visit us or call +91 70042 11630.",
      },
    },
    {
      '@type': 'Question',
      name: 'How much does Xerox cost at Bhagat\'s One-Stop Point?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Xerox rates at Bhagat's One-Stop Point, Kishanganj start at very affordable per-page rates for both black & white and colour copies. Contact us on WhatsApp +91 70042 11630 for current pricing.",
      },
    },
  ],
};

const services = [
  {
    icon: Printer,
    title: 'High-Speed Xerox & Printing',
    slug: 'xerox',
    color: 'emerald',
    iconBg: 'bg-emerald-100 dark:bg-emerald-500/10',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    desc: 'Crystal-clear black & white and colour photocopies with rapid turnaround. Documents, ID cards, mark sheets, certificates — any size, any quantity.',
    features: [
      'Black & white copies — affordable per-page rates',
      'Colour copies available',
      'A4, A3, and legal sizes',
      'Document scanning',
      'Bulk orders welcome',
    ],
    whatsapp: 'I need Xerox / printing done.',
  },
  {
    icon: Camera,
    title: 'Passport & Visa Photographs',
    slug: 'passport-photos',
    color: 'blue',
    iconBg: 'bg-blue-100 dark:bg-blue-500/10',
    iconColor: 'text-blue-600 dark:text-blue-400',
    desc: 'Studio-quality passport and visa photographs printed in minutes. Perfect dimensions for Indian passport, Aadhaar, PAN card, visa applications, and all government forms.',
    features: [
      'Indian passport size (3.5×4.5 cm)',
      'Visa & consulate specs available',
      'White & coloured backgrounds',
      'Ready in minutes',
      'Government & bank accepted',
    ],
    whatsapp: 'I need passport photos.',
  },
  {
    icon: Shield,
    title: 'Document Lamination',
    slug: 'lamination',
    color: 'amber',
    iconBg: 'bg-amber-100 dark:bg-amber-500/10',
    iconColor: 'text-amber-600 dark:text-amber-400',
    desc: 'Protect your most important documents with durable hot lamination. Certificates, ID cards, mark sheets, and photos — kept safe from water, wear, and tear.',
    features: [
      'Hot & cold lamination',
      'Multiple pocket sizes',
      'Credit card to A3 sizes',
      'ID card thickness available',
      'Quick turnaround',
    ],
    whatsapp: 'I need document lamination.',
  },
  {
    icon: Fingerprint,
    title: 'AEPS Cash Withdrawal',
    slug: 'aeps',
    color: 'rose',
    iconBg: 'bg-rose-100 dark:bg-rose-500/10',
    iconColor: 'text-rose-600 dark:text-rose-400',
    desc: 'Aadhaar-Enabled Payment System (AEPS) lets you withdraw cash from your bank account using only your Aadhaar number and fingerprint — no ATM card or PIN needed.',
    features: [
      'No ATM card required',
      'Aadhaar + fingerprint only',
      'Instant, bank-grade security',
      'All major banks supported',
      'Available daily 7 AM–9 PM',
    ],
    whatsapp: 'I need AEPS cash withdrawal.',
  },
];

const colorBorderMap: Record<string, string> = {
  emerald: 'hover:border-emerald-200 dark:hover:border-emerald-500/30',
  blue: 'hover:border-blue-200 dark:hover:border-blue-500/30',
  amber: 'hover:border-amber-200 dark:hover:border-amber-500/30',
  rose: 'hover:border-rose-200 dark:hover:border-rose-500/30',
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-black uppercase tracking-widest rounded-full mb-6">
            🖨️ Digital Services, Kishanganj
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-foreground tracking-tight mb-4">
            Xerox, AEPS & Digital<br />
            <span className="text-emerald-600">Services in Kishanganj</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-medium mb-8">
            Fast, reliable, and affordable digital services for the people of Kishanganj, Bihar.
            Xerox printing, passport photos, document lamination, and Aadhaar-based cash withdrawal — all under one roof.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`https://wa.me/${siteMeta.phone}?text=Hi%2C%20I%20need%20some%20digital%20services.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-black transition-all hover:scale-105 active:scale-95"
            >
              WhatsApp Us <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href={siteMeta.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-900 dark:text-white rounded-2xl font-black transition-colors"
            >
              Get Directions
            </a>
          </div>
        </div>
      </section>

      {/* Quick info bar */}
      <div className="bg-emerald-50 dark:bg-emerald-500/5 border-y border-emerald-100 dark:border-emerald-500/10 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap justify-center gap-8">
          <div className="flex items-center gap-2 text-sm font-bold text-emerald-700 dark:text-emerald-400">
            <Clock className="w-4 h-4" /> Open 7 AM – 9 PM · 7 Days
          </div>
          <div className="flex items-center gap-2 text-sm font-bold text-emerald-700 dark:text-emerald-400">
            <Phone className="w-4 h-4" /> +91 70042 11630
          </div>
          <div className="flex items-center gap-2 text-sm font-bold text-emerald-700 dark:text-emerald-400">
            <CheckCircle className="w-4 h-4" /> Trusted Since 1999
          </div>
        </div>
      </div>

      {/* Services */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {services.map(({ icon: Icon, title, color, iconBg, iconColor, desc, features, whatsapp }) => (
            <div
              key={title}
              className={`p-8 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl ${colorBorderMap[color]} transition-colors`}
            >
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-shrink-0">
                  <div className={`w-16 h-16 ${iconBg} rounded-2xl flex items-center justify-center`}>
                    <Icon className={`w-8 h-8 ${iconColor}`} />
                  </div>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-3">{title}</h2>
                  <p className="text-muted-foreground leading-relaxed mb-5">{desc}</p>
                  <ul className="space-y-2 mb-6">
                    {features.map(f => (
                      <li key={f} className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-slate-300">
                        <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" /> {f}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={`https://wa.me/${siteMeta.phone}?text=Hi%2C%20${encodeURIComponent(whatsapp)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-sm transition-colors"
                  >
                    Enquire on WhatsApp <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-black text-foreground mb-8 text-center">Common Questions</h2>
          <div className="space-y-4">
            {faqSchema.mainEntity.map((item) => (
              <details
                key={item.name}
                className="group bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl overflow-hidden"
              >
                <summary className="flex items-center justify-between p-5 cursor-pointer list-none font-bold text-sm text-gray-900 dark:text-white">
                  {item.name}
                  <span className="text-emerald-600 dark:text-emerald-400 text-lg leading-none group-open:rotate-45 transition-transform duration-200">+</span>
                </summary>
                <p className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">
                  {item.acceptedAnswer.text}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-emerald-600 rounded-3xl p-10 text-center">
            <h2 className="text-3xl font-black text-white mb-3">Visit Us in Kishanganj</h2>
            <p className="text-emerald-100 font-medium mb-6 max-w-xl mx-auto">
              We are open every day from 7 AM to 9 PM. Walk in or WhatsApp ahead — we will have your work ready fast.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={siteMeta.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-white text-emerald-700 rounded-2xl font-black hover:bg-emerald-50 transition-colors"
              >
                Open in Maps
              </a>
              <a
                href={`https://wa.me/${siteMeta.phone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-emerald-700 border border-emerald-500 text-white rounded-2xl font-black hover:bg-emerald-800 transition-colors"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>

      <PublicFooter />
      <WhatsAppButton />
    </main>
  );
}
