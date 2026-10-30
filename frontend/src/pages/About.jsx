export default function About() {
  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      <div className="page-header">
        <h1>About Chikoo Travels</h1>
        <p>Your Journey, Our Passion 💙</p>
      </div>
      <div className="page-content">
        <h2>Who We Are</h2>
        <p><strong>Chikoo Travels</strong> is a premier travel company based in <strong>Noida, Uttar Pradesh</strong>, founded with a single mission — to make world-class travel experiences accessible, affordable, and unforgettable for every Indian traveller.</p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '18px', margin: '25px 0' }}>
          {[{n:'10+',l:'Years Experience'}, {n:'50K+',l:'Happy Travellers'}, {n:'100+',l:'Destinations'}, {n:'4.9★',l:'Customer Rating'}].map(s => (
            <div key={s.l} style={{ background: 'linear-gradient(135deg, #0f4c81, #1a73b8)', color: '#fff', padding: '22px 12px', borderRadius: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: '30px', fontWeight: '800', color: '#ffd166' }}>{s.n}</div>
              <div style={{ fontSize: '13px', opacity: 0.9, marginTop: '4px' }}>{s.l}</div>
            </div>
          ))}
        </div>

        <h2>Our Mission</h2>
        <p>To redefine travel for Indian families, couples, and adventurers by offering transparent pricing, personalized itineraries, 24/7 support, and handpicked destinations that deliver real value.</p>

        <h2>Why Choose Us?</h2>
        <ul>
          <li><strong>Best Price Guarantee</strong> — Found it cheaper elsewhere? We'll match it.</li>
          <li><strong>24/7 Customer Support</strong> — Real humans, always available.</li>
          <li><strong>Handpicked Hotels</strong> — Every stay personally verified by our team.</li>
          <li><strong>Flexible Cancellation</strong> — Travel plans change, we understand.</li>
          <li><strong>Local Expertise</strong> — Guides who know the destination inside-out.</li>
        </ul>

        <h2>Meet Our Leadership Team</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginTop: '20px' }}>
          
          {/* UPDATED TEAM MEMBERS */}
          <div style={{ textAlign: 'center', background: '#f4f7fb', borderRadius: '12px', padding: '30px 20px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
            <div style={{ width: '90px', height: '90px', borderRadius: '50%', background: 'linear-gradient(135deg, #ffd166, #ffb703)', margin: '0 auto 15px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px', fontWeight: '800', color: '#0f4c81' }}>
              S
            </div>
            <h4 style={{ color: '#0f4c81', fontSize: '20px', marginBottom: '5px' }}>Shivam Rathore</h4>
            <p style={{ fontSize: '14px', color: '#ffb703', fontWeight: '700', textTransform: 'uppercase' }}>Founder & CEO</p>
          </div>

          <div style={{ textAlign: 'center', background: '#f4f7fb', borderRadius: '12px', padding: '30px 20px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
            <div style={{ width: '90px', height: '90px', borderRadius: '50%', background: 'linear-gradient(135deg, #ffd166, #ffb703)', margin: '0 auto 15px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px', fontWeight: '800', color: '#0f4c81' }}>
              R
            </div>
            <h4 style={{ color: '#0f4c81', fontSize: '20px', marginBottom: '5px' }}>Rudra Pratap Chauhan</h4>
            <p style={{ fontSize: '14px', color: '#ffb703', fontWeight: '700', textTransform: 'uppercase' }}>Head of Operations</p>
          </div>

        </div>

        <h2>Visit Our Office</h2>
        <p>📍 <strong>D-54, Sector 58, Noida, Uttar Pradesh</strong><br />Open Monday to Saturday, 9 AM – 8 PM. Walk-ins welcome!</p>
      </div>
    </div>
  );
}