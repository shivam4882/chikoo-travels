import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem('admin', JSON.stringify(data.admin));
        navigate('/admin');
      } else {
        setError('Galat username ya password!');
      }
    } catch (err) { setError('Server error. Backend chal raha hai?'); }
  };

  return (
    <div style={styles.wrap}>
      <div style={styles.card}>
        <h1 style={{ color: '#0f4c81', textAlign: 'center', marginBottom: '8px' }}>🔐 Admin Login</h1>
        <p style={{ textAlign: 'center', color: '#666', marginBottom: '25px' }}>Chikoo Travels CRM</p>
        {error && <div style={styles.error}>{error}</div>}
        <form onSubmit={handleLogin} style={{ display: 'grid', gap: '15px' }}>
          <input required placeholder="Username" value={form.username} onChange={e => setForm({...form, username: e.target.value})} style={styles.input} />
          <input required type="password" placeholder="Password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} style={styles.input} />
          <button type="submit" style={styles.btn}>Login</button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '13px', color: '#999' }}>
          Demo: <strong>admin</strong> / <strong>admin123</strong>
        </p>
      </div>
    </div>
  );
}

const styles = {
  wrap: { minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', background: '#f4f7fb' },
  card: { background: '#fff', padding: '40px', borderRadius: '20px', width: '100%', maxWidth: '400px', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' },
  input: { padding: '14px', borderRadius: '10px', border: '1.5px solid #d6e0ea', fontSize: '15px', outline: 'none' },
  btn: { padding: '14px', background: '#0f4c81', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: '700', fontSize: '16px', cursor: 'pointer' },
  error: { background: '#ffebee', color: '#c62828', padding: '10px', borderRadius: '8px', marginBottom: '15px', textAlign: 'center', fontSize: '14px' }
};