import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withSequence,
  withSpring,
  withRepeat,
} from "react-native-reanimated";
import { useTheme } from "../../hooks/useTheme";
import { useHaptics } from "../../hooks/useHaptics";
import { ANIMATION_CONFIG } from "../../utils/animations";

interface ArrayElement {
  value: number | string;
  isNew?: boolean;
}

interface ArrayViewProps {
  data?: ArrayElement[];
  animationType?: string;
  animationIndex?: number;
}

export const ArrayView: React.FC<ArrayViewProps> = ({
  data = [], // ✅ SAFETY FIX
  animationType,
  animationIndex,
}) => {
  const theme = useTheme();
  const haptics = useHaptics();

  // ✅ ONE hook call – stable forever
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);
  const translateY = useSharedValue(0);
  const bgColor = useSharedValue(theme.colors.surfaceVariant);

  useEffect(() => {
    if (animationType && animationIndex !== undefined && animationIndex >= 0) {
      runAnimation(animationType);
    }
  }, [animationType, animationIndex]);

  const runAnimation = (type: string) => {
    switch (type) {
      case "highlight":
        scale.value = withSequence(
          withTiming(1.2, { duration: 200 }),
          withSpring(1, ANIMATION_CONFIG.SPRING)
        );
        break;

      case "swap":
        translateY.value = withSequence(
          withTiming(-20, { duration: 150 }),
          withTiming(0, { duration: 150 })
        );
        haptics.medium();
        break;

      case "compare":
        scale.value = withRepeat(
          withSequence(
            withTiming(1.15, { duration: 120 }),
            withTiming(1, { duration: 120 })
          ),
          2,
          false
        );
        haptics.light();
        break;
    }
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { translateY: translateY.value }],
    opacity: opacity.value,
    backgroundColor: bgColor.value,
  }));

  return (
    <View style={styles.container}>
      <View style={styles.arrayContainer}>
        {data.map((item, index) => (
          <Animated.View
            key={index}
            style={[
              styles.element,
              animatedStyle,
              { backgroundColor: theme.colors.surfaceVariant },
            ]}
          >
            <Text style={[styles.value, { color: theme.colors.text }]}>
              {item.value}
            </Text>

            {item.isNew && (
              <View
                style={[styles.badge, { backgroundColor: theme.colors.info }]}
              >
                <Text style={styles.badgeText}>NEW</Text>
              </View>
            )}
          </Animated.View>
        ))}
      </View>

      {data.length === 0 && (
        <Text style={[styles.emptyText, { color: theme.colors.textSecondary }]}>
          Array is empty
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 120,
  },
  arrayContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 12,
    padding: 16,
  },
  element: {
    width: 60,
    height: 60,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },
  value: {
    fontSize: 18,
    fontWeight: "700",
  },
  badge: {
    position: "absolute",
    top: -6,
    right: -6,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#FFF",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 16,
    fontStyle: "italic",
  },
});
