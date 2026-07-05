export type Priority = 'low' | 'medium' | 'high';
export type TagColor = 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'purple';

export interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

export interface Card {
  id: string;
  boardId: string;
  columnId: string;
  title: string;
  description: string;
  priority: Priority;
  tagColor: TagColor;
  createdAt: string;
  checklist: ChecklistItem[];
}

export interface Column {
  id: string;
  boardId: string;
  title: string;
  cardIds: string[];
}

export interface Board {
  id: string;
  name: string;
  columnIds: string[];
  createdAt: string;
}