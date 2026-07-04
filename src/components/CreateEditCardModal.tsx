import React, { useState, useEffect } from 'react';
import { Card, Priority } from '../types';

export interface CreateEditCardModalProps {
  mode: 'create' | 'edit';
  open: boolean;
  onClose: () => void;
  onSave: (cardData: Partial<Card>) => void;
  initialData?: Partial<Card>;
}

export default function CreateEditCardModal({
  mode,
  open,
  onClose,
  onSave,
  initialData,
}: CreateEditCardModalProps): JSX.Element {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Priority | ''>('');
  const [tagColor, setTagColor] = useState('');

  useEffect(() => {
    if (open) {
      if (mode === 'edit' && initialData) {
        setTitle(initialData.title || '');
        setDescription(initialData.description || '');
        setPriority(initialData.priority || '');
        setTagColor(initialData.tagColor || '');
      } else {
        setTitle('');
        setDescription('');
        setPriority('');
        setTagColor('');
      }
    }
  }, [open, mode, initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cardData: Partial<Card> = {
      title,
      description,
      priority: priority as Priority,
      tagColor,
    };
    onSave(cardData);
  };

  const tagColors = ['blue', 'green', 'orange', 'red', 'purple', 'gray'];

  if (!open) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{mode === 'create' ? 'Create New Card' : 'Edit Card'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="card-title">Title</label>
            <input
              id="card-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="card-description">Description</label>
            <textarea
              id="card-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
          </div>

          <div className="form-group">
            <label htmlFor="card-priority">Priority</label>
            <select
              id="card-priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value as Priority | '')}
            >
              <option value="">None</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="form-group">
            <label>Tag Color</label>
            <div className="tag-color-options">
              {tagColors.map((color) => (
                <label key={color} className="tag-color-label">
                  <input
                    type="radio"
                    name="tagColor"
                    value={color}
                    checked={tagColor === color}
                    onChange={(e) => setTagColor(e.target.value)}
                  />
                  <span
                    className="color-swatch"
                    style={{ backgroundColor: color }}
                  />
                  {color}
                </label>
              ))}
            </div>
          </div>

          <div className="form-actions">
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit">
              {mode === 'create' ? 'Create' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}