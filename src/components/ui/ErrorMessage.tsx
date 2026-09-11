import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';

import { Button } from './Button';

import { FontSize, FontWeight, Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  retryLabel?: string;
  style?: StyleProp<ViewStyle>;
}

export function ErrorMessage({
  message,
  onRetry,
  retryLabel = 'Tentar novamente',
  style,
}: ErrorMessageProps) {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.backgroundElement, borderColor: theme.error },
        style,
      ]}>
      <Text style={styles.icon}>⚠</Text>
      <Text style={[styles.message, { color: theme.text }]}>{message}</Text>
      {onRetry && (
        <Button
          label={retryLabel}
          variant="ghost"
          fullWidth={false}
          onPress={onRetry}
          style={styles.retryButton}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: Radius.md,
    borderWidth: 1,
    padding: Spacing.four,
    alignItems: 'center',
    gap: Spacing.two,
    marginHorizontal: Spacing.three,
  },
  icon: {
    fontSize: 24,
  },
  message: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.medium,
    textAlign: 'center',
    lineHeight: 20,
    flexShrink: 1,
  },
  retryButton: {
    marginTop: Spacing.one,
  },
});
