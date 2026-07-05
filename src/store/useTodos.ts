import { useReducer, useEffect, useCallback } from 'react';
import { Todo } from '../types/todo';

export interface UseTodosReturn {
  todos: Todo[];
  addTodo: (title: string, priority: Todo['priority']) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  updateTodo: (id: string, title: string) => void;
}

type Action =
  | { type: 'ADD_TODO'; payload: { title: string; priority: Todo['priority'] } }
  | { type: 'TOGGLE_TODO'; payload: { id: string } }
  | { type: 'DELETE_TODO'; payload: { id: string } }
  | { type: 'UPDATE_TODO'; payload: { id: string; title: string } };

function todosReducer(state: Todo[], action: Action): Todo[] {
  switch (action.type) {
    case 'ADD_TODO': {
      const newTodo: Todo = {
        id: crypto.randomUUID(),
        title: action.payload.title,
        priority: action.payload.priority,
        done: false,
        createdAt: new Date().toISOString(),
      };
      return [...state, newTodo];
    }
    case 'TOGGLE_TODO': {
      return state.map((todo: Todo) =>
        todo.id === action.payload.id ? { ...todo, done: !todo.done } : todo,
      );
    }
    case 'DELETE_TODO': {
      return state.filter((todo: Todo) => todo.id !== action.payload.id);
    }
    case 'UPDATE_TODO': {
      return state.map((todo: Todo) =>
        todo.id === action.payload.id ? { ...todo, title: action.payload.title } : todo,
      );
    }
    default:
      return state;
  }
}

function getSeedTodos(): Todo[] {
  return [
    {
      id: crypto.randomUUID(),
      title: 'Learn React',
      priority: 'high',
      done: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: crypto.randomUUID(),
      title: 'Build a project',
      priority: 'medium',
      done: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: crypto.randomUUID(),
      title: 'Celebrate',
      priority: 'low',
      done: false,
      createdAt: new Date().toISOString(),
    },
  ];
}

function isTodo(obj: any): obj is Todo {
  return (
    obj &&
    typeof obj === 'object' &&
    'id' in obj &&
    'title' in obj &&
    'priority' in obj &&
    'done' in obj &&
    'createdAt' in obj
  );
}

function normalizeTodo(obj: any): Todo {
  return {
    id: obj.id || crypto.randomUUID(),
    title: obj.title || '',
    priority: obj.priority || 'medium',
    done: !!obj.done,
    createdAt: obj.createdAt || new Date().toISOString(),
  };
}

function loadInitialState(): Todo[] {
  try {
    const stored = localStorage.getItem('todos');
    if (stored) {
      const parsed: unknown = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        // Keep only items that pass validation, normalizing their shape
        return parsed.filter(isTodo).map(normalizeTodo);
      }
    }
  } catch {
    // localStorage not available or data corrupted – fallback to seed
  }
  return getSeedTodos();
}

export function useTodos(): UseTodosReturn {
  const [todos, dispatch] = useReducer(todosReducer, undefined, () => loadInitialState());

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = useCallback((title: string, priority: Todo['priority']) => {
    dispatch({ type: 'ADD_TODO', payload: { title, priority } });
  }, []);

  const toggleTodo = useCallback((id: string) => {
    dispatch({ type: 'TOGGLE_TODO', payload: { id } });
  }, []);

  const deleteTodo = useCallback((id: string) => {
    dispatch({ type: 'DELETE_TODO', payload: { id } });
  }, []);

  const updateTodo = useCallback((id: string, title: string) => {
    dispatch({ type: 'UPDATE_TODO', payload: { id, title } });
  }, []);

  return {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    updateTodo,
  };
}