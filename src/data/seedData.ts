import type { Board } from '../types';

const seedBoards: Board[] = [
  {
    id: 'board-1',
    title: 'Project Alpha',
    columns: [
      {
        id: 'col-1',
        title: 'To Do',
        cards: [
          {
            id: 'card-1',
            title: 'Research competitors',
            description: 'Analyse top 5 competitors in the market. Focus on pricing, features, and user reviews.',
            priority: 'high',
            tagColor: '#D32F2F',
            checklist: [
              { id: 'check-1', text: 'Create spreadsheet template', completed: true },
              { id: 'check-2', text: 'Collect pricing data', completed: false },
              { id: 'check-3', text: 'Write summary report', completed: false },
            ],
            createdAt: '2025-01-15T08:00:00.000Z',
          },
          {
            id: 'card-2',
            title: 'Draft project charter',
            description: 'Outline objectives, scope, stakeholders, and high-level milestones.',
            priority: 'medium',
            tagColor: '#1976D2',
            checklist: [
              { id: 'check-4', text: 'Define project goals', completed: true },
              { id: 'check-5', text: 'Identify key stakeholders', completed: false },
            ],
            createdAt: '2025-01-10T09:30:00.000Z',
          },
          {
            id: 'card-3',
            title: 'Set up CI/CD pipeline',
            description: 'Configure GitHub Actions for automated testing and deployment.',
            priority: 'low',
            tagColor: '#388E3C',
            checklist: [],
            createdAt: '2025-01-12T11:00:00.000Z',
          },
        ],
      },
      {
        id: 'col-2',
        title: 'In Progress',
        cards: [
          {
            id: 'card-4',
            title: 'Design landing page',
            description: 'Create wireframes and high-fidelity mockups for the new landing page.',
            priority: 'high',
            tagColor: '#F57C00',
            checklist: [
              { id: 'check-6', text: 'Wireframe layout', completed: true },
              { id: 'check-7', text: 'Design hero section', completed: true },
              { id: 'check-8', text: 'Add responsive breakpoints', completed: false },
            ],
            createdAt: '2025-01-08T14:20:00.000Z',
          },
          {
            id: 'card-5',
            title: 'Implement user auth',
            description: 'Add JWT-based authentication with login, registration, and password reset.',
            priority: 'medium',
            tagColor: '#6A1B9A',
            checklist: [
              { id: 'check-9', text: 'Set up database schema', completed: true },
              { id: 'check-10', text: 'Build registration endpoint', completed: true },
              { id: 'check-11', text: 'Build login endpoint', completed: false },
              { id: 'check-12', text: 'Add password reset flow', completed: false },
            ],
            createdAt: '2025-01-11T10:00:00.000Z',
          },
        ],
      },
      {
        id: 'col-3',
        title: 'Done',
        cards: [
          {
            id: 'card-6',
            title: 'Project kickoff meeting',
            description: 'Hold the initial meeting with the whole team to align on goals and timelines.',
            priority: 'high',
            tagColor: '#D32F2F',
            checklist: [
              { id: 'check-13', text: 'Prepare agenda', completed: true },
              { id: 'check-14', text: 'Send calendar invites', completed: true },
              { id: 'check-15', text: 'Conduct meeting', completed: true },
            ],
            createdAt: '2025-01-05T07:00:00.000Z',
          },
          {
            id: 'card-7',
            title: 'Set up repository',
            description: 'Initialize the GitHub repo with a basic structure and README.',
            priority: 'low',
            tagColor: '#388E3C',
            checklist: [
              { id: 'check-16', text: 'Create repo', completed: true },
              { id: 'check-17', text: 'Add .gitignore', completed: true },
            ],
            createdAt: '2025-01-03T09:00:00.000Z',
          },
        ],
      },
    ],
  },
  {
    id: 'board-2',
    title: 'Personal Development',
    columns: [
      {
        id: 'col-4',
        title: 'To Do',
        cards: [
          {
            id: 'card-8',
            title: 'Read "Clean Code"',
            description: 'Finish reading Robert C. Martin’s book and take notes on key principles.',
            priority: 'medium',
            tagColor: '#1976D2',
            checklist: [
              { id: 'check-18', text: 'Chapters 1-4', completed: false },
              { id: 'check-19', text: 'Chapters 5-8', completed: false },
              { id: 'check-20', text: 'Write summary', completed: false },
            ],
            createdAt: '2025-01-20T13:00:00.000Z',
          },
          {
            id: 'card-9',
            title: 'Complete TypeScript course',
            description: 'Finish the advanced TypeScript module on Udemy.',
            priority: 'high',
            tagColor: '#D32F2F',
            checklist: [
              { id: 'check-21', text: 'Generics section', completed: false },
              { id: 'check-22', text: 'Decorators section', completed: false },
            ],
            createdAt: '2025-02-01T10:00:00.000Z',
          },
        ],
      },
      {
        id: 'col-5',
        title: 'In Progress',
        cards: [
          {
            id: 'card-10',
            title: 'Learn Docker',
            description: 'Get comfortable with containerizing applications and using Docker Compose.',
            priority: 'high',
            tagColor: '#F57C00',
            checklist: [
              { id: 'check-23', text: 'Complete beginner tutorial', completed: true },
              { id: 'check-24', text: 'Create Dockerfile for Node app', completed: true },
              { id: 'check-25', text: 'Set up multi-container app', completed: false },
            ],
            createdAt: '2025-01-25T08:30:00.000Z',
          },
        ],
      },
      {
        id: 'col-6',
        title: 'Done',
        cards: [
          {
            id: 'card-11',
            title: 'Setup home office',
            description: 'Organise desk, buy a new monitor, and set up proper lighting.',
            priority: 'low',
            tagColor: '#388E3C',
            checklist: [
              { id: 'check-26', text: 'Assemble desk', completed: true },
              { id: 'check-27', text: 'Install monitor arm', completed: true },
              { id: 'check-28', text: 'Cable management', completed: true },
            ],
            createdAt: '2024-12-20T15:00:00.000Z',
          },
          {
            id: 'card-12',
            title: 'Finish "Atomic Habits"',
            description: 'Apply the 4 laws of behaviour change in daily routines.',
            priority: 'medium',
            tagColor: '#1976D2',
            checklist: [
              { id: 'check-29', text: 'Read all chapters', completed: true },
              { id: 'check-30', text: 'Create habit tracker', completed: true },
            ],
            createdAt: '2025-01-02T16:00:00.000Z',
          },
        ],
      },
    ],
  },
];

export default seedBoards;