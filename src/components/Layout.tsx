import React from 'react';
import Sidebar from './Sidebar';
import { useTheme } from '../context/ThemeContext';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps): JSX.Element {
  const { theme } = useTheme();

  return (
    <div data-theme={theme}>
      <Sidebar />
      <main>{children}</main>
    </div>
  );
}