import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import emailjs from '@emailjs/browser'

function Checkout() {
  const { cartItems, cartTotal, clearCart } = useCart()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', address: '', pincode: '', mobile: '', email: '' })
  const [errors, setErrors] = useState({})
  const [placed, setPlaced] = useState(false)
  const [sending, setSending] = useState(false)
  const [whatsappLink, setWhatsappLink] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const validate = () => {
    const newErrors = {}
    if (!form.name.trim()) newErrors.name = 'Name is required'
    if (!form.address.trim()) newErrors.address = 'Address is required'

    if (!form.pincode.trim()) {
      newErrors.pincode = 'Pincode is required'
    } else if (!/^\d{6}$/.test(form.pincode.trim())) {
      newErrors.pincode = 'Enter a valid 6-digit pincode'
    }

    if (!form.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required'
    } else if (!/^[6-9]\d{9}$/.test(form.mobile.trim())) {
      newErrors.mobile = 'Enter a valid 10-digit mobile number (no country code, no spaces)'
    }

    if (!form.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Enter a valid email'
    }
    return newErrors
  }

  const buildWhatsappMessage = () => {
    const itemLines = cartItems.map((item) => '- ' + item.title.replace(/'/g, '') + ' x' + item.quantity).join('%0A')
    const message =
      'Hi ' + form.name + ', your Cartio order is confirmed!%0A%0A' +
      'Items:%0A' + itemLines + '%0A%0A' +
      'Total: Rs.' + cartTotal.toFixed(2) + '%0A' +
      'Delivery Address: ' + form.address + ', ' + form.pincode + '%0A%0A' +
      'Thank you for shopping with Cartio!'
    return 'https://wa.me/91' + form.mobile + '?text=' + encodeURIComponent(message.replace(/%0A/g, '\n'))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setSending(true)

    const templateParams = {
      to_name: form.name,
      to_email: form.email,
      order_total: cartTotal.toFixed(2),
      shipping_address: form.address + ', ' + form.pincode
    }

    emailjs
      .send('service_aib4e7e', 'template_e6liqyb', templateParams, 'SBW4gdd2ztMg2eoUf')
      .then(function () { finalizeOrder() })
      .catch(function (error) {
        console.error('Email failed to send:', error)
        finalizeOrder()
      })
  }

  const finalizeOrder = () => {
    setWhatsappLink(buildWhatsappMessage())
    setSending(false)
    setPlaced(true)
    clearCart()
  }

  const openWhatsapp = () => {
    window.open(whatsappLink, '_blank')
  }

  const goHome = () => {
    navigate('/')
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
      <div style={{ textAlign: 'center', marginTop: '3rem', padding: '0 1.5rem' }}>
        <h2 style={{ color: '#28a745' }}>Order Placed!</h2>
        <p style={{ margin: '1rem 0' }}>Thank you, {form.name}. A confirmation email is on its way.</p>

        <button onClick={openWhatsapp} style={whatsappBtnStyle}>
          Send Order Summary on WhatsApp
        </button>

        <p style={{ marginTop: '1rem' }}>
          <button onClick={goHome} style={backLinkStyle}>
            Back to Home
          </button>
        </p>
      </div>
    )
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '500px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '1.5rem' }}>Checkout</h2>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={labelStyle}>Full Name</label>
          <input type="text" name="name" value={form.name} onChange={handleChange} style={inputStyle} />
          {errors.name && <p style={errorStyle}>{errors.name}</p>}
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={labelStyle}>Shipping Address</label>
          <input type="text" name="address" value={form.address} onChange={handleChange} style={inputStyle} />
          {errors.address && <p style={errorStyle}>{errors.address}</p>}
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={labelStyle}>Pincode</label>
          <input
            type="text"
            name="pincode"
            value={form.pincode}
            onChange={handleChange}
            placeholder="6-digit pincode"
            maxLength={6}
            style={inputStyle}
          />
          {errors.pincode && <p style={errorStyle}>{errors.pincode}</p>}
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={labelStyle}>Mobile Number</label>
          <input
            type="text"
            name="mobile"
            value={form.mobile}
            onChange={handleChange}
            placeholder="10-digit number, e.g. 9876543210"
            maxLength={10}
            style={inputStyle}
          />
          {errors.mobile && <p style={errorStyle}>{errors.mobile}</p>}
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={labelStyle}>Email</label>
          <input type="text" name="email" value={form.email} onChange={handleChange} style={inputStyle} />
          {errors.email && <p style={errorStyle}>{errors.email}</p>}
        </div>

        <p style={{ fontWeight: 'bold', marginBottom: '1rem' }}>
          Order Total: Rs.{cartTotal.toFixed(2)}
        </p>

        <button
          type="submit"
          disabled={sending}
          className={sending ? '' : 'hover-btn'}
          style={{
            width: '100%',
            padding: '0.75rem',
            backgroundColor: 'var(--ink)',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: sending ? 'not-allowed' : 'pointer',
            fontSize: '1rem',
            opacity: sending ? 0.7 : 1
          }}
        >
          {sending ? 'Placing Order...' : 'Place Order'}
        </button>
      </form>
    </div>
  )
}

const labelStyle = { display: 'block', marginBottom: '0.4rem', fontWeight: '500' }
const inputStyle = { width: '100%', padding: '0.6rem', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem' }
const errorStyle = { color: 'red', fontSize: '0.85rem', marginTop: '0.3rem' }
const whatsappBtnStyle = { display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', backgroundColor: '#25D366', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 600, cursor: 'pointer', fontSize: '1rem' }
const backLinkStyle = { background: 'none', border: 'none', color: 'var(--ink)', textDecoration: 'underline', cursor: 'pointer', fontSize: '0.9rem' }

export default Checkout