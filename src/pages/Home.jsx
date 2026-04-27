import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Heart, Monitor, BookOpen, GraduationCap, Users, Leaf } from 'lucide-react'
import ImpactCounter from '../components/ImpactCounter'
import './Home.css'

function AnimatedSection({ children, className = '' }) {
  const ref = useRef(null)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return <div ref={ref} className={`animate-section ${className}`}>{children}</div>
}

const programs = [
  { icon: Monitor, name: 'Digital Learning', desc: 'Refurbished laptops and digital literacy training for students without tech access at home.', path: '/digital-learning', color: '#1a56db' },
  { icon: BookOpen, name: 'Teacher Support', desc: 'Professional development workshops to help educators serve underprivileged students.', path: '/teacher-support', color: '#059669' },
  { icon: GraduationCap, name: 'Scholarships', desc: 'Need-based scholarships for first-generation and survivor students pursuing higher education.', path: '/scholarships', color: '#7c3aed' },
  { icon: Users, name: 'College Readiness', desc: 'SAT prep, essay coaching, and financial aid guidance for first-generation applicants.', path: '/college-readiness', color: '#d97706' },
  { icon: Leaf, name: 'Wellness & Resilience', desc: 'Trauma-informed mental health support and resilience workshops for students facing adversity.', path: '/wellness', color: '#dc2626' },
]

const audiences = [
  { emoji: '📄', label: 'DACA Recipients', desc: 'Students navigating education without full documentation status' },
  { emoji: '🌍', label: 'Immigrant Youth', desc: 'First and second-generation students building new futures' },
  { emoji: '👨‍👩‍👧', label: 'Foster Youth', desc: 'Young people aging out of or currently in the foster care system' },
  { emoji: '💔', label: 'Trauma Survivors', desc: 'Students who have experienced abuse, neglect, or adverse childhood experiences' },
  { emoji: '🎓', label: 'First-Gen Students', desc: 'The first in their family pursuing a college education' },
  { emoji: '💻', label: 'Digital Divide', desc: 'Students without reliable access to devices or the internet' },
]

export default function Home() {
  return (
    <div className="home-page">
      {/* HERO */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-content container">
          <div className="hero-text">
            <span className="section-label" style={{color:'rgba(255,255,255,0.7)'}}>Est. Lexington, KY</span>
            <h1 className="hero-title">
              Empowering <em>Dreamers.</em><br/>
              Supporting <em>Survivors.</em><br/>
              Building <span className="hero-highlight">Futures.</span>
            </h1>
            <p className="hero-subtitle">
              DSSN provides technology, scholarships, and mental health support to underprivileged students — especially DACA recipients, immigrants, foster youth, and trauma survivors.
            </p>
            <div className="hero-btns">
              <Link to="/donate" className="btn btn-primary">Donate Today <ArrowRight size={16}/></Link>
              <Link to="/digital-learning" className="btn btn-white">Our Programs</Link>
            </div>
          </div>
          <div className="hero-cards">
            <div className="hero-card">
              <span className="hc-icon">💻</span>
              <strong>847+</strong>
              <span>Laptops Donated</span>
            </div>
            <div className="hero-card">
              <span className="hc-icon">🎓</span>
              <strong>2,400+</strong>
              <span>Students Reached</span>
            </div>
            <div className="hero-card">
              <span className="hc-icon">⭐</span>
              <strong>130</strong>
              <span>Scholarships</span>
            </div>
          </div>
        </div>
      </section>

      {/* IMPACT COUNTER */}
      <ImpactCounter />

      {/* WHO WE ARE */}
      <AnimatedSection>
        <section className="who-we-are">
          <div className="container wwa-grid">
            <div className="wwa-visual">
              <div className="wwa-badge wwa-badge-1"><Heart size={16} fill="currentColor"/> Founded with Purpose</div>
              <div className="wwa-badge wwa-badge-2">🏆 100% to Programs</div>
              <div className="wwa-img-box">
                <div className="wwa-placeholder">
                  <span>🌟</span>
                  <p>Changing Lives<br/>Since Our Founding</p>
                </div>
              </div>
            </div>
            <div className="wwa-text">
              <span className="section-label">Who We Are</span>
              <h2 className="section-title">A Community Built on Second Chances</h2>
              <p className="section-subtitle">DSSN was born from personal experience. Our founder, Dr. Amara Osei, navigated higher education as an immigrant and first-generation student — and knows firsthand how transformative the right support can be.</p>
              <p style={{color:'var(--text-secondary)',marginTop:'16px',lineHeight:'1.8'}}>Today, we serve hundreds of students each year across Central Kentucky — providing technology, scholarships, counseling, and the mentorship that can change the trajectory of a young person's life.</p>
              <div style={{display:'flex',gap:'12px',marginTop:'28px',flexWrap:'wrap'}}>
                <Link to="/team" className="btn btn-primary">Meet Our Team</Link>
                <Link to="/contact" className="btn btn-outline">Get Involved</Link>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* PROGRAMS */}
      <AnimatedSection>
        <section className="programs-section">
          <div className="container">
            <div className="section-header">
              <span className="section-label">What We Do</span>
              <h2 className="section-title">Five Programs. One Mission.</h2>
              <p className="section-subtitle">Each program addresses a specific barrier that prevents underserved students from reaching their full potential.</p>
            </div>
            <div className="programs-grid">
              {programs.map(p => (
                <Link key={p.path} to={p.path} className="program-card">
                  <div className="pc-icon" style={{background:`${p.color}18`,color:p.color}}>
                    <p.icon size={24}/>
                  </div>
                  <h3>{p.name}</h3>
                  <p>{p.desc}</p>
                  <span className="pc-link" style={{color:p.color}}>Learn more →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* WHO WE SERVE */}
      <AnimatedSection>
        <section className="serve-section">
          <div className="container">
            <div className="section-header">
              <span className="section-label">Who We Serve</span>
              <h2 className="section-title">Every Student Deserves a Champion</h2>
              <p className="section-subtitle">We focus on students whose circumstances have historically limited their access to education and opportunity.</p>
            </div>
            <div className="serve-grid">
              {audiences.map(a => (
                <div key={a.label} className="serve-card">
                  <span className="serve-emoji">{a.emoji}</span>
                  <h4>{a.label}</h4>
                  <p>{a.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* CTA BANNER */}
      <section className="cta-banner">
        <div className="container cta-inner">
          <div>
            <h2>Ready to Make a Difference?</h2>
            <p>Your donation of $40 provides a laptop. Your $750 funds an entire teacher workshop. Every dollar goes to our students.</p>
          </div>
          <div style={{display:'flex',gap:'12px',flexWrap:'wrap'}}>
            <Link to="/donate" className="btn btn-white">Donate Now <ArrowRight size={16}/></Link>
            <Link to="/contact" className="btn btn-outline" style={{borderColor:'rgba(255,255,255,0.5)',color:'rgba(255,255,255,0.9)'}}>Volunteer</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
