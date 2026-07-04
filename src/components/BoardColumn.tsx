import React from 'react';
import { Card } from '../types';
import CardItem from './CardItem';

interface BoardColumnProps {
  title: string;
  columnId: string;
  cards: Card[];
  onCardClick?: (cardId: string | number) => void;
  onCardMove?: (cardId: string | number, targetColumnId: string) => void;
  onCardEdit?: (cardId: string | number) => void;
  onCardDelete?: (cardId: string | number) => void;
}

export default function BoardColumn({
  title,
  columnId,
  cards,
  onCardClick,
  onCardMove,
  onCardEdit,
  onCardDelete,
}: BoardColumnProps): JSX.Element {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const cardId = e.dataTransfer.getData('cardId');
    if (cardId && onCardMove) {
      onCardMove(cardId, columnId);
    }
  };

  return (
    <div
      className="flex flex-col bg-gray-50 rounded-xl border border-gray-200 shadow-sm p-4 w-full md:w-80 max-h-full min-h-0"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <h2 className="text-lg font-semibold text-gray-800 mb-3 px-1">{title}</h2>
      <div className="flex-1 overflow-y-auto space-y-2 min-h-0 pr-1">
        {cards.map((card) => (
          <CardItem
            key={card.id}
            card={card}
            onClick={() => onCardClick?.(card.id)}
            onEdit={onCardEdit ? () => onCardEdit(card.id) : undefined}
            onDelete={onCardDelete ? () => onCardDelete(card.id) : undefined}
          />
        ))}
        {cards.length === 0 && (
          <p className="text-center text-gray-400 text-sm py-4">No cards</p>
        )}
      </div>
    </div>
  );
}
