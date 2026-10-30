import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Checkout() {
  const { cart, cartTotal, clearCart } = useCart();
  const [form, setForm] = useState({ customerName: '', email: '', phone: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleBook = async (e) => {
    e.preventDefault();
    if (cart.length === 0) return alert('Cart is empty!');
    setLoading(true);

    try {
      for (const item of cart) {
        await fetch('http://localhost:5000/api/bookings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            customerName: form.customerName,
            email: form.email,
            phone: form.phone,
            packageId: item._id,
            packageName: item.name,
            quantity: item.qty,
            totalAmount: item.price * item.qty
          })
        });
      }
      alert(`✅ Booking Confirmed!\n\nName: ${form.customerName}\nEmail: ${form.email}\nTotal: ₹${cartTotal.toLocaleString('en-IN')}\n\nThank you for choosing Chikoo Travels! 🌍\n\nOur team will contact you shortly at ${form.phone}.`);
      clearCart();
      navigate('/');
    } catch (err) {
      alert('Error booking: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="container" style={{ padding: '60px 20px', textAlign: 'center' }}>
        <div style={{ fontSize: '60px', marginBottom: '20px' }}>🛒</div>
        <h2 style={{ color: '#0f4c81', marginBottom: '15px' }}>Your Cart is Empty</h2>
        <Link to="/" style={{ background: '#0f4c81', color: '#fff', padding: '12px 30px', borderRadius: '8px', fontWeight: '600' }}>
          Browse Packages
        </Link>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '40px 20px', maxWidth: '1000px' }}>
      <h1 style={{ color: '#0f4c81', marginBottom: '30px' }}>✅ Complete Your Booking</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
        <form onSubmit={handleBook} style={{ background: '#fff', padding: '30px', borderRadius: '16px', boxShadow: '0 6px 20px rgba(0,0,0,0.08)' }}>
          <h3 style={{ color: '#0f4c81', marginBottom: '20px' }}>Your Details</h3>
          <div style={{ display: 'grid', gap: '15px' }}>
            <input required placeholder="Full Name" value={form.customerName} onChange={e => setForm({...form, customerName: e.target.value})} style={styles.input} />
            <input required type="email" placeholder="Email Address" value={form.email} onChange={e => setForm({...form, email: e.target.value})} style={styles.input} />
            <input required type="tel" placeholder="Phone Number" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} style={styles.input} />
            <button type="submit" disabled={loading} style={{ background: '#ffd166', color: '#0f4c81', padding: '14px', border: 'none', borderRadius: '10px', fontWeight: '800', fontSize: '16px', cursor: loading ? 'not-allowed' : 'pointer', marginTop: '10px' }}>
              {loading ? 'Processing...' : `Confirm Booking — ₹${cartTotal.toLocaleString('en-IN')}`}
            </button>
            <p style={{ fontSize: '12px', color: '#999', textAlign: 'center', marginTop: '10px' }}>🔒 Your information is secure. We'll contact you to confirm payment.</p>
          </div>
        </form>

        <div style={{ background: '#fff', padding: '30px', borderRadius: '16px', boxShadow: '0 6px 20px rgba(0,0,0,0.08)' }}>
          <h3 style={{ color: '#0f4c81', marginBottom: '20px' }}>Booking Summary</h3>
          {cart.map(item => (
            <div key={item._id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #eee', fontSize: '14px' }}>
              <span>{item.name} × {item.qty}</span>
              <strong>₹{(item.price * item.qty).toLocaleString('en-IN')}</strong>
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', fontSize: '20px', fontWeight: '800', color: '#0f4c81' }}>
            <span>Total:</span><span>₹{cartTotal.toLocaleString('en-IN')}</span>
          </div>
          <div style={{ marginTop: '20px', padding: '15px', background: '#e8f1fa', borderRadius: '10px', fontSize: '13px', color: '#555' }}>
            💡 <strong>Note:</strong> Booking confirmation ke baad aapko call/email aayega payment link ke saath. 30% advance se booking lock hogi.
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  input: { padding: '13px 15px', border: '1.5px solid #d6e0ea', borderRadius: '10px', fontSize: '14px', fontFamily: 'inherit', outline: 'none' }
};