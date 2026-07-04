import type { Card } from '../types';
import { useState } from 'react';

export interface CardDetailProps {
  card: Card;
  onUpdateCard?: (updatedCard: Card) => void;
  onAddSubtask?: (cardId: string, text: string) => void;
  onToggleSubtask?: (cardId: string, subtaskId: string) => void;
  onRemoveSubtask?: (cardId: string, subtaskId: string) => void;
  onDeleteCard?: (cardId: string) => void;
  onBack?: () => void;
}

const priorityColors: Record<string, string> = {
  Low: 'green',
  Medium: 'orange',
  High: 'red',
};

export default function CardDetail({
  card,
  onUpdateCard,
  onAddSubtask,
  onToggleSubtask,
  onRemoveSubtask,
  onDeleteCard,
  onBack,
}: CardDetailProps): JSX.Element {
  const [title, setTitle] = useState(card.title);
  const [description, setDescription] = useState(card.description ?? '');
  const [newSubtaskText, setNewSubtaskText] = useState('');

  const subtasks = card.subtasks ?? [];

  const formattedDate = card.createdAt
    ? new Date(card.createdAt).toLocaleDateString()
    : '';

  const handleUpdate = () => {
    onUpdateCard?.({
      ...card,
      title,
      description,
    });
  };

  const handleAddSubtask = () => {
    if (!newSubtaskText.trim()) return;
    onAddSubtask?.(card.id, newSubtaskText.trim());
    setNewSubtaskText('');
  };

  const handleToggle = (subtaskId: string) => {
    onToggleSubtask?.(card.id, subtaskId);
  };

  const handleRemove = (subtaskId: string) => {
    onRemoveSubtask?.(card.id, subtaskId);
  };

  return (
    <div className="card-detail">
      <div className="detail-header">
        <button onClick={onBack} aria-label="Back">
          ← Back
        </button>
        <input
          className="card-title-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          aria-label="Card title"
        />
        <div className="header-actions">
          <button className="save-btn" onClick={handleUpdate}>
            Update
          </button>
          <button
            className="delete-btn"
            onClick={() => onDeleteCard?.(card.id)}
          >
            Delete Card
          </button>
        </div>
      </div>

      <div className="detail-body">
        <div className="detail-field">
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            aria-label="Card description"
          />
        </div>

        <div className="detail-meta">
          <div className="meta-item">
            <strong>Priority:</strong>
            <span
              className="priority-badge"
              style={{ color: priorityColors[card.priority] ?? 'gray' }}
            >
              {card.priority}
            </span>
          </div>

          {card.tagColor && (
            <div className="meta-item">
              <strong>Tag:</strong>
              <span
                className="tag-circle"
                style={{ backgroundColor: card.tagColor }}
              />
            </div>
          )}

          <div className="meta-item">
            <strong>Created:</strong>
            <span>{formattedDate}</span>
          </div>
        </div>
      </div>

      <div className="checklist">
        <h3>Subtasks</h3>
        <div className="add-subtask">
          <input
            value={newSubtaskText}
            onChange={(e) => setNewSubtaskText(e.target.value)}
            placeholder="New subtask..."
            onKeyDown={(e) => e.key === 'Enter' && handleAddSubtask()}
          />
          <button onClick={handleAddSubtask}>Add</button>
        </div>
        <ul className="subtask-list">
          {subtasks.map((subtask) => (
            <li key={subtask.id} className="subtask-item">
              <input
                type="checkbox"
                checked={subtask.completed}
                onChange={() => handleToggle(subtask.id)}
              />
              <span className={subtask.completed ? 'completed' : ''}>
                {subtask.text}
              </span>
              <button
                onClick={() => handleRemove(subtask.id)}
                aria-label="Delete subtask"
              >
                🗑️
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}