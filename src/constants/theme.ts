/**
 * Design System — Dark Premium E-commerce
 *
 * Centralized tokens: colors, spacing, typography, border radius, shadows.
 * All UI components should reference these values instead of hardcoding.
 */

import '@/global.css';

import { Platform } from 'react-native';

// ---------------------------------------------------------------------------
// Colors
// ---------------------------------------------------------------------------

export const Colors = {
  light: {
    // surfaces
    background: '#ffffff',
    backgroundElement: '#F0F0F3',
    backgroundSelected: '#E0E1E6',
    // text
    text: '#000000',
    textSecondary: '#60646C',
    // brand
    primary: '#3C87F7',
    primaryPressed: '#2D6ED4',
    // feedback
    error: '#E5534B',
    success: '#3DD68C',
    warning: '#F0A855',
    // border
    border: '#E0E1E6',
    borderSubtle: '#F0F0F3',
    // overlay
    overlay: 'rgba(0,0,0,0.4)',
  },
  dark: {
    // surfaces
    background: '#0A0A0A',
    backgroundElement: '#141416',
    backgroundSelected: '#1C1C1F',
    // text
    text: '#F2F2F3',
    textSecondary: '#8A8F98',
    // brand
    primary: '#4D94FF',
    primaryPressed: '#3A7FE8',
    // feedback
    error: '#E5534B',
    success: '#3DD68C',
    warning: '#F0A855',
    // border
    border: '#2A2A2E',
    borderSubtle: '#1C1C1F',
    // overlay
    overlay: 'rgba(0,0,0,0.65)',
  },
} as const;

export type ColorScheme = 'light' | 'dark';
export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

// ---------------------------------------------------------------------------
// Spacing — 4px base grid
// ---------------------------------------------------------------------------

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

// ---------------------------------------------------------------------------
// Border Radius
// ---------------------------------------------------------------------------

export const Radius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;

// ---------------------------------------------------------------------------
// Typography
// ---------------------------------------------------------------------------

export const FontSize = {
  xs: 11,
  sm: 13,
  md: 15,
  lg: 17,
  xl: 20,
  xxl: 24,
  display: 32,
  hero: 40,
} as const;

export const FontWeight = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const;

export const LineHeight = {
  tight: 1.2,
  normal: 1.5,
  relaxed: 1.7,
} as const;

// ---------------------------------------------------------------------------
// Fonts
// ---------------------------------------------------------------------------

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

// ---------------------------------------------------------------------------
// Layout
// ---------------------------------------------------------------------------

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;

// ---------------------------------------------------------------------------
// Component dimensions
// ---------------------------------------------------------------------------

export const ComponentSize = {
  buttonHeight: 52,
  inputHeight: 52,
  cardImageHeight: 220,
  avatarSm: 32,
  avatarMd: 48,
  iconSm: 16,
  iconMd: 20,
  iconLg: 24,
} as const;
