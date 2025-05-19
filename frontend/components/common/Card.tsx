import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { COLORS, BORDER_RADIUS, SHADOWS } from '../../constants/theme';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  elevation?: 'none' | 'small' | 'medium' | 'large';
  padding?: 'none' | 'small' | 'medium' | 'large';
  backgroundColor?: string;
  borderRadius?: number;
}

const Card: React.FC<CardProps> = ({
  children,
  style,
  elevation = 'medium',
  padding = 'medium',
  backgroundColor = COLORS.background.light,
  borderRadius = BORDER_RADIUS.md,
}) => {
  // Determine shadow based on elevation
  const getShadowStyle = (): ViewStyle => {
    switch (elevation) {
      case 'none':
        return {};
      case 'small':
        return SHADOWS.sm;
      case 'large':
        return SHADOWS.lg;
      default: // medium
        return SHADOWS.md;
    }
  };
  
  // Determine padding based on size
  const getPaddingStyle = (): ViewStyle => {
    switch (padding) {
      case 'none':
        return { padding: 0 };
      case 'small':
        return { padding: 8 };
      case 'large':
        return { padding: 24 };
      default: // medium
        return { padding: 16 };
    }
  };
  
  return (
    <View
      style={[
        styles.card,
        getShadowStyle(),
        getPaddingStyle(),
        { backgroundColor, borderRadius },
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    overflow: 'hidden',
  },
});

export default Card;
