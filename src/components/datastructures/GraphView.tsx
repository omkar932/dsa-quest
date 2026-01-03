import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../../hooks/useTheme";

interface GraphViewProps {
  data: any; // Data for the graph visualization
}

export const GraphView: React.FC<GraphViewProps> = ({ data }) => {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.placeholderText, { color: theme.colors.textSecondary }]}>
        Graph Visualization (Advanced)
      </Text>
      <Text style={[styles.placeholderTextSmall, { color: theme.colors.textSecondary }]}>
        Nodes: {data?.nodes?.length || 0}, Edges: {data?.edges?.length || 0}
      </Text>
      <Text style={[styles.placeholderTextSmall, { color: theme.colors.textSecondary }]}>
        Proper interactive graph visualization is complex and a future enhancement.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 200,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    borderStyle: "dashed",
  },
  placeholderText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 8,
  },
  placeholderTextSmall: {
    fontSize: 12,
    textAlign: "center",
  },
});
