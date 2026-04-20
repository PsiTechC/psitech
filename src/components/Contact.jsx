import { useState } from 'react'
import '../styles/Contact.css'

function Contact() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
  }

  return (
    <section id="contact" className="section contact">
      <div className="contact-video-bg">
        <video autoPlay muted loop playsInline>
          <source src="/career1.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="contact-overlay"></div>
      <div className="container">
        <div className="section-header fade-in">
          <span className="section-tag">Get In Touch</span>
          <h2>Contact <span className="accent">Us</span></h2>
          <div className="section-line"></div>
        </div>
        <div className="contact-grid">
          <div className="contact-info fade-in-left">
            <h3>Ready to Discuss Your <span className="accent">Requirements</span>?</h3>
            <p>Whether you need geospatial intelligence at scale or real-time open-source monitoring, our team is ready to scope a pilot with you.</p>

            <div className="contact-cards">
              <div className="cc-item">
                <div className="cc-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                </div>
                <div>
                  <h4>Headquarters</h4>
                  <p>Psitech Consultancy Services Private Limited<br/>NMS Titanium, Office No. 801, Plot No. 74,<br/>Sector 15, CBD Belapur,<br/>Navi Mumbai, Maharashtra – 400614, India</p>
                </div>
              </div>
              <div className="cc-item">
                <div className="cc-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                </div>
                <div>
                  <h4>Phone</h4>
                  <p><a href="tel:+912246178380">+91-22-4617-8380</a></p>
                </div>
              </div>
              <div className="cc-item">
                <div className="cc-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                </div>
                <div>
                  <h4>Email</h4>
                  <p><a href="mailto:admin@psitech.co.in">admin@psitech.co.in</a></p>
                </div>
              </div>
            </div>

            <div className="contact-secure">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="16" height="16"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              <span>All communications are encrypted and secure</span>
            </div>
          </div>

          <div className="contact-form-wrap fade-in-right">
            {submitted ? (
              <div className="form-success">
                <div className="success-check">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="36" height="36"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                </div>
                <h3>Inquiry Sent Successfully</h3>
                <p>Our intelligence team will respond within 24 hours.</p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Full Name *</label>
                    <input type="text" id="name" name="name" required placeholder="Your Name" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="org">Organization</label>
                    <input type="text" id="org" name="org" placeholder="Organization / Unit" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input type="email" id="email" name="email" required placeholder="your@email.com" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input type="tel" id="phone" name="phone" placeholder="+91-XXXXX-XXXXX" />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="interest">Area of Interest</label>
                  <select id="interest" name="interest">
                    <option value="">Select a Product Area</option>
                    <option value="geoint">Geographical Intelligence</option>
                    <option value="osint">OSINT Intelligence</option>
                    <option value="other">Other / Custom Requirement</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea id="message" name="message" rows="4" placeholder="Tell us about your requirements..."></textarea>
                </div>
                <button type="submit" className="btn btn-primary btn-full">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                  Send Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
