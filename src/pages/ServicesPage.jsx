import Services from '../components/Services'
import '../styles/PageExtras.css'

const process = [
  {
    step: '01',
    title: 'Discover',
    desc: 'We map your current tools, data sources, and the specific decisions you need to make faster.',
  },
  {
    step: '02',
    title: 'Design',
    desc: 'Architecture, data model, and integration plan scoped to your stack and delivery timeline.',
  },
  {
    step: '03',
    title: 'Build',
    desc: 'Iterative sprints with weekly demos, production-ready code, and full documentation from day one.',
  },
  {
    step: '04',
    title: 'Deploy',
    desc: 'Go-live support, analyst training, and a dedicated success lead for the first ninety days.',
  },
]

function ServicesPage() {
  return (
    <div className="standalone-page">
      <Services backgroundVideo="/services.mp4" />

      <section className="section">
        <div className="container">
          <div className="section-header fade-in">
            <span className="section-tag">How We Work</span>
            <h2>Our <span className="accent">Process</span></h2>
            <div className="section-line"></div>
          </div>
          <div className="pe-process">
            {process.map((p, i) => (
              <div
                className="pe-process-step fade-in"
                key={p.step}
                style={{ transitionDelay: `${i * 0.08}s` }}
              >
                <div className="pe-process-num">{p.step}</div>
                <h4>{p.title}</h4>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default ServicesPage
