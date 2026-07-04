import { useBoardStore } from '@/stores/boardStore'
import { Input } from '@/components/ui/Input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select'

export default function SearchBar() {
  const searchQuery = useBoardStore((s) => s.searchQuery)
  const filterPriority = useBoardStore((s) => s.filterPriority)
  const setSearchQuery = useBoardStore((s) => s.setSearchQuery)
  const setFilterPriority = useBoardStore((s) => s.setFilterPriority)

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <Input
        placeholder="Search by title..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full sm:max-w-xs"
      />

      <Select
        value={filterPriority}
        onValueChange={(value) => setFilterPriority(value)}
      >
        <SelectTrigger className="w-full sm:w-[160px]">
          <SelectValue placeholder="All priorities" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="High">High</SelectItem>
          <SelectItem value="Medium">Medium</SelectItem>
          <SelectItem value="Low">Low</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}