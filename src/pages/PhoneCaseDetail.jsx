import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { phoneCases, typeImages, typeDescriptions } from '../services/phoneCaseData'
import { useCart } from '../context/CartContext'

const sampleReviews = [
  { name: 'Priya S.', rating: 5, comment: 'Fits perfectly and feels sturdy. Buttons are easy to press through the cutouts.' },
  { name: 'Arjun K.', rating: 4, comment: 'Good quality for the price. Took off a star since it attracts a bit of dust.' },
  { name: 'Meera T.', rating: 5, comment: 'Exactly as shown in photos. Delivery was quick too.' }
]

function PhoneCaseDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const item = phoneCases.find((c) => c.id === Number(id))

  const [selectedColor, setSelectedColor] = useState(item ? item.colors[0] : null)
  const [added, setAdded] = useState(false)

  if (!item) return <p style={{ textAlign: 'center', marginTop: '2rem' }}>Case not found.</p>

  const handleAdd = () => {
    addToCart({
      id: `${item.id}-${selectedColor}`,
      title: `${item.title} (${item.model})`,
      price: item.price,
      image: typeImages[item.type]
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  const today = new Date()
  const deliveryStart = new Date(today)
  deliveryStart.setDate(today.getDate() + 4)
  const deliveryEnd = new Date(today)
  deliveryEnd.setDate(today.getDate() + 6)
  const dateOptions = { day: 'numeric', month: 'short' }
  const deliveryText = deliveryStart.toLocaleDateString('en-IN', dateOptions) + ' - ' + deliveryEnd.toLocaleDateString('en-IN', dateOptions)

  const relatedCases = phoneCases
    .filter((c) => c.model === item.model && c.id !== item.id)
    .slice(0, 4)

  const avgRating = (sampleReviews.reduce((sum, r) => sum + r.rating, 0) / sampleReviews.length).toFixed(1)

  return (
    <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
      <button
        onClick={() => navigate(-1)}
        style={{ background: 'none', border: 'none', color: 'var(--ink)', cursor: 'pointer', fontSize: '0.9rem', marginBottom: '1.5rem', padding: 0 }}
      >
        ← Back
      </button>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
        <img
          src={typeImages[item.type]}
          alt={item.type}
          style={{ height: '300px', flex: '1 1 250px', objectFit: 'cover', borderRadius: '8px' }}
        />

        <div style={{ flex: '1 1 300px' }}>
          <span className="price-tag" style={{ fontSize: '0.7rem', color: 'var(--cherry)', textTransform: 'uppercase' }}>
            {item.type}
          </span>

          <h2 style={{ margin: '0.4rem 0' }}>{item.title}</h2>
          <p style={{ color: '#666', marginBottom: '0.4rem' }}>Fits: {item.model}</p>

          <p style={{ fontSize: '0.85rem', color: '#e8a33d', marginBottom: '1rem' }}>
            {'★'.repeat(Math.round(avgRating))}{'☆'.repeat(5 - Math.round(avgRating))}
            <span style={{ color: '#666', marginLeft: '0.4rem' }}>{avgRating} ({sampleReviews.length} reviews)</span>
          </p>

          <p className="price-tag" style={{ fontSize: '1.5rem', marginBottom: '1.2rem' }}>₹{item.price}</p>

          <p style={{ fontSize: '0.9rem', color: '#444', lineHeight: 1.6, marginBottom: '1.2rem' }}>
            {typeDescriptions[item.type]}
          </p>

          <div style={{
            backgroundColor: 'var(--paper)',
            border: '1px dashed var(--line)',
            borderRadius: '6px',
            padding: '0.8rem 1rem',
            marginBottom: '1.5rem',
            fontSize: '0.85rem'
          }}>
            Estimated delivery: <strong>{deliveryText}</strong>
          </div>

          <p style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.6rem' }}>Choose a color:</p>
          <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '1.5rem' }}>
            {item.colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                style={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  backgroundColor: color,
                  border: selectedColor === color ? '3px solid var(--marigold)' : '2px solid var(--line)',
                  cursor: 'pointer',
                  padding: 0
                }}
                aria-label={`Select color ${color}`}
              />
            ))}
          </div>

          <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
            <button
              onClick={handleAdd}
              className={added ? '' : 'hover-btn'}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: added ? '#28a745' : 'var(--ink)',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '1rem'
              }}
            >
              {added ? 'Added ✓' : 'Add to Cart'}
            </button>

            <button
              onClick={() => navigate('/cart')}
              className="hover-btn"
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: 'var(--paper-alt)',
                color: 'var(--ink)',
                border: '2px solid var(--ink)',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '1rem'
              }}
            >
              Go to Cart
            </button>
          </div>
        </div>
      </div>
      
      <div style={{ marginTop: '3rem', borderTop: '1px solid var(--line)', paddingTop: '2rem' }}>
        <h3 style={{ marginBottom: '1rem' }}>Customer Reviews</h3>
        {sampleReviews.map((review, i) => (
          <div key={i} style={{ marginBottom: '1.2rem', paddingBottom: '1.2rem', borderBottom: '1px solid #eee' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
              <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{review.name}</span>
              <span style={{ color: '#e8a33d', fontSize: '0.85rem' }}>{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</span>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#555' }}>{review.comment}</p>
          </div>
        ))}
      </div>

      {relatedCases.length > 0 && (
        <div style={{ marginTop: '3rem' }}>
          <h3 style={{ marginBottom: '1rem' }}>More cases for {item.model}</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '1rem' }}>
            {relatedCases.map((related) => (
              <Link
                key={related.id}
                to={`/phone-case/${related.id}`}
                className="hover-card"
                style={{
                  display: 'block',
                  border: '2px solid var(--ink)',
                  borderRadius: '8px',
                  padding: '0.8rem',
                  textDecoration: 'none',
                  color: 'var(--ink)',
                  backgroundColor: 'var(--paper-alt)'
                }}
              >
                <img
                  src={typeImages[related.type]}
                  alt={related.type}
                  style={{ height: '90px', width: '100%', objectFit: 'cover', borderRadius: '4px', marginBottom: '0.5rem' }}
                />
                <p style={{ fontSize: '0.8rem', fontWeight: 600 }}>{related.title}</p>
                <p className="price-tag" style={{ fontSize: '0.85rem' }}>₹{related.price}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default PhoneCaseDetail