'use client';

import { timelineEvents } from '@/lib/content';
import { motion } from 'framer-motion';

export function Timeline() {
  return (
    <section className="section" id="trust">
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <span className="section-label label-primary">🏛️ Our Journey</span>
        <h2 className="section-title">Built on Trust. Grown by Community.</h2>
        <p className="section-subtitle" style={{ margin: '0.75rem auto 0' }}>
          From a humble electronics shop to your neighborhood's most trusted one-stop destination.
        </p>
      </div>

      <div style={{ position: 'relative' }}>
        {/* Horizontal Line connecting dots */}
        <div style={{ 
          position: 'absolute', top: '24px', left: '0', right: '0', 
          height: '2px', background: 'var(--border-color)', zIndex: 0 
        }}></div>
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: '100%' }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          style={{ 
            position: 'absolute', top: '24px', left: '0', 
            height: '2px', background: 'var(--accent-primary)', zIndex: 1 
          }}
        ></motion.div>

        <div style={{ 
          display: 'flex', justifyContent: 'space-between', gap: '1.5rem', 
          position: 'relative', zIndex: 2, overflowX: 'auto', paddingBottom: '2rem' 
        }}>
          {timelineEvents.map((event, index) => (
            <motion.div 
              key={index} 
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              style={{ flex: '1', minWidth: '230px', textAlign: 'center' }}
            >
              <div style={{ 
                width: '14px', height: '14px', borderRadius: '50%', margin: '17px auto 20px',
                background: event.highlight ? 'var(--accent-primary)' : 'var(--card-bg-solid)',
                border: `3px solid ${event.highlight ? 'var(--accent-primary)' : 'var(--border-color)'}`,
                boxShadow: event.highlight ? '0 0 12px var(--accent-primary)' : 'none',
                transition: 'all 0.3s'
              }}></div>
              
              <div style={{ 
                background: 'var(--card-bg)', 
                backdropFilter: 'blur(12px)',
                padding: '1.5rem', 
                borderRadius: '16px', 
                border: `1px solid ${event.highlight ? 'var(--accent-primary)' : 'var(--border-color)'}`,
                transition: 'all 0.3s ease'
              }}>
                <span style={{ 
                  fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-primary)', 
                  display: 'block', marginBottom: '0.5rem', letterSpacing: '0.05em' 
                }}>{event.year}</span>
                <span style={{ 
                  fontSize: '1.1rem', fontWeight: 600, display: 'block', 
                  marginBottom: '0.5rem', color: 'var(--text-color)' 
                }}>{event.title}</span>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.6 }}>{event.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
