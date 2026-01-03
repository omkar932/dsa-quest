import { GameState, GameMove, Complexity, GameResult } from "../types/game";
import { Level, LevelChoice } from "../types/levels";
import { calculateDamage } from "./scoring";
import { applyCardEffect } from "./algorithms/effects";

export interface GameEngineConfig {
  level: Level;
  equippedCards: string[];
}

export class GameEngine {
  private state: GameState;
  private level: Level;
  private equippedCards: string[];
  private listeners: Set<(state: GameState) => void>;

  constructor(config: GameEngineConfig) {
    this.level = config.level;
    this.equippedCards = config.equippedCards;
    this.listeners = new Set();
    this.state = this.createInitialState();
  }

  private createInitialState(): GameState {
    return {
      currentHealth: 100,
      maxHealth: 100,
      steps: 0,
      optimalSteps: this.level.optimalSteps,
      score: 0,
      isComplete: false,
      isFailed: false,
      dataState: this.cloneData(this.level.initialState.data),
      selectedCard: null,
      moveHistory: [],
    };
  }

  private cloneData(data: any): any {
    return JSON.parse(JSON.stringify(data));
  }

  public getState(): GameState {
    return { ...this.state };
  }

  public subscribe(listener: (state: GameState) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify(): void {
    this.listeners.forEach((listener) => listener(this.getState()));
  }

  public selectCard(cardId: string | null): void {
    this.state = {
      ...this.state,
      selectedCard: cardId,
    };
    this.notify();
  }

  public makeChoice(choice: LevelChoice): GameMove {
    if (this.state.isComplete || this.state.isFailed) {
      throw new Error("Game already ended");
    }

    // Calculate damage based on complexity
    let complexity = choice.complexity;
    let damage = calculateDamage(complexity);

    // Apply card effect if a card is selected
    if (this.state.selectedCard) {
      const cardEffect = applyCardEffect(
        this.state.selectedCard,
        choice,
        this.state.dataState
      );
      if (cardEffect.modifiedComplexity) {
        complexity = cardEffect.modifiedComplexity;
        damage = calculateDamage(complexity);
      }
      if (cardEffect.bonusDamageReduction) {
        damage = Math.max(0, damage - cardEffect.bonusDamageReduction);
      }
    }

    // Create move record
    const move: GameMove = {
      action: choice.label,
      complexity,
      damage,
      timestamp: Date.now(),
      wasOptimal: choice.isOptimal,
    };

    // Apply the action to data state
    const newDataState = this.applyAction(choice);

    // Update state
    const newHealth = Math.max(0, this.state.currentHealth - damage);
    const newSteps = this.state.steps + 1;

    // Check win/lose conditions
    const isComplete = this.checkWinCondition(newDataState);
    const isFailed = newHealth <= 0;

    // Calculate score
    const newScore = this.calculateCurrentScore(
      newSteps,
      newHealth,
      move.wasOptimal
    );

    this.state = {
      ...this.state,
      currentHealth: newHealth,
      steps: newSteps,
      score: newScore,
      isComplete,
      isFailed,
      dataState: newDataState,
      selectedCard: null,
      moveHistory: [...this.state.moveHistory, move],
    };

    this.notify();
    return move;
  }

  private applyAction(choice: LevelChoice): any {
    const { type, params } = choice.action;
    const data = this.cloneData(this.state.dataState);

    switch (type) {
      case "search":
        return this.applySearch(data, params);
      case "insert":
        return this.applyInsert(data, params);
      case "delete":
        return this.applyDelete(data, params);
      case "swap":
        return this.applySwap(data, params);
      case "sort":
        return this.applySort(data, params);
      case "traverse":
        return this.applyTraverse(data, params);
      default:
        return data;
    }
  }

  private applySearch(data: any, params?: any): any {
    // Mark element as found/highlighted
    if (params?.index !== undefined && Array.isArray(data.elements)) {
      data.elements = data.elements.map((el: any, i: number) => ({
        ...el,
        isHighlighted: i === params.index,
        isFound: i === params.index,
      }));
    }
    return data;
  }

  private applyInsert(data: any, params?: any): any {
    if (Array.isArray(data.elements) && params?.value !== undefined) {
      const index = params.index ?? data.elements.length;
      data.elements.splice(index, 0, {
        value: params.value,
        isNew: true,
      });
    }
    return data;
  }

  private applyDelete(data: any, params?: any): any {
    if (Array.isArray(data.elements) && params?.index !== undefined) {
      data.elements.splice(params.index, 1);
    }
    return data;
  }

  private applySwap(data: any, params?: any): any {
    if (
      Array.isArray(data.elements) &&
      params?.i !== undefined &&
      params?.j !== undefined
    ) {
      const temp = data.elements[params.i];
      data.elements[params.i] = data.elements[params.j];
      data.elements[params.j] = temp;
    }
    return data;
  }

  private applySort(data: any, params?: any): any {
    if (Array.isArray(data.elements)) {
      const values = data.elements.map((el: any) =>
        typeof el === "object" ? el.value : el
      );

      switch (params?.algorithm) {
        case "bubble":
          values.sort((a: number, b: number) => a - b);
          break;
        case "quick":
          values.sort((a: number, b: number) => a - b);
          break;
        case "merge":
          values.sort((a: number, b: number) => a - b);
          break;
        default:
          values.sort((a: number, b: number) => a - b);
      }

      data.elements = values.map((v: number) => ({ value: v, isSorted: true }));
    }
    return data;
  }

  private applyTraverse(data: any, params?: any): any {
    // Mark traversal path
    if (params?.path && Array.isArray(params.path)) {
      data.traversalPath = params.path;
    }
    return data;
  }

  private checkWinCondition(dataState: any): boolean {
    return this.level.winCondition.validator(dataState);
  }

  private calculateCurrentScore(
    steps: number,
    health: number,
    wasOptimal: boolean
  ): number {
    let score = this.state.score;

    // Base points for action
    score += 10;

    // Bonus for optimal choice
    if (wasOptimal) {
      score += 25;
    }

    // Efficiency bonus
    if (steps <= this.level.optimalSteps) {
      score += 15;
    }

    return score;
  }

  public getResult(): GameResult {
    const {
      steps,
      optimalSteps,
      currentHealth,
      maxHealth,
      score,
      moveHistory,
    } = this.state;

    const efficiencyRating = Math.min(
      100,
      Math.round((optimalSteps / Math.max(steps, 1)) * 100)
    );
    const healthPercent = (currentHealth / maxHealth) * 100;

    let stars: 1 | 2 | 3 = 1;
    const { starThresholds } = this.level;

    if (
      steps <= starThresholds.three.maxSteps &&
      healthPercent >= starThresholds.three.minHealth
    ) {
      stars = 3;
    } else if (
      steps <= starThresholds.two.maxSteps &&
      healthPercent >= starThresholds.two.minHealth
    ) {
      stars = 2;
    }

    const optimalMoves = moveHistory.filter((m) => m.wasOptimal).length;
    const xpEarned = Math.round(
      this.level.xpReward *
        (stars / 3) *
        (efficiencyRating / 100) *
        (optimalMoves / Math.max(moveHistory.length, 1) + 0.5)
    );

    return {
      completed: this.state.isComplete,
      stars,
      score,
      steps,
      optimalSteps,
      healthRemaining: currentHealth,
      efficiencyRating,
      newCardsUnlocked:
        this.level.cardReward && stars >= 2 ? [this.level.cardReward] : [],
      xpEarned,
    };
  }

  public reset(): void {
    this.state = this.createInitialState();
    this.notify();
  }

  public getAvailableChoices(): LevelChoice[] {
    return this.level.choices.filter((choice) => {
      // Filter out choices that require cards the player doesn't have
      if (
        choice.requiredCard &&
        !this.equippedCards.includes(choice.requiredCard)
      ) {
        return false;
      }
      return true;
    });
  }

  public getHint(index: number): string | null {
    return this.level.hints[index] || null;
  }
}
