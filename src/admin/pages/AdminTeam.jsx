import { useState } from 'react';
import { useSite } from '../../context/SiteContext';
import { Plus, Edit2, Trash2, X, Save } from 'lucide-react';
import './AdminTeam.css';

const EMPTY = { name: '', title: '', bio: '', role: 'staff', image: '', email: '' };
const ROLES = ['founder', 'board', 'staff'];

export default function AdminTeam() {
  const { team, addTeamMember, updateTeamMember, deleteTeamMember } = useSite();
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const openNew = () => { setForm(EMPTY); setEditing('new'); };
  const openEdit = (m) => { setForm({ ...m }); setEditing(m.id); };
  const close = () => { setEditing(null); setForm(EMPTY); };

  const save = () => {
    if (!form.name.trim()) return;
    if (editing === 'new') addTeamMember({ ...form, id: Date.now() });
    else updateTeamMember(editing, form);
    close();
  };

  const getInitials = (name) => name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <div className="admin-team">
      <div className="admin-page-header">
        <div>
          <h1>Team Members</h1>
          <p>{team.length} members</p>
        </div>
        <button className="btn btn-primary" onClick={openNew}><Plus size={16}/> Add Member</button>
      </div>

      {!editing && (
        <div className="team-admin-grid">
          {team.map(m => (
            <div key={m.id} className="team-admin-card admin-card">
              <div className="tac-avatar">{getInitials(m.name)}</div>
              <div className="tac-info">
                <h3>{m.name}</h3>
                <p className="tac-title">{m.title}</p>
                <span className={`badge badge-${m.role}`}>{m.role}</span>
              </div>
              <div className="tac-actions">
                <button className="icon-btn edit" onClick={() => openEdit(m)}><Edit2 size={14}/></button>
                <button className="icon-btn del" onClick={() => setConfirmDelete(m.id)}><Trash2 size={14}/></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editing && (
        <div className="team-editor admin-card">
          <div className="editor-header">
            <h2>{editing === 'new' ? 'Add Member' : 'Edit Member'}</h2>
            <div style={{ display:'flex', gap:'10px' }}>
              <button className="btn btn-primary" onClick={save}><Save size={15}/> Save</button>
              <button className="icon-btn" onClick={close}><X size={18}/></button>
            </div>
          </div>
          <div className="team-form">
            <div className="form-row">
              <div className="form-group">
                <label>Full Name *</label>
                <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Full name" />
              </div>
              <div className="form-group">
                <label>Role</label>
                <select value={form.role} onChange={e => setForm({...form, role: e.target.value})}>
                  {ROLES.map(r => <option key={r}>{r}</option>)}
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Title / Position</label>
              <input value={form.title} onChange={e => setForm({...form, title: e.target.value})} placeholder="e.g. Executive Director, Board Member" />
            </div>
            <div className="form-group">
              <label>Email (optional)</label>
              <input value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="email@example.com" type="email" />
            </div>
            <div className="form-group">
              <label>Bio</label>
              <textarea value={form.bio} onChange={e => setForm({...form, bio: e.target.value})} rows={4} placeholder="Short biography..." />
            </div>
            <div className="form-group">
              <label>Photo URL (optional)</label>
              <input value={form.image} onChange={e => setForm({...form, image: e.target.value})} placeholder="https://..." />
            </div>
          </div>
        </div>
      )}

      {confirmDelete && (
        <div className="modal-overlay">
          <div className="modal-box">
            <Trash2 size={32} style={{color:'#dc2626',margin:'0 auto 12px',display:'block'}} />
            <h3>Remove team member?</h3>
            <p>This cannot be undone.</p>
            <div className="modal-btns">
              <button className="btn btn-outline" onClick={() => setConfirmDelete(null)}>Cancel</button>
              <button className="btn" style={{background:'#dc2626',color:'#fff'}} onClick={() => { deleteTeamMember(confirmDelete); setConfirmDelete(null); }}>Remove</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
