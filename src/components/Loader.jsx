import React from 'react';

const Loader = () => {
  return (
    <div style={{ textAlign: 'center', padding: '3rem 0' }}>
      <div style={{
        display: 'inline-block',
        width: '60px',
        height: '60px',
        border: '4px solid rgba(139, 92, 246, 0.3)',
        borderRadius: '50%',
        borderTopColor: 'var(--primary-color)',
        animation: 'spin 1s ease-in-out infinite',
        boxShadow: '0 0 15px var(--primary-color)'
      }}></div>
      <p style={{ marginTop: '1.5rem', color: 'var(--text-muted)' }} className="neon-text">
        Generating your Qwen Workspace pass...
      </p>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Loader;
