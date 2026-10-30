import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { cartCount } = useCart();
  const location = useLocation();

  // Navigation Links
  const links = [
    { path: '/', label: 'Home' },
    { path: '/#packages-section', label: 'Packages', isScroll: true },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <header style={styles.header}>
      {/* LOGO AREA (HTML Wala Style) */}
      <Link to="/" style={styles.logoWrap}>
        <img src="/chikoologo.png" alt="Chikoo Travels Logo" style={styles.logoImg} />
        <div style={styles.logoText}>
          <div style={styles.brand}>Chikoo <span style={{color:'#d4a017'}}>Travels</span></div>
          <div style={styles.tag}>Explore • Discover</div>
        </div>
      </Link>
      
      {/* NAVIGATION MENU */}
      <nav style={styles.nav}>
        {links.map(l => {
          if (l.isScroll) {
            return (
              <a 
                key={l.label} 
                href={l.path} 
                onClick={(e) => {
                  if (window.location.pathname === '/') {
                    e.preventDefault();
                    document.getElementById('packages-section')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }} 
                style={styles.link}
              >
                {l.label}
              </a>
            );
          }
          return (
            <Link 
              key={l.path} 
              to={l.path} 
              style={{
                ...styles.link,
                color: location.pathname === l.path ? '#ffd166' : '#fff'
              }}
            >
              {l.label}
            </Link>
          );
        })}
      </nav>

      {/* CART BUTTON (HTML Wala Style) */}
      <Link to="/cart" style={styles.cartBtn}>
        🛒 Cart ({cartCount})
      </Link>
    </header>
  );
}

const styles = {
  // Header Container
  header: { 
    background: 'linear-gradient(135deg, #0f4c81, #1a73b8)', 
    padding: '12px 40px', 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    position: 'sticky', 
    top: 0, 
    zIndex: 100, 
    boxShadow: '0 4px 12px rgba(0,0,0,.2)', 
    flexWrap: 'wrap', 
    gap: '10px' 
  },
  
  // Logo Area (White Pill)
  logoWrap: { 
    display: 'flex', 
    alignItems: 'center', 
    gap: '10px', 
    background: 'rgba(255, 255, 255, 0.95)', 
    padding: '4px 14px 4px 4px', 
    borderRadius: '40px', 
    boxShadow: '0 4px 10px rgba(0,0,0,0.15)', 
    transition: '0.3s',
    textDecoration: 'none'
  },
  logoImg: { 
    width: '45px', 
    height: '45px', 
    borderRadius: '50%', 
    objectFit: 'cover', 
    border: '2px solid #ffd166' 
  },
  logoText: { 
    display: 'flex', 
    flexDirection: 'column', 
    lineHeight: '1' 
  },
  brand: { 
    fontSize: '20px', 
    fontWeight: '800', 
    color: '#0f4c81', 
    letterSpacing: '.5px' 
  },
  tag: { 
    fontSize: '8.5px', 
    letterSpacing: '1.5px', 
    fontWeight: '700', 
    color: '#666', 
    textTransform: 'uppercase', 
    marginTop: '4px' 
  },

  // Nav Links
  nav: { 
    display: 'flex', 
    gap: '20px', 
    flexWrap: 'wrap' 
  },
  link: { 
    color: '#fff', 
    fontWeight: '500', 
    textDecoration: 'none', 
    transition: '0.3s',
    fontSize: '15px'
  },

  // Gold Cart Button
  cartBtn: { 
    background: '#ffd166', 
    color: '#0f4c81', 
    padding: '10px 18px', 
    borderRadius: '25px', 
    fontWeight: '700', 
    textDecoration: 'none',
    transition: '0.3s',
    fontSize: '15px',
    cursor: 'pointer',
    border: 'none'
  }
};