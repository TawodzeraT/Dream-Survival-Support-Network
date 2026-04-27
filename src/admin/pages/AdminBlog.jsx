import { useState } from 'react';
import { useSite } from '../../context/SiteContext';
import { Plus, Edit2, Trash2, X, Save, Eye } from 'lucide-react';
import './AdminBlog.css';

const EMPTY = { title: '', excerpt: '', content: '', category: 'Impact', author: 'DSSN Team', date: '', image: '' };
const CATS = ['Impact', 'Student Stories', 'News', 'Programs'];

export default function AdminBlog() {
  const { posts, addPost, updatePost, deletePost } = useSite();
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [preview, setPreview] = useState(false);

  const openNew = () => {
    setForm({ ...EMPTY, date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) });
    setEditing('new');
    setPreview(false);
  };
  const openEdit = (post) => { setForm({ ...post }); setEditing(post.id); setPreview(false); };
  const close = () => { setEditing(null); setForm(EMPTY); setPreview(false); };

  const save = () => {
    if (!form.title.trim() || !form.content.trim()) return;
    if (editing === 'new') {
      addPost({ ...form, id: Date.now(), readTime: `${Math.ceil(form.content.split(' ').length / 200)} min read` });
    } else {
      updatePost(editing, form);
    }
    close();
  };

  return (
    <div className="admin-blog">
      {!editing && (
        <>
          <div className="admin-page-header">
            <div>
              <h1>Blog Posts</h1>
              <p>{posts.length} posts published</p>
            </div>
            <button className="btn btn-primary" onClick={openNew}><Plus size={16} /> New Post</button>
          </div>
          <div className="admin-card">
            <table className="admin-table">
              <thead>
                <tr><th>Title</th><th>Category</th><th>Author</th><th>Date</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {posts.map(p => (
                  <tr key={p.id}>
                    <td className="post-title-cell">{p.title}</td>
                    <td><span className="badge">{p.category}</span></td>
                    <td>{p.author}</td>
                    <td>{p.date}</td>
                    <td className="action-cell">
                      <button className="icon-btn edit" onClick={() => openEdit(p)}><Edit2 size={15}/></button>
                      <button className="icon-btn del" onClick={() => setConfirmDelete(p.id)}><Trash2 size={15}/></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {editing && (
        <div className="blog-editor">
          <div className="editor-header">
            <h1>{editing === 'new' ? 'New Post' : 'Edit Post'}</h1>
            <div className="editor-actions">
              <button className="btn btn-outline" onClick={() => setPreview(!preview)}>
                <Eye size={15} /> {preview ? 'Edit' : 'Preview'}
              </button>
              <button className="btn btn-primary" onClick={save}><Save size={15} /> Save</button>
              <button className="icon-btn" onClick={close}><X size={18} /></button>
            </div>
          </div>

          {preview ? (
            <div className="admin-card blog-preview">
              <span className="badge">{form.category}</span>
              <h2>{form.title || 'Untitled'}</h2>
              <p className="preview-meta">{form.author} · {form.date}</p>
              <p className="preview-excerpt"><em>{form.excerpt}</em></p>
              <div>{form.content.split('\n').map((p, i) => p ? <p key={i}>{p}</p> : <br key={i}/>)}</div>
            </div>
          ) : (
            <div className="editor-form admin-card">
              <div className="form-row">
                <div className="form-group">
                  <label>Title *</label>
                  <input value={form.title} onChange={e => setForm({...form, title: e.target.value})} placeholder="Post title" />
                </div>
                <div className="form-group form-group-sm">
                  <label>Category</label>
                  <select value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
                    {CATS.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Author</label>
                  <input value={form.author} onChange={e => setForm({...form, author: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Date</label>
                  <input value={form.date} onChange={e => setForm({...form, date: e.target.value})} />
                </div>
              </div>
              <div className="form-group">
                <label>Excerpt</label>
                <input value={form.excerpt} onChange={e => setForm({...form, excerpt: e.target.value})} placeholder="Short summary shown in blog list" />
              </div>
              <div className="form-group">
                <label>Content *</label>
                <textarea
                  value={form.content} rows={14}
                  onChange={e => setForm({...form, content: e.target.value})}
                  placeholder="Write your post content here. Separate paragraphs with a blank line."
                />
              </div>
              <div className="form-group">
                <label>Cover Image URL (optional)</label>
                <input value={form.image} onChange={e => setForm({...form, image: e.target.value})} placeholder="https://..." />
              </div>
            </div>
          )}
        </div>
      )}

      {confirmDelete && (
        <div className="modal-overlay">
          <div className="modal-box">
            <Trash2 size={32} style={{color:'#dc2626',margin:'0 auto 12px',display:'block'}} />
            <h3>Delete this post?</h3>
            <p>This action cannot be undone.</p>
            <div className="modal-btns">
              <button className="btn btn-outline" onClick={() => setConfirmDelete(null)}>Cancel</button>
              <button className="btn" style={{background:'#dc2626',color:'#fff'}} onClick={() => { deletePost(confirmDelete); setConfirmDelete(null); }}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
