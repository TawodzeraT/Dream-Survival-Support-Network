import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown } from 'lucide-react'
import './Navbar.css'

const programs = [
  { name: 'Digital Learning', path: '/digital-learning' },
  { name: 'Teacher Support', path: '/teacher-support' },
  { name: 'Scholarships', path: '/scholarships' },
  { name: 'College Readiness', path: '/college-readiness' },
  { name: 'Wellness & Resilience', path: '/wellness' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [programsOpen, setProgramsOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMobileOpen(false); setProgramsOpen(false) }, [location])

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-inner container">
        <Link to="/" className="nav-logo">
          <span className="logo-mark">D</span>
          <span className="logo-text">DSSN</span>
        </Link>

        <div className={`nav-links ${mobileOpen ? 'open' : ''}`}>
          <div className="nav-dropdown" onMouseLeave={() => setProgramsOpen(false)}>
            <button className="nav-link dropdown-trigger" onMouseEnter={() => setProgramsOpen(true)} onClick={() => setProgramsOpen(!programsOpen)}>
              Programs <ChevronDown size={14} className={programsOpen ? 'rotated' : ''} />
            </button>
            {programsOpen && (
              <div className="dropdown-menu">
                {programs.map(p => (
                  <Link key={p.path} to={p.path} className="dropdown-item">{p.name}</Link>
                ))}
              </div>
            )}
          </div>
          <Link to="/team" className="nav-link">Our Team</Link>
          <Link to="/blog" className="nav-link">Blog</Link>
          <Link to="/gallery" className="nav-link">Gallery</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
          <Link to="/donate" className="btn btn-primary nav-cta">Donate</Link>
        </div>

        <button className="nav-burger" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileOpen && <div className="nav-overlay" onClick={() => setMobileOpen(false)} />}
    </nav>
  )
}
