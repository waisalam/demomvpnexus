import React, { useState } from 'react';
import Modal from './Modal';
import Button from './Button';
import { useBoardStore } from '../store/boardStore';
import { Card, Priority } from '../types';

export interface CardFormProps {
  isOpen: boolean;
  onClose: () => void;
  boardId: string;
  columnId: string;
  existingCard?: Card;
}

export default function CardForm({
  isOpen,
  onClose,
  boardId,
  columnId,
  existingCard,
}: CardFormProps): JSX.Element {
  const { addCard, updateCard } = useBoardStore();

  const [title, setTitle] = useState(existingCard?.title ?? '');
  const [description, setDescription] = useState(existingCard?.description ?? '');
  const [priority, setPriority] = useState<Priority>(existingCard?.priority ?? 'Medium');
  const [tagColor, setTagColor] = useState(existingCard?.tag ?? '#3b82f6');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cardData = {
      title,
      description,
      priority,
      tag: tagColor,
    };

    if (existingCard) {
      updateCard(boardId, existingCard.id, cardData);
    } else {
      addCard(boardId, columnId, cardData);
    }

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={existingCard ? 'Edit Card' : 'Add Card'}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
            Priority
          </label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <div>
          <label htmlFor="tagColor" className="block text-sm font-medium text-gray-700">
            Tag Color
          </label>
          <div className="mt-1 flex items-center gap-2">
            <input
              type="color"
              id="tagColor"
              value={tagColor}
              onChange={(e) => setTagColor(e.target.value)}
              className="h-8 w-8 rounded border border-gray-300"
            />
            <span className="text-sm text-gray-500">{tagColor}</span>
          </div>
        </div>
        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            {existingCard ? 'Update' : 'Add'} Card
          </Button>
        </div>
      </form>
    </Modal>
  );
}