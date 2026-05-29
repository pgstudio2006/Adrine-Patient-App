import { View, Text } from 'react-native';
import React from 'react';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <View className="items-center justify-center py-12 px-4">
      {icon && <View className="mb-4">{icon}</View>}
      <Text className="text-base font-semibold text-gray-900 text-center">{title}</Text>
      {description && (
        <Text className="text-sm text-muted mt-1 text-center max-w-[280px]">{description}</Text>
      )}
      {action && <View className="mt-4">{action}</View>}
    </View>
  );
}
