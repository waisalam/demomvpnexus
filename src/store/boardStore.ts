import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Board, Card, ChecklistItem, Priority, KanbanStoreState, KanbanStoreActions } from '@/types';
import { seedBoards } from '@/seedData';

type KanbanStore = KanbanStoreState & KanbanStoreActions;

const initialState: KanbanStoreState = {
  boards: seedBoards,
  activeBoardId: seedBoards.length > 0 ? seedBoards[0].id : null,
  searchQuery: '',
  priorityFilter: 'all',
};

const useBoardStore = create<KanbanStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      addBoard: (name: string) => {
        const newBoard: Board = {
          id: crypto.randomUUID(),
          name,
          columns: [
            { id: crypto.randomUUID(), name: 'To Do', cardIds: [] },
            { id: crypto.randomUUID(), name: 'In Progress', cardIds: [] },
            { id: crypto.randomUUID(), name: 'Done', cardIds: [] },
          ],
          cardById: {},
        };
        set((state) => ({
          boards: [...state.boards, newBoard],
        }));
      },

      renameBoard: (boardId: string, newName: string) => {
        set((state) => ({
          boards: state.boards.map((b) => (b.id === boardId ? { ...b, name: newName } : b)),
        }));
      },

      deleteBoard: (boardId: string) => {
        set((state) => ({
          boards: state.boards.filter((b) => b.id !== boardId),
          activeBoardId: state.activeBoardId === boardId ? null : state.activeBoardId,
        }));
      },

      setActiveBoard: (boardId: string) => {
        set({ activeBoardId: boardId });
      },

      addCard: (boardId: string, columnId: string, cardData: Omit<Card, 'id' | 'createdAt' | 'checklist'>) => {
        const cardId = crypto.randomUUID();
        const card: Card = {
          id: cardId,
          ...cardData,
          createdAt: new Date().toISOString(),
          checklist: [],
        };
        set((state) => ({
          boards: state.boards.map((board) => {
            if (board.id !== boardId) return board;
            return {
              ...board,
              cardById: { ...board.cardById, [cardId]: card },
              columns: board.columns.map((col) =>
                col.id === columnId ? { ...col, cardIds: [...col.cardIds, cardId] } : col
              ),
            };
          }),
        }));
      },

      editCard: (cardId: string, updates: Partial<Omit<Card, 'id'>>) => {
        set((state) => ({
          boards: state.boards.map((board) => {
            if (!board.cardById[cardId]) return board;
            const updatedCard = { ...board.cardById[cardId], ...updates };
            return {
              ...board,
              cardById: { ...board.cardById, [cardId]: updatedCard },
            };
          }),
        }));
      },

      deleteCard: (boardId: string, cardId: string) => {
        set((state) => ({
          boards: state.boards.map((board) => {
            if (board.id !== boardId) return board;
            const newCardById = { ...board.cardById };
            delete newCardById[cardId];
            return {
              ...board,
              cardById: newCardById,
              columns: board.columns.map((col) => ({
                ...col,
                cardIds: col.cardIds.filter((id) => id !== cardId),
              })),
            };
          }),
        }));
      },

      moveCard: (boardId: string, cardId: string, fromColumnId: string, toColumnId: string) => {
        set((state) => ({
          boards: state.boards.map((board) => {
            if (board.id !== boardId) return board;
            return {
              ...board,
              columns: board.columns.map((col) => {
                if (col.id === fromColumnId) {
                  return { ...col, cardIds: col.cardIds.filter((id) => id !== cardId) };
                }
                if (col.id === toColumnId) {
                  return { ...col, cardIds: [...col.cardIds, cardId] };
                }
                return col;
              }),
            };
          }),
        }));
      },

      addChecklistItem: (cardId: string, text: string) => {
        const newItem: ChecklistItem = {
          id: crypto.randomUUID(),
          text,
          completed: false,
        };
        set((state) => ({
          boards: state.boards.map((board) => {
            if (!board.cardById[cardId]) return board;
            const card = board.cardById[cardId];
            return {
              ...board,
              cardById: {
                ...board.cardById,
                [cardId]: {
                  ...card,
                  checklist: [...card.checklist, newItem],
                },
              },
            };
          }),
        }));
      },

      toggleChecklistItem: (cardId: string, itemId: string) => {
        set((state) => ({
          boards: state.boards.map((board) => {
            if (!board.cardById[cardId]) return board;
            const card = board.cardById[cardId];
            return {
              ...board,
              cardById: {
                ...board.cardById,
                [cardId]: {
                  ...card,
                  checklist: card.checklist.map((item) =>
                    item.id === itemId ? { ...item, completed: !item.completed } : item
                  ),
                },
              },
            };
          }),
        }));
      },

      removeChecklistItem: (cardId: string, itemId: string) => {
        set((state) => ({
          boards: state.boards.map((board) => {
            if (!board.cardById[cardId]) return board;
            const card = board.cardById[cardId];
            return {
              ...board,
              cardById: {
                ...board.cardById,
                [cardId]: {
                  ...card,
                  checklist: card.checklist.filter((item) => item.id !== itemId),
                },
              },
            };
          }),
        }));
      },

      setSearchQuery: (query: string) => {
        set({ searchQuery: query });
      },

      setPriorityFilter: (filter: Priority | 'all') => {
        set({ priorityFilter: filter });
      },
    }),
    {
      name: 'kanban-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useBoardStore;