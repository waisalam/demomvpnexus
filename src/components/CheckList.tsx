import React, { useState, useRef, useCallback } from 'react';

export interface SubtaskItem {
  id: string;
  text: string;
  completed: boolean;
}

export interface CheckListProps {
  subtasks: SubtaskItem[];
  onAdd: (text: string) => void;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
}

const containerStyle: React.CSSProperties = {
  marginTop: '12px',
};

const headingStyle: React.CSSProperties = {
  margin: '0 0 8px 0',
  fontSize: '1rem',
  fontWeight: 600,
  color: '#333',
};

const subtaskListStyle: React.CSSProperties = {
  listStyle: 'none',
  padding: 0,
  margin: 0,
};

const subtaskItemStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  padding: '6px 0',
  borderBottom: '1px solid #f0f0f0',
  gap: '8px',
};

const checkboxStyle: React.CSSProperties = {
  cursor: 'pointer',
  marginRight: '4px',
};

const textStyle: React.CSSProperties = {
  flex: 1,
  fontSize: '0.95rem',
  color: '#222',
};

const completedTextStyle: React.CSSProperties = {
  ...textStyle,
  textDecoration: 'line-through',
  color: '#888',
};

const deleteButtonStyle: React.CSSProperties = {
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  color: '#999',
  fontSize: '1.1rem',
  padding: '2px 6px',
  borderRadius: '4px',
  lineHeight: 1,
};

const addRowStyle: React.CSSProperties = {
  display: 'flex',
  gap: '8px',
  marginTop: '12px',
};

const inputStyle: React.CSSProperties = {
  flex: 1,
  padding: '6px 10px',
  fontSize: '0.95rem',
  border: '1px solid #ddd',
  borderRadius: '4px',
  boxSizing: 'border-box',
};

const addButtonStyle: React.CSSProperties = {
  padding: '6px 14px',
  border: '1px solid #ddd',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '0.9rem',
  background: '#1976d2',
  color: '#fff',
  borderColor: '#1976d2',
};

export default function CheckList({
  subtasks,
  onAdd,
  onToggle,
  onRemove,
}: CheckListProps): JSX.Element {
  const [inputText, setInputText] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAdd = useCallback(() => {
    const trimmed = inputText.trim();
    if (trimmed) {
      onAdd(trimmed);
      setInputText('');
      // Keep focus on the input for fast consecutive entries
      inputRef.current?.focus();
    }
  }, [inputText, onAdd]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleAdd();
      }
    },
    [handleAdd],
  );

  return (
    <div style={containerStyle}>
      <div style={headingStyle}>Subtasks</div>
      {subtasks.length === 0 ? (
        <div style={{ color: '#666', fontSize: '0.9rem', marginBottom: '8px' }}>
          No subtasks yet.
        </div>
      ) : (
        <ul style={subtaskListStyle}>
          {subtasks.map((subtask) => (
            <li key={subtask.id} style={subtaskItemStyle}>
              <label style={{ display: 'flex', alignItems: 'center', flex: 1, cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={subtask.completed}
                  onChange={() => onToggle(subtask.id)}
                  style={checkboxStyle}
                />
                <span style={subtask.completed ? completedTextStyle : textStyle}>
                  {subtask.text}
                </span>
              </label>
              <button
                onClick={() => onRemove(subtask.id)}
                style={deleteButtonStyle}
                aria-label={`Delete subtask: ${subtask.text}`}
                title="Delete subtask"
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      )}
      <div style={addRowStyle}>
        <input
          ref={inputRef}
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add a subtask..."
          style={inputStyle}
          aria-label="New subtask text"
        />
        <button onClick={handleAdd} style={addButtonStyle} disabled={!inputText.trim()}>
          Add
        </button>
      </div>
    </div>
  );
}