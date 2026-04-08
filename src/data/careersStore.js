import defaultCareers, { departments as defaultDepartments } from './careers'

const STORAGE_KEY = 'psitech_careers'

function loadJobs() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) return JSON.parse(stored)
  } catch (e) {
    // ignore parse errors
  }
  // Seed with default data on first load
  const seeded = defaultCareers.map((job) => ({ ...job, active: true }))
  localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded))
  return seeded
}

function saveJobs(jobs) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs))
}

export function getAllJobs() {
  return loadJobs()
}

export function getActiveJobs() {
  return loadJobs().filter((j) => j.active)
}

export function addJob(job) {
  const jobs = loadJobs()
  const id = job.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
  const newJob = {
    ...job,
    id: id + '-' + Date.now(),
    posted: new Date().toISOString().split('T')[0],
    active: true,
  }
  jobs.unshift(newJob)
  saveJobs(jobs)
  return newJob
}

export function updateJob(id, updates) {
  const jobs = loadJobs().map((j) => (j.id === id ? { ...j, ...updates } : j))
  saveJobs(jobs)
}

export function deleteJob(id) {
  const jobs = loadJobs().filter((j) => j.id !== id)
  saveJobs(jobs)
}

export function toggleJobActive(id) {
  const jobs = loadJobs().map((j) => (j.id === id ? { ...j, active: !j.active } : j))
  saveJobs(jobs)
}

export function getDepartments() {
  const jobs = loadJobs()
  const depts = [...new Set(jobs.map((j) => j.department))]
  return ['All', ...depts.sort()]
}

// ── Applications ──
const APPS_KEY = 'psitech_applications'

function loadApplications() {
  try {
    const stored = localStorage.getItem(APPS_KEY)
    if (stored) return JSON.parse(stored)
  } catch (e) {
    // ignore
  }
  return []
}

function saveApplications(apps) {
  localStorage.setItem(APPS_KEY, JSON.stringify(apps))
}

export function getApplications() {
  return loadApplications()
}

export function submitApplication(application) {
  const apps = loadApplications()
  const newApp = {
    ...application,
    id: 'app-' + Date.now(),
    submittedAt: new Date().toISOString(),
  }
  apps.unshift(newApp)
  saveApplications(apps)
  return newApp
}

export function deleteApplication(id) {
  const apps = loadApplications().filter((a) => a.id !== id)
  saveApplications(apps)
}

// ── Growth Stories ──
const STORIES_KEY = 'psitech_stories'

function loadStories() {
  try {
    const stored = localStorage.getItem(STORIES_KEY)
    if (stored) return JSON.parse(stored)
  } catch (e) {
    // ignore
  }
  return []
}

function saveStories(stories) {
  localStorage.setItem(STORIES_KEY, JSON.stringify(stories))
}

export function getStories() {
  return loadStories()
}

export function getActiveStories() {
  return loadStories().filter((s) => s.active)
}

export function addStory(story) {
  const stories = loadStories()
  const newStory = {
    ...story,
    id: 'story-' + Date.now(),
    createdAt: new Date().toISOString(),
    active: true,
  }
  stories.unshift(newStory)
  saveStories(stories)
  return newStory
}

export function updateStory(id, updates) {
  const stories = loadStories().map((s) => (s.id === id ? { ...s, ...updates } : s))
  saveStories(stories)
}

export function deleteStory(id) {
  const stories = loadStories().filter((s) => s.id !== id)
  saveStories(stories)
}

export function toggleStoryActive(id) {
  const stories = loadStories().map((s) => (s.id === id ? { ...s, active: !s.active } : s))
  saveStories(stories)
}

export { defaultDepartments }
