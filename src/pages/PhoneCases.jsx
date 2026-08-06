import { useState } from 'react'
import { phoneModels, phoneCases } from '../services/phoneCaseData'
import PhoneCaseCard from '../components/PhoneCaseCard'

function PhoneCases() {
  const [selectedModel, setSelectedModel] = useState('all')
  const [selectedType, setSelectedType] = useState('all')

  const caseTypes = ['Silicone', 'Leather', 'Clear', 'Shockproof']

  const filteredCases = phoneCases
    .filter((c) => selectedModel === 'all' || c.model === selectedModel)
    .filter((c) => selectedType === 'all' || c.type === selectedType)

  return (
    <div>
      <div style={{
        backgroundColor: 'var(--ink)',
        color: '#fff',
        padding: '2.2rem 2rem',
        borderBottom: '3px solid var(--marigold)'
      }}>
        <p className="price-tag" style={{ color: 'var(--marigold)', fontSize: '0.75rem', marginBottom: '0.4rem' }}>
          ACCESSORIES
        </p>
        <h2 style={{ fontSize: '1.8rem' }}>Phone Cases</h2>
        <p style={{ color: '#c9d2db', marginTop: '0.4rem' }}>
          Find the perfect case for your phone model
        </p>
      </div>

      <div style={{ padding: '2rem' }}>
        <div className="filters-bar" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
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
              <PhoneCaseCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default PhoneCases