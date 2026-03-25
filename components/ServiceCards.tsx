'use client';

import React from 'react';
import { Milk, Package, Coffee, Cookie } from 'lucide-react';

const services = [
  {
    title: 'Sudha Dairy',
    description: 'Fresh milk, curd, and butter delivered daily from Sudha.',
    icon: Milk,
    items: ['Full Cream Milk', 'Toned Milk', 'Fresh Curd', 'Lassi']
  },
  {
    title: 'Amul Products',
    description: 'Genuine Amul dairy products and snacks.',
    icon: Package,
    items: ['Amul Gold', 'Taaza', 'Amul Butter', 'Cheese']
  },
  {
    title: 'General Store',
    description: 'All your household essentials in one place.',
    icon: Coffee,
    items: ['Soap & Detergents', 'Oils', 'Spices', 'Stationary']
  },
  {
    title: 'Snacks & Bakery',
    description: 'Perfect companions for your tea time.',
    icon: Cookie,
    items: ['Biscuits', 'Namkeen', 'Buns', 'Cakes']
  }
];

export function ServiceCards() {
  return (
    <section id="services" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4 tracking-tight">Our Core Offerings</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto font-medium">Quality brands and fresh products verified for your satisfaction.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="group p-8 rounded-3xl border border-border bg-background hover:bg-emerald-600 dark:hover:bg-emerald-600 transition-all duration-500 shadow-xl shadow-black/5 hover:shadow-black/10 hover:-translate-y-2">
              <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-white transition-colors">
                <service.icon className="w-7 h-7 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-white transition-colors">{service.title}</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed group-hover:text-emerald-50 transition-colors uppercase text-xs font-bold tracking-wider">
                {service.description}
              </p>
              <ul className="space-y-2">
                {service.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-white transition-colors">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 group-hover:bg-emerald-200" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
