import React, { useState, useEffect } from 'react';

export default function ThemeToggle(): JSX.Element {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const saved = localStorage.getItem('theme');
    if (saved) {
      return saved === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggle = () => setIsDark((prev) => !prev);

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={isDark}
      style={{
        cursor: 'pointer',
        border: 'none',
        background: 'none',
        fontSize: '1.5rem',
        padding: '0.5rem',
        lineHeight: 1,
        borderRadius: '0.25rem',
        transition: 'background 0.2s',
      }}
    >
      {isDark ? '☀️' : '🌙'}
    </button>
  );
}