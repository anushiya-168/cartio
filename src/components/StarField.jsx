function StarField() {
  const stars = Array.from({ length: 50 }).map((_, i) => {
    const isBright = Math.random() > 0.7
    return {
      id: i,
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: isBright ? Math.random() * 10 + 14 : Math.random() * 6 + 6,
      delay: Math.random() * 6,
      duration: Math.random() * 3 + 2.5,
      bright: isBright
    }
  })

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
      <div style={{
        position: 'absolute',
        top: '-20%',
        left: '10%',
        width: '60%',
        height: '80%',
        background: 'radial-gradient(circle, rgba(157,78,221,0.18) 0%, transparent 65%)',
        filter: 'blur(20px)'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-30%',
        right: '5%',
        width: '55%',
        height: '75%',
        background: 'radial-gradient(circle, rgba(232,163,61,0.14) 0%, transparent 65%)',
        filter: 'blur(20px)'
      }} />

      {stars.map((star) => (
        <span
          key={star.id}
          style={{
            position: 'absolute',
            top: `${star.top}%`,
            left: `${star.left}%`,
            fontSize: `${star.size}px`,
            lineHeight: 1,
            color: '#fff',
            textShadow: star.bright
              ? '0 0 8px rgba(255,255,255,0.95), 0 0 16px rgba(232,163,61,0.6)'
              : '0 0 4px rgba(255,255,255,0.6)',
            animation: `twinkle ${star.duration}s ease-in-out ${star.delay}s infinite`
          }}
        >
          ✦
        </span>
      ))}
    </div>
  )
}

export default StarField