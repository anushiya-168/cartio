import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

function Checkout() {
  const { cartItems, cartTotal, clearCart } = useCart()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', address: '', email: '' })
  const [errors, setErrors] = useState({})
  const [placed, setPlaced] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const validate = () => {
    const newErrors = {}
    if (!form.name.trim()) newErrors.name = 'Name is required'
    if (!form.address.trim()) newErrors.address = 'Address is required'
    if (!form.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Enter a valid email'
    }
    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    setPlaced(true)
    clearCart()
    setTimeout(() => navigate('/'), 2500)
  }

  if (cartItems.length === 0 && !placed) {
    return (
      <div style={{ textAlign: 'center', marginTop: '3rem' }}>
        <p>Your cart is empty. Add items before checking out.</p>
      </div>
    )
  }

  if (placed) {
    return (
      <div style={{ textAlign: 'center', marginTop: '3rem' }}>
        <h2 style={{ color: '#28a745' }}>✓ Order Placed!</h2>
        <p style={{ marginTop: '1rem' }}>Thank you, {form.name}. Redirecting you home...</p>
      </div>
    )
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '500px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '1.5rem' }}>Checkout</h2>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={labelStyle}>Full Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            style={inputStyle}
          />
          {errors.name && <p style={errorStyle}>{errors.name}</p>}
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={labelStyle}>Shipping Address</label>
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            style={inputStyle}
          />
          {errors.address && <p style={errorStyle}>{errors.address}</p>}
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={labelStyle}>Email</label>
          <input
            type="text"
            name="email"
            value={form.email}
            onChange={handleChange}
            style={inputStyle}
          />
          {errors.email && <p style={errorStyle}>{errors.email}</p>}
        </div>

        <p style={{ fontWeight: 'bold', marginBottom: '1rem' }}>
          Order Total: ${cartTotal.toFixed(2)}
        </p>

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '0.75rem',
            backgroundColor: '#1a1a1a',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          Place Order
        </button>
      </form>
    </div>
  )
}

const labelStyle = { display: 'block', marginBottom: '0.4rem', fontWeight: '500' }
const inputStyle = { width: '100%', padding: '0.6rem', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem' }
const errorStyle = { color: 'red', fontSize: '0.85rem', marginTop: '0.3rem' }

export default Checkout