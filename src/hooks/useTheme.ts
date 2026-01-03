import { useMemo } from "react";
import { createTheme, Theme } from "../theme";
import { useThemeContext } from "../context/ThemeContext";

export function useTheme(): Theme {
  const { colorScheme } = useThemeContext();

  const theme = useMemo(() => {
    return createTheme(colorScheme);
  }, [colorScheme]);

  return theme;
}
