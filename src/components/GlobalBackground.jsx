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
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="global-particle"
            style={{
              left: `${(i * 11) % 100}%`,
              top: `${(i * 23) % 100}%`,
              width: `${2 + (i % 3)}px`,
              height: `${2 + (i % 3)}px`,
              animationDelay: `${(i * 1.3) % 8}s`,
              animationDuration: `${7 + (i % 5)}s`,
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default GlobalBackground
