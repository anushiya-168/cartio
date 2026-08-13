import { Link } from 'react-router-dom'
import { typeImages } from '../services/phoneCaseData'

function PhoneCaseCard({ item }) {
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
      <span className="price-tag" style={{
        position: 'absolute',
        top: '10px',
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

      <Link to={`/phone-case/${item.id}`}>
        <img
          src={typeImages[item.type]}
          alt={item.type}
          style={{ height: '140px', width: '100%', objectFit: 'cover', borderRadius: '6px', margin: '0.5rem 0 1rem', cursor: 'pointer' }}
        />
      </Link>
      
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