import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getActiveJobs, getDepartments, submitApplication, getActiveStories } from '../data/careersStore'
import '../styles/CareersPage.css'

function CareersPage() {
  const [activeDept, setActiveDept] = useState('All')
  const [jobs, setJobs] = useState([])
  const [departments, setDepartments] = useState(['All'])
  const [stories, setStories] = useState([])
  const [expandedStory, setExpandedStory] = useState(null)
  const [applyJob, setApplyJob] = useState(null)
  const [appForm, setAppForm] = useState({ name: '', email: '', phone: '', experience: '', coverLetter: '', resumeName: '', resumeData: '' })
  const [appSubmitted, setAppSubmitted] = useState(false)

  useEffect(() => {
    setJobs(getActiveJobs())
    setDepartments(getDepartments())
    setStories(getActiveStories())
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible')
        })
      },
      { threshold: 0.08 }
    )
    setTimeout(() => {
      document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .scale-in')
        .forEach((el) => observer.observe(el))
    }, 100)
    return () => observer.disconnect()
  }, [jobs])

  const filtered = activeDept === 'All'
    ? jobs
    : jobs.filter((j) => j.department === activeDept)

  const openApply = (job) => {
    setApplyJob(job)
    setAppForm({ name: '', email: '', phone: '', experience: '', coverLetter: '', resumeName: '', resumeData: '' })
    setAppSubmitted(false)
  }

  const handleAppChange = (field, value) => {
    setAppForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setAppForm((prev) => ({ ...prev, resumeName: file.name, resumeData: reader.result }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAppSubmit = (e) => {
    e.preventDefault()
    submitApplication({
      jobId: applyJob.id,
      jobTitle: applyJob.title,
      department: applyJob.department,
      ...appForm,
    })
    setAppSubmitted(true)
  }

  return (
    <div className="careers-page">
      {/* ── HERO ── */}
      <section className="cr-hero">
        <div className="cr-hero-video">
          <video autoPlay muted loop playsInline>
            <source src="/carrer2.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="cr-hero-overlay"></div>
        <div className="cr-hero-grid-lines"></div>
        <div className="cr-hero-particles">
          {[...Array(30)].map((_, i) => (
            <div className="cr-dot" key={i} style={{
              left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`, animationDuration: `${3 + Math.random() * 4}s`,
            }} />
          ))}
        </div>
        <div className="container cr-hero-content">
          <div className="cr-hero-badge fade-in">
            <span className="cr-badge-dot"></span>
            We're Hiring
          </div>
          <h1 className="fade-in">Build the Future of <span className="accent">Defense Technology</span></h1>
          <p className="cr-hero-sub fade-in">
            Join a team of innovators engineering indigenous solutions that protect our nation.
            Your expertise can shape the future of India's defense capabilities.
          </p>
          <div className="cr-hero-stats fade-in">
            <div className="cr-stat">
              <span className="cr-stat-num">50+</span>
              <span className="cr-stat-label">Team Members</span>
            </div>
            <div className="cr-stat-divider"></div>
            <div className="cr-stat">
              <span className="cr-stat-num">{jobs.length}</span>
              <span className="cr-stat-label">Open Roles</span>
            </div>
            <div className="cr-stat-divider"></div>
            <div className="cr-stat">
              <span className="cr-stat-num">4</span>
              <span className="cr-stat-label">Office Locations</span>
            </div>
          </div>
          <a href="#openings" className="btn btn-primary">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            View Open Positions
          </a>
        </div>
      </section>

      {/* ── WHY JOIN US ── */}
      <section className="section cr-why">
        <div className="container">
          <div className="section-header fade-in">
            <span className="section-tag">Why Psitech</span>
            <h2>Why Build Your Career <span className="accent">With Us</span></h2>
            <div className="section-line"></div>
          </div>
          <div className="cr-perks-grid">
            {[
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="28" height="28"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                ),
                title: 'Mission That Matters',
                desc: 'Work on defense systems that directly strengthen national security. Your code protects those who protect us.',
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="28" height="28"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                ),
                title: 'Continuous Learning',
                desc: 'Access cutting-edge defense tech, attend global conferences, and earn certifications — all company-sponsored.',
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="28" height="28"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                ),
                title: 'Elite Team',
                desc: 'Collaborate with ex-defense professionals, PhDs, and senior engineers who have shaped India\'s defense landscape.',
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="28" height="28"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                ),
                title: 'Growth & Ownership',
                desc: 'Fast-track your career with leadership opportunities. We believe in promoting talent from within.',
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="28" height="28"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                ),
                title: 'Wellness & Benefits',
                desc: 'Comprehensive health insurance, flexible work arrangements, generous PTO, and family-first policies.',
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="28" height="28"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                ),
                title: 'Make-in-India Impact',
                desc: 'Be part of the indigenous defense technology revolution. Your innovations contribute to national self-reliance.',
              },
            ].map((perk, i) => (
              <div className="cr-perk-card fade-in" key={i} style={{ transitionDelay: `${i * 0.08}s` }}>
                <div className="cr-perk-icon">{perk.icon}</div>
                <h3>{perk.title}</h3>
                <p>{perk.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LIFE AT PSITECH ── */}
      <section className="section cr-life">
        <div className="container">
          <div className="section-header fade-in">
            <span className="section-tag">Culture</span>
            <h2>Life at <span className="accent">Psitech</span></h2>
            <div className="section-line"></div>
          </div>
          <div className="cr-life-grid">
            <div className="cr-life-card cr-life-lg fade-in-left">
              <div className="cr-life-visual">
                <div className="cr-life-icon-wrap">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="40" height="40"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>
                </div>
              </div>
              <div className="cr-life-text">
                <h3>Innovation Labs</h3>
                <p>Dedicated R&D labs where engineers prototype next-gen defense solutions using the latest tools and technologies.</p>
              </div>
            </div>
            <div className="cr-life-card fade-in-right">
              <div className="cr-life-visual">
                <div className="cr-life-icon-wrap">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="32" height="32"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                </div>
              </div>
              <div className="cr-life-text">
                <h3>Team Events</h3>
                <p>Regular hackathons, tech talks, and team outings that foster collaboration and creativity.</p>
              </div>
            </div>
            <div className="cr-life-card fade-in-left">
              <div className="cr-life-visual">
                <div className="cr-life-icon-wrap">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="32" height="32"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
                </div>
              </div>
              <div className="cr-life-text">
                <h3>Learning Culture</h3>
                <p>Sponsored certifications, conference passes, and a dedicated budget for professional development.</p>
              </div>
            </div>
            <div className="cr-life-card cr-life-lg fade-in-right">
              <div className="cr-life-visual">
                <div className="cr-life-icon-wrap">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="40" height="40"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>
                </div>
              </div>
              <div className="cr-life-text">
                <h3>Work That Matters</h3>
                <p>Every project directly impacts India's defense readiness. See your work deployed in real-world missions protecting our borders.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STORIES OF GROWTH ── */}
      {stories.length > 0 && (
        <section className="section cr-stories">
          <div className="container">
            <div className="section-header fade-in">
              <span className="section-tag">Our People</span>
              <h2>Stories of <span className="accent">Growth</span></h2>
              <div className="section-line"></div>
            </div>
            <div className="cr-stories-grid">
              {stories.map((story, i) => (
                <div className="cr-story-card fade-in" key={story.id} style={{ transitionDelay: `${i * 0.1}s` }}>
                  <div className="cr-story-photo">
                    {story.photo ? (
                      <img src={story.photo} alt={story.name} />
                    ) : (
                      <div className="cr-story-avatar">
                        {story.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                      </div>
                    )}
                  </div>
                  <h3>{story.name}</h3>
                  <span className="cr-story-role">{story.role}</span>
                  <div className="cr-story-quote">
                    <p>
                      {expandedStory === story.id
                        ? story.quote
                        : story.quote.length > 120
                          ? story.quote.slice(0, 120) + '...'
                          : story.quote
                      }
                    </p>
                    {story.quote.length > 120 && (
                      <button className="cr-story-read" onClick={() => setExpandedStory(expandedStory === story.id ? null : story.id)}>
                        {expandedStory === story.id ? 'Show less' : 'Read more'}
                      </button>
                    )}
                  </div>
                  {story.yearJoined && (
                    <span className="cr-story-since">Since {story.yearJoined}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── OPEN POSITIONS ── */}
      <section id="openings" className="section cr-openings">
        <div className="container">
          <div className="section-header fade-in">
            <span className="section-tag">Open Roles</span>
            <h2>Current <span className="accent">Openings</span></h2>
            <div className="section-line"></div>
          </div>

          {/* Department Filter */}
          <div className="cr-filters fade-in">
            {departments.map((dept) => (
              <button
                key={dept}
                className={`cr-filter-btn ${activeDept === dept ? 'active' : ''}`}
                onClick={() => setActiveDept(dept)}
              >
                {dept}
                {dept === 'All' && <span className="cr-filter-count">{jobs.length}</span>}
                {dept !== 'All' && (
                  <span className="cr-filter-count">
                    {jobs.filter((j) => j.department === dept).length}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Job Listings */}
          <div className="cr-jobs-list">
            {filtered.map((job, i) => (
              <div
                className="cr-job-card fade-in expanded"
                key={job.id}
                style={{ transitionDelay: `${i * 0.06}s` }}
              >
                <div className="cr-job-header">
                  <div className="cr-job-main">
                    <div className="cr-job-dept-badge">{job.department}</div>
                    <h3>{job.title}</h3>
                    <p className="cr-job-desc">{job.description}</p>
                    <div className="cr-job-meta">
                      <span className="cr-job-meta-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="14" height="14"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                        {job.location}
                      </span>
                      <span className="cr-job-meta-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="14" height="14"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                        {job.type}
                      </span>
                      <span className="cr-job-meta-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="14" height="14"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                        {job.experience}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="cr-job-details">
                  <div className="cr-job-details-grid">
                    <div className="cr-job-requirements">
                      <h4>Requirements</h4>
                      <ul>
                        {job.requirements.map((req, ri) => (
                          <li key={ri}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><polyline points="20 6 9 17 4 12"/></svg>
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="cr-job-sidebar">
                      <h4>Tech Stack</h4>
                      <div className="cr-job-tags">
                        {job.tags.map((tag, ti) => (
                          <span className="cr-tag" key={ti}>{tag}</span>
                        ))}
                      </div>
                      <div className="cr-job-posted">
                        Posted: {new Date(job.posted).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </div>
                    </div>
                  </div>
                  <button className="btn btn-primary cr-apply-btn" onClick={() => openApply(job)}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="cr-no-jobs fade-in">
              <p>No openings in this department right now. Check back soon or send your resume to <a href="mailto:careers@psitech.in">careers@psitech.in</a></p>
            </div>
          )}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section cr-cta">
        <div className="container">
          <div className="cr-cta-box fade-in">
            <div className="cr-cta-content">
              <span className="section-tag">Don't See Your Role?</span>
              <h2>We're Always Looking for <span className="accent">Exceptional Talent</span></h2>
              <p>
                If you're passionate about defense technology and don't see a role that fits,
                send us your resume. We're always open to connecting with talented individuals.
              </p>
              <div className="cr-cta-actions">
                <a href="mailto:careers@psitech.in" className="btn btn-primary">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  Send Your Resume
                </a>
                <Link to="/contact" className="btn btn-outline">Contact Us</Link>
              </div>
            </div>
            <div className="cr-cta-visual">
              <div className="cr-cta-ring"></div>
              <div className="cr-cta-ring cr-cta-ring-2"></div>
              <div className="cr-cta-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="48" height="48">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="8.5" cy="7" r="4"/>
                  <line x1="20" y1="8" x2="20" y2="14"/>
                  <line x1="23" y1="11" x2="17" y2="11"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── APPLICATION MODAL ── */}
      {applyJob && (
        <div className="cr-apply-overlay" onClick={() => setApplyJob(null)}>
          <div className="cr-apply-modal" onClick={(e) => e.stopPropagation()}>
            {appSubmitted ? (
              <div className="cr-apply-success">
                <div className="cr-apply-success-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="40" height="40"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                </div>
                <h3>Application Submitted!</h3>
                <p>Thank you for applying for <strong>{applyJob.title}</strong>. Our HR team will review your application and get back to you within 5 business days.</p>
                <button className="btn btn-primary" onClick={() => setApplyJob(null)}>Close</button>
              </div>
            ) : (
              <>
                <div className="cr-apply-header">
                  <div>
                    <span className="cr-apply-badge">{applyJob.department}</span>
                    <h2>Apply for {applyJob.title}</h2>
                    <p>{applyJob.location} &bull; {applyJob.type} &bull; {applyJob.experience}</p>
                  </div>
                  <button className="cr-apply-close" onClick={() => setApplyJob(null)}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  </button>
                </div>
                <form className="cr-apply-form" onSubmit={handleAppSubmit}>
                  <div className="cr-apply-row">
                    <div className="cr-apply-group">
                      <label>Full Name *</label>
                      <input type="text" value={appForm.name} onChange={(e) => handleAppChange('name', e.target.value)} required placeholder="Your full name" />
                    </div>
                    <div className="cr-apply-group">
                      <label>Email Address *</label>
                      <input type="email" value={appForm.email} onChange={(e) => handleAppChange('email', e.target.value)} required placeholder="you@email.com" />
                    </div>
                  </div>
                  <div className="cr-apply-row">
                    <div className="cr-apply-group">
                      <label>Phone Number *</label>
                      <input type="tel" value={appForm.phone} onChange={(e) => handleAppChange('phone', e.target.value)} required placeholder="+91-XXXXX-XXXXX" />
                    </div>
                    <div className="cr-apply-group">
                      <label>Years of Experience *</label>
                      <input type="text" value={appForm.experience} onChange={(e) => handleAppChange('experience', e.target.value)} required placeholder="e.g. 4 Years" />
                    </div>
                  </div>
                  <div className="cr-apply-group">
                    <label>Resume / CV *</label>
                    <div className="cr-file-upload">
                      <input type="file" id="resume-upload" accept=".pdf,.doc,.docx" onChange={handleFileChange} required />
                      <label htmlFor="resume-upload" className="cr-file-label">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                        {appForm.resumeName || 'Upload PDF, DOC, or DOCX'}
                      </label>
                    </div>
                  </div>
                  <div className="cr-apply-group">
                    <label>Cover Letter / Message</label>
                    <textarea value={appForm.coverLetter} onChange={(e) => handleAppChange('coverLetter', e.target.value)} rows="4" placeholder="Tell us why you're a great fit for this role..." />
                  </div>
                  <div className="cr-apply-actions">
                    <button type="button" className="btn btn-outline" onClick={() => setApplyJob(null)}>Cancel</button>
                    <button type="submit" className="btn btn-primary">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                      Submit Application
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default CareersPage
