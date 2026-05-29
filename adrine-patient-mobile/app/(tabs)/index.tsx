import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { useRouter } from 'expo-router';
import {
  CalendarCheck,
  Plus,
  Sparkle,
  Pill,
  MessageCircle,
  ArrowRight,
  HeartPulse,
  Syringe,
  ShieldAlert,
} from 'lucide-react-native';
import { useAuth } from '../../src/contexts/AuthContext';
import { useAppointments } from '../../src/modules/appointments/hooks';
import { Card } from '../../src/design-system';
import { StatusBadge } from '../../src/design-system/components/StatusBadge';

function formatDateBadge(iso: string): { label: string; isToday: boolean; isTomorrow: boolean } {
  const d = new Date(iso);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (d.toDateString() === today.toDateString()) return { label: 'Today', isToday: true, isTomorrow: false };
  if (d.toDateString() === tomorrow.toDateString()) return { label: 'Tomorrow', isToday: false, isTomorrow: true };

  const day = d.getDate();
  const month = d.toLocaleDateString(undefined, { month: 'short' }).toUpperCase();
  return { label: `${day} ${month}`, isToday: false, isTomorrow: false };
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
}

const MOCK_INSIGHTS = [
  {
    id: '1',
    type: 'trend',
    icon: HeartPulse,
    title: 'Heart rate trending well',
    description: 'Your resting heart rate has improved 5% this month. Keep up the good work!',
    time: '2 hours ago',
    color: '#16a34a',
    bg: '#f0fdf4',
  },
  {
    id: '2',
    type: 'reminder',
    icon: Pill,
    title: 'Medication refill needed',
    description: 'Your Atorvastatin prescription runs out in 3 days. Request a refill.',
    time: 'Yesterday',
    color: '#d97706',
    bg: '#fffbeb',
  },
  {
    id: '3',
    type: 'result',
    icon: Syringe,
    title: 'Lab results available',
    description: 'Your HbA1c results from City Diagnostic Lab are ready to review.',
    time: '2 days ago',
    color: '#2563eb',
    bg: '#eff6ff',
  },
];

const QUICK_ACTIONS = [
  { label: 'Book', icon: CalendarCheck, href: '/care', color: '#0d9488' },
  { label: 'AI Chat', icon: MessageCircle, href: '/', color: '#3b82f6' },
  { label: 'SOS', icon: ShieldAlert, href: '/', color: '#ef4444' },
  { label: 'Refill', icon: Pill, href: '/(tabs)/prescriptions', color: '#9333ea' },
];

export default function DashboardPage() {
  const { session } = useAuth();
  const router = useRouter();
  const [greeting] = useState(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  });
  const [refreshing, setRefreshing] = useState(false);

  const { data: appointments } = useAppointments();
  const upcomingAppts = (appointments ?? [])
    .filter((a) => a.status !== 'cancelled' && a.status !== 'completed' && a.status !== 'no_show')
    .sort((a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime())
    .slice(0, 3);

  const onRefresh = async () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  return (
    <ScrollView
      className="flex-1 px-4"
      showsVerticalScrollIndicator={false}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <View className="pt-4 pb-6 space-y-5">
        {/* Greeting */}
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-xl font-bold text-gray-900">
              {greeting}{session?.name ? `, ${session.name.split(' ')[0]}` : ''}
            </Text>
            <Text className="text-sm text-gray-500 mt-0.5">Here&apos;s your health overview</Text>
          </View>
          <TouchableOpacity
            onPress={() => router.push('/(tabs)/profile')}
            className="flex-row items-center gap-1"
          >
            <Text className="text-xs font-medium text-primary-600">View profile</Text>
            <ArrowRight size={14} color="#0d9488" />
          </TouchableOpacity>
        </View>

        {/* Quick Actions */}
        <View>
          <Text className="section-title mb-3">Quick Actions</Text>
          <View className="flex-row gap-2">
            {QUICK_ACTIONS.map((action) => (
              <TouchableOpacity
                key={action.label}
                onPress={() => router.push(action.href as any)}
                activeOpacity={0.7}
                className="flex-1 items-center gap-1.5 p-3 rounded-xl bg-white border border-gray-200"
              >
                <View
                  className="w-10 h-10 rounded-xl items-center justify-center"
                  style={{ backgroundColor: action.color + '10' }}
                >
                  <action.icon size={20} color={action.color} />
                </View>
                <Text className="text-[10px] font-medium text-gray-600 text-center">{action.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Upcoming Appointments */}
        <Card variant="hover">
          <View className="flex-row items-center justify-between mb-3">
            <View className="flex-row items-center gap-2">
              <CalendarCheck size={18} color="#0d9488" />
              <Text className="text-sm font-semibold text-gray-900">Upcoming Appointments</Text>
            </View>
            <TouchableOpacity onPress={() => router.push('/care')}>
              <Text className="text-xs font-medium text-primary-600">View all</Text>
            </TouchableOpacity>
          </View>

          {upcomingAppts.length > 0 ? (
            <View className="space-y-2">
              {upcomingAppts.map((apt) => {
                const badge = formatDateBadge(apt.startAt);
                return (
                  <TouchableOpacity
                    key={apt.id}
                    onPress={() => router.push(`/appointments/${apt.id}`)}
                    activeOpacity={0.7}
                    className="flex-row items-start gap-3 p-3 rounded-lg bg-gray-50"
                  >
                    <View
                      className={`w-10 h-10 rounded-full items-center justify-center shrink-0 ${
                        badge.isToday ? 'bg-primary-100' : badge.isTomorrow ? 'bg-blue-100' : 'bg-gray-100'
                      }`}
                    >
                      <Text
                        className={`text-[10px] font-bold leading-tight text-center ${
                          badge.isToday ? 'text-primary-600' : badge.isTomorrow ? 'text-blue-600' : 'text-gray-500'
                        }`}
                      >
                        {badge.label}
                      </Text>
                    </View>
                    <View className="flex-1 min-w-0">
                      <View className="flex-row items-center gap-2">
                        <Text className="text-sm font-medium text-gray-900 flex-1" numberOfLines={1}>
                          {apt.providerName}
                        </Text>
                        {apt.patientName && apt.patientName !== 'You' && (
                          <View className="bg-primary-50 px-2 py-0.5 rounded-full">
                            <Text className="text-[10px] font-medium text-primary-600">{apt.patientName}</Text>
                          </View>
                        )}
                      </View>
                      <Text className="text-xs text-gray-500">{apt.specialty}</Text>
                      <View className="flex-row items-center gap-2 mt-1">
                        <Text className="text-xs text-gray-600">{formatTime(apt.startAt)}</Text>
                        <StatusBadge status={apt.status} domain="appointment" />
                      </View>
                    </View>
                    <ArrowRight size={16} color="#94a3b8" style={{ marginTop: 4 }} />
                  </TouchableOpacity>
                );
              })}
            </View>
          ) : (
            <View className="items-center py-6">
              <Text className="text-sm text-gray-500">No upcoming appointments</Text>
              <TouchableOpacity
                onPress={() => router.push('/care')}
                className="flex-row items-center gap-1 mt-2"
              >
                <Plus size={16} color="#0d9488" />
                <Text className="text-sm font-medium text-primary-600">Book an appointment</Text>
              </TouchableOpacity>
            </View>
          )}
        </Card>

        {/* AI Insights */}
        <View>
          <View className="flex-row items-center gap-2 mb-3">
            <Sparkle size={16} color="#0d9488" />
            <Text className="section-title">AI Insights</Text>
          </View>
          <View className="space-y-3">
            {MOCK_INSIGHTS.map((insight) => {
              const Icon = insight.icon;
              return (
                <Card key={insight.id} padding="md">
                  <View className="flex-row gap-3">
                    <View
                      className="w-9 h-9 rounded-lg items-center justify-center shrink-0"
                      style={{ backgroundColor: insight.bg }}
                    >
                      <Icon size={18} color={insight.color} />
                    </View>
                    <View className="flex-1 min-w-0">
                      <View className="flex-row items-start justify-between gap-2">
                        <Text className="text-sm font-semibold text-gray-900 flex-1">{insight.title}</Text>
                        <Text className="text-[10px] text-gray-400">{insight.time}</Text>
                      </View>
                      <Text className="text-xs text-gray-500 mt-0.5 leading-relaxed">{insight.description}</Text>
                    </View>
                  </View>
                </Card>
              );
            })}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
