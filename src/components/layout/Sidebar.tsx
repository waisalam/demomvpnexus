import React, { useState, useCallback } from 'react';
import { useBoards } from '@/store/BoardContext';
import { useNavigate } from 'react-router-dom';

export default function Sidebar(): JSX.Element {
  const { boards, activeBoardId, addBoard, deleteBoard, renameBoard } = useBoards();
  const navigate = useNavigate();

  const [editingBoardId, setEditingBoardId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState<string>('');

  const handleAddBoard = useCallback(() => {
    const title = window.prompt('Enter board name:');
    if (title && title.trim()) {
      addBoard(title.trim());
    }
  }, [addBoard]);

  const handleDeleteBoard = useCallback(
    (boardId: string) => {
      if (window.confirm('Are you sure you want to delete this board?')) {
        deleteBoard(boardId);
      }
    },
    [deleteBoard]
  );

  const handleRenameBoard = useCallback(
    (boardId: string) => {
      setEditingBoardId(boardId);
      const board = boards.find((b) => b.id === boardId);
      setEditTitle(board?.title ?? '');
    },
    [boards]
  );

  const handleRenameSave = useCallback(() => {
    if (editingBoardId && editTitle.trim()) {
      renameBoard(editingBoardId, editTitle.trim());
    }
    setEditingBoardId(null);
    setEditTitle('');
  }, [editingBoardId, editTitle, renameBoard]);

  const handleRenameCancel = useCallback(() => {
    setEditingBoardId(null);
    setEditTitle('');
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        handleRenameSave();
      } else if (e.key === 'Escape') {
        handleRenameCancel();
      }
    },
    [handleRenameSave, handleRenameCancel]
  );

  return (
    <nav className="w-64 h-full bg-gray-100 p-4 flex flex-col border-r border-gray-200">
      <h2 className="text-lg font-bold mb-4">Boards</h2>
      <ul className="flex-1 space-y-1">
        {boards.map((board) => (
          <li key={board.id}>
            {editingBoardId === board.id ? (
              <div className="flex items-center space-x-1">
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditTitle(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onBlur={handleRenameSave}
                  className="flex-1 px-2 py-1 border rounded"
                  autoFocus
                />
              </div>
            ) : (
              <div
                className={`flex items-center justify-between px-2 py-1 rounded cursor-pointer hover:bg-gray-200 ${
                  board.id === activeBoardId ? 'bg-blue-100 font-semibold' : ''
                }`}
              >
                <span
                  className="flex-1 truncate"
                  onClick={() => navigate(`/board/${board.id}`)}
                >
                  {board.title}
                </span>
                <div className="flex space-x-1">
                  <button
                    onClick={() => handleRenameBoard(board.id)}
                    className="text-xs p-1 hover:bg-gray-300 rounded"
                    title="Rename board"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleDeleteBoard(board.id)}
                    className="text-xs p-1 hover:bg-gray-300 rounded"
                    title="Delete board"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
      <button
        onClick={handleAddBoard}
        className="mt-4 w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        + New Board
      </button>
    </nav>
  );
}