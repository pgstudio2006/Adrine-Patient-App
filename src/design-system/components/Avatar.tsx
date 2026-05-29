'use client';

import type { HTMLAttributes } from 'react';

export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  size?: AvatarSize;
  src?: string;
  name: string;
}

const sizeClasses: Record<AvatarSize, string> = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
  xl: 'w-16 h-16 text-lg',
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

const avatarColors = [
  'bg-primary-100 text-primary-700',
  'bg-blue-100 text-blue-700',
  'bg-amber-100 text-amber-700',
  'bg-purple-100 text-purple-700',
  'bg-pink-100 text-pink-700',
  'bg-green-100 text-green-700',
];

function getColorClass(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return avatarColors[Math.abs(hash) % avatarColors.length];
}

export function Avatar({ size = 'md', src, name, className = '', ...props }: AvatarProps) {
  if (src) {
    return (
      <div
        className={`rounded-full bg-gray-200 shrink-0 overflow-hidden ${sizeClasses[size]} ${className}`}
        {...props}
      >
        <img src={src} alt={name} className="w-full h-full object-cover" />
      </div>
    );
  }

  return (
    <div
      className={`rounded-full flex items-center justify-center font-semibold shrink-0 ${sizeClasses[size]} ${getColorClass(name)} ${className}`}
      title={name}
      {...props}
    >
      {getInitials(name)}
    </div>
  );
}
