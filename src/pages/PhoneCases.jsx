import { useState, useEffect } from 'react'
import { phoneModels, phoneCases } from '../services/phoneCaseData'
import PhoneCaseCard from '../components/PhoneCaseCard'
import TrustBar from '../components/TrustBar'
import CategoryShortcuts from '../components/CategoryShortcuts'
import { getProductImageMap } from '../services/productImages'
import StarField from '../components/StarField'

function PhoneCases() {
  const [selectedModel, setSelectedModel] = useState('all')
  const [selectedType, setSelectedType] = useState('all')
  const [customImages, setCustomImages] = useState({})

  useEffect(() => {
    getProductImageMap().then(setCustomImages)
  }, [])

  const caseTypes = ['Silicone', 'Leather', 'Clear', 'Shockproof']

  const filteredCases = phoneCases
    .filter((c) => selectedModel === 'all' || c.model === selectedModel)
    .filter((c) => selectedType === 'all' || c.type === selectedType)

  const featuredCases = phoneCases.slice(0, 4)

  return (
    <div>
      <div className="hero-inner animated-hero-bg" style={{
        color: '#fff',
        padding: '3.5rem 2rem',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: '2rem',
        flexWrap: 'wrap'
      }}>
        <StarField />

        <div style={{
          position: 'absolute',
          top: '-60px',
          right: '-70px',
          width: '180px',
          height: '180px',
          borderRadius: '50%',
          border: '3px dashed var(--marigold)',
          opacity: 0.35
        }} />

        <div style={{ flex: '1 1 320px', maxWidth: '520px', position: 'relative', zIndex: 1 }}>
          <p className="price-tag" style={{ color: 'var(--marigold)', fontSize: '0.8rem', marginBottom: '0.6rem' }}>
            PHONE CASES · TAGGED & READY
          </p>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', marginBottom: '0.6rem', lineHeight: 1.15 }}>
            Protect your phone,<br />in style.
          </h1>
          <p style={{ fontSize: '1rem', color: '#c9d2db', marginBottom: '1.5rem', maxWidth: '460px' }}>
            Silicone, leather, clear, and shockproof cases for 12+ phone models.
          </p>

          <a href="#product-grid" style={{
            display: 'inline-block',
            backgroundColor: 'var(--marigold)',
            color: 'var(--ink)',
            padding: '0.7rem 1.6rem',
            borderRadius: '4px',
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: '0.9rem'
          }}>
            Shop Now →
          </a>
        </div>

        <div className="hero-image-col" style={{
          flex: '0 1 240px',
          maxWidth: '240px',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.8rem',
          position: 'relative',
          zIndex: 1
        }}>
          <div style={{
            backgroundColor: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: '12px',
            padding: '1rem 1.2rem',
            transform: 'rotate(-2deg)'
          }}>
            <p className="price-tag" style={{ fontSize: '1.4rem', color: 'var(--marigold)' }}>35+</p>
            <p style={{ fontSize: '0.75rem', color: '#c9d2db' }}>Designs across every case type</p>
          </div>

          <div style={{
            backgroundColor: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: '12px',
            padding: '1rem 1.2rem',
            transform: 'rotate(2deg)',
            marginLeft: '1rem'
          }}>
            <p className="price-tag" style={{ fontSize: '1.4rem', color: 'var(--marigold)' }}>4-6 days</p>
            <p style={{ fontSize: '0.75rem', color: '#c9d2db' }}>Fast delivery across India</p>
          </div>
        </div>
      </div>

      <TrustBar />

      <div style={{ padding: '2.5rem 2rem 0' }}>
        <h2 style={{ marginBottom: '1.2rem', fontSize: '1.4rem' }}>Featured Picks</h2>
        <div className="product-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '1.5rem',
          marginBottom: '3rem'
        }}>
          {featuredCases.map((item) => (
            <PhoneCaseCard key={item.id} item={item} customImage={customImages[item.id]} />
          ))}
        </div>
      </div>

      <div id="product-grid" style={{ padding: '0 2rem 2.5rem' }}>
        <h2 style={{ marginBottom: '0.3rem', fontSize: '1.6rem' }}>All Cases</h2>
        <p className="price-tag" style={{ fontSize: '0.75rem', color: 'var(--cherry)', marginBottom: '1.5rem' }}>
          {filteredCases.length} DESIGNS IN STOCK
        </p>

        <CategoryShortcuts onSelect={setSelectedType} selectedType={selectedType} />

        <div className="filters-bar" style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '2rem',
          padding: '1.1rem 1.3rem',
          backgroundColor: 'var(--paper-alt)',
          border: '2px solid var(--ink)',
          borderRadius: '12px',
          boxShadow: '0 4px 14px rgba(27, 36, 48, 0.08)'
        }}>
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            style={{ padding: '0.6rem', border: '1px solid #ccc', borderRadius: '4px' }}
          >
            <option value="all">All Phone Models</option>
            {phoneModels.map((model) => (
              <option key={model} value={model}>{model}</option>
            ))}
          </select>

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            style={{ padding: '0.6rem', border: '1px solid #ccc', borderRadius: '4px' }}
          >
            <option value="all">All Case Types</option>
            {caseTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {filteredCases.length === 0 ? (
          <p>No cases match your selection.</p>
        ) : (
          <div className="product-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '1.5rem'
          }}>
            {filteredCases.map((item) => (
              <PhoneCaseCard key={item.id} item={item} customImage={customImages[item.id]} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default PhoneCases