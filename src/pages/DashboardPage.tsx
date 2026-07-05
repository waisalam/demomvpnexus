import { useContext, useMemo } from 'react';
import { BoardContext } from '../contexts/BoardContext';
import Dashboard from '../components/dashboard/Dashboard';

type Priority = 'low' | 'medium' | 'high';

interface Card {
  id: string;
  boardId: string;
  title: string;
  description: string;
  priority: Priority;
  columnId: string;
}

export default function DashboardPage() {
  const { cards } = useContext(BoardContext);

  const stats = useMemo(() => {
    const totalCards = cards.length;
    const columnCounts: Record<string, number> = {};
    const priorityCounts: Record<string, number> = { low: 0, medium: 0, high: 0 };

    cards.forEach((card: Card) => {
      columnCounts[card.columnId] = (columnCounts[card.columnId] || 0) + 1;
      priorityCounts[card.priority] = (priorityCounts[card.priority] || 0) + 1;
    });

    return { totalCards, columnCounts, priorityCounts };
  }, [cards]);

  return (
    <Dashboard
      totalCards={stats.totalCards}
      columnCounts={stats.columnCounts}
      priorityCounts={stats.priorityCounts}
    />
  );
}
