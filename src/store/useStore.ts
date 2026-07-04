import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface ChecklistItem {
  id: string;
  text: string;
  done: boolean;
}

export interface Card {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  colorTag: string;
  createdAt: string;
  checklist: ChecklistItem[];
}

export interface Board {
  id: string;
  name: string;
  columns: { [columnId: string]: string[] };
  cards: Card[];
}

export interface StoreState {
  boards: Board[];
  currentBoardId: string | null;
  theme: 'light' | 'dark';
  searchQuery: string;
}

export interface StoreActions {
  createBoard: (name: string) => void;
  deleteBoard: (id: string) => void;
  switchBoard: (id: string) => void;
  renameBoard: (id: string, name: string) => void;
  addCard: (boardId: string, columnId: string, card: Omit<Card, 'id' | 'createdAt' | 'checklist'>) => void;
  updateCard: (cardId: string, updates: Partial<Omit<Card, 'id'>>) => void;
  deleteCard: (cardId: string) => void;
  moveCard: (cardId: string, fromColumnId: string, toColumnId: string) => void;
  addCheckItem: (cardId: string, text: string) => void;
  toggleCheckItem: (cardId: string, itemId: string) => void;
  removeCheckItem: (cardId: string, itemId: string) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  setSearchQuery: (query: string) => void;
}

const generateId = (): string => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
};

const seedBoards: Board[] = [
  {
    id: 'board-1',
    name: 'My Board',
    columns: {
      backlog: [],
      todo: [],
      'in-progress': [],
      done: [],
    },
    cards: [
      {
        id: 'card-1',
        title: 'Welcome to Kanban',
        description: 'This is a sample card. You can drag cards between columns, add checklists, and set priorities.',
        priority: 'medium',
        colorTag: '#3b82f6',
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        checklist: [
          { id: 'item-1', text: 'Create first task', done: true },
          { id: 'item-2', text: 'Try moving this card', done: false },
        ],
      },
      {
        id: 'card-2',
        title: 'Set up project',
        description: 'Customize your board by adding more columns or changing colors.',
        priority: 'high',
        colorTag: '#ef4444',
        createdAt: new Date().toISOString(),
        checklist: [],
      },
    ],
  },
  {
    id: 'board-2',
    name: 'Project Alpha',
    columns: {
      backlog: [],
      todo: [],
      'in-progress': [],
      done: [],
    },
    cards: [
      {
        id: 'card-3',
        title: 'Research competitors',
        description: 'Analyze top 3 competitors features and pricing.',
        priority: 'high',
        colorTag: '#f59e0b',
        createdAt: new Date(Date.now() - 172800000).toISOString(),
        checklist: [
          { id: 'item-3', text: 'Collect URLs', done: true },
          { id: 'item-4', text: 'Compare features', done: false },
          { id: 'item-5', text: 'Draft report', done: false },
        ],
      },
    ],
  },
];

seedBoards[0].columns.backlog.push('card-1');
seedBoards[0].columns.todo.push('card-2');
seedBoards[1].columns.backlog.push('card-3');

const useStore = create<StoreState & StoreActions>()(
  persist(
    (set) => ({
      boards: seedBoards,
      currentBoardId: 'board-1',
      theme: 'light' as const,
      searchQuery: '',

      createBoard: (name: string) => {
        const newBoard: Board = {
          id: generateId(),
          name,
          columns: {
            backlog: [],
            todo: [],
            'in-progress': [],
            done: [],
          },
          cards: [],
        };
        set((state) => ({
          boards: [...state.boards, newBoard],
        }));
      },

      deleteBoard: (id: string) => {
        set((state) => {
          const boards = state.boards.filter((b) => b.id !== id);
          const currentBoardId =
            state.currentBoardId === id
              ? boards.length > 0
                ? boards[0].id
                : null
              : state.currentBoardId;
          return { boards, currentBoardId };
        });
      },

      switchBoard: (id: string) => {
        set({ currentBoardId: id });
      },

      renameBoard: (id: string, name: string) => {
        set((state) => ({
          boards: state.boards.map((b) =>
            b.id === id ? { ...b, name } : b
          ),
        }));
      },

      addCard: (boardId: string, columnId: string, cardData: Omit<Card, 'id' | 'createdAt' | 'checklist'>) => {
        const newCard: Card = {
          ...cardData,
          id: generateId(),
          createdAt: new Date().toISOString(),
          checklist: [],
        };
        set((state) => ({
          boards: state.boards.map((board) => {
            if (board.id !== boardId) return board;
            return {
              ...board,
              cards: [...board.cards, newCard],
              columns: {
                ...board.columns,
                [columnId]: [...board.columns[columnId], newCard.id],
              },
            };
          }),
        }));
      },

      updateCard: (cardId: string, updates: Partial<Omit<Card, 'id'>>) => {
        set((state) => ({
          boards: state.boards.map((board) => {
            const cardIndex = board.cards.findIndex((c) => c.id === cardId);
            if (cardIndex === -1) return board;
            const updatedCards = [...board.cards];
            updatedCards[cardIndex] = {
              ...updatedCards[cardIndex],
              ...updates,
            };
            return { ...board, cards: updatedCards };
          }),
        }));
      },

      deleteCard: (cardId: string) => {
        set((state) => ({
          boards: state.boards.map((board) => {
            const cards = board.cards.filter((c) => c.id !== cardId);
            const columns = { ...board.columns };
            for (const colId in columns) {
              columns[colId] = columns[colId].filter((id) => id !== cardId);
            }
            return { ...board, cards, columns };
          }),
        }));
      },

      moveCard: (cardId: string, fromColumnId: string, toColumnId: string) => {
        if (fromColumnId === toColumnId) return;
        set((state) => ({
          boards: state.boards.map((board) => {
            const hasCard = board.columns[fromColumnId]?.includes(cardId);
            if (!hasCard) return board;
            const columns = { ...board.columns };
            columns[fromColumnId] = columns[fromColumnId].filter((id) => id !== cardId);
            columns[toColumnId] = [...columns[toColumnId], cardId];
            return { ...board, columns };
          }),
        }));
      },

      addCheckItem: (cardId: string, text: string) => {
        const newItem: ChecklistItem = {
          id: generateId(),
          text,
          done: false,
        };
        set((state) => ({
          boards: state.boards.map((board) => {
            const cardIndex = board.cards.findIndex((c) => c.id === cardId);
            if (cardIndex === -1) return board;
            const updatedCards = [...board.cards];
            updatedCards[cardIndex] = {
              ...updatedCards[cardIndex],
              checklist: [...updatedCards[cardIndex].checklist, newItem],
            };
            return { ...board, cards: updatedCards };
          }),
        }));
      },

      toggleCheckItem: (cardId: string, itemId: string) => {
        set((state) => ({
          boards: state.boards.map((board) => {
            const cardIndex = board.cards.findIndex((c) => c.id === cardId);
            if (cardIndex === -1) return board;
            const card = board.cards[cardIndex];
            const updatedChecklist = card.checklist.map((item) =>
              item.id === itemId ? { ...item, done: !item.done } : item
            );
            const updatedCards = [...board.cards];
            updatedCards[cardIndex] = { ...card, checklist: updatedChecklist };
            return { ...board, cards: updatedCards };
          }),
        }));
      },

      removeCheckItem: (cardId: string, itemId: string) => {
        set((state) => ({
          boards: state.boards.map((board) => {
            const cardIndex = board.cards.findIndex((c) => c.id === cardId);
            if (cardIndex === -1) return board;
            const card = board.cards[cardIndex];
            const updatedChecklist = card.checklist.filter((item) => item.id !== itemId);
            const updatedCards = [...board.cards];
            updatedCards[cardIndex] = { ...card, checklist: updatedChecklist };
            return { ...board, cards: updatedCards };
          }),
        }));
      },

      setTheme: (theme: 'light' | 'dark') => {
        set({ theme });
      },

      setSearchQuery: (query: string) => {
        set({ searchQuery: query });
      },
    }),
    {
      name: 'kanban-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state: StoreState & StoreActions) => ({
        boards: state.boards,
        currentBoardId: state.currentBoardId,
        theme: state.theme,
      }),
    }
  )
);

export default useStore;