import { TouchableOpacity, ActivityIndicator, Text, View } from 'react-native';
import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
  onPress?: () => void;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-primary-600 text-white',
  secondary: 'bg-white text-gray-700 border border-gray-300',
  ghost: 'text-gray-600',
  danger: 'bg-danger text-white',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-5 py-3 text-base',
};

const disabledClasses = 'opacity-50';

export function Button({
  variant = 'primary',
  size = 'md',
  loading,
  disabled,
  icon,
  children,
  className = '',
  onPress,
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      disabled={isDisabled}
      onPress={onPress}
      activeOpacity={0.7}
      className={`
        flex-row items-center justify-center font-medium rounded-lg
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${isDisabled ? disabledClasses : ''}
        ${variant === 'primary' || variant === 'danger' ? 'shadow-sm' : ''}
        ${className}
      `}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' || variant === 'danger' ? '#ffffff' : '#374151'}
        />
      ) : icon ? (
        <View className="shrink-0">{icon}</View>
      ) : null}
      {children ? (
        typeof children === 'string' ? (
          <Text
            className={`font-medium ${
              variant === 'primary' || variant === 'danger' ? 'text-white' :
              variant === 'secondary' ? 'text-gray-700' :
              'text-gray-600'
            } ${size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-base' : 'text-sm'}`}
          >
            {children}
          </Text>
        ) : (
          children
        )
      ) : null}
    </TouchableOpacity>
  );
}
