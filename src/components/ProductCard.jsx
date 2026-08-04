import { Link } from 'react-router-dom'

function ProductCard({ product }) {
  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '1rem',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '100%'
    }}>
      <img
        src={product.image}
        alt={product.title}
        style={{ height: '150px', objectFit: 'contain', marginBottom: '1rem' }}
      />
      <h3 style={{ fontSize: '0.95rem', marginBottom: '0.5rem' }}>
        {product.title.length > 40 ? product.title.slice(0, 40) + '...' : product.title}
      </h3>
      <p style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>${product.price}</p>
      <Link to={`/product/${product.id}`} style={{
        display: 'inline-block',
        padding: '0.5rem 1rem',
        backgroundColor: '#1a1a1a',
        color: '#fff',
        textDecoration: 'none',
        borderRadius: '4px'
      }}>
        View Details
      </Link>
    </div>
  )
}

export default ProductCard