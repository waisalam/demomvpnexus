import React from 'react';
import type { Card } from '../types';
import CardComponent from './Card';

export interface ColumnProps {
  columnId: string;
  title: string;
  cards: Card[];
  onAddCard?: (columnId: string) => void;
  onEditCard?: (cardId: string) => void;
  onDeleteCard?: (cardId: string) => void;
  onCardClick?: (cardId: string) => void;
  onCardMove?: (cardId: string, targetColumnId: string) => void;
  className?: string;
}

export default function Column({
  columnId,
  title,
  cards,
  onAddCard,
  onEditCard,
  onDeleteCard,
  onCardClick,
  onCardMove,
  className,
}: ColumnProps): JSX.Element {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const cardId = e.dataTransfer.getData('text/plain');
    if (cardId) {
      onCardMove?.(cardId, columnId);
    }
  };

  return (
    <div
      className={`column ${className ?? ''}`}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="column-header">
        <span>
          {title} ({cards.length})
        </span>
        {onAddCard && (
          <button onClick={() => onAddCard(columnId)} aria-label="Add card">
            + Add card
          </button>
        )}
      </div>
      <div className="column-cards">
        {cards.map((card) => (
          <CardComponent
            key={card.id}
            card={card}
            onEdit={onEditCard}
            onDelete={onDeleteCard}
            onClick={onCardClick}
          />
        ))}
      </div>
    </div>
  );
}
