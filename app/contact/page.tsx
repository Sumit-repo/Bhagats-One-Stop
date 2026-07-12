import type { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { PublicFooter } from '@/components/PublicFooter';
import { GoogleRating } from '@/components/GoogleRating';
import { siteMeta } from '@/lib/content';
import { Phone, MapPin, Clock, MessageCircle } from 'lucide-react';

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: "What are Bhagat's One-Stop Point store hours?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Bhagat's One-Stop Point is open Monday through Sunday, 7 AM to 9 PM.",
      },
    },
    {
      '@type': 'Question',
      name: "Does Bhagat's One-Stop Point offer home delivery?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes, Bhagat's One-Stop Point offers home delivery. Send your order list on WhatsApp to +91 70042 11630 and we will confirm availability and deliver to your door.",
      },
    },
    {
      '@type': 'Question',
      name: 'Does Bhagat\'s sell Sudha milk and Amul products?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes. Bhagat's One-Stop Point stocks fresh Sudha and Amul dairy products daily, including full cream milk, toned milk, curd, paneer, butter, and buttermilk.",
      },
    },
    {
      '@type': 'Question',
      name: "Where is Bhagat's One-Stop Point located?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Bhagat's One-Stop Point (also known as Uma Xerox) is located in Kishanganj, Bihar. Find us on Google Maps: https://maps.app.goo.gl/3ugWFGWYusQPKEr9A",
      },
    },
    {
      '@type': 'Question',
      name: "Does Bhagat's offer Xerox and printing services?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes. Bhagat's One-Stop Point offers high-speed black & white and colour Xerox, document lamination, and professional passport and visa photographs.",
      },
    },
    {
      '@type': 'Question',
      name: "Does Bhagat's offer AEPS cash withdrawal?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes. Bhagat's One-Stop Point offers AEPS (Aadhaar-Enabled Payment System) cash withdrawal using secure fingerprint authentication.",
      },
    },
  ],
};

export const metadata: Metadata = {
  title: "Contact Us | Bhagat's One-Stop Point, Kishanganj",
  description:
    "Find us in Kishanganj, Bihar or reach out on WhatsApp +91 70042 11630 for home delivery. Open 7 AM–9 PM daily.",
  openGraph: {
    title: "Contact Bhagat's One-Stop Point — Kishanganj, Bihar",
    description: 'Visit us in Kishanganj or WhatsApp +91 70042 11630 for delivery. Open 7 days, 7 AM–9 PM.',
  },
};

const contactInfo = [
  {
    icon: Phone,
    label: 'WhatsApp & Phone',
    value: '+91 70042 11630',
    href: `https://wa.me/${siteMeta.phone}`,
    cta: 'Message Us',
    color: 'emerald',
  },
  {
    icon: MapPin,
    label: 'Find Us',
    value: 'Uma Xerox, Local Area',
    href: siteMeta.mapUrl,
    cta: 'Open in Maps',
    color: 'blue',
  },
  {
    icon: Clock,
    label: 'Store Hours',
    value: 'Mon – Sun: 7 AM – 9 PM',
    href: null,
    cta: null,
    color: 'amber',
  },
  {
    icon: MessageCircle,
    label: 'Home Delivery',
    value: 'WhatsApp your order list',
    href: `https://wa.me/${siteMeta.phone}?text=Hi%2C%20I%20would%20like%20to%20place%20an%20order%20for%20home%20delivery.`,
    cta: 'Order Now',
    color: 'emerald',
  },
];

const colorMap: Record<string, string> = {
  emerald: 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  blue: 'bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400',
  amber: 'bg-amber-100 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400',
};

const ctaColorMap: Record<string, string> = {
  emerald: 'bg-emerald-600 hover:bg-emerald-700 text-white',
  blue: 'bg-blue-600 hover:bg-blue-700 text-white',
  amber: 'bg-amber-500 hover:bg-amber-600 text-white',
};

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-black uppercase tracking-widest rounded-full mb-6">
            📍 Get In Touch
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-foreground tracking-tight mb-4">
            {siteMeta.contactTitle}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-medium">
            Find us in the neighborhood or reach out for home delivery. We are always just a WhatsApp away.
          </p>
        </div>
      </section>

      {/* Google Rating */}
      <div className="flex justify-center pb-12">
        <GoogleRating />
      </div>

      {/* Contact Cards */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {contactInfo.map(({ icon: Icon, label, value, href, cta, color }) => (
              <div
                key={label}
                className="p-6 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl flex flex-col gap-4"
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${colorMap[color]}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-black uppercase tracking-widest text-gray-400 dark:text-slate-500 mb-1">{label}</p>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">{value}</p>
                </div>
                {href && cta && (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full text-center py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-colors ${ctaColorMap[color]}`}
                  >
                    {cta}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map + Info */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="rounded-2xl overflow-hidden border border-gray-100 dark:border-slate-800"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', alignItems: 'stretch' }}
          >
            <div style={{ width: '100%', minHeight: '400px' }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2533.4127169554577!2d87.95600801091413!3d26.10588312310992!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e517288fd61359%3A0x6775ec8e87e5bdc4!2sUma%20Xerox!5e0!3m2!1sen!2sin!4v1774471201192!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'var(--map-filter)', display: 'block', minHeight: '400px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Bhagat's One-Stop Point Location"
              />
            </div>
            <div className="p-8 bg-white dark:bg-slate-900 flex flex-col justify-center gap-6">
              <div>
                <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-3">Visit Our Store</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We are located in the heart of the community. Drop by for high-speed digital services, fresh daily
                  dairy, or to pick up your groceries. Home delivery available on WhatsApp.
                </p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                  <span className="text-sm font-medium text-gray-700 dark:text-slate-300">Open 7 days a week · 7 AM – 9 PM</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                  <span className="text-sm font-medium text-gray-700 dark:text-slate-300">+91 70042 11630</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={siteMeta.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-sm transition-colors"
                >
                  Open in Maps
                </a>
                <a
                  href={`https://wa.me/${siteMeta.phone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center py-3 bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-900 dark:text-white rounded-xl font-bold text-sm transition-colors"
                >
                  WhatsApp for Delivery
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section — visible and schema-backed */}
      <section className="pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-black text-foreground mb-8 text-center">Frequently Asked Questions</h2>
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

      <PublicFooter />
      <WhatsAppButton />
    </main>
  );
}
