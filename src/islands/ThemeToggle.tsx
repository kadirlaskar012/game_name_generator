import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

export const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const isDark = document.documentElement.classList.contains('dark');
    setTheme(isDark ? 'dark' : 'light');

    const handleThemeEvent = (e: any) => {
      if (e.detail?.theme) {
        setTheme(e.detail.theme);
      }
    };
    window.addEventListener('theme-change', handleThemeEvent);
    return () => window.removeEventListener('theme-change', handleThemeEvent);
  }, []);

  const toggleTheme = () => {
    const isCurrentlyDark = document.documentElement.classList.contains('dark');
    const nextTheme = isCurrentlyDark ? 'light' : 'dark';

    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }

    try {
      localStorage.setItem('theme', nextTheme);
    } catch {}

    setTheme(nextTheme);
    window.dispatchEvent(new CustomEvent('theme-change', { detail: { theme: nextTheme } }));
  };

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-surface-dark" />
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
      title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
      className="p-2 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-surface-dark text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:border-neutral-300 dark:hover:border-neutral-700 shadow-sm transition"
    >
      {theme === 'dark' ? (
        <Sun className="w-4 h-4 text-amber-400" />
      ) : (
        <Moon className="w-4 h-4 text-sky-600" />
      )}
    </button>
  );
};
