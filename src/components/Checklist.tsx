import React, { useState, useCallback } from 'react';
import { ChecklistItem } from '../types';

export interface ChecklistProps {
  items: ChecklistItem[];
  onToggle: (itemId: string) => void;
  onDelete: (itemId: string) => void;
  onAdd: (text: string) => void;
}

export default function Checklist({
  items,
  onToggle,
  onDelete,
  onAdd,
}: ChecklistProps): JSX.Element {
  const [newItemText, setNewItemText] = useState('');

  const handleAdd = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const trimmed = newItemText.trim();
      if (trimmed) {
        onAdd(trimmed);
        setNewItemText('');
      }
    },
    [newItemText, onAdd],
  );

  return (
    <div>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id} className="flex items-center space-x-3">
            <input
              type="checkbox"
              id={`check-${item.id}`}
              checked={item.completed}
              onChange={() => onToggle(item.id)}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label
              htmlFor={`check-${item.id}`}
              className={`flex-1 text-sm ${
                item.completed ? 'line-through text-gray-400' : 'text-gray-700'
              }`}
            >
              {item.text}
            </label>
            <button
              type="button"
              onClick={() => onDelete(item.id)}
              className="text-sm text-red-600 hover:text-red-800 focus:outline-none"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <form onSubmit={handleAdd} className="mt-3 flex items-center space-x-2">
        <label htmlFor="new-item" className="sr-only">
          New item
        </label>
        <input
          type="text"
          id="new-item"
          value={newItemText}
          onChange={(e) => setNewItemText(e.target.value)}
          placeholder="Add a new item..."
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        <button
          type="submit"
          disabled={!newItemText.trim()}
          className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Add
        </button>
      </form>
    </div>
  );
}