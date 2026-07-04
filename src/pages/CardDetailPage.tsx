import { useParams, Link } from 'react-router-dom';
import { useCard } from '@/hooks/useCard';
import EditableField from '@/components/EditableField';
import SubtaskChecklist from '@/components/SubtaskChecklist';

export default function CardDetailPage() {
  const { boardId, cardId } = useParams<{ boardId: string; cardId: string }>();
  const { card, updateCardDescription, addSubtask, toggleSubtask, removeSubtask } = useCard(boardId!, cardId!);

  if (!card) {
    return (
      <div className="p-6">Loading card...</div>
    );
  }

  const handleDescriptionSave = (newDescription: string) => {
    updateCardDescription(card.id, newDescription);
  };

  const handleAddSubtask = (text: string) => {
    addSubtask(card.id, text);
  };

  const handleToggleSubtask = (subtaskId: string, completed: boolean) => {
    toggleSubtask(card.id, subtaskId, completed);
  };

  const handleRemoveSubtask = (subtaskId: string) => {
    removeSubtask(card.id, subtaskId);
  };

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="p-6">
      <Link to={`/board/${boardId}`} className="text-blue-600 hover:underline mb-4 inline-block">
        &larr; Back to Board
      </Link>
      <h2 className="text-2xl font-semibold mb-4">{card.title}</h2>

      <div className="flex items-center gap-3 mb-6">
        {card.priority && (
          <span className={`text-sm px-2 py-1 rounded ${
            card.priority === 'high' ? 'bg-red-100 text-red-700' :
            card.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
            'bg-green-100 text-green-700'
          }`}>
            {card.priority}
          </span>
        )}
        {card.tag && (
          <span
            className="text-sm px-2 py-1 rounded text-white"
            style={{ backgroundColor: card.tagColor }}
          >
            {card.tag}
          </span>
        )}
        <span className="text-sm text-gray-500">
          Created {formatDate(card.createdAt)}
        </span>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Description</h3>
        <EditableField
          initialValue={card.description}
          onSave={handleDescriptionSave}
          placeholder="Add a description..."
          multiline
        />
      </div>
      <div>
        <h3 className="text-lg font-medium mb-2">Subtasks</h3>
        <SubtaskChecklist
          subtasks={card.subtasks}
          onAdd={handleAddSubtask}
          onToggle={handleToggleSubtask}
          onRemove={handleRemoveSubtask}
        />
      </div>
    </div>
  );
}
