import { useState, useEffect, useRef } from 'react'
import { useSite } from '../context/SiteContext'
import './ImpactCounter.css'

function useCountUp(target, duration = 2000, started = false) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!started) return
    let start = 0
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) { setValue(target); clearInterval(timer) }
      else setValue(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [target, duration, started])
  return value
}

export default function ImpactCounter() {
  const { counter } = useSite()
  const [started, setStarted] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStarted(true); obs.disconnect() } }, { threshold: 0.3 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  const laptops = useCountUp(counter.laptops, 2000, started)
  const students = useCountUp(counter.students, 2200, started)
  const workshops = useCountUp(counter.workshops, 1800, started)
  const scholarships = useCountUp(counter.scholarships, 2000, started)

  const stats = [
    { value: laptops, suffix: '+', label: 'Laptops Donated', icon: '💻' },
    { value: students, suffix: '+', label: 'Students Reached', icon: '🎓' },
    { value: workshops, suffix: '', label: 'Workshops Held', icon: '📚' },
    { value: scholarships, suffix: '', label: 'Scholarships Given', icon: '⭐' },
  ]

  return (
    <section className="counter-section" ref={ref}>
      <div className="container">
        <div className="counter-header">
          <span className="section-label">Our Impact</span>
          <h2 className="section-title">Numbers That Tell Our Story</h2>
          <p className="section-subtitle">Every statistic represents a real student whose life has been changed by your generosity.</p>
        </div>
        <div className="counter-screen">
          <div className="screen-bezel">
            <div className="screen-scanlines" />
            <div className="screen-content">
              <div className="screen-header">
                <span className="screen-dot red"/><span className="screen-dot yellow"/><span className="screen-dot green"/>
                <span className="screen-title">DSSN_IMPACT.exe</span>
              </div>
              <div className="counter-grid">
                {stats.map((s, i) => (
                  <div key={i} className="counter-item">
                    <div className="counter-icon">{s.icon}</div>
                    <div className="counter-number">{s.value.toLocaleString()}{s.suffix}</div>
                    <div className="counter-label">{s.label}</div>
                  </div>
                ))}
              </div>
              <div className="screen-cursor">█</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
