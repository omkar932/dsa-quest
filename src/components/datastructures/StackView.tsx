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
import { ANIMATION_CONFIG } from '../../utils/animations';

interface StackElement {
  value: any;
  isTop?: boolean;
  isPopping?: boolean;
  isPushing?: boolean;
}

interface StackViewProps {
  data: StackElement[];
  onElementPress?: (index: number) => void;
}

export const StackView: React.FC<StackViewProps> = ({
  data,
  onElementPress,
}) => {
  const theme = useTheme();
  const stackHeight = useSharedValue(0);

  React.useEffect(() => {
    stackHeight.value = withSpring(data.length * 60, ANIMATION_CONFIG.SPRING);
  }, [data.length]);

  const animatedStyle = useAnimatedStyle(() => ({
    height: stackHeight.value,
  }));

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: theme.colors.textSecondary }]}>
        TOP
      </Text>

      <Animated.View style={[styles.stackContainer, animatedStyle]}>
        <View style={styles.stack}>
          {data.map((element, index) => {
            const isTop = index === data.length - 1;
            const isBottom = index === 0;

            return (
              <Animated.View
                key={index}
                style={[
                  styles.element,
                  {
                    backgroundColor: isTop
                      ? theme.colors.primary.main
                      : theme.colors.surfaceVariant,
                    borderColor: isTop
                      ? theme.colors.primary.dark
                      : theme.colors.border,
                    zIndex: data.length - index,
                    marginTop: index === 0 ? 0 : -50,
                  },
                  element.isPushing && styles.pushing,
                  element.isPopping && styles.popping,
                ]}
              >
                <Text
                  style={[
                    styles.value,
                    { color: isTop ? '#FFFFFF' : theme.colors.text },
                  ]}
                >
                  {element.value}
                </Text>

                {isTop && (
                  <View style={styles.topIndicator}>
                    <Ionicons name="arrow-up" size={16} color="#FFFFFF" />
                  </View>
                )}

                {isBottom && (
                  <View style={styles.bottomIndicator}>
                    <Text style={styles.bottomText}>BOTTOM</Text>
                  </View>
                )}
              </Animated.View>
            );
          })}
        </View>
      </Animated.View>

      <View style={styles.base}>
        <View
          style={[styles.baseLine, { backgroundColor: theme.colors.text }]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    minHeight: 200,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 8,
  },
  stackContainer: {
    width: '100%',
    alignItems: 'center',
  },
  stack: {
    alignItems: 'center',
  },
  element: {
    width: 120,
    height: 50,
    borderRadius: 8,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  value: {
    fontSize: 16,
    fontWeight: '700',
  },
  topIndicator: {
    position: 'absolute',
    top: -20,
    alignItems: 'center',
    width: '100%',
  },
  bottomIndicator: {
    position: 'absolute',
    bottom: -25,
    alignItems: 'center',
    width: '100%',
  },
  bottomText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#6B7280',
  },
  base: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  baseLine: {
    width: 150,
    height: 4,
    borderRadius: 2,
  },
  pushing: {
    transform: [{ translateY: -10 }],
  },
  popping: {
    opacity: 0.5,
  },
});
