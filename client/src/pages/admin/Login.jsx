import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAdmin } from '../../api/authApi';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await loginAdmin(form);
      const { token, ...user } = res.data.data;
      login(user, token);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '0.75rem 1rem',
    borderRadius: '0.75rem',
    border: '1px solid color-mix(in srgb, var(--c-primary) 25%, transparent)',
    backgroundColor: 'var(--c-bg-alt)',
    color: 'var(--c-text)',
    fontSize: 'var(--font-size-base)',
    outline: 'none',
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 theme-hero-bg">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl"
            style={{ backgroundColor: 'var(--c-accent)' }}>
            <span className="text-white font-display font-bold text-2xl">G</span>
          </div>
          <h1 className="font-display text-2xl font-bold text-white">Admin Panel</h1>
          <p className="text-white/60 text-sm mt-1">Gazipur Kismat Welfare Foundation</p>
        </div>

        {/* Card */}
        <div className="rounded-2xl p-8 shadow-2xl" style={{ backgroundColor: 'var(--c-bg)' }}>
          <h2 className="font-display text-xl font-bold mb-6" style={{ color: 'var(--c-primary)' }}>Sign In</h2>

          {error && (
            <div className="mb-4 p-3 rounded-xl text-sm" style={{ backgroundColor: 'rgba(239,68,68,0.1)', color: '#dc2626', border: '1px solid rgba(239,68,68,0.2)' }}>
              {error}
            </div>
          )}

          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: 'var(--c-text-muted)' }}>Email</label>
              <input
                type="email"
                value={form.email}
                onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                required
                style={inputStyle}
                onFocus={e => e.target.style.boxShadow = '0 0 0 3px color-mix(in srgb, var(--c-primary) 25%, transparent)'}
                onBlur={e => e.target.style.boxShadow = 'none'}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: 'var(--c-text-muted)' }}>Password</label>
              <input
                type="password"
                value={form.password}
                onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                required
                style={inputStyle}
                onFocus={e => e.target.style.boxShadow = '0 0 0 3px color-mix(in srgb, var(--c-primary) 25%, transparent)'}
                onBlur={e => e.target.style.boxShadow = 'none'}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl font-semibold text-white transition-all hover:opacity-90 disabled:opacity-60 mt-2"
              style={{ backgroundColor: 'var(--c-primary)' }}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 p-4 rounded-xl text-xs" style={{ backgroundColor: 'var(--c-bg-alt)', color: 'var(--c-text-muted)' }}>
            <p className="font-medium mb-1">Default credentials:</p>
            {/* <p>📧 admin@gazipurkismat.org</p>
            <p>🔑 Admin@123456</p> */}
          </div>
        </div>
      </div>
    </div>
  );
}