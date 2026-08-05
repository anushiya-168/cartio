import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

function Navbar() {
  const { cartCount } = useCart()

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1.1rem 2rem',
      backgroundColor: 'var(--ink)',
      borderBottom: '3px solid var(--marigold)'
    }}>
      <Link to="/" style={{
        color: '#fff',
        textDecoration: 'none',
        fontFamily: 'var(--font-display)',
        fontSize: '1.4rem',
        letterSpacing: '-0.02em'
      }}>
        Cartio
      </Link>

      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        <Link to="/" style={navLinkStyle}>Shop</Link>
        <Link to="/phone-cases" style={navLinkStyle}>Phone Cases</Link>
        <Link to="/cart" style={{
          ...navLinkStyle,
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

const navLinkStyle = {
  color: '#fff',
  textDecoration: 'none',
  fontSize: '0.95rem'
}

export default Navbar