import React from 'react';
import { useTodos } from '../store/useTodos';
import AddTodoForm from './AddTodoForm';
import TodoList from './TodoList';
import ThemeToggle from './ThemeToggle';

const containerStyle: React.CSSProperties = {
  maxWidth: '720px',
  margin: '0 auto',
  padding: '24px 16px',
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
};

const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  margin: 0,
  fontSize: '2rem',
  fontWeight: 700,
  color: '#1a1a2e',
};

const subheaderStyle: React.CSSProperties = {
  textAlign: 'center',
  margin: 0,
  fontSize: '1rem',
  color: '#555',
};

const headerRowStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '12px',
};

export default function Home(): React.ReactElement {
  const { todos } = useTodos();

  return (
    <main style={containerStyle}>
      <div style={headerRowStyle}>
        <div>
          <h1 style={headerStyle}>Todo Manager</h1>
          <p style={subheaderStyle}>
            Organize your tasks. Get things done.
          </p>
        </div>
        <ThemeToggle />
      </div>

      <AddTodoForm />

      {/* The TodoList already provides filter (all/active/completed) and counts */}
      {todos.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#888', marginTop: '24px' }}>
          No tasks yet. Add one above!
        </p>
      ) : (
        <TodoList />
      )}
    </main>
  );
}