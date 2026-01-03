import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withSequence,
  runOnJS,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';
import { useHaptics } from '../../hooks/useHaptics';

interface FeedbackOverlayProps {
  type: 'success' | 'error' | 'warning' | 'info' | 'damage';
  message: string;
  value?: number;
  duration?: number;
  onComplete?: () => void;
}

export const FeedbackOverlay: React.FC<FeedbackOverlayProps> = ({
  type,
  message,
  value,
  duration = 2000,
  onComplete,
}) => {
  const theme = useTheme();
  const haptics = useHaptics();

  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.8);
  const translateY = useSharedValue(0);

  useEffect(() => {
    // Trigger haptic feedback
    switch (type) {
      case 'success':
        haptics.success();
        break;
      case 'error':
      case 'damage':
        haptics.error();
        break;
      case 'warning':
        haptics.warning();
        break;
      default:
        haptics.light();
    }

    // Animation sequence
    opacity.value = withSequence(
      withTiming(1, { duration: 200 }),
      withTiming(1, { duration: duration - 400 }),
      withTiming(0, { duration: 200 })
    );

    scale.value = withSequence(
      withSpring(1.1, { damping: 15, stiffness: 150 }),
      withTiming(1, { duration: duration - 400 }),
      withTiming(0.8, { duration: 200 })
    );

    translateY.value = withSequence(
      withTiming(-20, { duration: 200 }),
      withTiming(-20, { duration: duration - 400 }),
      withTiming(0, { duration: 200 })
    );

    // Call onComplete when animation ends
    const timer = setTimeout(() => {
      if (onComplete) {
        onComplete();
      }
    }, duration);

    return () => clearTimeout(timer);
  }, []);

  const getConfig = () => {
    switch (type) {
      case 'success':
        return {
          color: theme.colors.accent.success,
          icon: 'checkmark-circle',
          bgColor: theme.colors.accent.success + '20',
        };
      case 'error':
        return {
          color: theme.colors.accent.error,
          icon: 'close-circle',
          bgColor: theme.colors.accent.error + '20',
        };
      case 'warning':
        return {
          color: theme.colors.accent.warning,
          icon: 'warning',
          bgColor: theme.colors.accent.warning + '20',
        };
      case 'damage':
        return {
          color: theme.colors.accent.error,
          icon: 'flash',
          bgColor: theme.colors.accent.error + '20',
        };
      default:
        return {
          color: theme.colors.accent.info,
          icon: 'information-circle',
          bgColor: theme.colors.accent.info + '20',
        };
    }
  };

  const config = getConfig();

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }, { translateY: translateY.value }],
  }));

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <View style={[styles.content, { backgroundColor: config.bgColor }]}>
        <Ionicons name={config.icon as any} size={32} color={config.color} />
        <Text style={[styles.message, { color: theme.colors.text }]}>
          {message}
        </Text>
        {value !== undefined && (
          <Text style={[styles.value, { color: config.color }]}>
            {type === 'damage' ? `-${value}` : `+${value}`}
          </Text>
        )}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 100,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 1000,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    gap: 12,
  },
  message: {
    fontSize: 16,
    fontWeight: '600',
  },
  value: {
    fontSize: 20,
    fontWeight: '800',
  },
});
