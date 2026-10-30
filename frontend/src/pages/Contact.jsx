import { useState } from 'react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('✅ Message sent successfully!\n\nOur team will contact you within 24 hours.\n\nFor urgent queries: +91 96672 59929');
    setForm({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      <div className="page-header">
        <h1>Contact Us</h1>
        <p>We'd love to hear from you! Reach out anytime 💬</p>
      </div>
      <div className="page-content">
        <h2>Get In Touch</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginTop: '20px' }}>
          {[
            { icon: '📞', title: 'Call Us', desc: 'Mon–Sat, 9 AM – 8 PM', link: 'tel:+919667259929', linkText: '+91 96672 59929' },
            { icon: '✉️', title: 'Email Us', desc: 'We reply within 24 hours', link: 'mailto:contact@chikootravels.com', linkText: 'contact@chikootravels.com' },
            { icon: '📍', title: 'Visit Us', desc: 'Chikoo Travels HQ', link: null, linkText: 'D-54, Sector 58, Noida, UP' },
            { icon: '💬', title: 'WhatsApp', desc: 'Quick booking & queries', link: 'https://wa.me/919667259929', linkText: 'Chat on WhatsApp' }
          ].map(c => (
            <div key={c.title} style={{ background: '#f4f7fb', borderRadius: '12px', padding: '24px', textAlign: 'center' }}>
              <div style={{ fontSize: '34px', marginBottom: '10px' }}>{c.icon}</div>
              <h3 style={{ color: '#0f4c81', fontSize: '18px', marginBottom: '6px' }}>{c.title}</h3>
              <p style={{ fontSize: '14px', color: '#666' }}>{c.desc}<br />
                {c.link ? <a href={c.link} target="_blank" rel="noreferrer" style={{ color: '#1a73b8', fontWeight: '600' }}>{c.linkText}</a> : <strong>{c.linkText}</strong>}
              </p>
            </div>
          ))}
        </div>

        <h2 style={{ marginTop: '40px' }}>Send Us A Message</h2>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '14px', maxWidth: '600px' }}>
          <input required placeholder="Your Full Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} style={styles.input} />
          <input required type="email" placeholder="Your Email Address" value={form.email} onChange={e => setForm({...form, email: e.target.value})} style={styles.input} />
          <input required type="tel" placeholder="Your Phone Number" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} style={styles.input} />
          <textarea required placeholder="Tell us about your travel plans..." value={form.message} onChange={e => setForm({...form, message: e.target.value})} style={{ ...styles.input, minHeight: '120px' }} />
          <button type="submit" style={{ background: '#0f4c81', color: '#fff', padding: '13px 32px', border: 'none', borderRadius: '10px', fontWeight: '700', fontSize: '15px', cursor: 'pointer', justifySelf: 'start' }}>Send Message →</button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  input: { width: '100%', padding: '13px 15px', border: '1.5px solid #d6e0ea', borderRadius: '10px', fontSize: '14px', fontFamily: 'inherit', outline: 'none' }
};