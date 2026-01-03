import { Complexity } from "../types/game";

export const COMPLEXITY_DAMAGE: Record<Complexity, number> = {
  "O(1)": 0,
  "O(log n)": 5,
  "O(n)": 15,
  "O(n log n)": 25,
  "O(n²)": 40,
  "O(2ⁿ)": 70,
};

export const COMPLEXITY_COLORS: Record<Complexity, string> = {
  "O(1)": "#10B981",
  "O(log n)": "#3B82F6",
  "O(n)": "#F59E0B",
  "O(n log n)": "#F97316",
  "O(n²)": "#EF4444",
  "O(2ⁿ)": "#991B1B",
};

export const COMPLEXITY_LABELS: Record<Complexity, string> = {
  "O(1)": "Constant",
  "O(log n)": "Logarithmic",
  "O(n)": "Linear",
  "O(n log n)": "Linearithmic",
  "O(n²)": "Quadratic",
  "O(2ⁿ)": "Exponential",
};

export function calculateDamage(complexity: Complexity): number {
  return COMPLEXITY_DAMAGE[complexity];
}

export function getComplexityRank(complexity: Complexity): number {
  const ranks: Complexity[] = [
    "O(1)",
    "O(log n)",
    "O(n)",
    "O(n log n)",
    "O(n²)",
    "O(2ⁿ)",
  ];
  return ranks.indexOf(complexity);
}

export function calculateEfficiency(steps: number, optimal: number): number {
  if (steps === 0) return 100;
  return Math.min(100, Math.round((optimal / steps) * 100));
}

export function calculateStars(
  steps: number,
  healthPercent: number,
  efficiency: number
): 1 | 2 | 3 {
  const score = efficiency * 0.5 + healthPercent * 0.5;

  if (score >= 85) return 3;
  if (score >= 60) return 2;
  return 1;
}

export function formatComplexity(complexity: Complexity): string {
  return complexity;
}
