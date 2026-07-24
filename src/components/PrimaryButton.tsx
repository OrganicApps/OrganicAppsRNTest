import type { PropsWithChildren } from 'react';
import { Pressable, StyleSheet, Text, type ViewStyle } from 'react-native';

import { colors, radius } from '@/constants/theme';

type Props = PropsWithChildren<{
  onPress: () => void;
  appearance?: 'primary' | 'light';
  style?: ViewStyle;
}>;

export function PrimaryButton({ appearance = 'primary', children, onPress, style }: Props) {
  const light = appearance === 'light';
  return (
    <Pressable
      accessibilityRole="button"
      style={({ pressed }) => [
        styles.button,
        light ? styles.light : styles.primary,
        pressed && styles.pressed,
        style,
      ]}
      onPress={onPress}
    >
      <Text style={[styles.label, light && styles.lightLabel]}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderRadius: radius.medium,
    height: 56,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  label: {
    color: colors.white,
    fontSize: 17,
    fontWeight: '700',
  },
  light: {
    backgroundColor: colors.white,
  },
  lightLabel: {
    color: colors.black,
  },
  pressed: {
    opacity: 0.82,
  },
  primary: {
    backgroundColor: colors.accent,
  },
});
