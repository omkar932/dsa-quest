import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { useTheme } from "../../hooks/useTheme";

const { width } = Dimensions.get("window");

export const LevelNode: React.FC<{
  level?: any;
  progress?: any;
  isUnlocked?: boolean;
  onPress?: () => void;
}> = ({ level, progress, isUnlocked = true, onPress }) => {
  const theme = useTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.node,
        {
          opacity: isUnlocked ? 1 : 0.4,
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
        },
      ]}
      disabled={!isUnlocked}
    >
      <Text style={[styles.text, { color: theme.colors.text }]}>
        {level?.name || level?.id || "Level"}
      </Text>
      {progress && (
        <Text
          style={[styles.textSmall, { color: theme.colors.textSecondary }]}
        >{`Stars: ${progress.stars || 0}`}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  node: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    width: (width - 48) / 2, // 24 padding in levelsSection, 16 spacing between
    marginBottom: 16,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 80, // Ensure a consistent height
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  textSmall: {
    fontSize: 12,
    marginTop: 4,
    textAlign: "center",
  },
});
