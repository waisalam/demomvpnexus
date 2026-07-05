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

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

const Card: React.FC<CardProps> = ({ card, onCardClick, onDragStart, isDraggable = true }) => {
  const completedCount = card.checklist.filter((item: ChecklistItem) => item.completed).length;
  const totalCount = card.checklist.length;

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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
        <h4 style={{ margin: 0, fontSize: '0.9rem', flex: 1, wordBreak: 'break-word' }}>{card.title}</h4>
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
        <div style={{ marginBottom: 6 }}>
          <span
            style={{
              backgroundColor: card.tagColor || '#e0e0e0',
              color: '#fff',
              padding: '2px 8px',
              borderRadius: '12px',
              fontSize: '0.7rem',
              fontWeight: 500,
            }}
          >
            {card.tag}
          </span>
        </div>
      )}
      {card.description && (
        <p style={{ margin: '4px 0', fontSize: '0.8rem', color: 'var(--text-secondary, #666)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {card.description}
        </p>
      )}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: 'var(--text-muted, #888)', marginTop: 8 }}>
        {totalCount > 0 && (
          <span>{completedCount}/{totalCount} subtasks</span>
        )}
        <span>{formatDate(card.createdAt)}</span>
      </div>
    </div>
  );
};

export default Card;

import React from 'react';
import Card from './Card';
import { CardType, Status } from './Card';

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
      style={{
        background: 'var(--column-bg, #f4f5f7)',
        borderRadius: '8px',
        padding: '12px',
        width: '100%',
        minHeight: '200px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <h3 style={{ margin: '0 0 12px 0', fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary, #333)' }}>{title}</h3>
      <div className="column-cards" style={{ flex: 1 }}>
        {cards.map((card: CardType) => (
          <Card key={card.id} card={card} onCardClick={onCardClick} />
        ))}
      </div>
    </div>
  );
};

export default Column;

import React from 'react';
import { Priority } from './Card';

interface BoardHeaderProps {
  boardName: string;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  priorityFilter: Priority | 'all';
  onPriorityFilterChange: (priority: Priority | 'all') => void;
}

const BoardHeader: React.FC<BoardHeaderProps> = ({
  boardName,
  searchQuery,
  onSearchChange,
  priorityFilter,
  onPriorityFilterChange,
}) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
      <h2 style={{ margin: 0 }}>{boardName}</h2>
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Search cards..."
          value={searchQuery}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onSearchChange(e.target.value)}
          aria-label="Search cards"
          style={{
            padding: '8px 12px',
            borderRadius: '6px',
            border: '1px solid var(--border-color, #ccc)',
            background: 'var(--input-bg, #fff)',
            color: 'var(--text-primary, #333)',
            fontSize: '0.9rem',
            outline: 'none',
            width: '200px',
          }}
        />
        <select
          value={priorityFilter}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onPriorityFilterChange(e.target.value as Priority | 'all')}
          aria-label="Filter by priority"
          style={{
            padding: '8px 12px',
            borderRadius: '6px',
            border: '1px solid var(--border-color, #ccc)',
            background: 'var(--input-bg, #fff)',
            color: 'var(--text-primary, #333)',
            fontSize: '0.9rem',
            outline: 'none',
          }}
        >
          <option value="all">All Priorities</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
    </div>
  );
};

export default BoardHeader;

import React from 'react';
import BoardHeader from './BoardHeader';
import Column from './Column';
import { CardType, Priority, Status } from './Card';

interface BoardViewProps {
  boardName: string;
  cards: CardType[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  priorityFilter: Priority | 'all';
  setPriorityFilter: (priority: Priority | 'all') => void;
  onCardClick: (cardId: string) => void;
  onCardDrop: (cardId: string, newStatus: Status) => void;
}

const BoardView: React.FC<BoardViewProps> = ({
  boardName,
  cards,
  searchQuery,
  setSearchQuery,
  priorityFilter,
  setPriorityFilter,
  onCardClick,
  onCardDrop,
}) => {
  const filteredCards = cards.filter((card: CardType) => {
    const matchesSearch = card.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority = priorityFilter === 'all' || card.priority === priorityFilter;
    return matchesSearch && matchesPriority;
  });

  const columns: { title: string; status: Status }[] = [
    { title: 'To Do', status: 'todo' },
    { title: 'In Progress', status: 'in-progress' },
    { title: 'Done', status: 'done' },
  ];

  const getCardsForStatus = (status: Status): CardType[] =>
    filteredCards.filter((card: CardType) => card.status === status);

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto', height: '100%' }}>
      <BoardHeader
        boardName={boardName}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        priorityFilter={priorityFilter}
        onPriorityFilterChange={setPriorityFilter}
      />
      <div
        style={{
          display: 'flex',
          gap: '16px',
          overflowX: 'auto',
          paddingBottom: '16px',
          flex: 1,
        }}
      >
        {columns.map((col) => (
          <Column
            key={col.status}
            title={col.title}
            status={col.status}
            cards={getCardsForStatus(col.status)}
            onCardClick={onCardClick}
            onCardDrop={onCardDrop}
          />
        ))}
      </div>
    </div>
  );
};

export default BoardView;