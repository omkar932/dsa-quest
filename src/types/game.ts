export type Complexity =
  | "O(1)"
  | "O(log n)"
  | "O(n)"
  | "O(n log n)"
  | "O(n²)"
  | "O(2ⁿ)";

export type DataStructureType =
  | "array"
  | "string"
  | "stack"
  | "queue"
  | "linkedList"
  | "tree"
  | "graph"
  | "heap";

export type OperationType =
  | "search"
  | "insert"
  | "delete"
  | "sort"
  | "traverse"
  | "find"
  | "swap"
  | "merge"
  | "split";

export interface GameState {
  currentHealth: number;
  maxHealth: number;
  steps: number;
  optimalSteps: number;
  score: number;
  isComplete: boolean;
  isFailed: boolean;
  dataState: any;
  selectedCard: string | null;
  moveHistory: GameMove[];
}

export interface GameMove {
  action: string;
  complexity: Complexity;
  damage: number;
  timestamp: number;
  wasOptimal: boolean;
}

export interface GameResult {
  completed: boolean;
  stars: 1 | 2 | 3;
  score: number;
  steps: number;
  optimalSteps: number;
  healthRemaining: number;
  efficiencyRating: number;
  newCardsUnlocked: string[];
  xpEarned: number;
}
