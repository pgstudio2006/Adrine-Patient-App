import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams, Stack } from 'expo-router';
import { ArrowLeft, CalendarCheck, Clock } from 'lucide-react-native';
import { Card } from '../../../src/design-system';

const MOCK_SLOTS: Record<string, string[]> = {
  '2026-06-01': ['09:00', '09:30', '10:00', '10:30', '11:00', '14:00', '14:30', '15:00'],
  '2026-06-02': ['08:30', '09:00', '09:30', '11:00', '11:30', '15:00', '15:30'],
  '2026-06-03': ['10:00', '10:30', '11:00', '14:00', '15:00', '16:00'],
  '2026-06-04': ['09:00', '09:30', '10:00', '11:30', '14:30', '15:30'],
  '2026-06-05': ['08:00', '08:30', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00'],
};

const MOCK_PROVIDERS = [
  { id: 'dr-1', name: 'Dr. Sarah Chen', specialty: 'General Medicine', rating: 4.8 },
  { id: 'dr-2', name: 'Dr. James Wilson', specialty: 'General Medicine', rating: 4.6 },
  { id: 'dr-3', name: 'Dr. Michael Lee', specialty: 'Cardiology', rating: 4.9 },
];

export default function SlotsPage() {
  const router = useRouter();
  const params = useLocalSearchParams<{ specialty: string; reason: string }>();
  const [selectedDate, setSelectedDate] = useState('2026-06-01');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [selectedProvider, setSelectedProvider] = useState('dr-1');

  const dates = Object.keys(MOCK_SLOTS);
  const slots = MOCK_SLOTS[selectedDate] || [];
  const provider = MOCK_PROVIDERS.find((p) => p.id === selectedProvider);

  const formatDay = (dateStr: string) => {
    const d = new Date(dateStr);
    return {
      day: d.toLocaleDateString(undefined, { weekday: 'short' }),
      date: d.getDate(),
      month: d.toLocaleDateString(undefined, { month: 'short' }),
    };
  };

  const handleContinue = () => {
    if (!selectedSlot) return;
    router.push({
      pathname: '/appointments/book/confirm',
      params: {
        specialty: params.specialty,
        reason: params.reason || '',
        providerId: selectedProvider,
        providerName: provider?.name,
        date: selectedDate,
        time: selectedSlot,
      },
    });
  };

  return (
    <View className="flex-1 bg-surface-secondary">
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        <View className="pt-4 pb-8 space-y-5">
          {/* Header */}
          <View className="flex-row items-center gap-3">
            <TouchableOpacity onPress={() => router.back()} className="w-9 h-9 rounded-full bg-gray-100 items-center justify-center">
              <ArrowLeft size={18} color="#374151" />
            </TouchableOpacity>
            <View>
              <Text className="text-xl font-bold text-gray-900">Select Date & Time</Text>
              <Text className="text-sm text-gray-500">Choose a convenient slot</Text>
            </View>
          </View>

          {/* Provider Selection */}
          <View>
            <Text className="text-sm font-semibold text-gray-700 mb-2">Select Provider</Text>
            <View className="space-y-2">
              {MOCK_PROVIDERS.map((p) => (
                <TouchableOpacity
                  key={p.id}
                  onPress={() => setSelectedProvider(p.id)}
                  activeOpacity={0.7}
                  className={`flex-row items-center gap-3 p-3 rounded-xl border ${
                    selectedProvider === p.id ? 'bg-primary-50 border-primary-300' : 'bg-white border-gray-200'
                  }`}
                >
                  <View className="w-10 h-10 rounded-full bg-primary-100 items-center justify-center">
                    <Text className="text-xs font-bold text-primary-700">
                      {p.name.split(' ').map((n) => n[0]).join('')}
                    </Text>
                  </View>
                  <View className="flex-1">
                    <Text className="text-sm font-medium text-gray-900">{p.name}</Text>
                    <Text className="text-xs text-gray-500">{p.specialty}</Text>
                  </View>
                  <View className="bg-amber-50 px-2 py-1 rounded">
                    <Text className="text-xs font-medium text-amber-600">★ {p.rating}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Date Selection */}
          <View>
            <Text className="text-sm font-semibold text-gray-700 mb-2">Select Date</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="-mx-4 px-4">
              <View className="flex-row gap-2">
                {dates.map((dateStr) => {
                  const fmt = formatDay(dateStr);
                  const isSelected = selectedDate === dateStr;
                  return (
                    <TouchableOpacity
                      key={dateStr}
                      onPress={() => { setSelectedDate(dateStr); setSelectedSlot(''); }}
                      activeOpacity={0.7}
                      className={`items-center px-4 py-3 rounded-xl border ${
                        isSelected ? 'bg-primary-600 border-primary-600' : 'bg-white border-gray-200'
                      }`}
                    >
                      <Text className={`text-xs font-medium ${isSelected ? 'text-white' : 'text-gray-500'}`}>
                        {fmt.day}
                      </Text>
                      <Text className={`text-lg font-bold ${isSelected ? 'text-white' : 'text-gray-900'}`}>
                        {fmt.date}
                      </Text>
                      <Text className={`text-[10px] ${isSelected ? 'text-white/80' : 'text-gray-400'}`}>
                        {fmt.month}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </ScrollView>
          </View>

          {/* Time Slots */}
          <View>
            <Text className="text-sm font-semibold text-gray-700 mb-2">Available Times</Text>
            <View className="flex-row flex-wrap gap-2">
              {slots.map((time) => {
                const isSelected = selectedSlot === time;
                return (
                  <TouchableOpacity
                    key={time}
                    onPress={() => setSelectedSlot(time)}
                    activeOpacity={0.7}
                    className={`flex-row items-center gap-1.5 px-4 py-2.5 rounded-lg border ${
                      isSelected ? 'bg-primary-600 border-primary-600' : 'bg-white border-gray-200'
                    }`}
                  >
                    <Clock size={14} color={isSelected ? 'white' : '#64748b'} />
                    <Text className={`text-sm font-medium ${isSelected ? 'text-white' : 'text-gray-700'}`}>
                      {time}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Continue */}
          <TouchableOpacity
            onPress={handleContinue}
            disabled={!selectedSlot}
            activeOpacity={0.8}
            className={`py-3.5 rounded-xl items-center ${selectedSlot ? 'bg-primary-600' : 'bg-gray-300'}`}
          >
            <Text className="text-white font-semibold text-base">Continue</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
