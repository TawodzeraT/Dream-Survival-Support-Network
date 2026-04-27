import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';
import { Shield, Eye, EyeOff, AlertCircle } from 'lucide-react';
import './AdminLogin.css';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAdmin();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setTimeout(() => {
      const result = login(username, password);
      if (result.success) {
        navigate('/admin');
      } else {
        setError(result.error || 'Invalid credentials');
      }
      setLoading(false);
    }, 600);
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-bg">
        <div className="bg-dot" /><div className="bg-dot" /><div className="bg-dot" />
      </div>
      <div className="admin-login-card">
        <div className="login-logo">
          <div className="login-shield"><Shield size={28} /></div>
          <div>
            <h1>DSSN Admin</h1>
            <p>Dreamers & Survivors Support Network</p>
          </div>
        </div>
        <h2>Sign in to your account</h2>
        {error && (
          <div className="login-error">
            <AlertCircle size={16} /> {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Username</label>
            <input
              type="text" value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="Enter username" required autoFocus
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <div className="password-wrap">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password} onChange={e => setPassword(e.target.value)}
                placeholder="Enter password" required
              />
              <button type="button" className="eye-btn" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <button type="submit" className="btn btn-primary login-btn" disabled={loading}>
            {loading ? <span className="spinner" /> : 'Sign In'}
          </button>
        </form>
        <p className="login-hint">Default: admin / dssn2024!</p>
      </div>
    </div>
  );
}
