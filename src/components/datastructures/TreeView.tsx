import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../../hooks/useTheme";

interface TreeNode {
  value: any;
  left?: TreeNode;
  right?: TreeNode;
  isHighlighted?: boolean;
}

interface TreeViewProps {
  data: TreeNode;
}

export const TreeView: React.FC<TreeViewProps> = ({ data }) => {
  const theme = useTheme();

  const renderNode = (node: any, level: number = 0) => {
    if (!node) {
      return null;
    }

    const nodeStyle = [
      styles.node,
      {
        backgroundColor: node.isHighlighted
          ? theme.colors.primary.main
          : theme.colors.surfaceVariant,
        borderColor: theme.colors.border,
      },
      level > 0 && styles.childNode, // Apply child styling if not root
    ];

    return (
      <View style={styles.nodeContainer}>
        <View style={nodeStyle}>
          <Text style={[styles.nodeValue, { color: theme.colors.text }]}>
            {node.value}
          </Text>
        </View>
        {(node.left || node.right) && (
          <View style={styles.childrenContainer}>
            {renderNode(node.left, level + 1)}
            {renderNode(node.right, level + 1)}
          </View>
        )}
      </View>
    );
  };

  if (!data) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={[styles.emptyText, { color: theme.colors.textSecondary }]}>
          Tree is Empty
        </Text>
      </View>
    );
  }

  return <View style={styles.container}>{renderNode(data)}</View>;
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: 10,
  },
  nodeContainer: {
    alignItems: "center",
    marginVertical: 5,
  },
  node: {
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    minWidth: 40,
    minHeight: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  nodeValue: {
    fontSize: 16,
    fontWeight: "bold",
  },
  childrenContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  childNode: {
    marginHorizontal: 10, // Spacing between child nodes
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
