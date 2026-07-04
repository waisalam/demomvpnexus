import { useBoardStore } from '@/stores/boardStore'

export default function Dashboard() {
  const boards = useBoardStore((s) => s.boards)

  let totalCards = 0
  const statusCounts = { 'To Do': 0, 'In Progress': 0, 'Done': 0 }
  const priorityCounts = { High: 0, Medium: 0, Low: 0 }

  for (const board of boards) {
    for (const card of board.cards) {
      totalCards++
      if (card.status in statusCounts) statusCounts[card.status]++
      if (card.priority in priorityCounts) priorityCounts[card.priority]++
    }
  }

  const statItems = [
    { label: 'Total Cards', value: totalCards },
    ...Object.entries(statusCounts).map(([key, val]) => ({
      label: key,
      value: val,
    })),
    ...Object.entries(priorityCounts).map(([key, val]) => ({
      label: `${key} Priority`,
      value: val,
    })),
  ]

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statItems.map((item) => (
          <div
            key={item.label}
            className="bg-white dark:bg-gray-800 shadow rounded-lg p-6"
          >
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {item.label}
            </p>
            <p className="mt-2 text-3xl font-bold">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}