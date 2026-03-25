import { Star } from 'lucide-react';

export function GoogleRating() {
  return (
    <div className="flex items-center gap-2 bg-card text-foreground px-4 py-2 rounded-full text-sm mb-8 border border-border w-fit mx-auto shadow-sm">
      <Star size={16} fill="#fbbf24" color="#fbbf24" />
      <span><strong>5</strong> on Google Maps (5+ Reviews)</span>
    </div>
  );
}
