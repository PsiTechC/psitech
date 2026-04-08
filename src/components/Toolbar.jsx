import { useState } from 'react'
import '../styles/Toolbar.css'

const tools = [
  { id: 'map', label: 'MAP', icon: '🗺' },
  { id: 'e-searcher', label: 'E-SEARCHER', icon: '⚙' },
  { id: 'analyser', label: 'ANALYSER', icon: '📊' },
  { id: 'report', label: 'REPORT', icon: '📋' },
  { id: 'medb', label: 'MEDB', icon: '⚓' },
  { id: 'm-data', label: 'M DATA', icon: '📡' },
  { id: 'tedb', label: 'TEDB', icon: '🗂' },
  { id: 'purple', label: 'PURPLE', icon: '🔮' },
  { id: 'archive', label: 'ARCHIVE', icon: '🗄' },
  { id: 'traders', label: 'TRADERS', icon: '👥' },
  { id: 'commnit', label: 'COMMNIT', icon: '📡' },
  { id: 'e-orbat', label: 'E ORBAT', icon: '⚙' },
  { id: 'p-data', label: 'P DATA', icon: '🗂' },
]

function Toolbar() {
  const [active, setActive] = useState('map')

  return (
    <div className="toolbar">
      <div className="toolbar-inner">
        <div className="toolbar-scroll">
          {tools.map((tool) => (
            <button
              key={tool.id}
              className={`toolbar-btn ${active === tool.id ? 'active' : ''}`}
              onClick={() => setActive(tool.id)}
            >
              <span className="toolbar-icon">{tool.icon}</span>
              {tool.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Toolbar
