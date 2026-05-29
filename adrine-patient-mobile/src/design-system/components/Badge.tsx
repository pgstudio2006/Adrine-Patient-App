import { View, Text } from 'react-native';
import React from 'react';

export type BadgeVariant = 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';

interface BadgeProps {
  variant?: BadgeVariant;
  dot?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const variantClasses: Record<BadgeVariant, string> = {
  primary: 'bg-primary-50',
  success: 'bg-green-50',
  warning: 'bg-amber-50',
  danger: 'bg-red-50',
  info: 'bg-blue-50',
  neutral: 'bg-gray-100',
};

const textClasses: Record<BadgeVariant, string> = {
  primary: 'text-primary-700',
  success: 'text-green-700',
  warning: 'text-amber-700',
  danger: 'text-red-700',
  info: 'text-blue-700',
  neutral: 'text-gray-600',
};

const dotColors: Record<BadgeVariant, string> = {
  primary: 'bg-primary-500',
  success: 'bg-green-500',
  warning: 'bg-amber-500',
  danger: 'bg-red-500',
  info: 'bg-blue-500',
  neutral: 'bg-gray-400',
};

export function Badge({ variant = 'neutral', dot = false, className = '', children }: BadgeProps) {
  return (
    <View className={`flex-row items-center gap-1.5 px-2.5 py-0.5 rounded-full ${variantClasses[variant]} ${className}`}>
      {dot && <View className={`w-1.5 h-1.5 rounded-full ${dotColors[variant]}`} />}
      {typeof children === 'string' ? (
        <Text className={`text-xs font-medium ${textClasses[variant]}`}>{children}</Text>
      ) : (
        children
      )}
    </View>
  );
}
