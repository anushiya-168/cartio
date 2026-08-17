import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { phoneCases, typeImages, typeDescriptions } from '../services/phoneCaseData'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { supabase } from '../services/supabaseClient'

function PhoneCaseDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const { isWishlisted, toggleWishlist } = useWishlist()
  const item = phoneCases.find((c) => c.id === Number(id))
  const liked = item ? isWishlisted(item.id) : false

  const [selectedColor, setSelectedColor] = useState(item ? item.colors[0] : null)
  const [added, setAdded] = useState(false)

  const [reviews, setReviews] = useState([])
  const [loadingReviews, setLoadingReviews] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [reviewName, setReviewName] = useState('')
  const [reviewRating, setReviewRating] = useState(5)
  const [reviewComment, setReviewComment] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  useEffect(() => {
    if (item) fetchReviews()
  }, [id])

  const fetchReviews = async () => {
    setLoadingReviews(true)
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('phone_case_id', item.id)
      .order('created_at', { ascending: false })

    if (!error && data) {
      setReviews(data)
    }
    setLoadingReviews(false)
  }

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

  const handleSubmitReview = async (e) => {
    e.preventDefault()
    setSubmitError('')

    if (!reviewName.trim()) {
      setSubmitError('Please enter your name')
      return
    }
    if (!reviewComment.trim()) {
      setSubmitError('Please write a short comment')
      return
    }

    setSubmitting(true)
    const { error } = await supabase.from('reviews').insert([
      {
        phone_case_id: item.id,
        reviewer_name: reviewName.trim(),
        rating: reviewRating,
        comment: reviewComment.trim()
      }
    ])

    if (error) {
      setSubmitError('Something went wrong. Please try again.')
      console.error(error)
    } else {
      setReviewName('')
      setReviewRating(5)
      setReviewComment('')
      setShowForm(false)
      fetchReviews()
    }
    setSubmitting(false)
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

  const allRatings = reviews.map((r) => r.rating)
  const avgRating = allRatings.length > 0
    ? (allRatings.reduce((sum, r) => sum + r, 0) / allRatings.length).toFixed(1)
    : null

  return (
    <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
      <button
        onClick={() => navigate(-1)}
        style={{ background: 'none', border: 'none', color: 'var(--ink)', cursor: 'pointer', fontSize: '0.9rem', marginBottom: '1.5rem', padding: 0 }}
      >
        ← Back
      </button>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
        <div style={{ position: 'relative', flex: '1 1 250px' }}>
          <img
            src={typeImages[item.type]}
            alt={item.type}
            style={{ height: '300px', width: '100%', objectFit: 'cover', borderRadius: '8px' }}
          />
          <button
            onClick={() => toggleWishlist(item.id)}
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              background: 'rgba(255,255,255,0.9)',
              border: 'none',
              borderRadius: '50%',
              width: '38px',
              height: '38px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
            aria-label="Toggle wishlist"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill={liked ? 'var(--cherry)' : 'none'} stroke="var(--cherry)" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
        </div>

        <div style={{ flex: '1 1 300px' }}>
          <span className="price-tag" style={{
            fontSize: '0.65rem',
            color: 'var(--cherry)',
            textTransform: 'uppercase',
            backgroundColor: '#fce8e6',
            padding: '0.25rem 0.6rem',
            borderRadius: '4px'
          }}>
            {item.type}
          </span>

          <h2 style={{ margin: '0.4rem 0' }}>{item.title}</h2>
          <p style={{ color: '#666', marginBottom: '0.4rem' }}>Fits: {item.model}</p>

          <p style={{ fontSize: '0.85rem', color: '#e8a33d', marginBottom: '1rem' }}>
            {avgRating ? (
              <>
                {'★'.repeat(Math.round(avgRating))}{'☆'.repeat(5 - Math.round(avgRating))}
                <span style={{ color: '#666', marginLeft: '0.4rem' }}>{avgRating} ({reviews.length} review{reviews.length !== 1 ? 's' : ''})</span>
              </>
            ) : (
              <span style={{ color: '#999' }}>No reviews yet</span>
            )}
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
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.8rem' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.8rem' }}>
            <h3>Customer Reviews</h3>
            <span className="price-tag" style={{ fontSize: '0.75rem', color: '#8a95a5' }}>{reviews.length} review{reviews.length !== 1 ? 's' : ''}</span>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="hover-btn"
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: 'var(--ink)',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '0.8rem',
              fontWeight: 600
            }}
          >
            {showForm ? 'Cancel' : 'Write a Review'}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmitReview} style={{
            backgroundColor: 'var(--paper)',
            border: '1px solid var(--line)',
            borderRadius: '10px',
            padding: '1.2rem',
            marginBottom: '1.5rem'
          }}>
            <div style={{ marginBottom: '0.8rem' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.3rem' }}>Your Name</label>
              <input
                type="text"
                value={reviewName}
                onChange={(e) => setReviewName(e.target.value)}
                style={{ width: '100%', padding: '0.55rem', border: '1px solid var(--line)', borderRadius: '5px', fontSize: '0.9rem' }}
              />
            </div>

            <div style={{ marginBottom: '0.8rem' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.3rem' }}>Your Rating</label>
              <div style={{ display: 'flex', gap: '0.3rem' }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setReviewRating(star)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.4rem', color: star <= reviewRating ? '#e8a33d' : '#ddd', padding: 0 }}
                    aria-label={`${star} stars`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '0.8rem' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.3rem' }}>Your Review</label>
              <textarea
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                rows={3}
                placeholder="How was the fit, quality, and delivery?"
                style={{ width: '100%', padding: '0.55rem', border: '1px solid var(--line)', borderRadius: '5px', fontSize: '0.9rem', fontFamily: 'inherit', resize: 'vertical' }}
              />
            </div>

            {submitError && <p style={{ color: 'var(--cherry)', fontSize: '0.8rem', marginBottom: '0.6rem' }}>{submitError}</p>}

            <button
              type="submit"
              disabled={submitting}
              style={{
                padding: '0.6rem 1.2rem',
                backgroundColor: 'var(--ink)',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                cursor: submitting ? 'not-allowed' : 'pointer',
                fontSize: '0.85rem',
                fontWeight: 600,
                opacity: submitting ? 0.6 : 1
              }}
            >
              {submitting ? 'Submitting...' : 'Submit Review'}
            </button>
          </form>
        )}

        {loadingReviews ? (
          <p style={{ fontSize: '0.85rem', color: '#666' }}>Loading reviews...</p>
        ) : reviews.length === 0 ? (
          <p style={{ fontSize: '0.85rem', color: '#666' }}>No reviews yet — be the first to share your experience.</p>
        ) : (
          reviews.map((review) => (
            <div key={review.id} style={{
              marginBottom: '1rem',
              padding: '1rem',
              borderRadius: '10px',
              backgroundColor: 'var(--paper)',
              border: '1px solid var(--line)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--ink)',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  fontWeight: 700
                }}>
                  {review.reviewer_name.charAt(0).toUpperCase()}
                </div>
                <span style={{ fontWeight: 600, fontSize: '0.88rem' }}>{review.reviewer_name}</span>
                <span style={{ color: '#e8a33d', fontSize: '0.8rem', marginLeft: 'auto' }}>{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</span>
              </div>
              <p style={{ fontSize: '0.85rem', color: '#555', lineHeight: 1.5 }}>{review.comment}</p>
            </div>
          ))
        )}
      </div>

      {relatedCases.length > 0 && (
        <div style={{ marginTop: '3rem', marginBottom: '2rem' }}>
          <h3 style={{ marginBottom: '1.2rem' }}>More cases for {item.model}</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '1rem' }}>
            {relatedCases.map((related) => (
              <Link
                key={related.id}
                to={`/phone-case/${related.id}`}
                className="hover-card"
                style={{
                  display: 'block',
                  border: '1px solid var(--line)',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  textDecoration: 'none',
                  color: 'var(--ink)',
                  backgroundColor: 'var(--paper-alt)'
                }}
              >
                <div style={{ aspectRatio: '1 / 1', backgroundColor: 'var(--paper)' }}>
                  <img
                    src={typeImages[related.type]}
                    alt={related.type}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </div>
                <div style={{ padding: '0.7rem' }}>
                  <p style={{ fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.2rem' }}>{related.title}</p>
                  <p className="price-tag" style={{ fontSize: '0.85rem' }}>₹{related.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default PhoneCaseDetail