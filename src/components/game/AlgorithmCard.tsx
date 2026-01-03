import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AlgorithmCard } from "../../types/cards";
import { useTheme } from "../../hooks/useTheme";
import { useHaptics } from "../../hooks/useHaptics";

interface AlgorithmCardProps {
  card: AlgorithmCard;
  isSelected?: boolean;
  isEquipped?: boolean;
  onPress?: () => void;
  onLongPress?: () => void;
  size?: "small" | "medium" | "large";
}

export const AlgorithmCardComponent: React.FC<AlgorithmCardProps> = ({
  card,
  isSelected = false,
  isEquipped = false,
  onPress,
  onLongPress,
  size = "medium",
}) => {
  const theme = useTheme();
  const haptics = useHaptics();

  const handlePress = () => {
    if (onPress) {
      haptics.selection();
      onPress();
    }
  };

  const handleLongPress = () => {
    if (onLongPress) {
      haptics.medium();
      onLongPress();
    }
  };

  const getRarityColor = (): string => {
    switch (card.rarity) {
      case "common":
        return "#6B7280";
      case "uncommon":
        return "#10B981";
      case "rare":
        return "#3B82F6";
      case "epic":
        return "#8B5CF6";
      case "legendary":
        return "#F59E0B";
      default:
        return "#6B7280";
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case "small":
        return { padding: 8, fontSize: 12, iconSize: 16 };
      case "large":
        return { padding: 16, fontSize: 16, iconSize: 32 };
      default:
        return { padding: 12, fontSize: 14, iconSize: 24 };
    }
  };

  const sizeStyles = getSizeStyles();
  const rarityColor = getRarityColor();

  return (
    <TouchableOpacity
      onPress={handlePress}
      onLongPress={handleLongPress}
      activeOpacity={0.7}
      style={[
        styles.container,
        {
          backgroundColor: card.color + "15",
          borderColor: isSelected
            ? theme.colors.primary.main
            : rarityColor + "50",
          borderWidth: isSelected ? 3 : 2,
          padding: sizeStyles.padding,
        },
      ]}
    >
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Ionicons
            name={card.icon as any}
            size={sizeStyles.iconSize}
            color={card.color}
          />
          <Text
            style={[
              styles.title,
              { color: theme.colors.text, fontSize: sizeStyles.fontSize },
            ]}
            numberOfLines={1}
          >
            {card.name}
          </Text>
        </View>

        <View
          style={[styles.rarityBadge, { backgroundColor: rarityColor + "20" }]}
        >
          <Text style={[styles.rarityText, { color: rarityColor }]}>
            {card.rarity.toUpperCase()}
          </Text>
        </View>
      </View>

      <Text
        style={[
          styles.description,
          {
            color: theme.colors.textSecondary,
            fontSize: sizeStyles.fontSize - 2,
          },
        ]}
        numberOfLines={2}
      >
        {card.shortDescription}
      </Text>

      <View style={styles.footer}>
        <View style={styles.complexityBadge}>
          <Text style={[styles.complexityText, { color: card.color }]}>
            {card.complexity}
          </Text>
        </View>

        <View style={styles.levelContainer}>
          <Ionicons
            name="star"
            size={sizeStyles.iconSize - 8}
            color="#FBBF24"
          />
          <Text
            style={[styles.levelText, { color: theme.colors.textSecondary }]}
          >
            Lvl {card.level}
          </Text>
        </View>
      </View>

      {isEquipped && (
        <View style={styles.equippedBadge}>
          <Ionicons name="checkmark-circle" size={16} color="#10B981" />
          <Text style={styles.equippedText}>Equipped</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    margin: 4,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  title: {
    fontWeight: "600",
    marginLeft: 8,
    flexShrink: 1,
  },
  rarityBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  rarityText: {
    fontSize: 10,
    fontWeight: "700",
  },
  description: {
    marginBottom: 12,
    lineHeight: 16,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  complexityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: "rgba(0,0,0,0.1)",
    borderRadius: 6,
  },
  complexityText: {
    fontSize: 12,
    fontWeight: "700",
    fontFamily: "monospace",
  },
  levelContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  levelText: {
    fontSize: 12,
    fontWeight: "600",
    marginLeft: 4,
  },
  equippedBadge: {
    position: "absolute",
    top: -6,
    right: -6,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#10B981",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  equippedText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "600",
    marginLeft: 2,
  },
});
