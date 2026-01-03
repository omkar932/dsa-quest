import { Level } from "../../types/levels";

export const WORLD1_ARRAYS: Level[] = [
  {
    id: "arrays_1",
    worldId: "arrays",
    order: 1,
    name: "First Steps",
    description: "Learn the basics of array traversal",
    objective: "Find the number 7 in the array",
    difficulty: "easy",

    initialState: {
      dataStructure: "array",
      data: {
        elements: [
          { value: 3, isHighlighted: false },
          { value: 8, isHighlighted: false },
          { value: 1, isHighlighted: false },
          { value: 7, isHighlighted: false },
          { value: 4, isHighlighted: false },
        ],
        target: 7,
      },
    },

    choices: [
      {
        id: "linear_search",
        label: "Linear Search",
        description: "Check each element one by one from the start",
        icon: "arrow-forward-outline",
        complexity: "O(n)",
        action: {
          type: "search",
          params: { index: 3 },
          animation: "traverse",
        },
        isOptimal: true,
      },
      {
        id: "random_guess",
        label: "Random Guess",
        description: "Pick a random position and check",
        icon: "shuffle-outline",
        complexity: "O(n)",
        action: {
          type: "search",
          params: { index: Math.floor(Math.random() * 5) },
          animation: "highlight",
        },
        isOptimal: false,
      },
      {
        id: "check_all",
        label: "Check All Pairs",
        description: "Compare every element with every other element",
        icon: "git-compare-outline",
        complexity: "O(n²)",
        action: {
          type: "search",
          params: { index: 3 },
          animation: "compare",
        },
        isOptimal: false,
      },
    ],

    winCondition: {
      type: "find",
      target: 7,
      validator: (state) => {
        return state.elements.some((el: any) => el.value === 7 && el.isFound);
      },
    },

    optimalSteps: 1,
    parTime: 30,

    hints: [
      "In an unsorted array, we need to check elements one by one",
      "Linear search is the simplest approach here",
      "The target is at index 3",
    ],

    recommendedCards: [],

    starThresholds: {
      three: { maxSteps: 1, minHealth: 80 },
      two: { maxSteps: 2, minHealth: 50 },
      one: { maxSteps: 5, minHealth: 1 },
    },

    xpReward: 50,
    isPremium: false,
  },
  {
    id: "arrays_2",
    worldId: "arrays",
    order: 2,
    name: "Sorted Advantage",
    description: "Use the power of sorted arrays",
    objective: "Find number 42 in the sorted array with minimum damage",
    difficulty: "easy",

    initialState: {
      dataStructure: "array",
      data: {
        elements: [
          { value: 5, isHighlighted: false },
          { value: 12, isHighlighted: false },
          { value: 23, isHighlighted: false },
          { value: 34, isHighlighted: false },
          { value: 42, isHighlighted: false },
          { value: 56, isHighlighted: false },
          { value: 67, isHighlighted: false },
          { value: 89, isHighlighted: false },
        ],
        target: 42,
        isSorted: true,
      },
    },

    choices: [
      {
        id: "binary_search",
        label: "Binary Search",
        description: "Divide the array in half each time",
        icon: "git-branch-outline",
        complexity: "O(log n)",
        action: {
          type: "search",
          params: { index: 4 },
          animation: "highlight",
        },
        isOptimal: true,
        requiredCard: "binary_search",
      },
      {
        id: "linear_search",
        label: "Linear Search",
        description: "Check each element from the start",
        icon: "arrow-forward-outline",
        complexity: "O(n)",
        action: {
          type: "search",
          params: { index: 4 },
          animation: "traverse",
        },
        isOptimal: false,
      },
      {
        id: "check_all",
        label: "Check Every Element Twice",
        description: "Double check everything",
        icon: "repeat-outline",
        complexity: "O(n²)",
        action: {
          type: "search",
          params: { index: 4 },
          animation: "compare",
        },
        isOptimal: false,
      },
    ],

    winCondition: {
      type: "find",
      target: 42,
      validator: (state) => {
        return state.elements.some((el: any) => el.value === 42 && el.isFound);
      },
    },

    optimalSteps: 1,
    parTime: 20,

    hints: [
      "This array is sorted! You can use that to your advantage",
      "Binary search divides the search space in half each time",
      "If you have the Binary Search card, use it!",
    ],

    recommendedCards: ["binary_search"],

    starThresholds: {
      three: { maxSteps: 1, minHealth: 90 },
      two: { maxSteps: 2, minHealth: 70 },
      one: { maxSteps: 4, minHealth: 1 },
    },

    xpReward: 75,
    cardReward: "binary_search",
    isPremium: false,
  },
  {
    id: "arrays_3",
    worldId: "arrays",
    order: 3,
    name: "Two Sum Challenge",
    description: "Find two numbers that add up to the target",
    objective: "Find two numbers that sum to 15",
    difficulty: "medium",

    initialState: {
      dataStructure: "array",
      data: {
        elements: [
          { value: 2, isHighlighted: false },
          { value: 7, isHighlighted: false },
          { value: 11, isHighlighted: false },
          { value: 8, isHighlighted: false },
          { value: 4, isHighlighted: false },
          { value: 9, isHighlighted: false },
        ],
        target: 15,
        findPair: true,
      },
    },

    choices: [
      {
        id: "hash_map",
        label: "Hash Map Lookup",
        description: "Store complements in a hash map for O(1) lookup",
        icon: "grid-outline",
        complexity: "O(n)",
        action: {
          type: "find",
          params: { indices: [1, 3] }, // 7 + 8 = 15
          animation: "highlight",
        },
        isOptimal: true,
        requiredCard: "hash_map",
      },
      {
        id: "two_pointer_sorted",
        label: "Sort + Two Pointer",
        description: "Sort first, then use two pointers",
        icon: "git-compare-outline",
        complexity: "O(n log n)",
        action: {
          type: "find",
          params: { indices: [1, 3] },
          animation: "highlight",
        },
        isOptimal: false,
        requiredCard: "two_pointer",
      },
      {
        id: "brute_force",
        label: "Check All Pairs",
        description: "Try every possible pair of numbers",
        icon: "apps-outline",
        complexity: "O(n²)",
        action: {
          type: "find",
          params: { indices: [1, 3] },
          animation: "compare",
        },
        isOptimal: false,
      },
    ],

    winCondition: {
      type: "find",
      target: 15,
      validator: (state) => {
        const highlighted = state.elements.filter((el: any) => el.isFound);
        if (highlighted.length !== 2) return false;
        return highlighted[0].value + highlighted[1].value === 15;
      },
    },

    optimalSteps: 1,
    parTime: 45,

    hints: [
      "For each number x, you need to find if (target - x) exists",
      "A hash map can store numbers for O(1) lookup",
      "Without extra space, you can sort and use two pointers",
    ],

    recommendedCards: ["hash_map", "two_pointer"],

    starThresholds: {
      three: { maxSteps: 1, minHealth: 85 },
      two: { maxSteps: 2, minHealth: 60 },
      one: { maxSteps: 5, minHealth: 1 },
    },

    xpReward: 100,
    cardReward: "two_pointer",
    isPremium: false,
  },
  {
    id: "arrays_4",
    worldId: "arrays",
    order: 4,
    name: "Maximum Subarray",
    description: "Find the contiguous subarray with maximum sum",
    objective: "Find the maximum sum subarray",
    difficulty: "medium",

    initialState: {
      dataStructure: "array",
      data: {
        elements: [
          { value: -2, isHighlighted: false },
          { value: 1, isHighlighted: false },
          { value: -3, isHighlighted: false },
          { value: 4, isHighlighted: false },
          { value: -1, isHighlighted: false },
          { value: 2, isHighlighted: false },
          { value: 1, isHighlighted: false },
          { value: -5, isHighlighted: false },
          { value: 4, isHighlighted: false },
        ],
        targetSum: 6, // [4, -1, 2, 1] = 6
      },
    },

    choices: [
      {
        id: "kadane",
        label: "Kadane's Algorithm",
        description: "Track max ending at each position",
        icon: "trending-up-outline",
        complexity: "O(n)",
        action: {
          type: "find",
          params: { startIndex: 3, endIndex: 6 },
          animation: "highlight",
        },
        isOptimal: true,
      },
      {
        id: "divide_conquer",
        label: "Divide and Conquer",
        description: "Split array and find max in each half",
        icon: "git-branch-outline",
        complexity: "O(n log n)",
        action: {
          type: "find",
          params: { startIndex: 3, endIndex: 6 },
          animation: "highlight",
        },
        isOptimal: false,
      },
      {
        id: "brute_force_sub",
        label: "Try All Subarrays",
        description: "Check every possible subarray",
        icon: "apps-outline",
        complexity: "O(n²)",
        action: {
          type: "find",
          params: { startIndex: 3, endIndex: 6 },
          animation: "compare",
        },
        isOptimal: false,
      },
    ],

    winCondition: {
      type: "find",
      target: 6,
      validator: (state) => {
        const highlighted = state.elements.filter((el: any) => el.isFound);
        const sum = highlighted.reduce(
          (acc: number, el: any) => acc + el.value,
          0
        );
        return sum === 6;
      },
    },

    optimalSteps: 1,
    parTime: 60,

    hints: [
      "Kadane's algorithm keeps track of max sum ending at current position",
      "If current sum becomes negative, start fresh",
      "The answer is the maximum of all 'max ending here' values",
    ],

    recommendedCards: ["sliding_window"],

    starThresholds: {
      three: { maxSteps: 1, minHealth: 85 },
      two: { maxSteps: 2, minHealth: 60 },
      one: { maxSteps: 4, minHealth: 1 },
    },

    xpReward: 125,
    cardReward: "sliding_window",
    isPremium: false,
  },
  {
    id: "arrays_5",
    worldId: "arrays",
    order: 5,
    name: "Sort It Out",
    description: "Sort the array with optimal complexity",
    objective: "Sort the array in ascending order",
    difficulty: "medium",

    initialState: {
      dataStructure: "array",
      data: {
        elements: [
          { value: 64, isHighlighted: false },
          { value: 34, isHighlighted: false },
          { value: 25, isHighlighted: false },
          { value: 12, isHighlighted: false },
          { value: 22, isHighlighted: false },
          { value: 11, isHighlighted: false },
          { value: 90, isHighlighted: false },
        ],
      },
    },

    choices: [
      {
        id: "merge_sort",
        label: "Merge Sort",
        description: "Divide, sort halves, merge back",
        icon: "git-merge-outline",
        complexity: "O(n log n)",
        action: {
          type: "sort",
          params: { algorithm: "merge" },
          animation: "merge",
        },
        isOptimal: true,
        requiredCard: "merge_sort",
      },
      {
        id: "quick_sort",
        label: "Quick Sort",
        description: "Pick pivot, partition around it",
        icon: "flash-outline",
        complexity: "O(n log n)",
        action: {
          type: "sort",
          params: { algorithm: "quick" },
          animation: "swap",
        },
        isOptimal: true,
        requiredCard: "quick_sort",
      },
      {
        id: "bubble_sort",
        label: "Bubble Sort",
        description: "Repeatedly swap adjacent elements",
        icon: "water-outline",
        complexity: "O(n²)",
        action: {
          type: "sort",
          params: { algorithm: "bubble" },
          animation: "swap",
        },
        isOptimal: false,
      },
      {
        id: "selection_sort",
        label: "Selection Sort",
        description: "Find minimum, place it, repeat",
        icon: "checkmark-circle-outline",
        complexity: "O(n²)",
        action: {
          type: "sort",
          params: { algorithm: "selection" },
          animation: "swap",
        },
        isOptimal: false,
      },
    ],

    winCondition: {
      type: "sort",
      target: [11, 12, 22, 25, 34, 64, 90],
      validator: (state) => {
        const values = state.elements.map((el: any) => el.value);
        for (let i = 0; i < values.length - 1; i++) {
          if (values[i] > values[i + 1]) return false;
        }
        return true;
      },
    },

    optimalSteps: 1,
    parTime: 45,

    hints: [
      "Comparison-based sorting has a lower bound of O(n log n)",
      "Merge sort guarantees O(n log n) in all cases",
      "Quick sort is O(n log n) on average but O(n²) worst case",
    ],

    recommendedCards: ["merge_sort", "quick_sort"],

    starThresholds: {
      three: { maxSteps: 1, minHealth: 75 },
      two: { maxSteps: 2, minHealth: 50 },
      one: { maxSteps: 4, minHealth: 1 },
    },

    xpReward: 150,
    isPremium: false,
  },
  // Boss Level
  {
    id: "arrays_boss",
    worldId: "arrays",
    order: 15,
    name: "Array Master",
    description: "Combine all your array knowledge to defeat the boss!",
    objective: "Solve the multi-step array challenge",
    difficulty: "boss",

    initialState: {
      dataStructure: "array",
      data: {
        elements: [
          { value: 15, isHighlighted: false },
          { value: 3, isHighlighted: false },
          { value: 9, isHighlighted: false },
          { value: 7, isHighlighted: false },
          { value: 21, isHighlighted: false },
          { value: 12, isHighlighted: false },
          { value: 6, isHighlighted: false },
          { value: 18, isHighlighted: false },
          { value: 24, isHighlighted: false },
          { value: 1, isHighlighted: false },
        ],
        phase: 1,
        targetSum: 27,
        searchTarget: 12,
      },
    },

    choices: [
      {
        id: "optimal_sort",
        label: "Optimal Sort",
        description: "Sort using best algorithm",
        icon: "git-merge-outline",
        complexity: "O(n log n)",
        action: {
          type: "sort",
          params: { algorithm: "merge" },
          animation: "merge",
        },
        isOptimal: true,
      },
      {
        id: "binary_search_find",
        label: "Binary Search",
        description: "Find target in sorted array",
        icon: "search-outline",
        complexity: "O(log n)",
        action: {
          type: "search",
          params: { useBinary: true },
          animation: "highlight",
        },
        isOptimal: true,
        requiredCard: "binary_search",
      },
      {
        id: "two_sum_optimal",
        label: "Hash Map Two Sum",
        description: "Find pair summing to target",
        icon: "grid-outline",
        complexity: "O(n)",
        action: {
          type: "find",
          params: { findSum: true },
          animation: "highlight",
        },
        isOptimal: true,
        requiredCard: "hash_map",
      },
      {
        id: "suboptimal_path",
        label: "Brute Force Everything",
        description: "The slow but sure way",
        icon: "hammer-outline",
        complexity: "O(n²)",
        action: {
          type: "traverse",
          params: {},
          animation: "compare",
        },
        isOptimal: false,
      },
    ],

    winCondition: {
      type: "optimize",
      target: null,
      validator: (state) => {
        // Multiple conditions for boss level
        return state.phase >= 3 && state.allObjectivesComplete;
      },
    },

    optimalSteps: 3,
    parTime: 120,

    hints: [
      "This boss has multiple phases!",
      "Use your best algorithm cards",
      "Each optimal choice reduces boss HP",
    ],

    recommendedCards: ["binary_search", "hash_map", "merge_sort"],

    starThresholds: {
      three: { maxSteps: 3, minHealth: 70 },
      two: { maxSteps: 5, minHealth: 40 },
      one: { maxSteps: 8, minHealth: 1 },
    },

    xpReward: 500,
    cardReward: "greedy",
    isPremium: false,
  },
];
