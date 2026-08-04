import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

function Navbar() {
  const { cartCount } = useCart()

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 2rem',
      backgroundColor: '#1a1a1a',
      color: '#fff'
    }}>
      <Link to="/" style={{ color: '#fff', textDecoration: 'none', fontSize: '1.5rem', fontWeight: 'bold' }}>
        Cartio
      </Link>

      <Link to="/cart" style={{ color: '#fff', textDecoration: 'none' }}>
        🛒 Cart ({cartCount})
      </Link>
    </nav>
  )
}

export default Navbar