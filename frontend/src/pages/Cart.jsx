import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { cart, cartTotal, removeFromCart, addToCart, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="container" style={{ padding: '60px 20px', textAlign: 'center' }}>
        <div style={{ fontSize: '60px', marginBottom: '20px' }}>🛒</div>
        <h2 style={{ color: '#0f4c81', marginBottom: '15px' }}>Your Cart is Empty</h2>
        <p style={{ color: '#666', marginBottom: '25px' }}>Add some amazing travel packages to get started!</p>
        <Link to="/" style={{ background: '#0f4c81', color: '#fff', padding: '12px 30px', borderRadius: '8px', fontWeight: '600' }}>
          Browse Packages
        </Link>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      <h1 style={{ color: '#0f4c81', marginBottom: '30px' }}>🛒 Your Cart</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }}>
        <div style={{ background: '#fff', borderRadius: '16px', padding: '24px', boxShadow: '0 6px 20px rgba(0,0,0,0.08)' }}>
          {cart.map(item => (
            <div key={item._id} style={{ display: 'flex', gap: '20px', padding: '20px 0', borderBottom: '1px solid #eee', alignItems: 'center' }}>
              <img src={item.image} alt={item.name} style={{ width: '100px', height: '80px', objectFit: 'cover', borderRadius: '10px' }} />
              <div style={{ flex: 1 }}>
                <h3 style={{ color: '#0f4c81', fontSize: '18px', marginBottom: '6px' }}>{item.name}</h3>
                <p style={{ fontSize: '13px', color: '#666', marginBottom: '10px' }}>{item.description}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid #ddd', borderRadius: '6px', padding: '3px 8px' }}>
                    <button onClick={() => removeFromCart(item._id)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px' }}>−</button>
                    <span style={{ fontWeight: '600' }}>{item.qty}</span>
                    <button onClick={() => addToCart(item)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px' }}>+</button>
                  </div>
                  <span style={{ fontWeight: '800', color: '#e63946', fontSize: '18px' }}>₹{(item.price * item.qty).toLocaleString('en-IN')}</span>
                </div>
              </div>
              <button onClick={() => removeFromCart(item._id)} style={{ background: '#e63946', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer' }}>✕</button>
            </div>
          ))}
          <button onClick={clearCart} style={{ marginTop: '20px', background: 'none', color: '#e63946', border: '1px solid #e63946', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}>
            Clear Cart
          </button>
        </div>

        <div style={{ background: '#fff', borderRadius: '16px', padding: '24px', boxShadow: '0 6px 20px rgba(0,0,0,0.08)', height: 'fit-content', position: 'sticky', top: '90px' }}>
          <h3 style={{ color: '#0f4c81', marginBottom: '20px' }}>Order Summary</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '14px' }}>
            <span>Items:</span><span>{cart.reduce((s, i) => s + i.qty, 0)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '14px' }}>
            <span>Subtotal:</span><span>₹{cartTotal.toLocaleString('en-IN')}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '14px' }}>
            <span>Taxes:</span><span>Included</span>
          </div>
          <hr style={{ margin: '15px 0', border: 'none', borderTop: '1px solid #eee' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '20px', fontWeight: '800', color: '#0f4c81', marginBottom: '20px' }}>
            <span>Total:</span><span>₹{cartTotal.toLocaleString('en-IN')}</span>
          </div>
          <Link to="/checkout" style={{ display: 'block', background: '#ffd166', color: '#0f4c81', padding: '14px', borderRadius: '10px', fontWeight: '800', textAlign: 'center', fontSize: '16px' }}>
            Proceed to Checkout →
          </Link>
        </div>
      </div>
    </div>
  );
}