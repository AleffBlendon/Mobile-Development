import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    type StyleProp,
    type TextInputProps,
    type ViewStyle
} from 'react-native';

import { ComponentSize, FontSize, FontWeight, Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: StyleProp<ViewStyle>;
  rightElement?: React.ReactNode;
}

export function Input({
  label,
  error,
  containerStyle,
  rightElement,
  style,
  onFocus,
  onBlur,
  ...rest
}: InputProps) {
  const theme = useTheme();
  const [focused, setFocused] = useState(false);

  const borderColor = error
    ? theme.error
    : focused
    ? theme.primary
    : theme.border;

  return (
    <View style={[styles.wrapper, containerStyle]}>
      {label ? (
        <Text style={[styles.label, { color: theme.textSecondary }]}>
          {label}
        </Text>
      ) : null}
      <View
        style={[
          styles.inputContainer,
          {
            backgroundColor: theme.background,
            borderColor,
          },
        ]}>
        <TextInput
          {...rest}
          style={[styles.input, { color: theme.text }, style]}
          placeholderTextColor={theme.textSecondary}
          onFocus={(event) => {
            setFocused(true);
            onFocus?.(event);
          }}
          onBlur={(event) => {
            setFocused(false);
            onBlur?.(event);
          }}
        />
        {rightElement ? (
          <View style={styles.rightElement}>
            {rightElement}
          </View>
        ) : null}
      </View>
      {error ? (
        <Text style={[styles.errorText, { color: theme.error }]}>{error}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: Spacing.one,
  },
  label: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.medium,
    marginBottom: Spacing.one,
  },
  inputContainer: {
    height: ComponentSize.inputHeight,
    borderRadius: Radius.md,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.three,
  },
  input: {
    flex: 1,
    fontSize: FontSize.md,
    fontWeight: FontWeight.regular,
    paddingVertical: 0,
  },
  rightElement: {
    paddingLeft: Spacing.two,
  },
  errorText: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.medium,
    marginTop: Spacing.one,
  },
});
