import { useState } from 'react'

function FloatingHelp() {
  const [open, setOpen] = useState(false)

  const openWhatsapp = () => {
    const message = 'Hi Cartio, I need help with something.'
    window.open('https://wa.me/919344240815?text=' + encodeURIComponent(message), '_blank')
    setOpen(false)
  }

  return (
    <div style={{ position: 'fixed', bottom: '16px', right: '16px', zIndex: 200 }}>
      {open && (
        <div style={{
          position: 'absolute',
          bottom: '60px',
          right: '0',
          backgroundColor: 'var(--paper-alt)',
          border: '2px solid var(--ink)',
          borderRadius: '10px',
          padding: '1rem',
          width: 'min(220px, 78vw)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
        }}>
          <p style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.4rem' }}>Need help?</p>
          <p style={{ fontSize: '0.8rem', color: '#666', marginBottom: '0.8rem' }}>
            Message us directly on WhatsApp and we'll get back to you soon.
          </p>
          <button
            onClick={openWhatsapp}
            style={{
              width: '100%',
              padding: '0.6rem',
              backgroundColor: '#25D366',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '0.85rem',
              fontWeight: 600
            }}
          >
            Chat on WhatsApp
          </button>
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          backgroundColor: '#25D366',
          border: '3px solid var(--paper-alt)',
          boxShadow: '0 4px 14px rgba(0,0,0,0.25)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        aria-label="Help"
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="#fff">
          <path d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.38 5.07L2 22l5.11-1.34C8.55 21.5 10.24 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm5.05 14.13c-.21.6-1.24 1.15-1.71 1.19-.44.04-.87.21-2.92-.61-2.48-1-4.05-3.55-4.17-3.71-.12-.16-.99-1.32-.99-2.52 0-1.2.63-1.79.85-2.03.22-.24.48-.3.64-.3.16 0 .32 0 .46.01.15.01.35-.06.55.42.21.5.71 1.73.77 1.86.06.13.1.28.02.45-.08.16-.13.27-.25.41-.13.15-.27.33-.38.44-.13.13-.26.27-.11.53.15.26.66 1.09 1.42 1.77.98.87 1.8 1.14 2.06 1.27.26.13.41.11.56-.06.16-.18.65-.75.82-1.01.18-.26.35-.21.59-.13.24.09 1.5.71 1.76.84.26.13.43.19.5.3.06.11.06.63-.15 1.23z" />
        </svg>
      </button>
    </div>
  )
}

export default FloatingHelp