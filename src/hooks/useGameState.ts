import { useReducer, useCallback, useRef, useEffect } from "react";
import { GameState, GameMove, Complexity } from "../types/game";
import { Level, LevelChoice } from "../types/levels";
import { GameEngine } from "../game/engine";

type GameAction =
  | { type: "MAKE_CHOICE"; choice: LevelChoice }
  | { type: "SELECT_CARD"; cardId: string | null }
  | { type: "RESET" }
  | { type: "USE_HINT" }
  | { type: "SYNC_STATE"; state: GameState };

interface UseGameStateReturn {
  state: GameState;
  makeChoice: (choice: LevelChoice) => GameMove;
  selectCard: (cardId: string | null) => void;
  reset: () => void;
  getAvailableChoices: () => LevelChoice[];
  getHint: (index: number) => string | null;
  getResult: () => any;
}

export function useGameState(
  level: Level,
  equippedCards: string[]
): UseGameStateReturn {
  const engineRef = useRef<GameEngine | null>(null);

  // Initialize engine
  if (!engineRef.current) {
    engineRef.current = new GameEngine({ level, equippedCards });
  }

  const [state, dispatch] = useReducer(
    (currentState: GameState, action: GameAction): GameState => {
      switch (action.type) {
        case "SYNC_STATE":
          return action.state;
        default:
          return currentState;
      }
    },
    engineRef.current.getState()
  );

  // Subscribe to engine updates
  useEffect(() => {
    const engine = engineRef.current;
    if (!engine) return;

    const unsubscribe = engine.subscribe((newState) => {
      dispatch({ type: "SYNC_STATE", state: newState });
    });

    return unsubscribe;
  }, []);

  const makeChoice = useCallback((choice: LevelChoice): GameMove => {
    if (!engineRef.current) {
      throw new Error("Game engine not initialized");
    }
    return engineRef.current.makeChoice(choice);
  }, []);

  const selectCard = useCallback((cardId: string | null) => {
    engineRef.current?.selectCard(cardId);
  }, []);

  const reset = useCallback(() => {
    engineRef.current?.reset();
  }, []);

  const getAvailableChoices = useCallback((): LevelChoice[] => {
    return engineRef.current?.getAvailableChoices() || [];
  }, []);

  const getHint = useCallback((index: number): string | null => {
    return engineRef.current?.getHint(index) || null;
  }, []);

  const getResult = useCallback(() => {
    return engineRef.current?.getResult();
  }, []);

  return {
    state,
    makeChoice,
    selectCard,
    reset,
    getAvailableChoices,
    getHint,
    getResult,
  };
}
