import React from 'react';
import Sidebar from '../components/Sidebar';
import ThemeToggle from '../components/ThemeToggle';

export default function AppLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <div className="flex h-screen">
      {/* Sidebar – hidden on small screens, fixed width on medium+ */}
      <div className="hidden md:block w-64">
        <Sidebar />
      </div>

      {/* Main content column */}
      <div className="flex flex-col flex-1">
        <header className="flex justify-end p-2">
          <ThemeToggle />
        </header>
        <main className="flex-1 p-4 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}