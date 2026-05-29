import { View, Text } from 'react-native';
import React from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export function SectionHeader({ title, subtitle, action }: SectionHeaderProps) {
  return (
    <View className="flex-row items-start justify-between gap-4 mb-3">
      <View className="flex-1">
        <Text className="text-sm font-semibold text-gray-500 uppercase tracking-wider">{title}</Text>
        {subtitle && <Text className="text-xs text-muted mt-0.5">{subtitle}</Text>}
      </View>
      {action && <View className="shrink-0">{action}</View>}
    </View>
  );
}
