import { useState } from 'react'
import '../styles/Testimonials.css'

const testimonials = [
  {
    quote: "PsiTech's Naval IoT platform has transformed how we monitor fleet readiness. Real-time data from every vessel has reduced our maintenance downtime by over 60%. A truly indigenous solution we can be proud of.",
    name: 'Vice Admiral R.K. Sharma (Retd.)',
    role: 'Former Flag Officer Commanding, Western Naval Command',
    rating: 5,
  },
  {
    quote: "The Ocean Data Intelligence system provides our operations room with unprecedented situational awareness across the IOR. The AI-driven predictions have proven remarkably accurate during monsoon operations.",
    name: 'Rear Admiral P. Mukherjee (Retd.)',
    role: 'Former Director, Naval Oceanography & Meteorology',
    rating: 5,
  },
  {
    quote: "Deploying PsiTech's tactical sensor networks along the Line of Control has given us a decisive advantage. The system works flawlessly in extreme cold conditions at 18,000 feet altitude.",
    name: 'Lt. General S. Krishnan (Retd.)',
    role: 'Former GOC, Northern Command',
    rating: 5,
  },
  {
    quote: "Their cybersecurity framework has set the gold standard for securing our IoT infrastructure. The zero-trust architecture and indigenous encryption modules meet our stringent compliance requirements.",
    name: 'Dr. A. Venkatesh',
    role: 'Director, DRDO Cyber Research Division',
    rating: 5,
  },
]

function Testimonials() {
  const [active, setActive] = useState(0)

  return (
    <section className="section testimonials">
      <div className="container">
        <div className="section-header fade-in">
          <span className="section-tag">Testimonials</span>
          <h2>Trusted by <span className="accent">Leaders</span></h2>
          <div className="section-line"></div>
        </div>

        <div className="test-wrapper fade-in">
          <div className="test-card">
            <div className="test-quote-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" opacity="0.15">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151C7.563 6.068 6 8.789 6 11h4v10H0z"/>
              </svg>
            </div>
            <p className="test-quote">{testimonials[active].quote}</p>
            <div className="test-stars">
              {[...Array(testimonials[active].rating)].map((_, i) => (
                <span key={i} className="star">&#9733;</span>
              ))}
            </div>
            <div className="test-author">
              <div className="test-avatar">
                {testimonials[active].name.split(' ').slice(0, 2).map(w => w[0]).join('')}
              </div>
              <div>
                <h4>{testimonials[active].name}</h4>
                <p>{testimonials[active].role}</p>
              </div>
            </div>
          </div>

          <div className="test-nav">
            {testimonials.map((_, i) => (
              <button
                key={i}
                className={`test-dot ${i === active ? 'active' : ''}`}
                onClick={() => setActive(i)}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
