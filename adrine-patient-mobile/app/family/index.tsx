import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { ArrowLeft, Users, Plus, Heart, Baby, User } from 'lucide-react-native';
import { Card } from '../../src/design-system';
import { useFamilyMembers } from '../../src/modules/family/hooks';
import type { FamilyMember } from '../../src/modules/family/types';

const RELATIONSHIP_ICONS: Record<string, { icon: any; color: string; bg: string }> = {
  self: { icon: Heart, color: '#0d9488', bg: '#ccfbf1' },
  spouse: { icon: Heart, color: '#dc2626', bg: '#fef2f2' },
  child: { icon: Baby, color: '#2563eb', bg: '#eff6ff' },
  parent: { icon: User, color: '#9333ea', bg: '#faf5ff' },
  sibling: { icon: User, color: '#d97706', bg: '#fffbeb' },
};

export default function FamilyPage() {
  const router = useRouter();
  const { data: members, isLoading } = useFamilyMembers();

  return (
    <View className="flex-1 bg-surface-secondary">
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        <View className="pt-4 pb-8 space-y-4">
          {/* Header */}
          <View className="flex-row items-center gap-3">
            <TouchableOpacity onPress={() => router.back()} className="w-9 h-9 rounded-full bg-gray-100 items-center justify-center">
              <ArrowLeft size={18} color="#374151" />
            </TouchableOpacity>
            <View className="flex-1">
              <Text className="text-xl font-bold text-gray-900">Family</Text>
              <Text className="text-sm text-gray-500">Manage family connections</Text>
            </View>
            <TouchableOpacity className="w-9 h-9 rounded-full bg-primary-100 items-center justify-center">
              <Plus size={18} color="#0d9488" />
            </TouchableOpacity>
          </View>

          {/* Members List */}
          {isLoading ? (
            <View className="space-y-2">
              {[1, 2, 3].map((i) => (
                <Card key={i} padding="md">
                  <View className="flex-row gap-3">
                    <View className="w-12 h-12 rounded-full bg-gray-200 animate-pulse" />
                    <View className="flex-1 space-y-2">
                      <View className="h-5 w-32 bg-gray-200 rounded animate-pulse" />
                      <View className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                    </View>
                  </View>
                </Card>
              ))}
            </View>
          ) : members && members.length > 0 ? (
            <View className="space-y-2">
              {members.map((member) => {
                const relInfo = RELATIONSHIP_ICONS[member.relationship] || RELATIONSHIP_ICONS.self;
                const Icon = relInfo.icon;
                return (
                  <TouchableOpacity
                    key={member.id}
                    onPress={() => router.push(`/family/${member.id}`)}
                    activeOpacity={0.7}
                  >
                    <Card variant="hover" padding="md">
                      <View className="flex-row items-center gap-3">
                        <View
                          className="w-12 h-12 rounded-full items-center justify-center"
                          style={{ backgroundColor: relInfo.bg }}
                        >
                          <Icon size={20} color={relInfo.color} />
                        </View>
                        <View className="flex-1">
                          <View className="flex-row items-center gap-2">
                            <Text className="text-sm font-semibold text-gray-900">{member.name}</Text>
                            {member.relationship === 'self' && (
                              <View className="bg-primary-50 px-2 py-0.5 rounded-full">
                                <Text className="text-[10px] font-medium text-primary-600">You</Text>
                              </View>
                            )}
                          </View>
                          <Text className="text-xs text-gray-500 capitalize">{member.relationship}</Text>
                          {member.bloodGroup && (
                            <Text className="text-[11px] text-gray-400 mt-0.5">Blood: {member.bloodGroup}</Text>
                          )}
                        </View>
                      </View>
                    </Card>
                  </TouchableOpacity>
                );
              })}
            </View>
          ) : (
            <Card padding="lg">
              <View className="items-center py-8">
                <Users size={40} color="#94a3b8" />
                <Text className="text-base font-semibold text-gray-900 mt-3">No family members</Text>
                <Text className="text-sm text-gray-500 mt-1">Add your family to manage their health too.</Text>
              </View>
            </Card>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
