import { useState } from 'react';
import { useSite } from '../../context/SiteContext';
import { Plus, Trash2, X } from 'lucide-react';
import './AdminGallery.css';

const CATS = ['Workshop', 'Students', 'Tech Donation', 'Graduation', 'Community', 'Other'];
const COLORS = ['#1a3a6b','#0f4c35','#5b2b8a','#8a3000','#0a4a6b','#3a1a0a'];
const EMOJIS = ['💻','📚','🎓','🤝','⭐','📖','🏆','💡','🌟','🎯'];
const EMPTY = { title: '', category: 'Workshop', description: '', emoji: '💻', color: '#1a3a6b' };

export default function AdminGallery() {
  const { gallery, addGalleryItem, deleteGalleryItem } = useSite();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [filterCat, setFilterCat] = useState('All');

  const filtered = filterCat === 'All' ? gallery : gallery.filter(g => g.category === filterCat);

  const save = () => {
    if (!form.title.trim()) return;
    addGalleryItem({ ...form, id: Date.now() });
    setForm(EMPTY); setShowForm(false);
  };

  return (
    <div className="admin-gallery">
      <div className="admin-page-header">
        <div>
          <h1>Gallery</h1>
          <p>{gallery.length} images total</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm(true)}><Plus size={16}/> Add Image</button>
      </div>

      <div className="gallery-filter-bar">
        {['All', ...CATS].map(c => (
          <button key={c} className={`filter-pill ${filterCat === c ? 'active' : ''}`} onClick={() => setFilterCat(c)}>{c}</button>
        ))}
      </div>

      <div className="admin-gallery-grid">
        {filtered.map(item => (
          <div key={item.id} className="ag-item">
            <div className="ag-thumb" style={{ background: item.color }}>
              <span className="ag-emoji">{item.emoji || '📷'}</span>
            </div>
            <div className="ag-info">
              <p className="ag-title">{item.title}</p>
              <p className="ag-cat">{item.category}</p>
            </div>
            <button className="icon-btn del ag-del" onClick={() => setConfirmDelete(item.id)}>
              <Trash2 size={14}/>
            </button>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="empty-state">
            <p>No images in this category</p>
          </div>
        )}
      </div>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal-box ag-modal">
            <div className="modal-head">
              <h3>Add Gallery Image</h3>
              <button className="icon-btn" onClick={() => setShowForm(false)}><X size={18}/></button>
            </div>
            <div className="ag-preview-thumb" style={{ background: form.color }}>
              <span>{form.emoji}</span>
            </div>
            <div className="ag-form">
              <div className="form-group">
                <label>Title *</label>
                <input value={form.title} onChange={e => setForm({...form, title: e.target.value})} placeholder="Image title" />
              </div>
              <div className="form-group">
                <label>Description</label>
                <input value={form.description} onChange={e => setForm({...form, description: e.target.value})} placeholder="Short description" />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
                  {CATS.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Emoji Icon</label>
                <div className="emoji-picker">
                  {EMOJIS.map(e => (
                    <button key={e} type="button" className={`emoji-btn ${form.emoji === e ? 'selected' : ''}`}
                      onClick={() => setForm({...form, emoji: e})}>{e}</button>
                  ))}
                </div>
              </div>
              <div className="form-group">
                <label>Background Color</label>
                <div className="color-picker">
                  {COLORS.map(c => (
                    <button key={c} type="button" className={`color-swatch ${form.color === c ? 'selected' : ''}`}
                      style={{ background: c }} onClick={() => setForm({...form, color: c})} />
                  ))}
                </div>
              </div>
            </div>
            <div className="modal-btns">
              <button className="btn btn-outline" onClick={() => setShowForm(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={save}>Add to Gallery</button>
            </div>
          </div>
        </div>
      )}

      {confirmDelete && (
        <div className="modal-overlay">
          <div className="modal-box">
            <Trash2 size={32} style={{color:'#dc2626',margin:'0 auto 12px',display:'block'}} />
            <h3>Remove this image?</h3>
            <p>This cannot be undone.</p>
            <div className="modal-btns">
              <button className="btn btn-outline" onClick={() => setConfirmDelete(null)}>Cancel</button>
              <button className="btn" style={{background:'#dc2626',color:'#fff'}} onClick={() => { deleteGalleryItem(confirmDelete); setConfirmDelete(null); }}>Remove</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
