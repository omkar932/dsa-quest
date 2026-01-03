// src/types/navigation.ts
export type RootStackParamList = {
  Home: undefined;
  WorldMap: undefined;
  LevelSelect: { worldId: string };
  Game: { worldId: string; levelId: string };
  Result: {
    worldId: string;
    levelId: string;
    score: number;
    stars: number;
    xpEarned: number;
    newCards: string[];
    isNewBest: boolean;
  };
  Cards: undefined;
  Settings: undefined;
};
