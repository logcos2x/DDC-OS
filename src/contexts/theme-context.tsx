import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemeMode = 'light' | 'dark';
export type VisualStyle = 'glass' | 'solid';

interface ThemeSettings {
  mode: ThemeMode;
  style: VisualStyle;
  blurStrength: number;
  borderRadius: number;
  textSize: number;
  transparency: number;
}

interface ThemeContextType {
  theme: ThemeSettings;
  updateTheme: (settings: Partial<ThemeSettings>) => void;
  resetTheme: () => void;
}

const defaultTheme: ThemeSettings = {
  mode: 'dark',
  style: 'glass',
  blurStrength: 12,
  borderRadius: 12,
  textSize: 1,
  transparency: 0.05,
};

const ThemeContext = createContext<ThemeContextType>({
  theme: defaultTheme,
  updateTheme: () => {},
  resetTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeSettings>(defaultTheme);

  // Load theme from localStorage on initial mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('dashy-theme');
    if (savedTheme) {
      try {
        setTheme(JSON.parse(savedTheme));
      } catch (error) {
        console.error('Failed to parse saved theme', error);
      }
    }
  }, []);

  // Apply CSS variables when theme changes
  useEffect(() => {
    const root = document.documentElement;
    
    // Apply theme mode - add appropriate class and remove the other
    if (theme.mode === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    
    // Set CSS variables
    root.style.setProperty('--blur-strength', `${theme.blurStrength}px`);
    root.style.setProperty('--border-radius', `${theme.borderRadius}px`);
    root.style.setProperty('--text-size', theme.textSize.toString());
    root.style.setProperty('--glass-transparency', theme.transparency.toString());
    
    // Set solid background color based on theme mode
    if (theme.mode === 'dark') {
      root.style.setProperty('--solid-bg-color', '15, 15, 30');
      root.style.setProperty('--solid-bg-opacity', '0.85');
    } else {
      root.style.setProperty('--solid-bg-color', '240, 240, 245');
      root.style.setProperty('--solid-bg-opacity', '0.85');
    }
    
    // Save to localStorage
    localStorage.setItem('dashy-theme', JSON.stringify(theme));
  }, [theme]);

  const updateTheme = (settings: Partial<ThemeSettings>) => {
    setTheme(prev => ({ ...prev, ...settings }));
  };

  const resetTheme = () => {
    setTheme(defaultTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, updateTheme, resetTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
