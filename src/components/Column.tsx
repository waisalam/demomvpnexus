import React from 'react';
import { Card as CardType } from '../types';
import useBoardStore from '../store/boardStore';
import Card from './Card';

export interface ColumnProps {
  columnId: string;
  title: string;
  cards: CardType[];
  boardId: string;
}

export default function Column({ columnId, title, cards, boardId }: ColumnProps): JSX.Element {
  const moveCard = useBoardStore((state) => state.moveCard);
  const boards = useBoardStore((state) => state.boards);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const cardId = e.dataTransfer.getData('text/plain');
    if (cardId) {
      const board = boards.find((b) => b.id === boardId);
      if (board) {
        const fromColumn = board.columns.find((col) => col.cardIds.includes(cardId));
        if (fromColumn) {
          moveCard(boardId, cardId, fromColumn.id, columnId);
        }
      }
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div
      className="column"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <h3 className="column-title">{title}</h3>
      <div className="column-cards">
        {cards.map((card) => (
          <Card key={card.id} card={card} boardId={boardId} />
        ))}
      </div>
    </div>
  );
}