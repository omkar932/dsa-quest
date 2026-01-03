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

  const {
    levelId,
    stars = 0,
    efficiencyRating = 0,
    score = 0,
    steps = 0,
    healthRemaining = 0,
    xpEarned = 0,
    optimalSteps = 0,
    worldId,
    newCardsUnlocked,
  } = route.params ?? {};

  /** ✅ SAFETY: normalize arrays */
  const safeNewCards = Array.isArray(newCardsUnlocked) ? newCardsUnlocked : [];

  const level = worldId && levelId ? getLevel(worldId, levelId) : null;

  useEffect(() => {
    haptics.success();
  }, []);

  const getStarIcons = (count: number) =>
    Array(3)
      .fill(0)
      .map((_, i) => (
        <Ionicons
          key={i}
          name={i < count ? "star" : "star-outline"}
          size={32}
          color="#FBBF24"
        />
      ));

  const getEfficiencyColor = (rating: number) => {
    if (rating >= 90) return "#10B981";
    if (rating >= 70) return "#3B82F6";
    if (rating >= 50) return "#F59E0B";
    return "#EF4444";
  };

  const getPerformanceMessage = (s: number, e: number) => {
    if (s === 3 && e >= 90) return "Perfect! Masterful execution!";
    if (s === 3) return "Excellent work!";
    if (s === 2) return "Good job! Try to optimize further.";
    return "Nice attempt! Review and try again.";
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <LinearGradient
          colors={[theme.colors.primary.main, theme.colors.primary.dark]}
          style={styles.resultHeader}
        >
          <Text
            style={[
              styles.resultTitle,
              { color: theme.colors.primary.contrast },
            ]}
          >
            Level Complete!
          </Text>

          <View style={styles.starsContainer}>{getStarIcons(stars)}</View>

          <Text
            style={[
              styles.performanceMessage,
              { color: theme.colors.primary.contrast },
            ]}
          >
            {getPerformanceMessage(stars, efficiencyRating)}
          </Text>
        </LinearGradient>

        {/* SCORE */}
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
            {[
              {
                icon: "trophy",
                value: score,
                label: "Score",
                color: "#FBBF24",
              },
              { icon: "flash", value: steps, label: "Steps", color: "#10B981" },
              {
                icon: "heart",
                value: healthRemaining,
                label: "Health",
                color: "#EF4444",
              },
              {
                icon: "speedometer",
                value: `${efficiencyRating}%`,
                label: "Efficiency",
                color: getEfficiencyColor(efficiencyRating),
              },
            ].map((item, i) => (
              <View key={i} style={styles.scoreItem}>
                <Ionicons
                  name={item.icon as any}
                  size={24}
                  color={item.color}
                />
                <Text style={[styles.scoreValue, { color: theme.colors.text }]}>
                  {item.value}
                </Text>
                <Text
                  style={[
                    styles.scoreLabel,
                    { color: theme.colors.textSecondary },
                  ]}
                >
                  {item.label}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* REWARDS */}
        {(xpEarned > 0 || safeNewCards.length > 0) && (
          <View
            style={[
              styles.rewardsSection,
              { backgroundColor: theme.colors.surface },
            ]}
          >
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Rewards Earned
            </Text>

            {xpEarned > 0 && (
              <View style={styles.rewardItem}>
                <View
                  style={[
                    styles.rewardIcon,
                    { backgroundColor: theme.colors.primary.main },
                  ]}
                >
                  <Ionicons
                    name="star"
                    size={20}
                    color={theme.colors.primary.contrast}
                  />
                </View>
                <Text
                  style={[styles.rewardTitle, { color: theme.colors.text }]}
                >
                  {xpEarned} XP
                </Text>
              </View>
            )}

            {safeNewCards.map((cardId: string) => {
              const card = getCard(cardId);
              if (!card) return null;

              return (
                <View key={cardId} style={styles.rewardItem}>
                  <View
                    style={[styles.rewardIcon, { backgroundColor: card.color }]}
                  >
                    <Ionicons
                      name={(card.icon || "help-circle") as any}
                      size={20}
                      color="#fff"
                    />
                  </View>
                  <Text
                    style={[styles.rewardTitle, { color: theme.colors.text }]}
                  >
                    {card.name} Card
                  </Text>
                </View>
              );
            })}
          </View>
        )}

        {/* ACTIONS */}
        <View style={styles.actionsSection}>
          <Button
            title="Play Again"
            icon="refresh"
            size="large"
            variant="primary"
            onPress={() => navigation.navigate("Game", { levelId, worldId })}
          />

          <Button
            title="World Map"
            icon="map"
            size="large"
            variant="outline"
            onPress={() => navigation.navigate("WorldMap")}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  resultHeader: {
    paddingVertical: 48,
    alignItems: "center",
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  resultTitle: { fontSize: 32, fontWeight: "800", marginBottom: 16 },
  starsContainer: { flexDirection: "row", gap: 8, marginBottom: 16 },
  performanceMessage: { fontSize: 16, textAlign: "center" },

  scoreSection: {
    marginTop: -32,
    margin: 16,
    padding: 20,
    borderRadius: 20,
  },
  sectionTitle: { fontSize: 18, fontWeight: "600", marginBottom: 20 },
  scoreGrid: { flexDirection: "row", flexWrap: "wrap" },
  scoreItem: { width: "50%", alignItems: "center", marginBottom: 20 },
  scoreValue: { fontSize: 28, fontWeight: "700" },
  scoreLabel: { fontSize: 12 },

  rewardsSection: { margin: 16, padding: 20, borderRadius: 20 },
  rewardItem: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  rewardIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  rewardTitle: { fontSize: 16, fontWeight: "600" },

  actionsSection: { padding: 24 },
});
