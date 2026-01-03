import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "../hooks/useTheme";
import { useProgress } from "../hooks/useProgress";
import { getWorld } from "../game/levels";
import { Button } from "../components/common/Button";
import { LevelNode } from "../components/world/LevelNode";
import { RootStackParamList } from "../types/navigation";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type LevelSelectRouteProp = RouteProp<RootStackParamList, "LevelSelect">;

export const LevelSelectScreen: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<LevelSelectRouteProp>();
  const { worldId } = route.params;
  const { getLevelProgress, isLevelUnlocked } = useProgress();

  const world = getWorld(worldId);

  if (!world) {
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.colors.background }]}
      >
        <Text style={{ color: theme.colors.text }}>World not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient
          colors={[world.color, world.color + "CC"]}
          style={styles.header}
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

            <View style={styles.worldInfo}>
              <View style={styles.worldIconContainer}>
                <Ionicons name={world.icon as any} size={32} color="#FFFFFF" />
              </View>
              <View>
                <Text style={styles.worldName}>{world.name}</Text>
                <Text style={styles.worldDescription}>{world.description}</Text>
              </View>
            </View>

            <View style={{ width: 40 }} />
          </View>
        </LinearGradient>

        {/* Progress Overview */}
        <View
          style={[
            styles.progressSection,
            { backgroundColor: theme.colors.surface },
          ]}
        >
          <View style={styles.progressStats}>
            <View style={styles.progressStat}>
              <Ionicons name="trophy" size={20} color="#FBBF24" />
              <Text
                style={[styles.progressValue, { color: theme.colors.text }]}
              >
                0/{world.levels.length * 3}
              </Text>
              <Text
                style={[
                  styles.progressLabel,
                  { color: theme.colors.textSecondary },
                ]}
              >
                Total Stars
              </Text>
            </View>
            <View style={styles.progressStat}>
              <Ionicons name="checkmark-circle" size={20} color="#10B981" />
              <Text
                style={[styles.progressValue, { color: theme.colors.text }]}
              >
                0/{world.levels.length}
              </Text>
              <Text
                style={[
                  styles.progressLabel,
                  { color: theme.colors.textSecondary },
                ]}
              >
                Levels Complete
              </Text>
            </View>
          </View>
        </View>

        {/* Levels Grid */}
        <View style={styles.levelsSection}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Levels
          </Text>

          <View style={styles.levelsGrid}>
            {world.levels.map((level) => {
              const progress = getLevelProgress(worldId, level.id);
              const isUnlocked = isLevelUnlocked(
                worldId,
                level.id,
                level.order
              );

              return (
                <LevelNode
                  key={level.id}
                  level={level}
                  progress={progress}
                  isUnlocked={isUnlocked}
                  onPress={() => {
                    if (isUnlocked) {
                      navigation.navigate("Game", {
                        levelId: level.id,
                        worldId,
                      });
                    }
                  }}
                />
              );
            })}
          </View>
        </View>

        {/* World Tips */}
        <View
          style={[
            styles.tipsSection,
            { backgroundColor: theme.colors.surface },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            World Tips
          </Text>

          <View style={styles.tipsList}>
            <View style={styles.tipItem}>
              <Ionicons
                name="information-circle"
                size={20}
                color={world.color}
              />
              <Text style={[styles.tipText, { color: theme.colors.text }]}>
                This world focuses on {world.dataStructure} operations
              </Text>
            </View>

            <View style={styles.tipItem}>
              <Ionicons name="bulb" size={20} color={world.color} />
              <Text style={[styles.tipText, { color: theme.colors.text }]}>
                Watch your health - suboptimal choices deal damage
              </Text>
            </View>

            <View style={styles.tipItem}>
              <Ionicons name="card" size={20} color={world.color} />
              <Text style={[styles.tipText, { color: theme.colors.text }]}>
                Equip relevant algorithm cards before starting levels
              </Text>
            </View>
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
  worldInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  worldIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  worldName: {
    fontSize: 24,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  worldDescription: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.9)",
    marginTop: 4,
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
  progressStats: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  progressStat: {
    alignItems: "center",
  },
  progressValue: {
    fontSize: 24,
    fontWeight: "700",
    marginTop: 8,
  },
  progressLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  levelsSection: {
    padding: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
  },
  levelsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  tipsSection: {
    marginHorizontal: 16,
    marginBottom: 32,
    padding: 20,
    borderRadius: 20,
  },
  tipsList: {
    gap: 12,
  },
  tipItem: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  tipText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 14,
    lineHeight: 20,
  },
});
