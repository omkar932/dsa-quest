import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withSequence,
  runOnJS,
} from 'react-native-reanimated';
import { useTheme } from '../../hooks/useTheme';
import { useHaptics } from '../../hooks/useHaptics';
import { ANIMATION_CONFIG, getAnimationByType } from '../../utils/animations';

interface ArrayElement {
  value: number | string;
  isHighlighted?: boolean;
  isFound?: boolean;
  isNew?: boolean;
  isSorted?: boolean;
  isComparing?: boolean;
  isSwapping?: boolean;
}

interface ArrayViewProps {
  data: ArrayElement[];
  onElementPress?: (index: number) => void;
  animationType?: string;
  animationIndex?: number;
}

export const ArrayView: React.FC<ArrayViewProps> = ({
  data,
  onElementPress,
  animationType,
  animationIndex,
}) => {
  const theme = useTheme();
  const haptics = useHaptics();

  // Create animated values for each element
  const elementAnimations = data.map(() => ({
    scale: useSharedValue(1),
    opacity: useSharedValue(1),
    translateY: useSharedValue(0),
    backgroundColor: useSharedValue(theme.colors.surfaceVariant),
  }));

  useEffect(() => {
    if (animationType && animationIndex !== undefined) {
      animateElement(animationIndex, animationType);
    }
  }, [animationType, animationIndex]);

  const animateElement = (index: number, type: string) => {
    const anim = elementAnimations[index];

    switch (type) {
      case 'highlight':
        anim.scale.value = withSequence(
          withTiming(1.2, { duration: 200 }),
          withSpring(1, ANIMATION_CONFIG.SPRING)
        );
        anim.backgroundColor.value = withTiming(theme.colors.primary.light, {
          duration: 200,
        });
        break;

      case 'swap':
        anim.translateY.value = withSequence(
          withTiming(-20, { duration: 200 }),
          withTiming(0, { duration: 200 })
        );
        anim.backgroundColor.value = withTiming(theme.colors.secondary.main, {
          duration: 200,
        });
        haptics.medium();
        break;

      case 'insert':
        anim.opacity.value = withSequence(
          withTiming(0, { duration: 0 }),
          withTiming(1, { duration: 300 })
        );
        anim.scale.value = withSequence(
          withTiming(0.5, { duration: 0 }),
          withSpring(1, ANIMATION_CONFIG.SPRING)
        );
        anim.backgroundColor.value = withTiming(theme.colors.accent.success, {
          duration: 300,
        });
        break;

      case 'remove':
        anim.opacity.value = withTiming(0, { duration: 200 });
        anim.scale.value = withTiming(0.5, { duration: 200 });
        haptics.error();
        break;

      case 'compare':
        anim.scale.value = withRepeat(
          withSequence(
            withTiming(1.2, { duration: 150 }),
            withTiming(1, { duration: 150 })
          ),
          2,
          false
        );
        anim.backgroundColor.value = withTiming(theme.colors.accent.warning, {
          duration: 150,
        });
        haptics.light();
        break;
    }

    // Reset background color after animation
    setTimeout(() => {
      anim.backgroundColor.value = withTiming(theme.colors.surfaceVariant, {
        duration: 300,
      });
    }, 1000);
  };

  const getElementColor = (element: ArrayElement, index: number) => {
    const anim = elementAnimations[index];

    if (element.isFound) return theme.colors.accent.success;
    if (element.isHighlighted) return theme.colors.primary.main;
    if (element.isNew) return theme.colors.accent.info;
    if (element.isSorted) return theme.colors.accent.success;
    if (element.isComparing) return theme.colors.accent.warning;
    if (element.isSwapping) return theme.colors.secondary.main;

    return theme.colors.surfaceVariant;
  };

  const getElementStyles = (element: ArrayElement, index: number) => {
    const anim = elementAnimations[index];

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [
        { scale: anim.scale.value },
        { translateY: anim.translateY.value },
      ],
      opacity: anim.opacity.value,
      backgroundColor: anim.backgroundColor.value,
    }));

    return {
      baseStyle: {
        backgroundColor: getElementColor(element, index),
      },
      animatedStyle,
    };
  };

  return (
    <View style={styles.container}>
      <View style={styles.arrayContainer}>
        {data.map((element, index) => {
          const styles = getElementStyles(element, index);

          return (
            <Animated.View
              key={index}
              style={[styles.baseStyle, styles.animatedStyle, styles.element]}
            >
              <Text style={[styles.value, { color: theme.colors.text }]}>
                {element.value}
              </Text>
              {element.isNew && (
                <View style={styles.newBadge}>
                  <Text style={styles.newText}>New</Text>
                </View>
              )}
            </Animated.View>
          );
        })}
      </View>

      {data.length === 0 && (
        <View style={styles.emptyState}>
          <Text
            style={[styles.emptyText, { color: theme.colors.textSecondary }]}
          >
            Array is empty
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 120,
  },
  arrayContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    padding: 16,
  },
  element: {
    width: 60,
    height: 60,
    borderRadius: 12,
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
    fontSize: 18,
    fontWeight: '700',
  },
  newBadge: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: '#3B82F6',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  newText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
  emptyState: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 16,
    fontStyle: 'italic',
  },
});
