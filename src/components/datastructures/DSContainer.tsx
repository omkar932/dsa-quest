import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DataStructureType } from '../../types/game';
import { useTheme } from '../../hooks/useTheme';
import { ArrayView } from './ArrayView';
import { StackView } from './StackView';
import { QueueView } from './QueueView';
// import { TreeView } from './TreeView';

interface DSContainerProps {
  dataStructure: DataStructureType;
  data: any;
  onElementPress?: (index: number) => void;
  animationType?: string;
  animationIndex?: number;
}

export const DSContainer: React.FC<DSContainerProps> = ({
  dataStructure,
  data,
  onElementPress,
  animationType,
  animationIndex,
}) => {
  const theme = useTheme();

  const renderDataStructure = () => {
    switch (dataStructure) {
      case 'array':
        return (
          <ArrayView
            data={data.elements || data}
            onElementPress={onElementPress}
            animationType={animationType}
            animationIndex={animationIndex}
          />
        );

      case 'stack':
        return (
          <StackView
            data={data.elements || data}
            onElementPress={onElementPress}
          />
        );

      case 'queue':
        return (
          <QueueView
            data={data.elements || data}
            onElementPress={onElementPress}
          />
        );

      // case 'tree':
      //   return <TreeView data={data} onNodePress={onElementPress} />;

      case 'linkedList':
        return (
          <View style={styles.placeholder}>
            <Text
              style={[styles.placeholderText, { color: theme.colors.text }]}
            >
              Linked List Visualization
            </Text>
          </View>
        );

      case 'graph':
        return (
          <View style={styles.placeholder}>
            <Text
              style={[styles.placeholderText, { color: theme.colors.text }]}
            >
              Graph Visualization
            </Text>
          </View>
        );

      default:
        return (
          <View style={styles.placeholder}>
            <Text
              style={[styles.placeholderText, { color: theme.colors.text }]}
            >
              {dataStructure} visualization coming soon
            </Text>
          </View>
        );
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.surface }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.text }]}>
          {dataStructure.charAt(0).toUpperCase() + dataStructure.slice(1)}
        </Text>
        <Text style={[styles.size, { color: theme.colors.textSecondary }]}>
          Size: {data.elements?.length || data.length || 0}
        </Text>
      </View>

      <View style={styles.content}>{renderDataStructure()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    overflow: 'hidden',
    marginVertical: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  size: {
    fontSize: 14,
  },
  content: {
    padding: 16,
  },
  placeholder: {
    minHeight: 200,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  placeholderText: {
    fontSize: 16,
    textAlign: 'center',
  },
});
