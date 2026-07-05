import React, { useState, useRef, useEffect } from 'react';
import type { Todo } from '../types/todo';

export interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, title: string) => void;
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
    medium: '#b8860b', // dark goldenrod for visible contrast
    high: 'red',
  };

  const formattedDate = todo.createdAt
    ? new Date(todo.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : '';

  return (
    <li className="todo-item" aria-label={`Todo: ${todo.title}`}>
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
        />
      ) : (
        <span
          className="todo-title"
          role="button"
          tabIndex={0}
          onDoubleClick={handleDoubleClick}
          onKeyDown={handleTitleKeyDown}
          aria-label={`Edit "${todo.title}"`}
        >
          {todo.title}
        </span>
      )}
      <span
        className="todo-priority-badge"
        style={{ color: priorityColor[todo.priority] || 'black' }}
        aria-label={`Priority: ${todo.priority}`}
      >
        {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
      </span>
      <span className="todo-date">{formattedDate}</span>
      <button onClick={handleDelete} aria-label={`Delete "${todo.title}"`}>
        Delete
      </button>
    </li>
  );
}