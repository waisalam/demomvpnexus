import { useParams, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { BoardContext } from '../contexts/BoardContext';
import CardDetail from '../components/CardDetail';

type Priority = 'low' | 'medium' | 'high';

interface Card {
  id: string;
  boardId: string;
  title: string;
  description: string;
  priority: Priority;
  columnId: string;
}

export default function CardDetailPage() {
  const { boardId, cardId } = useParams<{ boardId: string; cardId: string }>();
  const navigate = useNavigate();
  const { cards, updateCardDescription, updateChecklistItem } = useContext(BoardContext);

  const card: Card | undefined = cards.find((c: Card) => c.id === cardId);

  if (!card) {
    return <div className="p-4">Card not found</div>;
  }

  const handleBack = () => {
    navigate(`/board/${boardId}`);
  };

  const handleUpdateDescription = (description: string) => {
    updateCardDescription(cardId!, description);
  };

  const handleUpdateChecklistItem = (itemId: string, checked: boolean, text?: string) => {
    updateChecklistItem(cardId!, itemId, checked, text);
  };

  return (
    <div className="p-4 space-y-4">
      <button onClick={handleBack} className="text-blue-500 hover:underline">
        &larr; Back to Board
      </button>
      <CardDetail
        card={card}
        onUpdateDescription={handleUpdateDescription}
        onUpdateChecklistItem={handleUpdateChecklistItem}
      />
    </div>
  );
}