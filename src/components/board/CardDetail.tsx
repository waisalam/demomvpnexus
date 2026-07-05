import { useState, useEffect, ChangeEvent } from 'react';
import { Card } from '@/types';
import { cn } from '@/utils/cn';

export interface CardDetailProps {
  card: Card;
  onUpdate: (updatedCard: Card) => void;
}

// Simple hash function to assign a consistent color to a tag string
const tagColorClasses = [
  'bg-gray-100 text-gray-800',
  'bg-red-100 text-red-800',
  'bg-yellow-100 text-yellow-800',
  'bg-green-100 text-green-800',
  'bg-blue-100 text-blue-800',
  'bg-indigo-100 text-indigo-800',
  'bg-purple-100 text-purple-800',
  'bg-pink-100 text-pink-800',
];

function getTagColorClass(tag: string): string {
  if (!tag) return tagColorClasses[0];
  let hash = 0;
  for (let i = 0; i < tag.length; i++) {
    hash = tag.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % tagColorClasses.length;
  return tagColorClasses[index];
}

const priorityLabel = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
};

const priorityColorClass = {
  low: 'bg-gray-100 text-gray-700',
  medium: 'bg-yellow-100 text-yellow-700',
  high: 'bg-red-100 text-red-700',
};

export default function CardDetail({ card, onUpdate }: CardDetailProps) {
  const [subtaskInputs, setSubtaskInputs] = useState<Record<string, string>>({});

  // Sync subtask input states with card subtask texts on mount/change
  useEffect(() => {
    const inputs: Record<string, string> = {};
    card.subtasks?.forEach((st) => {
      inputs[st.id] = st.text;
    });
    setSubtaskInputs(inputs);
  }, [card.id, card.subtasks]);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onUpdate({ ...card, title: e.target.value });
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onUpdate({ ...card, description: e.target.value });
  };

  const handleSubtaskToggle = (subtaskId: string) => {
    const updatedSubtasks = card.subtasks?.map((st) =>
      st.id === subtaskId ? { ...st, done: !st.done } : st
    );
    onUpdate({ ...card, subtasks: updatedSubtasks });
  };

  const handleSubtaskTextChange = (subtaskId: string, text: string) => {
    setSubtaskInputs((prev) => ({ ...prev, [subtaskId]: text }));
    const updatedSubtasks = card.subtasks?.map((st) =>
      st.id === subtaskId ? { ...st, text } : st
    );
    onUpdate({ ...card, subtasks: updatedSubtasks });
  };

  const handleDeleteSubtask = (subtaskId: string) => {
    const updatedSubtasks = card.subtasks?.filter((st) => st.id !== subtaskId);
    onUpdate({ ...card, subtasks: updatedSubtasks });
  };

  const handleAddSubtask = () => {
    const newId = crypto.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;
    const newSubtask = { id: newId, text: '', done: false };
    const updatedSubtasks = [...(card.subtasks || []), newSubtask];
    onUpdate({ ...card, subtasks: updatedSubtasks });
    setSubtaskInputs((prev) => ({ ...prev, [newId]: '' }));
  };

  const createdDate = card.createdAt ? new Date(card.createdAt).toLocaleDateString() : 'Unknown';

  return (
    <div className="space-y-6">
      {/* Card details: priority, tag, created */}
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <span className={cn('px-2 py-0.5 rounded-full font-medium', priorityColorClass[card.priority])}>
          {priorityLabel[card.priority]}
        </span>
        {card.tag && (
          <span className={cn('px-2 py-0.5 rounded-full font-medium', getTagColorClass(card.tag))}>
            {card.tag}
          </span>
        )}
        <span className="text-gray-500 ml-auto">{createdDate}</span>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Title
        </label>
        <input
          type="text"
          value={card.title}
          onChange={handleTitleChange}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          value={card.description || ''}
          onChange={handleDescriptionChange}
          rows={4}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-gray-700">
            Subtasks
          </label>
          <button
            onClick={handleAddSubtask}
            className="text-xs text-blue-600 hover:text-blue-800 font-medium"
          >
            + Add subtask
          </button>
        </div>
        {card.subtasks && card.subtasks.length > 0 ? (
          <ul className="space-y-2">
            {card.subtasks.map((subtask) => (
              <li key={subtask.id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={subtask.done}
                  onChange={() => handleSubtaskToggle(subtask.id)}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <input
                  type="text"
                  value={subtaskInputs[subtask.id] ?? subtask.text}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleSubtaskTextChange(subtask.id, e.target.value)
                  }
                  className={cn(
                    'flex-1 rounded border px-2 py-1 text-sm focus:outline-none focus:ring-1',
                    subtask.done
                      ? 'border-gray-200 bg-gray-50 text-gray-400 line-through'
                      : 'border-gray-300 bg-white text-gray-900 focus:ring-blue-500'
                  )}
                />
                <button
                  onClick={() => handleDeleteSubtask(subtask.id)}
                  className="text-gray-400 hover:text-red-500 text-sm p-1"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-400">No subtasks yet.</p>
        )}
      </div>
    </div>
  );
}
