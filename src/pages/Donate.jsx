import { useState } from 'react'
import { Monitor, Heart, BookOpen, Package, CreditCard, CheckCircle } from 'lucide-react'
import { DONATION_TIERS } from '../data/siteData'
import './Donate.css'

const ICONS = { '💻': Monitor, '🤝': Heart, '📦': Package, '📚': BookOpen }

export default function Donate() {
  const [amount, setAmount] = useState(40)
  const [custom, setCustom] = useState('')
  const [frequency, setFrequency] = useState('once')
  const [payment, setPayment] = useState('card')
  const [form, setForm] = useState({ firstName:'', lastName:'', email:'', card:'', expiry:'', cvv:'' })
  const [success, setSuccess] = useState(false)

  const finalAmount = custom ? parseInt(custom) || 0 : amount

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.firstName || !form.email) return
    setSuccess(true)
  }

  if (success) return (
    <div className="donate-page donate-success-page">
      <div className="success-box">
        <div className="success-icon"><CheckCircle size={48} /></div>
        <h1>Thank You!</h1>
        <p>Your donation of <strong>${finalAmount}</strong> has been received. A confirmation will be sent to {form.email}.</p>
        <p className="tax-note">DSSN is a 501(c)(3) nonprofit. Your donation is tax-deductible.</p>
        <button className="btn btn-primary" onClick={() => { setSuccess(false); setForm({ firstName:'', lastName:'', email:'', card:'', expiry:'', cvv:'' }) }}>Make Another Donation</button>
      </div>
    </div>
  )

  return (
    <div className="donate-page">
      <div className="donate-hero">
        <div className="container">
          <span className="section-label" style={{color:'rgba(255,255,255,0.6)'}}>Give Today</span>
          <h1>Make a Real Difference</h1>
          <p>100% of your donation goes directly to student programs.</p>
        </div>
      </div>

      <div className="donate-body container">
        {/* LEFT: Tiers */}
        <div className="donate-left">
          <h2>Choose Your Impact</h2>
          <div className="tiers-grid">
            {DONATION_TIERS.map(t => (
              <button key={t.amount} className={`tier-btn ${amount === t.amount && !custom ? 'active' : ''}`}
                onClick={() => { setAmount(t.amount); setCustom('') }}>
                <span className="tier-emoji">{t.icon}</span>
                <span className="tier-name">{t.label}</span>
                <span className="tier-amount">${t.amount}</span>
                <span className="tier-impact-text">{t.impact}</span>
              </button>
            ))}
          </div>
          <div className="quick-amounts">
            {[20, 50, 100, 250, 500].map(a => (
              <button key={a} className={`qa-btn ${amount === a && !custom ? 'active' : ''}`}
                onClick={() => { setAmount(a); setCustom('') }}>${a}</button>
            ))}
          </div>
          <div className="custom-amount">
            <label>Custom Amount</label>
            <div className="custom-input-wrap">
              <span>$</span>
              <input type="number" placeholder="Enter amount" value={custom}
                onChange={e => { setCustom(e.target.value); setAmount(0) }} min="1" />
            </div>
          </div>

          <div className="impact-bars">
            <h3>Your Impact at ${finalAmount}</h3>
            {[
              { label: 'Goes to Students', pct: 85, color: '#1a56db' },
              { label: 'Program Overhead', pct: 10, color: '#059669' },
              { label: 'Admin', pct: 5, color: '#d97706' },
            ].map(b => (
              <div key={b.label} className="impact-bar-item">
                <div className="ib-label"><span>{b.label}</span><span>{b.pct}%</span></div>
                <div className="ib-track"><div className="ib-fill" style={{width:`${b.pct}%`, background:b.color}} /></div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: Monitor + Form */}
        <div className="donate-right">
          <div className="monitor-wrap">
            <div className="monitor-bezel">
              <div className="monitor-screen">
                <div className="form-screen-header">
                  <div className="screen-dots"><span/><span/><span/></div>
                  <span>Secure Donation</span>
                  <span style={{fontSize:'0.7rem', opacity:0.5}}>🔒 SSL</span>
                </div>

                <div className="donation-summary">
                  <span className="ds-label">Donating</span>
                  <span className="ds-amount">${finalAmount}</span>
                </div>

                <div className="freq-tabs">
                  {['once','monthly','annually'].map(f => (
                    <button key={f} className={`freq-tab ${frequency === f ? 'active' : ''}`} onClick={() => setFrequency(f)}>
                      {f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                  ))}
                </div>

                <div className="pay-tabs">
                  {['card','paypal','square'].map(p => (
                    <button key={p} className={`pay-tab ${payment === p ? 'active' : ''}`} onClick={() => setPayment(p)}>
                      {p === 'card' ? <CreditCard size={14}/> : null}
                      {p.charAt(0).toUpperCase() + p.slice(1)}
                    </button>
                  ))}
                </div>

                <form onSubmit={handleSubmit} className="donate-form">
                  <div className="form-row-2">
                    <div className="form-group">
                      <label>First Name</label>
                      <input value={form.firstName} onChange={e=>setForm({...form,firstName:e.target.value})} placeholder="Jane" required />
                    </div>
                    <div className="form-group">
                      <label>Last Name</label>
                      <input value={form.lastName} onChange={e=>setForm({...form,lastName:e.target.value})} placeholder="Doe" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="you@example.com" required />
                  </div>
                  {payment === 'card' && <>
                    <div className="form-group">
                      <label>Card Number</label>
                      <input value={form.card} onChange={e=>setForm({...form,card:e.target.value})} placeholder="1234 5678 9012 3456" />
                    </div>
                    <div className="form-row-2">
                      <div className="form-group">
                        <label>Expiry</label>
                        <input value={form.expiry} onChange={e=>setForm({...form,expiry:e.target.value})} placeholder="MM/YY" />
                      </div>
                      <div className="form-group">
                        <label>CVV</label>
                        <input value={form.cvv} onChange={e=>setForm({...form,cvv:e.target.value})} placeholder="123" />
                      </div>
                    </div>
                  </>}
                  <button type="submit" className="btn btn-primary donate-submit">
                    Donate ${finalAmount} {frequency !== 'once' ? `/ ${frequency}` : ''}
                  </button>
                </form>
              </div>
            </div>
            <div className="monitor-neck" />
            <div className="monitor-base" />
          </div>
        </div>
      </div>
    </div>
  )
}
