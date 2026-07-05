import { useState } from 'react';
import { useTodos } from '../store/useTodos';
import type { Todo } from '../types/todo';

export default function AddTodoForm() {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<Todo['priority']>('low');
  const { addTodo } = useTodos();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;
    addTodo(trimmed, priority);
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit} aria-label="Add a new todo">
      <label htmlFor="todo-title">Title</label>
      <input
        id="todo-title"
        type="text"
        value={title}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
        placeholder="Enter todo title"
        aria-required="true"
      />

      <label htmlFor="todo-priority">Priority</label>
      <select
        id="todo-priority"
        value={priority}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          setPriority(e.target.value as Todo['priority'])
        }
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <button type="submit">Add</button>
    </form>
  );
}