import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSite } from '../context/SiteContext'
import { ArrowRight } from 'lucide-react'
import './Blog.css'

const CATS = ['All', 'Impact', 'Student Stories', 'News', 'Programs']

function slugify(title) { return title.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'') }

export default function Blog() {
  const { posts } = useSite()
  const [cat, setCat] = useState('All')
  const filtered = cat === 'All' ? posts : posts.filter(p => p.category === cat)
  const [featured, ...rest] = filtered

  return (
    <div className="blog-page">
      <div className="blog-hero">
        <div className="container">
          <span className="section-label" style={{color:'rgba(255,255,255,0.6)'}}>Stories & Updates</span>
          <h1>Our Blog</h1>
          <p>Impact stories, news, and insights from the DSSN community.</p>
        </div>
      </div>

      <div className="blog-controls container">
        {CATS.map(c => (
          <button key={c} className={`filter-btn ${cat === c ? 'active' : ''}`} onClick={() => setCat(c)}>{c}</button>
        ))}
      </div>

      {featured && (
        <section className="featured-post container">
          <Link to={`/blog/${slugify(featured.title)}`} className="featured-card" state={{ post: featured }}>
            <div className="featured-img">
              <div className="featured-placeholder">{featured.category === 'Student Stories' ? '🎓' : featured.category === 'News' ? '📰' : '💡'}</div>
            </div>
            <div className="featured-text">
              <span className="post-badge">{featured.category}</span>
              <h2>{featured.title}</h2>
              <p>{featured.excerpt}</p>
              <div className="post-meta">
                <span>{featured.author}</span>
                <span>·</span>
                <span>{featured.date}</span>
                <span>·</span>
                <span>{featured.readTime}</span>
              </div>
              <span className="read-link">Read Story <ArrowRight size={14}/></span>
            </div>
          </Link>
        </section>
      )}

      {rest.length > 0 && (
        <section className="posts-grid-section container">
          <div className="posts-grid">
            {rest.map(p => (
              <Link key={p.id} to={`/blog/${slugify(p.title)}`} className="post-card" state={{ post: p }}>
                <div className="post-img">
                  <span>{p.category === 'Student Stories' ? '🎓' : p.category === 'News' ? '📰' : '💡'}</span>
                </div>
                <div className="post-body">
                  <span className="post-badge">{p.category}</span>
                  <h3>{p.title}</h3>
                  <p>{p.excerpt}</p>
                  <div className="post-meta">
                    <span>{p.author}</span><span>·</span><span>{p.readTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {filtered.length === 0 && (
        <div className="container" style={{padding:'60px 0', textAlign:'center', color:'var(--text-secondary)'}}>
          No posts in this category yet.
        </div>
      )}
    </div>
  )
}
