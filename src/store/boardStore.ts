=======
  return React.createElement(BoardContext.Provider, { value: contextValue }, children);
// src/store/boardStore.ts
import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
=======
import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
=======
=======
  return React.createElement(BoardContext.Provider, { value: contextValue }, children);
// src/store/boardStore.ts
import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { Board, Card, ColumnType, Priority, ChecklistItem } from '../types/board';

interface BoardState {
  boards: Board[];
  cards: Card[];
  currentBoardId: string | null;
  searchTerm: string;
  priorityFilter: Priority | 'all';
}

const initialState: BoardState = {
  boards: [],
  cards: [],
  currentBoardId: null,
  searchTerm: '',
  priorityFilter: 'all',
};

type BoardAction =
  | { type: 'LOAD_STATE'; payload: BoardState }
  | { type: 'SET_CURRENT_BOARD'; payload: string }
  | { type: 'CREATE_BOARD'; payload: Board }
  | { type: 'DELETE_BOARD'; payload: string }
  | { type: 'RENAME_BOARD'; payload: { id: string; name: string } }
  | { type: 'ADD_CARD'; payload: Card }
  | { type: 'UPDATE_CARD'; payload: Card }
  | { type: 'DELETE_CARD'; payload: string }
  | { type: 'MOVE_CARD'; payload: { cardId: string; targetColumn: ColumnType } }
  | { type: 'SET_SEARCH_TERM'; payload: string }
  | { type: 'SET_PRIORITY_FILTER'; payload: Priority | 'all' }
  | { type: 'ADD_CHECKLIST_ITEM'; payload: { cardId: string; item: ChecklistItem } }
  | { type: 'TOGGLE_CHECKLIST_ITEM'; payload: { cardId: string; itemId: string } }
  | { type: 'REMOVE_CHECKLIST_ITEM'; payload: { cardId: string; itemId: string } };

function boardReducer(state: BoardState, action: BoardAction): BoardState {
  switch (action.type) {
    case 'LOAD_STATE':
      return action.payload;
    case 'SET_CURRENT_BOARD':
      return { ...state, currentBoardId: action.payload };
    case 'CREATE_BOARD':
      return { ...state, boards: [...state.boards, action.payload] };
    case 'DELETE_BOARD': {
      const deletedId = action.payload;
      const newBoards = state.boards.filter(b => b.id !== deletedId);
      const newCurrent = state.currentBoardId === deletedId ? (newBoards[0]?.id || null) : state.currentBoardId;
      const newCards = state.cards.filter(c => c.boardId !== deletedId);
      return { ...state, boards: newBoards, currentBoardId: newCurrent, cards: newCards };
    }
    case 'RENAME_BOARD':
      return {
        ...state,
        boards: state.boards.map(b => b.id === action.payload.id ? { ...b, name: action.payload.name } : b),
      };
    case 'ADD_CARD':
      return { ...state, cards: [...state.cards, action.payload] };
    case 'UPDATE_CARD':
      return {
        ...state,
        cards: state.cards.map(c => c.id === action.payload.id ? action.payload : c),
      };
    case 'DELETE_CARD':
      return { ...state, cards: state.cards.filter(c => c.id !== action.payload) };
    case 'MOVE_CARD':
      return {
        ...state,
        cards: state.cards.map(c =>
          c.id === action.payload.cardId ? { ...c, columnId: action.payload.targetColumn } : c
        ),
      };
    case 'SET_SEARCH_TERM':
      return { ...state, searchTerm: action.payload };
    case 'SET_PRIORITY_FILTER':
      return { ...state, priorityFilter: action.payload };
    case 'ADD_CHECKLIST_ITEM':
      return {
        ...state,
        cards: state.cards.map(c =>
          c.id === action.payload.cardId
            ? { ...c, checklist: [...c.checklist, action.payload.item] }
            : c
        ),
      };
    case 'TOGGLE_CHECKLIST_ITEM':
      return {
        ...state,
        cards: state.cards.map(c =>
          c.id === action.payload.cardId
            ? {
                ...c,
                checklist: c.checklist.map(item =>
                  item.id === action.payload.itemId ? { ...item, completed: !item.completed } : item
                ),
              }
            : c
        ),
      };
    case 'REMOVE_CHECKLIST_ITEM':
      return {
        ...state,
        cards: state.cards.map(c =>
          c.id === action.payload.cardId
            ? { ...c, checklist: c.checklist.filter(item => item.id !== action.payload.itemId) }
            : c
        ),
      };
    default:
      return state;
  }
}

interface BoardContextValue {
  state: BoardState;
  dispatch: React.Dispatch<BoardAction>;
  createBoard: (name: string) => void;
  deleteBoard: (id: string) => void;
  renameBoard: (id: string, name: string) => void;
  setCurrentBoard: (id: string) => void;
  addCard: (card: Omit<Card, 'id'>) => void;
  updateCard: (card: Card) => void;
  deleteCard: (cardId: string) => void;
  moveCard: (cardId: string, targetColumn: ColumnType) => void;
  setSearchTerm: (term: string) => void;
  setPriorityFilter: (priority: Priority | 'all') => void;
  addChecklistItem: (cardId: string, text: string) => void;
  toggleChecklistItem: (cardId: string, itemId: string) => void;
  removeChecklistItem: (cardId: string, itemId: string) => void;
}

const BoardContext = createContext<BoardContextValue | undefined>(undefined);
const STORAGE_KEY = 'kanban-board';

const generateId = (): string => Date.now().toString(36) + Math.random().toString(36).substring(2);

function createSeedData(): BoardState {
  const board1Id = 'board-1';
  const board2Id = 'board-2';
  const board1: Board = { id: board1Id, name: 'Project Alpha' };
  const board2: Board = { id: board2Id, name: 'Personal Tasks' };

  const cards: Card[] = [
    {
      id: generateId(),
      title: 'Design landing page',
      description: 'Create wireframes and mockups for the landing page.',
      priority: 'high',
      tagColor: 'blue',
      createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
      boardId: board1Id,
      columnId: 'todo',
      checklist: [
        { id: generateId(), text: 'Sketch layout', completed: true },
        { id: generateId(), text: 'Choose color palette', completed: false },
      ],
    },
    {
      id: generateId(),
      title: 'Implement authentication',
      description: 'Set up user auth with JWT.',
      priority: 'high',
      tagColor: 'red',
      createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
      boardId: board1Id,
      columnId: 'in-progress',
      checklist: [],
    },
    {
      id: generateId(),
      title: 'Write API docs',
      description: 'Document all endpoints.',
      priority: 'medium',
      tagColor: 'green',
      createdAt: new Date(Date.now() - 1 * 86400000).toISOString(),
      boardId: board1Id,
      columnId: 'done',
      checklist: [],
    },
    {
      id: generateId(),
      title: 'Buy groceries',
      description: 'Milk, eggs, bread, fruits.',
      priority: 'low',
      tagColor: 'yellow',
      createdAt: new Date().toISOString(),
      boardId: board2Id,
      columnId: 'todo',
      checklist: [
        { id: generateId(), text: 'Milk', completed: false },
        { id: generateId(), text: 'Eggs', completed: true },
      ],
    },
    {
      id: generateId(),
      title: 'Gym workout',
      description: 'Leg day.',
      priority: 'medium',
      tagColor: 'purple',
      createdAt: new Date().toISOString(),
      boardId: board2Id,
      columnId: 'in-progress',
      checklist: [],
    },
  ];

  return {
    boards: [board1, board2],
    cards,
    currentBoardId: board1Id,
    searchTerm: '',
    priorityFilter: 'all',
  };
}

const loadInitialState = (): BoardState => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed: BoardState = JSON.parse(stored);
      return {
        boards: parsed.boards || [],
        cards: parsed.cards || [],
        currentBoardId: parsed.currentBoardId || null,
        searchTerm: parsed.searchTerm || '',
        priorityFilter: parsed.priorityFilter || 'all',
      };
    }
  } catch (e) {
    console.error('Failed to load board state, using seed data', e);
  }
  return createSeedData();
};

export const BoardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(boardReducer, loadInitialState());

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const createBoard = useCallback((name: string) => {
    const newBoard: Board = { id: generateId(), name };
    dispatch({ type: 'CREATE_BOARD', payload: newBoard });
  }, []);

  const deleteBoard = useCallback((id: string) => {
    dispatch({ type: 'DELETE_BOARD', payload: id });
  }, []);

  const renameBoard = useCallback((id: string, name: string) => {
    dispatch({ type: 'RENAME_BOARD', payload: { id, name } });
  }, []);

  const setCurrentBoard = useCallback((id: string) => {
    dispatch({ type: 'SET_CURRENT_BOARD', payload: id });
  }, []);

  const addCard = useCallback((card: Omit<Card, 'id'>) => {
    const newCard: Card = { ...card, id: generateId() };
    dispatch({ type: 'ADD_CARD', payload: newCard });
  }, []);

  const updateCard = useCallback((card: Card) => {
    dispatch({ type: 'UPDATE_CARD', payload: card });
  }, []);

  const deleteCard = useCallback((cardId: string) => {
    dispatch({ type: 'DELETE_CARD', payload: cardId });
  }, []);

  const moveCard = useCallback((cardId: string, targetColumn: ColumnType) => {
    dispatch({ type: 'MOVE_CARD', payload: { cardId, targetColumn } });
  }, []);

  const setSearchTerm = useCallback((term: string) => {
    dispatch({ type: 'SET_SEARCH_TERM', payload: term });
  }, []);

  const setPriorityFilter = useCallback((priority: Priority | 'all') => {
    dispatch({ type: 'SET_PRIORITY_FILTER', payload: priority });
  }, []);

  const addChecklistItem = useCallback((cardId: string, text: string) => {
    const item: ChecklistItem = { id: generateId(), text, completed: false };
    dispatch({ type: 'ADD_CHECKLIST_ITEM', payload: { cardId, item } });
  }, []);

  const toggleChecklistItem = useCallback((cardId: string, itemId: string) => {
    dispatch({ type: 'TOGGLE_CHECKLIST_ITEM', payload: { cardId, itemId } });
  }, []);

  const removeChecklistItem = useCallback((cardId: string, itemId: string) => {
    dispatch({ type: 'REMOVE_CHECKLIST_ITEM', payload: { cardId, itemId } });
  }, []);

  const contextValue: BoardContextValue = {
    state,
    dispatch,
    createBoard,
    deleteBoard,
    renameBoard,
    setCurrentBoard,
    addCard,
    updateCard,
    deleteCard,
    moveCard,
    setSearchTerm,
    setPriorityFilter,
    addChecklistItem,
    toggleChecklistItem,
    removeChecklistItem,
  };

  return (
    <BoardContext.Provider value={contextValue}>
      {children}
    </BoardContext.Provider>
  );
};

export const useBoard = (): BoardContextValue => {
  const context = useContext(BoardContext);
  if (!context) throw new Error('useBoard must be used within BoardProvider');
  return context;
};