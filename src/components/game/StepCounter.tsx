import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const StepCounter: React.FC<{
  current?: number;
  optimal?: number;
  score?: number;
}> = ({ current = 0, optimal = 0, score = 0 }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Steps: {current}</Text>
      <Text style={styles.text}>Optimal: {optimal}</Text>
      <Text style={styles.text}>Score: {score}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 8 },
  text: { fontSize: 14 },
});
