import { siteMeta } from '@/lib/content';
import { GoogleRating } from './GoogleRating';

export function Contact() {
  return (
    <section className="section" id="contact" style={{ textAlign: 'center' }}>
      <span className="section-label label-primary">📍 Get In Touch</span>
      <h2 className="section-title">{siteMeta.contactTitle}</h2>
      
      <div style={{ marginTop: '1.5rem', marginBottom: '2.5rem', display: 'flex', justifyContent: 'center' }}>
        <GoogleRating />
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '0', 
        alignItems: 'stretch', 
        textAlign: 'left', 
        background: 'var(--card-bg)', 
        backdropFilter: 'blur(12px)',
        border: '1px solid var(--border-color)', 
        borderRadius: '20px', 
        overflow: 'hidden' 
      }}>
        
        {/* Map Integration */}
        <div style={{ width: '100%', minHeight: '350px' }}>
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2533.4127169554577!2d87.95600801091413!3d26.10588312310992!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e517288fd61359%3A0x6775ec8e87e5bdc4!2sUma%20Xerox!5e0!3m2!1sen!2sin!4v1774471201192!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            style={{ border: 0, filter: 'var(--map-filter)', display: 'block' }} 
            allowFullScreen={true} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Store Location"
          ></iframe>
        </div>

        <div style={{ padding: '2.5rem' }}>
          <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem', color: 'var(--text-color)' }}>Visit Our Store</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: 1.7 }}>
            We're located in the heart of the community. Drop by for high-speed digital services or to pick up fresh daily essentials. 
          </p>
          <div className="btn-group" style={{ justifyContent: 'flex-start' }}>
            <a href={siteMeta.mapUrl} target="_blank" className="btn btn-primary">Open in Maps</a>
            <a href={`https://wa.me/${siteMeta.phone}`} target="_blank" className="btn btn-secondary btn-whatsapp">WhatsApp for Delivery</a>
          </div>
        </div>

      </div>
    </section>
  );
}
