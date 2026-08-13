import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

function Navbar() {
  const { cartCount } = useCart()

  return (
    <nav className="navbar" style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1.1rem 2rem',
      backgroundColor: 'var(--ink)',
      borderBottom: '3px solid var(--marigold)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <Link to="/" style={{
        color: '#fff',
        textDecoration: 'none',
        fontFamily: 'var(--font-display)',
        fontSize: '1.4rem'
      }}>
        Cartio
      </Link>

      <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
      <Link to="/wishlist" style={{ color: '#fff' }} aria-label="Wishlist">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      </Link>

      <Link to="/cart" style={{
              color: '#fff',
        textDecoration: 'none',
        fontFamily: 'var(--font-mono)',
        backgroundColor: 'var(--marigold)',
        color: 'var(--ink)',
        padding: '0.4rem 0.8rem',
        borderRadius: '4px',
        display: 'flex',
        alignItems: 'center',
        gap: '0.4rem'
      }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--ink)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
        {cartCount}
      </Link>
      </div>
    </nav>
  )
}

export default Navbar