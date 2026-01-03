import { AlgorithmCard } from "../../types/cards";

export const ALGORITHM_CARDS: AlgorithmCard[] = [
  // Searching Cards
  {
    id: "binary_search",
    name: "Binary Search",
    description:
      "Divide and conquer to find elements in sorted arrays. Reduces search complexity from O(n) to O(log n).",
    shortDescription: "Search sorted arrays efficiently",
    icon: "search-outline",
    rarity: "common",
    effect: {
      type: "reduce_complexity",
      value: 2,
      description: "Reduces search complexity by 2 levels",
    },
    applicableStructures: ["array"],
    applicableOperations: ["search", "find"],
    complexity: "O(log n)",
    level: 1,
    maxLevel: 5,
    xpToNextLevel: 100,
    currentXp: 0,
    unlockRequirement: {
      type: "level_complete",
      target: "arrays_3",
    },
    isUnlocked: false,
    color: "#3B82F6",
  },
  {
    id: "two_pointer",
    name: "Two Pointer",
    description:
      "Use two pointers moving toward each other or in same direction to solve array problems efficiently.",
    shortDescription: "Two pointers, one solution",
    icon: "git-compare-outline",
    rarity: "uncommon",
    effect: {
      type: "reduce_complexity",
      value: 1,
      description: "Reduces complexity by 1 level",
    },
    applicableStructures: ["array", "string", "linkedList"],
    applicableOperations: ["search", "find", "traverse"],
    complexity: "O(n)",
    level: 1,
    maxLevel: 5,
    xpToNextLevel: 150,
    currentXp: 0,
    unlockRequirement: {
      type: "level_complete",
      target: "arrays_5",
    },
    isUnlocked: false,
    color: "#8B5CF6",
  },
  {
    id: "sliding_window",
    name: "Sliding Window",
    description:
      "Maintain a window of elements that slides through the array. Perfect for subarray problems.",
    shortDescription: "Slide through subarrays",
    icon: "albums-outline",
    rarity: "uncommon",
    effect: {
      type: "reduce_complexity",
      value: 1,
      description: "Optimizes subarray operations",
    },
    applicableStructures: ["array", "string"],
    applicableOperations: ["search", "find"],
    complexity: "O(n)",
    level: 1,
    maxLevel: 5,
    xpToNextLevel: 150,
    currentXp: 0,
    unlockRequirement: {
      type: "level_complete",
      target: "arrays_7",
    },
    isUnlocked: false,
    color: "#EC4899",
  },
  {
    id: "hash_map",
    name: "Hash Map",
    description:
      "Store and retrieve data in O(1) time using key-value pairs. The ultimate lookup optimization.",
    shortDescription: "Instant lookups",
    icon: "grid-outline",
    rarity: "rare",
    effect: {
      type: "reduce_complexity",
      value: 3,
      description: "Reduces lookup to O(1)",
    },
    applicableStructures: ["array", "string"],
    applicableOperations: ["search", "find"],
    complexity: "O(1)",
    level: 1,
    maxLevel: 5,
    xpToNextLevel: 200,
    currentXp: 0,
    unlockRequirement: {
      type: "stars_earned",
      target: 15,
    },
    isUnlocked: false,
    color: "#10B981",
  },
  // Stack & Queue Cards
  {
    id: "monotonic_stack",
    name: "Monotonic Stack",
    description:
      'A stack that maintains elements in sorted order. Solves "next greater element" problems.',
    shortDescription: "Ordered stack magic",
    icon: "layers-outline",
    rarity: "rare",
    effect: {
      type: "reduce_complexity",
      value: 2,
      description: "Optimizes comparison operations",
    },
    applicableStructures: ["stack", "array"],
    applicableOperations: ["search", "find"],
    complexity: "O(n)",
    level: 1,
    maxLevel: 5,
    xpToNextLevel: 200,
    currentXp: 0,
    unlockRequirement: {
      type: "world_complete",
      target: "stackQueue",
    },
    isUnlocked: false,
    color: "#F59E0B",
  },
  // Tree Cards
  {
    id: "dfs",
    name: "Depth First Search",
    description:
      "Explore as far as possible along each branch before backtracking. Essential for tree/graph traversal.",
    shortDescription: "Go deep, then back",
    icon: "arrow-down-outline",
    rarity: "uncommon",
    effect: {
      type: "reduce_complexity",
      value: 1,
      description: "Efficient tree traversal",
    },
    applicableStructures: ["tree", "graph"],
    applicableOperations: ["traverse", "search", "find"],
    complexity: "O(n)",
    level: 1,
    maxLevel: 5,
    xpToNextLevel: 150,
    currentXp: 0,
    unlockRequirement: {
      type: "level_complete",
      target: "trees_1",
    },
    isUnlocked: false,
    color: "#6366F1",
  },
  {
    id: "bfs",
    name: "Breadth First Search",
    description:
      "Explore all neighbors at current depth before moving to next level. Perfect for shortest path.",
    shortDescription: "Level by level",
    icon: "swap-horizontal-outline",
    rarity: "uncommon",
    effect: {
      type: "reduce_complexity",
      value: 1,
      description: "Finds shortest paths",
    },
    applicableStructures: ["tree", "graph"],
    applicableOperations: ["traverse", "search", "find"],
    complexity: "O(n)",
    level: 1,
    maxLevel: 5,
    xpToNextLevel: 150,
    currentXp: 0,
    unlockRequirement: {
      type: "level_complete",
      target: "trees_3",
    },
    isUnlocked: false,
    color: "#0EA5E9",
  },
  // Sorting Cards
  {
    id: "quick_sort",
    name: "Quick Sort",
    description:
      "Divide array around pivot. Average O(n log n), but watch out for worst case!",
    shortDescription: "Pivot and conquer",
    icon: "flash-outline",
    rarity: "rare",
    effect: {
      type: "reduce_complexity",
      value: 2,
      description: "Efficient sorting",
    },
    applicableStructures: ["array"],
    applicableOperations: ["sort"],
    complexity: "O(n log n)",
    level: 1,
    maxLevel: 5,
    xpToNextLevel: 200,
    currentXp: 0,
    unlockRequirement: {
      type: "level_complete",
      target: "arrays_10",
    },
    isUnlocked: false,
    color: "#EF4444",
  },
  {
    id: "merge_sort",
    name: "Merge Sort",
    description:
      "Divide, sort, merge. Guaranteed O(n log n) always. Stable and reliable.",
    shortDescription: "Divide and merge",
    icon: "git-merge-outline",
    rarity: "rare",
    effect: {
      type: "reduce_complexity",
      value: 2,
      description: "Guaranteed efficient sort",
    },
    applicableStructures: ["array", "linkedList"],
    applicableOperations: ["sort"],
    complexity: "O(n log n)",
    level: 1,
    maxLevel: 5,
    xpToNextLevel: 200,
    currentXp: 0,
    unlockRequirement: {
      type: "level_complete",
      target: "arrays_12",
    },
    isUnlocked: false,
    color: "#8B5CF6",
  },
  // Graph Cards
  {
    id: "dijkstra",
    name: "Dijkstra's Algorithm",
    description:
      "Find shortest path from source to all vertices in a weighted graph.",
    shortDescription: "Shortest weighted paths",
    icon: "navigate-outline",
    rarity: "epic",
    effect: {
      type: "optimize",
      value: 3,
      description: "Optimal pathfinding",
    },
    applicableStructures: ["graph"],
    applicableOperations: ["traverse", "find"],
    complexity: "O(n log n)",
    level: 1,
    maxLevel: 5,
    xpToNextLevel: 300,
    currentXp: 0,
    unlockRequirement: {
      type: "world_complete",
      target: "graphs",
    },
    isUnlocked: false,
    color: "#F97316",
  },
  // DP Cards
  {
    id: "memoization",
    name: "Memoization",
    description:
      "Cache results of expensive function calls. Trade space for time.",
    shortDescription: "Remember & reuse",
    icon: "save-outline",
    rarity: "epic",
    effect: {
      type: "reduce_complexity",
      value: 4,
      description: "Dramatically reduces repeated work",
    },
    applicableStructures: ["array", "tree", "graph"],
    applicableOperations: ["traverse", "search", "find"],
    complexity: "O(n)",
    level: 1,
    maxLevel: 5,
    xpToNextLevel: 300,
    currentXp: 0,
    unlockRequirement: {
      type: "level_complete",
      target: "dp_1",
    },
    isUnlocked: false,
    color: "#A855F7",
  },
  {
    id: "greedy",
    name: "Greedy Choice",
    description:
      "Make the locally optimal choice at each step. Sometimes that leads to global optimum!",
    shortDescription: "Best choice now",
    icon: "trending-up-outline",
    rarity: "rare",
    effect: {
      type: "bonus_damage",
      value: 10,
      description: "Reduces damage from suboptimal choices",
    },
    applicableStructures: ["array", "graph"],
    applicableOperations: ["find", "traverse"],
    complexity: "O(n)",
    level: 1,
    maxLevel: 5,
    xpToNextLevel: 200,
    currentXp: 0,
    unlockRequirement: {
      type: "stars_earned",
      target: 30,
    },
    isUnlocked: false,
    color: "#22C55E",
  },
];

export function getCard(cardId: string): AlgorithmCard | undefined {
  return ALGORITHM_CARDS.find((card) => card.id === cardId);
}

export function getCardsByRarity(rarity: string): AlgorithmCard[] {
  return ALGORITHM_CARDS.filter((card) => card.rarity === rarity);
}

export function getUnlockedCards(unlockedIds: string[]): AlgorithmCard[] {
  return ALGORITHM_CARDS.filter((card) => unlockedIds.includes(card.id));
}
