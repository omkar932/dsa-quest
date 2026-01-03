import React, { createContext, useContext, useEffect, useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type LevelProgress = {
  completed: boolean;
  stars: number;
  bestScore: number;
  attempts: number;
};

type WorldProgress = {
  levels: Record<string, LevelProgress>;
  totalStars: number;
};

type ProgressState = {
  worlds: Record<string, WorldProgress>;
  totalStars: number;
  totalXp: number;
  currentLevel: number;
  unlockedCards: string[];
};

export type ProgressContextType = {
  progress: ProgressState;
  isLoading: boolean;
  updateLevelProgress: (
    worldId: string,
    levelId: string,
    result: {
      completed: boolean;
      stars: number;
      score: number;
      xpEarned: number;
      newCards: string[];
    }
  ) => Promise<void>;
  getLevelProgress: (worldId: string, levelId: string) => LevelProgress | null;
  getWorldProgress: (worldId: string) => WorldProgress | null;
  isLevelUnlocked: (
    worldId: string,
    levelId: string,
    levelOrder: number
  ) => boolean;
  resetProgress: () => Promise<void>;
  totalStars: number;
  totalXp: number;
  playerLevel: number;
  unlockedCards: string[];
};

const STORAGE_KEY = 'dsa_quest_progress';

const initialProgress: ProgressState = {
  worlds: {},
  totalStars: 0,
  totalXp: 0,
  currentLevel: 1,
  unlockedCards: [],
};

type Action =
  | { type: 'LOAD'; payload: ProgressState }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_PROGRESS'; payload: ProgressState };

function reducer(
  state: { progress: ProgressState; isLoading: boolean },
  action: Action
) {
  switch (action.type) {
    case 'LOAD':
    case 'SET_PROGRESS':
      return { ...state, progress: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
}

export const ProgressContext = createContext<ProgressContextType | undefined>(
  undefined
);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, {
    progress: initialProgress,
    isLoading: true,
  });

  // Toggle to true to disable AsyncStorage persistence for isolation/testing
  const DEBUG_NO_PERSIST = false;

  useEffect(() => {
    (async () => {
      try {
        if (!DEBUG_NO_PERSIST) {
          const raw = await AsyncStorage.getItem(STORAGE_KEY);
          if (raw) {
            const parsed = JSON.parse(raw);
            const sanitized = sanitizeProgress(parsed);
            dispatch({ type: 'LOAD', payload: sanitized });
          }
        }
      } catch (e) {
        console.error('ProgressProvider load error', e);
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    })();
  }, []);

  const saveProgress = async (p: ProgressState) => {
    try {
      const sanitized = sanitizeProgress(p as any);
      if (!DEBUG_NO_PERSIST) {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(sanitized));
      }
      dispatch({ type: 'SET_PROGRESS', payload: sanitized });
    } catch (e) {
      console.error('ProgressProvider save error', e);
    }
  };

  const updateLevelProgress = async (
    worldId: string,
    levelId: string,
    result: {
      completed: boolean;
      stars: number;
      score: number;
      xpEarned: number;
      newCards: string[];
    }
  ) => {
    const current = state.progress;
    const next: ProgressState = JSON.parse(JSON.stringify(current));

    if (!next.worlds[worldId])
      next.worlds[worldId] = { levels: {}, totalStars: 0 };

    const world = next.worlds[worldId];
    const existing = world.levels[levelId];

    const isNewBest = !existing || result.stars > existing.stars;

    if (isNewBest && result.completed) {
      const oldStars = existing?.stars || 0;
      const starDiff = result.stars - oldStars;

      world.levels[levelId] = {
        completed: true,
        stars: result.stars,
        bestScore: Math.max(result.score, existing?.bestScore || 0),
        attempts: (existing?.attempts || 0) + 1,
      };

      world.totalStars += starDiff;
      next.totalStars += starDiff;
    } else if (existing) {
      existing.attempts += 1;
    } else {
      world.levels[levelId] = {
        completed: false,
        stars: 0,
        bestScore: 0,
        attempts: 1,
      };
    }

    next.totalXp += result.xpEarned;
    next.currentLevel = Math.floor(next.totalXp / 500) + 1;

    result.newCards.forEach(c => {
      if (!next.unlockedCards.includes(c)) next.unlockedCards.push(c);
    });

    await saveProgress(next);
  };

  const getLevelProgress = (
    worldId: string,
    levelId: string
  ): LevelProgress | null => {
    return state.progress.worlds[worldId]?.levels[levelId] || null;
  };

  const getWorldProgress = (worldId: string): WorldProgress | null => {
    return state.progress.worlds[worldId] || null;
  };

  const isLevelUnlocked = (
    worldId: string,
    _levelId: string,
    levelOrder: number
  ): boolean => {
    if (levelOrder === 1) return true;
    const world = state.progress.worlds[worldId];
    if (!world) return levelOrder === 1;
    const completed = Object.values(world.levels).filter(
      l => l.completed
    ).length;
    return completed >= levelOrder - 1;
  };

  const resetProgress = async () => {
    await saveProgress(initialProgress);
  };

  const value: ProgressContextType = {
    progress: state.progress,
    isLoading: state.isLoading,
    updateLevelProgress,
    getLevelProgress,
    getWorldProgress,
    isLevelUnlocked,
    resetProgress,
    totalStars: state.progress.totalStars,
    totalXp: state.progress.totalXp,
    playerLevel: state.progress.currentLevel,
    unlockedCards: state.progress.unlockedCards,
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
};

// Helpers
function sanitizeProgress(p: any): ProgressState {
  if (!p || typeof p !== 'object') return initialProgress;
  const worlds: Record<string, WorldProgress> = {};
  if (p.worlds && typeof p.worlds === 'object') {
    for (const [wid, wp] of Object.entries<any>(p.worlds)) {
      const levels: Record<string, LevelProgress> = {};
      const totalStars = Number(wp.totalStars) || 0;
      if (wp.levels && typeof wp.levels === 'object') {
        for (const [lid, lv] of Object.entries<any>(wp.levels)) {
          levels[lid] = {
            completed:
              lv && (lv.completed === true || lv.completed === 'true')
                ? true
                : false,
            stars: Number(lv.stars) || 0,
            bestScore: Number(lv.bestScore) || 0,
            attempts: Number(lv.attempts) || 0,
          };
        }
      }
      worlds[wid] = { levels, totalStars };
    }
  }
  return {
    worlds,
    totalStars: Number(p.totalStars) || 0,
    totalXp: Number(p.totalXp) || 0,
    currentLevel: Number(p.currentLevel) || 1,
    unlockedCards: Array.isArray(p.unlockedCards)
      ? p.unlockedCards.map(String)
      : [],
  };
}
