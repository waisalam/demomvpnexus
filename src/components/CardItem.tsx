import React from 'react';
import { Card } from '../types';

export interface CardItemProps {
  card: Card;
  onDragStart?: (e: React.DragEvent<HTMLDivElement>, cardId: string | number) => void;
  onClick?: (cardId: string | number) => void;
  onEdit?: (cardId: string | number) => void;
  onDelete?: (cardId: string | number) => void;
}

const priorityColors: Record<string, string> = {
  low: 'bg-blue-100 text-blue-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-red-100 text-red-800',
};

const tagPalette = [
  'bg-emerald-100 text-emerald-800',
  'bg-violet-100 text-violet-800',
  'bg-amber-100 text-amber-800',
  'bg-cyan-100 text-cyan-800',
  'bg-rose-100 text-rose-800',
];

function tagColorClass(tag: string): string {
  let hash = 0;
  for (let i = 0; i < tag.length; i++) {
    hash = tag.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % tagPalette.length;
  return tagPalette[index];
}

export default function CardItem({
  card,
  onDragStart,
  onClick,
  onEdit,
  onDelete,
}: CardItemProps): JSX.Element {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('cardId', String(card.id));
    if (card.columnId) {
      e.dataTransfer.setData('sourceColumn', String(card.columnId));
    }
    e.dataTransfer.effectAllowed = 'move';
    if (onDragStart) {
      onDragStart(e, card.id);
    }
  };

  const priorityClass = card.priority
    ? priorityColors[card.priority] || 'bg-gray-100 text-gray-700'
    : 'bg-gray-100 text-gray-700';

  const dateLabel = card.createdAt
    ? new Date(card.createdAt).toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
      })
    : '';

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onClick={() => onClick?.(card.id)}
      className="group bg-white rounded-lg border border-gray-200 p-3 cursor-pointer hover:shadow-md transition-shadow space-y-1.5"
    >
      <div className="flex items-start justify-between">
        <h3 className="text-sm font-medium text-gray-800 leading-snug pr-2 break-words">
          {card.title}
        </h3>
        {(onEdit || onDelete) && (
          <div className="flex items-center space-x-0.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
            {onEdit && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(card.id);
                }}
                className="p-1 rounded hover:bg-gray-200 text-gray-500"
                aria-label="Edit card"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-3.5 h-3.5"
                >
                  <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                  <path d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                </svg>
              </button>
            )}
            {onDelete && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(card.id);
                }}
                className="p-1 rounded hover:bg-gray-200 text-gray-500"
                aria-label="Delete card"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-3.5 h-3.5"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H3a1 1 0 000 2h.07l.878 9.648A2 2 0 005.932 18h8.136a2 2 0 001.984-2.352L16.93 6H17a1 1 0 100-2H15V3a1 1 0 00-1-1H6zM4 6h12l-.86 9.588A1 1 0 0114.146 16H5.854a1 1 0 01-.994-.788L4 6zm3 2a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 112 0v6a1 1 0 11-2 0V8z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            )}
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-1.5 text-xs">
        <span className={`inline-flex items-center px-1.5 py-0.5 rounded-full font-medium capitalize ${priorityClass}`}>
          {card.priority || 'none'}
        </span>

        {card.tag && (
          <span className={`inline-flex items-center px-1.5 py-0.5 rounded-full font-medium ${tagColorClass(card.tag)}`}>
            {card.tag}
          </span>
        )}

        {dateLabel && (
          <span className="text-gray-400 ml-auto">{dateLabel}</span>
        )}
      </div>
    </div>
  );
}