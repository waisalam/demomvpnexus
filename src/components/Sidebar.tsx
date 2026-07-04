import React, { useState } from 'react';

interface BoardInfo {
  id: string;
  name: string;
}

export interface SidebarProps {
  boards: BoardInfo[];
  activeBoardId: string;
  onCreateBoard: () => void;
  onSelectBoard: (id: string) => void;
  onRenameBoard: (id: string, newName: string) => void;
  onDeleteBoard: (id: string) => void;
}

export default function Sidebar({
  boards,
  activeBoardId,
  onCreateBoard,
  onSelectBoard,
  onRenameBoard,
  onDeleteBoard,
}: SidebarProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');

  const startEditing = (board: BoardInfo) => {
    setEditingId(board.id);
    setEditName(board.name);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditName('');
  };

  const saveEditing = () => {
    if (editingId && editName.trim()) {
      onRenameBoard(editingId, editName.trim());
    }
    cancelEditing();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      saveEditing();
    } else if (e.key === 'Escape') {
      cancelEditing();
    }
  };

  return (
    <div className="p-4">
      <button
        onClick={onCreateBoard}
        className="w-full mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
      >
        + Create Board
      </button>

      <ul className="space-y-1">
        {boards.map((board) => {
          const isActive = board.id === activeBoardId;
          const isEditing = editingId === board.id;

          return (
            <li
              key={board.id}
              className={`flex items-center justify-between p-2 rounded cursor-pointer ${
                isActive
                  ? 'bg-blue-100 dark:bg-blue-900'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
              onClick={() => onSelectBoard(board.id)}
            >
              {isEditing ? (
                <div className="flex-1 flex items-center" onClick={(e) => e.stopPropagation()}>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    onBlur={saveEditing}
                    onKeyDown={handleKeyDown}
                    className="flex-1 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    autoFocus
                  />
                </div>
              ) : (
                <span className="flex-1 truncate dark:text-white">{board.name}</span>
              )}

              {!isEditing && (
                <div className="flex items-center space-x-1 ml-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      startEditing(board);
                    }}
                    className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
                    title="Rename board"
                  >
                    ✎
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteBoard(board.id);
                    }}
                    className="p-1 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
                    title="Delete board"
                  >
                    ✕
                  </button>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}