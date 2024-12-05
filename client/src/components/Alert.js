import React, { useState } from 'react';
import {  X } from 'lucide-react';

const Alert = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isClosing, setIsClosing] = useState(false);

  

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => setIsVisible(false), 300);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed-top w-100 h-100 d-flex align-items-center justify-content-center" style={{
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
      backdropFilter: 'blur(4px)',
      zIndex: 1050
    }}>
      <div className={`
        position-relative
        shadow-sm
        ${isClosing ? 'opacity-0' : 'opacity-100'}
      `} 
      style={{ 
        maxWidth: '400px',
        width: '90%',
        transition: 'all 0.3s ease',
        backgroundColor: '#fff9db',
        borderRadius: '8px',
        padding: '20px'
      }}>
        {/* Close Button */}
        <button 
          onClick={handleClose}
          className="position-absolute"
          style={{
            top: '12px',
            right: '12px',
            border: 'none',
            background: 'none',
            padding: '4px',
            cursor: 'pointer'
          }}
        >
          <X size={20} color="#666" />
        </button>

        <div className="d-flex align-items-start gap-3">
          {/* Content */}
          <div className="w-100">
            <div className="d-flex align-items-center gap-2 mb-2">
              <span style={{ fontSize: '20px' }}>⚠️</span>
              <h3 className="m-0" style={{ 
                fontSize: '24px',
                color: '#000',
                fontWeight: 'bold'
              }}>
                Please Note
              </h3>
            </div>

            <p style={{ 
              color: '#666',
              fontSize: '15px',
              lineHeight: '1.5',
              marginBottom: '20px'
            }}>
              Login may take up to <b>2 minutes</b> because the free server is connected from Render, which requires <b>2 minutes</b> to activate.
            </p>

            <button 
              onClick={handleClose}
              className="w-100"
              style={{
                background: '#ffc107',
                border: 'none',
                borderRadius: '4px',
                padding: '10px',
                fontSize: '16px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'background 0.2s ease'
              }}
              onMouseOver={e => e.target.style.background = '#ffb300'}
              onMouseOut={e => e.target.style.background = '#ffc107'}
            >
              Got it!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alert;