import React from 'react';

export interface BoardTopBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filterPriority: string;
  onFilterChange: (priority: string) => void;
  onCreateCard?: () => void;
}

export default function BoardTopBar({
  searchQuery,
  onSearchChange,
  filterPriority,
  onFilterChange,
  onCreateCard,
}: BoardTopBarProps): JSX.Element {
  return (
    <div className="flex flex-wrap items-center gap-4 p-3 bg-white border-b border-gray-200">
      <div className="flex-1 min-w-[200px]">
        <label htmlFor="board-search" className="sr-only">
          Search cards by title
        </label>
        <input
          id="board-search"
          type="text"
          placeholder="Search by title…"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label htmlFor="priority-filter" className="sr-only">
          Filter by priority
        </label>
        <select
          id="priority-filter"
          value={filterPriority}
          onChange={(e) => onFilterChange(e.target.value)}
          className="px-3 py-1.5 text-sm border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      {onCreateCard && (
        <button
          onClick={onCreateCard}
          className="px-4 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Add Card
        </button>
      )}
    </div>
  );
}