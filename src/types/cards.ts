import { Complexity } from "./game";

export type CardRarity = "common" | "uncommon" | "rare" | "epic" | "legendary";

export interface AlgorithmCard {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  icon: string;
  rarity: CardRarity;

  // What it does
  effect: CardEffect;

  // When it can be used
  applicableStructures: string[];
  applicableOperations: string[];

  // Complexity it achieves
  complexity: Complexity;

  // Card progression
  level: number;
  maxLevel: number;
  xpToNextLevel: number;
  currentXp: number;

  // Unlock requirements
  unlockRequirement: UnlockRequirement;
  isUnlocked: boolean;

  // Visual
  color: string;
}

export interface CardEffect {
  type: "reduce_complexity" | "bonus_damage" | "heal" | "reveal" | "optimize";
  value: number;
  description: string;
}

export interface UnlockRequirement {
  type: "level_complete" | "stars_earned" | "card_usage" | "world_complete";
  target: string | number;
}

export interface PlayerCardCollection {
  unlockedCards: string[];
  cardProgress: Record<string, { level: number; xp: number }>;
  equippedCards: string[];
  maxEquipped: number;
}
