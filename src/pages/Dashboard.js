import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function SimpleLineChart({ tab }) {
  const data = {
    Electricity: [180, 220, 195, 260, 310, 275, 320],
    Gas: [90, 110, 85, 120, 95, 130, 180],
    Water: [20, 22, 19, 25, 21, 23, 22],
  };
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
  const values = data[tab];
  const max = Math.max(...values);
  const w = 400, h = 150, pad = 20;
  const points = values.map((v, i) => ({
    x: pad + (i / (values.length - 1)) * (w - pad * 2),
    y: h - pad - ((v / max) * (h - pad * 2)),
  }));
  return (
    <svg viewBox={`0 0 ${w} ${h}`} style={{ width: '100%' }}>
      <polyline fill="none" stroke="#3DFFC0" strokeWidth="2.5"
        points={points.map(p => `${p.x},${p.y}`).join(' ')} />
      {points.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r="4" fill="#3DFFC0" />
          <text x={p.x} y={h - 4} textAnchor="middle" fill="#6B7280" fontSize="10">{months[i]}</text>
        </g>
      ))}
    </svg>
  );
}

function SimpleBarChart() {
  const data = [
    { label: 'Electricity', value: 5200, color: '#5B9EFF' },
    { label: 'Gas', value: 3800, color: '#3DFFC0' },
    { label: 'Water', value: 1200, color: '#FF7A45' },
  ];
  const max = Math.max(...data.map(d => d.value));
  const w = 300, h = 150, pad = 30;
  const barW = 60, gap = 20;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} style={{ width: '100%' }}>
      {data.map((d, i) => {
        const barH = ((d.value / max) * (h - pad * 2));
        const x = pad + i * (barW + gap);
        const y = h - pad - barH;
        return (
          <g key={i}>
            <rect x={x} y={y} width={barW} height={barH} rx="4" fill={d.color} opacity="0.85" />
            <text x={x + barW / 2} y={h - 8} textAnchor="middle" fill="#6B7280" fontSize="10">{d.label}</text>
            <text x={x + barW / 2} y={y - 4} textAnchor="middle" fill={d.color} fontSize="10">
              ₨{(d.value / 1000).toFixed(1)}k
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('Electricity');

  const stats = [
    { label: 'Total Bills This Month', value: '₨ 12,450', change: '+8% vs last month', type: 'negative' },
    { label: 'Estimated Savings', value: '₨ 1,820', change: 'AI suggestions applied', type: 'positive' },
    { label: 'Bills Scanned', value: '14', change: 'Since account creation', type: 'neutral' },
    { label: 'Highest Bill', value: '₨ 5,200', change: 'Electricity · July', type: 'negative' },
  ];

  const bills = [
    { date: 'Jul 2025', type: '⚡ Electricity', provider: 'KESC', units: '320 kWh', amount: '₨ 5,200', status: 'Paid' },
    { date: 'Jul 2025', type: '🔥 Gas', provider: 'SSGC', units: '18 HM³', amount: '₨ 3,800', status: 'Paid' },
    { date: 'Jun 2025', type: '💧 Water', provider: 'KWSB', units: '22 m³', amount: '₨ 1,200', status: 'Paid' },
  ];

  return (
    <div style={{ background: '#0A0C10', minHeight: '100vh', color: '#E8EAED' }}>
      <Navbar />
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 24px' }}>

        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <h2 style={{ fontFamily: 'Syne,sans-serif', fontSize: 32, fontWeight: 700, marginBottom: 8 }}>Your Dashboard</h2>
          <p style={{ color: '#6B7280' }}>Overview of all your utility bills</p>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 32 }}>
          {stats.map((s, i) => (
            <div key={i} style={{ background: '#161A22', border: '1px solid #1F2533', borderRadius: 14, padding: 24 }}>
              <p style={{ color: '#6B7280', fontSize: 13, marginBottom: 8 }}>{s.label}</p>
              <p style={{ fontFamily: 'Syne,sans-serif', fontSize: 28, fontWeight: 700, marginBottom: 6 }}>{s.value}</p>
              <span style={{ fontSize: 12, color: s.type === 'positive' ? '#3DFFC0' : s.type === 'negative' ? '#FF7A45' : '#6B7280' }}>
                {s.change}
              </span>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 32 }}>
          <div style={{ background: '#161A22', border: '1px solid #1F2533', borderRadius: 14, padding: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 style={{ fontFamily: 'Syne,sans-serif', fontSize: 16 }}>Monthly Consumption Trend</h3>
              <div style={{ display: 'flex', gap: 8 }}>
                {['Electricity', 'Gas', 'Water'].map(tab => (
                  <button key={tab} onClick={() => setActiveTab(tab)} style={{
                    background: 'transparent',
                    border: `1px solid ${activeTab === tab ? '#3DFFC0' : '#1F2533'}`,
                    color: activeTab === tab ? '#3DFFC0' : '#6B7280',
                    padding: '4px 12px', borderRadius: 6, fontSize: 12, cursor: 'pointer'
                  }}>{tab}</button>
                ))}
              </div>
            </div>
            <SimpleLineChart tab={activeTab} />
          </div>
          <div style={{ background: '#161A22', border: '1px solid #1F2533', borderRadius: 14, padding: 24 }}>
            <h3 style={{ fontFamily: 'Syne,sans-serif', fontSize: 16, marginBottom: 20 }}>Bill Amount Comparison</h3>
            <SimpleBarChart />
          </div>
        </div>

        {/* Table */}
        <div style={{ background: '#161A22', border: '1px solid #1F2533', borderRadius: 14, padding: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <h3 style={{ fontFamily: 'Syne,sans-serif', fontSize: 16 }}>Bills History</h3>
            <div style={{ display: 'flex', gap: 12 }}>
              <select style={{ background: '#111318', border: '1px solid #1F2533', color: '#E8EAED', padding: '8px 12px', borderRadius: 8, fontSize: 13 }}>
                <option>All Types</option>
                <option>Electricity</option>
                <option>Gas</option>
                <option>Water</option>
              </select>
              <input placeholder="Search bills…" style={{ background: '#111318', border: '1px solid #1F2533', color: '#E8EAED', padding: '8px 12px', borderRadius: 8, fontSize: 13 }} />
            </div>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr>
                {['Date', 'Type', 'Provider', 'Units', 'Amount', 'Status', 'Action'].map(h => (
                  <th key={h} style={{ color: '#6B7280', fontWeight: 500, textAlign: 'left', padding: '10px 12px', borderBottom: '1px solid #1F2533' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bills.map((b, i) => (
                <tr key={i}>
                  <td style={{ padding: 12, borderBottom: '1px solid #1F2533' }}>{b.date}</td>
                  <td style={{ padding: 12, borderBottom: '1px solid #1F2533' }}>
                    <span style={{ padding: '3px 10px', borderRadius: 20, fontSize: 12, background: 'rgba(91,158,255,0.15)', color: '#5B9EFF' }}>{b.type}</span>
                  </td>
                  <td style={{ padding: 12, borderBottom: '1px solid #1F2533' }}>{b.provider}</td>
                  <td style={{ padding: 12, borderBottom: '1px solid #1F2533' }}>{b.units}</td>
                  <td style={{ padding: 12, borderBottom: '1px solid #1F2533' }}>{b.amount}</td>
                  <td style={{ padding: 12, borderBottom: '1px solid #1F2533' }}>
                    <span style={{ padding: '3px 10px', borderRadius: 20, fontSize: 12, background: 'rgba(61,255,192,0.1)', color: '#3DFFC0' }}>{b.status}</span>
                  </td>
                  <td style={{ padding: 12, borderBottom: '1px solid #1F2533' }}>
                    <button style={{ background: 'transparent', border: '1px solid #1F2533', color: '#3DFFC0', padding: '6px 14px', borderRadius: 6, fontSize: 13, cursor: 'pointer' }}>
                      View AI Tips
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
}