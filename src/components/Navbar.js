import React, { useState, useEffect } from 'react';
import { isLoggedIn, logout, getUser } from '../auth';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (isLoggedIn()) setUser(getUser());
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .desktop-links { display: none !important; }
          .desktop-auth { display: none !important; }
          .hamburger { display: flex !important; }
        }
        @keyframes mobileSlide {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <header style={{
        position: 'sticky', top: 0, zIndex: 1000,
        background: scrolled ? 'rgba(10,12,16,0.98)' : 'rgba(10,12,16,0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid #1F2533',
        boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.3)' : 'none',
        transition: 'all 0.3s ease',
      }}>
        <nav style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', height: 64, display: 'flex', alignItems: 'center', gap: 32 }}>

          {/* Logo */}
          <a href="/" style={{ fontFamily: 'Syne,sans-serif', fontSize: 20, fontWeight: 700, color: '#E8EAED', textDecoration: 'none', flexShrink: 0 }}>
            ⬡ Osmium
          </a>

          {/* Desktop Links */}
          <ul className="desktop-links" style={{ display: 'flex', gap: 4, listStyle: 'none', marginLeft: 'auto', padding: 0 }}>
            {[
              { label: 'Dashboard', href: '/dashboard' },
              { label: 'Upload Bill', href: '/upload' },
              { label: 'AI Insights', href: '/insights' },
            ].map((item, i) => (
              <li key={i}>
                <a href={item.href} className="nav-link-hover">{item.label}</a>
              </li>
            ))}
          </ul>

          {/* Desktop Auth */}
          <div className="desktop-auth" style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            {isLoggedIn() && user ? (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, #3DFFC0, #5B9EFF)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 13, color: '#0A0C10' }}>
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <span style={{ color: '#E8EAED', fontSize: 14, fontWeight: 500 }}>{user.name}</span>
                </div>
                <button onClick={logout} className="btn-ghost-hover" style={{ fontSize: 13, padding: '7px 14px', color: '#FF7A45', borderColor: 'rgba(255,122,69,0.3)' }}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <a href="/login">
                  <button className="btn-ghost-hover" style={{ fontSize: 14, padding: '8px 18px' }}>Log In</button>
                </a>
                <a href="/login">
                  <button className="btn-primary-hover" style={{ fontSize: 14, padding: '8px 18px' }}>Get Started</button>
                </a>
              </>
            )}
          </div>

          {/* Hamburger */}
          <button
            className="hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              display: 'none',
              background: 'transparent',
              border: '1px solid #1F2533',
              color: '#E8EAED',
              padding: '8px 12px',
              borderRadius: 8,
              fontSize: 18,
              cursor: 'pointer',
              marginLeft: 'auto',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {menuOpen ? '✕' : '☰'}
          </button>
        </nav>

        {/* Mobile Menu */}
        {menuOpen && (
          <div style={{
            background: '#111318',
            borderTop: '1px solid #1F2533',
            padding: 16,
            animation: 'mobileSlide 0.3s ease',
          }}>
            {[
              { label: 'Dashboard', href: '/dashboard' },
              { label: 'Upload Bill', href: '/upload' },
              { label: 'AI Insights', href: '/insights' },
            ].map((item, i) => (
              <a key={i} href={item.href} style={{ display: 'block', padding: '12px 16px', color: '#6B7280', textDecoration: 'none', borderRadius: 10, fontSize: 15, marginBottom: 4, transition: 'all 0.2s' }}
                onMouseEnter={e => { e.target.style.color = '#E8EAED'; e.target.style.background = 'rgba(255,255,255,0.05)'; }}
                onMouseLeave={e => { e.target.style.color = '#6B7280'; e.target.style.background = 'transparent'; }}>
                {item.label}
              </a>
            ))}
            <div style={{ height: 1, background: '#1F2533', margin: '8px 0' }} />
            {isLoggedIn() ? (
              <button onClick={logout} style={{ width: '100%', background: 'rgba(255,122,69,0.08)', border: '1px solid rgba(255,122,69,0.2)', color: '#FF7A45', padding: 12, borderRadius: 10, fontSize: 14, cursor: 'pointer' }}>
                Logout
              </button>
            ) : (
              <a href="/login" style={{ display: 'block', background: '#3DFFC0', color: '#0A0C10', padding: 12, borderRadius: 10, fontSize: 14, fontWeight: 700, textAlign: 'center', textDecoration: 'none' }}>
                Get Started
              </a>
            )}
          </div>
        )}
      </header>
    </>
  );
}