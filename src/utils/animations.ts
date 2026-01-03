import {
  withSpring,
  withTiming,
  withSequence,
  withDelay,
  withRepeat,
  Easing,
  SharedValue,
  useSharedValue,
  useAnimatedStyle,
  useAnimatedReaction,
  runOnJS,
} from 'react-native-reanimated';

// Animation configuration presets
export const ANIMATION_CONFIG = {
  SPRING: {
    damping: 15,
    stiffness: 150,
    mass: 1,
  },
  TIMING: {
    duration: 300,
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
  },
  FAST_TIMING: {
    duration: 150,
    easing: Easing.out(Easing.cubic),
  },
  SLOW_TIMING: {
    duration: 500,
    easing: Easing.inOut(Easing.cubic),
  },
};

// Common animations
export const animations = {
  // Fade animations
  fadeIn: (duration = 300) => ({
    opacity: withTiming(1, { duration }),
  }),
  fadeOut: (duration = 300) => ({
    opacity: withTiming(0, { duration }),
  }),

  // Scale animations
  scaleIn: (duration = 300) => ({
    transform: [{ scale: withTiming(1, { duration }) }],
  }),
  scaleOut: (duration = 300) => ({
    transform: [{ scale: withTiming(0, { duration }) }],
  }),
  scaleBounce: () => ({
    transform: [{ scale: withSpring(1.1, ANIMATION_CONFIG.SPRING) }],
  }),

  // Slide animations
  slideInRight: (duration = 300) => ({
    transform: [{ translateX: withTiming(0, { duration }) }],
  }),
  slideInLeft: (duration = 300) => ({
    transform: [{ translateX: withTiming(0, { duration }) }],
  }),
  slideInUp: (duration = 300) => ({
    transform: [{ translateY: withTiming(0, { duration }) }],
  }),
  slideInDown: (duration = 300) => ({
    transform: [{ translateY: withTiming(0, { duration }) }],
  }),

  // Rotate animations
  rotate: (degrees: number, duration = 300) => ({
    transform: [{ rotate: withTiming(`${degrees}deg`, { duration }) }],
  }),
  rotateContinuous: (speed = 2000) => ({
    transform: [
      {
        rotate: withRepeat(
          withTiming('360deg', { duration: speed }),
          -1,
          false
        ),
      },
    ],
  }),

  // Color animations
  colorChange: (fromColor: string, toColor: string, duration = 300) => ({
    backgroundColor: withTiming(toColor, { duration }),
  }),

  // Height/Width animations
  expandHeight: (toValue: number, duration = 300) => ({
    height: withTiming(toValue, { duration }),
  }),
  expandWidth: (toValue: number, duration = 300) => ({
    width: withTiming(toValue, { duration }),
  }),

  // Complex animations
  bounce: () => ({
    transform: [
      {
        scale: withSequence(
          withTiming(1.2, { duration: 100 }),
          withSpring(1, ANIMATION_CONFIG.SPRING)
        ),
      },
    ],
  }),

  shake: () => ({
    transform: [
      {
        translateX: withSequence(
          withTiming(-10, { duration: 50 }),
          withTiming(10, { duration: 50 }),
          withTiming(-7, { duration: 50 }),
          withTiming(7, { duration: 50 }),
          withTiming(0, { duration: 50 })
        ),
      },
    ],
  }),

  pulse: () => ({
    transform: [
      {
        scale: withRepeat(
          withSequence(
            withTiming(1.1, { duration: 200 }),
            withTiming(1, { duration: 200 })
          ),
          -1,
          true
        ),
      },
    ],
  }),

  glow: (color: string) => ({
    shadowColor: color,
    shadowOpacity: withRepeat(
      withSequence(
        withTiming(0.7, { duration: 1000 }),
        withTiming(0.3, { duration: 1000 })
      ),
      -1,
      true
    ),
    shadowRadius: 20,
  }),
};

// Hook for animation callbacks
export const useAnimation = () => {
  const createAnimatedStyle = (animationConfig: any) => {
    return useAnimatedStyle(() => animationConfig);
  };

  return {
    createAnimatedStyle,
  };
};

// Animation sequences for game actions
export const gameAnimations = {
  // Element highlight animation
  highlightElement: () => ({
    opacity: withSequence(
      withTiming(0.7, { duration: 200 }),
      withTiming(1, { duration: 200 })
    ),
    transform: [
      {
        scale: withSequence(
          withTiming(1.1, { duration: 200 }),
          withSpring(1, ANIMATION_CONFIG.SPRING)
        ),
      },
    ],
  }),

  // Swap animation
  swapElements: () => ({
    transform: [
      {
        translateX: withSequence(
          withTiming(50, { duration: 200 }),
          withTiming(-50, { duration: 200 }),
          withTiming(0, { duration: 200 })
        ),
      },
    ],
  }),

  // Insert animation
  insertElement: () => ({
    opacity: withSequence(
      withTiming(0, { duration: 0 }),
      withTiming(1, { duration: 300 })
    ),
    transform: [
      {
        scale: withSequence(
          withTiming(0.5, { duration: 0 }),
          withSpring(1, ANIMATION_CONFIG.SPRING)
        ),
      },
    ],
  }),

  // Remove animation
  removeElement: () => ({
    opacity: withTiming(0, { duration: 200 }),
    transform: [
      {
        scale: withTiming(0.5, { duration: 200 }),
      },
    ],
  }),

  // Compare animation
  compareElements: () => ({
    transform: [
      {
        scale: withRepeat(
          withSequence(
            withTiming(1.2, { duration: 150 }),
            withTiming(1, { duration: 150 })
          ),
          2,
          false
        ),
      },
    ],
  }),

  // Success animation
  successFeedback: () => ({
    opacity: withSequence(
      withTiming(1, { duration: 100 }),
      withTiming(0, { duration: 500, delay: 1000 })
    ),
    transform: [
      {
        translateY: withSequence(
          withTiming(-20, { duration: 200 }),
          withTiming(0, { duration: 200 })
        ),
      },
    ],
  }),

  // Error animation
  errorFeedback: () => ({
    transform: [
      {
        translateX: withSequence(
          withTiming(-10, { duration: 50 }),
          withTiming(10, { duration: 50 }),
          withTiming(-7, { duration: 50 }),
          withTiming(7, { duration: 50 }),
          withTiming(0, { duration: 50 })
        ),
      },
    ],
  }),

  // Health damage animation
  takeDamage: () => ({
    opacity: withSequence(
      withTiming(0.5, { duration: 50 }),
      withTiming(1, { duration: 50 }),
      withTiming(0.5, { duration: 50 }),
      withTiming(1, { duration: 50 })
    ),
  }),

  // Card selection animation
  selectCard: () => ({
    transform: [
      {
        translateY: withTiming(-10, { duration: 200 }),
      },
    ],
    shadowOpacity: withTiming(0.5, { duration: 200 }),
  }),

  // Level complete animation
  levelComplete: () => ({
    opacity: withSequence(
      withTiming(0, { duration: 0 }),
      withTiming(1, { duration: 500 })
    ),
    transform: [
      {
        scale: withSequence(
          withTiming(0.8, { duration: 0 }),
          withSpring(1.1, ANIMATION_CONFIG.SPRING),
          withSpring(1, ANIMATION_CONFIG.SPRING)
        ),
      },
    ],
  }),
};

// Helper functions for animation timing
export const animateAsync = (callback: () => void, delay: number = 0) => {
  return new Promise<void>(resolve => {
    setTimeout(() => {
      callback();
      resolve();
    }, delay);
  });
};

export const createAnimationSequence = (
  animations: Array<() => Promise<void>>
) => {
  return async () => {
    for (const animation of animations) {
      await animation();
    }
  };
};

// Animation types
export type AnimationType =
  | 'highlight'
  | 'swap'
  | 'insert'
  | 'remove'
  | 'traverse'
  | 'compare'
  | 'merge'
  | 'success'
  | 'error'
  | 'damage'
  | 'cardSelect'
  | 'levelComplete';

// Get animation by type
export const getAnimationByType = (type: AnimationType) => {
  switch (type) {
    case 'highlight':
      return gameAnimations.highlightElement;
    case 'swap':
      return gameAnimations.swapElements;
    case 'insert':
      return gameAnimations.insertElement;
    case 'remove':
      return gameAnimations.removeElement;
    case 'compare':
      return gameAnimations.compareElements;
    case 'success':
      return gameAnimations.successFeedback;
    case 'error':
      return gameAnimations.errorFeedback;
    case 'damage':
      return gameAnimations.takeDamage;
    case 'cardSelect':
      return gameAnimations.selectCard;
    case 'levelComplete':
      return gameAnimations.levelComplete;
    default:
      return gameAnimations.highlightElement;
  }
};

// Hook for animating data structure elements
export const useElementAnimation = (elementIndex: number) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const rotate = useSharedValue(0);

  const animate = (type: AnimationType, config?: any) => {
    const animation = getAnimationByType(type);
    // Apply animation to shared values
    // This is a simplified version - in practice, you'd update shared values
    // based on the animation type
    switch (type) {
      case 'highlight':
        scale.value = withSequence(
          withTiming(1.2, { duration: 200 }),
          withSpring(1, ANIMATION_CONFIG.SPRING)
        );
        break;
      case 'swap':
        translateX.value = withSequence(
          withTiming(50, { duration: 200 }),
          withTiming(-50, { duration: 200 }),
          withTiming(0, { duration: 200 })
        );
        break;
      case 'insert':
        scale.value = withSequence(
          withTiming(0.5, { duration: 0 }),
          withSpring(1, ANIMATION_CONFIG.SPRING)
        );
        opacity.value = withSequence(
          withTiming(0, { duration: 0 }),
          withTiming(1, { duration: 300 })
        );
        break;
      case 'remove':
        opacity.value = withTiming(0, { duration: 200 });
        scale.value = withTiming(0.5, { duration: 200 });
        break;
    }
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { translateX: translateX.value },
      { translateY: translateY.value },
      { rotate: `${rotate.value}deg` },
    ],
    opacity: opacity.value,
  }));

  return {
    animate,
    animatedStyle,
  };
};
