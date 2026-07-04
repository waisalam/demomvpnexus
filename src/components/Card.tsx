import React from 'react';
import { Card } from '../types';

export interface CardProps {
  card: Card;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onClick?: (id: string) => void;
  className?: string;
}

const priorityColors: Record<string, string> = {
  Low: 'green',
  Medium: 'orange',
  High: 'red',
};

export default function CardComponent({
  card,
  onEdit,
  onDelete,
  onClick,
  className,
}: CardProps): JSX.Element {
  const handleClick = () => {
    onClick?.(card.id);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit?.(card.id);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete?.(card.id);
  };

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', card.id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const truncatedDescription = card.description
    ? card.description.length > 80
      ? card.description.substring(0, 80) + '...'
      : card.description
    : null;

  const formattedDate = card.createdAt
    ? new Date(card.createdAt).toLocaleDateString()
    : '';

  return (
    <div
      className={`card ${className ?? ''}`}
      onClick={handleClick}
      draggable
      onDragStart={handleDragStart}
    >
      <div className="card-title">{card.title}</div>
      {truncatedDescription && (
        <div className="card-description">{truncatedDescription}</div>
      )}
      <div className="card-meta">
        <span
          className="card-priority"
          style={{ color: priorityColors[card.priority] || 'gray' }}
        >
          {card.priority}
        </span>
        {card.tagColor && (
          <span
            className="card-tag"
            style={{ backgroundColor: card.tagColor }}
          />
        )}
        <span className="card-date">{formattedDate}</span>
      </div>
      <div className="card-actions">
        {onEdit && (
          <button onClick={handleEdit} aria-label="Edit">
            ✏️
          </button>
        )}
        {onDelete && (
          <button onClick={handleDelete} aria-label="Delete">
            🗑️
          </button>
        )}
      </div>
    </div>
  );
}
