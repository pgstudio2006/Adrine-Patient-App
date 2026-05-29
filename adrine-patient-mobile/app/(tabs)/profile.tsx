import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import {
  User,
  Settings,
  ShieldCheck,
  Bell,
  HelpCircle,
  LogOut,
  ChevronRight,
  HeartPulse,
  Syringe,
  CalendarCheck,
  Pill,
} from 'lucide-react-native';
import { useAuth } from '../../src/contexts/AuthContext';
import { Card } from '../../src/design-system';

const SETTINGS_SECTIONS = [
  {
    title: 'Preferences',
    items: [
      { icon: Bell, label: 'Notifications', href: '#' },
      { icon: ShieldCheck, label: 'Privacy & Security', href: '#' },
      { icon: HelpCircle, label: 'Help & Support', href: '#' },
    ],
  },
];

export default function ProfilePage() {
  const { session, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.replace('/login');
  };

  return (
    <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
      <View className="pt-4 pb-8 space-y-5">
        {/* Profile Header */}
        <View className="items-center py-6">
          <View className="w-20 h-20 rounded-full bg-primary-100 items-center justify-center mb-3">
            <Text className="text-3xl font-bold text-primary-600">
              {(session?.name || 'U').charAt(0).toUpperCase()}
            </Text>
          </View>
          <Text className="text-lg font-bold text-gray-900">{session?.name || 'User'}</Text>
          <Text className="text-sm text-gray-500 mt-0.5">{session?.email || 'user@example.com'}</Text>
          {session?.patientId && (
            <View className="bg-gray-100 px-3 py-1 rounded-full mt-2">
              <Text className="text-[11px] font-mono text-gray-500">ID: {session.patientId}</Text>
            </View>
          )}
        </View>

        {/* Quick Health Stats */}
        <View className="flex-row gap-3">
          <TouchableOpacity activeOpacity={0.7} className="flex-1 bg-white rounded-xl p-4 border border-gray-200 items-center">
            <HeartPulse size={22} color="#0d9488" />
            <Text className="text-lg font-bold text-gray-900 mt-1">120/80</Text>
            <Text className="text-[10px] text-gray-500">Blood Pressure</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} className="flex-1 bg-white rounded-xl p-4 border border-gray-200 items-center">
            <CalendarCheck size={22} color="#2563eb" />
            <Text className="text-lg font-bold text-gray-900 mt-1">3</Text>
            <Text className="text-[10px] text-gray-500">Visits</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} className="flex-1 bg-white rounded-xl p-4 border border-gray-200 items-center">
            <Pill size={22} color="#9333ea" />
            <Text className="text-lg font-bold text-gray-900 mt-1">2</Text>
            <Text className="text-[10px] text-gray-500">Active Rx</Text>
          </TouchableOpacity>
        </View>

        {/* Menu Sections */}
        {SETTINGS_SECTIONS.map((section) => (
          <View key={section.title}>
            <Text className="section-title mb-2">{section.title}</Text>
            <View className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              {section.items.map((item, index) => {
                const Icon = item.icon;
                return (
                  <TouchableOpacity
                    key={item.label}
                    activeOpacity={0.7}
                    className={`flex-row items-center justify-between px-4 py-3.5 ${
                      index < section.items.length - 1 ? 'border-b border-gray-100' : ''
                    }`}
                  >
                    <View className="flex-row items-center gap-3">
                      <Icon size={18} color="#64748b" />
                      <Text className="text-sm text-gray-700">{item.label}</Text>
                    </View>
                    <ChevronRight size={16} color="#cbd5e1" />
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        ))}

        {/* Logout */}
        <TouchableOpacity
          onPress={handleLogout}
          className="flex-row items-center justify-center gap-2 bg-white rounded-xl border border-red-200 py-3.5 mt-2"
        >
          <LogOut size={18} color="#dc2626" />
          <Text className="text-sm font-medium text-red-600">Sign Out</Text>
        </TouchableOpacity>

        <Text className="text-xs text-gray-400 text-center mt-4">Adrine Health v1.0.0</Text>
      </View>
    </ScrollView>
  );
}
