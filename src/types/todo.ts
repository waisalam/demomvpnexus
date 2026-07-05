export interface Todo {
  id: string;
  title: string;
  done: boolean;
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
}

export type Filter = 'all' | 'active' | 'done';

export const SEED_TODOS: Todo[] = [
  {
    id: '1',
    title: 'Learn React',
    done: false,
    priority: 'high',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Build a todo app',
    done: false,
    priority: 'medium',
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Write tests',
    done: true,
    priority: 'low',
    createdAt: new Date().toISOString(),
  },
];