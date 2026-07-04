import React from 'react';
import { Priority } from '../types';

export interface SearchFilterBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedPriority: Priority | '';
  onPriorityChange: (value: Priority | '') => void;
}

export default function SearchFilterBar({
  searchTerm,
  onSearchChange,
  selectedPriority,
  onPriorityChange,
}: SearchFilterBarProps): JSX.Element {
  return (
    <div className="search-filter-bar">
      <div className="filter-group">
        <label htmlFor="search-input">Search</label>
        <input
          id="search-input"
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="filter-group">
        <label htmlFor="priority-select">Priority</label>
        <select
          id="priority-select"
          value={selectedPriority}
          onChange={(e) => onPriorityChange(e.target.value as Priority | '')}
        >
          <option value="">All</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
    </div>
  );
}