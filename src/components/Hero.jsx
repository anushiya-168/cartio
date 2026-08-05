function Hero() {
  return (
    <div style={{
      backgroundColor: 'var(--ink)',
      color: '#fff',
      padding: '3.5rem 2rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute',
        top: '-40px',
        right: '-40px',
        width: '180px',
        height: '180px',
        borderRadius: '50%',
        border: '3px dashed var(--marigold)',
        opacity: 0.4
      }} />

      <p className="price-tag" style={{
        color: 'var(--marigold)',
        fontSize: '0.8rem',
        marginBottom: '0.6rem',
        letterSpacing: '0.05em'
      }}>
        NEW STOCK · TAGGED & READY
      </p>

      <h1 style={{
        fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
        marginBottom: '0.6rem',
        maxWidth: '600px',
        lineHeight: 1.15
      }}>
        Everyday essentials,<br />priced to grab.
      </h1>

      <p style={{
        fontSize: '1rem',
        color: '#c9d2db',
        maxWidth: '460px',
        marginBottom: '1.5rem'
      }}>
        Browse fashion, gear, and phone cases — all in one cart, all delivered fast.
      </p>

      <a href="#product-grid" style={{
        display: 'inline-block',
        backgroundColor: 'var(--marigold)',
        color: 'var(--ink)',
        padding: '0.7rem 1.6rem',
        borderRadius: '4px',
        textDecoration: 'none',
        fontWeight: 600,
        fontSize: '0.9rem',
        transition: 'transform 0.15s ease'
      }}
      onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
      onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
      >
        Shop Now →
      </a>
    </div>
  )
}

export default Hero