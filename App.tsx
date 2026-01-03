import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { ProgressProvider } from "./src/context/ProgressContext";
import { HomeScreen } from "./src/screens/HomeScreen";
import { WorldMapScreen } from "./src/screens/WorldMapScreen";
import { LevelSelectScreen } from "./src/screens/LevelSelectScreen";
import { GameScreen } from "./src/screens/GameScreen";
import { ResultScreen } from "./src/screens/ResultScreen";
import { CardCollectionScreen } from "./src/screens/CardCollectionScreen";
import { SettingsScreen } from "./src/screens/SettingsScreen";
import { RootStackParamList } from "./src/types/navigation";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  React.useEffect(() => {
    try {
      const globalHandler = (global as any).ErrorUtils?.getGlobalHandler?.();
      (global as any).ErrorUtils?.setGlobalHandler?.(
        (error: any, isFatal: boolean) => {
          console.error("GlobalErrorHandler:", { error, isFatal });
          if (globalHandler) globalHandler(error, isFatal);
        }
      );
      return () => {
        if (globalHandler)
          (global as any).ErrorUtils?.setGlobalHandler?.(globalHandler);
      };
    } catch (e) {
      // ignore
    }
  }, []);
  return (
    <SafeAreaProvider>
      <ProgressProvider>
        <NavigationContainer>
          <StatusBar style="light" />
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: "#1a1a2e" },
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
    </SafeAreaProvider>
  );
}
