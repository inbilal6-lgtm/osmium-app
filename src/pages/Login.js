import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, signup } from '../api';
import { useToast } from '../Toast';

export default function Login() {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { showToast, ToastContainer } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = isSignup
        ? await signup({ name, email, password })
        : await login({ email, password });
      localStorage.setItem('token', data.data.token);
      localStorage.setItem('user', JSON.stringify(data.data.user));
      showToast(isSignup ? 'Account created successfully!' : 'Welcome back!', 'success');
      setTimeout(() => navigate('/dashboard'), 1000);
    } catch (err) {
      showToast(err.response?.data?.message || 'Something went wrong!', 'error');
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0A0C10', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, fontFamily: 'Inter, sans-serif' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Inter:wght@400;500;600&display=swap');
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      <ToastContainer />

      <div style={{ background: '#111318', border: '1px solid #1F2533', borderRadius: 20, padding: '48px 40px', width: '100%', maxWidth: 420, animation: 'fadeUp 0.5s ease' }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <p style={{ fontFamily: 'Syne,sans-serif', fontSize: 24, fontWeight: 800, color: '#E8EAED', marginBottom: 8 }}>⬡ Osmium</p>
          <h2 style={{ fontFamily: 'Syne,sans-serif', fontSize: 22, fontWeight: 700, color: '#E8EAED', marginBottom: 6 }}>
            {isSignup ? 'Create Account' : 'Welcome Back'}
          </h2>
          <p style={{ color: '#6B7280', fontSize: 14 }}>
            {isSignup ? 'Start saving on your bills today' : 'Log in to your dashboard'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {isSignup && (
            <div>
              <label style={{ display: 'block', color: '#6B7280', fontSize: 13, marginBottom: 6, fontWeight: 500 }}>Full Name</label>
              <input
                className="input-premium"
                type="text"
                placeholder="Ali Hassan"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            </div>
          )}

          <div>
            <label style={{ display: 'block', color: '#6B7280', fontSize: 13, marginBottom: 6, fontWeight: 500 }}>Email</label>
            <input
              className="input-premium"
              type="email"
              placeholder="ali@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label style={{ display: 'block', color: '#6B7280', fontSize: 13, marginBottom: 6, fontWeight: 500 }}>Password</label>
            <input
              className="input-premium"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn-primary-hover"
            style={{ fontSize: 15, padding: '14px', width: '100%', marginTop: 8, opacity: loading ? 0.7 : 1 }}
            disabled={loading}
          >
            {loading ? 'Please wait...' : isSignup ? 'Create Account →' : 'Log In →'}
          </button>
        </form>

        {/* Switch */}
        <p style={{ color: '#6B7280', fontSize: 14, textAlign: 'center', marginTop: 24 }}>
          {isSignup ? 'Already have an account? ' : "Don't have an account? "}
          <span
            style={{ color: '#3DFFC0', cursor: 'pointer', fontWeight: 600 }}
            onClick={() => setIsSignup(!isSignup)}
          >
            {isSignup ? 'Log In' : 'Sign Up'}
          </span>
        </p>
      </div>
    </div>
  );
}