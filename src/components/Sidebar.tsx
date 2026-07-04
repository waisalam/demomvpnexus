import React, { useState, FormEvent } from 'react';
import useBoardStore from '../store/useBoardStore';
import { useTheme } from '../context/ThemeContext';

export default function Sidebar(): JSX.Element {
  const { theme, toggleTheme } = useTheme();
  const {
    boards,
    currentBoardId,
    createBoard,
    deleteBoard,
    renameBoard,
    setCurrentBoard,
  } = useBoardStore();

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [isRenameOpen, setIsRenameOpen] = useState(false);
  const [renameId, setRenameId] = useState<string | null>(null);
  const [renameName, setRenameName] = useState('');

  const handleCreate = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = newName.trim();
    if (trimmed) {
      createBoard(trimmed);
      setNewName('');
      setIsCreateOpen(false);
    }
  };

  const openRename = (id: string, current: string) => {
    setRenameId(id);
    setRenameName(current);
    setIsRenameOpen(true);
  };

  const handleRename = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = renameName.trim();
    if (renameId && trimmed) {
      renameBoard(renameId, trimmed);
      setIsRenameOpen(false);
      setRenameId(null);
      setRenameName('');
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Delete this board?')) {
      deleteBoard(id);
    }
  };

  const sidebarStyle: React.CSSProperties = {
    width: '250px',
    height: '100vh',
    position: 'fixed',
    left: 0,
    top: 0,
    backgroundColor: 'var(--sidebar-bg, #f5f5f5)',
    display: 'flex',
    flexDirection: 'column',
    padding: '1rem',
    boxSizing: 'border-box',
    borderRight: '1px solid var(--border-color, #ccc)',
    overflowY: 'auto',
    zIndex: 10,
  };

  const boardListStyle: React.CSSProperties = {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    flex: 1,
  };

  const boardItemBase: React.CSSProperties = {
    padding: '0.5rem',
    cursor: 'pointer',
    borderBottom: '1px solid #eee',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

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
    borderRadius: '8px',
    minWidth: '300px',
  };

  return (
    <div style={sidebarStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2 style={{ margin: 0 }}>Boards</h2>
        <button onClick={toggleTheme} title="Toggle theme" style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer' }}>
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>

      <button onClick={() => setIsCreateOpen(true)} style={{ marginBottom: '0.75rem' }}>
        + New Board
      </button>

      <ul style={boardListStyle}>
        {boards.map((board) => (
          <li
            key={board.id}
            onClick={() => setCurrentBoard(board.id)}
            style={{
              ...boardItemBase,
              ...(board.id === currentBoardId
                ? { backgroundColor: 'var(--active-board-bg, #d0d0d0)', fontWeight: 'bold' }
                : {}),
            }}
          >
            <span style={{ flex: 1 }}>{board.name}</span>
            <div style={{ display: 'flex', gap: '0.25rem' }}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  openRename(board.id, board.name);
                }}
                title="Rename"
                style={{ fontSize: '0.8rem', padding: '0.1rem 0.3rem' }}
              >
                ✏️
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(board.id);
                }}
                title="Delete"
                style={{ fontSize: '0.8rem', padding: '0.1rem 0.3rem' }}
              >
                🗑️
              </button>
            </div>
          </li>
        ))}
      </ul>

      {isCreateOpen && (
        <div style={modalOverlay} onClick={() => setIsCreateOpen(false)}>
          <div style={modalContent} onClick={(e) => e.stopPropagation()}>
            <h3>Create Board</h3>
            <form onSubmit={handleCreate}>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Board name"
                autoFocus
                style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }}
              />
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                <button type="button" onClick={() => setIsCreateOpen(false)}>Cancel</button>
                <button type="submit">Create</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isRenameOpen && (
        <div style={modalOverlay} onClick={() => setIsRenameOpen(false)}>
          <div style={modalContent} onClick={(e) => e.stopPropagation()}>
            <h3>Rename Board</h3>
            <form onSubmit={handleRename}>
              <input
                type="text"
                value={renameName}
                onChange={(e) => setRenameName(e.target.value)}
                placeholder="New board name"
                autoFocus
                style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }}
              />
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                <button type="button" onClick={() => setIsRenameOpen(false)}>Cancel</button>
                <button type="submit">Rename</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}