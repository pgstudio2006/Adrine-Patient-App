import { View } from 'react-native';
import React from 'react';

type CardVariant = 'default' | 'hover' | 'interactive' | 'flat';
type CardPadding = 'none' | 'sm' | 'md' | 'lg';

interface CardProps {
  variant?: CardVariant;
  padding?: CardPadding;
  className?: string;
  children?: React.ReactNode;
}

const variantClasses: Record<CardVariant, string> = {
  default: 'bg-white border border-gray-200 rounded-xl',
  hover: 'bg-white border border-gray-200 rounded-xl',
  interactive: 'bg-white border border-gray-200 rounded-xl',
  flat: 'bg-gray-50 rounded-xl',
};

const paddingClasses: Record<CardPadding, string> = {
  none: 'p-0',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-5',
};

export function Card({ variant = 'default', padding = 'md', className = '', children }: CardProps) {
  return (
    <View className={`${variantClasses[variant]} ${paddingClasses[padding]} ${className}`}>
      {children}
    </View>
  );
}

export function CardHeader({ className = '', children }: { className?: string; children?: React.ReactNode }) {
  return (
    <View className={`flex-row items-center justify-between gap-3 mb-3 ${className}`}>
      {children}
    </View>
  );
}

export function CardTitle({ className = '', children }: { className?: string; children?: React.ReactNode }) {
  return (
    <View className={`${className}`}>
      {typeof children === 'string' ? (
        <CardTitleText>{children}</CardTitleText>
      ) : (
        children
      )}
    </View>
  );
}

function CardTitleText({ children }: { children: string }) {
  return (
    <View className={`text-base font-semibold text-gray-900`}>
      {children}
    </View>
  );
}

export function CardContent({ className = '', children }: { className?: string; children?: React.ReactNode }) {
  return <View className={className}>{children}</View>;
}

export function CardFooter({ className = '', children }: { className?: string; children?: React.ReactNode }) {
  return (
    <View className={`flex-row items-center justify-between gap-3 mt-3 pt-3 border-t border-gray-100 ${className}`}>
      {children}
    </View>
  );
}
