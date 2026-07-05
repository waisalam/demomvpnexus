import React, { useState } from 'react';
import AddTodoForm from './components/AddTodoForm';
import TodoList from './components/TodoList';
import ThemeToggle from './components/ThemeToggle';
import { useTodos } from './store/useTodos';
import type { Todo } from './types/todo';

type Filter = 'all' | 'active' | 'done';

export default function App() {
  const [filter, setFilter] = useState<Filter>('all');
  const { todos, addTodo, toggleTodo, deleteTodo, updateTodo } = useTodos();

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
    <div>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Todo App</h1>
        <ThemeToggle />
      </header>
      <AddTodoForm />
      <div style={{ display: 'flex', gap: '1rem', marginBlock: '1rem' }}>
        <button onClick={() => setFilter('all')} disabled={filter === 'all'}>
          All
        </button>
        <button onClick={() => setFilter('active')} disabled={filter === 'active'}>
          Active ({activeCount})
        </button>
        <button onClick={() => setFilter('done')} disabled={filter === 'done'}>
          Done
        </button>
      </div>
      <TodoList />
    </div>
  );
}