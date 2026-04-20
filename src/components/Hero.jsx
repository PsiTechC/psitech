import { useEffect, useRef, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import '../styles/Hero.css'

const VIDEO_PLAYBACK_RATE = 0.7

const stats = [
  { target: 150, suffix: '+', label: 'Systems Deployed', icon: 'SYS' },
  { target: 12, suffix: '+', label: 'Years of Excellence', icon: 'YRS' },
  { target: 50, suffix: '+', label: 'Defense Projects', icon: 'PRJ' },
  { target: 99, suffix: '%', label: 'Uptime Guaranteed', icon: 'UP' },
]

const heroSlides = [
  {
    video: '/home.mp4',
    badge: 'GEOINT | SATELLITE | ANALYTICS',
    heading: 'Monitoring Every',
    accent: 'Change',
    sub: 'with Geospatial Precision',
    desc: 'Tasking, ingesting, and analyzing multi-source satellite imagery to deliver decision-ready intelligence in near real-time.',
  },
  {
    video: '/home2.mp4',
    badge: 'OSINT | RISK | AWARENESS',
    heading: 'Connecting Global',
    accent: 'Signals',
    sub: 'for Faster Decisions',
    desc: 'From open-source feeds to contextual alerts, we transform weak signals into trusted insights for mission-critical teams.',
  },
  {
    video: '/home3.mp4',
    badge: 'AI | DRONE | DEFENCE',
    heading: 'Powering the',
    accent: 'Frontline',
    sub: 'with Autonomous Intelligence',
    desc: 'AI-driven drone platforms, sensor fusion, and autonomous operations delivering persistent surveillance from sky to ground.',
  },
  {
    video: '/home4.mp4',
    badge: 'IOT | EDGE | CONNECTIVITY',
    heading: 'Securing the',
    accent: 'Network',
    sub: 'with Edge-to-Cloud IoT',
    desc: 'Ruggedised sensors, mesh gateways, and cloud analytics creating end-to-end situational awareness across every asset.',
  },
]

function Hero() {
  const statsRef = useRef(null)
  const videoRef = useRef(null)
  const [slideIndex, setSlideIndex] = useState(0)
  const [transitioning, setTransitioning] = useState(false)
  const [textVisible, setTextVisible] = useState(true)
  const [videoReady, setVideoReady] = useState(false)

  const slide = heroSlides[slideIndex]

  const goToNext = useCallback(() => {
    if (transitioning) return
    setTextVisible(false)
    setTimeout(() => {
      setTransitioning(true)
      setTimeout(() => {
        setSlideIndex((prev) => (prev + 1) % heroSlides.length)
        setTransitioning(false)
        setTextVisible(true)
      }, 500)
    }, 220)
  }, [transitioning])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    setVideoReady(false)

    const handleLoadedData = () => {
      video.playbackRate = VIDEO_PLAYBACK_RATE
      const playPromise = video.play()
      if (playPromise && typeof playPromise.then === 'function') {
        playPromise
          .then(() => setVideoReady(true))
          .catch(() => setVideoReady(true))
      } else {
        setVideoReady(true)
      }
    }

    const handleEnded = () => goToNext()

    video.src = slide.video
    video.currentTime = 0
    video.load()

    video.addEventListener('loadeddata', handleLoadedData)
    video.addEventListener('ended', handleEnded)

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData)
      video.removeEventListener('ended', handleEnded)
    }
  }, [slideIndex, slide.video, goToNext])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.stat-number').forEach((counter) => {
              const target = parseInt(counter.dataset.target, 10)
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
      <div className="hero-video-wrap">
        <video
          ref={videoRef}
          className={`hero-video ${videoReady ? 'is-ready' : ''}`}
          autoPlay
          muted
          playsInline
          preload="auto"
        />
        <div className="hero-video-overlay"></div>
      </div>

      <div className="hero-bg-animated">
        <div className="hero-gradient-mesh"></div>
        <div className="hero-orb orb-1"></div>
        <div className="hero-orb orb-2"></div>
        <div className="hero-orb orb-3"></div>
        <div className="hero-grid"></div>

        <div className="hero-particles">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="hero-particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${2 + Math.random() * 3}px`,
                height: `${2 + Math.random() * 3}px`,
                animationDelay: `${Math.random() * 9}s`,
                animationDuration: `${8 + Math.random() * 8}s`,
              }}
            />
          ))}
        </div>

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
              <Link to="/products" className="btn btn-primary">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
                Explore Solutions
              </Link>
              <Link to="/contact" className="btn btn-outline">Get In Touch</Link>
            </div>
          </div>
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
