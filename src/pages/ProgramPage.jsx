import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle } from 'lucide-react'
import { useSite } from '../context/SiteContext'
import './ProgramPage.css'

export default function ProgramPage({ programId }) {
  const { programs } = useSite()
  const program = programs.find(p => p.id === programId)

  if (!program) return <div className="container" style={{padding:'100px 24px'}}><h1>Program not found.</h1></div>

  const otherPrograms = programs.filter(p => p.id !== programId).slice(0, 3)

  return (
    <div className="program-page">
      <div className="program-hero" style={{background:`linear-gradient(135deg, #050d1a 0%, #0a1628 60%, #1a3a6b 100%)`}}>
        <div className="container ph-inner">
          <span className="section-label" style={{color:'rgba(255,255,255,0.6)'}}>Our Programs</span>
          <div className="ph-icon">{program.icon}</div>
          <h1>{program.name}</h1>
          <p>{program.tagline}</p>
        </div>
      </div>

      <div className="program-stats-bar">
        <div className="container psb-inner">
          {program.stats.map((s, i) => (
            <div key={i} className="psb-stat">
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <section className="program-body">
        <div className="container pb-grid">
          <div className="pb-main">
            <h2>About This Program</h2>
            {program.details.split('\n\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
            <div className="impact-box">
              <CheckCircle size={20} />
              <p>{program.impact}</p>
            </div>
            <div style={{marginTop:'32px', display:'flex', gap:'12px', flexWrap:'wrap'}}>
              <Link to="/donate" className="btn btn-primary">Support This Program <ArrowRight size={16}/></Link>
              <Link to="/contact" className="btn btn-outline">Get Involved</Link>
            </div>
          </div>
          <aside className="pb-sidebar">
            <div className="sidebar-card">
              <h3>Other Programs</h3>
              {otherPrograms.map(p => (
                <Link key={p.id} to={p.path} className="sidebar-link">
                  <span>{p.icon}</span>
                  <div>
                    <p className="sl-name">{p.name}</p>
                    <p className="sl-desc">{p.tagline}</p>
                  </div>
                  <ArrowRight size={14} />
                </Link>
              ))}
            </div>
            <div className="sidebar-donate">
              <h3>Make an Impact</h3>
              <p>Your donation directly supports this program and the students who depend on it.</p>
              <Link to="/donate" className="btn btn-primary" style={{width:'100%',justifyContent:'center'}}>Donate Now</Link>
            </div>
          </aside>
        </div>
      </section>

      <section className="program-cta">
        <div className="container">
          <h2>Ready to Help?</h2>
          <p>Every contribution, large or small, makes a real difference in a student's life.</p>
          <Link to="/donate" className="btn btn-white">Donate to {program.name} <ArrowRight size={16}/></Link>
        </div>
      </section>
    </div>
  )
}
