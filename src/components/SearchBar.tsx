import useBoardStore from '../store/boardStore'
import type { KanbanStore } from '../store/boardStore'

export default function SearchBar() {
  const searchQuery = useBoardStore((s: KanbanStore) => s.searchQuery)
  const filterPriority = useBoardStore((s: KanbanStore) => s.filterPriority)
  const setSearchQuery = useBoardStore((s: KanbanStore) => s.setSearchQuery)
  const setFilterPriority = useBoardStore((s: KanbanStore) => s.setFilterPriority)

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <input
        type="text"
        placeholder="Search by title..."
        value={searchQuery}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
        className="w-full sm:max-w-xs rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      />

      <select
        value={filterPriority}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFilterPriority(e.target.value)}
        className="w-full sm:w-[160px] h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      >
        <option value="all">All</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
    </div>
  )
}