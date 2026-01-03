import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export const LevelNode: React.FC<{
  level?: any;
  progress?: any;
  isUnlocked?: boolean;
  onPress?: () => void;
}> = ({ level, progress, isUnlocked = true, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.node, { opacity: isUnlocked ? 1 : 0.4 }]}
    >
      <Text style={styles.text}>{level?.name || level?.id || "Level"}</Text>
      {progress && (
        <Text style={styles.textSmall}>{`Stars: ${progress.stars || 0}`}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  node: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#222",
  },
  text: { color: "#fff" },
  textSmall: { color: "#ccc", fontSize: 12, marginTop: 4 },
});
