import { colors, getThemeColors, ColorScheme } from "./colors";
import { spacing, borderRadius, iconSize } from "./spacing";
import { typography } from "./typography";

export const createTheme = (scheme: ColorScheme) => ({
  colors: getThemeColors(scheme),
  spacing,
  borderRadius,
  iconSize,
  typography,
  scheme,
});

export type Theme = ReturnType<typeof createTheme>;

export { colors, spacing, borderRadius, iconSize, typography };
