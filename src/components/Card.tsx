import React from 'react';
import { Card as CardType } from '../types';
import useBoardStore from '../store/boardStore';

export interface CardProps {
  card: CardType;
  boardId: string;
  onClick?: (cardId: string) => void;
}

export default function Card({ card, boardId, onClick }: CardProps): JSX.Element {
  const editCard = useBoardStore((state) => state.editCard);
  const deleteCard = useBoardStore((state) => state.deleteCard);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('text/plain', card.id);
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    editCard(boardId, card.id);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteCard(boardId, card.id);
  };

  const handleCardClick = () => {
    onClick?.(card.id);
  };

  const formattedDate = new Date(card.createdAt).toLocaleDateString();

  return (
    <div
      className="card"
      draggable
      onDragStart={handleDragStart}
      onClick={handleCardClick}
    >
      <div className="card-title">{card.title}</div>
      <div className="card-meta">
        {card.priority && (
          <span className={`priority-badge priority-${card.priority}`}>
            {card.priority}
          </span>
        )}
        {card.tag && <span className="card-tag">{card.tag.name}</span>}
        <span className="card-date">{formattedDate}</span>
      </div>
      <div className="card-actions">
        <button onClick={handleEditClick}>Edit</button>
        <button onClick={handleDeleteClick}>Delete</button>
      </div>
    </div>
  );
}