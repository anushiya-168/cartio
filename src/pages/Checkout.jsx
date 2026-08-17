import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import emailjs from '@emailjs/browser'
import { storeUpiId, storeUpiName, storeQrImage } from '../services/storeConfig'
import { supabase } from '../services/supabaseClient'

function Checkout() {
  const { cartItems, cartTotal, clearCart } = useCart()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', address: '', pincode: '', mobile: '', email: '' })
  const [errors, setErrors] = useState({})
  const [step, setStep] = useState('details')
  const [paymentMethod, setPaymentMethod] = useState('')
  const [placed, setPlaced] = useState(false)
  const [sending, setSending] = useState(false)
  const [paymentConfirmed, setPaymentConfirmed] = useState(false)

  const codSurcharge = cartItems.reduce((sum, item) => sum + item.quantity * 10, 0)
  const finalTotal = paymentMethod === 'cod' ? cartTotal + codSurcharge : cartTotal

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

  const buildCustomerWhatsappLink = () => {
    const itemLines = cartItems.map((item) => '- ' + item.title.replace(/'/g, '') + ' x' + item.quantity).join('\n')
    const message =
      'Hi ' + form.name + ', your Cartio order is confirmed!\n\n' +
      'Items:\n' + itemLines + '\n\n' +
      'Total: Rs.' + finalTotal.toFixed(2) + '\n' +
      'Delivery Address: ' + form.address + ', ' + form.pincode + '\n\n' +
      'Thank you for shopping with Cartio!'
    return 'https://wa.me/91' + form.mobile + '?text=' + encodeURIComponent(message)
  }

  const handleDetailsSubmit = (e) => {
    e.preventDefault()
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    setStep('method')
  }

  const chooseMethod = (method) => {
    setPaymentMethod(method)
    setPaymentConfirmed(false)
    if (method === 'upi') {
      setStep('payment')
    } else {
      setStep('cod-confirm')
    }
  }

  const handleConfirmOrder = async () => {
    setSending(true)

    const itemsSummary = cartItems.map((item) => item.title + ' x' + item.quantity).join(', ')

    try {
      const { error } = await supabase.from('Orders').insert([
        {
          customer_name: form.name,
          mobile: form.mobile,
          email: form.email,
          address: form.address,
          pincode: form.pincode,
          items: itemsSummary,
          payment_method: paymentMethod === 'cod' ? 'Cash on Delivery' : 'UPI',
          total_amount: finalTotal,
          status: 'Pending'
        }
      ])
      if (error) {
        console.error('Error saving order to database:', error)
      }
    } catch (err) {
      console.error('Unexpected error saving order:', err)
    }

    const whatsappLinkForOwner = buildCustomerWhatsappLink()
    const itemLines = cartItems.map((item) => item.title + ' x' + item.quantity).join(', ')
    const paymentLine = paymentMethod === 'cod'
      ? 'COD (includes Rs.' + codSurcharge + ' charge)'
      : 'UPI (Paid)'

    const customerParams = {
      to_name: form.name,
      to_email: form.email,
      order_total: finalTotal.toFixed(2),
      shipping_address: form.address + ', ' + form.pincode
    }

    const ownerParams = {
      to_name: 'New Order Alert',
      to_email: 'anushiya.r1712@gmail.com',
      order_total: finalTotal.toFixed(2),
      shipping_address:
        'Customer: ' + form.name + ' | Mobile: ' + form.mobile + '\n' +
        'Items: ' + itemLines + '\n' +
        'Payment: ' + paymentLine + '\n' +
        'Address: ' + form.address + ', ' + form.pincode + '\n\n' +
        'Tap to send confirmation on WhatsApp: ' + whatsappLinkForOwner
    }

    Promise.all([
      emailjs.send('service_aib4e7e', 'template_e6liqyb', customerParams, 'SBW4gdd2ztMg2eoUf'),
      emailjs.send('service_aib4e7e', 'template_e6liqyb', ownerParams, 'SBW4gdd2ztMg2eoUf')
    ])
      .then(function () { finalizeOrder() })
      .catch(function (error) {
        console.error('Email failed to send:', error)
        finalizeOrder()
      })
  }

  const finalizeOrder = () => {
    setSending(false)
    setPlaced(true)
    clearCart()
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
        <p style={{ margin: '1rem 0' }}>
          Thank you, {form.name}. A confirmation email is on its way, and you'll hear from us on WhatsApp shortly.
        </p>

        <button onClick={goHome} style={backLinkStyle}>
          Back to Home
        </button>
      </div>
    )
  }

  if (step === 'payment') {
    return (
      <div style={{ padding: '2rem', maxWidth: '500px', margin: '0 auto', textAlign: 'center' }}>
        <StepTracker current={3} />
        <h2 style={{ marginBottom: '0.5rem' }}>Pay via UPI</h2>
        <p style={{ color: '#666', marginBottom: '1.5rem' }}>
          Scan the QR code or pay to the UPI ID below, then confirm your payment.
        </p>

        <img
          src={storeQrImage}
          alt="UPI QR Code"
          style={{ width: '220px', height: '220px', border: '2px solid var(--ink)', borderRadius: '8px', marginBottom: '1rem' }}
        />

        <p style={{ fontWeight: 600, marginBottom: '0.3rem' }}>{storeUpiName}</p>
        <p className="price-tag" style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>{storeUpiId}</p>
        <p className="price-tag" style={{ fontSize: '1.3rem', marginBottom: '1.5rem' }}>
          Amount to Pay: Rs.{finalTotal.toFixed(2)}
        </p>

        <div style={{
          textAlign: 'left',
          backgroundColor: '#fff8e6',
          border: '1px solid var(--marigold)',
          borderRadius: '6px',
          padding: '0.9rem 1rem',
          marginBottom: '1.2rem',
          fontSize: '0.8rem'
        }}>
          Please complete the payment above before checking the box below. Orders confirmed without actual payment will be cancelled and not shipped.
        </div>

        <label style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '0.6rem',
          textAlign: 'left',
          marginBottom: '1.2rem',
          fontSize: '0.85rem',
          cursor: 'pointer'
        }}>
          <input
            type="checkbox"
            checked={paymentConfirmed}
            onChange={(e) => setPaymentConfirmed(e.target.checked)}
            style={{ marginTop: '0.2rem' }}
          />
          <span>I confirm I have completed the payment of Rs.{finalTotal.toFixed(2)} to the UPI ID above.</span>
        </label>

        <button
          onClick={handleConfirmOrder}
          disabled={sending || !paymentConfirmed}
          style={{
            width: '100%',
            padding: '0.75rem',
            backgroundColor: 'var(--ink)',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: (sending || !paymentConfirmed) ? 'not-allowed' : 'pointer',
            fontSize: '1rem',
            opacity: (sending || !paymentConfirmed) ? 0.5 : 1,
            marginBottom: '0.8rem'
          }}
        >
          {sending ? 'Confirming...' : 'Confirm Order'}
        </button>

        <p>
          <button onClick={function () { setStep('method') }} style={backLinkStyle}>
            Back
          </button>
        </p>
      </div>
    )
  }

  if (step === 'cod-confirm') {
    return (
      <div style={{ padding: '2rem', maxWidth: '500px', margin: '0 auto', textAlign: 'center' }}>
        <StepTracker current={3} />
        <h2 style={{ marginBottom: '0.5rem' }}>Cash on Delivery</h2>
        <p style={{ color: '#666', marginBottom: '1.5rem' }}>
          Pay in cash when your order arrives.
        </p>

        <div style={{ textAlign: 'left', backgroundColor: 'var(--paper-alt)', border: '2px solid var(--ink)', borderRadius: '8px', padding: '1.2rem', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span>Item Total</span>
            <span className="price-tag">Rs.{cartTotal.toFixed(2)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: 'var(--cherry)' }}>
            <span>COD Charge (Rs.10 x {cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
            <span className="price-tag">+Rs.{codSurcharge.toFixed(2)}</span>
          </div>
          <div style={{ borderTop: '1px dashed var(--line)', paddingTop: '0.5rem', display: 'flex', justifyContent: 'space-between', fontWeight: 700 }}>
            <span>Pay on Delivery</span>
            <span className="price-tag">Rs.{finalTotal.toFixed(2)}</span>
          </div>
        </div>

        <button
          onClick={handleConfirmOrder}
          disabled={sending}
          style={{
            width: '100%',
            padding: '0.75rem',
            backgroundColor: 'var(--ink)',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: sending ? 'not-allowed' : 'pointer',
            fontSize: '1rem',
            opacity: sending ? 0.7 : 1,
            marginBottom: '0.8rem'
          }}
        >
          {sending ? 'Placing Order...' : 'Confirm COD Order'}
        </button>

        <p>
          <button onClick={function () { setStep('method') }} style={backLinkStyle}>
            Back
          </button>
        </p>
      </div>
    )
  }

  if (step === 'method') {
    return (
      <div style={{ padding: '2rem', maxWidth: '500px', margin: '0 auto' }}>
        <StepTracker current={2} />
        <h2 style={{ marginBottom: '1.5rem' }}>Choose Payment Method</h2>

        <button onClick={function () { chooseMethod('upi') }} style={methodCardStyle}>
          <span style={{ fontWeight: 700, display: 'block', marginBottom: '0.3rem' }}>Pay via UPI</span>
          <span style={{ fontSize: '0.85rem', color: '#666' }}>Scan QR code, pay Rs.{cartTotal.toFixed(2)} instantly</span>
        </button>

        <button onClick={function () { chooseMethod('cod') }} style={methodCardStyle}>
          <span style={{ fontWeight: 700, display: 'block', marginBottom: '0.3rem' }}>Cash on Delivery</span>
          <span style={{ fontSize: '0.85rem', color: '#666' }}>
            Pay Rs.{(cartTotal + codSurcharge).toFixed(2)} in cash (includes Rs.10 per item COD charge)
          </span>
        </button>

        <p style={{ marginTop: '1rem' }}>
          <button onClick={function () { setStep('details') }} style={backLinkStyle}>
            Back to details
          </button>
        </p>
      </div>
    )
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '500px', margin: '0 auto' }}>
      <button
        onClick={() => navigate(-1)}
        style={{ background: 'none', border: 'none', color: 'var(--ink)', cursor: 'pointer', fontSize: '0.9rem', marginBottom: '1rem', padding: 0 }}
      >
        ← Back
      </button>

      <StepTracker current={1} />
      <h2 style={{ marginBottom: '1.5rem' }}>Delivery Details</h2>

      <form onSubmit={handleDetailsSubmit}>
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
          style={{
            width: '100%',
            padding: '0.75rem',
            backgroundColor: 'var(--ink)',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          Continue
        </button>
      </form>
    </div>
  )
}

const labelStyle = { display: 'block', marginBottom: '0.4rem', fontWeight: '500' }
const inputStyle = { width: '100%', padding: '0.6rem', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem' }
const errorStyle = { color: 'red', fontSize: '0.85rem', marginTop: '0.3rem' }
const backLinkStyle = { background: 'none', border: 'none', color: 'var(--ink)', textDecoration: 'underline', cursor: 'pointer', fontSize: '0.9rem' }
const methodCardStyle = { display: 'block', width: '100%', textAlign: 'left', padding: '1.2rem', backgroundColor: 'var(--paper-alt)', border: '1px solid var(--line)', borderRadius: '10px', cursor: 'pointer', marginBottom: '1rem', transition: 'border-color 0.15s ease, box-shadow 0.15s ease' }

function StepTracker({ current }) {
  const steps = ['Details', 'Method', 'Payment']
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '1.5rem' }}>
      {steps.map((label, i) => {
        const stepNum = i + 1
        const isDone = stepNum < current
        const isActive = stepNum === current
        return (
          <div key={label} style={{ display: 'flex', alignItems: 'center', flex: i < steps.length - 1 ? 1 : 'none' }}>
            <div style={{
              width: '26px',
              height: '26px',
              borderRadius: '50%',
              backgroundColor: isDone || isActive ? 'var(--ink)' : 'var(--paper)',
              color: isDone || isActive ? '#fff' : '#8a95a5',
              border: isActive ? '2px solid var(--marigold)' : '1px solid var(--line)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.75rem',
              fontWeight: 700,
              flexShrink: 0
            }}>
              {isDone ? '✓' : stepNum}
            </div>
            {i < steps.length - 1 && (
              <div style={{ flex: 1, height: '2px', backgroundColor: isDone ? 'var(--ink)' : 'var(--line)', margin: '0 0.4rem' }} />
            )}
          </div>
        )
      })}
    </div>
  )
}

export default Checkout