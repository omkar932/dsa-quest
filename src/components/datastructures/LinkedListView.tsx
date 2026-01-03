import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../../hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";

interface LinkedListNode {
  value: any;
  next: number | null; // index of the next node in the array representation
  isHead?: boolean;
  isTail?: boolean;
  isHighlighted?: boolean;
}

interface LinkedListViewProps {
  data: LinkedListNode[];
}

export const LinkedListView: React.FC<LinkedListViewProps> = ({ data }) => {
  const theme = useTheme();

  if (!data || data.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={[styles.emptyText, { color: theme.colors.textSecondary }]}>
          Linked List is Empty
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {data.map((node, index) => (
        <React.Fragment key={index}>
          <View
            style={[
              styles.node,
              {
                backgroundColor: node.isHighlighted
                  ? theme.colors.primary.main
                  : theme.colors.surfaceVariant,
                borderColor: theme.colors.border,
              },
            ]}
          >
            {node.isHead && (
              <Text style={[styles.label, { color: theme.colors.text }]}>
                HEAD
              </Text>
            )}
            <Text style={[styles.value, { color: theme.colors.text }]}>
              {node.value}
            </Text>
            {node.isTail && (
              <Text style={[styles.label, { color: theme.colors.text }]}>
                TAIL
              </Text>
            )}
          </View>
          {node.next !== null && index < data.length - 1 && (
            <View style={styles.arrowContainer}>
              <Ionicons
                name="arrow-forward"
                size={24}
                color={theme.colors.textSecondary}
              />
            </View>
          )}
        </React.Fragment>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  node: {
    padding: 15,
    margin: 8,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  value: {
    fontSize: 18,
    fontWeight: "bold",
  },
  label: {
    fontSize: 10,
    fontWeight: "bold",
    position: "absolute",
    top: -15,
  },
  arrowContainer: {
    marginHorizontal: -5, // Overlap slightly to make arrows closer
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: 100,
  },
  emptyText: {
    fontSize: 16,
  },
});
