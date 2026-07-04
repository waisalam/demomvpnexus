import { useDashboardStats } from '@/hooks/useDashboardStats';
import StatsGrid from '@/components/StatsGrid';
import SummaryCard from '@/components/SummaryCard';

export default function DashboardPage() {
  const stats = useDashboardStats();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Dashboard Overview</h2>
      <StatsGrid>
        <SummaryCard title="Total Cards" value={stats.totalCards} />
        <SummaryCard title="To Do" value={stats.columnStats.todo} />
        <SummaryCard title="In Progress" value={stats.columnStats.inProgress} />
        <SummaryCard title="Done" value={stats.columnStats.done} />
      </StatsGrid>
      <h3 className="text-xl font-medium mt-8 mb-4">By Priority</h3>
      <StatsGrid>
        <SummaryCard title="Low Priority" value={stats.priorityStats.low} />
        <SummaryCard title="Medium Priority" value={stats.priorityStats.medium} />
        <SummaryCard title="High Priority" value={stats.priorityStats.high} />
      </StatsGrid>
    </div>
  );
}