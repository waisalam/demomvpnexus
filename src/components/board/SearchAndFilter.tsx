import { ChangeEvent } from 'react';
import { Priority } from '@/types';
import { cn } from '@/utils/cn';

export interface SearchAndFilterProps {
  searchQuery: string;
  priorityFilter: Priority | 'all';
  onSearchChange: (query: string) => void;
  onPriorityChange: (priority: Priority | 'all') => void;
}

export default function SearchAndFilter({
  searchQuery,
  priorityFilter,
  onSearchChange,
  onPriorityChange,
}: SearchAndFilterProps) {
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

  const handlePriorityChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onPriorityChange(e.target.value as Priority | 'all');
  };

  return (
    <div className={cn('flex flex-wrap items-end gap-4')}>
      <div className="min-w-0 flex-1">
        <label htmlFor="search-input" className="block text-sm font-medium text-gray-700 mb-1">
          Search
        </label>
        <input
          id="search-input"
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search cards..."
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="w-40">
        <label htmlFor="priority-filter" className="block text-sm font-medium text-gray-700 mb-1">
          Priority
        </label>
        <select
          id="priority-filter"
          value={priorityFilter}
          onChange={handlePriorityChange}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
    </div>
  );
}