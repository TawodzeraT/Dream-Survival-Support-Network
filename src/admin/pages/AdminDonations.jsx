import { useState } from 'react';
import { useSite } from '../../context/SiteContext';
import { Monitor, Users, BookOpen, GraduationCap, Save, RotateCcw, TrendingUp } from 'lucide-react';
import './AdminDonations.css';

const TIERS = [
  { label: '$40 Donation', desc: 'Funds 1 laptop for a student', laptops: 1 },
  { label: '$100 Donation', desc: 'Funds 2 laptops for students', laptops: 2 },
  { label: '$600 Donation', desc: 'Bulk shipment of laptops', laptops: 15 },
  { label: '$750 Donation', desc: 'Funds a full teacher workshop', laptops: 0, workshops: 1 },
];

export default function AdminDonations() {
  const { counter, updateCounter } = useSite();
  const [values, setValues] = useState({ ...counter });
  const [saved, setSaved] = useState(false);

  const handleChange = (field, val) => {
    const n = parseInt(val) || 0;
    setValues(v => ({ ...v, [field]: n }));
  };

  const handleSave = () => {
    updateCounter(values);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const applyTier = (tier) => {
    setValues(v => ({
      ...v,
      laptops: v.laptops + (tier.laptops || 0),
      workshops: v.workshops + (tier.workshops || 0),
    }));
  };

  const fields = [
    { key: 'laptops', label: 'Laptops Donated', icon: Monitor, color: '#1a56db' },
    { key: 'students', label: 'Students Reached', icon: Users, color: '#059669' },
    { key: 'workshops', label: 'Workshops Held', icon: BookOpen, color: '#d97706' },
    { key: 'scholarships', label: 'Scholarships Given', icon: GraduationCap, color: '#7c3aed' },
  ];

  return (
    <div className="admin-donations">
      <div className="admin-page-header">
        <div>
          <h1>Impact Counter</h1>
          <p>Update the live numbers displayed across the website</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn btn-outline" onClick={() => setValues({ ...counter })}><RotateCcw size={15}/> Reset</button>
          <button className="btn btn-primary" onClick={handleSave}><Save size={15}/> {saved ? '✓ Saved!' : 'Save Changes'}</button>
        </div>
      </div>

      {saved && <div className="success-banner">✓ Impact numbers updated! Changes are now live on the website.</div>}

      <div className="counter-grid">
        {fields.map(f => (
          <div key={f.key} className="counter-card admin-card">
            <div className="counter-card-head">
              <div className="cc-icon" style={{ background: `${f.color}18`, color: f.color }}>
                <f.icon size={22}/>
              </div>
              <div>
                <p className="cc-label">{f.label}</p>
                <p className="cc-current">Current: {counter[f.key].toLocaleString()}</p>
              </div>
            </div>
            <div className="cc-input-wrap">
              <input
                type="number" min="0"
                value={values[f.key]}
                onChange={e => handleChange(f.key, e.target.value)}
                className="cc-input"
              />
              <div className="cc-nudge">
                <button onClick={() => setValues(v => ({...v, [f.key]: v[f.key]+1}))}>+1</button>
                <button onClick={() => setValues(v => ({...v, [f.key]: v[f.key]+10}))}>+10</button>
                <button onClick={() => setValues(v => ({...v, [f.key]: Math.max(0, v[f.key]-1)}))}>-1</button>
              </div>
            </div>
            {values[f.key] !== counter[f.key] && (
              <p className="cc-diff" style={{ color: values[f.key] > counter[f.key] ? '#059669' : '#dc2626' }}>
                <TrendingUp size={12}/> {values[f.key] > counter[f.key] ? '+' : ''}{values[f.key] - counter[f.key]}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="admin-card tier-section">
        <h3>Quick Add by Donation Tier</h3>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '16px', fontSize: '0.88rem' }}>
          Click a tier to add its impact to the counter above — don't forget to save!
        </p>
        <div className="tier-grid">
          {TIERS.map(t => (
            <button key={t.label} className="tier-card" onClick={() => applyTier(t)}>
              <span className="tier-label">{t.label}</span>
              <span className="tier-desc">{t.desc}</span>
              <span className="tier-impact">
                {t.laptops > 0 && `+${t.laptops} laptop${t.laptops > 1 ? 's' : ''}`}
                {t.workshops > 0 && `+${t.workshops} workshop`}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="admin-card">
        <h3>Donation Tier Reference</h3>
        <table className="admin-table">
          <thead><tr><th>Amount</th><th>Impact</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td><strong>$40</strong></td><td>1 Laptop</td><td>Provides one refurbished laptop to a student in need</td></tr>
            <tr><td><strong>$100</strong></td><td>2 Laptops</td><td>Equips two students with personal devices for digital learning</td></tr>
            <tr><td><strong>$600</strong></td><td>Bulk Shipment</td><td>Covers shipping and logistics for a full laptop distribution event</td></tr>
            <tr><td><strong>$750</strong></td><td>Teacher Workshop</td><td>Funds a full professional development workshop for educators</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
