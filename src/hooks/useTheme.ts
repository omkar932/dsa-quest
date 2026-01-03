import { useColorScheme } from "react-native";
import { useMemo } from "react";
import { createTheme, Theme } from "../theme";

export function useTheme(): Theme {
  const colorScheme = useColorScheme() || "dark";

  const theme = useMemo(() => {
    return createTheme(colorScheme);
  }, [colorScheme]);

  return theme;
}
