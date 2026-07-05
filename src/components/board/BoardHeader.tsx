import React from 'react';

export type Priority = 'low' | 'medium' | 'high';
export type Status = 'todo' | 'in-progress' | 'done';

export interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

export interface CardType {
  id: string;
  title: string;
  description?: string;
  priority: Priority;
  tag?: string;
  tagColor?: string;
  createdAt: string;
  status: Status;
  checklist: ChecklistItem[];
}

interface CardProps {
  card: CardType;
  onCardClick: (cardId: string) => void;
  onDragStart?: (e: React.DragEvent<HTMLDivElement>, cardId: string) => void;
  isDraggable?: boolean;
}

const priorityColors: Record<Priority, string> = {
  low: '#4ade80',
  medium: '#fbbf24',
  high: '#f87171',
};

const Card: React.FC<CardProps> = ({ card, onCardClick, onDragStart, isDraggable = true }) => {
  const handleClick = () => onCardClick(card.id);
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onCardClick(card.id);
    }
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    if (!isDraggable) return;
    e.dataTransfer.setData('text/plain', card.id);
    e.dataTransfer.effectAllowed = 'move';
    onDragStart?.(e, card.id);
  };

  return (
    <div
      className="card"
      draggable={isDraggable}
      onDragStart={handleDragStart}
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-label={`Card: ${card.title}`}
      style={{
        background: 'var(--card-bg, #fff)',
        borderRadius: '8px',
        padding: '12px',
        marginBottom: '8px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
        cursor: 'pointer',
        outline: 'none',
        transition: 'box-shadow 0.2s',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <h4 style={{ margin: 0, fontSize: '0.9rem', flex: 1 }}>{card.title}</h4>
        <span
          className="priority-badge"
          aria-label={`Priority: ${card.priority}`}
          style={{
            backgroundColor: priorityColors[card.priority],
            color: '#fff',
            padding: '2px 6px',
            borderRadius: '12px',
            fontSize: '0.7rem',
            fontWeight: 600,
            marginLeft: '8px',
            textTransform: 'uppercase',
          }}
        >
          {card.priority}
        </span>
      </div>
      {card.tag && (
        <span
          className="tag-badge"
          style={{
            display: 'inline-block',
            backgroundColor: card.tagColor || '#e2e8f0',
            color: '#1e293b',
            padding: '2px 8px',
            borderRadius: '4px',
            fontSize: '0.7rem',
            marginTop: '6px',
          }}
        >
          {card.tag}
        </span>
      )}
      <div style={{ marginTop: '8px', fontSize: '0.75rem', color: 'var(--text-muted, #64748b)' }}>
        {new Date(card.createdAt).toLocaleDateString()}
      </div>
    </div>
  );
};

export default Card;