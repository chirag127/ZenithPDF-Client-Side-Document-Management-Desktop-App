import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ViewStyle } from 'react-native';
import { COLORS, SPACING, FONT_SIZE } from '../../constants/theme';

interface ProgressIndicatorProps {
  progress: number; // 0-100
  message?: string;
  showPercentage?: boolean;
  size?: 'small' | 'medium' | 'large';
  color?: string;
  style?: ViewStyle;
  indeterminate?: boolean;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  progress,
  message,
  showPercentage = true,
  size = 'medium',
  color = COLORS.primary.DEFAULT,
  style,
  indeterminate = false,
}) => {
  // Ensure progress is between 0 and 100
  const normalizedProgress = Math.min(Math.max(progress, 0), 100);
  
  // Determine size dimensions
  const getSize = () => {
    switch (size) {
      case 'small':
        return {
          height: 4,
          fontSize: FONT_SIZE.xs,
        };
      case 'large':
        return {
          height: 12,
          fontSize: FONT_SIZE.md,
        };
      default: // medium
        return {
          height: 8,
          fontSize: FONT_SIZE.sm,
        };
    }
  };
  
  const sizeStyles = getSize();
  
  return (
    <View style={[styles.container, style]}>
      {message && (
        <Text style={[styles.message, { fontSize: sizeStyles.fontSize }]}>
          {message}
        </Text>
      )}
      
      {indeterminate ? (
        <ActivityIndicator size={size} color={color} style={styles.activityIndicator} />
      ) : (
        <View style={[styles.progressBarContainer, { height: sizeStyles.height }]}>
          <View
            style={[
              styles.progressBar,
              {
                width: `${normalizedProgress}%`,
                backgroundColor: color,
              },
            ]}
          />
        </View>
      )}
      
      {showPercentage && !indeterminate && (
        <Text style={[styles.percentage, { fontSize: sizeStyles.fontSize }]}>
          {Math.round(normalizedProgress)}%
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  message: {
    marginBottom: SPACING.xs,
    color: COLORS.text.DEFAULT,
  },
  progressBarContainer: {
    width: '100%',
    backgroundColor: COLORS.gray[200],
    borderRadius: 999,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 999,
  },
  percentage: {
    marginTop: SPACING.xs,
    textAlign: 'right',
    color: COLORS.text.light,
  },
  activityIndicator: {
    marginVertical: SPACING.xs,
  },
});

export default ProgressIndicator;
