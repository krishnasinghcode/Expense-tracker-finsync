import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext({
  theme: 'light',       // default theme
  setTheme: () => {},   // placeholder function
});

export const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState('light');

  // Apply theme classes to document root
  useEffect(() => {
    document.documentElement.classList.remove('theme-dark', 'theme-sunset', 'theme-forest');
    if (theme !== 'light') {
      document.documentElement.classList.add(`theme-${theme}`);
    }
  }, [theme]);

  // Controlled setter to update theme state
  const setTheme = (newTheme) => {
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
