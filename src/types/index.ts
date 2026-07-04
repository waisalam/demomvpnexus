export type Priority = 'low' | 'medium' | 'high';

export interface Tag {
  id: string;
  name: string;
  color: string;
}

export interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

export interface Card {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  tag: Tag;
  createdAt: string;
  checklist: ChecklistItem[];
}

export interface Column {
  id: string;
  name: string;
  cardIds: string[];
}

export interface Board {
  id: string;
  name: string;
  columns: Column[];
  cardById: Record<string, Card>;
}

export interface KanbanStoreState {
  boards: Board[];
  activeBoardId: string | null;
  searchQuery: string;
  priorityFilter: Priority | 'all';
}

export interface KanbanStoreActions {
  addBoard: (name: string) => void;
  renameBoard: (boardId: string, newName: string) => void;
  deleteBoard: (boardId: string) => void;
  setActiveBoard: (boardId: string) => void;
  addCard: (boardId: string, columnId: string, card: Omit<Card, 'id' | 'createdAt' | 'checklist'>) => void;
  editCard: (cardId: string, updates: Partial<Omit<Card, 'id'>>) => void;
  deleteCard: (boardId: string, cardId: string) => void;
  moveCard: (boardId: string, cardId: string, fromColumnId: string, toColumnId: string) => void;
  addChecklistItem: (cardId: string, text: string) => void;
  toggleChecklistItem: (cardId: string, itemId: string) => void;
  removeChecklistItem: (cardId: string, itemId: string) => void;
  setSearchQuery: (query: string) => void;
  setPriorityFilter: (filter: Priority | 'all') => void;
}