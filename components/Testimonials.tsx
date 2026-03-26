import { googleReviews } from '@/lib/content';
import { Star } from 'lucide-react';

export function Testimonials() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="section-label label-primary animate-pulse">💬 Community Love</span>
          <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4 tracking-tight">What Our Neighborhood Says</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto font-medium">Real reviews from our Google Maps family.</p>
        </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '1.5rem' 
      }}>
        {googleReviews.map((review) => (
          <div key={review.id} style={{
            background: 'var(--card-bg)',
            backdropFilter: 'blur(12px)',
            padding: '2rem',
            borderRadius: '16px',
            border: '1px solid var(--border-color)',
            display: 'flex',
            flexDirection: 'column',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', gap: '0.25rem' }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill={i < review.rating ? '#fbbf24' : 'transparent'} color={i < review.rating ? '#fbbf24' : 'var(--border-color)'} />
              ))}
              <span style={{ marginLeft: 'auto', fontSize: '0.8rem', color: 'var(--text-muted)' }}>{review.time}</span>
            </div>
            <p style={{ 
              fontStyle: 'italic', marginBottom: '1.5rem', flexGrow: 1, 
              color: 'var(--text-color)', opacity: 0.9, fontSize: '0.95rem', lineHeight: 1.6 
            }}>"{review.text}"</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ 
                width: '38px', height: '38px', borderRadius: '50%', 
                background: 'var(--icon-bg)', 
                display: 'flex', alignItems: 'center', justifyContent: 'center', 
                fontWeight: 700, color: 'var(--accent-primary)', fontSize: '0.9rem' 
              }}>
                {review.name.charAt(0)}
              </div>
              <span style={{ fontWeight: 600, color: 'var(--text-color)', fontSize: '0.9rem' }}>{review.name}</span>
            </div>
          </div>
        ))}
      </div>
      </div>
    </section>
  );
}
