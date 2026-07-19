import React, { useState, useRef, useEffect } from 'react';
import type { Todo } from '../types/todo';

export interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, title: string) => void;
}

function formatRelativeTime(dateString: string): string {
  const now = Date.now();
  const then = new Date(dateString).getTime();
  const diffMs = now - then;
  const diffMinutes = Math.floor(diffMs / 60000);
  if (diffMinutes < 1) return 'just now';
  if (diffMinutes < 60) return `${diffMinutes} minute${diffMinutes === 1 ? '' : 's'} ago`;
  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 30) return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`;
  const diffMonths = Math.floor(diffDays / 30);
  return `${diffMonths} month${diffMonths === 1 ? '' : 's'} ago`;
}

export default function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps): React.ReactElement {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  useEffect(() => {
    setEditTitle(todo.title);
  }, [todo.title]);

  const handleDoubleClick = (): void => {
    setIsEditing(true);
  };

  const handleTitleKeyDown = (e: React.KeyboardEvent<HTMLSpanElement>): void => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setIsEditing(true);
    }
  };

  const handleEditBlur = (): void => {
    commitEdit();
  };

  const handleEditKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      e.preventDefault();
      commitEdit();
    } else if (e.key === 'Escape') {
      setEditTitle(todo.title);
      setIsEditing(false);
    }
  };

  const commitEdit = (): void => {
    const trimmed = editTitle.trim();
    if (trimmed && trimmed !== todo.title) {
      onEdit(todo.id, trimmed);
    }
    setEditTitle(todo.title);
    setIsEditing(false);
  };

  const handleToggle = (): void => {
    onToggle(todo.id);
  };

  const handleDelete = (): void => {
    onDelete(todo.id);
  };

  const priorityColor: Record<string, string> = {
    low: 'green',
    medium: 'orange',
    high: 'red',
  };

  const formattedDate = todo.createdAt ? formatRelativeTime(todo.createdAt) : '';

  return (
    <li
      className="todo-item"
      aria-label={`Todo: ${todo.title}`}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '8px 12px',
        listStyle: 'none',
      }}
    >
      <input
        type="checkbox"
        checked={todo.done}
        onChange={handleToggle}
        aria-label={`Mark "${todo.title}" as ${todo.done ? 'incomplete' : 'complete'}`}
      />
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={editTitle}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditTitle(e.target.value)}
          onBlur={handleEditBlur}
          onKeyDown={handleEditKeyDown}
          aria-label="Edit todo title"
          style={{ flex: 1 }}
        />
      ) : (
        <span
          className="todo-title"
          role="button"
          tabIndex={0}
          onDoubleClick={handleDoubleClick}
          onKeyDown={handleTitleKeyDown}
          aria-label={`Edit "${todo.title}"`}
          style={{ flex: 1, cursor: 'pointer' }}
        >
          {todo.title}
        </span>
      )}
      <span
        className="todo-priority-badge"
        style={{
          color: priorityColor[todo.priority] || 'black',
          fontWeight: 600,
          fontSize: '0.85rem',
          padding: '2px 6px',
          borderRadius: '4px',
          textTransform: 'capitalize',
        }}
        aria-label={`Priority: ${todo.priority}`}
      >
        {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
      </span>
      <span
        className="todo-date"
        style={{
          fontSize: '0.8rem',
          color: '#6b7280',
          whiteSpace: 'nowrap',
        }}
      >
        {formattedDate}
      </span>
      <button
        onClick={handleDelete}
        aria-label={`Delete "${todo.title}"`}
        style={{
          background: 'transparent',
          border: '1px solid #e5e7eb',
          borderRadius: '4px',
          padding: '4px 8px',
          cursor: 'pointer',
          fontSize: '0.8rem',
          color: '#374151',
        }}
      >
        Delete
      </button>
    </li>
  );
}