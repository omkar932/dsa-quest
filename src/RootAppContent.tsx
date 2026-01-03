import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { ProgressProvider } from "./context/ProgressContext";
import { HomeScreen } from "./screens/HomeScreen";
import { WorldMapScreen } from "./screens/WorldMapScreen";
import { LevelSelectScreen } from "./screens/LevelSelectScreen";
import { GameScreen } from "./screens/GameScreen";
import { ResultScreen } from "./screens/ResultScreen";
import { CardCollectionScreen } from "./screens/CardCollectionScreen";
import { SettingsScreen } from "./screens/SettingsScreen";
import { RootStackParamList } from "./types/navigation";
import { useTheme } from "./hooks/useTheme";
import { SafeAreaProvider } from "react-native-safe-area-context";

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootAppContent: React.FC = () => {
  const theme = useTheme(); // Now useTheme is called inside the ThemeProvider's children

  return (
    <ProgressProvider>
      <NavigationContainer>
        <StatusBar style={theme.scheme === "dark" ? "light" : "dark"} />
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: theme.colors.background },
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="WorldMap" component={WorldMapScreen} />
          <Stack.Screen name="LevelSelect" component={LevelSelectScreen} />
          <Stack.Screen name="Game" component={GameScreen} />
          <Stack.Screen name="Result" component={ResultScreen} />
          <Stack.Screen name="Cards" component={CardCollectionScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ProgressProvider>
  );
};
