import { View } from 'react-native';

export function AppointmentDetailsSkeleton() {
  return (
    <View className="p-4 space-y-4">
      <View className="h-6 w-48 bg-gray-200 rounded animate-pulse" />
      <View className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
      <View className="h-24 bg-gray-100 rounded-xl animate-pulse" />
      <View className="h-4 w-40 bg-gray-200 rounded animate-pulse" />
      <View className="h-4 w-36 bg-gray-200 rounded animate-pulse" />
      <View className="h-4 w-28 bg-gray-200 rounded animate-pulse" />
    </View>
  );
}
