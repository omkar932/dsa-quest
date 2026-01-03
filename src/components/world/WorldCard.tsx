import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { useTheme } from "../../hooks/useTheme";

const { width } = Dimensions.get("window");

export const WorldCard: React.FC<{
  world?: any;
  progress?: any;
  isUnlocked?: boolean;
  onPress?: () => void;
}> = ({ world, progress, isUnlocked = true, onPress }) => {
  const theme = useTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.card,
        {
          opacity: isUnlocked ? 1 : 0.5,
          backgroundColor: theme.colors.surface,
        },
      ]}
    >
      <Text style={[styles.title, { color: theme.colors.text }]}>
        {world?.name || world?.id || "World"}
      </Text>
      {progress && (
        <Text
          style={[styles.progressText, { color: theme.colors.textSecondary }]}
        >{`${progress.completed}/${progress.total} completed • ${progress.stars}⭐`}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 12,
    width: (width - 48) / 2, // 24 padding on each side, 16 spacing between
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  progressText: {
    fontSize: 12,
  },
});
