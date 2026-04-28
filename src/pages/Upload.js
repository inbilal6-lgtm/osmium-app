import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Tesseract from 'tesseract.js';

export default function Upload() {
  const [stage, setStage] = useState('idle');
  const [progress, setProgress] = useState(0);
  const [extracted, setExtracted] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [preview, setPreview] = useState(null);
  const [ocrText, setOcrText] = useState('');

  const parseOCRText = (text) => {
    const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
    let amount = '—', units = '—', period = '—', provider = '—', due = '—', type = '—';
    const fullText = text.toLowerCase();

    if (fullText.includes('gepco')) { type = 'Electricity'; provider = 'GEPCO'; }
    else if (fullText.includes('lesco')) { type = 'Electricity'; provider = 'LESCO'; }
    else if (fullText.includes('k-electric') || fullText.includes('kesc')) { type = 'Electricity'; provider = 'K-Electric'; }
    else if (fullText.includes('wapda')) { type = 'Electricity'; provider = 'WAPDA'; }
    else if (fullText.includes('iesco')) { type = 'Electricity'; provider = 'IESCO'; }
    else if (fullText.includes('fesco')) { type = 'Electricity'; provider = 'FESCO'; }
    else if (fullText.includes('ssgc')) { type = 'Gas'; provider = 'SSGC'; }
    else if (fullText.includes('sngpl')) { type = 'Gas'; provider = 'SNGPL'; }
    else if (fullText.includes('kwsb')) { type = 'Water'; provider = 'KWSB'; }
    else if (fullText.includes('electric')) { type = 'Electricity'; }
    else if (fullText.includes('gas')) { type = 'Gas'; }
    else if (fullText.includes('water')) { type = 'Water'; }

    for (const line of lines) {
      if (amount === '—') {
        const patterns = [
          /(?:payable|net payable|total|amount due|bill amount)[^\d]*([\d,]+)/i,
          /(?:rs\.?|₨|pkr)\s*([\d,]+)/i,
          /(\d{3,6})\s*(?:\/\-|\.00)/,
        ];
        for (const p of patterns) {
          const m = line.match(p);
          if (m) { amount = '₨ ' + m[1].replace(/,/g, ''); break; }
        }
      }
      if (units === '—') {
        const m = line.match(/(\d+)\s*(?:kwh|kw\.?h|units consumed|unit)/i);
        if (m) units = m[1] + ' kWh';
      }
      if (due === '—') {
        const m = line.match(/(?:due date|last date|payment due)[^\d]*([\d\/\-]+)/i);
        if (m) due = m[1];
      }
      if (period === '—') {
        const m = line.match(/(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*[\s\-,]*\d{2,4}/i);
        if (m) period = m[0];
      }
    }

    if (amount === '—') {
      const nums = [...text.matchAll(/\b(\d{4,6})\b/g)].map(m => parseInt(m[1]));
      if (nums.length > 0) amount = '₨ ' + Math.max(...nums);
    }

    return { 'Bill Type': type, 'Amount': amount, 'Units Used': units, 'Billing Period': period, 'Provider': provider, 'Due Date': due };
  };

  const processFile = (file) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    setStage('loading');
    setProgress(0);

    Tesseract.recognize(file, 'eng', {
      logger: (m) => {
        if (m.status === 'recognizing text') {
          setProgress(Math.round(m.progress * 100));
        }
      },
    }).then(({ data: { text } }) => {
      setOcrText(text);
      const parsed = parseOCRText(text);
      setExtracted(parsed);
      setStage('done');
    }).catch(() => {
      setStage('done');
      setExtracted({
        'Bill Type': 'Unknown', 'Amount': '—',
        'Units Used': '—', 'Billing Period': '—',
        'Provider': '—', 'Due Date': '—',
      });
    });
  };

  const handleFile = (e) => processFile(e.target.files[0]);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    processFile(e.dataTransfer.files[0]);
  };

  const reset = () => {
    setStage('idle');
    setProgress(0);
    setExtracted(null);
    setPreview(null);
    setOcrText('');
  };

  return (
    <div style={{ background: '#0A0C10', minHeight: '100vh', color: '#E8EAED' }}>
      <Navbar />
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '60px 24px' }}>

        <div style={{ marginBottom: 40 }}>
          <h2 style={{ fontFamily: 'Syne,sans-serif', fontSize: 32, fontWeight: 700, marginBottom: 8 }}>Upload Your Bill</h2>
          <p style={{ color: '#6B7280' }}>Real AI-powered OCR — scan any utility bill instantly</p>
        </div>

        <div style={{ display: 'flex', gap: 12, marginBottom: 32 }}>
          {[
            { icon: '⚡', label: 'Electricity', color: '#5B9EFF' },
            { icon: '🔥', label: 'Gas', color: '#FF7A45' },
            { icon: '💧', label: 'Water', color: '#3DFFC0' },
          ].map((b, i) => (
            <div key={i} style={{ background: '#161A22', border: '1px solid #1F2533', borderRadius: 10, padding: '12px 20px', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 18 }}>{b.icon}</span>
              <span style={{ color: b.color, fontSize: 14, fontWeight: 500 }}>{b.label}</span>
            </div>
          ))}
        </div>

        {/* IDLE */}
        {stage === 'idle' && (
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            style={{
              border: `2px dashed ${dragOver ? '#3DFFC0' : '#1F2533'}`,
              borderRadius: 16, padding: '60px 40px', textAlign: 'center',
              transition: 'all 0.2s',
              background: dragOver ? 'rgba(61,255,192,0.03)' : 'transparent',
            }}
          >
            <span style={{ fontSize: 56, display: 'block', marginBottom: 16 }}>📂</span>
            <p style={{ fontFamily: 'Syne,sans-serif', fontSize: 22, marginBottom: 8 }}>
              Drag & drop your bill here
            </p>
            <p style={{ color: '#6B7280', fontSize: 14, marginBottom: 28 }}>
              Supports JPG, PNG · Max 10MB
            </p>
            <label style={{ background: '#3DFFC0', border: 'none', color: '#0A0C10', padding: '12px 28px', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer', display: 'inline-block' }}>
              Browse File
              <input type="file" accept="image/*" hidden onChange={handleFile} />
            </label>
          </div>
        )}

        {/* LOADING */}
        {stage === 'loading' && (
          <div style={{ background: '#161A22', border: '1px solid #1F2533', borderRadius: 16, padding: '48px 40px', textAlign: 'center' }}>
            {preview && (
              <img src={preview} alt="preview" style={{ maxHeight: 180, borderRadius: 8, marginBottom: 24, opacity: 0.6 }} />
            )}
            <div style={{
              width: 48, height: 48, border: '3px solid #1F2533',
              borderTopColor: '#3DFFC0', borderRadius: '50%',
              animation: 'spin 0.8s linear infinite', margin: '0 auto 20px',
            }} />
            <p style={{ fontFamily: 'Syne,sans-serif', fontSize: 18, marginBottom: 8 }}>Reading your bill with AI...</p>
            <p style={{ color: '#6B7280', fontSize: 14, marginBottom: 24 }}>Tesseract.js OCR is scanning your bill</p>
            <div style={{ background: '#1F2533', borderRadius: 4, height: 6, overflow: 'hidden', marginBottom: 8 }}>
              <div style={{ height: '100%', background: '#3DFFC0', borderRadius: 4, width: `${progress}%`, transition: 'width 0.3s' }} />
            </div>
            <p style={{ color: '#3DFFC0', fontSize: 14, fontWeight: 600 }}>{progress}%</p>
          </div>
        )}

        {/* DONE */}
        {stage === 'done' && extracted && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: preview ? '1fr 1fr' : '1fr', gap: 20, marginBottom: 20 }}>
              {preview && (
                <div style={{ background: '#161A22', border: '1px solid #1F2533', borderRadius: 16, padding: 16, textAlign: 'center' }}>
                  <p style={{ color: '#6B7280', fontSize: 12, marginBottom: 12 }}>UPLOADED BILL</p>
                  <img src={preview} alt="bill" style={{ maxWidth: '100%', borderRadius: 8, maxHeight: 300, objectFit: 'contain' }} />
                </div>
              )}
              <div style={{ background: '#161A22', border: '1px solid rgba(61,255,192,0.3)', borderRadius: 16, padding: 24 }}>
                <p style={{ color: '#3DFFC0', fontSize: 12, marginBottom: 16, fontWeight: 600 }}>✅ EXTRACTED DATA</p>
                {Object.entries(extracted).map(([k, v]) => (
                  <div key={k} style={{ marginBottom: 16 }}>
                    <label style={{ color: '#6B7280', fontSize: 12, display: 'block', marginBottom: 4 }}>{k}</label>
                    <span style={{ fontSize: 15, fontWeight: 600, color: v === '—' ? '#6B7280' : '#E8EAED' }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>

            {ocrText && (
              <details style={{ background: '#161A22', border: '1px solid #1F2533', borderRadius: 12, padding: 16, marginBottom: 20 }}>
                <summary style={{ color: '#6B7280', fontSize: 13, cursor: 'pointer' }}>👁 View Raw OCR Text</summary>
                <pre style={{ color: '#6B7280', fontSize: 11, marginTop: 12, whiteSpace: 'pre-wrap', maxHeight: 200, overflow: 'auto' }}>{ocrText}</pre>
              </details>
            )}

            <div style={{ display: 'flex', gap: 12 }}>
              <button onClick={reset} style={{ background: 'transparent', border: '1px solid #1F2533', color: '#6B7280', padding: '12px 24px', borderRadius: 8, fontSize: 14, cursor: 'pointer', flex: 1 }}>
                Upload Another Bill
              </button>
              <button style={{ background: '#3DFFC0', border: 'none', color: '#0A0C10', padding: '12px 24px', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer', flex: 2 }}>
                Save & Get AI Insights →
              </button>
            </div>
          </div>
        )}

      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <Footer />
    </div>
  );
}