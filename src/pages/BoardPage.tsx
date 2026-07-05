import { useParams, useNavigate } from 'react-router-dom';
import { useContext, useMemo, useState } from 'react';
import { BoardContext } from '../contexts/BoardContext';
import SearchAndFilter from '../components/SearchAndFilter';
import BoardHeader from '../components/BoardHeader';
import BoardView from '../components/BoardView';

type Priority = 'low' | 'medium' | 'high';

interface Card {
  id: string;
  boardId: string;
  title: string;
  description: string;
  priority: Priority;
  columnId: string;
}

interface Board {
  id: string;
  title: string;
  columns: string[];
}

export default function BoardPage() {
  const { boardId } = useParams<{ boardId: string }>();
  const navigate = useNavigate();
  const { boards, cards, addCard, deleteCard, moveCard } = useContext(BoardContext);

  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');

  const board: Board | undefined = boards.find((b: Board) => b.id === boardId);

  const filteredCards = useMemo(() => {
    if (!boardId) return [];

    let filtered = cards.filter((card: Card) => card.boardId === boardId);

    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((card: Card) =>
        card.title.toLowerCase().includes(query)
      );
    }

    if (priorityFilter !== 'all') {
      filtered = filtered.filter((card: Card) => card.priority === priorityFilter);
    }

    return filtered;
  }, [cards, boardId, searchQuery, priorityFilter]);

  const handleCreate = () => {
    if (!boardId || !board) return;
    const newCard: Omit<Card, 'id'> = {
      boardId,
      title: 'New Card',
      description: '',
      priority: 'medium',
      columnId: board.columns[0] || '',
    };
    addCard(boardId, newCard);
  };

  const handleEdit = (cardId: string) => {
    navigate(`/board/${boardId}/card/${cardId}`);
  };

  const handleDelete = (cardId: string) => {
    deleteCard(cardId);
  };

  const handleMoveColumn = (cardId: string, newColumnId: string) => {
    moveCard(cardId, newColumnId);
  };

  if (!board) {
    return <div className="p-4">Board not found</div>;
  }

  return (
    <div className="p-4 space-y-4">
      <SearchAndFilter
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        priorityFilter={priorityFilter}
        onPriorityChange={setPriorityFilter}
      />
      <BoardHeader board={board} onCreate={handleCreate} />
      <BoardView
        cards={filteredCards}
        columns={board.columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onMoveColumn={handleMoveColumn}
      />
    </div>
  );
}