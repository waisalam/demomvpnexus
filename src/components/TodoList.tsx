import React, { useMemo, useState } from 'react';
import { useTodos } from '../store/useTodos';
import TodoItem from './TodoItem';
import type { Todo, Filter } from '../types/todo';

const FILTERS: Filter[] = ['all', 'active', 'done'];

const segmentedStyle: React.CSSProperties = {
  display: 'flex',
  border: '1px solid #ccc',
  borderRadius: 8,
  overflow: 'hidden',
};

const buttonBaseStyle: React.CSSProperties = {
  flex: 1,
  padding: '0.5rem 1rem',
  border: 'none',
  cursor: 'pointer',
  fontSize: '0.875rem',
  transition: 'background-color 0.2s',
};

const activeButtonStyle: React.CSSProperties = {
  ...buttonBaseStyle,
  backgroundColor: '#007bff',
  color: '#fff',
  fontWeight: 600,
};

const inactiveButtonStyle: React.CSSProperties = {
  ...buttonBaseStyle,
  backgroundColor: '#f0f0f0',
  color: '#333',
};

const badgeStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: 20,
  height: 20,
  padding: '0 6px',
  borderRadius: 10,
  backgroundColor: '#007bff',
  color: '#fff',
  fontSize: '0.75rem',
  fontWeight: 700,
  marginLeft: 8,
};

export default function TodoList(): React.ReactElement {
  const { todos, toggleTodo, deleteTodo, updateTodo } = useTodos();
  const [filter, setFilter] = useState<Filter>('all');

  const activeCount = useMemo(() => todos.filter((t: Todo) => !t.done).length, [todos]);
  const completedCount = useMemo(() => todos.filter((t: Todo) => t.done).length, [todos]);

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter((t: Todo) => !t.done);
      case 'done':
        return todos.filter((t: Todo) => t.done);
      default:
        return todos;
    }
  }, [todos, filter]);

  const handleSetFilter = (newFilter: Filter): void => {
    setFilter(newFilter);
  };

  const handleClearCompleted = (): void => {
    todos
      .filter((t: Todo) => t.done)
      .forEach((t: Todo) => {
        deleteTodo(t.id);
      });
  };

  return (
    <div className="todo-list" style={{ padding: '16px 0' }}>
      <div className="filter-bar" style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <p className="todo-count" style={{ margin: 0, fontSize: '0.875rem' }}>
            {activeCount} item{activeCount !== 1 ? 's' : ''} left
          </p>
          {activeCount > 0 && (
            <span style={badgeStyle}>{activeCount}</span>
          )}
        </div>

        <div className="filters" style={segmentedStyle}>
          {FILTERS.map((f: Filter) => {
            const isActive = filter === f;
            return (
              <button
                key={f}
                className={`filter-btn ${isActive ? 'active' : ''}`}
                style={isActive ? activeButtonStyle : inactiveButtonStyle}
                aria-pressed={isActive}
                onClick={() => handleSetFilter(f)}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            );
          })}
        </div>

        {completedCount > 0 && (
          <button
            className="clear-completed"
            style={{
              padding: '0.5rem 1rem',
              border: 'none',
              borderRadius: 8,
              backgroundColor: '#dc3545',
              color: '#fff',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: 600,
            }}
            onClick={handleClearCompleted}
          >
            Clear completed ({completedCount})
          </button>
        )}
      </div>

      {filteredTodos.length === 0 ? (
        <p
          className="empty-message"
          style={{
            textAlign: 'center',
            padding: '2rem 0',
            color: '#666',
            fontStyle: 'italic',
          }}
        >
          {todos.length === 0 ? 'No todos yet. Add one above!' : 'No todos match the filter.'}
        </p>
      ) : (
        <ul className="todos" aria-label="Todo list" style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {filteredTodos.map((todo: Todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              onEdit={updateTodo}
            />
          ))}
        </ul>
      )}
    </div>
  );
}