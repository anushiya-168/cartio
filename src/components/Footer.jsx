function Footer() {
  return (
    <footer style={{
      backgroundColor: 'var(--ink)',
      color: '#c9d2db',
      padding: '2rem',
      marginTop: '3rem',
      textAlign: 'center',
      borderTop: '3px solid var(--marigold)'
    }}>
      <p style={{ fontFamily: 'var(--font-display)', color: '#fff', fontSize: '1.1rem', marginBottom: '0.5rem' }}>
        Cartio
      </p>
      <p className="price-tag" style={{ fontSize: '0.75rem' }}>
        MADE WITH REACT · {new Date().getFullYear()}
      </p>
    </footer>
  )
}

export default Footer