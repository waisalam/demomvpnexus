// @ts-nocheck
import { useState } from 'react';
import Board from './components/Board';

function About() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">About This App</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Overview</h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          This is a kanban‑style project management application designed to help
          individuals and teams organise tasks visually through boards, columns,
          and cards. Drag‑and‑drop, real‑time updates, and flexible workflows
          make it easy to track progress from idea to completion.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Key Features</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
          <li>Create unlimited boards, columns, and cards</li>
          <li>Drag‑and‑drop cards between columns</li>
          <li>Assign priorities and due dates to cards</li>
          <li>Dark mode support for comfortable viewing</li>
          <li>Data persists across sessions using localStorage</li>
          <li>Keyboard accessible and screen‑reader friendly</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Technologies Used</h2>
        <p className="text-gray-700 dark:text-gray-300">
          Built with <strong>React 19</strong>, <strong>TypeScript</strong>,
          <strong> Tailwind CSS</strong>, and <strong>Zustand</strong> for state
          management. The UI is fully responsive and follows WCAG accessibility
          guidelines.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">How to Use</h2>
        <ol className="list-decimal pl-6 space-y-2 text-gray-700 dark:text-gray-300">
          <li>Click <strong>Create Board</strong> to start a new project.</li>
          <li>Add columns (e.g., To Do, In Progress, Done).</li>
          <li>Create cards with descriptions and priorities.</li>
          <li>Drag cards to update their status.</li>
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-3">Support</h2>
        <p className="text-gray-700 dark:text-gray-300">
          For issues or feature requests, please open a discussion on the
          project’s GitHub repository.
        </p>
      </section>
    </main>
  );
}

export default function App() {
  const [page, setPage] = useState<'home' | 'about'>('home');

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <nav className="flex items-center gap-6 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setPage('home')}
          className={`text-lg font-medium transition-colors duration-200 ${
            page === 'home'
              ? 'text-blue-600 dark:text-blue-400 underline underline-offset-4'
              : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'
          }`}
        >
          Home
        </button>
        <button
          onClick={() => setPage('about')}
          className={`text-lg font-medium transition-colors duration-200 ${
            page === 'about'
              ? 'text-blue-600 dark:text-blue-400 underline underline-offset-4'
              : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'
          }`}
        >
          About
        </button>
      </nav>

      {page === 'home' ? <Board /> : <About />}
    </div>
  );
}