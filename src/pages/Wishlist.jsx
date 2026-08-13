import { Link } from 'react-router-dom'
import { phoneCases, typeImages } from '../services/phoneCaseData'
import { useWishlist } from '../context/WishlistContext'
import PhoneCaseCard from '../components/PhoneCaseCard'

function Wishlist() {
  const { wishlist } = useWishlist()
  const wishlistedItems = phoneCases.filter((item) => wishlist.includes(item.id))

  return (
    <div style={{ padding: '2.5rem 2rem', maxWidth: '1000px', margin: '0 auto' }}>
      <p className="price-tag" style={{ color: 'var(--cherry)', fontSize: '0.75rem', marginBottom: '0.3rem' }}>
        SAVED FOR LATER
      </p>
      <h2 style={{ marginBottom: '1.5rem' }}>Your Wishlist</h2>

      {wishlistedItems.length === 0 ? (
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <p style={{ marginBottom: '1rem', color: '#666' }}>Nothing saved yet — tap the heart on any case to add it here.</p>
          <Link to="/" style={{ color: 'var(--ink)', fontWeight: 600 }}>← Browse Cases</Link>
        </div>
      ) : (
        <div className="product-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '1.5rem'
        }}>
          {wishlistedItems.map((item) => (
            <PhoneCaseCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Wishlist