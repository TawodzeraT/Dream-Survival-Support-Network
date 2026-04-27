import { useState } from 'react';
import { useSite } from '../../context/SiteContext';
import { Edit2, Save, X, ChevronDown, ChevronUp } from 'lucide-react';
import './AdminPrograms.css';

export default function AdminPrograms() {
  const { programs, updateProgram } = useSite();
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});
  const [expanded, setExpanded] = useState(null);
  const [saved, setSaved] = useState(false);

  const openEdit = (p) => { setForm({ ...p }); setEditing(p.id); };
  const close = () => { setEditing(null); setForm({}); };

  const save = () => {
    updateProgram(editing, form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
    close();
  };

  const updateStat = (idx, field, val) => {
    const stats = [...form.stats];
    stats[idx] = { ...stats[idx], [field]: val };
    setForm({ ...form, stats });
  };

  return (
    <div className="admin-programs">
      <div className="admin-page-header">
        <div>
          <h1>Program Pages</h1>
          <p>Edit content for each program page</p>
        </div>
      </div>

      {saved && <div className="success-banner">✓ Program updated! Changes are live on the website.</div>}

      {!editing && (
        <div className="programs-list">
          {programs.map(p => (
            <div key={p.id} className="program-admin-card admin-card">
              <div className="pac-header" onClick={() => setExpanded(expanded === p.id ? null : p.id)}>
                <div className="pac-title-wrap">
                  <div className="pac-icon">{p.icon}</div>
                  <div>
                    <h3>{p.name}</h3>
                    <p className="pac-tagline">{p.tagline}</p>
                  </div>
                </div>
                <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
                  <button className="btn btn-outline btn-sm" onClick={e => { e.stopPropagation(); openEdit(p); }}>
                    <Edit2 size={14}/> Edit
                  </button>
                  {expanded === p.id ? <ChevronUp size={18}/> : <ChevronDown size={18}/>}
                </div>
              </div>
              {expanded === p.id && (
                <div className="pac-body">
                  <p><strong>Description:</strong> {p.description}</p>
                  <p><strong>Details:</strong> {p.details}</p>
                  <div className="pac-stats">
                    {p.stats.map((s, i) => (
                      <div key={i} className="pac-stat">
                        <span className="pac-stat-val">{s.value}</span>
                        <span className="pac-stat-label">{s.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {editing && (
        <div className="program-editor admin-card">
          <div className="editor-header">
            <h2>Edit: {form.name}</h2>
            <div style={{ display:'flex', gap:'10px' }}>
              <button className="btn btn-primary" onClick={save}><Save size={15}/> Save</button>
              <button className="icon-btn" onClick={close}><X size={18}/></button>
            </div>
          </div>
          <div className="prog-form">
            <div className="form-row">
              <div className="form-group">
                <label>Program Name</label>
                <input value={form.name || ''} onChange={e => setForm({...form, name: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Tagline</label>
                <input value={form.tagline || ''} onChange={e => setForm({...form, tagline: e.target.value})} />
              </div>
            </div>
            <div className="form-group">
              <label>Short Description</label>
              <textarea value={form.description || ''} onChange={e => setForm({...form, description: e.target.value})} rows={3} />
            </div>
            <div className="form-group">
              <label>Detailed Description</label>
              <textarea value={form.details || ''} onChange={e => setForm({...form, details: e.target.value})} rows={6} />
            </div>
            <div className="form-group">
              <label>Impact Statement</label>
              <input value={form.impact || ''} onChange={e => setForm({...form, impact: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Stats</label>
              <div className="stat-editors">
                {(form.stats || []).map((s, i) => (
                  <div key={i} className="stat-edit-row">
                    <input value={s.value} onChange={e => updateStat(i, 'value', e.target.value)} placeholder="Value (e.g. 847+)" />
                    <input value={s.label} onChange={e => updateStat(i, 'label', e.target.value)} placeholder="Label" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
