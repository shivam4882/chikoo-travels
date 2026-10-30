import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';

export default function Home() {
  const [packages, setPackages] = useState([]);
  const [banner, setBanner] = useState('https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1600&q=80');
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    // Fetch Packages
    fetch('http://localhost:5000/api/packages')
      .then(res => res.json())
      .then(data => { setPackages(data); setLoading(false); })
      .catch(err => { console.error(err); setLoading(false); });
      
    // Fetch Banner Image
    fetch('http://localhost:5000/api/admin/banner')
      .then(res => res.json())
      .then(data => {
        if (data.banner) setBanner(data.banner);
      })
      .catch(console.error);
  }, []);

  return (
    <div>
      {/* DYNAMIC HERO BANNER */}
      <div style={{ ...styles.hero, backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.6)), url(${banner})` }}>
        <div style={styles.heroContent}>
          <h1 style={styles.h1}>Explore The World With Chikoo Travels</h1>
          <p style={styles.p}>Book Your Dream Vacation at Unbeatable Prices ✨</p>
          <button style={styles.heroBtn} onClick={() => document.getElementById('packages-section').scrollIntoView({ behavior: 'smooth' })}>
            View Packages
          </button>
        </div>
      </div>

      {/* PACKAGES SECTION (Same as before) */}
      <div id="packages-section" style={styles.sectionContainer}>
        <h2 style={styles.title}>🌍 Popular Tour Packages</h2>
        <p style={styles.subtitle}>Handpicked destinations for your dream vacation</p>
        
        {loading ? (
          <p style={{ textAlign: 'center' }}>Loading packages...</p>
        ) : (
          <div style={styles.grid}>
            {packages.map(pkg => (
              <div key={pkg._id} style={styles.card}>
                <div style={styles.imgContainer}>
                  <img src={pkg.image} alt={pkg.name} style={styles.img} />
                  <div style={styles.badge}>Best Seller</div>
                </div>
                <div style={styles.cardBody}>
                  <h3 style={styles.h3}>{pkg.name}</h3>
                  <p style={styles.desc}>{pkg.description}</p>
                  <div style={styles.priceRow}>
                    <div style={styles.price}>₹{pkg.price.toLocaleString('en-IN')} <small>/ person</small></div>
                  </div>
                  <button style={styles.addBtn} onClick={() => addToCart(pkg)}>🛒 Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ... (styles same as before)
const styles = {
  hero: { height: '500px', backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '20px' },
  heroContent: { zIndex: 2, maxWidth: '800px' },
  h1: { fontSize: '52px', marginBottom: '15px', color: '#fff', textShadow: '0 4px 15px rgba(0,0,0,0.6)', fontWeight: '800' },
  p: { fontSize: '20px', color: '#f0f0f0', marginBottom: '30px' },
  heroBtn: { background: '#ffd166', color: '#0f4c81', padding: '15px 40px', borderRadius: '30px', fontSize: '17px', fontWeight: '800', border: 'none', cursor: 'pointer' },
  sectionContainer: { padding: '60px 20px', maxWidth: '1300px', margin: 'auto' },
  title: { textAlign: 'center', fontSize: '36px', color: '#0f4c81', fontWeight: '800', marginBottom: '10px' },
  subtitle: { textAlign: 'center', color: '#666', fontSize: '16px', marginBottom: '45px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' },
  card: { background: '#fff', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column' },
  imgContainer: { position: 'relative', height: '220px', overflow: 'hidden' },
  img: { width: '100%', height: '100%', objectFit: 'cover' },
  badge: { position: 'absolute', top: '15px', right: '15px', background: '#ffd166', color: '#0f4c81', padding: '6px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: '800' },
  cardBody: { padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 },
  h3: { fontSize: '22px', color: '#0f4c81', marginBottom: '10px', fontWeight: '800' },
  desc: { fontSize: '14px', color: '#666', marginBottom: '20px', flex: 1 },
  priceRow: { marginBottom: '20px' },
  price: { fontSize: '24px', fontWeight: '800', color: '#e63946' },
  addBtn: { background: '#0f4c81', color: '#fff', border: 'none', padding: '14px', borderRadius: '12px', fontWeight: '700', cursor: 'pointer' }
};