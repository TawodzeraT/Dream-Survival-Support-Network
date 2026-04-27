import { useSite } from '../../context/SiteContext';
import { useAdmin } from '../../context/AdminContext';
import { Link } from 'react-router-dom';
import { BookOpen, Image, Users, DollarSign, TrendingUp, Monitor, GraduationCap, Layers } from 'lucide-react';
import './AdminOverview.css';

export default function AdminOverview() {
  const { counter, posts, gallery, team } = useSite();
  const { currentUser } = useAdmin();

  const stats = [
    { label: 'Laptops Donated', value: counter.laptops.toLocaleString(), icon: Monitor, color: '#1a56db', change: '+12 this month' },
    { label: 'Students Reached', value: counter.students.toLocaleString(), icon: Users, color: '#059669', change: '+45 this month' },
    { label: 'Workshops Held', value: counter.workshops.toLocaleString(), icon: TrendingUp, color: '#d97706', change: '+3 this month' },
    { label: 'Scholarships', value: counter.scholarships.toLocaleString(), icon: GraduationCap, color: '#7c3aed', change: '+5 this year' },
  ];

  const quickLinks = [
    { label: 'Manage Blog', desc: `${posts.length} posts`, to: '/admin/blog', icon: BookOpen, color: '#1a56db' },
    { label: 'Gallery', desc: `${gallery.length} images`, to: '/admin/gallery', icon: Image, color: '#059669' },
    { label: 'Impact Counter', desc: 'Update numbers', to: '/admin/donations', icon: DollarSign, color: '#d97706' },
    { label: 'Team Members', desc: `${team.length} members`, to: '/admin/team', icon: Users, color: '#7c3aed' },
  ];

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="admin-overview">
      <div className="overview-welcome">
        <div>
          <h1>{greeting}, {currentUser?.username}!</h1>
          <p>Here's what's happening with DSSN today.</p>
        </div>
        <Link to="/" target="_blank" className="btn btn-outline">View Live Site ↗</Link>
      </div>

      <div className="stats-grid">
        {stats.map(s => (
          <div key={s.label} className="stat-card">
            <div className="stat-icon" style={{ background: `${s.color}18`, color: s.color }}>
              <s.icon size={22} />
            </div>
            <div className="stat-body">
              <p className="stat-label">{s.label}</p>
              <h2 className="stat-value">{s.value}</h2>
              <p className="stat-change">{s.change}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="overview-bottom">
        <div className="quick-links admin-card">
          <h3>Quick Actions</h3>
          <div className="ql-grid">
            {quickLinks.map(q => (
              <Link key={q.to} to={q.to} className="ql-item">
                <div className="ql-icon" style={{ background: `${q.color}18`, color: q.color }}>
                  <q.icon size={20} />
                </div>
                <div>
                  <p className="ql-label">{q.label}</p>
                  <p className="ql-desc">{q.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="recent-posts admin-card">
          <h3>Recent Blog Posts</h3>
          {posts.slice(0, 4).map(p => (
            <div key={p.id} className="recent-post-item">
              <div className="rp-dot" />
              <div>
                <p className="rp-title">{p.title}</p>
                <p className="rp-date">{p.date} · {p.category}</p>
              </div>
            </div>
          ))}
          <Link to="/admin/blog" className="view-all-link">View all posts →</Link>
        </div>
      </div>
    </div>
  );
}
