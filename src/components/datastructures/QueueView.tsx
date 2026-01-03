import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withSequence,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';

interface QueueElement {
  value: any;
  isFront?: boolean;
  isRear?: boolean;
  isEnqueuing?: boolean;
  isDequeuing?: boolean;
}

interface QueueViewProps {
  data: QueueElement[];
  onElementPress?: (index: number) => void;
}

export const QueueView: React.FC<QueueViewProps> = ({
  data,
  onElementPress,
}) => {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.indicatorContainer}>
          <Ionicons
            name="enter-outline"
            size={20}
            color={theme.colors.primary.main}
          />
          <Text style={[styles.indicatorLabel, { color: theme.colors.text }]}>
            ENQUEUE
          </Text>
        </View>

        <View style={styles.indicatorContainer}>
          <Ionicons
            name="exit-outline"
            size={20}
            color={theme.colors.secondary.main}
          />
          <Text style={[styles.indicatorLabel, { color: theme.colors.text }]}>
            DEQUEUE
          </Text>
        </View>
      </View>

      <View style={styles.queueContainer}>
        <View style={styles.queue}>
          {data.map((element, index) => {
            const isFront = index === 0;
            const isRear = index === data.length - 1;

            return (
              <Animated.View
                key={index}
                style={[
                  styles.element,
                  {
                    backgroundColor: element.isEnqueuing
                      ? theme.colors.accent.success
                      : element.isDequeuing
                        ? theme.colors.accent.error
                        : theme.colors.surfaceVariant,
                    borderColor: isFront
                      ? theme.colors.primary.main
                      : isRear
                        ? theme.colors.secondary.main
                        : theme.colors.border,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.value,
                    {
                      color:
                        element.isEnqueuing || element.isDequeuing
                          ? '#FFFFFF'
                          : theme.colors.text,
                    },
                  ]}
                >
                  {element.value}
                </Text>

                {isFront && (
                  <View
                    style={[styles.positionIndicator, styles.frontIndicator]}
                  >
                    <Ionicons
                      name="caret-forward"
                      size={16}
                      color={theme.colors.primary.main}
                    />
                    <Text
                      style={[
                        styles.positionText,
                        { color: theme.colors.primary.main },
                      ]}
                    >
                      FRONT
                    </Text>
                  </View>
                )}

                {isRear && (
                  <View
                    style={[styles.positionIndicator, styles.rearIndicator]}
                  >
                    <Ionicons
                      name="caret-back"
                      size={16}
                      color={theme.colors.secondary.main}
                    />
                    <Text
                      style={[
                        styles.positionText,
                        { color: theme.colors.secondary.main },
                      ]}
                    >
                      REAR
                    </Text>
                  </View>
                )}
              </Animated.View>
            );
          })}
        </View>
      </View>

      <View style={styles.conveyor}>
        <View
          style={[
            styles.conveyorLine,
            { backgroundColor: theme.colors.border },
          ]}
        />
        <View style={styles.conveyorArrows}>
          <Ionicons
            name="arrow-forward"
            size={24}
            color={theme.colors.textSecondary}
          />
          <Ionicons
            name="arrow-forward"
            size={24}
            color={theme.colors.textSecondary}
          />
          <Ionicons
            name="arrow-forward"
            size={24}
            color={theme.colors.textSecondary}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 200,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  indicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  indicatorLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  queueContainer: {
    paddingHorizontal: 8,
  },
  queue: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
  },
  element: {
    width: 70,
    height: 70,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  value: {
    fontSize: 16,
    fontWeight: '700',
  },
  positionIndicator: {
    position: 'absolute',
    alignItems: 'center',
  },
  frontIndicator: {
    bottom: -25,
    left: 0,
    right: 0,
  },
  rearIndicator: {
    top: -25,
    left: 0,
    right: 0,
  },
  positionText: {
    fontSize: 10,
    fontWeight: '600',
    marginTop: 2,
  },
  conveyor: {
    marginTop: 40,
    alignItems: 'center',
  },
  conveyorLine: {
    width: '100%',
    height: 2,
    borderRadius: 1,
  },
  conveyorArrows: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 8,
  },
});
