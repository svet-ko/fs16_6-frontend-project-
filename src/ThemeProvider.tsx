import React, { createContext, useContext, useState, ReactNode } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material';

type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
  themeMode: ThemeMode;
  toggleDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

function toggleTheme(themeMode: ThemeMode): ThemeMode {
  return themeMode === 'light' ? 'dark' : 'light';
}

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps): JSX.Element {
  const [themeMode, setThemeMode] = useState<ThemeMode>('light');

  const lightTheme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#f06292',
        light: '#f8bbd0',
        contrastText: '#fce4ec',
      },
      secondary: {
        main: '#c2185b',
        light: '#f8bbd0',
      },
      background: {
        default: '#f5f5f5',
      },
    },
  });

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#0d47a1',
      },
    },
  });

  const toggleDarkMode = () => {
    setThemeMode(toggleTheme(themeMode));
  };

  return (
    <ThemeContext.Provider value={{ themeMode, toggleDarkMode }}>
      <MuiThemeProvider theme={themeMode === 'light' ? lightTheme : darkTheme}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}