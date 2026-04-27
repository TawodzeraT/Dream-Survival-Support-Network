import { useState, useEffect, useCallback } from 'react'
import { useSite } from '../context/SiteContext'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import './Gallery.css'

const CATS = ['All', 'Workshop', 'Students', 'Tech Donation', 'Graduation', 'Community']

export default function Gallery() {
  const { gallery } = useSite()
  const [cat, setCat] = useState('All')
  const [lightbox, setLightbox] = useState(null)

  const filtered = cat === 'All' ? gallery : gallery.filter(g => g.category === cat)

  const navigate = useCallback((dir) => {
    setLightbox(prev => {
      const idx = filtered.findIndex(g => g.id === prev.id)
      const next = (idx + dir + filtered.length) % filtered.length
      return filtered[next]
    })
  }, [filtered])

  useEffect(() => {
    const onKey = (e) => {
      if (!lightbox) return
      if (e.key === 'ArrowLeft') navigate(-1)
      if (e.key === 'ArrowRight') navigate(1)
      if (e.key === 'Escape') setLightbox(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox, navigate])

  return (
    <div className="gallery-page">
      <div className="gallery-hero">
        <div className="container">
          <span className="section-label" style={{color:'rgba(255,255,255,0.6)'}}>Our Work</span>
          <h1>Gallery</h1>
          <p>Photos from our programs, events, and the students we serve.</p>
        </div>
      </div>

      <div className="gallery-controls">
        <div className="container">
          {CATS.map(c => (
            <button key={c} className={`filter-btn ${cat === c ? 'active' : ''}`} onClick={() => setCat(c)}>{c}</button>
          ))}
        </div>
      </div>

      <section className="gallery-grid-section">
        <div className="container">
          <div className="gallery-grid">
            {filtered.map(item => (
              <div key={item.id} className="gallery-item" onClick={() => setLightbox(item)}
                style={{background: item.color || '#1a3a6b'}}>
                <div className="gallery-placeholder">
                  {item.emoji || '📷'}
                  <span>{item.category}</span>
                </div>
                <div className="gallery-overlay">
                  <span className="gallery-overlay-icon">🔍</span>
                  <p>{item.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {lightbox && (
        <div className="lightbox-overlay" onClick={() => setLightbox(null)}>
          <div className="lightbox-content" onClick={e => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setLightbox(null)}><X size={24}/></button>
            <div className="lightbox-img-wrap" style={{background: lightbox.color || '#1a3a6b', fontSize:'6rem'}}>
              {lightbox.emoji || '📷'}
            </div>
            <div className="lightbox-caption">
              <h3>{lightbox.title}</h3>
              <p>{lightbox.description}</p>
            </div>
          </div>
          <button className="lightbox-nav lightbox-prev" onClick={e=>{e.stopPropagation();navigate(-1)}}><ChevronLeft size={22}/></button>
          <button className="lightbox-nav lightbox-next" onClick={e=>{e.stopPropagation();navigate(1)}}><ChevronRight size={22}/></button>
          <div className="lightbox-counter">
            {filtered.findIndex(g=>g.id===lightbox.id)+1} / {filtered.length}
          </div>
        </div>
      )}
    </div>
  )
}
