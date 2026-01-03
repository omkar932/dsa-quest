import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useTheme } from "../hooks/useTheme";
import { useProgress } from "../hooks/useProgress";
import { WORLDS } from "../game/levels";
import { RootStackParamList } from "../types/navigation";
import { WorldCard } from "../components/world/WorldCard";
import { Button } from "../components/common/Button";

const { width } = Dimensions.get("window");

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const WorldMapScreen: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const { progress, totalStars } = useProgress();

  const getWorldProgress = (worldId: string) => {
    const world = progress.worlds[worldId];
    if (!world) return { completed: 0, total: 0, stars: 0 };

    const completedLevels = Object.values(world.levels).filter(
      (l) => l.completed
    ).length;
    const totalLevels =
      WORLDS.find((w) => w.id === worldId)?.levels.length || 0;

    return {
      completed: completedLevels,
      total: totalLevels,
      stars: world.totalStars || 0,
    };
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient
          colors={[theme.colors.primary.main, theme.colors.primary.dark]}
          style={styles.header}
        >
          <View style={styles.headerContent}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <Ionicons
                name="arrow-back"
                size={24}
                color={theme.colors.primary.contrast}
              />
            </TouchableOpacity>
            <Text style={[styles.headerTitle, { color: theme.colors.primary.contrast }]}>
              World Map
            </Text>
            <View
              style={[
                styles.starsContainer,
                {
                  backgroundColor: theme.colors.primary.contrastTransparent,
                },
              ]}
            >
              <Ionicons
                name="trophy"
                size={20}
                color={theme.colors.accent.warning}
              />
              <Text
                style={[styles.starsText, { color: theme.colors.primary.contrast }]}
              >
                {totalStars}
              </Text>
            </View>
          </View>
        </LinearGradient>

        {/* Progress Overview */}
        <View
          style={[
            styles.progressSection,
            { backgroundColor: theme.colors.surface },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Your Journey
          </Text>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressBarBackground,
                { backgroundColor: theme.colors.surfaceVariant },
              ]}
            >
              <View
                style={[
                  styles.progressBarFill,
                  {
                    width: `${Math.min(100, (totalStars / 200) * 100)}%`,
                    backgroundColor: theme.colors.primary.main,
                  },
                ]}
              />
            </View>
            <Text
              style={[
                styles.progressText,
                { color: theme.colors.textSecondary },
              ]}
            >
              {totalStars} / 200 stars to complete all worlds
            </Text>
          </View>
        </View>

        {/* Worlds Grid */}
        <View style={styles.worldsSection}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Choose Your World
          </Text>

          <View style={styles.worldsGrid}>
            {WORLDS.map((world) => {
              const worldProgress = getWorldProgress(world.id);
              const isUnlocked = totalStars >= world.requiredStars;

              return (
                <WorldCard
                  key={world.id}
                  world={world}
                  progress={worldProgress}
                  isUnlocked={isUnlocked}
                  onPress={() => {
                    if (isUnlocked) {
                      navigation.navigate("LevelSelect", { worldId: world.id });
                    }
                  }}
                />
              );
            })}
          </View>
        </View>

        {/* World Progression Path */}
        <View
          style={[
            styles.pathSection,
            { backgroundColor: theme.colors.surface },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Progression Path
          </Text>

          <View style={styles.pathContainer}>
            {WORLDS.map((world, index) => (
              <React.Fragment key={world.id}>
                <View style={styles.pathNode}>
                  <View
                    style={[
                      styles.pathNodeIcon,
                      { backgroundColor: world.color },
                      totalStars >= world.requiredStars &&
                        styles.pathNodeUnlocked,
                    ]}
                  >
                    <Ionicons
                      name={world.icon as any}
                      size={20}
                      color={theme.colors.primary.contrast}
                    />
                  </View>
                  <Text
                    style={[styles.pathNodeName, { color: theme.colors.text }]}
                  >
                    {world.name}
                  </Text>
                  <Text
                    style={[
                      styles.pathNodeRequirement,
                      { color: theme.colors.textSecondary },
                    ]}
                  >
                    {world.requiredStars} stars
                  </Text>
                </View>

                {index < WORLDS.length - 1 && (
                  <View
                    style={[
                      styles.pathLine,
                      { backgroundColor: theme.colors.surfaceVariant },
                    ]}
                  >
                    <View
                      style={[
                        styles.pathLineFill,
                        {
                          width:
                            totalStars >= world.requiredStars ? "100%" : "0%",
                          backgroundColor: theme.colors.primary.main,
                        },
                      ]}
                    />
                  </View>
                )}
              </React.Fragment>
            ))}
          </View>
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
    paddingVertical: 24,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
  },
  starsContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  starsText: {
    fontWeight: "600",
    marginLeft: 4,
  },
  progressSection: {
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
    marginBottom: 16,
  },
  progressBar: {
    marginTop: 8,
  },
  progressBarBackground: {
    height: 8,
    borderRadius: 4,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    marginTop: 8,
  },
  worldsSection: {
    padding: 24,
  },
  worldsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  pathSection: {
    marginHorizontal: 16,
    marginBottom: 32,
    padding: 20,
    borderRadius: 20,
  },
  pathContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  pathNode: {
    alignItems: "center",
    width: 80,
    marginBottom: 16,
  },
  pathNodeIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.7,
  },
  pathNodeUnlocked: {
    opacity: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  pathNodeName: {
    fontSize: 12,
    fontWeight: "600",
    marginTop: 8,
    textAlign: "center",
  },
  pathNodeRequirement: {
    fontSize: 10,
    marginTop: 2,
  },
  pathLine: {
    height: 4,
    flex: 1,
    borderRadius: 2,
    marginHorizontal: 8,
    overflow: "hidden",
  },
  pathLineFill: {
    height: "100%",
  },
});
