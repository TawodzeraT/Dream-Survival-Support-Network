import { useState } from 'react'
import { Mail, MapPin, Phone, Clock, CheckCircle } from 'lucide-react'
import './Contact.css'

export default function Contact() {
  const [form, setForm] = useState({ firstName:'', lastName:'', email:'', subject:'general', message:'' })
  const [success, setSuccess] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSuccess(true)
  }

  return (
    <div className="contact-page">
      <div className="contact-hero">
        <div className="container">
          <span className="section-label" style={{color:'rgba(255,255,255,0.6)'}}>Get in Touch</span>
          <h1>Contact Us</h1>
          <p>We'd love to hear from you — whether you want to volunteer, partner, or just say hello.</p>
        </div>
      </div>

      <div className="contact-body container">
        <div className="contact-info">
          <h2>How to Reach Us</h2>
          <div className="info-items">
            <div className="info-item"><Mail size={20}/><div><strong>Email</strong><p>info@dreamsupport.org</p></div></div>
            <div className="info-item"><Phone size={20}/><div><strong>Phone</strong><p>(859) 555-0192</p></div></div>
            <div className="info-item"><MapPin size={20}/><div><strong>Address</strong><p>3888 Winthrop Dr<br/>Lexington, KY 40514</p></div></div>
            <div className="info-item"><Clock size={20}/><div><strong>Hours</strong><p>Mon–Fri: 9am – 5pm ET<br/>Sat: By appointment</p></div></div>
          </div>
          <div className="ways-help">
            <h3>Ways to Help</h3>
            <ul>
              <li>🎁 Donate a refurbished laptop</li>
              <li>🙋 Volunteer at a workshop</li>
              <li>📢 Spread the word on social media</li>
              <li>🤝 Corporate partnership or grant</li>
              <li>🎓 Mentor a student</li>
            </ul>
          </div>
        </div>

        <div className="contact-form-wrap">
          {success ? (
            <div className="form-success">
              <CheckCircle size={48} style={{color:'#22c55e', margin:'0 auto 16px', display:'block'}}/>
              <h2>Message Sent!</h2>
              <p>Thank you for reaching out. We'll get back to you within 1–2 business days.</p>
              <button className="btn btn-primary" onClick={() => { setSuccess(false); setForm({firstName:'',lastName:'',email:'',subject:'general',message:''}) }}>Send Another</button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <h2>Send a Message</h2>
              <div className="form-row">
                <div className="form-group"><label>First Name</label><input value={form.firstName} onChange={e=>setForm({...form,firstName:e.target.value})} placeholder="Jane" required /></div>
                <div className="form-group"><label>Last Name</label><input value={form.lastName} onChange={e=>setForm({...form,lastName:e.target.value})} placeholder="Doe" /></div>
              </div>
              <div className="form-group"><label>Email *</label><input type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="you@example.com" required /></div>
              <div className="form-group">
                <label>Subject</label>
                <select value={form.subject} onChange={e=>setForm({...form,subject:e.target.value})}>
                  <option value="general">General Inquiry</option>
                  <option value="volunteer">Volunteering</option>
                  <option value="donate">Donate Laptops</option>
                  <option value="partner">Partnership</option>
                  <option value="scholarship">Scholarship Info</option>
                  <option value="media">Media / Press</option>
                </select>
              </div>
              <div className="form-group"><label>Message</label><textarea value={form.message} onChange={e=>setForm({...form,message:e.target.value})} rows={5} placeholder="Tell us how we can help or how you'd like to get involved..." /></div>
              <button type="submit" className="btn btn-primary" style={{width:'100%',justifyContent:'center'}}>Send Message</button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
