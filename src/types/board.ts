// src/types/board.ts
export type Priority = 'low' | 'medium' | 'high';
export type TagColor = 'red' | 'blue' | 'green' | 'yellow' | 'purple' | 'orange';
export type ColumnType = 'todo' | 'in-progress' | 'done';

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
  tagColor: TagColor;
  createdAt: string;
  boardId: string;
  columnId: ColumnType;
  checklist: ChecklistItem[];
}

export interface Board {
  id: string;
  name: string;
}