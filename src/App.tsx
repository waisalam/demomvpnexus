/** @jsxImportSource react */
import { useState, useEffect } from 'react';
import AddTodoForm from './components/AddTodoForm';
import TodoList from './components/TodoList';
import ThemeToggle from './components/ThemeToggle';
import { useTodos } from './store/useTodos';
import type { Todo } from './types/todo';

type Filter = 'all' | 'active' | 'done';

export default function App() {
  const [filter, setFilter] = useState<Filter>('all');
  const { todos } = useTodos();

  useEffect(() => {
    setFilter('all');
  }, [todos.length]);

  const activeCount = todos.filter((t: Todo) => !t.done).length;

  let filteredTodos: Todo[];
  switch (filter) {
    case 'active':
      filteredTodos = todos.filter((t: Todo) => !t.done);
      break;
    case 'done':
      filteredTodos = todos.filter((t: Todo) => t.done);
      break;
    default:
      filteredTodos = todos;
  }

  return (
    <>
      <div className="container">
        <header className="app-header">
          <h1 className="app-title">Todo App</h1>
          <ThemeToggle />
        </header>
        <AddTodoForm />
        <div className="filter-buttons">
          <button
            className={`btn ${filter === 'all' ? 'btn-active' : ''}`}
            onClick={() => setFilter('all')}
            disabled={filter === 'all'}
          >
            All
          </button>
          <button
            className={`btn ${filter === 'active' ? 'btn-active' : ''}`}
            onClick={() => setFilter('active')}
            disabled={filter === 'active'}
          >
            Active ({activeCount})
          </button>
          <button
            className={`btn ${filter === 'done' ? 'btn-active' : ''}`}
            onClick={() => setFilter('done')}
            disabled={filter === 'done'}
          >
            Done
          </button>
        </div>
        <TodoList todos={filteredTodos} />
      </div>
    </>
  );
}