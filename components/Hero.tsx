'use client';

import React, { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

const slides = [
  {
    id: 1,
    title: 'Premium Grocery',
    subtitle: 'Sudha & Amul Milk Products',
    description: 'Fresh dairy and daily essentials delivered every morning.',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1000',
    color: 'emerald'
  },
  {
    id: 2,
    title: 'General Store',
    subtitle: 'Everything You Need',
    description: 'From snacks to household items, we are your one-stop point.',
    image: "https://images.unsplash.com/photo-1534723452862-4c874018d66d?q=80&w=1600&auto=format&fit=crop", // General store/Aisle placeholder',
    color: 'teal'
  },
  {
    id: 3,
    title: 'Bakery & Snacks',
    subtitle: 'Fresh & Delicious',
    description: 'A wide range of biscuits, chips, and bakery favorites.',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=1000',
    color: 'emerald'
  }
];

export function Hero() {
  const [activeSlide, setActiveSlide] = useState(1);

  return (
    <section className="relative pt-32 pb-20 overflow-hidden bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm font-bold uppercase tracking-wider mb-4 animate-bounce">
            <Sparkles className="w-4 h-4" />
            <span>Trusted since 1999</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-foreground mb-6 tracking-tight">
            Quality You Can <span className="text-emerald-600 underline decoration-emerald-200 underline-offset-8">Trust</span>
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-muted-foreground font-medium">
            Your neighborhood favorite for fresh dairy, groceries, and daily essentials.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 h-[500px] w-full">
          {slides.map((slide) => (
            <div
              key={slide.id}
              onClick={() => setActiveSlide(slide.id)}
              className={`relative cursor-pointer overflow-hidden rounded-3xl transition-all duration-700 ease-in-out ${activeSlide === slide.id ? 'flex-[3] shadow-xl shadow-black/10' : 'flex-1 hover:flex-[1.2]'
                }`}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500 ${activeSlide === slide.id ? 'opacity-100' : 'opacity-60'
                }`} />

              <div className={`absolute bottom-0 left-0 p-8 w-full transition-all duration-500 transform ${activeSlide === slide.id ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 md:opacity-100 md:translate-y-0'
                }`}>
                {activeSlide === slide.id && (
                  <span className="inline-block px-3 py-1 rounded-full bg-emerald-500 text-white text-xs font-bold uppercase tracking-widest mb-3">
                    {slide.subtitle}
                  </span>
                )}
                <h3 className={`font-black text-white tracking-tight ${activeSlide === slide.id ? 'text-4xl' : 'text-xl rotate-0 md:-rotate-90 md:origin-left md:whitespace-nowrap md:mb-12'
                  }`}>
                  {slide.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
