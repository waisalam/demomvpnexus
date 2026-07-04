import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import useBoardStore from '../store/boardStore';
import { Card, ChecklistItem } from '../types';
import Checklist from './Checklist';
import Button from './Button';

function formatDate(date: string): string {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

const priorityBadgeColor: Record<string, string> = {
  High: 'bg-red-100 text-red-800',
  Medium: 'bg-yellow-100 text-yellow-800',
  Low: 'bg-green-100 text-green-800',
};

export default function CardDetail(): JSX.Element {
  const { boardId, cardId } = useParams<{ boardId: string; cardId: string }>();
  const { getCard, updateCard } = useBoardStore();

  const [card, setCard] = useState<Card | null>(null);
  const [loading, setLoading] = useState(true);
  const [description, setDescription] = useState('');
  const [saving, setSaving] = useState(false);

  // Load card data
  useEffect(() => {
    let cancelled = false;
    async function loadCard() {
      if (!boardId || !cardId) {
        setLoading(false);
        return;
      }
      try {
        const data = await getCard(boardId, cardId);
        if (!cancelled) {
          setCard(data ?? null);
          if (data) {
            setDescription(data.description);
          }
        }
      } catch {
        if (!cancelled) {
          setCard(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    loadCard();
    return () => { cancelled = true; };
  }, [boardId, cardId, getCard]);

  const handleSaveDescription = useCallback(async () => {
    if (!card || !boardId || saving) return;
    setSaving(true);
    try {
      await updateCard(boardId, card.id, { description });
    } finally {
      setSaving(false);
    }
  }, [boardId, card, description, saving, updateCard]);

  const handleToggleChecklist = useCallback(
    (itemId: string) => {
      if (!card || !boardId) return;
      const updatedChecklist = card.checklist.map((item) =>
        item.id === itemId ? { ...item, completed: !item.completed } : item
      );
      updateCard(boardId, card.id, { checklist: updatedChecklist });
      setCard((prev) => prev ? { ...prev, checklist: updatedChecklist } : null);
    },
    [boardId, card, updateCard]
  );

  const handleDeleteChecklist = useCallback(
    (itemId: string) => {
      if (!card || !boardId) return;
      const updatedChecklist = card.checklist.filter((item) => item.id !== itemId);
      updateCard(boardId, card.id, { checklist: updatedChecklist });
      setCard((prev) => prev ? { ...prev, checklist: updatedChecklist } : null);
    },
    [boardId, card, updateCard]
  );

  const handleAddChecklist = useCallback(
    (text: string) => {
      if (!card || !boardId || !text.trim()) return;
      const newItem: ChecklistItem = {
        id: Date.now().toString(),
        text: text.trim(),
        completed: false,
      };
      const updatedChecklist = [...card.checklist, newItem];
      updateCard(boardId, card.id, { checklist: updatedChecklist });
      setCard((prev) => prev ? { ...prev, checklist: updatedChecklist } : null);
    },
    [boardId, card, updateCard]
  );

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-gray-500 text-lg">Loading card…</p>
      </div>
    );
  }

  // Not found
  if (!card) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Card not found</h2>
        <Link
          to={boardId ? `/board/${boardId}` : '/'}
          className="text-indigo-600 hover:text-indigo-800 underline"
        >
          ← Back to board
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
      {/* Back link */}
      <Link
        to={`/board/${boardId}`}
        className="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-800"
      >
        ← Back to board
      </Link>

      {/* Card title */}
      <h1 className="text-3xl font-bold text-gray-900">{card.title}</h1>

      {/* Meta: priority, tag, created date */}
      <div className="flex flex-wrap items-center gap-3">
        <span
          className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
            priorityBadgeColor[card.priority] ?? 'bg-gray-100 text-gray-800'
          }`}
        >
          {card.priority}
        </span>
        {card.tag && (
          <span
            className="inline-block w-4 h-4 rounded-full"
            style={{ backgroundColor: card.tag.color }}
            title={card.tag.name}
          />
        )}
        <span className="text-sm text-gray-500">
          Created {formatDate(card.createdAt)}
        </span>
      </div>

      {/* Editable description */}
      <div className="space-y-2">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={5}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3"
          placeholder="Add a description…"
        />
        <div className="flex justify-end">
          <Button
            variant="primary"
            onClick={handleSaveDescription}
            disabled={saving}
            className="px-4 py-2 text-sm"
          >
            {saving ? 'Saving…' : 'Save description'}
          </Button>
        </div>
      </div>

      {/* Checklist */}
      <div className="border-t border-gray-200 pt-6">
        <Checklist
          items={card.checklist}
          onToggle={handleToggleChecklist}
          onDelete={handleDeleteChecklist}
          onAdd={handleAddChecklist}
        />
      </div>
    </div>
  );
}