import { Link , useNavigate} from 'react-router-dom'
import { useCart } from '../context/CartContext'

function Cart() {
  const navigate = useNavigate()
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart()

  if (cartItems.length === 0) {
    return (
      <div style={{ textAlign: 'center', marginTop: '3rem' }}>
        <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Your cart is empty.</p>
        <Link to="/" style={{ color: '#1a1a1a', fontWeight: 'bold' }}>
          ← Continue Shopping
        </Link>
      </div>
    )
  }

 return (
    <div style={{ padding: '2.5rem 2rem', maxWidth: '700px', margin: '0 auto' }}>
      <button
        onClick={() => navigate(-1)}
        style={{ background: 'none', border: 'none', color: 'var(--ink)', cursor: 'pointer', fontSize: '0.9rem', marginBottom: '1rem', padding: 0 }}
      >
        ← Back
      </button>

      <p className="price-tag" style={{ color: 'var(--cherry)', fontSize: '0.75rem', marginBottom: '0.3rem' }}>
        REVIEW & CONFIRM
      </p>
      <h2 style={{ marginBottom: '1.5rem' }}>Your Cart</h2>
      {cartItems.map((item) => (
        <div
          key={item.id}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            borderBottom: '1px solid #eee',
            padding: '1rem 0'
          }}
        >
          <img src={item.image} alt={item.title} style={{ width: '60px', height: '60px', objectFit: 'contain' }} />

          <div style={{ flex: 1 }}>
            <p style={{ fontSize: '0.9rem', marginBottom: '0.25rem' }}>
              {item.title.length > 35 ? item.title.slice(0, 35) + '...' : item.title}
            </p>
            <p style={{ fontWeight: 'bold' }}>₹{item.price}</p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={qtyBtnStyle}>−</button>
            <span className="price-tag" style={{ minWidth: '20px', textAlign: 'center' }}>{item.quantity}</span>
            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={qtyBtnStyle}>+</button>
          </div>

          <button
            onClick={() => removeFromCart(item.id)}
            style={{
              background: 'none',
              border: 'none',
              color: 'red',
              cursor: 'pointer',
              fontSize: '0.9rem'
            }}
          >
            Remove
          </button>
        </div>
      ))}

      <div style={{
        marginTop: '1.5rem',
        textAlign: 'right',
        borderTop: '2px dashed var(--line)',
        paddingTop: '1.5rem'
      }}>
        <p className="price-tag" style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>
          TOTAL:₹{cartTotal.toFixed(2)}
        </p>
        <Link
          to="/checkout"
          style={{
            display: 'inline-block',
            padding: '0.75rem 1.5rem',
            backgroundColor: 'var(--ink)',
            color: '#fff',
            textDecoration: 'none',
            borderRadius: '4px',
            border: '2px solid var(--marigold)'
          }}
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  )
}

const qtyBtnStyle = {
  width: '28px',
  height: '28px',
  border: '2px solid var(--ink)',
  background: 'var(--paper-alt)',
  color: 'var(--ink)',
  cursor: 'pointer',
  borderRadius: '4px',
  fontFamily: 'var(--font-mono)',
  fontSize: '1rem',
  fontWeight: 'bold',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'background-color 0.15s'
}
export default Cart