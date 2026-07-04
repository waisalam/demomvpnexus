import { Board } from '../types';

const seedBoards: Board[] = [
  {
    id: 'board-1',
    title: 'Sprint Board',
    columns: [
      {
        id: 'col-1',
        title: 'To Do',
        cards: [
          {
            id: 'card-1',
            title: 'Set up CI/CD pipeline',
            description: 'Configure the continuous integration and deployment workflow using GitHub Actions.',
            priority: 'high',
            tag: 'DevOps',
            tagColor: '#FF4500',
            createdDate: '2025-04-01',
            status: 'todo',
            subtasks: [
              { id: 'sub-1', text: 'Configure Docker', completed: false },
              { id: 'sub-2', text: 'Write deployment script', completed: false },
              { id: 'sub-3', text: 'Set up staging environment', completed: false },
            ],
          },
          {
            id: 'card-2',
            title: 'Design landing page mockup',
            description: 'Create high-fidelity wireframes for the new landing page.',
            priority: 'medium',
            tag: 'Design',
            tagColor: '#9370DB',
            createdDate: '2025-04-03',
            status: 'todo',
            subtasks: [
              { id: 'sub-4', text: 'Research competitor layouts', completed: false },
              { id: 'sub-5', text: 'Draft color palette', completed: false },
            ],
          },
        ],
      },
      {
        id: 'col-2',
        title: 'In Progress',
        cards: [
          {
            id: 'card-3',
            title: 'Implement user authentication',
            description: 'Add login, registration, and OAuth integration.',
            priority: 'high',
            tag: 'Backend',
            tagColor: '#1E90FF',
            createdDate: '2025-03-28',
            status: 'in-progress',
            subtasks: [
              { id: 'sub-6', text: 'Set up database schema', completed: true },
              { id: 'sub-7', text: 'Create API endpoints', completed: false },
              { id: 'sub-8', text: 'Write unit tests', completed: false },
            ],
          },
          {
            id: 'card-4',
            title: 'Refactor dashboard components',
            description: 'Break down monolithic components into smaller, reusable pieces.',
            priority: 'low',
            tag: 'Frontend',
            tagColor: '#32CD32',
            createdDate: '2025-04-02',
            status: 'in-progress',
            subtasks: [],
          },
        ],
      },
      {
        id: 'col-3',
        title: 'Done',
        cards: [
          {
            id: 'card-5',
            title: 'Fix navigation bug on mobile',
            description: 'Resolved the issue where the hamburger menu did not close on tap outside.',
            priority: 'medium',
            tag: 'Bug',
            tagColor: '#DC143C',
            createdDate: '2025-03-25',
            status: 'done',
            subtasks: [
              { id: 'sub-9', text: 'Reproduce the bug', completed: true },
              { id: 'sub-10', text: 'Apply fix and test', completed: true },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'board-2',
    title: 'Personal Tasks',
    columns: [
      {
        id: 'col-4',
        title: 'To Do',
        cards: [
          {
            id: 'card-6',
            title: 'Read "Atomic Habits"',
            description: 'Finish the remaining chapters and write a summary.',
            priority: 'low',
            tag: 'Reading',
            tagColor: '#FFD700',
            createdDate: '2025-04-05',
            status: 'todo',
            subtasks: [
              { id: 'sub-11', text: 'Chapters 1-5', completed: false },
              { id: 'sub-12', text: 'Chapters 6-10', completed: false },
            ],
          },
          {
            id: 'card-7',
            title: 'Plan weekend trip',
            description: 'Research destinations, book accommodation, and create itinerary.',
            priority: 'medium',
            tag: 'Personal',
            tagColor: '#FF69B4',
            createdDate: '2025-04-04',
            status: 'todo',
            subtasks: [],
          },
        ],
      },
      {
        id: 'col-5',
        title: 'In Progress',
        cards: [
          {
            id: 'card-8',
            title: 'Organize photo library',
            description: 'Sort and tag thousands of photos from last year.',
            priority: 'low',
            tag: 'Organization',
            tagColor: '#20B2AA',
            createdDate: '2025-03-30',
            status: 'in-progress',
            subtasks: [
              { id: 'sub-13', text: 'Backup to cloud', completed: true },
              { id: 'sub-14', text: 'Remove duplicates', completed: false },
            ],
          },
        ],
      },
      {
        id: 'col-6',
        title: 'Done',
        cards: [
          {
            id: 'card-9',
            title: 'Renew gym membership',
            description: 'Completed online renewal for the next 6 months.',
            priority: 'high',
            tag: 'Health',
            tagColor: '#8A2BE2',
            createdDate: '2025-03-20',
            status: 'done',
            subtasks: [],
          },
        ],
      },
    ],
  },
];

export default seedBoards;