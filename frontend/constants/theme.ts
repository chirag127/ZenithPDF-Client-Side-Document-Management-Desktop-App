// Theme constants for the application

// Colors
export const COLORS = {
  primary: {
    light: '#4B91F7',
    DEFAULT: '#3B82F6',
    dark: '#2563EB',
  },
  secondary: {
    light: '#34D399',
    DEFAULT: '#10B981',
    dark: '#059669',
  },
  accent: {
    light: '#FBBF24',
    DEFAULT: '#F59E0B',
    dark: '#D97706',
  },
  background: {
    light: '#F9FAFB',
    DEFAULT: '#F3F4F6',
    dark: '#E5E7EB',
  },
  text: {
    light: '#4B5563',
    DEFAULT: '#1F2937',
    dark: '#111827',
  },
  error: {
    light: '#F87171',
    DEFAULT: '#EF4444',
    dark: '#DC2626',
  },
  success: {
    light: '#34D399',
    DEFAULT: '#10B981',
    dark: '#059669',
  },
  warning: {
    light: '#FBBF24',
    DEFAULT: '#F59E0B',
    dark: '#D97706',
  },
  info: {
    light: '#60A5FA',
    DEFAULT: '#3B82F6',
    dark: '#2563EB',
  },
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },
};

// Spacing
export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// Typography
export const FONT_SIZE = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 30,
};

export const FONT_WEIGHT = {
  thin: '100',
  extralight: '200',
  light: '300',
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
  black: '900',
};

// Border radius
export const BORDER_RADIUS = {
  xs: 2,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 24,
  full: 9999,
};

// Shadows
export const SHADOWS = {
  sm: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
};

// Animation durations
export const ANIMATION = {
  fast: 200,
  normal: 300,
  slow: 500,
};

// Screen dimensions (to be calculated at runtime)
export const SCREEN = {
  width: 0,
  height: 0,
  isSmall: false,
  isMedium: false,
  isLarge: false,
};
