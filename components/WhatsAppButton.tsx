'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';

export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/919999999999" // Placeholder number
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-[100] group flex items-center gap-3 bg-emerald-500 text-white p-4 rounded-full shadow-2xl shadow-emerald-300 hover:bg-emerald-600 transition-all duration-500 hover:scale-110 active:scale-95"
    >
      <div className="w-8 h-8 flex items-center justify-center">
        <MessageCircle className="w-8 h-8" />
      </div>
      <span className="max-w-0 overflow-hidden whitespace-nowrap font-bold group-hover:max-w-[200px] transition-all duration-500 ease-in-out">
        Chat with us
      </span>
    </a>
  );
}
