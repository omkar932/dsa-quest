import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../hooks/useTheme";
import { useGameState } from "../hooks/useGameState";
import { useProgress } from "../hooks/useProgress";
import { getLevel } from "../game/levels";
import { HealthBar } from "../components/game/HealthBar";
import { StepCounter } from "../components/game/StepCounter";
import { ChoicePanel } from "../components/game/ChoicePanel";
import { DSContainer } from "../components/datastructures/DSContainer";
import { AlgorithmCardComponent } from "../components/game/AlgorithmCard";
import { Button } from "../components/common/Button";
import { RootStackParamList } from "../types/navigation";
import { getCard, getUnlockedCards } from "../game/algorithms/cards";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type GameScreenRouteProp = RouteProp<RootStackParamList, "Game">;

export const GameScreen: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<GameScreenRouteProp>();
  const { levelId, worldId } = route.params;

  const { updateLevelProgress } = useProgress();
  const [showHint, setShowHint] = useState(false);
  const [hintIndex, setHintIndex] = useState(0);
  const [lastDamage, setLastDamage] = useState<number | undefined>();

  const level = getLevel(worldId, levelId);
  const { progress } = useProgress();

  if (!level) {
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.colors.background }]}
      >
        <Text style={{ color: theme.colors.text }}>Level not found</Text>
      </SafeAreaView>
    );
  }

  const equippedCards = progress.unlockedCards.filter((cardId) => {
    const card = getCard(cardId);
    return card && card.level > 0;
  });

  const unlockedCards = getUnlockedCards(progress.unlockedCards);

  const {
    state,
    makeChoice,
    selectCard,
    reset,
    getAvailableChoices,
    getHint,
    getResult,
  } = useGameState(level, equippedCards);

  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  // Handle game completion
  useEffect(() => {
    if (state.isComplete) {
      const result = getResult();

      Alert.alert(
        "Level Complete!",
        `You earned ${result.stars} stars!\nScore: ${result.score}\nEfficiency: ${result.efficiencyRating}%`,
        [
          {
            text: "Continue",
            onPress: async () => {
              await updateLevelProgress(worldId, levelId, {
                completed: true,
                stars: result.stars,
                score: result.score,
                xpEarned: result.xpEarned,
                newCards: result.newCardsUnlocked,
              });

              navigation.navigate("Result", {
                levelId,
                result,
              });
            },
          },
        ]
      );
    }
  }, [state.isComplete]);

  // Handle game failure
  useEffect(() => {
    if (state.isFailed) {
      Alert.alert(
        "Mission Failed",
        "Your health reached zero! Try using more efficient algorithms.",
        [
          {
            text: "Retry",
            onPress: reset,
            style: "destructive",
          },
          {
            text: "Exit",
            onPress: () => navigation.goBack(),
          },
        ]
      );
    }
  }, [state.isFailed]);

  const handleChoiceSelect = (choice: any) => {
    const move = makeChoice(choice);
    setLastDamage(move.damage);

    // Clear damage display after animation
    setTimeout(() => setLastDamage(undefined), 1000);
  };

  const handleCardSelect = (cardId: string) => {
    if (selectedCard === cardId) {
      setSelectedCard(null);
      selectCard(null);
    } else {
      setSelectedCard(cardId);
      selectCard(cardId);
    }
  };

  const handleShowHint = () => {
    const hint = getHint(hintIndex);
    if (hint) {
      Alert.alert("Hint", hint);
      setHintIndex((prev) => prev + 1);
    } else {
      Alert.alert(
        "No More Hints",
        "You've seen all available hints for this level."
      );
    }
  };

  const handleGiveUp = () => {
    Alert.alert(
      "Give Up?",
      "Are you sure you want to give up? You'll lose your progress for this attempt.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Give Up",
          style: "destructive",
          onPress: () => navigation.goBack(),
        },
      ]
    );
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View
        style={[styles.header, { backgroundColor: theme.colors.primary.main }]}
      >
        <View style={styles.headerContent}>
          <Button
            title=""
            onPress={() => navigation.goBack()}
            icon="arrow-back"
            variant="ghost"
            size="small"
            textStyle={{ color: "#FFFFFF" }}
          />

          <View style={styles.levelInfo}>
            <Text style={styles.levelName}>{level.name}</Text>
            <Text style={styles.levelDescription}>{level.description}</Text>
          </View>

          <Button
            title=""
            onPress={handleShowHint}
            icon="bulb"
            variant="ghost"
            size="small"
            textStyle={{ color: "#FFFFFF" }}
          />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Objective */}
        <View
          style={[
            styles.objectiveSection,
            { backgroundColor: theme.colors.surface },
          ]}
        >
          <View style={styles.objectiveHeader}>
            <Ionicons name="flag" size={20} color={theme.colors.primary.main} />
            <Text style={[styles.objectiveTitle, { color: theme.colors.text }]}>
              Objective
            </Text>
          </View>
          <Text
            style={[
              styles.objectiveText,
              { color: theme.colors.textSecondary },
            ]}
          >
            {level.objective}
          </Text>
        </View>

        {/* Stats */}
        <View style={styles.statsSection}>
          <View style={styles.statItem}>
            <HealthBar
              current={state.currentHealth}
              max={state.maxHealth}
              showDamage={lastDamage}
            />
          </View>
          <View style={styles.statItem}>
            <StepCounter
              current={state.steps}
              optimal={state.optimalSteps}
              score={state.score}
            />
          </View>
        </View>

        {/* Data Structure Visualization */}
        <View
          style={[styles.dsSection, { backgroundColor: theme.colors.surface }]}
        >
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Data Structure
          </Text>
          <DSContainer
            dataStructure={level.initialState.dataStructure}
            data={state.dataState}
          />
        </View>

        {/* Available Cards */}
        {unlockedCards.length > 0 && (
          <View style={styles.cardsSection}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Available Cards
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.cardsList}
            >
              {unlockedCards.map((card) => (
                <View key={card.id} style={styles.cardItem}>
                  <AlgorithmCardComponent
                    card={card}
                    isSelected={selectedCard === card.id}
                    onPress={() => handleCardSelect(card.id)}
                    size="small"
                  />
                </View>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Choices */}
        <View style={styles.choicesSection}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Choose Your Move
          </Text>
          <ChoicePanel
            choices={getAvailableChoices()}
            onChoiceSelect={handleChoiceSelect}
            selectedCardId={selectedCard}
            disabled={state.isComplete || state.isFailed}
          />
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsSection}>
          <Button
            title="Reset"
            onPress={reset}
            icon="refresh"
            variant="outline"
            style={styles.actionButton}
          />
          <Button
            title="Give Up"
            onPress={handleGiveUp}
            icon="exit"
            variant="ghost"
            style={styles.actionButton}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  levelInfo: {
    alignItems: "center",
  },
  levelName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  levelDescription: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.8)",
    marginTop: 2,
  },
  objectiveSection: {
    margin: 16,
    padding: 16,
    borderRadius: 12,
  },
  objectiveHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  objectiveTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  objectiveText: {
    fontSize: 14,
    lineHeight: 20,
  },
  statsSection: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  statItem: {
    flex: 1,
    marginHorizontal: 8,
  },
  dsSection: {
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  cardsSection: {
    marginBottom: 16,
  },
  cardsList: {
    paddingHorizontal: 16,
  },
  cardItem: {
    marginRight: 12,
  },
  choicesSection: {
    marginBottom: 16,
  },
  actionsSection: {
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 16,
    marginBottom: 32,
  },
  actionButton: {
    marginHorizontal: 8,
  },
});
