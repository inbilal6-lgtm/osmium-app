import React from 'react';

export default function Footer() {
  return (
    <footer style={{ padding: '60px 0 30px', borderTop: '1px solid #1F2533', background: '#0A0C10' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 40, marginBottom: 40 }}>
        <div>
          <p style={{ fontFamily: 'Syne,sans-serif', fontSize: 20, fontWeight: 700, color: '#E8EAED' }}>⬡ Osmium</p>
          <p style={{ color: '#6B7280', fontSize: 13, marginTop: 8 }}>AI-Powered Smart Billing for Pakistan</p>
        </div>
        {[
          { title: 'Product', links: ['Features', 'Pricing', 'API Docs'] },
          { title: 'Company', links: ['About', 'Blog', 'Contact'] },
          { title: 'Legal', links: ['Privacy Policy', 'Terms of Service'] },
        ].map((col, i) => (
          <div key={i}>
            <h4 style={{ fontSize: 13, fontWeight: 600, marginBottom: 12, color: '#E8EAED' }}>{col.title}</h4>
            {col.links.map((l, j) => (
              <a key={j} href="#" style={{ display: 'block', color: '#6B7280', fontSize: 14, marginBottom: 8, textDecoration: 'none' }}>{l}</a>
            ))}
          </div>
        ))}
      </div>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px 24px 0', display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #1F2533', color: '#6B7280', fontSize: 13 }}>
        <p>© 2025 Osmium. All rights reserved.</p>
        <div style={{ display: 'flex', gap: 20 }}>
          {['Twitter', 'GitHub', 'LinkedIn'].map(s => (
            <a key={s} href="#" style={{ color: '#6B7280', textDecoration: 'none' }}>{s}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}