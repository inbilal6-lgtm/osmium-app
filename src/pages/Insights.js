import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Insights() {
  const [activeTip, setActiveTip] = useState(null);

  const insights = [
    {
      icon: '📈',
      title: 'Consumption Trend',
      type: 'normal',
      text: 'Your electricity usage has increased 12% over last 3 months. Peak usage is between 7pm–11pm.',
      detail: 'Based on your last 6 bills, your highest consumption is on weekdays between 7pm-11pm. Consider shifting heavy appliances like washing machine and dishwasher to late night hours.',
      saving: '₨ 800/month',
    },
    {
      icon: '💡',
      title: 'AI Saving Tips',
      type: 'highlight',
      tips: [
        'Switch heavy appliances to off-peak hours (11pm–6am)',
        'Your AC accounts for ~40% of electricity — clean filters monthly',
        'Consider switching to WAPDA Saver tariff to save ₨800/month',
        'Replace old bulbs with LED — saves up to 80% lighting cost',
        'Unplug devices on standby — saves ₨200/month',
      ],
      saving: '₨ 1,820/month',
    },
    {
      icon: '⚠️',
      title: 'Anomaly Detected',
      type: 'alert',
      text: 'Your July gas bill is 35% higher than your 6-month average. This could indicate a leak or meter issue.',
      detail: 'Average gas bill: ₨2,800. July bill: ₨3,800. Difference: ₨1,000 (35% higher). Possible causes: gas leak, faulty meter, or increased usage. We recommend contacting SSGC immediately.',
      saving: 'Potential leak fix: ₨1,000/month',
    },
    {
      icon: '🏘️',
      title: 'Area Comparison',
      type: 'normal',
      text: 'You use 18% more electricity than similar households in your area (3-bedroom, Karachi).',
      detail: 'Your monthly average: 320 kWh. Area average for similar homes: 271 kWh. Top reason: AC usage. Tip: Set AC to 26°C instead of 22°C to save up to 20% cooling cost.',
      saving: '₨ 600/month potential',
    },
    {
      icon: '🌙',
      title: 'Off-Peak Opportunity',
      type: 'highlight',
      text: 'You can save up to ₨1,200/month by shifting 40% of your usage to off-peak hours.',
      detail: 'Off-peak hours in your area: 11pm–7am. Appliances to shift: washing machine, water heater, EV charging. WAPDA off-peak rate is 30% cheaper than peak rate.',
      saving: '₨ 1,200/month',
    },
    {
      icon: '📊',
      title: 'Monthly Report',
      type: 'normal',
      text: 'Your total utility spend this month is ₨12,450 — down 5% from last month.',
      detail: 'Electricity: ₨7,200 | Gas: ₨3,800 | Water: ₨1,450. You saved ₨650 compared to last month by following AI tips. Keep it up!',
      saving: '₨ 650 saved this month',
    },
  ];

  return (
    <div style={{ background: '#0A0C10', minHeight: '100vh', color: '#E8EAED' }}>
      <Navbar />
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 24px' }}>

        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <h2 style={{ fontFamily: 'Syne,sans-serif', fontSize: 32, fontWeight: 700, marginBottom: 8 }}>AI Insights</h2>
          <p style={{ color: '#6B7280' }}>Personalized recommendations to reduce your bills</p>
        </div>

        {/* Total Savings Banner */}
        <div style={{ background: 'linear-gradient(135deg, rgba(61,255,192,0.1), rgba(91,158,255,0.1))', border: '1px solid rgba(61,255,192,0.2)', borderRadius: 16, padding: '28px 32px', marginBottom: 40, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ color: '#6B7280', fontSize: 14, marginBottom: 6 }}>Total Potential Monthly Savings</p>
            <p style={{ fontFamily: 'Syne,sans-serif', fontSize: 36, fontWeight: 700, color: '#3DFFC0' }}>₨ 4,420</p>
            <p style={{ color: '#6B7280', fontSize: 13, marginTop: 4 }}>Based on your last 3 months of bills</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ color: '#6B7280', fontSize: 14, marginBottom: 6 }}>AI Confidence Score</p>
            <p style={{ fontFamily: 'Syne,sans-serif', fontSize: 36, fontWeight: 700, color: '#5B9EFF' }}>94%</p>
            <p style={{ color: '#6B7280', fontSize: 13, marginTop: 4 }}>High accuracy prediction</p>
          </div>
        </div>

        {/* Insights Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          {insights.map((ins, i) => (
            <div key={i} style={{
              background: '#161A22',
              border: `1px solid ${ins.type === 'highlight' ? 'rgba(61,255,192,0.3)' : ins.type === 'alert' ? 'rgba(255,122,69,0.3)' : '#1F2533'}`,
              borderRadius: 14,
              padding: 28,
              transition: 'transform 0.2s',
            }}>
              <span style={{ fontSize: 28, display: 'block', marginBottom: 12 }}>{ins.icon}</span>
              <h3 style={{ fontFamily: 'Syne,sans-serif', fontSize: 16, marginBottom: 10 }}>{ins.title}</h3>

              {ins.tips ? (
                <ul style={{ color: '#6B7280', fontSize: 14, paddingLeft: 18, marginBottom: 16, lineHeight: 2 }}>
                  {ins.tips.map((t, j) => <li key={j}>{t}</li>)}
                </ul>
              ) : (
                <p style={{ color: '#6B7280', fontSize: 14, marginBottom: 16, lineHeight: 1.7 }}>{ins.text}</p>
              )}

              {/* Saving Badge */}
              <div style={{ background: 'rgba(61,255,192,0.08)', border: '1px solid rgba(61,255,192,0.15)', borderRadius: 8, padding: '8px 14px', marginBottom: 16, display: 'inline-block' }}>
                <span style={{ color: '#3DFFC0', fontSize: 13, fontWeight: 600 }}>💰 {ins.saving}</span>
              </div>

              {/* Expand Detail */}
              {activeTip === i ? (
                <div>
                  <p style={{ color: '#E8EAED', fontSize: 13, lineHeight: 1.8, marginBottom: 12, background: '#111318', padding: 16, borderRadius: 8 }}>
                    {ins.detail || ins.tips?.join(' • ')}
                  </p>
                  <button onClick={() => setActiveTip(null)} style={{ background: 'transparent', border: '1px solid #1F2533', color: '#6B7280', padding: '6px 14px', borderRadius: 6, fontSize: 13, cursor: 'pointer' }}>
                    Show Less ↑
                  </button>
                </div>
              ) : (
                <button onClick={() => setActiveTip(i)} style={{
                  background: 'transparent',
                  border: `1px solid ${ins.type === 'alert' ? 'rgba(255,122,69,0.3)' : '#1F2533'}`,
                  color: ins.type === 'alert' ? '#FF7A45' : '#3DFFC0',
                  padding: '6px 14px', borderRadius: 6, fontSize: 13, cursor: 'pointer'
                }}>
                  {ins.type === 'alert' ? 'Contact Provider →' : 'See Details →'}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}