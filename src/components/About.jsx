import { useEffect, useRef, useState } from 'react'
import '../styles/About.css'

const highlights = [
  {
    number: 12,
    suffix: '+',
    label: 'Years in Defense',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="26" height="26"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
    ),
    color: 'gold',
  },
  {
    number: 150,
    suffix: '+',
    label: 'Systems Deployed',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="26" height="26"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
    ),
    color: 'blue',
  },
  {
    number: 6,
    suffix: '',
    label: 'Product Lines',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="26" height="26"><path d="M2 16.1A5 5 0 0 1 5.9 20M2 12.05A9 9 0 0 1 9.95 20M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6"/><line x1="2" y1="20" x2="2.01" y2="20"/></svg>
    ),
    color: 'purple',
  },
  {
    number: 100,
    suffix: '%',
    label: 'Indigenous Tech',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="26" height="26"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
    ),
    color: 'green',
  },
]

const timeline = [
  { year: '2011', event: 'Company founded with a vision for indigenous defense tech' },
  { year: '2016', event: 'First Naval IoT contract with Indian Navy' },
  { year: '2018', event: 'Ocean Data Intelligence platform launched' },
  { year: '2020', event: 'DRDO certified partner status achieved' },
  { year: '2022', event: 'Army tactical systems deployed on LoC' },
  { year: '2024', event: 'Coastal Eye-360 surveillance network operational' },
]

function AnimatedCounter({ target, suffix }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const duration = 1800
          const steps = 40
          const increment = target / steps
          let current = 0
          const timer = setInterval(() => {
            current += increment
            if (current >= target) {
              setCount(target)
              clearInterval(timer)
            } else {
              setCount(Math.floor(current))
            }
          }, duration / steps)
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])

  return <span ref={ref}>{count}{suffix}</span>
}

function About({ showJourney = true }) {
  const aboutGridClass = `about-grid ${showJourney ? '' : 'about-grid-no-journey'}`.trim()

  return (
    <section id="about" className="section about">
      <div className="container">
        <div className="section-header fade-in">
          <span className="section-tag">Who We Are</span>
          <h2>About <span className="accent">PsiTech</span></h2>
          <div className="section-line"></div>
        </div>

        {/* Highlight counters */}
        <div className="about-highlights fade-in">
          {highlights.map((h, i) => (
            <div className={`about-highlight ah-${h.color}`} key={i}>
              <div className="ah-icon-ring">
                <div className="ah-icon">{h.icon}</div>
              </div>
              <span className="ah-number">
                <AnimatedCounter target={h.number} suffix={h.suffix} />
              </span>
              <span className="ah-label">{h.label}</span>
              <div className="ah-glow"></div>
            </div>
          ))}
        </div>

        <div className={aboutGridClass}>
          <div className="about-text fade-in-left">
            <div className="about-lead-wrap">
              <div className="about-accent-bar"></div>
              <p className="lead">
                PsiTech is a premier defense and maritime technology company headquartered in India,
                dedicated to building next-generation solutions for national security and ocean intelligence.
              </p>
            </div>
            <p>
              We specialize in developing advanced IoT ecosystems for the Indian Navy, real-time Indian Ocean
              data monitoring platforms, high-speed vessel tracking systems, and ruggedized technology
              solutions for the Indian Army. Every product is engineered for the most demanding environments.
            </p>
            <div className="about-features">
              <div className="about-feature">
                <div className="af-icon-wrap">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                </div>
                <div>
                  <h4>Our Mission</h4>
                  <p>To empower India's defense forces with indigenous, cutting-edge technology ensuring operational superiority across land, sea, and cyberspace.</p>
                </div>
              </div>
              <div className="about-feature">
                <div className="af-icon-wrap green">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                </div>
                <div>
                  <h4>Our Vision</h4>
                  <p>To be India's most trusted defense technology partner, driving innovation in maritime IoT, battlefield intelligence, and cyber defense.</p>
                </div>
              </div>
            </div>
          </div>

          {showJourney && (
            <div className="about-visual fade-in-right">
              <div className="about-timeline">
                <h3 className="timeline-title">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  Our Journey
                </h3>
                <div className="timeline-line"></div>
                {timeline.map((item, i) => (
                  <div className="timeline-item" key={i} style={{ animationDelay: `${i * 0.1}s` }}>
                    <div className="tl-dot">
                      <div className="tl-dot-inner"></div>
                    </div>
                    <div className="tl-content">
                      <span className="tl-year">{item.year}</span>
                      <p>{item.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default About
