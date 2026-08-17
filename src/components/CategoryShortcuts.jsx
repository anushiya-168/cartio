function CategoryShortcuts({ onSelect, selectedType }) {
  const categories = [
    { type: 'Silicone', label: 'Silicone', color: '#0077b6' },
    { type: 'Leather', label: 'Leather', color: '#6f4e37' },
    { type: 'Clear', label: 'Clear', color: '#8a95a5' },
    { type: 'Shockproof', label: 'Shockproof', color: '#c1443c' }
  ]

  return (
    <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
      {categories.map((cat) => (
        <button
          key={cat.type}
          onClick={() => onSelect(selectedType === cat.type ? 'all' : cat.type)}
          style={{
            padding: '0.55rem 1.1rem',
            borderRadius: '24px',
            border: selectedType === cat.type ? '2px solid var(--ink)' : '1px solid var(--line)',
            backgroundColor: selectedType === cat.type ? 'var(--ink)' : 'var(--paper-alt)',
            color: selectedType === cat.type ? '#fff' : 'var(--ink)',
            cursor: 'pointer',
            fontSize: '0.82rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            transition: 'all 0.15s ease',
            boxShadow: selectedType === cat.type ? '0 3px 10px rgba(27,36,48,0.2)' : 'none'
          }}
        >
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: cat.color, display: 'inline-block' }} />
          {cat.label}
        </button>
      ))}
    </div>
  )
}

export default CategoryShortcuts