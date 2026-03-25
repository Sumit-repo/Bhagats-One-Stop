import React from 'react';
import { MessageCircle } from 'lucide-react';
import { siteMeta } from '@/lib/content';

export function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${siteMeta.phone}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-[100] group flex items-center justify-center bg-[#25d366] text-white p-4 rounded-full shadow-xl shadow-black/10 hover:bg-[#1da851] transition-all duration-300 hover:scale-105 active:scale-95"
      aria-label="Chat with us on WhatsApp"
    >
      <div className="flex items-center justify-center">
        <MessageCircle className="w-8 h-8" />
      </div>
      <span className="max-w-0 overflow-hidden whitespace-nowrap font-bold group-hover:max-w-xs transition-all duration-500 ease-in-out opacity-0 group-hover:opacity-100 group-hover:ml-3">
        Chat with us
      </span>
    </a>
  );
}
