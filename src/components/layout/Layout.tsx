import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import ThemeToggle from './ThemeToggle';

export default function Layout(): JSX.Element {
  return (
    <div className="h-screen flex">
      <Sidebar />
      <main className="flex-1 overflow-auto bg-white dark:bg-gray-800">
        <Outlet />
      </main>
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>
    </div>
  );
}