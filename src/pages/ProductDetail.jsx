import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getProductById } from '../services/api'
import { useCart } from '../context/CartContext'

function ProductDetail() {
  const { id } = useParams()
  const { addToCart } = useCart()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [added, setAdded] = useState(false)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id)
        setProduct(data)
      } catch (err) {
        setError('Failed to load product.')
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [id])

  const handleAddToCart = () => {
    addToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  if (loading) return <p style={{ textAlign: 'center', marginTop: '2rem' }}>Loading...</p>
  if (error) return <p style={{ textAlign: 'center', marginTop: '2rem', color: 'red' }}>{error}</p>
  if (!product) return null

  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: '2rem',
      padding: '2rem',
      maxWidth: '900px',
      margin: '0 auto'
    }}>
      <img
        src={product.image}
        alt={product.title}
        style={{ height: '300px', objectFit: 'contain', flex: '1 1 250px' }}
      />
      <div style={{ flex: '1 1 300px' }}>
        <h2>{product.title}</h2>
        <p style={{ color: '#666', margin: '1rem 0' }}>{product.description}</p>
        <p style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: '1rem 0' }}>
          ₹{product.price}
        </p>
        <p style={{ marginBottom: '1rem' }}>
          ⭐ {product.rating?.rate} ({product.rating?.count} reviews)
        </p>
        <button
          onClick={handleAddToCart}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: added ? '#28a745' : '#1a1a1a',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          {added ? 'Added ✓' : 'Add to Cart'}
        </button>
      </div>
    </div>
  )
}

export default ProductDetail