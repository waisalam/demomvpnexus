import { Board } from '@/types';

export const seedBoards: Board[] = [
  {
    id: 'board-1',
    name: 'Project Alpha',
    columns: [
      { id: 'col-todo', name: 'To Do', cardIds: ['card-1', 'card-2', 'card-3'] },
      { id: 'col-in-progress', name: 'In Progress', cardIds: ['card-4', 'card-5'] },
      { id: 'col-done', name: 'Done', cardIds: ['card-6', 'card-7'] },
    ],
    cardById: {
      'card-1': {
        id: 'card-1',
        title: 'Design new dashboard layout',
        description:
          'Create wireframes and high-fidelity mockups for the analytics dashboard.',
        priority: 'high',
        tag: { id: 'tag-feature', name: 'feature', color: '#4A90D9' },
        createdAt: '2025-04-10T08:00:00.000Z',
        checklist: [
          { id: 'ci-1', text: 'Sketch wireframes', completed: true },
          { id: 'ci-2', text: 'Review with stakeholders', completed: false },
          { id: 'ci-3', text: 'Finalize color palette', completed: false },
        ],
      },
      'card-2': {
        id: 'card-2',
        title: 'Fix login redirect bug',
        description:
          'Users are not redirected to the dashboard after logging in via SSO.',
        priority: 'high',
        tag: { id: 'tag-bug', name: 'bug', color: '#D94A4A' },
        createdAt: '2025-04-11T09:15:00.000Z',
        checklist: [],
      },
      'card-3': {
        id: 'card-3',
        title: 'Update API documentation',
        description: 'Document the new endpoints for user management module.',
        priority: 'medium',
        tag: { id: 'tag-docs', name: 'docs', color: '#8E44AD' },
        createdAt: '2025-04-09T14:20:00.000Z',
        checklist: [
          { id: 'ci-4', text: 'Document GET /users', completed: true },
          { id: 'ci-5', text: 'Document POST /users', completed: false },
        ],
      },
      'card-4': {
        id: 'card-4',
        title: 'Implement two-factor authentication',
        description: 'Add TOTP support using authenticator apps.',
        priority: 'high',
        tag: { id: 'tag-feature', name: 'feature', color: '#4A90D9' },
        createdAt: '2025-04-08T11:00:00.000Z',
        checklist: [
          { id: 'ci-6', text: 'Backend endpoint for enabling 2FA', completed: true },
          { id: 'ci-7', text: 'Frontend UI for setup', completed: true },
          { id: 'ci-8', text: 'Recovery code generation', completed: false },
          { id: 'ci-9', text: 'Send confirmation email', completed: false },
        ],
      },
      'card-5': {
        id: 'card-5',
        title: 'Refactor notification service',
        description:
          'Improve performance and add support for push notifications.',
        priority: 'low',
        tag: { id: 'tag-improvement', name: 'improvement', color: '#27AE60' },
        createdAt: '2025-04-12T07:45:00.000Z',
        checklist: [],
      },
      'card-6': {
        id: 'card-6',
        title: 'Set up CI/CD pipeline',
        description:
          'Configure GitHub Actions for automated testing and deployment.',
        priority: 'high',
        tag: { id: 'tag-feature', name: 'feature', color: '#4A90D9' },
        createdAt: '2025-04-06T16:00:00.000Z',
        checklist: [
          { id: 'ci-10', text: 'Create workflow YAML', completed: true },
          { id: 'ci-11', text: 'Add secrets to repository', completed: true },
          { id: 'ci-12', text: 'Test deployment to staging', completed: true },
        ],
      },
      'card-7': {
        id: 'card-7',
        title: 'Write onboarding guide',
        description: 'Create a step-by-step guide for new team members.',
        priority: 'medium',
        tag: { id: 'tag-docs', name: 'docs', color: '#8E44AD' },
        createdAt: '2025-04-07T10:10:00.000Z',
        checklist: [],
      },
    },
  },
];