import { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';
import {
  LayoutDashboard, FileText, Image, DollarSign, Users,
  BookOpen, LogOut, Menu, X, Shield, ChevronRight, Layers
} from 'lucide-react';
import './AdminDashboard.css';

const navItems = [
  { path: '/admin', label: 'Overview', icon: LayoutDashboard, exact: true },
  { path: '/admin/blog', label: 'Blog Posts', icon: BookOpen },
  { path: '/admin/gallery', label: 'Gallery', icon: Image },
  { path: '/admin/donations', label: 'Donations & Counter', icon: DollarSign },
  { path: '/admin/team', label: 'Team Members', icon: Users },
  { path: '/admin/programs', label: 'Programs', icon: Layers },
  { path: '/admin/users', label: 'Admin Users', icon: Shield },
];

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { currentUser, logout } = useAdmin();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const isActive = (item) => {
    if (item.exact) return location.pathname === item.path;
    return location.pathname.startsWith(item.path);
  };

  return (
    <div className="admin-layout">
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <div className="sidebar-icon"><Shield size={20} /></div>
            <span>DSSN Admin</span>
          </div>
          <button className="sidebar-close" onClick={() => setSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <nav className="sidebar-nav">
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`sidebar-link ${isActive(item) ? 'active' : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              <item.icon size={18} />
              <span>{item.label}</span>
              {isActive(item) && <ChevronRight size={14} className="active-arrow" />}
            </Link>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-user">
            <div className="user-avatar">{currentUser?.username?.[0]?.toUpperCase()}</div>
            <div>
              <p className="user-name">{currentUser?.username}</p>
              <p className="user-role">{currentUser?.role}</p>
            </div>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </aside>

      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />}

      <div className="admin-main">
        <header className="admin-topbar">
          <button className="topbar-menu" onClick={() => setSidebarOpen(true)}>
            <Menu size={22} />
          </button>
          <div className="topbar-right">
            <Link to="/" className="topbar-link" target="_blank">View Site ↗</Link>
          </div>
        </header>
        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
