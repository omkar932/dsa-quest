import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  withTiming,
  interpolateColor,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../hooks/useTheme";

interface HealthBarProps {
  current: number;
  max: number;
  showDamage?: number;
}

export const HealthBar: React.FC<HealthBarProps> = ({
  current,
  max,
  showDamage,
}) => {
  const theme = useTheme();
  const percentage = (current / max) * 100;

  const widthAnim = useSharedValue(percentage);
  const shakeAnim = useSharedValue(0);
  const damageOpacity = useSharedValue(0);

  useEffect(() => {
    widthAnim.value = withSpring(percentage, {
      damping: 15,
      stiffness: 100,
    });

    if (showDamage && showDamage > 0) {
      // Shake effect
      shakeAnim.value = withSequence(
        withTiming(-5, { duration: 50 }),
        withTiming(5, { duration: 50 }),
        withTiming(-3, { duration: 50 }),
        withTiming(3, { duration: 50 }),
        withTiming(0, { duration: 50 })
      );

      // Damage number animation
      damageOpacity.value = withSequence(
        withTiming(1, { duration: 200 }),
        withTiming(1, { duration: 500 }),
        withTiming(0, { duration: 300 })
      );
    }
  }, [current, showDamage]);

  const barStyle = useAnimatedStyle(() => {
    const color =
      percentage > 50 ? "#10B981" : percentage > 25 ? "#F59E0B" : "#EF4444";

    return {
      width: `${widthAnim.value}%`,
      backgroundColor: color,
    };
  });

  const containerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: shakeAnim.value }],
  }));

  const damageStyle = useAnimatedStyle(() => ({
    opacity: damageOpacity.value,
    transform: [{ translateY: -damageOpacity.value * 20 }],
  }));

  const getHealthColor = () => {
    if (percentage > 50) return "#10B981";
    if (percentage > 25) return "#F59E0B";
    return "#EF4444";
  };

  return (
    <Animated.View style={[styles.container, containerStyle]}>
      <View style={styles.header}>
        <Ionicons name="heart" size={20} color={getHealthColor()} />
        <Text style={[styles.label, { color: theme.colors.text }]}>Health</Text>
        <Text style={[styles.value, { color: theme.colors.text }]}>
          {current}/{max}
        </Text>
      </View>

      <View
        style={[
          styles.barBackground,
          { backgroundColor: theme.colors.surfaceVariant },
        ]}
      >
        <Animated.View style={[styles.barFill, barStyle]} />
      </View>

      {showDamage !== undefined && showDamage > 0 && (
        <Animated.View style={[styles.damageContainer, damageStyle]}>
          <Text style={styles.damageText}>-{showDamage}</Text>
        </Animated.View>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 6,
    flex: 1,
  },
  value: {
    fontSize: 14,
    fontWeight: "700",
  },
  barBackground: {
    height: 12,
    borderRadius: 6,
    overflow: "hidden",
  },
  barFill: {
    height: "100%",
    borderRadius: 6,
  },
  damageContainer: {
    position: "absolute",
    right: 0,
    top: -10,
  },
  damageText: {
    color: "#EF4444",
    fontSize: 18,
    fontWeight: "800",
  },
});
