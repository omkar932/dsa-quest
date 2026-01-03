import { DataStructureType, OperationType, Complexity } from "../types/game";

// Maps data structure + operation to typical complexity
export const OPERATION_COMPLEXITY: Record<
  DataStructureType,
  Partial<Record<OperationType, Complexity>>
> = {
  array: {
    search: "O(n)",
    insert: "O(n)",
    delete: "O(n)",
    sort: "O(n log n)",
    traverse: "O(n)",
    find: "O(n)",
    swap: "O(1)",
  },
  string: {
    search: "O(n)",
    find: "O(n)",
    traverse: "O(n)",
  },
  stack: {
    insert: "O(1)",
    delete: "O(1)",
    search: "O(n)",
    traverse: "O(n)",
  },
  queue: {
    insert: "O(1)",
    delete: "O(1)",
    search: "O(n)",
    traverse: "O(n)",
  },
  linkedList: {
    insert: "O(1)",
    delete: "O(1)",
    search: "O(n)",
    traverse: "O(n)",
    find: "O(n)",
  },
  tree: {
    insert: "O(log n)",
    delete: "O(log n)",
    search: "O(log n)",
    traverse: "O(n)",
    find: "O(log n)",
  },
  graph: {
    traverse: "O(n)",
    search: "O(n)",
    find: "O(n)",
  },
  heap: {
    insert: "O(log n)",
    delete: "O(log n)",
    find: "O(1)",
  },
};

// Optimized complexity when using specific algorithm cards
export const OPTIMIZED_COMPLEXITY: Record<
  string,
  Partial<Record<OperationType, Complexity>>
> = {
  binary_search: {
    search: "O(log n)",
    find: "O(log n)",
  },
  two_pointer: {
    search: "O(n)",
    find: "O(n)",
  },
  sliding_window: {
    search: "O(n)",
    find: "O(n)",
  },
  hash_map: {
    search: "O(1)",
    find: "O(1)",
  },
  quick_sort: {
    sort: "O(n log n)",
  },
  merge_sort: {
    sort: "O(n log n)",
  },
  dfs: {
    traverse: "O(n)",
    search: "O(n)",
  },
  bfs: {
    traverse: "O(n)",
    search: "O(n)",
  },
};

export function getDefaultComplexity(
  structure: DataStructureType,
  operation: OperationType
): Complexity {
  return OPERATION_COMPLEXITY[structure]?.[operation] || "O(n)";
}

export function getOptimizedComplexity(
  cardId: string,
  operation: OperationType
): Complexity | null {
  return OPTIMIZED_COMPLEXITY[cardId]?.[operation] || null;
}
