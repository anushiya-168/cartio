import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { phoneCases, typeImages } from '../services/phoneCaseData'
import { useCart } from '../context/CartContext'

function PhoneCaseDetail() {
  const { id } = useParams()
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
        src={typeImages[item.type]}
        alt={item.type}
        style={{ height: '300px', flex: '1 1 250px', objectFit: 'cover', borderRadius: '8px' }}
      />

      <div style={{ flex: '1 1 300px' }}>
        <span className="price-tag" style={{
          fontSize: '0.7rem',
          color: 'var(--cherry)',
          textTransform: 'uppercase'
        }}>
          {item.type}
        </span>

        <h2 style={{ margin: '0.4rem 0' }}>{item.title}</h2>
        <p style={{ color: '#666', marginBottom: '1rem' }}>Fits: {item.model}</p>
        <p className="price-tag" style={{ fontSize: '1.5rem', marginBottom: '1.2rem' }}>₹{item.price}</p>

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
      </div>
    </div>
  )
}

export default PhoneCaseDetail