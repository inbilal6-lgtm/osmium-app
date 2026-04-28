import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Upload from './pages/Upload';
import Insights from './pages/Insights';

function Navbar() {
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(10,12,16,0.95)', backdropFilter: 'blur(10px)', borderBottom: '1px solid #1F2533' }}>
      <nav style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', height: 64, display: 'flex', alignItems: 'center', gap: 32 }}>
        <a href="/" style={{ fontFamily: 'Syne,sans-serif', fontSize: 20, fontWeight: 700, color: '#E8EAED', textDecoration: 'none' }}>⬡ Osmium</a>
        <ul style={{ display: 'flex', gap: 28, listStyle: 'none', marginLeft: 'auto', padding: 0 }}>
          <li><a href="/dashboard" className="nav-link-hover">Dashboard</a></li>
          <li><a href="/upload" className="nav-link-hover">Upload Bill</a></li>
          <li><a href="/insights" className="nav-link-hover">AI Insights</a></li>
        </ul>
        <div style={{ display: 'flex', gap: 12 }}>
          <a href="/login" className="magnetic-btn">
            <button className="btn-ghost-hover">Log In</button>
          </a>
          <a href="/login" className="magnetic-btn">
            <button className="btn-primary-hover" style={{ fontSize: 14, padding: '8px 18px' }}>Get Started</button>
          </a>
        </div>
      </nav>
    </header>
  );
}

function Home() {
  return (
    <div style={{ background: '#0A0C10', minHeight: '100vh', color: '#E8EAED' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700&family=Inter:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0A0C10; font-family: 'Inter', sans-serif; }
        a { text-decoration: none; }
      `}</style>

      <Navbar />

      {/* HERO */}
      <section style={{ padding: '90px 0 70px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
          <span style={{ display: 'inline-block', background: 'rgba(61,255,192,0.08)', color: '#3DFFC0', border: '1px solid rgba(61,255,192,0.2)', padding: '5px 16px', borderRadius: 100, fontSize: 12, fontWeight: 600, marginBottom: 28, letterSpacing: 0.5 }}>
            AI-Powered Billing · Pakistan
          </span>
          <h1 style={{ fontFamily: 'Syne,sans-serif', fontSize: 52, fontWeight: 700, lineHeight: 1.15, marginBottom: 22, color: '#E8EAED', letterSpacing: '-1px', maxWidth: 600 }}>
            Smart Bills.<br />Smarter Savings.
          </h1>
          <p style={{ color: '#6B7280', fontSize: 17, marginBottom: 36, maxWidth: 460, lineHeight: 1.8 }}>
            Upload your electricity, gas & water bills. Our AI reads them, tracks your consumption trends, and tells you exactly how to save money.
          </p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 48 }}>
            <a href="/upload" className="magnetic-btn">
              <button className="btn-primary-hover" style={{ fontSize: 15, padding: '14px 28px' }}>
                Upload Your First Bill
              </button>
            </a>
            <a href="/dashboard" className="magnetic-btn">
              <button className="btn-ghost-hover" style={{ fontSize: 15, padding: '14px 28px' }}>
                View Dashboard →
              </button>
            </a>
          </div>
          <p style={{ color: '#4B5563', fontSize: 13 }}>Trusted by 2,000+ households in Pakistan 🇵🇰</p>

          {/* Feature Pills */}
          <div style={{ display: 'flex', gap: 12, marginTop: 56, paddingTop: 40, borderTop: '1px solid #1F2533', flexWrap: 'wrap' }}>
            {[
              { icon: 'S', text: 'Scan any bill in seconds' },
              { icon: 'T', text: 'Track consumption trends' },
              { icon: 'A', text: 'AI-powered saving tips' },
              { icon: 'U', text: 'Electricity, Gas & Water' },
            ].map((f, i) => (
              <div key={i} className="shimmer-hover" style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#111318', border: '1px solid #1F2533', borderRadius: 10, padding: '10px 16px', transition: 'all 0.2s ease', cursor: 'default' }}>
                <div style={{ width: 28, height: 28, borderRadius: 6, background: 'rgba(61,255,192,0.08)', border: '1px solid rgba(61,255,192,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3DFFC0', fontSize: 11, fontWeight: 800 }}>{f.icon}</div>
                <p style={{ color: '#6B7280', fontSize: 13 }}>{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding: '80px 0', borderTop: '1px solid #1F2533' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <p style={{ color: '#3DFFC0', fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 12 }}>Simple Process</p>
            <h2 style={{ fontFamily: 'Syne,sans-serif', fontSize: 36, fontWeight: 700, marginBottom: 10, letterSpacing: '-0.5px' }}>How It Works</h2>
            <p style={{ color: '#6B7280', fontSize: 15 }}>3 steps to start saving money on your bills</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
            {[
              { step: '01', icon: '↑', title: 'Upload Your Bill', desc: 'Take a photo or upload any utility bill — electricity, gas, or water. Supports JPG, PNG & PDF.', color: '#3DFFC0' },
              { step: '02', icon: '◈', title: 'AI Scans & Analyzes', desc: 'Our Tesseract OCR engine reads your bill instantly and AI analyzes your consumption patterns.', color: '#5B9EFF' },
              { step: '03', icon: '◎', title: 'Get Saving Tips', desc: 'Receive personalized AI recommendations and track exactly how much money you save each month.', color: '#A78BFA' },
            ].map((s, i) => (
              <div key={i} className="tilt-card shimmer-hover" style={{ background: '#111318', border: '1px solid #1F2533', borderRadius: 16, padding: '32px 28px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${s.color}, transparent)` }} />
                <p style={{ color: s.color, fontSize: 11, fontWeight: 700, letterSpacing: 2, marginBottom: 20, textTransform: 'uppercase' }}>Step {s.step}</p>
                <div style={{ width: 48, height: 48, borderRadius: 12, border: `1px solid ${s.color}30`, background: `${s.color}08`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, color: s.color, fontSize: 20, fontWeight: 700 }}>
                  {s.icon}
                </div>
                <h3 style={{ fontFamily: 'Syne,sans-serif', fontSize: 18, fontWeight: 700, marginBottom: 10, color: '#E8EAED' }}>{s.title}</h3>
                <p style={{ color: '#6B7280', fontSize: 14, lineHeight: 1.8 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section style={{ padding: '80px 0', borderTop: '1px solid #1F2533', background: '#080A0F' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <p style={{ color: '#3DFFC0', fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 12 }}>Supported Bills</p>
            <h2 style={{ fontFamily: 'Syne,sans-serif', fontSize: 36, fontWeight: 700, letterSpacing: '-0.5px' }}>All Your Utility Bills</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }}>
            {[
              { letter: 'E', title: 'Electricity', providers: 'LESCO · KESC · WAPDA · IESCO · FESCO · GEPCO', color: '#5B9EFF' },
              { letter: 'G', title: 'Gas', providers: 'SSGC · SNGPL', color: '#FF7A45' },
              { letter: 'W', title: 'Water', providers: 'KWSB · Local Utilities', color: '#3DFFC0' },
              { letter: 'AI', title: 'AI Insights', providers: 'Smart saving recommendations', color: '#A78BFA' },
            ].map((f, i) => (
              <div key={i} className="tilt-card shimmer-hover" style={{ background: '#111318', border: '1px solid #1F2533', borderRadius: 14, padding: 24 }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: `${f.color}10`, border: `1px solid ${f.color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: f.color, fontSize: 14, fontWeight: 800, marginBottom: 16 }}>
                  {f.letter}
                </div>
                <h3 style={{ fontFamily: 'Syne,sans-serif', fontSize: 16, fontWeight: 700, marginBottom: 8, color: f.color }}>{f.title}</h3>
                <p style={{ color: '#4B5563', fontSize: 13, lineHeight: 1.6 }}>{f.providers}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '100px 0', borderTop: '1px solid #1F2533' }}>
        <div style={{ maxWidth: 600, margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
          <p style={{ color: '#3DFFC0', fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 16 }}>Get Started</p>
          <h2 style={{ fontFamily: 'Syne,sans-serif', fontSize: 40, fontWeight: 700, marginBottom: 16, letterSpacing: '-0.5px' }}>Start Saving Today</h2>
          <p style={{ color: '#6B7280', fontSize: 16, marginBottom: 36, lineHeight: 1.7 }}>
            Join thousands of Pakistani households already saving money with Osmium. Free forever.
          </p>
          <a href="/login" className="magnetic-btn">
            <button className="btn-primary-hover" style={{ fontSize: 16, padding: '16px 40px' }}>
              Get Started Free →
            </button>
          </a>
          <p style={{ color: '#374151', fontSize: 12, marginTop: 16 }}>No credit card required · Free forever</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: '32px 0', borderTop: '1px solid #1F2533' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ fontFamily: 'Syne,sans-serif', fontSize: 16, fontWeight: 700 }}>⬡ Osmium</p>
          <p style={{ color: '#374151', fontSize: 13 }}>© 2025 Osmium · Made for Pakistan</p>
          <div style={{ display: 'flex', gap: 20 }}>
            {['Twitter', 'GitHub', 'LinkedIn'].map(s => (
              <a key={s} href="#" style={{ color: '#374151', fontSize: 13 }}
                onMouseEnter={e => e.target.style.color = '#3DFFC0'}
                onMouseLeave={e => e.target.style.color = '#374151'}>
                {s}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  React.useEffect(() => {
    // Cursor glow
    const cursor = document.createElement('div');
    cursor.classList.add('glow-cursor');
    document.body.appendChild(cursor);

    const handleMouseMove = (e) => {
      // Cursor
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';

      // Magnetic buttons
      document.querySelectorAll('.magnetic-btn').forEach(el => {
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distX = e.clientX - centerX;
        const distY = e.clientY - centerY;
        const distance = Math.sqrt(distX * distX + distY * distY);
        if (distance < 120) {
          const pull = (120 - distance) / 120;
          el.style.transform = `translate(${distX * pull * 0.4}px, ${distY * pull * 0.4}px)`;
          el.style.transition = 'transform 0.1s ease';
        } else {
          el.style.transform = 'translate(0, 0)';
          el.style.transition = 'transform 0.3s ease';
        }
      });

      // Tilt cards
      document.querySelectorAll('.tilt-card').forEach(card => {
        const rect = card.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distX = e.clientX - centerX;
        const distY = e.clientY - centerY;
        const distance = Math.sqrt(distX * distX + distY * distY);
        if (distance < 350) {
          const rotateX = (distY / rect.height) * -10;
          const rotateY = (distX / rect.width) * 10;
          card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(12px)`;
          card.style.borderColor = 'rgba(61,255,192,0.3)';
          card.style.boxShadow = '0 20px 60px rgba(0,0,0,0.4), 0 0 40px rgba(61,255,192,0.06)';
          card.style.transition = 'border-color 0.3s, box-shadow 0.3s';
        } else {
          card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
          card.style.borderColor = '#1F2533';
          card.style.boxShadow = 'none';
          card.style.transition = 'all 0.4s ease';
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (document.body.contains(cursor)) document.body.removeChild(cursor);
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/insights" element={<Insights />} />
      </Routes>
    </BrowserRouter>
  );
}