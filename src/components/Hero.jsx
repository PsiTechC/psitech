import { useEffect, useRef, useState, useCallback } from 'react'
import '../styles/Hero.css'

const stats = [
  { target: 150, suffix: '+', label: 'Systems Deployed', icon: '⚡' },
  { target: 12, suffix: '+', label: 'Years of Excellence', icon: '🏆' },
  { target: 50, suffix: '+', label: 'Defense Projects', icon: '🛡️' },
  { target: 99, suffix: '%', label: 'Uptime Guaranteed', icon: '📡' },
]

const heroSlides = [
  {
    video: '/homepage1.mp4',
    badge: 'DEFENSE • MARITIME • TECHNOLOGY',
    heading: "Securing India's",
    accent: 'Frontiers',
    sub: 'with Advanced Technology',
    desc: 'Pioneering IoT, Ocean Intelligence & Defense Solutions that protect India\'s maritime borders and empower ground forces with next-gen technology.',
  },
  {
    video: '/homepage3.mp4',
    badge: 'NAVAL • SYSTEMS • INTELLIGENCE',
    heading: 'Dominating the',
    accent: 'Seas',
    sub: 'with Smart Naval IoT',
    desc: 'Real-time fleet monitoring, underwater communication, and AI-powered ocean intelligence for India\'s maritime superiority.',
  },
]

function Hero() {
  const statsRef = useRef(null)
  const videoRef = useRef(null)
  const [slideIndex, setSlideIndex] = useState(0)
  const [transitioning, setTransitioning] = useState(false)
  const [textVisible, setTextVisible] = useState(true)

  const slide = heroSlides[slideIndex]

  // Switch to next slide
  const goToNext = useCallback(() => {
    if (transitioning) return
    setTextVisible(false)
    setTimeout(() => {
      setTransitioning(true)
      setTimeout(() => {
        setSlideIndex((prev) => (prev + 1) % heroSlides.length)
        setTransitioning(false)
        setTextVisible(true)
      }, 600)
    }, 200)
  }, [transitioning])

  // Play video for current slide and auto-advance when it ends
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.src = slide.video
    video.load()
    video.playbackRate = 1.25
    video.play().catch(() => {})

    const handleEnded = () => goToNext()
    video.addEventListener('ended', handleEnded)
    return () => video.removeEventListener('ended', handleEnded)
  }, [slideIndex, slide.video, goToNext])

  // Counter animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.stat-number').forEach((counter) => {
              const target = parseInt(counter.dataset.target)
              const start = performance.now()
              const duration = 2500
              const animate = (now) => {
                const progress = Math.min((now - start) / duration, 1)
                const eased = 1 - Math.pow(1 - progress, 4)
                counter.textContent = Math.floor(target * eased)
                if (progress < 1) requestAnimationFrame(animate)
              }
              requestAnimationFrame(animate)
            })
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.3 }
    )
    if (statsRef.current) observer.observe(statsRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="home" className="hero">
      {/* Video Background */}
      <div className="hero-video-wrap">
        <video
          ref={videoRef}
          className="hero-video"
          autoPlay
          muted
          playsInline
        />
        <div className="hero-video-overlay"></div>
      </div>

      {/* Animated Background (on top of video) */}
      <div className="hero-bg-animated">
        <div className="hero-gradient-mesh"></div>
        <div className="hero-orb orb-1"></div>
        <div className="hero-orb orb-2"></div>
        <div className="hero-orb orb-3"></div>
        <div className="hero-grid"></div>

        {/* Floating particles */}
        <div className="hero-particles">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="hero-particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${2 + Math.random() * 4}px`,
                height: `${2 + Math.random() * 4}px`,
                animationDelay: `${Math.random() * 6}s`,
                animationDuration: `${4 + Math.random() * 6}s`,
              }}
            />
          ))}
        </div>

        {/* 3D Rotating rings */}
        <div className="hero-3d-rings">
          <div className="hero-ring ring-1"></div>
          <div className="hero-ring ring-2"></div>
          <div className="hero-ring ring-3"></div>
        </div>

        <div className="hero-scanline"></div>
      </div>

      <div className="container hero-content">
        <div className="hero-main">
          <div className={`hero-left ${textVisible ? 'text-visible' : 'text-hidden'}`}>
            <div className="hero-badge">
              <span className="hb-dot"></span>
              <span className="hb-line"></span>
              {slide.badge}
            </div>
            <h1>
              {slide.heading}{' '}
              <span className="hero-gradient-text">{slide.accent}</span>
              <br />
              <span className="hero-sub-heading">{slide.sub}</span>
            </h1>
            <p className="hero-sub">{slide.desc}</p>
            <div className="hero-btns">
              <a href="#products" className="btn btn-primary">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                Explore Solutions
              </a>
              <a href="#contact" className="btn btn-outline">Get In Touch</a>
            </div>
            <div className="hero-trust">
              <span className="trust-label">CLASSIFIED CLEARANCE</span>
              <div className="trust-badges">
                <span className="trust-badge">ISO 9001</span>
                <span className="trust-badge">MIL-STD-810G</span>
                <span className="trust-badge">MAKE IN INDIA</span>
              </div>
            </div>
          </div>
        </div>

        {/* Slide indicators */}
        <div className="hero-slide-nav">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              className={`hero-slide-dot ${i === slideIndex ? 'active' : ''}`}
              onClick={() => {
                if (i !== slideIndex && !transitioning) {
                  setTextVisible(false)
                  setTransitioning(true)
                  setTimeout(() => {
                    setSlideIndex(i)
                    setTransitioning(false)
                    setTextVisible(true)
                  }, 600)
                }
              }}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

        <div className="hero-stats" ref={statsRef}>
          {stats.map((stat) => (
            <div className="stat-card" key={stat.label}>
              <div className="stat-card-inner">
                <span className="stat-icon">{stat.icon}</span>
                <div className="stat-data">
                  <span className="stat-number" data-target={stat.target}>0</span>
                  <span className="stat-suffix">{stat.suffix}</span>
                </div>
                <span className="stat-label">{stat.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="hero-scroll">
        <div className="scroll-mouse">
          <div className="scroll-wheel"></div>
        </div>
        <span>Scroll to explore</span>
      </div>
    </section>
  )
}

export default Hero
