import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  Alert,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "../hooks/useTheme";
import { useProgress } from "../hooks/useProgress";
import { useThemeContext } from "../context/ThemeContext";
import { Button } from "../components/common/Button";
import { RootStackParamList } from "../types/navigation";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const SettingsScreen: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const { resetProgress } = useProgress();
  const { colorScheme, setColorScheme } = useThemeContext();

  const toggleTheme = () => {
    setColorScheme(colorScheme === "dark" ? "light" : "dark");
  };

  const handleResetProgress = () => {
    Alert.alert(
      "Reset Progress",
      "Are you sure you want to reset all your game progress? This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Reset",
          style: "destructive",
          onPress: () => {
            resetProgress();
            Alert.alert("Progress Reset", "Your game progress has been reset.");
            navigation.popToTop(); // Go back to Home Screen
          },
        },
      ]
    );
  };

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
            Settings
          </Text>
          <View style={{ width: 40 }} />
        </View>
      </LinearGradient>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Theme Settings */}
        <View
          style={[
            styles.settingSection,
            { backgroundColor: theme.colors.surface },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Appearance
          </Text>
          <View
            style={[
              styles.settingItem,
              { borderBottomColor: theme.colors.border },
            ]}
          >
            <Text style={[styles.settingLabel, { color: theme.colors.text }]}>
              Dark Mode
            </Text>
            <Switch
              trackColor={{
                false: theme.colors.surfaceVariant,
                true: theme.colors.primary.main,
              }}
              thumbColor={theme.colors.primary.contrast}
              ios_backgroundColor={theme.colors.surfaceVariant}
              onValueChange={toggleTheme}
              value={colorScheme === "dark"}
            />
          </View>
        </View>

        {/* Game Data Settings */}
        <View
          style={[
            styles.settingSection,
            { backgroundColor: theme.colors.surface },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Game Data
          </Text>
          <TouchableOpacity
            onPress={handleResetProgress}
            style={[
              styles.settingItem,
              { borderBottomColor: theme.colors.border },
            ]}
          >
            <Text style={[styles.settingLabel, { color: theme.colors.error }]}>
              Reset All Progress
            </Text>
            <Ionicons
              name="warning-outline"
              size={24}
              color={theme.colors.error}
            />
          </TouchableOpacity>
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
  settingSection: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  settingLabel: {
    fontSize: 16,
  },
});
