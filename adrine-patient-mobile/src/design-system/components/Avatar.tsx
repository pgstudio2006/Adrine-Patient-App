import { View, Text, Image } from 'react-native';
import React from 'react';

type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

interface AvatarProps {
  size?: AvatarSize;
  src?: string;
  name: string;
  className?: string;
}

const sizeClasses: Record<AvatarSize, { container: string; text: string }> = {
  sm: { container: 'w-8 h-8', text: 'text-xs' },
  md: { container: 'w-10 h-10', text: 'text-sm' },
  lg: { container: 'w-12 h-12', text: 'text-base' },
  xl: { container: 'w-16 h-16', text: 'text-lg' },
};

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

const avatarColorClasses = [
  'bg-primary-100',
  'bg-blue-100',
  'bg-amber-100',
  'bg-purple-100',
  'bg-pink-100',
  'bg-green-100',
];

const avatarTextClasses = [
  'text-primary-700',
  'text-blue-700',
  'text-amber-700',
  'text-purple-700',
  'text-pink-700',
  'text-green-700',
];

function getColorIndex(name: string): number {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash) % avatarColorClasses.length;
}

export function Avatar({ size = 'md', src, name, className = '' }: AvatarProps) {
  const dims = sizeClasses[size];
  const ci = getColorIndex(name);

  if (src) {
    return (
      <View className={`rounded-full bg-gray-200 overflow-hidden ${dims.container} ${className}`}>
        <Image source={{ uri: src }} className="w-full h-full" />
      </View>
    );
  }

  return (
    <View
      className={`rounded-full items-center justify-center ${dims.container} ${avatarColorClasses[ci]} ${className}`}
    >
      <Text className={`font-semibold ${avatarTextClasses[ci]} ${dims.text}`}>
        {getInitials(name)}
      </Text>
    </View>
  );
}
