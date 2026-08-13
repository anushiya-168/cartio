import { useCart } from '../context/CartContext'

function Toast() {
  const { toast } = useCart()

  if (!toast) return null

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: 'var(--ink)',
      color: '#fff',
      padding: '0.8rem 1.3rem',
      borderRadius: '8px',
      border: '2px solid var(--marigold)',
      boxShadow: '0 6px 20px rgba(0,0,0,0.2)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      gap: '0.6rem',
      maxWidth: '90vw',
      animation: 'toastSlideUp 0.25s ease'
    }}>
      <span style={{ color: 'var(--marigold)', fontWeight: 700 }}>✓</span>
      <div style={{ fontSize: '0.85rem' }}>
        <span style={{ fontWeight: 600 }}>
          {toast.title.length > 35 ? toast.title.slice(0, 35) + '...' : toast.title}
        </span>
        <span style={{ color: '#c9d2db' }}> added to cart</span>
        <span className="price-tag" style={{ marginLeft: '0.5rem', color: 'var(--marigold)' }}>
          · {toast.totalCount} item{toast.totalCount > 1 ? 's' : ''} in cart
        </span>
      </div>
    </div>
  )
}

export default Toast