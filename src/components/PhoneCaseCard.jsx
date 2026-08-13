import { Link } from 'react-router-dom'
import { typeImages } from '../services/phoneCaseData'
import { useWishlist } from '../context/WishlistContext'

function PhoneCaseCard({ item }) {
  const { toggleWishlist, isWishlisted } = useWishlist()
  const liked = isWishlisted(item.id)

  return (
    <div className="hover-card" style={{
      position: 'relative',
      border: '2px solid var(--ink)',
      borderRadius: '10px',
      padding: '1.2rem 1rem 1rem',
      backgroundColor: 'var(--paper-alt)',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '0 3px 10px rgba(27, 36, 48, 0.06)'
    }}>
      <button
        onClick={() => toggleWishlist(item.id)}
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: 'rgba(255,255,255,0.9)',
          border: 'none',
          borderRadius: '50%',
          width: '30px',
          height: '30px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 2
        }}
        aria-label="Toggle wishlist"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill={liked ? 'var(--cherry)' : 'none'} stroke="var(--cherry)" strokeWidth="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      </button>

      <span className="price-tag" style={{
        position: 'absolute',
        top: '48px',
        right: '10px',
        fontSize: '0.6rem',
        color: 'var(--cherry)',
        backgroundColor: '#fce8e6',
        padding: '0.2rem 0.5rem',
        borderRadius: '3px',
        textTransform: 'uppercase'
      }}>
        {item.type}
      </span>

      <img
        src={typeImages[item.type]}
        alt={item.type}
        style={{ height: '140px', width: '100%', objectFit: 'cover', borderRadius: '6px', margin: '0.5rem 0 1rem' }}
      />

      <h3 style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.3rem' }}>
        {item.title}
      </h3>
      <p style={{ fontSize: '0.8rem', color: '#5a6472', marginBottom: '0.5rem' }}>Fits: {item.model}</p>
      <p className="price-tag" style={{ fontSize: '1rem', marginBottom: '0.9rem' }}>₹{item.price}</p>

      <Link to={`/phone-case/${item.id}`} className="hover-btn" style={{
        display: 'block',
        textAlign: 'center',
        padding: '0.6rem',
        backgroundColor: 'var(--ink)',
        color: '#fff',
        textDecoration: 'none',
        borderRadius: '4px',
        fontSize: '0.85rem'
      }}>
        View Details
      </Link>
    </div>
  )
}

export default PhoneCaseCard