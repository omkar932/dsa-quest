import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export const WorldCard: React.FC<{
  world?: any;
  progress?: any;
  isUnlocked?: boolean;
  onPress?: () => void;
}> = ({ world, progress, isUnlocked = true, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.card, { opacity: isUnlocked ? 1 : 0.5 }]}
    >
      <Text style={styles.title}>{world?.name || world?.id || "World"}</Text>
      {progress && (
        <Text
          style={{ color: "#ccc", marginTop: 6 }}
        >{`${progress.completed}/${progress.total} completed • ${progress.stars}⭐`}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#2b2b2b",
  },
  title: { color: "#fff", fontSize: 16 },
});
