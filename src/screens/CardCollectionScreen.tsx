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
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "../hooks/useTheme";
import { useProgress } from "../hooks/useProgress";
import { RootStackParamList } from "../types/navigation";
import { Button } from "../components/common/Button";
import { AlgorithmCardComponent } from "../components/game/AlgorithmCard";
import { getCard } from "../game/algorithms/cards";

const { width } = Dimensions.get("window");

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const CardCollectionScreen: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const { progress } = useProgress();

  const unlockedCardsData = progress.unlockedCards
    .map((cardId) => getCard(cardId))
    .filter(Boolean); // Filter out any undefined cards

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      {/* Header */}
      <LinearGradient
        colors={[theme.colors.primary.main, theme.colors.primary.dark]}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Button
            title=""
            onPress={() => navigation.goBack()}
            icon="arrow-back"
            variant="ghost"
            size="small"
            textStyle={{ color: theme.colors.primary.contrast }}
          />
          <Text
            style={[
              styles.headerTitle,
              { color: theme.colors.primary.contrast },
            ]}
          >
            Card Collection
          </Text>
          <View style={{ width: 40 }} />
        </View>
      </LinearGradient>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {unlockedCardsData.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons
              name="information-circle-outline"
              size={60}
              color={theme.colors.textSecondary}
            />
            <Text
              style={[styles.emptyText, { color: theme.colors.textSecondary }]}
            >
              No cards collected yet. Complete levels to unlock new cards!
            </Text>
          </View>
        ) : (
          <View style={styles.cardsGrid}>
            {unlockedCardsData.map((card: any) => (
              <View key={card.id} style={styles.cardWrapper}>
                <AlgorithmCardComponent card={card} size="medium" />
              </View>
            ))}
          </View>
        )}
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
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
  },
  scrollContent: {
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 50,
  },
  emptyText: {
    marginTop: 20,
    fontSize: 18,
    textAlign: "center",
  },
  cardsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  cardWrapper: {
    width: (width - 48) / 2, // Adjust for padding and spacing
    marginBottom: 16,
  },
});
