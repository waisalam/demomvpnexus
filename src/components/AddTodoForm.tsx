import * as React from 'react';
import { useTodos } from '../store/useTodos';
import type { Todo } from '../types/todo';

export default function AddTodoForm() {
  const [title, setTitle] = React.useState('');
  const [priority, setPriority] = React.useState<Todo['priority']>('medium');
  const [error, setError] = React.useState<string | null>(null);
  const { addTodo } = useTodos();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) {
      setError('Please enter a todo title');
      return;
    }
    addTodo(trimmed, priority);
    setTitle('');
    setPriority('medium');
    setError(null);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.target.value);
    if (error) setError(null);
  };

  const cardStyle: React.CSSProperties = {
    padding: '24px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
    backgroundColor: '#fff',
    maxWidth: '480px',
    margin: '0 auto',
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 12px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    fontSize: '16px',
    outline: 'none',
    boxSizing: 'border-box',
  };

  const selectWrapperStyle: React.CSSProperties = {
    position: 'relative',
    width: '100%',
  };

  const selectStyle: React.CSSProperties = {
    ...inputStyle,
    appearance: 'none',
    paddingRight: '36px',
    cursor: 'pointer',
  };

  const arrowStyle: React.CSSProperties = {
    position: 'absolute',
    right: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    pointerEvents: 'none',
    color: '#666',
    fontSize: '12px',
  };

  const buttonStyle: React.CSSProperties = {
    padding: '10px 20px',
    backgroundColor: '#4f46e5',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  };

  const errorStyle: React.CSSProperties = {
    color: '#dc2626',
    fontSize: '14px',
    marginTop: '4px',
    marginBottom: 0,
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    marginBottom: '6px',
    fontWeight: 600,
    color: '#374151',
  };

  return React.createElement(
    'form',
    { onSubmit: handleSubmit, 'aria-label': 'Add a new todo', style: cardStyle },
    React.createElement(
      'div',
      { className: 'add-todo-form', style: { display: 'flex', flexDirection: 'column', gap: '16px' } },
      React.createElement(
        'div',
        null,
        React.createElement('label', { htmlFor: 'todo-title', style: labelStyle }, 'Title'),
        React.createElement('input', {
          id: 'todo-title',
          type: 'text',
          value: title,
          onChange: handleTitleChange,
          placeholder: 'What needs to be done?',
          'aria-label': 'Todo title',
          'aria-required': 'true',
          style: inputStyle,
        }),
        error && React.createElement('p', { style: errorStyle }, error)
      ),
      React.createElement(
        'div',
        null,
        React.createElement('label', { htmlFor: 'todo-priority', style: labelStyle }, 'Priority'),
        React.createElement(
          'div',
          { style: selectWrapperStyle },
          React.createElement(
            'select',
            {
              id: 'todo-priority',
              value: priority,
              onChange: (e: React.ChangeEvent<HTMLSelectElement>) =>
                setPriority(e.target.value as Todo['priority']),
              style: selectStyle,
            },
            React.createElement('option', { value: 'low' }, 'Low'),
            React.createElement('option', { value: 'medium' }, 'Medium'),
            React.createElement('option', { value: 'high' }, 'High')
          ),
          React.createElement('span', { style: arrowStyle }, '▼')
        )
      ),
      React.createElement('button', { type: 'submit', style: buttonStyle, 'aria-label': 'Add todo' }, '+')
    )
  );
}