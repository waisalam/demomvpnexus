import React, { createContext, useContext, useReducer, useEffect, useMemo, ReactNode } from 'react';
import { Board, Card, Column, Priority, SubTask } from '../types';
import seedBoards from '../data/seedData';

// ---------------------------------------------------------------------------
// State shape
// ---------------------------------------------------------------------------
export interface BoardState {
  boards: Board[];
  activeBoardId: string | null;
  searchQuery: string;
  filterPriority: Priority | 'all';
}

// ---------------------------------------------------------------------------
// Actions shape – consumed by components via the hook
// ---------------------------------------------------------------------------
export interface BoardActions {
  addBoard: (name: string) => void;
  deleteBoard: (boardId: string) => void;
  renameBoard: (boardId: string, name: string) => void;
  setActiveBoard: (boardId: string) => void;
  createCard: (boardId: string, columnId: string, card: Omit<Card, 'id' | 'createdAt' | 'subtasks'>) => string;
  updateCard: (boardId: string, cardId: string, updates: Partial<Card>) => void;
  deleteCard: (boardId: string, columnId: string, cardId: string) => void;
  moveCard: (boardId: string, fromColumnId: string, toColumnId: string, cardId: string, newIndex?: number) => void;
  addSubtask: (boardId: string, cardId: string, title: string) => void;
  toggleSubtask: (boardId: string, cardId: string, subtaskId: string) => void;
  deleteSubtask: (boardId: string, cardId: string, subtaskId: string) => void;
  setSearchQuery: (query: string) => void;
  setFilterPriority: (priority: Priority | 'all') => void;
}

export type BoardContextType = { state: BoardState; actions: BoardActions };

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------
export const BoardContext = createContext<BoardContextType | undefined>(undefined);

// ---------------------------------------------------------------------------
// Internal action types for the reducer
// ---------------------------------------------------------------------------
type BoardAction =
  | { type: 'ADD_BOARD'; board: Board }
  | { type: 'DELETE_BOARD'; boardId: string }
  | { type: 'RENAME_BOARD'; boardId: string; name: string }
  | { type: 'SET_ACTIVE_BOARD'; boardId: string }
  | { type: 'CREATE_CARD'; boardId: string; columnId: string; card: Omit<Card, 'id' | 'createdAt' | 'subtasks'>; newCardId: string; createdAt: string }
  | { type: 'UPDATE_CARD'; boardId: string; cardId: string; updates: Partial<Card> }
  | { type: 'DELETE_CARD'; boardId: string; columnId: string; cardId: string }
  | { type: 'MOVE_CARD'; boardId: string; fromColumnId: string; toColumnId: string; cardId: string; newIndex?: number }
  | { type: 'ADD_SUBTASK'; boardId: string; cardId: string; subtask: SubTask }
  | { type: 'TOGGLE_SUBTASK'; boardId: string; cardId: string; subtaskId: string }
  | { type: 'DELETE_SUBTASK'; boardId: string; cardId: string; subtaskId: string }
  | { type: 'SET_SEARCH_QUERY'; query: string }
  | { type: 'SET_FILTER_PRIORITY'; priority: Priority | 'all' };

// ---------------------------------------------------------------------------
// Helper – produce default columns for a new board
// ---------------------------------------------------------------------------
const createDefaultColumns = (): Column[] => [
  { id: crypto.randomUUID(), title: 'To Do', cardIds: [] },
  { id: crypto.randomUUID(), title: 'In Progress', cardIds: [] },
  { id: crypto.randomUUID(), title: 'Done', cardIds: [] },
];

// ---------------------------------------------------------------------------
// Reducer – pure state transitions
// ---------------------------------------------------------------------------
const boardReducer = (state: BoardState, action: BoardAction): BoardState => {
  switch (action.type) {
    case 'ADD_BOARD':
      return { ...state, boards: [...state.boards, action.board] };

    case 'DELETE_BOARD': {
      const filtered = state.boards.filter((b: Board) => b.id !== action.boardId);
      return {
        ...state,
        boards: filtered,
        activeBoardId: state.activeBoardId === action.boardId
          ? (filtered.length > 0 ? filtered[0].id : null)
          : state.activeBoardId,
      };
    }

    case 'RENAME_BOARD':
      return {
        ...state,
        boards: state.boards.map((b: Board) =>
          b.id === action.boardId ? { ...b, name: action.name } : b
        ),
      };

    case 'SET_ACTIVE_BOARD':
      return { ...state, activeBoardId: action.boardId };

    case 'CREATE_CARD': {
      const newCard: Card = {
        ...action.card,
        id: action.newCardId,
        createdAt: action.createdAt,
        subtasks: [],
      };
      return {
        ...state,
        boards: state.boards.map((b: Board) => {
          if (b.id !== action.boardId) return b;
          return {
            ...b,
            cards: [...b.cards, newCard],
            columns: b.columns.map((col: Column) =>
              col.id === action.columnId
                ? { ...col, cardIds: [...col.cardIds, action.newCardId] }
                : col
            ),
          };
        }),
      };
    }

    case 'UPDATE_CARD':
      return {
        ...state,
        boards: state.boards.map((b: Board) =>
          b.id === action.boardId
            ? {
                ...b,
                cards: b.cards.map((c: Card) =>
                  c.id === action.cardId ? { ...c, ...action.updates } : c
                ),
              }
            : b
        ),
      };

    case 'DELETE_CARD':
      return {
        ...state,
        boards: state.boards.map((b: Board) => {
          if (b.id !== action.boardId) return b;
          return {
            ...b,
            cards: b.cards.filter((c: Card) => c.id !== action.cardId),
            columns: b.columns.map((col: Column) =>
              col.id === action.columnId
                ? { ...col, cardIds: col.cardIds.filter((id: string) => id !== action.cardId) }
                : col
            ),
          };
        }),
      };

    case 'MOVE_CARD': {
      const { boardId, fromColumnId, toColumnId, cardId, newIndex } = action;
      return {
        ...state,
        boards: state.boards.map((b: Board) => {
          if (b.id !== boardId) return b;
          // Remove from source column
          const updatedColumns = b.columns.map((col: Column) => {
            if (col.id === fromColumnId) {
              return { ...col, cardIds: col.cardIds.filter((id: string) => id !== cardId) };
            }
            if (col.id === toColumnId) {
              const filtered = col.cardIds.filter((id: string) => id !== cardId); // in case same column
              const idx = newIndex !== undefined ? newIndex : filtered.length;
              // Clamp index
              const insertAt = Math.max(0, Math.min(idx, filtered.length));
              const newCardIds = [...filtered];
              newCardIds.splice(insertAt, 0, cardId);
              return { ...col, cardIds: newCardIds };
            }
            return col;
          });
          return { ...b, columns: updatedColumns };
        }),
      };
    }

    case 'ADD_SUBTASK':
      return {
        ...state,
        boards: state.boards.map((b: Board) =>
          b.id === action.boardId
            ? {
                ...b,
                cards: b.cards.map((c: Card) =>
                  c.id === action.cardId
                    ? { ...c, subtasks: [...c.subtasks, action.subtask] }
                    : c
                ),
              }
            : b
        ),
      };

    case 'TOGGLE_SUBTASK':
      return {
        ...state,
        boards: state.boards.map((b: Board) =>
          b.id === action.boardId
            ? {
                ...b,
                cards: b.cards.map((c: Card) =>
                  c.id === action.cardId
                    ? {
                        ...c,
                        subtasks: c.subtasks.map((s: SubTask) =>
                          s.id === action.subtaskId
                            ? { ...s, completed: !s.completed }
                            : s
                        ),
                      }
                    : c
                ),
              }
            : b
        ),
      };

    case 'DELETE_SUBTASK':
      return {
        ...state,
        boards: state.boards.map((b: Board) =>
          b.id === action.boardId
            ? {
                ...b,
                cards: b.cards.map((c: Card) =>
                  c.id === action.cardId
                    ? {
                        ...c,
                        subtasks: c.subtasks.filter((s: SubTask) => s.id !== action.subtaskId),
                      }
                    : c
                ),
              }
            : b
        ),
      };

    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.query };

    case 'SET_FILTER_PRIORITY':
      return { ...state, filterPriority: action.priority };

    default:
      return state;
  }
};

// ---------------------------------------------------------------------------
// Initial state – seed data or localStorage
// ---------------------------------------------------------------------------
const getInitialState = (): BoardState => {
  try {
    const raw = localStorage.getItem('kanban-state');
    if (raw) {
      const parsed = JSON.parse(raw);
      // Basic validation – ensure expected fields exist
      if (parsed && Array.isArray(parsed.boards)) {
        return parsed as BoardState;
      }
    }
  } catch {
    // Ignore parse errors, fall through to seed data
  }
  return {
    boards: seedBoards,
    activeBoardId: seedBoards.length > 0 ? seedBoards[0].id : null,
    searchQuery: '',
    filterPriority: 'all',
  };
};

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------
export function BoardProvider({ children }: { children: ReactNode }): JSX.Element {
  const [state, dispatch] = useReducer(boardReducer, undefined, getInitialState);

  // Persist every state change
  useEffect(() => {
    localStorage.setItem('kanban-state', JSON.stringify(state));
  }, [state]);

  const actions: BoardActions = useMemo(() => ({
    addBoard: (name: string) => {
      const board: Board = {
        id: crypto.randomUUID(),
        name,
        columns: createDefaultColumns(),
        cards: [],
      };
      dispatch({ type: 'ADD_BOARD', board });
    },

    deleteBoard: (boardId: string) => dispatch({ type: 'DELETE_BOARD', boardId }),
    renameBoard: (boardId: string, name: string) => dispatch({ type: 'RENAME_BOARD', boardId, name }),
    setActiveBoard: (boardId: string) => dispatch({ type: 'SET_ACTIVE_BOARD', boardId }),

    createCard: (boardId: string, columnId: string, card: Omit<Card, 'id' | 'createdAt' | 'subtasks'>): string => {
      const newCardId = crypto.randomUUID();
      const createdAt = new Date().toISOString();
      dispatch({ type: 'CREATE_CARD', boardId, columnId, card, newCardId, createdAt });
      return newCardId;
    },

    updateCard: (boardId: string, cardId: string, updates: Partial<Card>) =>
      dispatch({ type: 'UPDATE_CARD', boardId, cardId, updates }),

    deleteCard: (boardId: string, columnId: string, cardId: string) =>
      dispatch({ type: 'DELETE_CARD', boardId, columnId, cardId }),

    moveCard: (boardId: string, fromColumnId: string, toColumnId: string, cardId: string, newIndex?: number) =>
      dispatch({ type: 'MOVE_CARD', boardId, fromColumnId, toColumnId, cardId, newIndex }),

    addSubtask: (boardId: string, cardId: string, title: string) => {
      const subtask: SubTask = {
        id: crypto.randomUUID(),
        title,
        completed: false,
      };
      dispatch({ type: 'ADD_SUBTASK', boardId, cardId, subtask });
    },

    toggleSubtask: (boardId: string, cardId: string, subtaskId: string) =>
      dispatch({ type: 'TOGGLE_SUBTASK', boardId, cardId, subtaskId }),

    deleteSubtask: (boardId: string, cardId: string, subtaskId: string) =>
      dispatch({ type: 'DELETE_SUBTASK', boardId, cardId, subtaskId }),

    setSearchQuery: (query: string) => dispatch({ type: 'SET_SEARCH_QUERY', query }),
    setFilterPriority: (priority: Priority | 'all') => dispatch({ type: 'SET_FILTER_PRIORITY', priority }),
  }), []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <BoardContext.Provider value={{ state, actions }}>
      {children}
    </BoardContext.Provider>
  );
}

// ---------------------------------------------------------------------------
// Custom hook
// ---------------------------------------------------------------------------
export function useBoard(): BoardContextType {
  const ctx = useContext(BoardContext);
  if (!ctx) {
    throw new Error('useBoard must be used within a BoardProvider');
  }
  return ctx;
}