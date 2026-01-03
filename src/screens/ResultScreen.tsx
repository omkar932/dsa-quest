import React, { useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "../hooks/useTheme";
import { useHaptics } from "../hooks/useHaptics";
import { Button } from "../components/common/Button";
import { getLevel } from "../game/levels";
import { getCard } from "../game/algorithms/cards";
import { RootStackParamList } from "../types/navigation";

const { width } = Dimensions.get("window");

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type ResultScreenRouteProp = RouteProp<RootStackParamList, "Result">;

export const ResultScreen: React.FC = () => {
  const theme = useTheme();
  const haptics = useHaptics();
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<ResultScreenRouteProp>();
  const { levelId, result } = route.params;

  const level = getLevel("arrays", levelId); // For now, hardcoded world

  useEffect(() => {
    haptics.success();
  }, []);

  const getStarIcons = (stars: number) => {
    return Array(3)
      .fill(0)
      .map((_, i) => (
        <Ionicons
          key={i}
          name={i < stars ? "star" : "star-outline"}
          size={32}
          color="#FBBF24"
        />
      ));
  };

  const getEfficiencyColor = (rating: number): string => {
    if (rating >= 90) return "#10B981";
    if (rating >= 70) return "#3B82F6";
    if (rating >= 50) return "#F59E0B";
    return "#EF4444";
  };

  const getPerformanceMessage = (stars: number, efficiency: number): string => {
    if (stars === 3 && efficiency >= 90) {
      return "Perfect! Masterful execution of optimal algorithms!";
    }
    if (stars === 3) {
      return "Excellent work! You achieved the maximum stars.";
    }
    if (stars === 2) {
      return "Good job! Try to optimize your approach for 3 stars.";
    }
    return "Nice attempt! Review the algorithms and try again.";
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Result Header */}
        <LinearGradient
          colors={["#6C63FF", "#3B36C1"]}
          style={styles.resultHeader}
        >
          <Text style={styles.resultTitle}>Level Complete!</Text>
          <View style={styles.starsContainer}>
            {getStarIcons(result.stars)}
          </View>
          <Text style={styles.performanceMessage}>
            {getPerformanceMessage(result.stars, result.efficiencyRating)}
          </Text>
        </LinearGradient>

        {/* Score Summary */}
        <View
          style={[
            styles.scoreSection,
            { backgroundColor: theme.colors.surface },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Score Summary
          </Text>

          <View style={styles.scoreGrid}>
            <View style={styles.scoreItem}>
              <Ionicons name="trophy" size={24} color="#FBBF24" />
              <Text style={[styles.scoreValue, { color: theme.colors.text }]}>
                {result.score}
              </Text>
              <Text
                style={[
                  styles.scoreLabel,
                  { color: theme.colors.textSecondary },
                ]}
              >
                Score
              </Text>
            </View>

            <View style={styles.scoreItem}>
              <Ionicons name="flash" size={24} color="#10B981" />
              <Text style={[styles.scoreValue, { color: theme.colors.text }]}>
                {result.steps}
              </Text>
              <Text
                style={[
                  styles.scoreLabel,
                  { color: theme.colors.textSecondary },
                ]}
              >
                Steps
              </Text>
            </View>

            <View style={styles.scoreItem}>
              <Ionicons name="heart" size={24} color="#EF4444" />
              <Text style={[styles.scoreValue, { color: theme.colors.text }]}>
                {result.healthRemaining}
              </Text>
              <Text
                style={[
                  styles.scoreLabel,
                  { color: theme.colors.textSecondary },
                ]}
              >
                Health Left
              </Text>
            </View>

            <View style={styles.scoreItem}>
              <Ionicons
                name="speedometer"
                size={24}
                color={getEfficiencyColor(result.efficiencyRating)}
              />
              <Text
                style={[
                  styles.scoreValue,
                  { color: getEfficiencyColor(result.efficiencyRating) },
                ]}
              >
                {result.efficiencyRating}%
              </Text>
              <Text
                style={[
                  styles.scoreLabel,
                  { color: theme.colors.textSecondary },
                ]}
              >
                Efficiency
              </Text>
            </View>
          </View>
        </View>

        {/* Rewards */}
        {(result.xpEarned > 0 || result.newCardsUnlocked.length > 0) && (
          <View
            style={[
              styles.rewardsSection,
              { backgroundColor: theme.colors.surface },
            ]}
          >
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Rewards Earned
            </Text>

            <View style={styles.rewardsList}>
              {result.xpEarned > 0 && (
                <View style={styles.rewardItem}>
                  <LinearGradient
                    colors={["#8B5CF6", "#7C3AED"]}
                    style={styles.rewardIcon}
                  >
                    <Ionicons name="star" size={20} color="#FFFFFF" />
                  </LinearGradient>
                  <View style={styles.rewardContent}>
                    <Text
                      style={[styles.rewardTitle, { color: theme.colors.text }]}
                    >
                      {result.xpEarned} XP
                    </Text>
                    <Text
                      style={[
                        styles.rewardDescription,
                        { color: theme.colors.textSecondary },
                      ]}
                    >
                      Experience points earned
                    </Text>
                  </View>
                </View>
              )}

              {result.newCardsUnlocked.map((cardId: string, index: number) => {
                const card = getCard(cardId);
                if (!card) return null;

                return (
                  <View key={cardId} style={styles.rewardItem}>
                    <LinearGradient
                      colors={[card.color, card.color + "CC"]}
                      style={styles.rewardIcon}
                    >
                      <Ionicons
                        name={card.icon as any}
                        size={20}
                        color="#FFFFFF"
                      />
                    </LinearGradient>
                    <View style={styles.rewardContent}>
                      <Text
                        style={[
                          styles.rewardTitle,
                          { color: theme.colors.text },
                        ]}
                      >
                        {card.name} Card
                      </Text>
                      <Text
                        style={[
                          styles.rewardDescription,
                          { color: theme.colors.textSecondary },
                        ]}
                      >
                        {card.shortDescription}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        )}

        {/* Efficiency Analysis */}
        <View
          style={[
            styles.analysisSection,
            { backgroundColor: theme.colors.surface },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Efficiency Analysis
          </Text>

          <View style={styles.analysisItem}>
            <Text
              style={[
                styles.analysisLabel,
                { color: theme.colors.textSecondary },
              ]}
            >
              Your Steps
            </Text>
            <Text style={[styles.analysisValue, { color: theme.colors.text }]}>
              {result.steps}
            </Text>
          </View>

          <View style={styles.analysisItem}>
            <Text
              style={[
                styles.analysisLabel,
                { color: theme.colors.textSecondary },
              ]}
            >
              Optimal Steps
            </Text>
            <Text style={[styles.analysisValue, { color: "#10B981" }]}>
              {result.optimalSteps}
            </Text>
          </View>

          <View style={styles.analysisItem}>
            <Text
              style={[
                styles.analysisLabel,
                { color: theme.colors.textSecondary },
              ]}
            >
              Efficiency Rating
            </Text>
            <View style={styles.efficiencyBar}>
              <View
                style={[
                  styles.efficiencyBarFill,
                  {
                    width: `${result.efficiencyRating}%`,
                    backgroundColor: getEfficiencyColor(
                      result.efficiencyRating
                    ),
                  },
                ]}
              />
            </View>
            <Text
              style={[
                styles.analysisValue,
                { color: getEfficiencyColor(result.efficiencyRating) },
              ]}
            >
              {result.efficiencyRating}%
            </Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsSection}>
          <Button
            title="Play Again"
            onPress={() =>
              navigation.navigate("Game", { levelId, worldId: "arrays" })
            }
            icon="refresh"
            size="large"
            variant="primary"
            style={styles.actionButton}
          />

          <Button
            title="Next Level"
            onPress={() => {
              // TODO: Navigate to next level
              navigation.navigate("WorldMap");
            }}
            icon="arrow-forward"
            size="large"
            variant="secondary"
            style={styles.actionButton}
          />

          <Button
            title="World Map"
            onPress={() => navigation.navigate("WorldMap")}
            icon="map"
            size="large"
            variant="outline"
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
  resultHeader: {
    paddingVertical: 48,
    paddingHorizontal: 24,
    alignItems: "center",
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  resultTitle: {
    fontSize: 32,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 16,
  },
  starsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 16,
  },
  performanceMessage: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.9)",
    textAlign: "center",
    lineHeight: 24,
  },
  scoreSection: {
    marginTop: -32,
    marginHorizontal: 16,
    padding: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 20,
  },
  scoreGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  scoreItem: {
    width: "48%",
    alignItems: "center",
    marginBottom: 20,
  },
  scoreValue: {
    fontSize: 28,
    fontWeight: "700",
    marginTop: 8,
  },
  scoreLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  rewardsSection: {
    marginHorizontal: 16,
    marginTop: 16,
    padding: 20,
    borderRadius: 20,
  },
  rewardsList: {
    gap: 12,
  },
  rewardItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  rewardIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  rewardContent: {
    flex: 1,
  },
  rewardTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  rewardDescription: {
    fontSize: 14,
    marginTop: 2,
  },
  analysisSection: {
    marginHorizontal: 16,
    marginTop: 16,
    padding: 20,
    borderRadius: 20,
  },
  analysisItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  analysisLabel: {
    fontSize: 16,
    flex: 1,
  },
  analysisValue: {
    fontSize: 16,
    fontWeight: "600",
  },
  efficiencyBar: {
    flex: 1,
    height: 8,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    borderRadius: 4,
    overflow: "hidden",
    marginHorizontal: 12,
  },
  efficiencyBarFill: {
    height: "100%",
    borderRadius: 4,
  },
  actionsSection: {
    padding: 24,
    paddingTop: 32,
  },
  actionButton: {
    marginBottom: 12,
  },
});
