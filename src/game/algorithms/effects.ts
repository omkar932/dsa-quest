import { LevelChoice } from "../../types/levels";
import { Complexity } from "../../types/game";
import { getCard, ALGORITHM_CARDS } from "./cards";
import { getComplexityRank, COMPLEXITY_DAMAGE } from "../scoring";

interface CardEffectResult {
  modifiedComplexity?: Complexity;
  bonusDamageReduction?: number;
  healAmount?: number;
  revealInfo?: any;
}

const COMPLEXITY_LEVELS: Complexity[] = [
  "O(1)",
  "O(log n)",
  "O(n)",
  "O(n log n)",
  "O(n²)",
  "O(2ⁿ)",
];

export function applyCardEffect(
  cardId: string,
  choice: LevelChoice,
  gameState: any
): CardEffectResult {
  const card = getCard(cardId);

  if (!card) {
    return {};
  }

  // Check if card is applicable to this operation
  const operationType = choice.action.type;
  if (!card.applicableOperations.includes(operationType)) {
    return {};
  }

  const result: CardEffectResult = {};

  switch (card.effect.type) {
    case "reduce_complexity": {
      const currentRank = getComplexityRank(choice.complexity);
      const newRank = Math.max(0, currentRank - card.effect.value);
      result.modifiedComplexity = COMPLEXITY_LEVELS[newRank];
      break;
    }

    case "bonus_damage": {
      result.bonusDamageReduction = card.effect.value;
      break;
    }

    case "heal": {
      result.healAmount = card.effect.value;
      break;
    }

    case "reveal": {
      result.revealInfo = getRevealInfo(card, gameState);
      break;
    }

    case "optimize": {
      // Special optimization - directly set to card's complexity
      result.modifiedComplexity = card.complexity;
      break;
    }
  }

  return result;
}

function getRevealInfo(card: any, gameState: any): any {
  // Different cards reveal different information
  switch (card.id) {
    case "binary_search":
      return { hint: "Array must be sorted for binary search!" };
    case "hash_map":
      return { hint: "Consider using a hash map for O(1) lookups" };
    default:
      return { hint: card.shortDescription };
  }
}

export function canUseCard(
  cardId: string,
  structure: string,
  operation: string
): boolean {
  const card = getCard(cardId);
  if (!card) return false;

  return (
    card.applicableStructures.includes(structure) &&
    card.applicableOperations.includes(operation)
  );
}

export function calculateCardXp(wasOptimal: boolean, stars: number): number {
  const base = 10;
  const optimalBonus = wasOptimal ? 15 : 0;
  const starBonus = stars * 5;
  return base + optimalBonus + starBonus;
}
