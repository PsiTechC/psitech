import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  getAllJobs, addJob, updateJob, deleteJob, toggleJobActive, getDepartments,
  getApplications, deleteApplication,
  getStories, addStory, updateStory, deleteStory, toggleStoryActive,
} from '../data/careersStore'
import '../styles/AdminCareers.css'

const JOB_TYPES = ['Full-time', 'Part-time', 'Contract', 'Internship']
const DEPT_OPTIONS = ['Engineering', 'Software', 'Management', 'Design', 'Operations', 'Marketing']

const emptyForm = {
  title: '',
  department: 'Engineering',
  location: 'New Delhi, India',
  type: 'Full-time',
  experience: '',
  description: '',
  requirements: '',
  tags: '',
}

function AdminCareers() {
  const [authed, setAuthed] = useState(false)
  const [password, setPassword] = useState('')
  const [passError, setPassError] = useState(false)
  const [jobs, setJobs] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [filterDept, setFilterDept] = useState('All')
  const [deleteConfirm, setDeleteConfirm] = useState(null)
  const [toast, setToast] = useState(null)
  const [activeTab, setActiveTab] = useState('posts')
  const [applications, setApplications] = useState([])
  const [deleteAppConfirm, setDeleteAppConfirm] = useState(null)
  const [storiesList, setStoriesList] = useState([])
  const [showStoryForm, setShowStoryForm] = useState(false)
  const [editingStoryId, setEditingStoryId] = useState(null)
  const [storyForm, setStoryForm] = useState({ name: '', role: '', quote: '', yearJoined: '', photo: '' })
  const [deleteStoryConfirm, setDeleteStoryConfirm] = useState(null)

  const refresh = () => {
    setJobs(getAllJobs())
    setApplications(getApplications())
    setStoriesList(getStories())
  }

  useEffect(() => {
    if (authed) refresh()
  }, [authed])

  // Simple password gate — change this for production
  const handleLogin = (e) => {
    e.preventDefault()
    if (password === 'psitech@hr2026') {
      setAuthed(true)
      setPassError(false)
    } else {
      setPassError(true)
    }
  }

  const showToast = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(null), 3000)
  }

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const openAdd = () => {
    setForm(emptyForm)
    setEditingId(null)
    setShowForm(true)
  }

  const openEdit = (job) => {
    setForm({
      title: job.title,
      department: job.department,
      location: job.location,
      type: job.type,
      experience: job.experience,
      description: job.description,
      requirements: job.requirements.join('\n'),
      tags: job.tags.join(', '),
    })
    setEditingId(job.id)
    setShowForm(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const jobData = {
      ...form,
      requirements: form.requirements.split('\n').map((r) => r.trim()).filter(Boolean),
      tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
    }
    if (editingId) {
      updateJob(editingId, jobData)
      showToast('Job post updated successfully')
    } else {
      addJob(jobData)
      showToast('New job post published')
    }
    setShowForm(false)
    setEditingId(null)
    setForm(emptyForm)
    refresh()
  }

  const handleDelete = (id) => {
    deleteJob(id)
    setDeleteConfirm(null)
    showToast('Job post deleted')
    refresh()
  }

  const handleToggle = (id) => {
    toggleJobActive(id)
    refresh()
  }

  const filtered = filterDept === 'All' ? jobs : jobs.filter((j) => j.department === filterDept)
  const activeCount = jobs.filter((j) => j.active).length
  const deptCounts = {}
  jobs.forEach((j) => { deptCounts[j.department] = (deptCounts[j.department] || 0) + 1 })

  // ─── LOGIN SCREEN ───
  if (!authed) {
    return (
      <div className="adm-login-page">
        <div className="adm-login-card">
          <div className="adm-login-header">
            <div className="adm-login-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="32" height="32"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <h1>HR Dashboard</h1>
            <p>PsiTech Careers Management</p>
          </div>
          <form onSubmit={handleLogin}>
            <div className="adm-login-field">
              <label>Access Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                autoFocus
              />
              {passError && <span className="adm-login-error">Invalid password. Try again.</span>}
            </div>
            <button type="submit" className="btn btn-primary btn-full">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              Access Dashboard
            </button>
          </form>
          <Link to="/careers" className="adm-login-back">&larr; Back to Careers Page</Link>
        </div>
      </div>
    )
  }

  // ─── DASHBOARD ───
  return (
    <div className="adm-page">
      {/* Toast */}
      {toast && <div className="adm-toast">{toast}</div>}

      {/* Top Bar */}
      <header className="adm-topbar">
        <div className="container adm-topbar-inner">
          <div className="adm-topbar-left">
            <div className="adm-topbar-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <div>
              <h1>Careers Dashboard</h1>
              <span className="adm-topbar-sub">Manage job postings</span>
            </div>
          </div>
          <div className="adm-topbar-right">
            <Link to="/careers" className="adm-link-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              View Live Page
            </Link>
            <button className="adm-link-btn adm-logout" onClick={() => setAuthed(false)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="container adm-body">
        {/* Tabs */}
        <div className="adm-tabs">
          <button className={`adm-tab ${activeTab === 'posts' ? 'active' : ''}`} onClick={() => setActiveTab('posts')}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="16" height="16"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
            Job Posts
            <span className="adm-tab-badge">{jobs.length}</span>
          </button>
          <button className={`adm-tab ${activeTab === 'applications' ? 'active' : ''}`} onClick={() => setActiveTab('applications')}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="16" height="16"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            Applications
            <span className="adm-tab-badge">{applications.length}</span>
          </button>
          <button className={`adm-tab ${activeTab === 'stories' ? 'active' : ''}`} onClick={() => setActiveTab('stories')}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="16" height="16"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            Growth Stories
            <span className="adm-tab-badge">{storiesList.length}</span>
          </button>
        </div>

        {/* Stats Row */}
        {activeTab === 'posts' && <><div className="adm-stats">
          <div className="adm-stat-card">
            <div className="adm-stat-icon blue">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
            </div>
            <div>
              <span className="adm-stat-num">{jobs.length}</span>
              <span className="adm-stat-label">Total Posts</span>
            </div>
          </div>
          <div className="adm-stat-card">
            <div className="adm-stat-icon green">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            </div>
            <div>
              <span className="adm-stat-num">{activeCount}</span>
              <span className="adm-stat-label">Active</span>
            </div>
          </div>
          <div className="adm-stat-card">
            <div className="adm-stat-icon orange">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            </div>
            <div>
              <span className="adm-stat-num">{jobs.length - activeCount}</span>
              <span className="adm-stat-label">Inactive</span>
            </div>
          </div>
          <div className="adm-stat-card">
            <div className="adm-stat-icon purple">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
            <div>
              <span className="adm-stat-num">{Object.keys(deptCounts).length}</span>
              <span className="adm-stat-label">Departments</span>
            </div>
          </div>
        </div>

        {/* Actions Row */}
        <div className="adm-actions">
          <div className="adm-dept-filters">
            {getDepartments().map((d) => (
              <button key={d} className={`adm-dept-btn ${filterDept === d ? 'active' : ''}`} onClick={() => setFilterDept(d)}>
                {d}
              </button>
            ))}
          </div>
          <button className="btn btn-primary adm-add-btn" onClick={openAdd}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Add New Post
          </button>
        </div>

        {/* Job Table */}
        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead>
              <tr>
                <th>Job Title</th>
                <th>Department</th>
                <th>Type</th>
                <th>Experience</th>
                <th>Posted</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((job) => (
                <tr key={job.id} className={!job.active ? 'adm-row-inactive' : ''}>
                  <td>
                    <div className="adm-job-title">{job.title}</div>
                    <div className="adm-job-loc">{job.location}</div>
                  </td>
                  <td><span className="adm-dept-pill">{job.department}</span></td>
                  <td>{job.type}</td>
                  <td>{job.experience}</td>
                  <td>{new Date(job.posted).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                  <td>
                    <button className={`adm-toggle ${job.active ? 'on' : 'off'}`} onClick={() => handleToggle(job.id)} title={job.active ? 'Click to deactivate' : 'Click to activate'}>
                      <span className="adm-toggle-dot"></span>
                      <span className="adm-toggle-label">{job.active ? 'Live' : 'Off'}</span>
                    </button>
                  </td>
                  <td>
                    <div className="adm-actions-cell">
                      <button className="adm-icon-btn edit" onClick={() => openEdit(job)} title="Edit">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                      </button>
                      <button className="adm-icon-btn delete" onClick={() => setDeleteConfirm(job.id)} title="Delete">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan="7" className="adm-empty">No job posts found in this department.</td></tr>
              )}
            </tbody>
          </table>
        </div>
        </>}

        {/* ── APPLICATIONS TAB ── */}
        {activeTab === 'applications' && (
          <>
            <div className="adm-stats">
              <div className="adm-stat-card">
                <div className="adm-stat-icon blue">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
                </div>
                <div>
                  <span className="adm-stat-num">{applications.length}</span>
                  <span className="adm-stat-label">Total Applications</span>
                </div>
              </div>
              <div className="adm-stat-card">
                <div className="adm-stat-icon green">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                </div>
                <div>
                  <span className="adm-stat-num">{[...new Set(applications.map((a) => a.jobTitle))].length}</span>
                  <span className="adm-stat-label">Roles Applied</span>
                </div>
              </div>
              <div className="adm-stat-card">
                <div className="adm-stat-icon orange">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                </div>
                <div>
                  <span className="adm-stat-num">
                    {applications.filter((a) => {
                      const d = new Date(a.submittedAt)
                      const now = new Date()
                      return (now - d) < 7 * 24 * 60 * 60 * 1000
                    }).length}
                  </span>
                  <span className="adm-stat-label">This Week</span>
                </div>
              </div>
              <div className="adm-stat-card">
                <div className="adm-stat-icon purple">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                </div>
                <div>
                  <span className="adm-stat-num">{applications.filter((a) => a.resumeName).length}</span>
                  <span className="adm-stat-label">With Resume</span>
                </div>
              </div>
            </div>

            {applications.length === 0 ? (
              <div className="adm-no-apps">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" width="64" height="64"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>
                <p>No applications received yet. Applications will appear here when candidates apply through the careers page.</p>
              </div>
            ) : (
              applications.map((app) => (
                <div className="adm-app-card" key={app.id}>
                  <div className="adm-app-top">
                    <span className="adm-app-name">{app.name}</span>
                    <span className="adm-app-date">
                      {new Date(app.submittedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <div className="adm-app-role">{app.jobTitle}</div>
                  <div className="adm-app-details">
                    <span>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="14" height="14"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                      {app.email}
                    </span>
                    <span>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="14" height="14"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                      {app.phone}
                    </span>
                    <span>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="14" height="14"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                      {app.experience} experience
                    </span>
                  </div>
                  {app.coverLetter && (
                    <div className="adm-app-message">"{app.coverLetter}"</div>
                  )}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '12px', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                    {app.resumeName && (
                      <a
                        href={app.resumeData || '#'}
                        download={app.resumeName}
                        className="adm-app-resume-name"
                        title="Download resume"
                        onClick={(e) => { if (!app.resumeData) { e.preventDefault(); alert('Resume file data not available.') } }}
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="14" height="14"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                        {app.resumeName}
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="14" height="14"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                      </a>
                    )}
                    <button className="adm-icon-btn delete" onClick={() => setDeleteAppConfirm(app.id)} title="Delete application" style={{ marginLeft: 'auto' }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                    </button>
                  </div>
                </div>
              ))
            )}
          </>
        )}

        {/* ── STORIES TAB ── */}
        {activeTab === 'stories' && (
          <>
            <div className="adm-actions" style={{ marginBottom: '24px' }}>
              <div>
                <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem' }}>
                  {storiesList.filter((s) => s.active).length} active &bull; {storiesList.filter((s) => !s.active).length} hidden
                </span>
              </div>
              <button className="btn btn-primary adm-add-btn" onClick={() => { setStoryForm({ name: '', role: '', quote: '', yearJoined: '', photo: '' }); setEditingStoryId(null); setShowStoryForm(true) }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                Add Story
              </button>
            </div>

            {storiesList.length === 0 ? (
              <div className="adm-no-apps">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" width="64" height="64"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                <p>No growth stories yet. Add employee stories to showcase on the careers page.</p>
              </div>
            ) : (
              <div className="adm-stories-grid">
                {storiesList.map((story) => (
                  <div className={`adm-story-card ${!story.active ? 'adm-story-inactive' : ''}`} key={story.id}>
                    <div className="adm-story-top">
                      <div className="adm-story-photo">
                        {story.photo ? (
                          <img src={story.photo} alt={story.name} />
                        ) : (
                          <div className="adm-story-avatar">
                            {story.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="adm-story-name">{story.name}</div>
                        <div className="adm-story-role">{story.role}</div>
                        {story.yearJoined && <div className="adm-story-year">Since {story.yearJoined}</div>}
                      </div>
                    </div>
                    <p className="adm-story-quote">"{story.quote.length > 100 ? story.quote.slice(0, 100) + '...' : story.quote}"</p>
                    <div className="adm-story-actions">
                      <button className={`adm-toggle ${story.active ? 'on' : 'off'}`} onClick={() => { toggleStoryActive(story.id); refresh() }} title={story.active ? 'Hide from careers page' : 'Show on careers page'}>
                        <span className="adm-toggle-dot"></span>
                        <span className="adm-toggle-label">{story.active ? 'Live' : 'Off'}</span>
                      </button>
                      <div className="adm-actions-cell">
                        <button className="adm-icon-btn edit" onClick={() => { setStoryForm({ name: story.name, role: story.role, quote: story.quote, yearJoined: story.yearJoined || '', photo: story.photo || '' }); setEditingStoryId(story.id); setShowStoryForm(true) }} title="Edit">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                        </button>
                        <button className="adm-icon-btn delete" onClick={() => setDeleteStoryConfirm(story.id)} title="Delete">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* ─── ADD / EDIT MODAL ─── */}
      {showForm && (
        <div className="adm-modal-overlay" onClick={() => setShowForm(false)}>
          <div className="adm-modal" onClick={(e) => e.stopPropagation()}>
            <div className="adm-modal-header">
              <h2>{editingId ? 'Edit Job Post' : 'Create New Job Post'}</h2>
              <button className="adm-modal-close" onClick={() => setShowForm(false)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="adm-form">
              <div className="adm-form-row">
                <div className="adm-form-group">
                  <label>Job Title *</label>
                  <input type="text" value={form.title} onChange={(e) => handleChange('title', e.target.value)} required placeholder="e.g. Senior Embedded Engineer" />
                </div>
                <div className="adm-form-group">
                  <label>Department *</label>
                  <select value={form.department} onChange={(e) => handleChange('department', e.target.value)}>
                    {DEPT_OPTIONS.map((d) => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
              </div>
              <div className="adm-form-row">
                <div className="adm-form-group">
                  <label>Location *</label>
                  <input type="text" value={form.location} onChange={(e) => handleChange('location', e.target.value)} required placeholder="e.g. New Delhi, India" />
                </div>
                <div className="adm-form-group">
                  <label>Job Type *</label>
                  <select value={form.type} onChange={(e) => handleChange('type', e.target.value)}>
                    {JOB_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              <div className="adm-form-group">
                <label>Experience Required *</label>
                <input type="text" value={form.experience} onChange={(e) => handleChange('experience', e.target.value)} required placeholder="e.g. 3-5 Years" />
              </div>
              <div className="adm-form-group">
                <label>Description *</label>
                <textarea value={form.description} onChange={(e) => handleChange('description', e.target.value)} required rows="3" placeholder="Brief description of the role..." />
              </div>
              <div className="adm-form-group">
                <label>Requirements (one per line) *</label>
                <textarea value={form.requirements} onChange={(e) => handleChange('requirements', e.target.value)} required rows="5" placeholder={"B.Tech in Computer Science\n3+ years experience in React\nStrong problem-solving skills"} />
              </div>
              <div className="adm-form-group">
                <label>Tags (comma separated)</label>
                <input type="text" value={form.tags} onChange={(e) => handleChange('tags', e.target.value)} placeholder="e.g. React, Node.js, Python" />
              </div>
              <div className="adm-form-actions">
                <button type="button" className="btn btn-outline" onClick={() => setShowForm(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><polyline points="20 6 9 17 4 12"/></svg>
                  {editingId ? 'Update Post' : 'Publish Post'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── DELETE CONFIRM MODAL ─── */}
      {deleteConfirm && (
        <div className="adm-modal-overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="adm-confirm" onClick={(e) => e.stopPropagation()}>
            <div className="adm-confirm-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="32" height="32"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            </div>
            <h3>Delete this job post?</h3>
            <p>This action cannot be undone. The post will be removed from the live careers page.</p>
            <div className="adm-confirm-actions">
              <button className="btn btn-outline" onClick={() => setDeleteConfirm(null)}>Cancel</button>
              <button className="adm-delete-btn" onClick={() => handleDelete(deleteConfirm)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── DELETE APPLICATION CONFIRM ─── */}
      {deleteAppConfirm && (
        <div className="adm-modal-overlay" onClick={() => setDeleteAppConfirm(null)}>
          <div className="adm-confirm" onClick={(e) => e.stopPropagation()}>
            <div className="adm-confirm-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="32" height="32"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            </div>
            <h3>Delete this application?</h3>
            <p>This will permanently remove the candidate's application data.</p>
            <div className="adm-confirm-actions">
              <button className="btn btn-outline" onClick={() => setDeleteAppConfirm(null)}>Cancel</button>
              <button className="adm-delete-btn" onClick={() => { deleteApplication(deleteAppConfirm); setDeleteAppConfirm(null); showToast('Application deleted'); refresh() }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── ADD / EDIT STORY MODAL ─── */}
      {showStoryForm && (
        <div className="adm-modal-overlay" onClick={() => setShowStoryForm(false)}>
          <div className="adm-modal" onClick={(e) => e.stopPropagation()}>
            <div className="adm-modal-header">
              <h2>{editingStoryId ? 'Edit Growth Story' : 'Add Growth Story'}</h2>
              <button className="adm-modal-close" onClick={() => setShowStoryForm(false)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault()
              if (editingStoryId) {
                updateStory(editingStoryId, storyForm)
                showToast('Story updated')
              } else {
                addStory(storyForm)
                showToast('Story published')
              }
              setShowStoryForm(false)
              setEditingStoryId(null)
              refresh()
            }} className="adm-form">
              {/* Photo Upload */}
              <div className="adm-form-group">
                <label>Employee Photo</label>
                <div className="adm-story-upload">
                  {storyForm.photo ? (
                    <div className="adm-story-preview">
                      <img src={storyForm.photo} alt="Preview" />
                      <button type="button" className="adm-story-remove" onClick={() => setStoryForm((p) => ({ ...p, photo: '' }))}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                      </button>
                    </div>
                  ) : (
                    <label className="adm-story-upload-btn">
                      <input type="file" accept="image/*" onChange={(e) => {
                        const file = e.target.files[0]
                        if (file) {
                          const reader = new FileReader()
                          reader.onload = () => setStoryForm((p) => ({ ...p, photo: reader.result }))
                          reader.readAsDataURL(file)
                        }
                      }} style={{ display: 'none' }} />
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="24" height="24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                      Upload Photo
                    </label>
                  )}
                </div>
              </div>
              <div className="adm-form-row">
                <div className="adm-form-group">
                  <label>Full Name *</label>
                  <input type="text" value={storyForm.name} onChange={(e) => setStoryForm((p) => ({ ...p, name: e.target.value }))} required placeholder="e.g. Avinash Prasad" />
                </div>
                <div className="adm-form-group">
                  <label>Role / Designation *</label>
                  <input type="text" value={storyForm.role} onChange={(e) => setStoryForm((p) => ({ ...p, role: e.target.value }))} required placeholder="e.g. Senior Developer" />
                </div>
              </div>
              <div className="adm-form-group">
                <label>Year Joined</label>
                <input type="text" value={storyForm.yearJoined} onChange={(e) => setStoryForm((p) => ({ ...p, yearJoined: e.target.value }))} placeholder="e.g. 2022" />
              </div>
              <div className="adm-form-group">
                <label>Their Story / Quote *</label>
                <textarea value={storyForm.quote} onChange={(e) => setStoryForm((p) => ({ ...p, quote: e.target.value }))} required rows="5" placeholder="My journey at Psitech has been one of growth, learning, and transformation..." />
              </div>
              <div className="adm-form-actions">
                <button type="button" className="btn btn-outline" onClick={() => setShowStoryForm(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><polyline points="20 6 9 17 4 12"/></svg>
                  {editingStoryId ? 'Update Story' : 'Publish Story'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── DELETE STORY CONFIRM ─── */}
      {deleteStoryConfirm && (
        <div className="adm-modal-overlay" onClick={() => setDeleteStoryConfirm(null)}>
          <div className="adm-confirm" onClick={(e) => e.stopPropagation()}>
            <div className="adm-confirm-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="32" height="32"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            </div>
            <h3>Delete this growth story?</h3>
            <p>This will remove the story from the careers page.</p>
            <div className="adm-confirm-actions">
              <button className="btn btn-outline" onClick={() => setDeleteStoryConfirm(null)}>Cancel</button>
              <button className="adm-delete-btn" onClick={() => { deleteStory(deleteStoryConfirm); setDeleteStoryConfirm(null); showToast('Story deleted'); refresh() }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminCareers
