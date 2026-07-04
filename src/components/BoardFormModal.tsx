import React, { useState, useEffect, useRef, useCallback } from 'react';

export interface BoardFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string) => void;
  initialName?: string;
}

const overlayStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
};

const modalStyle: React.CSSProperties = {
  backgroundColor: '#fff',
  borderRadius: '8px',
  padding: '24px',
  minWidth: '320px',
  maxWidth: '90vw',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
};

const headingStyle: React.CSSProperties = {
  margin: '0 0 16px 0',
  fontSize: '1.25rem',
  fontWeight: 600,
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '8px 12px',
  fontSize: '1rem',
  border: '1px solid #ddd',
  borderRadius: '4px',
  marginBottom: '16px',
  boxSizing: 'border-box',
};

const buttonGroupStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '8px',
};

const buttonStyle: React.CSSProperties = {
  padding: '8px 16px',
  border: '1px solid #ddd',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '0.9rem',
  background: '#f5f5f5',
};

const primaryButtonStyle: React.CSSProperties = {
  ...buttonStyle,
  background: '#1976d2',
  color: '#fff',
  border: 'none',
};

export default function BoardFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialName = '',
}: BoardFormModalProps): JSX.Element | null {
  const [name, setName] = useState(initialName);
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Reset name when modal opens or initialName changes
  useEffect(() => {
    if (isOpen) {
      setName(initialName);
      previousActiveElement.current = document.activeElement as HTMLElement;
    }
  }, [isOpen, initialName]);

  // Focus management: trap focus inside modal when open
  useEffect(() => {
    if (!isOpen) return;

    const modal = modalRef.current;
    if (!modal) return;

    const focusableElements =
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

    const firstFocusable = modal.querySelector<HTMLElement>(focusableElements);
    const focusable = modal.querySelectorAll<HTMLElement>(focusableElements);
    const lastFocusable = focusable[focusable.length - 1];

    // Move focus to first focusable element
    firstFocusable?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (e.key === 'Tab') {
        if (!focusable.length) return;

        if (e.shiftKey) {
          if (document.activeElement === firstFocusable!) {
            e.preventDefault();
            lastFocusable.focus();
          }
        } else {
          if (document.activeElement === lastFocusable) {
            e.preventDefault();
            firstFocusable!.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      // Restore focus to previous element when modal closes
      if (previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    };
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (trimmed) {
      onSubmit(trimmed);
      onClose();
    }
  };

  // Close on overlay click only if the click target is the overlay (not modal content)
  const handleOverlayClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  if (!isOpen) return null;

  return (
    <div
      style={overlayStyle}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="board-modal-title"
    >
      <div ref={modalRef} style={modalStyle}>
        <h2 id="board-modal-title" style={headingStyle}>
          {initialName ? 'Rename Board' : 'Create Board'}
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter board name"
            autoFocus
            style={inputStyle}
            aria-label="Board name"
          />
          <div style={buttonGroupStyle}>
            <button type="button" onClick={onClose} style={buttonStyle}>
              Cancel
            </button>
            <button
              type="submit"
              disabled={!name.trim()}
              style={{
                ...primaryButtonStyle,
                opacity: name.trim() ? 1 : 0.6,
                cursor: name.trim() ? 'pointer' : 'not-allowed',
              }}
            >
              {initialName ? 'Save' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}