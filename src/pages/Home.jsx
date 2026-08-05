import { useState, useEffect } from 'react'
import { getAllProducts, getCategories } from '../services/api'
import ProductCard from '../components/ProductCard'

function Home() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortOrder, setSortOrder] = useState('none')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsData, categoriesData] = await Promise.all([
          getAllProducts(),
          getCategories()
        ])
        setProducts(productsData)
        setCategories(categoriesData)
      } catch (err) {
        setError('Failed to load products. Please try again later.')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const filteredProducts = products
    .filter((p) => p.title.toLowerCase().includes(search.toLowerCase()))
    .filter((p) => selectedCategory === 'all' || p.category === selectedCategory)
    .sort((a, b) => {
      if (sortOrder === 'low-high') return a.price - b.price
      if (sortOrder === 'high-low') return b.price - a.price
      return 0
    })

  if (loading) return <p style={{ textAlign: 'center', marginTop: '2rem' }}>Loading products...</p>
  if (error) return <p style={{ textAlign: 'center', marginTop: '2rem', color: 'red' }}>{error}</p>

  return (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ marginBottom: '0.3rem', fontSize: '1.6rem' }}>Our Products</h2>
      <p className="price-tag" style={{ fontSize: '0.75rem', color: 'var(--cherry)', marginBottom: '1.5rem' }}>
        {filteredProducts.length} ITEMS IN STOCK
      </p>

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '1rem',
        marginBottom: '2rem',
        padding: '1rem',
        backgroundColor: 'var(--paper-alt)',
        border: '2px solid var(--ink)',
        borderRadius: '6px'
      }}>
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: '0.6rem', border: '1px solid var(--line)', borderRadius: '4px', flex: '1 1 200px', fontFamily: 'var(--font-body)' }}
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{ padding: '0.6rem', border: '1px solid var(--line)', borderRadius: '4px', fontFamily: 'var(--font-body)' }}
        >          <option value="all">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          style={{ padding: '0.6rem', border: '1px solid #ccc', borderRadius: '4px' }}
        >
          <option value="none">Sort by</option>
          <option value="low-high">Price: Low to High</option>
          <option value="high-low">Price: High to Low</option>
        </select>
      </div>

      {filteredProducts.length === 0 ? (
        <p>No products match your search.</p>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '1.5rem'
        }}>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Home