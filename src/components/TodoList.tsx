import React, { useMemo, useState } from 'react';
import { useTodos } from '../store/useTodos';
import TodoItem from './TodoItem';
import type { Todo, Filter } from '../types/todo';

export default function TodoList(): React.ReactElement {
  const { todos, toggleTodo, deleteTodo, updateTodo } = useTodos();
  const [filter, setFilter] = useState<Filter>('all');

  const activeCount = useMemo(() => todos.filter((t: Todo) => !t.done).length, [todos]);

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

  return (
    <div className="todo-list">
      <div className="filter-bar">
        <p className="todo-count">
          {activeCount} item{activeCount !== 1 ? 's' : ''} left
        </p>
        <div className="filters">
          {(['all', 'active', 'done'] as const).map((f) => (
            <button
              key={f}
              className={`filter-btn ${filter === f ? 'active' : ''}`}
              aria-pressed={filter === f}
              onClick={() => handleSetFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>
      {filteredTodos.length === 0 ? (
        <p className="empty-message">No items to show.</p>
      ) : (
        <ul className="todos" aria-label="Todo list">
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