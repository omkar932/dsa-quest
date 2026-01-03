import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme as useSystemColorScheme } from 'react-native';

type ColorScheme = 'light' | 'dark';

export type ThemeContextType = {
  colorScheme: ColorScheme;
  setColorScheme: (scheme: ColorScheme) => void;
};

const THEME_STORAGE_KEY = 'dsa_quest_color_scheme';

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemColorScheme = useSystemColorScheme();
  const [colorScheme, setInternalColorScheme] = useState<ColorScheme>(systemColorScheme || 'dark');

  useEffect(() => {
    // Load saved theme on mount
    const loadTheme = async () => {
      try {
        const savedScheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (savedScheme === 'light' || savedScheme === 'dark') {
          setInternalColorScheme(savedScheme);
        } else {
          // If no saved scheme, use system preference
          setInternalColorScheme(systemColorScheme || 'dark');
        }
      } catch (e) {
        console.error('Failed to load theme from storage', e);
        setInternalColorScheme(systemColorScheme || 'dark'); // Fallback to system or default
      }
    };
    loadTheme();
  }, [systemColorScheme]);

  const setColorScheme = async (scheme: ColorScheme) => {
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, scheme);
      setInternalColorScheme(scheme);
    } catch (e) {
      console.error('Failed to save theme to storage', e);
    }
  };

  const value: ThemeContextType = {
    colorScheme,
    setColorScheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};
