import { useLocation, Link, useParams } from 'react-router-dom'
import { useSite } from '../context/SiteContext'
import { ArrowLeft } from 'lucide-react'

function slugify(title) { return title.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'') }

export default function BlogPost() {
  const location = useLocation()
  const { slug } = useParams()
  const { posts } = useSite()
  const post = location.state?.post || posts.find(p => slugify(p.title) === slug)

  if (!post) return (
    <div className="container" style={{padding:'120px 24px', textAlign:'center'}}>
      <h1>Post not found</h1>
      <Link to="/blog" className="btn btn-primary" style={{marginTop:'20px'}}>Back to Blog</Link>
    </div>
  )

  return (
    <div style={{paddingTop:'80px'}}>
      <div style={{background:'linear-gradient(135deg,#050d1a,#1a3a6b)',padding:'80px 0 60px',color:'#fff',textAlign:'center'}}>
        <div className="container">
          <span style={{display:'inline-block',padding:'4px 12px',borderRadius:'50px',background:'rgba(255,255,255,0.15)',fontSize:'0.78rem',fontWeight:700,marginBottom:'16px',textTransform:'uppercase',letterSpacing:'0.05em'}}>{post.category}</span>
          <h1 style={{fontSize:'clamp(1.8rem,5vw,3rem)',maxWidth:'720px',margin:'0 auto 16px'}}>{post.title}</h1>
          <p style={{color:'rgba(255,255,255,0.6)',fontSize:'0.9rem'}}>{post.author} · {post.date} · {post.readTime}</p>
        </div>
      </div>
      <div className="container" style={{maxWidth:'760px',padding:'60px 24px'}}>
        <Link to="/blog" style={{display:'inline-flex',alignItems:'center',gap:'6px',color:'var(--blue-primary)',textDecoration:'none',fontWeight:600,marginBottom:'36px',fontSize:'0.9rem'}}>
          <ArrowLeft size={16}/> Back to Blog
        </Link>
        {post.content.split('\n\n').map((para, i) => (
          para ? <p key={i} style={{color:'var(--text-secondary)',lineHeight:'1.85',marginBottom:'20px',fontSize:'1.05rem'}}>{para}</p> : <br key={i}/>
        ))}
        <div style={{marginTop:'48px',padding:'28px',background:'var(--blue-light)',borderRadius:'14px',border:'1px solid #bfdbfe'}}>
          <h3 style={{marginBottom:'8px',color:'var(--blue-primary)'}}>Support DSSN</h3>
          <p style={{color:'var(--text-secondary)',marginBottom:'16px'}}>Stories like this are made possible by donors like you.</p>
          <Link to="/donate" className="btn btn-primary">Donate Today</Link>
        </div>
      </div>
    </div>
  )
}
