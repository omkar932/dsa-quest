import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Complexity } from "../../types/game";
import {
  COMPLEXITY_COLORS,
  COMPLEXITY_LABELS,
  COMPLEXITY_DAMAGE,
} from "../../game/scoring";

interface ComplexityBadgeProps {
  complexity: Complexity;
  size?: "small" | "medium" | "large";
  showDamage?: boolean;
  showLabel?: boolean;
}

export const ComplexityBadge: React.FC<ComplexityBadgeProps> = ({
  complexity,
  size = "medium",
  showDamage = true,
  showLabel = false,
}) => {
  const color = COMPLEXITY_COLORS[complexity];
  const damage = COMPLEXITY_DAMAGE[complexity];
  const label = COMPLEXITY_LABELS[complexity];

  const getSizeStyles = () => {
    switch (size) {
      case "small":
        return { padding: 4, fontSize: 10, iconSize: 12 };
      case "large":
        return { padding: 12, fontSize: 16, iconSize: 20 };
      default:
        return { padding: 8, fontSize: 12, iconSize: 16 };
    }
  };

  const sizeStyles = getSizeStyles();

  const getDamageIcon = (): keyof typeof Ionicons.glyphMap => {
    if (damage === 0) return "shield-checkmark";
    if (damage <= 10) return "shield-half";
    if (damage <= 25) return "warning";
    return "skull";
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: color + "20", borderColor: color },
        { padding: sizeStyles.padding },
      ]}
    >
      <Text
        style={[styles.complexity, { color, fontSize: sizeStyles.fontSize }]}
      >
        {complexity}
      </Text>

      {showLabel && (
        <Text
          style={[styles.label, { color, fontSize: sizeStyles.fontSize - 2 }]}
        >
          {label}
        </Text>
      )}

      {showDamage && (
        <View style={styles.damageContainer}>
          <Ionicons
            name={getDamageIcon()}
            size={sizeStyles.iconSize}
            color={color}
          />
          <Text
            style={[styles.damage, { color, fontSize: sizeStyles.fontSize }]}
          >
            {damage === 0 ? "+Shield" : `-${damage}`}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    borderWidth: 1,
    alignItems: "center",
  },
  complexity: {
    fontWeight: "800",
    fontFamily: "monospace",
  },
  label: {
    marginTop: 2,
    fontWeight: "500",
  },
  damageContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  damage: {
    fontWeight: "600",
    marginLeft: 4,
  },
});
