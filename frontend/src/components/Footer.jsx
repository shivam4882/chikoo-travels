import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.grid}>
        <div>
          <div style={styles.logoWrap}>
            <img src="/chikoologo.png" alt="Chikoo Travels" style={styles.footerLogo} />
          </div>
          <p style={styles.text}>Crafting unforgettable journeys from Noida to the world. We make your dream vacation a reality.</p>
          <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
            <a href="#" style={styles.social}>f</a>
            <a href="#" style={styles.social}>📷</a>
            <a href="#" style={styles.social}>𝕏</a>
            <a href="#" style={styles.social}>▶</a>
          </div>
        </div>

        <div>
          <h4 style={styles.h4}>Quick Links</h4>
          <ul style={styles.ul}>
            <li><Link to="/" style={styles.link}>Home</Link></li>
            <li><Link to="/about" style={styles.link}>About Us</Link></li>
            <li><Link to="/contact" style={styles.link}>Contact</Link></li>
            <li><Link to="/cart" style={styles.link}>My Cart</Link></li>
          </ul>
        </div>

        <div>
          <h4 style={styles.h4}>Legal</h4>
          <ul style={styles.ul}>
            <li><Link to="/policy" style={styles.link}>Refund Policy</Link></li>
            <li><Link to="/terms" style={styles.link}>Terms & Conditions</Link></li>
            <li><Link to="/privacy" style={styles.link}>Privacy Policy</Link></li>
          </ul>
        </div>

        <div>
          <h4 style={styles.h4}>Get In Touch</h4>
          <p style={styles.text}>📍 D-54, Sector 58, Noida, UP</p>
          <p style={styles.text}>📞 <a href="tel:+919667259929" style={styles.link}>+91 96672 59929</a></p>
          <p style={styles.text}>✉️ <a href="mailto:contact@chikootravels.com" style={styles.link}>contact@chikootravels.com</a></p>
        </div>
      </div>
      <div style={styles.bottom}>
        © 2025 <strong style={{ color: '#ffd166' }}>Chikoo Travels</strong>, D-54 Sector 58 Noida UP. All Rights Reserved.
      </div>
    </footer>
  );
}

const styles = {
  footer: { background: 'linear-gradient(135deg, #0a3a63, #0f4c81)', color: '#cdd9e5', padding: '60px 40px 0', marginTop: '50px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px', maxWidth: '1300px', margin: 'auto', paddingBottom: '40px' },
  logoWrap: { background: '#fff', display: 'inline-block', padding: '8px', borderRadius: '12px', marginBottom: '15px' },
  footerLogo: { width: '160px', height: 'auto', borderRadius: '6px', display: 'block' },
  h4: { color: '#ffd166', fontSize: '17px', marginBottom: '18px' },
  text: { fontSize: '14px', lineHeight: '1.8', color: '#b8c9da', marginBottom: '10px' },
  ul: { listStyle: 'none', padding: 0 },
  link: { color: '#b8c9da', fontSize: '14px', display: 'inline-block', marginBottom: '10px' },
  social: { width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' },
  bottom: { borderTop: '1px solid rgba(255,255,255,0.12)', padding: '22px 0', textAlign: 'center', fontSize: '13px', color: '#9fb3c8', maxWidth: '1300px', margin: 'auto' }
};