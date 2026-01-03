import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LevelChoice } from "../../types/levels";
import { ComplexityBadge } from "./ComplexityBadge";
import { useTheme } from "../../hooks/useTheme";
import { useHaptics } from "../../hooks/useHaptics";
import { COMPLEXITY_COLORS } from "../../game/scoring";

interface ChoicePanelProps {
  choices: LevelChoice[];
  onChoiceSelect: (choice: LevelChoice) => void;
  disabled?: boolean;
  selectedCardId?: string | null;
}

const { width } = Dimensions.get("window");

export const ChoicePanel: React.FC<ChoicePanelProps> = ({
  choices,
  selectedCardId,
  onChoiceSelect,
  disabled,
}) => {
  const theme = useTheme();
  const haptics = useHaptics();

  const handleChoiceSelect = (choice: LevelChoice) => {
    haptics.selection();
    onChoiceSelect(choice);
  };

  const getChoiceColor = (choice: LevelChoice): string => {
    return COMPLEXITY_COLORS[choice.complexity];
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
    >
      {choices.map((choice) => {
        const color = getChoiceColor(choice);
        const isRequirementMet =
          !choice.requiredCard || selectedCardId === choice.requiredCard;

        return (
          <TouchableOpacity
            key={choice.id}
            onPress={() => handleChoiceSelect(choice)}
            disabled={disabled || !isRequirementMet}
            style={[
              styles.choiceCard,
              {
                backgroundColor: theme.colors.surface,
                borderColor: isRequirementMet ? color : theme.colors.disabled,
                opacity: isRequirementMet ? 1 : 0.5,
                width: width * 0.75, // Make card width dynamic
              },
            ]}
            activeOpacity={0.7}
          >
            <View style={styles.choiceHeader}>
              <Ionicons
                name={choice.icon as any}
                size={24}
                color={isRequirementMet ? color : theme.colors.disabled}
              />
              <View style={styles.choiceLabels}>
                <Text
                  style={[
                    styles.choiceTitle,
                    {
                      color: isRequirementMet
                        ? theme.colors.text
                        : theme.colors.disabled,
                    },
                  ]}
                >
                  {choice.label}
                </Text>
                <Text
                  style={[
                    styles.choiceDescription,
                    {
                      color: isRequirementMet
                        ? theme.colors.textSecondary
                        : theme.colors.disabled,
                    },
                  ]}
                >
                  {choice.description}
                </Text>
              </View>
            </View>

            <View style={styles.choiceFooter}>
              <ComplexityBadge
                complexity={choice.complexity}
                size="small"
                showDamage
              />

              {choice.requiredCard && (
                <View
                  style={[
                    styles.cardRequirement,
                    {
                      backgroundColor: theme.colors.complexity.ON + "1A", // 10% opacity
                    },
                  ]}
                >
                  <Ionicons
                    name="card"
                    size={16}
                    color={
                      selectedCardId === choice.requiredCard
                        ? theme.colors.complexity.O1
                        : theme.colors.complexity.ON
                    }
                  />
                  <Text
                    style={[
                      styles.cardRequirementText,
                      { color: theme.colors.complexity.ON },
                    ]}
                  >
                    {selectedCardId === choice.requiredCard
                      ? "Card Active"
                      : "Card Required"}
                  </Text>
                </View>
              )}

              {choice.isOptimal && (
                <View
                  style={[
                    styles.optimalBadge,
                    {
                      backgroundColor: theme.colors.accent.warning + "1A", // 10% opacity
                    },
                  ]}
                >
                  <Ionicons name="star" size={14} color={theme.colors.accent.warning} />
                  <Text
                    style={[
                      styles.optimalText,
                      { color: theme.colors.accent.warning },
                    ]}
                  >
                    Optimal
                  </Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 0,
    marginVertical: 16,
  },
  choiceCard: {
    width: 280,
    marginRight: 16,
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
  },
  choiceHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  choiceLabels: {
    flex: 1,
    marginLeft: 12,
  },
  choiceTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  choiceDescription: {
    fontSize: 14,
    lineHeight: 18,
  },
  choiceFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginTop: 8,
  },
  cardRequirement: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(245, 158, 11, 0.1)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginLeft: 8,
  },
  cardRequirementText: {
    fontSize: 12,
    color: "#F59E0B",
    marginLeft: 4,
    fontWeight: "500",
  },
  optimalBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(251, 191, 36, 0.1)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginLeft: 8,
  },
  optimalText: {
    fontSize: 12,
    color: "#FBBF24",
    marginLeft: 4,
    fontWeight: "500",
  },
});
