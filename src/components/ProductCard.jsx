import { Link } from 'react-router-dom'

function ProductCard({ product }) {
  return (
    <div className="hover-card"style={{
      position: 'relative',
      border: '2px solid var(--ink)',
      borderRadius: '6px',
      padding: '1.2rem 1rem 1rem',
      backgroundColor: 'var(--paper-alt)',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      boxShadow: '0 3px 10px rgba(27,36,48,0.06)'
    }}>
      {/* punched hole */}
      <div style={{
        position: 'absolute',
        top: '10px',
        left: '10px',
        width: '10px',
        height: '10px',
        borderRadius: '50%',
        backgroundColor: 'var(--paper)',
        border: '2px solid var(--ink)'
      }} />

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
        {product.category}
      </span>

      <img
        src={product.image}
        alt={product.title}
        style={{ height: '150px', objectFit: 'contain', margin: '0.5rem 0 1rem' }}
      />
      <h3 style={{
        fontFamily: 'var(--font-body)',
        fontWeight: 600,
        fontSize: '0.9rem',
        marginBottom: '0.6rem',
        flexGrow: 1
      }}>
        {product.title.length > 40 ? product.title.slice(0, 40) + '...' : product.title}
      </h3>

      <p className="price-tag" style={{ fontSize: '1.1rem', marginBottom: '0.75rem' }}>
        ₹{product.price}
      </p>

      {/* perforation line */}
      <div style={{
        borderTop: '1px dashed var(--line)',
        margin: '0.5rem 0 0.9rem'
      }} />

      <Link to={`/product/${product.id}`} className="hover-btn" style={{
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

export default ProductCard