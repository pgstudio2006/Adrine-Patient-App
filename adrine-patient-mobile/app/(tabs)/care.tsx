import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { CalendarCheck, Plus, ArrowRight, Search, Filter } from 'lucide-react-native';
import { Card } from '../../src/design-system';
import { StatusBadge } from '../../src/design-system/components/StatusBadge';
import { useAppointments } from '../../src/modules/appointments/hooks';
import { useFamilyMembers } from '../../src/modules/family/hooks';
import type { Appointment } from '../../src/modules/appointments/types';

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
}

function getGroup(date: string): string {
  const d = new Date(date);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (d.toDateString() === today.toDateString()) return 'Today';
  if (d.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
  if (d > new Date()) return 'Upcoming';
  return 'Past';
}

export default function CarePage() {
  const router = useRouter();
  const { data: appointments, isLoading, error } = useAppointments();
  const { data: familyMembers } = useFamilyMembers();
  const [filterMember, setFilterMember] = useState('all');

  const filterOptions = [
    { id: 'all', label: 'All' },
    { id: 'self', label: 'You' },
    ...(familyMembers ?? [])
      .filter((m) => m.relationship !== 'self' && m.status === 'active')
      .map((m) => ({ id: m.patientId, label: m.name.split(' (')[0] })),
  ];

  const getPatientFilterId = (apt: Appointment): string => {
    if (!apt.patientName || apt.patientName === 'You') return 'self';
    return apt.patientId;
  };

  const filtered = (appointments ?? []).filter((a) => {
    if (filterMember === 'all') return true;
    return getPatientFilterId(a) === filterMember;
  });

  const upcoming = filtered
    .filter((a) => a.status !== 'cancelled' && a.status !== 'no_show' && !['completed', 'past'].includes(getGroup(a.startAt)))
    .sort((a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime());

  const past = filtered
    .filter((a) => a.status === 'completed' || a.status === 'no_show' || getGroup(a.startAt) === 'Past')
    .sort((a, b) => new Date(b.startAt).getTime() - new Date(a.startAt).getTime());

  return (
    <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
      <View className="pt-4 pb-6 space-y-4">
        {/* Header */}
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-xl font-bold text-gray-900">Care</Text>
            <Text className="text-sm text-gray-500">Manage your visits</Text>
          </View>
          <TouchableOpacity
            onPress={() => router.push('/appointments/book')}
            className="flex-row items-center gap-1.5 bg-primary-600 px-4 py-2 rounded-lg"
          >
            <Plus size={16} color="white" />
            <Text className="text-white text-sm font-medium">Book</Text>
          </TouchableOpacity>
        </View>

        {/* Family filter */}
        {filterOptions.length > 2 && (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="-mx-4 px-4">
            <View className="flex-row gap-2 py-1">
              {filterOptions.map((opt) => (
                <TouchableOpacity
                  key={opt.id}
                  onPress={() => setFilterMember(opt.id)}
                  className={`px-3 py-1.5 rounded-full ${filterMember === opt.id ? 'bg-primary-600' : 'bg-gray-100'}`}
                >
                  <Text
                    className={`text-xs font-medium ${filterMember === opt.id ? 'text-white' : 'text-gray-600'}`}
                  >
                    {opt.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        )}

        {/* Loading */}
        {isLoading ? (
          <View className="space-y-3">
            {[1, 2, 3].map((i) => (
              <Card key={i} padding="md">
                <View className="space-y-2">
                  <View className="h-5 w-44 bg-gray-200 rounded animate-pulse" />
                  <View className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                  <View className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                </View>
              </Card>
            ))}
          </View>
        ) : error ? (
          <Card padding="lg">
            <View className="items-center py-6">
              <View className="w-12 h-12 rounded-full bg-red-50 items-center justify-center mb-3">
                <Text className="text-red-600 text-xl">!</Text>
              </View>
              <Text className="text-sm font-medium text-gray-900">Failed to load appointments</Text>
              <TouchableOpacity className="mt-3 bg-gray-100 px-4 py-2 rounded-lg" onPress={() => {}}>
                <Text className="text-sm font-medium text-gray-700">Try Again</Text>
              </TouchableOpacity>
            </View>
          </Card>
        ) : appointments && appointments.length === 0 ? (
          <Card padding="lg">
            <View className="items-center py-8">
              <CalendarCheck size={40} color="#94a3b8" />
              <Text className="text-base font-semibold text-gray-900 mt-3">No appointments yet</Text>
              <Text className="text-sm text-gray-500 mt-1">Book your first appointment to get started.</Text>
              <TouchableOpacity
                onPress={() => router.push('/appointments/book')}
                className="flex-row items-center gap-1.5 bg-primary-600 px-4 py-2.5 rounded-lg mt-4"
              >
                <Plus size={16} color="white" />
                <Text className="text-white text-sm font-medium">Book Appointment</Text>
              </TouchableOpacity>
            </View>
          </Card>
        ) : (
          <>
            {/* Upcoming */}
            {upcoming.length > 0 && (
              <View>
                <Text className="section-title mb-2">Upcoming</Text>
                <View className="space-y-2">
                  {upcoming.map((apt) => (
                    <TouchableOpacity
                      key={apt.id}
                      onPress={() => router.push(`/appointments/${apt.id}`)}
                      activeOpacity={0.7}
                    >
                      <Card variant="hover" padding="md">
                        <View className="flex-row items-start gap-3">
                          <View className="w-12 h-12 rounded-full bg-primary-100 items-center justify-center shrink-0">
                            <Text className="text-sm font-bold text-primary-700">
                              {apt.providerName.split(' ').map((n) => n[0]).join('')}
                            </Text>
                          </View>
                          <View className="flex-1 min-w-0">
                            <View className="flex-row items-center gap-2">
                              <Text className="text-sm font-semibold text-gray-900 flex-1" numberOfLines={1}>
                                {apt.providerName}
                              </Text>
                              {apt.patientName && apt.patientName !== 'You' && (
                                <View className="bg-primary-50 px-2 py-0.5 rounded-full">
                                  <Text className="text-[10px] font-medium text-primary-600">{apt.patientName}</Text>
                                </View>
                              )}
                              <StatusBadge status={apt.status} domain="appointment" />
                            </View>
                            <Text className="text-xs text-gray-500 mt-0.5">{apt.specialty}</Text>
                            <Text className="text-xs text-gray-600 mt-1">
                              {(apt.patientName && apt.patientName !== 'You' ? `${apt.patientName} · ` : '') + formatDate(apt.startAt) + ' · ' + formatTime(apt.startAt)}
                            </Text>
                          </View>
                        </View>
                      </Card>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}

            {/* Past */}
            {past.length > 0 && (
              <View>
                <Text className="section-title mb-2">Past</Text>
                <View className="space-y-2">
                  {past.map((apt) => (
                    <TouchableOpacity
                      key={apt.id}
                      onPress={() => router.push(`/appointments/${apt.id}`)}
                      activeOpacity={0.7}
                    >
                      <Card variant="hover" padding="md">
                        <View className="flex-row items-start gap-3">
                          <View className="w-12 h-12 rounded-full bg-gray-100 items-center justify-center shrink-0">
                            <Text className="text-sm font-bold text-gray-500">
                              {apt.providerName.split(' ').map((n) => n[0]).join('')}
                            </Text>
                          </View>
                          <View className="flex-1 min-w-0">
                            <View className="flex-row items-center gap-2">
                              <Text className="text-sm font-semibold text-gray-900 flex-1" numberOfLines={1}>
                                {apt.providerName}
                              </Text>
                              {apt.patientName && apt.patientName !== 'You' && (
                                <View className="bg-gray-100 px-2 py-0.5 rounded-full">
                                  <Text className="text-[10px] font-medium text-gray-500">{apt.patientName}</Text>
                                </View>
                              )}
                              <StatusBadge status={apt.status} domain="appointment" />
                            </View>
                            <Text className="text-xs text-gray-500 mt-0.5">{apt.specialty}</Text>
                            <Text className="text-xs text-gray-500 mt-1">
                              {(apt.patientName && apt.patientName !== 'You' ? `${apt.patientName} · ` : '') + formatDate(apt.startAt) + ' · ' + formatTime(apt.startAt)}
                            </Text>
                          </View>
                        </View>
                      </Card>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}
          </>
        )}
      </View>
    </ScrollView>
  );
}
