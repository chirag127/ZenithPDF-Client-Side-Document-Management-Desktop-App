import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { COLORS, BORDER_RADIUS, SPACING } from '../../constants/theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  fullWidth = false,
  style,
  textStyle,
  leftIcon,
  rightIcon,
}) => {
  // Determine button styles based on variant and size
  const getButtonStyles = (): ViewStyle => {
    let buttonStyle: ViewStyle = {
      borderRadius: BORDER_RADIUS.md,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    };
    
    // Size styles
    switch (size) {
      case 'small':
        buttonStyle = {
          ...buttonStyle,
          paddingVertical: SPACING.xs,
          paddingHorizontal: SPACING.md,
        };
        break;
      case 'large':
        buttonStyle = {
          ...buttonStyle,
          paddingVertical: SPACING.md,
          paddingHorizontal: SPACING.xl,
        };
        break;
      default: // medium
        buttonStyle = {
          ...buttonStyle,
          paddingVertical: SPACING.sm,
          paddingHorizontal: SPACING.lg,
        };
    }
    
    // Variant styles
    switch (variant) {
      case 'secondary':
        buttonStyle = {
          ...buttonStyle,
          backgroundColor: COLORS.secondary.DEFAULT,
        };
        break;
      case 'outline':
        buttonStyle = {
          ...buttonStyle,
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: COLORS.primary.DEFAULT,
        };
        break;
      case 'text':
        buttonStyle = {
          ...buttonStyle,
          backgroundColor: 'transparent',
        };
        break;
      default: // primary
        buttonStyle = {
          ...buttonStyle,
          backgroundColor: COLORS.primary.DEFAULT,
        };
    }
    
    // Disabled state
    if (disabled) {
      buttonStyle = {
        ...buttonStyle,
        opacity: 0.5,
      };
    }
    
    // Full width
    if (fullWidth) {
      buttonStyle = {
        ...buttonStyle,
        width: '100%',
      };
    }
    
    return buttonStyle;
  };
  
  // Determine text styles based on variant and size
  const getTextStyles = (): TextStyle => {
    let textStyleObj: TextStyle = {
      fontWeight: '600',
    };
    
    // Size styles
    switch (size) {
      case 'small':
        textStyleObj = {
          ...textStyleObj,
          fontSize: 14,
        };
        break;
      case 'large':
        textStyleObj = {
          ...textStyleObj,
          fontSize: 18,
        };
        break;
      default: // medium
        textStyleObj = {
          ...textStyleObj,
          fontSize: 16,
        };
    }
    
    // Variant styles
    switch (variant) {
      case 'outline':
      case 'text':
        textStyleObj = {
          ...textStyleObj,
          color: COLORS.primary.DEFAULT,
        };
        break;
      default: // primary, secondary
        textStyleObj = {
          ...textStyleObj,
          color: 'white',
        };
    }
    
    return textStyleObj;
  };
  
  return (
    <TouchableOpacity
      style={[getButtonStyles(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator 
          size="small" 
          color={variant === 'outline' || variant === 'text' ? COLORS.primary.DEFAULT : 'white'} 
        />
      ) : (
        <>
          {leftIcon && <>{leftIcon}</>}
          <Text style={[getTextStyles(), textStyle, leftIcon && { marginLeft: SPACING.sm }, rightIcon && { marginRight: SPACING.sm }]}>
            {title}
          </Text>
          {rightIcon && <>{rightIcon}</>}
        </>
      )}
    </TouchableOpacity>
  );
};

export default Button;
