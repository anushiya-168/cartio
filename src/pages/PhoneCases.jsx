import { useState } from 'react'
import { phoneModels, phoneCases, typeImages } from '../services/phoneCaseData'
import PhoneCaseCard from '../components/PhoneCaseCard'
import { useCart } from '../context/CartContext'

function PhoneCases() {
  const [selectedModel, setSelectedModel] = useState('all')
  const [selectedType, setSelectedType] = useState('all')
  const { addToCart } = useCart()

  const caseTypes = ['Silicone', 'Leather', 'Clear', 'Shockproof']

  const filteredCases = phoneCases
    .filter((c) => selectedModel === 'all' || c.model === selectedModel)
    .filter((c) => selectedType === 'all' || c.type === selectedType)

  const handleAdd = (item, color) => {
    addToCart({
      id: `${item.id}-${color}`,
      title: `${item.title} (${item.model})`,
      price: item.price,
      image: typeImages[item.type]
    })
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ marginBottom: '0.5rem' }}>Phone Cases</h2>
      <p style={{ color: '#666', marginBottom: '1.5rem' }}>
        Find the perfect case for your phone model
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
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
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '1.5rem'
        }}>
          {filteredCases.map((item) => (
            <PhoneCaseCard key={item.id} item={item} onAddToCart={handleAdd} />
          ))}
        </div>
      )}
    </div>
  )
}

export default PhoneCases