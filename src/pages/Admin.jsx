import { useState, useEffect } from 'react'
import { supabase } from '../services/supabaseClient'
import { adminPassword } from '../services/storeConfig'

function Admin() {
  const [authenticated, setAuthenticated] = useState(false)
  const [passwordInput, setPasswordInput] = useState('')
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)

  const handleLogin = (e) => {
    e.preventDefault()
    if (passwordInput === adminPassword) {
      setAuthenticated(true)
    } else {
      alert('Incorrect password')
    }
  }

  useEffect(() => {
    if (authenticated) {
      fetchOrders()
    }
  }, [authenticated])

  const fetchOrders = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('Orders')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching orders:', error)
    } else {
      setOrders(data)
    }
    setLoading(false)
  }

  const updateStatus = async (id, newStatus) => {
    const { error } = await supabase
      .from('Orders')
      .update({ status: newStatus })
      .eq('id', id)

    if (error) {
      console.error('Error updating status:', error)
    } else {
      setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o)))
    }
  }

  if (!authenticated) {
    return (
      <div style={{ padding: '3rem 2rem', maxWidth: '360px', margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '1.5rem' }}>Admin Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            placeholder="Enter admin password"
            style={{ width: '100%', padding: '0.7rem', border: '1px solid #ccc', borderRadius: '4px', marginBottom: '1rem' }}
          />
          <button
            type="submit"
            style={{ width: '100%', padding: '0.7rem', backgroundColor: 'var(--ink)', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Login
          </button>
        </form>
      </div>
    )
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1100px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '1.5rem' }}>Orders Dashboard</h2>

      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', border: '1px solid var(--line)', borderRadius: '8px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--ink)', color: '#fff', textAlign: 'left' }}>
                <th style={thStyle}>Date</th>
                <th style={thStyle}>Customer</th>
                <th style={thStyle}>Mobile</th>
                <th style={thStyle}>Items</th>
                <th style={thStyle}>Payment</th>
                <th style={thStyle}>Total</th>
                <th style={thStyle}>Address</th>
                <th style={thStyle}>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={tdStyle}>{new Date(order.created_at).toLocaleDateString('en-IN')}</td>
                  <td style={tdStyle}>{order.customer_name}</td>
                  <td style={tdStyle}>{order.mobile}</td>
                  <td style={tdStyle}>{order.items}</td>
                  <td style={tdStyle}>{order.payment_method}</td>
                  <td style={tdStyle} className="price-tag">₹{order.total_amount}</td>
                  <td style={tdStyle}>{order.address}, {order.pincode}</td>
                  <td style={tdStyle}>
                    <select
                      value={order.status}
                      onChange={(e) => updateStatus(order.id, e.target.value)}
                      style={{ padding: '0.3rem', borderRadius: '4px', border: '1px solid #ccc' }}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

const thStyle = { padding: '0.6rem', fontSize: '0.8rem' }
const tdStyle = { padding: '0.6rem' }

export default Admin