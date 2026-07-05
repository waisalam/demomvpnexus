import React from 'react';
import type { CardType, Status } from './BoardHeader';
import Card from './Card';

interface ColumnProps {
  title: string;
  status: Status;
  cards: CardType[];
  onCardClick: (cardId: string) => void;
  onCardDrop: (cardId: string, newStatus: Status) => void;
}

const Column: React.FC<ColumnProps> = ({ title, status, cards, onCardClick, onCardDrop }) => {
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const cardId = e.dataTransfer.getData('text/plain');
    if (cardId) {
      onCardDrop(cardId, status);
    }
  };

  return (
    <div
      className="column"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      aria-label={`Column: ${title}`}
      style={{
        background: 'var(--column-bg, #f0f2f5)',
        borderRadius: '8px',
        padding: '12px',
        minWidth: '280px',
        maxWidth: '320px',
        flex: '1 1 280px',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '200px',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '12px',
        }}
      >
        <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 600 }}>{title}</h3>
        <span
          style={{
            background: 'var(--badge-bg, #d1d5db)',
            color: 'var(--badge-color, #374151)',
            padding: '2px 8px',
            borderRadius: '12px',
            fontSize: '0.75rem',
            fontWeight: 500,
          }}
          aria-label={`${cards.length} cards`}
        >
          {cards.length}
        </span>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
        {cards.map((card: CardType) => (
          <Card
            key={card.id}
            card={card}
            onCardClick={onCardClick}
            isDraggable={true}
          />
        ))}
        {cards.length === 0 && (
          <div
            style={{
              padding: '16px',
              textAlign: 'center',
              color: 'var(--text-secondary, #9ca3af)',
              fontSize: '0.85rem',
              fontStyle: 'italic',
            }}
          >
            No cards
          </div>
        )}
      </div>
    </div>
  );
};

export default Column;