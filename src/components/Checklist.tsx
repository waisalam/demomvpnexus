import React, { useState } from 'react';

export interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

export interface ChecklistProps {
  items: ChecklistItem[];
  onAddItem: (text: string) => void;
  onToggleItem: (id: string) => void;
  onDeleteItem: (id: string) => void;
}

const listStyle: React.CSSProperties = {
  listStyle: 'none',
  padding: 0,
  margin: 0,
};

const listItemStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  padding: '4px 0',
};

const checkboxStyle: React.CSSProperties = {
  cursor: 'pointer',
};

const itemTextStyle: React.CSSProperties = {
  flex: 1,
  fontSize: '0.95rem',
  color: 'var(--text-primary, #000)',
};

const completedTextStyle: React.CSSProperties = {
  textDecoration: 'line-through',
  opacity: 0.6,
};

const deleteButtonStyle: React.CSSProperties = {
  background: 'none',
  border: 'none',
  color: '#ef4444',
  cursor: 'pointer',
  fontSize: '1.1rem',
  padding: '2px 4px',
  lineHeight: 1,
};

const addSectionStyle: React.CSSProperties = {
  display: 'flex',
  gap: '8px',
  marginTop: '12px',
};

const inputStyle: React.CSSProperties = {
  flex: 1,
  padding: '6px 10px',
  fontSize: '16px',
  border: '1px solid var(--border, #ccc)',
  borderRadius: '4px',
  backgroundColor: 'var(--input-bg, inherit)',
  color: 'var(--text-primary, #000)',
};

const addButtonStyle: React.CSSProperties = {
  backgroundColor: 'var(--btn-primary, #1976d2)',
  color: '#fff',
  border: 'none',
  padding: '6px 12px',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '0.95rem',
};

export default function Checklist({ items, onAddItem, onToggleItem, onDeleteItem }: ChecklistProps): JSX.Element {
  const [newItemText, setNewItemText] = useState('');

  const handleAdd = () => {
    const trimmed = newItemText.trim();
    if (trimmed) {
      onAddItem(trimmed);
      setNewItemText('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  };

  return (
    <div role="group" aria-label="Checklist">
      <ul role="list" style={listStyle}>
        {items.map((item) => (
          <li key={item.id} role="listitem" style={listItemStyle}>
            <input
              type="checkbox"
              checked={item.completed}
              onChange={() => onToggleItem(item.id)}
              style={checkboxStyle}
              aria-label={`Mark "${item.text}" as ${item.completed ? 'incomplete' : 'complete'}`}
            />
            <span style={item.completed ? { ...itemTextStyle, ...completedTextStyle } : itemTextStyle}>
              {item.text}
            </span>
            <button
              onClick={() => onDeleteItem(item.id)}
              style={deleteButtonStyle}
              aria-label={`Delete "${item.text}"`}
              title="Delete item"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
      <div style={addSectionStyle}>
        <label htmlFor="checklist-new-item-input" style={{ position: 'absolute', left: '-9999px' }}>
          New item text
        </label>
        <input
          id="checklist-new-item-input"
          type="text"
          value={newItemText}
          onChange={(e) => setNewItemText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add new item…"
          style={inputStyle}
          aria-label="New item text"
        />
        <button onClick={handleAdd} style={addButtonStyle} disabled={!newItemText.trim()}>
          Add
        </button>
      </div>
    </div>
  );
}