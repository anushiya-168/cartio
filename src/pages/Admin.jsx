import { useState, useEffect } from 'react'
import { supabase } from '../services/supabaseClient'
import { adminPassword } from '../services/storeConfig'
import { phoneCases, typeImages } from '../services/phoneCaseData'

function Admin() {
  const [authenticated, setAuthenticated] = useState(false)
  const [passwordInput, setPasswordInput] = useState('')
  const [activeTab, setActiveTab] = useState('orders')
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)
  const [customImages, setCustomImages] = useState({})
  const [uploadingId, setUploadingId] = useState(null)

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
      fetchCustomImages()
    }
  }, [authenticated])

  const fetchOrders = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('Orders')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error) setOrders(data)
    setLoading(false)
  }

  const fetchCustomImages = async () => {
    const { data, error } = await supabase.from('product_images').select('*')
    if (!error && data) {
      const map = {}
      data.forEach((row) => {
        map[row.phone_case_id] = row.image_url
      })
      setCustomImages(map)
    }
  }

  const updateStatus = async (id, newStatus) => {
    const { error } = await supabase.from('Orders').update({ status: newStatus }).eq('id', id)
    if (!error) {
      setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o)))
    }
  }

  const handleImageUpload = async (caseId, file) => {
    if (!file) return
    setUploadingId(caseId)

    const fileExt = file.name.split('.').pop()
    const fileName = `case-${caseId}-${Date.now()}.${fileExt}`

    const { error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(fileName, file)

    if (uploadError) {
      alert('Upload failed: ' + uploadError.message)
      setUploadingId(null)
      return
    }

    const { data: publicUrlData } = supabase.storage
      .from('product-images')
      .getPublicUrl(fileName)

    const imageUrl = publicUrlData.publicUrl

    const existing = customImages[caseId]
    if (existing) {
      await supabase.from('product_images').update({ image_url: imageUrl }).eq('phone_case_id', caseId)
    } else {
      await supabase.from('product_images').insert([{ phone_case_id: caseId, image_url: imageUrl }])
    }

    setCustomImages((prev) => ({ ...prev, [caseId]: imageUrl }))
    setUploadingId(null)
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
      <h2 style={{ marginBottom: '1rem' }}>Admin Dashboard</h2>

      <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '1.5rem' }}>
        <button
          onClick={() => setActiveTab('orders')}
          style={{
            padding: '0.5rem 1rem',
            borderRadius: '6px',
            border: '1px solid var(--ink)',
            backgroundColor: activeTab === 'orders' ? 'var(--ink)' : 'var(--paper-alt)',
            color: activeTab === 'orders' ? '#fff' : 'var(--ink)',
            cursor: 'pointer',
            fontSize: '0.85rem',
            fontWeight: 600
          }}
        >
          Orders
        </button>
        <button
          onClick={() => setActiveTab('images')}
          style={{
            padding: '0.5rem 1rem',
            borderRadius: '6px',
            border: '1px solid var(--ink)',
            backgroundColor: activeTab === 'images' ? 'var(--ink)' : 'var(--paper-alt)',
            color: activeTab === 'images' ? '#fff' : 'var(--ink)',
            cursor: 'pointer',
            fontSize: '0.85rem',
            fontWeight: 600
          }}
        >
          Product Photos
        </button>
      </div>

      {activeTab === 'orders' && (
        <>
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
        </>
      )}

      {activeTab === 'images' && (
        <div>
          <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '1.2rem' }}>
            Upload a real photo for each product. Until you upload one, a default stock photo is shown.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem' }}>
            {phoneCases.map((item) => (
              <div key={item.id} style={{ border: '1px solid var(--line)', borderRadius: '10px', padding: '0.8rem', backgroundColor: 'var(--paper-alt)' }}>
                <img
                  src={customImages[item.id] || typeImages[item.type]}
                  alt={item.title}
                  style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '6px', marginBottom: '0.6rem' }}
                />
                <p style={{ fontSize: '0.78rem', fontWeight: 600, marginBottom: '0.2rem' }}>{item.title}</p>
                <p style={{ fontSize: '0.7rem', color: '#666', marginBottom: '0.6rem' }}>{item.model}</p>

                <label style={{
                  display: 'block',
                  textAlign: 'center',
                  padding: '0.45rem',
                  backgroundColor: 'var(--ink)',
                  color: '#fff',
                  borderRadius: '5px',
                  fontSize: '0.75rem',
                  cursor: 'pointer',
                  opacity: uploadingId === item.id ? 0.6 : 1
                }}>
                  {uploadingId === item.id ? 'Uploading...' : customImages[item.id] ? 'Replace Photo' : 'Upload Photo'}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(item.id, e.target.files[0])}
                    disabled={uploadingId === item.id}
                    style={{ display: 'none' }}
                  />
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

const thStyle = { padding: '0.6rem', fontSize: '0.8rem' }
const tdStyle = { padding: '0.6rem' }

export default Admin