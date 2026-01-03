import { Complexity, DataStructureType, OperationType } from "./game";

export interface World {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  dataStructure: DataStructureType;
  levels: Level[];
  isLocked: boolean;
  requiredStars: number;
  isBossWorld: boolean;
}

export interface Level {
  id: string;
  worldId: string;
  order: number;
  name: string;
  description: string;
  objective: string;
  difficulty: "easy" | "medium" | "hard" | "boss";

  // Initial game state
  initialState: LevelInitialState;

  // Available choices/operations
  choices: LevelChoice[];

  // Win condition
  winCondition: WinCondition;

  // Scoring
  optimalSteps: number;
  parTime: number; // seconds

  // Hints
  hints: string[];

  // Algorithm cards that help
  recommendedCards: string[];

  // Rewards
  starThresholds: StarThresholds;
  xpReward: number;
  cardReward?: string;

  // Is this a premium level?
  isPremium: boolean;
}

export interface LevelInitialState {
  dataStructure: DataStructureType;
  data: any;
  target?: any;
  constraints?: Record<string, any>;
}

export interface LevelChoice {
  id: string;
  label: string;
  description: string;
  icon: string;
  complexity: Complexity;
  action: ChoiceAction;
  isOptimal: boolean;
  requiredCard?: string;
}

export interface ChoiceAction {
  type: OperationType;
  params?: Record<string, any>;
  animation?: AnimationType;
}

export type AnimationType =
  | "highlight"
  | "swap"
  | "insert"
  | "remove"
  | "traverse"
  | "compare"
  | "merge";

export interface WinCondition {
  type: "find" | "sort" | "transform" | "traverse" | "optimize" | "construct";
  target: any;
  validator: (state: any) => boolean;
}

export interface StarThresholds {
  three: { maxSteps: number; minHealth: number };
  two: { maxSteps: number; minHealth: number };
  one: { maxSteps: number; minHealth: number };
}
