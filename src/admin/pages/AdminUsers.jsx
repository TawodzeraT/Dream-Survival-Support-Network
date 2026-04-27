import { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { Plus, Trash2, X, Shield, Eye, EyeOff } from 'lucide-react';
import './AdminUsers.css';

const EMPTY = { username: '', password: '', role: 'editor' };
const ROLES = ['admin', 'editor'];

export default function AdminUsers() {
  const { users, addUser, deleteUser, currentUser } = useAdmin();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY);
  const [showPw, setShowPw] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const save = () => {
    setError('');
    if (!form.username.trim() || !form.password.trim()) { setError('All fields required.'); return; }
    if (users.find(u => u.username === form.username)) { setError('Username already exists.'); return; }
    if (form.password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    addUser({ ...form, id: Date.now() });
    setForm(EMPTY); setShowForm(false);
    setSuccess('User created successfully!');
    setTimeout(() => setSuccess(''), 3000);
  };

  return (
    <div className="admin-users">
      <div className="admin-page-header">
        <div>
          <h1>Admin Users</h1>
          <p>{users.length} user{users.length !== 1 ? 's' : ''}</p>
        </div>
        <button className="btn btn-primary" onClick={() => { setShowForm(true); setError(''); }}><Plus size={16}/> Add User</button>
      </div>

      {success && <div className="success-banner">{success}</div>}

      <div className="admin-card">
        <table className="admin-table">
          <thead>
            <tr><th>Username</th><th>Role</th><th>Status</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id || u.username}>
                <td>
                  <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
                    <div className="user-avatar-sm">{u.username[0].toUpperCase()}</div>
                    <strong>{u.username}</strong>
                    {u.username === currentUser?.username && <span className="you-badge">You</span>}
                  </div>
                </td>
                <td><span className={`badge badge-${u.role}`}>{u.role}</span></td>
                <td><span className="status-dot active" /> Active</td>
                <td>
                  <button
                    className="icon-btn del"
                    disabled={u.username === currentUser?.username}
                    title={u.username === currentUser?.username ? "Can't delete yourself" : "Delete user"}
                    onClick={() => setConfirmDelete(u.username)}
                  >
                    <Trash2 size={14}/>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="admin-card permissions-card">
        <h3><Shield size={16}/> Role Permissions</h3>
        <div className="perm-grid">
          <div className="perm-col">
            <h4>Admin</h4>
            <ul>
              <li>✓ Full site control</li>
              <li>✓ Manage users</li>
              <li>✓ Delete any content</li>
              <li>✓ Edit programs</li>
            </ul>
          </div>
          <div className="perm-col">
            <h4>Editor</h4>
            <ul>
              <li>✓ Create/edit posts</li>
              <li>✓ Manage gallery</li>
              <li>✓ Update counters</li>
              <li>✗ User management</li>
            </ul>
          </div>
        </div>
      </div>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal-box" style={{ textAlign:'left', maxWidth:'420px' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'20px' }}>
              <h3 style={{ margin:0 }}>New Admin User</h3>
              <button className="icon-btn" onClick={() => setShowForm(false)}><X size={18}/></button>
            </div>
            {error && (
              <div style={{ marginBottom:'16px', borderRadius:'8px', padding:'10px 14px', background:'#fef2f2', border:'1px solid #fca5a5', color:'#dc2626', fontSize:'0.88rem' }}>
                {error}
              </div>
            )}
            <div style={{ display:'flex', flexDirection:'column', gap:'16px' }}>
              <div className="form-group">
                <label>Username</label>
                <input value={form.username} onChange={e => setForm({...form, username: e.target.value})} placeholder="Enter username" />
              </div>
              <div className="form-group">
                <label>Password</label>
                <div style={{ position:'relative' }}>
                  <input type={showPw ? 'text' : 'password'} value={form.password} onChange={e => setForm({...form, password: e.target.value})} placeholder="Min 6 characters" style={{ paddingRight:'40px' }} />
                  <button type="button" style={{ position:'absolute', right:'10px', top:'50%', transform:'translateY(-50%)', background:'none', border:'none', cursor:'pointer', color:'var(--text-secondary)' }} onClick={() => setShowPw(!showPw)}>
                    {showPw ? <EyeOff size={16}/> : <Eye size={16}/>}
                  </button>
                </div>
              </div>
              <div className="form-group">
                <label>Role</label>
                <select value={form.role} onChange={e => setForm({...form, role: e.target.value})}>
                  {ROLES.map(r => <option key={r}>{r}</option>)}
                </select>
              </div>
            </div>
            <div className="modal-btns" style={{ marginTop:'24px' }}>
              <button className="btn btn-outline" onClick={() => setShowForm(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={save}>Create User</button>
            </div>
          </div>
        </div>
      )}

      {confirmDelete && (
        <div className="modal-overlay">
          <div className="modal-box">
            <Trash2 size={32} style={{color:'#dc2626',margin:'0 auto 12px',display:'block'}} />
            <h3>Delete "{confirmDelete}"?</h3>
            <p>This user will lose all access immediately.</p>
            <div className="modal-btns">
              <button className="btn btn-outline" onClick={() => setConfirmDelete(null)}>Cancel</button>
              <button className="btn" style={{background:'#dc2626',color:'#fff'}} onClick={() => { deleteUser(confirmDelete); setConfirmDelete(null); }}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
