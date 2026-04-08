import { useState, useEffect } from 'react'
import '../styles/Preloader.css'

function Preloader() {
  const [hidden, setHidden] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { clearInterval(interval); return 100 }
        return p + Math.random() * 15 + 5
      })
    }, 150)
    const timer = setTimeout(() => setHidden(true), 2200)
    return () => { clearInterval(interval); clearTimeout(timer) }
  }, [])

  return (
    <div id="preloader" className={hidden ? 'hidden' : ''}>
      <div className="loader">
        <div className="loader-radar">
          <div className="radar-circle"></div>
          <div className="radar-circle r2"></div>
          <div className="radar-circle r3"></div>
          <div className="radar-sweep"></div>
          <div className="radar-dot"></div>
        </div>
        <div className="loader-text">
          <span className="loader-logo">PSI<span>TECH</span></span>
          <span className="loader-tagline">DEFENSE & MARITIME TECHNOLOGY</span>
        </div>
        <div className="loader-status">
          <span className="status-line">&gt; INITIALIZING DEFENSE SYSTEMS...</span>
          <span className="status-line delay-1">&gt; ESTABLISHING SECURE CONNECTION</span>
          <span className="status-line delay-2">&gt; SYSTEM READY</span>
        </div>
        <div className="loader-bar">
          <div className="loader-fill" style={{ width: `${Math.min(progress, 100)}%` }}></div>
        </div>
        <div className="loader-percent">{Math.min(Math.round(progress), 100)}%</div>
      </div>
    </div>
  )
}

export default Preloader
