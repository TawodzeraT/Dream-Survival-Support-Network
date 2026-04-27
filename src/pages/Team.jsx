import { useSite } from '../context/SiteContext'
import { Mail } from 'lucide-react'
import { Link } from 'react-router-dom'
import './Team.css'

export default function Team() {
  const { team } = useSite()
  const founder = team.find(m => m.role === 'founder')
  const board = team.filter(m => m.role === 'board')
  const staff = team.filter(m => m.role === 'staff')

  const initials = (name) => name.split(' ').map(n=>n[0]).join('').toUpperCase().slice(0,2)

  const MemberCard = ({ member }) => (
    <div className="member-card">
      <div className="member-avatar">
        {member.image ? <img src={member.image} alt={member.name} /> : <span>{initials(member.name)}</span>}
      </div>
      <h3>{member.name}</h3>
      <p className="member-title">{member.title}</p>
      {member.bio && <p className="member-bio">{member.bio}</p>}
      {member.email && <a href={`mailto:${member.email}`} className="member-email"><Mail size={14}/> {member.email}</a>}
    </div>
  )

  return (
    <div className="team-page">
      <div className="team-hero">
        <div className="container">
          <span className="section-label" style={{color:'rgba(255,255,255,0.6)'}}>Our People</span>
          <h1>The Team Behind DSSN</h1>
          <p>Passionate educators, advocates, and community leaders committed to student success.</p>
        </div>
      </div>

      {founder && (
        <section className="founder-section">
          <div className="container">
            <span className="section-label">Founder</span>
            <div className="founder-card">
              <div className="founder-avatar">
                {founder.image ? <img src={founder.image} alt={founder.name}/> : <span>{initials(founder.name)}</span>}
              </div>
              <div className="founder-info">
                <h2>{founder.name}</h2>
                <p className="founder-title">{founder.title}</p>
                <p className="founder-bio">{founder.bio}</p>
                {founder.email && <a href={`mailto:${founder.email}`} className="btn btn-outline"><Mail size={16}/> {founder.email}</a>}
              </div>
            </div>
          </div>
        </section>
      )}

      {board.length > 0 && (
        <section className="team-section">
          <div className="container">
            <span className="section-label">Board of Directors</span>
            <h2 className="section-title">Our Leadership</h2>
            <div className="team-grid">{board.map(m => <MemberCard key={m.id} member={m}/>)}</div>
          </div>
        </section>
      )}

      {staff.length > 0 && (
        <section className="team-section team-section-alt">
          <div className="container">
            <span className="section-label">Staff</span>
            <h2 className="section-title">Our Team</h2>
            <div className="team-grid">{staff.map(m => <MemberCard key={m.id} member={m}/>)}</div>
          </div>
        </section>
      )}

      <section className="join-section">
        <div className="container join-inner">
          <h2>Join Our Mission</h2>
          <p>We're always looking for passionate volunteers, mentors, and partners.</p>
          <Link to="/contact" className="btn btn-white">Get Involved</Link>
        </div>
      </section>
    </div>
  )
}
