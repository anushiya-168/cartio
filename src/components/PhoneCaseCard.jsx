import { useState } from 'react'
import { typeImages } from '../services/phoneCaseData'

function PhoneCaseCard({ item, onAddToCart }) {
  const [selectedColor, setSelectedColor] = useState(item.colors[0])
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    onAddToCart(item, selectedColor)
    setAdded(true)
    setTimeout(() => setAdded(false), 1200)
  }

  return (
    <div style={{
      position: 'relative',
      border: '2px solid var(--ink)',
      borderRadius: '6px',
      padding: '1.2rem 1rem 1rem',
      backgroundColor: 'var(--paper-alt)',
      display: 'flex',
      flexDirection: 'column'
    }}>
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

      <img
        src={typeImages[item.type]}
        alt={item.type}
        style={{ height: '140px', width: '100%', objectFit: 'cover', borderRadius: '4px', margin: '0.5rem 0 1rem' }}
      />

      <span className="price-tag" style={{
        fontSize: '0.7rem',
        color: 'var(--cherry)',
        marginBottom: '0.3rem',
        textTransform: 'uppercase'
      }}>
        {item.type}
      </span>

      <h3 style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.3rem' }}>
        {item.title}
      </h3>
      <p style={{ fontSize: '0.8rem', color: '#5a6472', marginBottom: '0.5rem' }}>Fits: {item.model}</p>
      <p className="price-tag" style={{ fontSize: '1rem', marginBottom: '0.75rem' }}>₹{item.price}</p>

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.9rem' }}>
        {item.colors.map((color) => (
          <button
            key={color}
            onClick={() => setSelectedColor(color)}
            style={{
              width: '22px',
              height: '22px',
              borderRadius: '50%',
              backgroundColor: color,
              border: selectedColor === color ? '2px solid var(--marigold)' : '2px solid var(--line)',
              cursor: 'pointer',
              padding: 0
            }}
            aria-label={`Select color ${color}`}
          />
        ))}
      </div>

      <div style={{ borderTop: '1px dashed var(--line)', margin: '0 0 0.9rem' }} />

      <button
        onClick={handleAdd}
        style={{
          padding: '0.6rem',
          backgroundColor: added ? '#2d6a4f' : 'var(--ink)',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '0.85rem'
        }}
      >
        {added ? 'Added ✓' : 'Add to Cart'}
      </button>
    </div>
  )
}

export default PhoneCaseCard