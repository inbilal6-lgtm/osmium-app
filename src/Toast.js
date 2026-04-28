import React, { useState, useEffect } from 'react';

// Toast Component
export function Toast({ message, type = 'success', onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div style={{
      position: 'fixed',
      bottom: 28,
      right: 28,
      background: '#111318',
      border: `1px solid ${type === 'success' ? 'rgba(61,255,192,0.3)' : type === 'error' ? 'rgba(255,122,69,0.3)' : 'rgba(91,158,255,0.3)'}`,
      borderRadius: 14,
      padding: '16px 22px',
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      zIndex: 99999,
      boxShadow: '0 24px 60px rgba(0,0,0,0.5)',
      minWidth: 280,
      maxWidth: 380,
      animation: 'slideInToast 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
    }}>
      <style>{`
        @keyframes slideInToast {
          from { opacity: 0; transform: translateX(100px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>

      {/* Icon */}
      <div style={{
        width: 36, height: 36, borderRadius: 10,
        background: type === 'success' ? 'rgba(61,255,192,0.1)' : type === 'error' ? 'rgba(255,122,69,0.1)' : 'rgba(91,158,255,0.1)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 16, flexShrink: 0,
      }}>
        {type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'}
      </div>

      {/* Message */}
      <div style={{ flex: 1 }}>
        <p style={{
          color: type === 'success' ? '#3DFFC0' : type === 'error' ? '#FF7A45' : '#5B9EFF',
          fontSize: 13, fontWeight: 700, marginBottom: 2,
        }}>
          {type === 'success' ? 'Success' : type === 'error' ? 'Error' : 'Info'}
        </p>
        <p style={{ color: '#9CA3AF', fontSize: 13 }}>{message}</p>
      </div>

      {/* Close */}
      <button onClick={onClose} style={{
        background: 'transparent', border: 'none',
        color: '#4B5563', cursor: 'pointer', fontSize: 16,
        padding: 4, flexShrink: 0,
      }}>✕</button>
    </div>
  );
}

// Toast Hook
export function useToast() {
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const ToastContainer = () => (
    <div style={{ position: 'fixed', bottom: 28, right: 28, zIndex: 99999, display: 'flex', flexDirection: 'column', gap: 12 }}>
      {toasts.map((toast, i) => (
        <div key={toast.id} style={{ transform: `translateY(${-i * 8}px)` }}>
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => removeToast(toast.id)}
          />
        </div>
      ))}
    </div>
  );

  return { showToast, ToastContainer };
}