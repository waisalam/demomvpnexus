import React, { useState, FormEvent } from 'react';
import useBoardStore from '../store';
import { Board, Column, Card } from '../types';

export default function Board(): JSX.Element {
  const {
    boards,
    currentBoardId,
    addCard,
    moveCard,
    updateCard,
    deleteCard,
  } = useBoardStore();

  const board: Board | undefined = boards.find((b: Board) => b.id === currentBoardId);
  const columns: Column[] = board?.columns ?? [];
  const allCards: Card[] = board?.columns?.flatMap(col => col.cards) ?? [];

  // Search & filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPriority, setFilterPriority] = useState('');

  // Create modal state
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newPriority, setNewPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [newTagColor, setNewTagColor] = useState('#3498db');

  // Edit modal state
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingCard, setEditingCard] = useState<Card | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDesc, setEditDesc] = useState('');
  const [editPriority, setEditPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [editTagColor, setEditTagColor] = useState('#3498db');

  // Filter all cards by search and priority
  const filteredCards = allCards.filter((card) => {
    const matchesSearch = card.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = filterPriority ? card.priority === filterPriority : true;
    return matchesSearch && matchesPriority;
  });

  const getColumnCards = (columnId: string): Card[] => {
    const column = columns.find((c) => c.id === columnId);
    if (!column) return [];
    return filteredCards.filter((card) => column.cards.some((c) => c.id === card.id));
  };

  // ---- Handlers ----
  const handleCreateSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = newTitle.trim();
    if (trimmed && columns.length > 0) {
      addCard(columns[0].id, {
        title: trimmed,
        description: newDesc.trim(),
        priority: newPriority,
        tagColor: newTagColor,
      });
      // Reset and close
      setNewTitle('');
      setNewDesc('');
      setNewPriority('medium');
      setNewTagColor('#3498db');
      setIsCreateOpen(false);
    }
  };

  const openEdit = (card: Card) => {
    setEditingCard(card);
    setEditTitle(card.title);
    setEditDesc(card.description);
    setEditPriority(card.priority);
    setEditTagColor(card.tagColor);
    setIsEditOpen(true);
  };

  const handleEditSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = editTitle.trim();
    if (editingCard && trimmed) {
      updateCard(editingCard.id, {
        title: trimmed,
        description: editDesc.trim(),
        priority: editPriority,
        tagColor: editTagColor,
      });
      setIsEditOpen(false);
      setEditingCard(null);
    }
  };

  const handleDelete = (cardId: string) => {
    if (window.confirm('Delete this card?')) {
      deleteCard(cardId);
    }
  };

  // Drag & drop
  const handleDragStart = (e: React.DragEvent, cardId: string) => {
    e.dataTransfer.setData('text/plain', cardId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetColumnId: string) => {
    e.preventDefault();
    const cardId = e.dataTransfer.getData('text/plain');
    if (cardId) {
      moveCard(cardId, targetColumnId);
    }
  };

  // ---- Inline styles (matching existing codebase pattern) ----
  const containerStyle: React.CSSProperties = {
    marginLeft: '270px',
    padding: '1.5rem 2rem',
    fontFamily: 'system-ui, sans-serif',
  };

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.25rem',
  };

  const controlsStyle: React.CSSProperties = {
    display: 'flex',
    gap: '1rem',
    marginBottom: '1.5rem',
    flexWrap: 'wrap',
    alignItems: 'center',
  };

  const inputStyle: React.CSSProperties = {
    padding: '0.4rem 0.6rem',
    borderRadius: 6,
    border: '1px solid #ccc',
    fontSize: '0.9rem',
  };

  const selectStyle: React.CSSProperties = {
    padding: '0.4rem 0.6rem',
    borderRadius: 6,
    border: '1px solid #ccc',
    fontSize: '0.9rem',
    background: '#fff',
  };

  const btnStyle: React.CSSProperties = {
    padding: '0.4rem 0.9rem',
    borderRadius: 6,
    border: '1px solid #bbb',
    background: '#f8f8f8',
    cursor: 'pointer',
    fontWeight: 500,
  };

  const columnsContainer: React.CSSProperties = {
    display: 'flex',
    gap: '1.5rem',
    overflowX: 'auto',
    paddingBottom: '1rem',
  };

  const columnStyle: React.CSSProperties = {
    flex: '1 0 280px',
    background: 'var(--column-bg, #f2f4f7)',
    borderRadius: 10,
    padding: '0.75rem',
    minHeight: '500px',
    border: '1px solid #ddd',
  };

  const columnHeader: React.CSSProperties = {
    margin: 0,
    paddingBottom: '0.5rem',
    borderBottom: '2px solid var(--border-color, #ccc)',
    marginBottom: '0.75rem',
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '1rem',
    fontWeight: 600,
  };

  const cardStyle: React.CSSProperties = {
    background: '#fff',
    borderRadius: 6,
    padding: '0.6rem 0.7rem',
    marginBottom: '0.6rem',
    border: '1px solid #e0e0e0',
    cursor: 'grab',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.3rem',
    boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
    userSelect: 'none',
  };

  const cardTag: React.CSSProperties = {
    display: 'inline-block',
    width: 10,
    height: 10,
    borderRadius: '50%',
    marginRight: '0.4rem',
    flexShrink: 0,
  };

  const cardActions: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '0.4rem',
    marginTop: '0.3rem',
  };

  const iconBtn: React.CSSProperties = {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1rem',
    padding: '0.15rem 0.3rem',
    borderRadius: 4,
    lineHeight: 1,
  };

  // Modal styles (inline, similar to Sidebar)
  const modalOverlay: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.4)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  };

  const modalContent: React.CSSProperties = {
    backgroundColor: '#fff',
    padding: '1.5rem',
    borderRadius: 10,
    width: '90%',
    maxWidth: '420px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
  };

  const formField: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '0.9rem',
  };

  const labelStyle: React.CSSProperties = {
    fontWeight: 500,
    marginBottom: '0.25rem',
    fontSize: '0.9rem',
  };

  if (!board) {
    return <div style={{ marginLeft: 250, padding: '2rem' }}>Select or create a board.</div>;
  }

  return (
    <div style={containerStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <h1 style={{ margin: 0 }}>{board.title}</h1>
        <button style={btnStyle} onClick={() => setIsCreateOpen(true)}>
          + New Card
        </button>
      </div>

      {/* Search & Filter Controls */}
      <div style={controlsStyle}>
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={inputStyle}
        />
        <select
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
          style={selectStyle}
        >
          <option value="">All Priorities</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      {/* Columns */}
      <div style={columnsContainer}>
        {columns.map((col) => {
          const colCards = getColumnCards(col.id);
          return (
            <div
              key={col.id}
              style={columnStyle}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, col.id)}
            >
              <div style={columnHeader}>
                <span>{col.title}</span>
                <span style={{ fontSize: '0.85rem', opacity: 0.7 }}>{colCards.length}</span>
              </div>
              {colCards.map((card) => (
                <div
                  key={card.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, card.id)}
                  style={cardStyle}
                >
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ ...cardTag, backgroundColor: card.tagColor }} />
                    <strong style={{ fontSize: '0.95rem' }}>{card.title}</strong>
                  </div>
                  {card.description && (
                    <div style={{ fontSize: '0.8rem', color: '#555', marginTop: '0.15rem' }}>
                      {card.description}
                    </div>
                  )}
                  <div style={cardActions}>
                    <button
                      style={{ ...iconBtn, color: '#888' }}
                      onClick={() => openEdit(card)}
                      title="Edit"
                    >
                      ✎
                    </button>
                    <button
                      style={{ ...iconBtn, color: '#c0392b' }}
                      onClick={() => handleDelete(card.id)}
                      title="Delete"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>

      {/* Create Modal */}
      {isCreateOpen && (
        <div style={modalOverlay} onClick={() => setIsCreateOpen(false)}>
          <div style={modalContent} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ margin: '0 0 1rem' }}>New Card</h3>
            <form onSubmit={handleCreateSubmit}>
              <div style={formField}>
                <label style={labelStyle}>Title *</label>
                <input
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  required
                  style={inputStyle}
                />
              </div>
              <div style={formField}>
                <label style={labelStyle}>Description</label>
                <textarea
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  rows={3}
                  style={{ ...inputStyle, resize: 'vertical' }}
                />
              </div>
              <div style={formField}>
                <label style={labelStyle}>Priority</label>
                <select
                  value={newPriority}
                  onChange={(e) => setNewPriority(e.target.value as any)}
                  style={selectStyle}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div style={formField}>
                <label style={labelStyle}>Tag Color</label>
                <input
                  type="color"
                  value={newTagColor}
                  onChange={(e) => setNewTagColor(e.target.value)}
                  style={{ width: 40, height: 30, padding: 0, border: 'none', background: 'none' }}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                <button type="button" style={btnStyle} onClick={() => setIsCreateOpen(false)}>
                  Cancel
                </button>
                <button type="submit" style={btnStyle}>
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditOpen && editingCard && (
        <div style={modalOverlay} onClick={() => setIsEditOpen(false)}>
          <div style={modalContent} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ margin: '0 0 1rem' }}>Edit Card</h3>
            <form onSubmit={handleEditSubmit}>
              <div style={formField}>
                <label style={labelStyle}>Title *</label>
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  required
                  style={inputStyle}
                />
              </div>
              <div style={formField}>
                <label style={labelStyle}>Description</label>
                <textarea
                  value={editDesc}
                  onChange={(e) => setEditDesc(e.target.value)}
                  rows={3}
                  style={{ ...inputStyle, resize: 'vertical' }}
                />
              </div>
              <div style={formField}>
                <label style={labelStyle}>Priority</label>
                <select
                  value={editPriority}
                  onChange={(e) => setEditPriority(e.target.value as any)}
                  style={selectStyle}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div style={formField}>
                <label style={labelStyle}>Tag Color</label>
                <input
                  type="color"
                  value={editTagColor}
                  onChange={(e) => setEditTagColor(e.target.value)}
                  style={{ width: 40, height: 30, padding: 0, border: 'none', background: 'none' }}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                <button type="button" style={btnStyle} onClick={() => setIsEditOpen(false)}>
                  Cancel
                </button>
                <button type="submit" style={btnStyle}>
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}