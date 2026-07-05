import { type ReactNode } from 'react';

type Priority = 'low' | 'medium' | 'high';

interface DashboardProps {
  totalCards: number;
  columnCounts: Record<string, number>;
  priorityCounts: Record<string, number>;
}

export default function Dashboard({ totalCards, columnCounts, priorityCounts }: DashboardProps) {
  const priorityColorMap: Record<string, string> = {
    low: 'text-blue-500',
    medium: 'text-yellow-500',
    high: 'text-red-500',
  };

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Total Cards */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-600">Total Cards</h3>
          <p className="text-3xl font-bold text-gray-900">{totalCards}</p>
        </div>

        {/* Column Counts */}
        {Object.entries(columnCounts).map(([columnId, count]: [string, number]) => (
          <div key={columnId} className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-600">Column: {columnId}</h3>
            <p className="text-3xl font-bold text-gray-900">{count}</p>
          </div>
        ))}

        {/* Priority Counts */}
        {Object.entries(priorityCounts).map(([priority, count]: [string, number]) => (
          <div key={priority} className="bg-white p-4 rounded-lg shadow">
            <h3 className={`text-sm font-medium capitalize ${priorityColorMap[priority] || 'text-gray-600'}`}>
              {priority} Priority
            </h3>
            <p className="text-3xl font-bold text-gray-900">{count}</p>
          </div>
        ))}
      </div>
    </div>
  );
}