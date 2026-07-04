import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import ThemeToggle from './ThemeToggle';

interface Board {
  id: string;
  name: string;
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false);
  const [boards, setBoards] = useState<Board[]>([]);
  const [activeBoardId, setActiveBoardId] = useState<string>('');

  // Load state from localStorage on mount
  useEffect(() => {
    let loadedBoards: Board[] | null = null;
    const storedBoards = localStorage.getItem('kanban_boards');
    if (storedBoards) {
      try {
        const parsed = JSON.parse(storedBoards);
        if (Array.isArray(parsed)) {
          loadedBoards = parsed;
        }
      } catch {
        // ignore invalid data
      }
    }
    if (!loadedBoards) {
      // Seed with default boards
      loadedBoards = [
        { id: crypto.randomUUID(), name: 'Personal' },
        { id: crypto.randomUUID(), name: 'Work' },
        { id: crypto.randomUUID(), name: 'Project Alpha' },
      ];
    }
    setBoards(loadedBoards);

    const storedActiveId = localStorage.getItem('kanban_activeBoardId');
    if (storedActiveId && loadedBoards.some(b => b.id === storedActiveId)) {
      setActiveBoardId(storedActiveId);
    } else {
      setActiveBoardId(loadedBoards.length > 0 ? loadedBoards[0].id : '');
    }

    const storedDark = localStorage.getItem('kanban_darkMode');
    if (storedDark) {
      setIsDark(storedDark === 'true');
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Persist dark mode
  useEffect(() => {
    localStorage.setItem('kanban_darkMode', String(isDark));
  }, [isDark]);

  // Persist boards
  useEffect(() => {
    localStorage.setItem('kanban_boards', JSON.stringify(boards));
  }, [boards]);

  // Persist active board id
  useEffect(() => {
    localStorage.setItem('kanban_activeBoardId', activeBoardId);
  }, [activeBoardId]);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  const handleCreateBoard = () => {
    const newBoard: Board = {
      id: crypto.randomUUID(),
      name: 'New Board',
    };
    setBoards((prev) => [...prev, newBoard]);
    setActiveBoardId(newBoard.id);
  };

  const handleSelectBoard = (id: string) => {
    setActiveBoardId(id);
  };

  const handleRenameBoard = (id: string, newName: string) => {
    setBoards((prev) =>
      prev.map((board) =>
        board.id === id ? { ...board, name: newName } : board
      )
    );
  };

  const handleDeleteBoard = (id: string) => {
    setBoards((prev) => prev.filter((board) => board.id !== id));
    if (activeBoardId === id) {
      setActiveBoardId('');
    }
  };

  return (
    <div className="flex h-screen bg-white dark:bg-gray-900">
      <aside className="w-64 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <ThemeToggle
            isDark={isDark}
            onToggle={() => setIsDark(!isDark)}
          />
        </div>
        <div className="flex-1 overflow-y-auto">
          <Sidebar
            boards={boards}
            activeBoardId={activeBoardId}
            onCreateBoard={handleCreateBoard}
            onSelectBoard={handleSelectBoard}
            onRenameBoard={handleRenameBoard}
            onDeleteBoard={handleDeleteBoard}
          />
        </div>
      </aside>
      <main className="flex-1 p-6 overflow-y-auto dark:text-white">
        {children}
      </main>
    </div>
  );
}
