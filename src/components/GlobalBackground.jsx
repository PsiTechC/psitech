import '../styles/GlobalBackground.css'

function GlobalBackground() {
  return (
    <div className="global-bg" aria-hidden="true">
      <div className="global-gradient-mesh"></div>
      <div className="global-orb gorb-1"></div>
      <div className="global-orb gorb-2"></div>
      <div className="global-orb gorb-3"></div>
      <div className="global-grid"></div>
      <div className="global-particles">
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="global-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${2 + Math.random() * 3}px`,
              height: `${2 + Math.random() * 3}px`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${5 + Math.random() * 7}s`,
            }}
          />
        ))}
      </div>
      <div className="global-scanline"></div>
    </div>
  )
}

export default GlobalBackground
