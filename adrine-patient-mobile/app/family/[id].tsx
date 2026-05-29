import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams, Stack } from 'expo-router';
import { ArrowLeft, Heart, Calendar, Droplet, Phone, MapPin } from 'lucide-react-native';
import { Card } from '../../src/design-system';
import { useFamilyMember } from '../../src/modules/family/hooks';

export default function FamilyMemberDetailPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { data: member, isLoading } = useFamilyMember(id!);

  if (isLoading || !member) {
    return (
      <View className="flex-1 bg-surface-secondary">
        <Stack.Screen options={{ headerShown: false }} />
        <View className="p-4">
          <TouchableOpacity onPress={() => router.back()} className="mb-4">
            <View className="flex-row items-center gap-2">
              <ArrowLeft size={20} color="#0d9488" />
              <Text className="text-sm font-medium text-primary-600">Back</Text>
            </View>
          </TouchableOpacity>
          <Card padding="lg">
            <View className="items-center py-8">
              <View className="w-20 h-20 rounded-full bg-gray-200 animate-pulse mb-4" />
              <View className="h-6 w-40 bg-gray-200 rounded animate-pulse mb-2" />
              <View className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
            </View>
          </Card>
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-surface-secondary">
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        <View className="pt-4 pb-8 space-y-4">
          {/* Back */}
          <TouchableOpacity onPress={() => router.back()} className="flex-row items-center gap-2">
            <ArrowLeft size={20} color="#0d9488" />
            <Text className="text-sm font-medium text-primary-600">Back</Text>
          </TouchableOpacity>

          {/* Profile Header */}
          <View className="items-center py-4">
            <View className="w-20 h-20 rounded-full bg-primary-100 items-center justify-center mb-3">
              <Text className="text-3xl font-bold text-primary-600">{member.name.charAt(0)}</Text>
            </View>
            <Text className="text-lg font-bold text-gray-900">{member.name}</Text>
            <Text className="text-sm text-gray-500 capitalize">{member.relationship}</Text>
          </View>

          {/* Info Card */}
          <Card padding="lg">
            <Text className="text-sm font-semibold text-gray-900 mb-4">Details</Text>
            <View className="space-y-4">
              <View className="flex-row items-center gap-3">
                <Calendar size={18} color="#64748b" />
                <View>
                  <Text className="text-xs text-gray-500">Date of Birth</Text>
                  <Text className="text-sm font-medium text-gray-900">
                    {new Date(member.dateOfBirth).toLocaleDateString(undefined, {
                      month: 'long', day: 'numeric', year: 'numeric',
                    })}
                  </Text>
                </View>
              </View>
              <View className="flex-row items-center gap-3">
                <Heart size={18} color="#64748b" />
                <View>
                  <Text className="text-xs text-gray-500">Gender</Text>
                  <Text className="text-sm font-medium text-gray-900 capitalize">{member.gender}</Text>
                </View>
              </View>
              {member.bloodGroup && (
                <View className="flex-row items-center gap-3">
                  <Droplet size={18} color="#64748b" />
                  <View>
                    <Text className="text-xs text-gray-500">Blood Group</Text>
                    <Text className="text-sm font-medium text-gray-900">{member.bloodGroup}</Text>
                  </View>
                </View>
              )}
            </View>
          </Card>

          {/* Quick Actions */}
          <View className="flex-row gap-3">
            <TouchableOpacity className="flex-1 bg-primary-600 py-3 rounded-xl items-center flex-row justify-center gap-2">
              <Phone size={16} color="white" />
              <Text className="text-white font-medium">Call</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 bg-white border border-gray-300 py-3 rounded-xl items-center flex-row justify-center gap-2">
              <MapPin size={16} color="#374151" />
              <Text className="text-gray-700 font-medium">Directions</Text>
            </TouchableOpacity>
          </View>

          {/* Health Summary */}
          <Card padding="lg">
            <Text className="text-sm font-semibold text-gray-900 mb-3">Health Summary</Text>
            <View className="flex-row gap-3">
              <View className="flex-1 bg-blue-50 rounded-xl p-3 items-center">
                <Text className="text-lg font-bold text-blue-700">—</Text>
                <Text className="text-[10px] text-blue-600 mt-1">Last Visit</Text>
              </View>
              <View className="flex-1 bg-green-50 rounded-xl p-3 items-center">
                <Text className="text-lg font-bold text-green-700">—</Text>
                <Text className="text-[10px] text-green-600 mt-1">Upcoming</Text>
              </View>
              <View className="flex-1 bg-purple-50 rounded-xl p-3 items-center">
                <Text className="text-lg font-bold text-purple-700">0</Text>
                <Text className="text-[10px] text-purple-600 mt-1">Records</Text>
              </View>
            </View>
          </Card>
        </View>
      </ScrollView>
    </View>
  );
}
