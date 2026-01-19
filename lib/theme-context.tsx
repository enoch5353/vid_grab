'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export type Theme = 'light' | 'dark' | 'cool';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('vidgrab-theme') as Theme | null;
    if (savedTheme && ['light', 'dark', 'cool'].includes(savedTheme)) {
      setThemeState(savedTheme);
      applyTheme(savedTheme);
    } else {
      applyTheme('light');
    }
    setMounted(true);
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('vidgrab-theme', newTheme);
    applyTheme(newTheme);
  };

  const applyTheme = (t: Theme) => {
    const html = document.documentElement;
    html.classList.remove('light', 'dark', 'cool');
    
    if (t === 'dark') {
      html.classList.add('dark');
    } else if (t === 'cool') {
      html.classList.add('cool');
    } else {
      html.classList.add('light');
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
