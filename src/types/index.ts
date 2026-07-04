export type Priority = 'low' | 'medium' | 'high';
export type TaskStatus = 'todo' | 'in-progress' | 'done';

export interface Subtask {
  id: string;
  text: string;
  completed: boolean;
}

export interface Card {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  tag: string;
  tagColor: string;
  createdDate: string;
  status: TaskStatus;
  subtasks: Subtask[];
}

export interface Column {
  id: string;
  title: string;
  cards: Card[];
}

export interface Board {
  id: string;
  title: string;
  columns: Column[];
}

export interface DashboardStats {
  totalCards: number;
  cardsByColumn: Record<TaskStatus, number>;
  priorityBreakdown: Record<Priority, number>;
}