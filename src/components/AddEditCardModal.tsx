import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';

export interface Card {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  tag: string;
  createdAt: string;
}

export interface AddEditCardModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (cardData: Omit<Card, 'id' | 'createdAt'> & { id?: string }) => void;
  card?: Card | null;
}

const tagOptions = [
  { name: 'Red', color: '#ef4444' },
  { name: 'Orange', color: '#f97316' },
  { name: 'Yellow', color: '#eab308' },
  { name: 'Green', color: '#22c55e' },
  { name: 'Blue', color: '#3b82f6' },
  { name: 'Purple', color: '#a855f7' },
  { name: 'Pink', color: '#ec4899' },
  { name: 'Gray', color: '#6b7280' },
];

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
  maxWidth: '480px',
  width: '90%',
  boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
};

const headingStyle: React.CSSProperties = {
  margin: '0 0 16px 0',
  fontSize: '1.25rem',
};

const fieldStyle: React.CSSProperties = {
  marginBottom: '12px',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  marginBottom: '4px',
  fontSize: '0.95rem',
  fontWeight: 500,
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

const textareaStyle: React.CSSProperties = {
  width: '100%',
  padding: '8px 12px',
  fontSize: '16px',
  border: '1px solid var(--border, #ccc)',
  borderRadius: '4px',
  boxSizing: 'border-box',
  backgroundColor: 'var(--input-bg, inherit)',
  color: 'var(--text-primary, #000)',
  resize: 'vertical',
  minHeight: '80px',
};

const selectStyle: React.CSSProperties = {
  width: '100%',
  padding: '8px 12px',
  fontSize: '16px',
  border: '1px solid var(--border, #ccc)',
  borderRadius: '4px',
  backgroundColor: 'var(--input-bg, inherit)',
  color: 'var(--text-primary, #000)',
};

const tagPickerContainerStyle: React.CSSProperties = {
  display: 'flex',
  gap: '8px',
  flexWrap: 'wrap',
  marginTop: '4px',
};

const swatchStyle = (color: string, selected: boolean): React.CSSProperties => ({
  width: '28px',
  height: '28px',
  borderRadius: '50%',
  backgroundColor: color,
  cursor: 'pointer',
  border: selected ? '3px solid var(--text-primary, #000)' : '3px solid transparent',
  boxShadow: selected ? '0 0 0 2px var(--bg-primary, #fff)' : 'none',
  transition: 'border 0.1s',
});

const buttonContainerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '8px',
  marginTop: '20px',
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

const errorStyle: React.CSSProperties = {
  color: 'var(--error, #d32f2f)',
  fontSize: '0.875rem',
  marginTop: '4px',
};

export default function AddEditCardModal(props: AddEditCardModalProps): JSX.Element {
  const { open, onClose, onSave, card } = props;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [tag, setTag] = useState('');
  const [titleError, setTitleError] = useState('');
  const [tagError, setTagError] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const previouslyFocusedElement = useRef<Element | null>(null);

  useEffect(() => {
    if (open) {
      previouslyFocusedElement.current = document.activeElement;
      if (card) {
        setTitle(card.title || '');
        setDescription(card.description || '');
        setPriority(card.priority || 'medium');
        setTag(card.tag || '');
      } else {
        setTitle('');
        setDescription('');
        setPriority('medium');
        setTag('');
      }
      setTitleError('');
      setTagError('');
      const timer = setTimeout(() => {
        titleInputRef.current?.focus();
      }, 0);
      return () => {
        clearTimeout(timer);
        if (previouslyFocusedElement.current instanceof HTMLElement) {
          previouslyFocusedElement.current.focus();
        }
      };
    }
  }, [open, card]);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (e.key === 'Tab' && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'input, textarea, select, button, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (!first || !last) return;

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  const validate = (): boolean => {
    let valid = true;
    if (title.trim().length === 0) {
      setTitleError('Title is required');
      valid = false;
    } else {
      setTitleError('');
    }
    if (!tag) {
      setTagError('Please select a tag');
      valid = false;
    } else {
      setTagError('');
    }
    return valid;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    const data: Omit<Card, 'id' | 'createdAt'> & { id?: string } = {
      title: title.trim(),
      description: description.trim(),
      priority,
      tag,
    };
    if (card?.id) {
      data.id = card.id;
    }
    onSave(data);
    onClose();
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!open) return <></>;

  return ReactDOM.createPortal(
    <div style={overlayStyle} onClick={handleOverlayClick} role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div ref={modalRef} style={dialogStyle}>
        <h2 id="modal-title" style={headingStyle}>
          {card ? 'Edit Card' : 'Add Card'}
        </h2>
        <div style={fieldStyle}>
          <label style={labelStyle} htmlFor="card-title">
            Title *
          </label>
          <input
            ref={titleInputRef}
            id="card-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={inputStyle}
          />
          {titleError && <div style={errorStyle}>{titleError}</div>}
        </div>
        <div style={fieldStyle}>
          <label style={labelStyle} htmlFor="card-description">
            Description
          </label>
          <textarea
            id="card-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={textareaStyle}
          />
        </div>
        <div style={fieldStyle}>
          <label style={labelStyle} htmlFor="card-priority">
            Priority
          </label>
          <select
            id="card-priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
            style={selectStyle}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div style={fieldStyle}>
          <label style={labelStyle}>
            Tag *
          </label>
          <div style={tagPickerContainerStyle}>
            {tagOptions.map((opt) => (
              <button
                key={opt.name}
                type="button"
                onClick={() => {
                  setTag(opt.name);
                  setTagError('');
                }}
                style={swatchStyle(opt.color, tag === opt.name)}
                title={opt.name}
                aria-label={`Tag ${opt.name}`}
                aria-pressed={tag === opt.name}
              />
            ))}
          </div>
          {tag && (
            <div style={{ marginTop: '4px', fontSize: '0.9rem' }}>
              Selected: <span style={{ fontWeight: 500 }}>{tag}</span>
            </div>
          )}
          {tagError && <div style={errorStyle}>{tagError}</div>}
        </div>
        <div style={buttonContainerStyle}>
          <button type="button" onClick={onClose} style={secondaryButtonStyle}>
            Cancel
          </button>
          <button type="button" onClick={handleSubmit} style={primaryButtonStyle}>
            {card ? 'Save Changes' : 'Add Card'}
          </button>
        </div>
      </div>
    </div>,
    document.getElementById('modal-root') || document.body
  );
}