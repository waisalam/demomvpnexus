import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';

export interface AddBoardDialogProps {
  open: boolean;
  onClose: () => void;
  onAddBoard: (boardName: string) => void;
}

const overlayStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
};

const dialogStyle: React.CSSProperties = {
  backgroundColor: 'var(--bg-primary, #fff)',
  color: 'var(--text-primary, #000)',
  borderRadius: '8px',
  padding: '24px',
  maxWidth: '400px',
  width: '90%',
  boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
};

const headingStyle: React.CSSProperties = {
  margin: '0 0 16px 0',
  fontSize: '1.25rem',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '8px 12px',
  fontSize: '16px',
  border: '1px solid var(--border, #ccc)',
  borderRadius: '4px',
  boxSizing: 'border-box',
  backgroundColor: 'var(--input-bg, inherit)',
  color: 'var(--text-primary, #000)',
};

const buttonContainerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '8px',
  marginTop: '16px',
};

const primaryButtonStyle: React.CSSProperties = {
  backgroundColor: 'var(--btn-primary, #1976d2)',
  color: '#fff',
  border: 'none',
  padding: '8px 16px',
  borderRadius: '4px',
  cursor: 'pointer',
};

const secondaryButtonStyle: React.CSSProperties = {
  backgroundColor: 'transparent',
  color: 'var(--text-primary, #000)',
  border: '1px solid var(--border, #ccc)',
  padding: '8px 16px',
  borderRadius: '4px',
  cursor: 'pointer',
};

export default function AddBoardDialog({ open, onClose, onAddBoard }: AddBoardDialogProps) {
  const [name, setName] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const previouslyFocusedElement = useRef<Element | null>(null);

  useEffect(() => {
    if (open) {
      previouslyFocusedElement.current = document.activeElement;
      setName('');
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
      return () => {
        clearTimeout(timer);
        // Restore focus when dialog closes
        if (previouslyFocusedElement.current instanceof HTMLElement) {
          previouslyFocusedElement.current.focus();
        }
      };
    }
  }, [open]);

  const handleSubmit = () => {
    const trimmed = name.trim();
    if (trimmed) {
      onAddBoard(trimmed);
      setName('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!open) return null;

  const modal = (
    <div
      style={overlayStyle}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-board-title"
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      <div style={dialogStyle} onClick={(e) => e.stopPropagation()}>
        <h2 id="add-board-title" style={headingStyle}>
          Add New Board
        </h2>
        <input
          ref={inputRef}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Board name"
          style={inputStyle}
          aria-label="Board name"
          onKeyDown={handleKeyDown}
        />
        <div style={buttonContainerStyle}>
          <button onClick={handleSubmit} style={primaryButtonStyle}>
            Add
          </button>
          <button onClick={onClose} style={secondaryButtonStyle}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modal, document.body);
}