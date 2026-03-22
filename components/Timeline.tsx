'use client';

import React from 'react';
import { History, Milestone } from 'lucide-react';

const milestones = [
  {
    year: '1990',
    title: 'Store Founded',
    description: 'Began as a small neighborhood grocery point.',
    category: 'The Beginning'
  },
  {
    year: '2005',
    title: 'Major Expansion',
    description: 'Introduced fresh dairy and bakery sections.',
    category: 'Growth'
  },
  {
    year: '2015',
    title: 'Modernization',
    description: 'Digital inventory and state-of-the-art storage.',
    category: 'Innovation'
  },
  {
    year: '2024',
    title: 'One-Stop Point',
    description: 'The ultimate destination for all your needs.',
    category: 'Today'
  }
];

export function Timeline() {
  return (
    <section id="legacy" className="py-24 bg-emerald-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-16">
          <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-200">
            <History className="text-white w-6 h-6" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">Our Legacy</h2>
            <p className="text-emerald-700 font-bold uppercase tracking-widest text-xs">Over 3 Decades of Excellence</p>
          </div>
        </div>

        <div className="relative">
          {/* Horizontal Line */}
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-emerald-200 -translate-y-1/2 hidden md:block" />
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
            {milestones.map((item, index) => (
              <div key={index} className="group relative">
                <div className="mb-6 md:mb-12 flex flex-col items-center md:items-start">
                  <span className="text-4xl font-black text-emerald-600 mb-2">{item.year}</span>
                  <div className="w-12 h-12 rounded-full bg-white border-4 border-emerald-500 shadow-xl flex items-center justify-center mb-6 z-10 group-hover:scale-125 transition-transform duration-500">
                    <Milestone className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div className="text-center md:text-left">
                    <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest mb-1 block">{item.category}</span>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
