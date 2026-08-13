function TrustBar() {
  const items = [
    { icon: '🚚', label: 'Fast Delivery', sub: '4-6 days across India' },
    { icon: '💰', label: 'COD Available', sub: 'Pay when it arrives' },
    { icon: '🔒', label: 'Secure UPI', sub: 'Scan & pay safely' },
    { icon: '↩️', label: 'Easy Support', sub: 'WhatsApp us anytime' }
  ]

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
      gap: '1rem',
      padding: '1.2rem 2rem',
      backgroundColor: 'var(--paper-alt)',
      borderBottom: '1px solid var(--line)'
    }}>
      {items.map((item) => (
        <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <span style={{ fontSize: '1.3rem' }}>{item.icon}</span>
          <div>
            <p style={{ fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.1rem' }}>{item.label}</p>
            <p style={{ fontSize: '0.7rem', color: '#666' }}>{item.sub}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default TrustBar