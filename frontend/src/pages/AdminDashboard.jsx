import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [packages, setPackages] = useState([]);
  
  // Banner & Form States
  const [bannerUrl, setBannerUrl] = useState('');
  const [newPkg, setNewPkg] = useState({ name: '', description: '', price: '', image: '' });
  const [msg, setMsg] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const admin = localStorage.getItem('admin');
    if (!admin) { navigate('/admin-login'); return; }
    fetchStats();
    fetchBookings();
    fetchCustomers();
    fetchPackages();
    fetchBanner();
  }, [navigate]);

  const fetchStats = () => fetch('http://localhost:5000/api/admin/stats').then(r => r.json()).then(setStats).catch(console.error);
  const fetchBookings = () => fetch('http://localhost:5000/api/admin/bookings').then(r => r.json()).then(setBookings).catch(console.error);
  const fetchCustomers = () => fetch('http://localhost:5000/api/admin/customers').then(r => r.json()).then(setCustomers).catch(console.error);
  const fetchPackages = () => fetch('http://localhost:5000/api/admin/packages').then(r => r.json()).then(setPackages).catch(console.error);
  
  const fetchBanner = () => {
    fetch('http://localhost:5000/api/admin/banner')
      .then(r => r.json())
      .then(data => setBannerUrl(data.banner))
      .catch(console.error);
  };

  const updateStatus = async (id, status) => {
    await fetch(`http://localhost:5000/api/admin/bookings/${id}`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status })
    });
    fetchBookings(); fetchStats();
  };

  const handleUpdateBanner = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:5000/api/admin/banner', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ imageUrl: bannerUrl })
    });
    setMsg('✅ Banner updated successfully! Check homepage.');
    setTimeout(() => setMsg(''), 3000);
  };

  const handleAddPackage = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:5000/api/admin/packages', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newPkg)
    });
    setMsg('✅ Package added successfully!');
    setNewPkg({ name: '', description: '', price: '', image: '' });
    fetchPackages(); fetchStats();
    setTimeout(() => setMsg(''), 3000);
  };

  const handleDeletePackage = async (id) => {
    if (!window.confirm('Are you sure you want to delete this package?')) return;
    await fetch(`http://localhost:5000/api/admin/packages/${id}`, { method: 'DELETE' });
    fetchPackages(); fetchStats();
  };

  const logout = () => { localStorage.removeItem('admin'); navigate('/'); };
  const statusColor = (status) => {
    if (status === 'Confirmed') return '#43a047';
    if (status === 'Pending') return '#fb8c00';
    if (status === 'Cancelled') return '#e53935';
    return '#1565c0';
  };

  return (
    <div style={styles.dash}>
      {/* SIDEBAR */}
      <aside style={styles.sidebar}>
        <h2 style={{ color: '#ffd166', marginBottom: '30px' }}>✈️ Chikoo CRM</h2>
        {[
          { id: 'overview', label: '📊 Overview' },
          { id: 'bookings', label: '📦 Bookings' },
          { id: 'customers', label: '👥 Customers' },
          { id: 'banner', label: '🖼️ Banner' },         /* NEW */
          { id: 'trips', label: '✈️ Manage Trips' }     /* NEW */
        ].map(tab => (
          <div key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
            ...styles.tab,
            background: activeTab === tab.id ? '#ffd166' : 'transparent',
            color: activeTab === tab.id ? '#0f4c81' : '#fff'
          }}>{tab.label}</div>
        ))}
        <div onClick={logout} style={{ ...styles.tab, marginTop: 'auto', color: '#ffb3b3' }}>🚪 Logout</div>
      </aside>

      {/* MAIN CONTENT */}
      <main style={styles.main}>
        {msg && <div style={{ background: '#e8f5e9', color: '#2e7d32', padding: '15px', borderRadius: '10px', marginBottom: '20px', fontWeight: 'bold' }}>{msg}</div>}

        {/* --- OVERVIEW TAB --- */}
        {activeTab === 'overview' && stats && (
          <>
            <h1 style={styles.h1}>Dashboard Overview</h1>
            <div style={styles.statsGrid}>
              <StatCard icon="💰" label="Total Revenue" value={`₹${stats.totalRevenue.toLocaleString('en-IN')}`} color="#43a047" />
              <StatCard icon="📦" label="Total Bookings" value={stats.totalBookings} color="#1565c0" />
              <StatCard icon="👥" label="Customers" value={stats.totalCustomers} color="#8e24aa" />
              <StatCard icon="✈️" label="Packages" value={stats.totalPackages} color="#fb8c00" />
            </div>
          </>
        )}

        {/* --- BANNER TAB (NEW) --- */}
        {activeTab === 'banner' && (
          <div style={{ maxWidth: '700px' }}>
            <h1 style={styles.h1}>🖼️ Change Home Banner Image</h1>
            <div style={{ background: '#fff', padding: '30px', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
              <form onSubmit={handleUpdateBanner} style={{ display: 'grid', gap: '15px' }}>
                <label style={{ fontWeight: 'bold' }}>Banner Image URL:</label>
                <input required value={bannerUrl} onChange={e => setBannerUrl(e.target.value)} placeholder="https://images.unsplash.com/photo-..." style={styles.input} />
                <button type="submit" style={styles.btn}>Update Banner</button>
              </form>
              {bannerUrl && (
                <div style={{ marginTop: '20px' }}>
                  <p style={{ marginBottom: '10px', fontWeight: 'bold' }}>Preview:</p>
                  <img src={bannerUrl} alt="Preview" style={{ width: '100%', borderRadius: '10px', maxHeight: '250px', objectFit: 'cover' }} />
                </div>
              )}
            </div>
          </div>
        )}

        {/* --- MANAGE TRIPS TAB (NEW) --- */}
        {activeTab === 'trips' && (
          <>
            <h1 style={styles.h1}>✈️ Manage Tour Packages</h1>
            
            <div style={{ background: '#fff', padding: '25px', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', marginBottom: '30px' }}>
              <h3 style={{ color: '#0f4c81', marginBottom: '15px' }}>➕ Add New Trip</h3>
              <form onSubmit={handleAddPackage} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <input required placeholder="Trip Name (e.g. Goa Beach)" value={newPkg.name} onChange={e => setNewPkg({...newPkg, name: e.target.value})} style={styles.input} />
                <input required type="number" placeholder="Price (₹)" value={newPkg.price} onChange={e => setNewPkg({...newPkg, price: e.target.value})} style={styles.input} />
                <input required placeholder="Image URL (https://...)" value={newPkg.image} onChange={e => setNewPkg({...newPkg, image: e.target.value})} style={{ ...styles.input, gridColumn: 'span 2' }} />
                <textarea required placeholder="Description (e.g. 4 Nights / 5 Days • Beach resort)" value={newPkg.description} onChange={e => setNewPkg({...newPkg, description: e.target.value})} style={{ ...styles.input, gridColumn: 'span 2', minHeight: '80px' }} />
                <button type="submit" style={{ ...styles.btn, gridColumn: 'span 2' }}>Add Package</button>
              </form>
            </div>

            <h3 style={{ color: '#0f4c81', marginBottom: '15px' }}>List of Packages ({packages.length})</h3>
            <table style={styles.table}>
              <thead><tr style={styles.thead}>
                <th style={styles.th}>Image</th><th style={styles.th}>Name</th><th style={styles.th}>Price</th><th style={styles.th}>Action</th>
              </tr></thead>
              <tbody>
                {packages.map(p => (
                  <tr key={p._id} style={styles.tr}>
                    <td style={styles.td}><img src={p.image} alt={p.name} style={{ width: '60px', height: '40px', objectFit: 'cover', borderRadius: '5px' }} /></td>
                    <td style={styles.td}><strong>{p.name}</strong></td>
                    <td style={styles.td}>₹{p.price.toLocaleString('en-IN')}</td>
                    <td style={styles.td}>
                      <button onClick={() => handleDeletePackage(p._id)} style={{ background: '#e63946', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {/* --- BOOKINGS TAB --- */}
        {activeTab === 'bookings' && (
          <>
            <h1 style={styles.h1}>All Bookings ({bookings.length})</h1>
            <table style={styles.table}>
              <thead><tr style={styles.thead}>
                <th style={styles.th}>Customer</th><th style={styles.th}>Package</th><th style={styles.th}>Amount</th><th style={styles.th}>Status</th>
              </tr></thead>
              <tbody>
                {bookings.map(b => (
                  <tr key={b._id} style={styles.tr}>
                    <td style={styles.td}>{b.customerName}<br /><small>{b.phone}</small></td>
                    <td style={styles.td}>{b.packageName}</td>
                    <td style={styles.td}>₹{b.totalAmount.toLocaleString('en-IN')}</td>
                    <td style={styles.td}>
                      <select value={b.status} onChange={e => updateStatus(b._id, e.target.value)} style={{ padding: '6px', borderRadius: '6px' }}>
                        <option>Pending</option><option>Confirmed</option><option>Completed</option><option>Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {/* --- CUSTOMERS TAB --- */}
        {activeTab === 'customers' && (
          <>
            <h1 style={styles.h1}>All Customers ({customers.length})</h1>
            <table style={styles.table}>
              <thead><tr style={styles.thead}>
                <th style={styles.th}>Name</th><th style={styles.th}>Email</th><th style={styles.th}>Bookings</th><th style={styles.th}>Total Spent</th>
              </tr></thead>
              <tbody>
                {customers.map(c => (
                  <tr key={c._id} style={styles.tr}>
                    <td style={styles.td}><strong>{c.name}</strong></td>
                    <td style={styles.td}>{c.email}</td>
                    <td style={styles.td}>{c.totalBookings}</td>
                    <td style={styles.td}>₹{c.totalSpent.toLocaleString('en-IN')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </main>
    </div>
  );
}

function StatCard({ icon, label, value, color }) {
  return (
    <div style={{ background: '#fff', padding: '20px', borderRadius: '14px', boxShadow: '0 4px 15px rgba(0,0,0,0.06)', borderLeft: `5px solid ${color}` }}>
      <div style={{ fontSize: '28px' }}>{icon}</div>
      <div style={{ fontSize: '13px', color: '#888', marginTop: '8px' }}>{label}</div>
      <div style={{ fontSize: '24px', fontWeight: '800', color: '#0f4c81', marginTop: '4px' }}>{value}</div>
    </div>
  );
}

const styles = {
  dash: { display: 'flex', minHeight: '100vh', background: '#f4f7fb', fontFamily: 'Segoe UI, Arial, sans-serif' },
  sidebar: { width: '250px', background: '#0f4c81', color: '#fff', padding: '30px 20px', display: 'flex', flexDirection: 'column', gap: '10px', position: 'sticky', top: 0, height: '100vh' },
  tab: { padding: '12px 16px', borderRadius: '10px', cursor: 'pointer', fontWeight: '600', transition: '0.3s' },
  main: { flex: 1, padding: '30px 40px' },
  h1: { color: '#0f4c81', marginBottom: '25px', fontSize: '28px' },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '20px' },
  table: { width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.06)' },
  thead: { background: '#0f4c81' },
  th: { color: '#fff', padding: '14px', textAlign: 'left', fontSize: '14px' },
  tr: { borderBottom: '1px solid #eee' },
  td: { padding: '14px', fontSize: '14px', color: '#555' },
  input: { padding: '12px', borderRadius: '8px', border: '1.5px solid #d6e0ea', fontSize: '14px', outline: 'none', width: '100%' },
  btn: { padding: '14px', background: '#0f4c81', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: '700', cursor: 'pointer' }
};