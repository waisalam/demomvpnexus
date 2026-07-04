import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useBoard } from '@/hooks/useBoard';
import { useDragAndDrop } from '@/hooks/useDragAndDrop';
import Column from '@/components/Column';
import SearchBar from '@/components/SearchBar';
import PriorityFilter from '@/components/PriorityFilter';
import Modal from '@/components/Modal';
import BoardLayout from '@/layouts/BoardLayout';

export default function BoardPage() {
  const { boardId } = useParams<{ boardId: string }>();
  const { board, columns, search, setSearch, priorityFilter, setPriorityFilter, createCard, moveCard, editCard, deleteCard } = useBoard(boardId!);
  const { onDragStart, onDragEnd, draggingItem } = useDragAndDrop();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newPriority, setNewPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [newTag, setNewTag] = useState('');
  const [newTagColor, setNewTagColor] = useState('#3b82f6');

  const handleDrop = (targetColumnId: string) => {
    if (draggingItem) {
      moveCard(draggingItem.cardId, draggingItem.sourceColumnId, targetColumnId);
    }
  };

  const handleCreateCard = () => {
    if (newTitle.trim()) {
      createCard({
        title: newTitle,
        description: newDescription,
        columnId: columns[0]?.id ?? '',
        priority: newPriority,
        tag: newTag,
        tagColor: newTagColor,
      });
      setNewTitle('');
      setNewDescription('');
      setNewPriority('medium');
      setNewTag('');
      setNewTagColor('#3b82f6');
      setIsModalOpen(false);
    }
  };

  if (!board) {
    return (
      <BoardLayout>
        <div className="p-6">Loading board...</div>
      </BoardLayout>
    );
  }

  return (
    <BoardLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">{board.name}</h2>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            onClick={() => setIsModalOpen(true)}
          >
            + Add Card
          </button>
        </div>

        <div className="flex items-center gap-4 mb-8">
          <SearchBar value={search} onChange={setSearch} />
          <PriorityFilter value={priorityFilter} onChange={setPriorityFilter} />
        </div>

        <div className="flex gap-4 overflow-x-auto">
          {columns.map((column) => (
            <Column
              key={column.id}
              column={column}
              onDrop={handleDrop}
              draggingItem={draggingItem}
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
              onEditCard={editCard}
              onDeleteCard={deleteCard}
            />
          ))}
        </div>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div className="p-4">
            <h3 className="text-lg font-medium mb-4">New Card</h3>
            <input
              className="w-full border p-2 rounded mb-3"
              placeholder="Title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
            <textarea
              className="w-full border p-2 rounded mb-3"
              rows={3}
              placeholder="Description"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
            />
            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">Priority</label>
              <select
                value={newPriority}
                onChange={(e) => setNewPriority(e.target.value as 'low' | 'medium' | 'high')}
                className="w-full border p-2 rounded"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">Tag</label>
              <input
                className="w-full border p-2 rounded"
                placeholder="Tag label"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">Tag Color</label>
              <input
                type="color"
                value={newTagColor}
                onChange={(e) => setNewTagColor(e.target.value)}
                className="w-full p-1 border rounded h-10"
              />
            </div>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={handleCreateCard}
            >
              Create
            </button>
          </div>
        </Modal>
      </div>
    </BoardLayout>
  );
}
