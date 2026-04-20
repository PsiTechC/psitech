import Contact from '../components/Contact'
import '../styles/PageExtras.css'

const faqs = [
  {
    q: 'How long does a typical pilot take?',
    a: 'Most pilots run four to six weeks from kickoff to a working demo in your environment. We scope the first milestone within the first five working days.',
  },
  {
    q: 'Do you integrate with our existing data lake and tooling?',
    a: 'Yes. We deliver via standard REST and GraphQL APIs, tile-streaming endpoints for geospatial data, and pre-built connectors for S3, BigQuery, Snowflake, and Databricks.',
  },
  {
    q: 'Which satellite providers do you support?',
    a: 'Our GEOINT platform unifies Maxar, Planet, Sentinel-2, Airbus Pleiades, and Capella SAR out of the box. Additional providers can be added on request.',
  },
  {
    q: 'How is pricing structured?',
    a: 'We offer fixed-scope pilots, monthly platform subscriptions, and usage-based tiers for high-volume ingestion. Pricing is tailored to scope during the initial scoping call.',
  },
  {
    q: 'Can we run the platform in our own cloud tenant?',
    a: 'Yes. Single-tenant deployments on AWS, GCP, and Azure are supported for customers with data residency or sovereignty requirements.',
  },
  {
    q: 'What kind of support do you offer after launch?',
    a: 'Every customer gets a dedicated success lead for the first ninety days, and our 24/7 on-call team handles incident response on an SLA you define.',
  },
]

function ContactPage() {
  return (
    <div className="standalone-page">
      <Contact />

      <section className="section">
        <div className="container">
          <div className="section-header fade-in">
            <span className="section-tag">Common Questions</span>
            <h2>Frequently Asked <span className="accent">Questions</span></h2>
            <div className="section-line"></div>
          </div>
          <div className="pe-faq">
            {faqs.map((f) => (
              <details className="pe-faq-item fade-in" key={f.q}>
                <summary className="pe-faq-summary">
                  {f.q}
                  <svg className="pe-faq-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </summary>
                <div className="pe-faq-body">{f.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default ContactPage
