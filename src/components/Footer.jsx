import { Link } from 'react-router-dom'
import { Mail, MapPin, Phone, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-main container">
        <div className="footer-brand">
          <div className="footer-logo">
            <span className="logo-mark">D</span>
            <span>DSSN</span>
          </div>
          <p>Empowering dreamers. Supporting survivors. Building futures — one student at a time.</p>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook"><Facebook size={18}/></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={18}/></a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter"><Twitter size={18}/></a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={18}/></a>
          </div>
        </div>

        <div className="footer-col">
          <h4>Programs</h4>
          <Link to="/digital-learning">Digital Learning</Link>
          <Link to="/teacher-support">Teacher Support</Link>
          <Link to="/scholarships">Scholarships</Link>
          <Link to="/college-readiness">College Readiness</Link>
          <Link to="/wellness">Wellness & Resilience</Link>
        </div>

        <div className="footer-col">
          <h4>Organization</h4>
          <Link to="/team">Our Team</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/gallery">Gallery</Link>
          <Link to="/contact">Contact Us</Link>
          <Link to="/donate">Donate</Link>
        </div>

        <div className="footer-col footer-contact">
          <h4>Contact</h4>
          <p><Mail size={15}/> info@dreamsupport.org</p>
          <p><Phone size={15}/> (859) 555-0192</p>
          <p><MapPin size={15}/> 3888 Winthrop Dr<br/>Lexington, KY 40514</p>
          <Link to="/donate" className="btn btn-primary footer-cta">Donate Now</Link>
        </div>
      </div>
      <div className="footer-bottom container">
        <p>© {new Date().getFullYear()} Dreamers and Survivors Support Network. All rights reserved.</p>
        <p>501(c)(3) Nonprofit Organization</p>
      </div>
    </footer>
  )
}
