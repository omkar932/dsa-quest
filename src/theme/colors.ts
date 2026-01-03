export const colors = {
  // Primary palette
  primary: {
    main: "#6C63FF",
    light: "#8B85FF",
    dark: "#4A42CC",
    contrast: "#FFFFFF",
  },

  // Secondary palette
  secondary: {
    main: "#FF6B9D",
    light: "#FF8FB4",
    dark: "#CC5580",
    contrast: "#FFFFFF",
  },

  // Accent colors
  accent: {
    success: "#4ADE80",
    warning: "#FBBF24",
    error: "#F87171",
    info: "#60A5FA",
  },

  // Complexity colors (core game mechanic)
  complexity: {
    O1: "#10B981", // Excellent - Green
    OlogN: "#3B82F6", // Good - Blue
    ON: "#F59E0B", // Medium - Amber
    ONlogN: "#F97316", // Warning - Orange
    ON2: "#EF4444", // Bad - Red
    O2N: "#991B1B", // Critical - Dark Red
  },

  // World theme colors
  worlds: {
    arrays: "#FF6B6B",
    strings: "#4ECDC4",
    stackQueue: "#45B7D1",
    linkedList: "#96CEB4",
    trees: "#FFEAA7",
    graphs: "#DDA0DD",
    dp: "#FF8C00",
  },

  // Light theme
  light: {
    background: "#F8FAFC",
    surface: "#FFFFFF",
    surfaceVariant: "#F1F5F9",
    text: "#1E293B",
    textSecondary: "#64748B",
    border: "#E2E8F0",
    disabled: "#CBD5E1",
  },

  // Dark theme
  dark: {
    background: "#0F172A",
    surface: "#1E293B",
    surfaceVariant: "#334155",
    text: "#F1F5F9",
    textSecondary: "#94A3B8",
    border: "#475569",
    disabled: "#64748B",
  },
};

export type ColorScheme = "light" | "dark";

export const getThemeColors = (scheme: ColorScheme) => ({
  ...colors,
  ...(scheme === "dark" ? colors.dark : colors.light),
});
