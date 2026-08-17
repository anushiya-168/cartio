import { useState } from 'react'
import { Link } from 'react-router-dom'
import { typeImages } from '../services/phoneCaseData'
import { useWishlist } from '../context/WishlistContext'

function PhoneCaseCard({ item }) {
  const { isWishlisted, toggleWishlist } = useWishlist()
  const liked = isWishlisted(item.id)

  return (
    <div className="hover-card" style={{
      position: 'relative',
      border: '1px solid var(--line)',
      borderRadius: '14px',
      padding: '0',
      backgroundColor: 'var(--paper-alt)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      boxShadow: '0 2px 8px rgba(27, 36, 48, 0.05)'
    }}>
      <div style={{ position: 'relative' }}>
        <Link to={`/phone-case/${item.id}`}>
          <div style={{
            aspectRatio: '1 / 1',
            overflow: 'hidden',
            backgroundColor: 'var(--paper)'
          }}>
            <img
              src={typeImages[item.type]}
              alt={item.type}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>
        </Link>

        <button
          onClick={() => toggleWishlist(item.id)}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'rgba(255,255,255,0.92)',
            border: 'none',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 2px 6px rgba(0,0,0,0.12)'
          }}
          aria-label="Toggle wishlist"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill={liked ? 'var(--cherry)' : 'none'} stroke="var(--cherry)" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>

        <span className="price-tag" style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          fontSize: '0.6rem',
          color: 'var(--cherry)',
          backgroundColor: '#fff',
          padding: '0.25rem 0.55rem',
          borderRadius: '4px',
          textTransform: 'uppercase',
          boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
        }}>
          {item.type}
        </span>
      </div>

      <div style={{ padding: '0.9rem 1rem 1rem' }}>
        <h3 style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.88rem', marginBottom: '0.25rem', lineHeight: 1.3 }}>
          {item.title}
        </h3>
        <p style={{ fontSize: '0.75rem', color: '#8a95a5', marginBottom: '0.6rem' }}>Fits: {item.model}</p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <p className="price-tag" style={{ fontSize: '1.05rem' }}>₹{item.price}</p>
          <Link to={`/phone-case/${item.id}`} className="hover-btn" style={{
            padding: '0.45rem 0.9rem',
            backgroundColor: 'var(--ink)',
            color: '#fff',
            textDecoration: 'none',
            borderRadius: '6px',
            fontSize: '0.75rem',
            fontWeight: 600
          }}>
            View
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PhoneCaseCard