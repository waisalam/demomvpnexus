import { Board } from '../types';

export const seedData: Board[] = [
  {
    id: 'bd-001',
    title: 'Project Chimera',
    columns: [
      {
        id: 'col-backlog-1',
        title: 'Backlog',
        cards: [
          {
            id: 'card-100',
            title: 'Set up CI/CD pipeline',
            description: 'Configure GitHub Actions for linting, testing, and deployment to staging.',
            priority: 'high',
            tags: ['devops', 'automation'],
            dueDate: '2025-04-20T00:00:00.000Z',
          },
          {
            id: 'card-101',
            title: 'Research payment gateway APIs',
            description: 'Compare Stripe, Braintree, and Adyen for our use case.',
            priority: 'medium',
            tags: ['research', 'billing'],
            dueDate: '2025-04-18T00:00:00.000Z',
          },
          {
            id: 'card-102',
            title: 'Define error handling strategy',
            description: 'Create a consistent approach for frontend and backend error logging.',
            priority: 'low',
            tags: ['architecture'],
            dueDate: '2025-05-01T00:00:00.000Z',
          },
        ],
      },
      {
        id: 'col-todo-1',
        title: 'To Do',
        cards: [
          {
            id: 'card-200',
            title: 'Build auth module',
            description: 'Implement login, registration, and token refresh flows.',
            priority: 'critical',
            tags: ['security', 'feature'],
            dueDate: '2025-04-14T00:00:00.000Z',
          },
          {
            id: 'card-201',
            title: 'Design database schema',
            description: 'Finalize tables for users, projects, and tasks.',
            priority: 'high',
            tags: ['database'],
            dueDate: '2025-04-12T00:00:00.000Z',
          },
        ],
      },
      {
        id: 'col-progress-1',
        title: 'In Progress',
        cards: [
          {
            id: 'card-300',
            title: 'Refactor user service',
            description: 'Split monolithic service into smaller, testable modules.',
            priority: 'high',
            tags: ['refactor', 'backend'],
            dueDate: '2025-04-16T00:00:00.000Z',
          },
        ],
      },
      {
        id: 'col-review-1',
        title: 'Review',
        cards: [
          {
            id: 'card-400',
            title: 'Add input validation',
            description: 'Implement Zod schemas for all API endpoints.',
            priority: 'medium',
            tags: ['validation', 'feature'],
            dueDate: '2025-04-15T00:00:00.000Z',
          },
          {
            id: 'card-401',
            title: 'Update landing page copy',
            description: 'Refresh hero text and value propositions based on latest user feedback.',
            priority: 'low',
            tags: ['content', 'design'],
            dueDate: '2025-04-13T00:00:00.000Z',
          },
        ],
      },
      {
        id: 'col-done-1',
        title: 'Done',
        cards: [
          {
            id: 'card-500',
            title: 'Project scaffolding',
            description: 'Initial Vite + React + TypeScript setup.',
            priority: 'high',
            tags: ['setup'],
            dueDate: '2025-04-05T00:00:00.000Z',
          },
          {
            id: 'card-501',
            title: 'Set up linting and formatting',
            description: 'Configure ESLint and Prettier with shared presets.',
            priority: 'medium',
            tags: ['tooling'],
            dueDate: '2025-04-06T00:00:00.000Z',
          },
        ],
      },
    ],
  },
  {
    id: 'bd-002',
    title: 'Marketing Q2 Campaign',
    columns: [
      {
        id: 'col-ideas-2',
        title: 'Ideas',
        cards: [
          {
            id: 'card-600',
            title: 'Webinar series on industry trends',
            description: 'Host monthly webinars with guest experts to drive lead generation.',
            priority: 'medium',
            tags: ['content', 'leadgen'],
            dueDate: '2025-05-10T00:00:00.000Z',
          },
          {
            id: 'card-601',
            title: 'Influencer outreach program',
            description: 'Identify and contact 20 micro‑influencers in our niche.',
            priority: 'low',
            tags: ['outreach'],
            dueDate: '2025-05-20T00:00:00.000Z',
          },
        ],
      },
      {
        id: 'col-planned-2',
        title: 'Planned',
        cards: [
          {
            id: 'card-700',
            title: 'Draft email nurture sequence',
            description: 'Write 5‑part welcome sequence for new trial users.',
            priority: 'high',
            tags: ['email', 'content'],
            dueDate: '2025-04-25T00:00:00.000Z',
          },
          {
            id: 'card-701',
            title: 'Update pricing page',
            description: 'Add annual billing toggle and enterprise contact form.',
            priority: 'high',
            tags: ['web', 'conversion'],
            dueDate: '2025-04-22T00:00:00.000Z',
          },
        ],
      },
      {
        id: 'col-execution-2',
        title: 'In Execution',
        cards: [
          {
            id: 'card-800',
            title: 'Launch retargeting ads',
            description: 'Set up Facebook and Google retargeting for abandoned carts.',
            priority: 'critical',
            tags: ['ads', 'cvr'],
            dueDate: '2025-04-17T00:00:00.000Z',
          },
        ],
      },
      {
        id: 'col-hold-2',
        title: 'On Hold',
        cards: [
          {
            id: 'card-900',
            title: 'Case study with client X',
            description: 'Awaiting client approval on final draft.',
            priority: 'medium',
            tags: ['social proof'],
            dueDate: '2025-04-30T00:00:00.000Z',
          },
        ],
      },
    ],
  },
  {
    id: 'bd-003',
    title: 'Internal Tooling',
    columns: [
      {
        id: 'col-requests-3',
        title: 'Requests',
        cards: [
          {
            id: 'card-1000',
            title: 'Employee onboarding checklist',
            description: 'Digital checklist for HR to track new hire tasks.',
            priority: 'high',
            tags: ['hr', 'feature'],
            dueDate: '2025-05-05T00:00:00.000Z',
          },
          {
            id: 'card-1001',
            title: 'Automated expense reporting',
            description: 'Integrate with accounting API to eliminate manual entry.',
            priority: 'medium',
            tags: ['finance', 'automation'],
            dueDate: '2025-05-15T00:00:00.000Z',
          },
        ],
      },
      {
        id: 'col-building-3',
        title: 'Building',
        cards: [
          {
            id: 'card-1100',
            title: 'Slack bot for standups',
            description: 'Daily reminder and summary collector for remote teams.',
            priority: 'high',
            tags: ['integration', 'communication'],
            dueDate: '2025-04-28T00:00:00.000Z',
          },
        ],
      },
      {
        id: 'col-testing-3',
        title: 'Testing',
        cards: [
          {
            id: 'card-1200',
            title: 'Dark mode for admin panel',
            description: 'Ensure components work with theme toggle.',
            priority: 'low',
            tags: ['ui', 'accessibility'],
            dueDate: '2025-04-27T00:00:00.000Z',
          },
        ],
      },
      {
        id: 'col-shipped-3',
        title: 'Shipped',
        cards: [
          {
            id: 'card-1300',
            title: 'Centralized logging dashboard',
            description: 'Real‑time log viewer for all services.',
            priority: 'critical',
            tags: ['observability'],
            dueDate: '2025-04-10T00:00:00.000Z',
          },
        ],
      },
    ],
  },
];