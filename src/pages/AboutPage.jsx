import About from '../components/About'
import '../styles/PageExtras.css'

const team = [
  {
    initials: 'AV',
    name: 'Ananya Verma',
    role: 'Founder & CEO',
    bio: 'Former geospatial analyst with 15 years leading satellite intelligence programs across five continents.',
  },
  {
    initials: 'RK',
    name: 'Rohan Kapoor',
    role: 'Chief Technology Officer',
    bio: 'Distributed-systems architect; previously shipped large-scale data platforms at two public cloud providers.',
  },
  {
    initials: 'SM',
    name: 'Sara Menon',
    role: 'Head of Intelligence',
    bio: 'Ex-OSINT lead for a global risk-advisory firm, specialising in supply-chain and geopolitical analysis.',
  },
  {
    initials: 'DN',
    name: 'Dev Narayanan',
    role: 'VP of Engineering',
    bio: 'Builds the pipelines that keep our ingestion and analytics infrastructure running 24/7 at petabyte scale.',
  },
]

function AboutPage() {
  return (
    <div className="standalone-page">
      <About />

      <section className="section">
        <div className="container">
          <div className="section-header fade-in">
            <span className="section-tag">Leadership</span>
            <h2>Meet The <span className="accent">Team</span></h2>
            <div className="section-line"></div>
          </div>
          <div className="pe-team-grid">
            {team.map((m, i) => (
              <div
                className="pe-team-card fade-in"
                key={m.name}
                style={{ transitionDelay: `${i * 0.08}s` }}
              >
                <div className="pe-team-avatar">{m.initials}</div>
                <div className="pe-team-name">{m.name}</div>
                <div className="pe-team-role">{m.role}</div>
                <p className="pe-team-bio">{m.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage
