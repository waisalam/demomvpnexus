import React, { useMemo } from 'react';
import { Board, Card } from '../types';

export interface DashboardProps {
  boards: Board[];
  cards: Card[];
}

export default function Dashboard({ boards, cards }: DashboardProps): JSX.Element {
  const totalCards = cards.length;

  const columnCounts = useMemo(() => {
    const counts: Record<string, number> = {
      'To Do': 0,
      'In Progress': 0,
      'Done': 0,
    };
    cards.forEach(card => {
      if (card.status in counts) {
        counts[card.status]++;
      }
    });
    return counts;
  }, [cards]);

  const priorityCounts = useMemo(() => {
    const counts: Record<string, number> = {
      low: 0,
      medium: 0,
      high: 0,
    };
    cards.forEach(card => {
      const priority = card.priority?.toLowerCase();
      if (priority && priority in counts) {
        counts[priority]++;
      }
    });
    return counts;
  }, [cards]);

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Total Cards</h3>
          <p className="stat-value">{totalCards}</p>
        </div>

        <div className="stat-card">
          <h3>Column Breakdown</h3>
          <ul>
            {Object.entries(columnCounts).map(([column, count]) => (
              <li key={column}>
                {column}: {count}
              </li>
            ))}
          </ul>
        </div>

        <div className="stat-card">
          <h3>Priority Breakdown</h3>
          <ul>
            {Object.entries(priorityCounts).map(([priority, count]) => (
              <li key={priority}>
                {priority.charAt(0).toUpperCase() + priority.slice(1)}: {count}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}