import React from 'react';
import {
    Pressable,
    StyleSheet,
    View,
    type PressableProps,
    type StyleProp,
    type ViewStyle,
} from 'react-native';

import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

interface CardProps extends Omit<PressableProps, 'style'> {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  /** When true, renders as a static View instead of Pressable */
  static?: boolean;
}

export function Card({ children, style, static: isStatic = false, ...rest }: CardProps) {
  const theme = useTheme();

  const cardStyle = [
    styles.card,
    { backgroundColor: theme.backgroundElement, borderColor: theme.border },
    style,
  ];

  if (isStatic) {
    return <View style={cardStyle}>{children}</View>;
  }

  return (
    <Pressable
      style={({ pressed }) => [
        ...cardStyle,
        pressed && styles.pressed,
      ]}
      accessibilityRole="button"
      {...rest}>
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Radius.lg,
    borderWidth: 1,
    overflow: 'hidden',
    padding: Spacing.three,
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.985 }],
  },
});
