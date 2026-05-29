import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { ArrowLeft, CalendarCheck, User, Stethoscope, MapPin } from 'lucide-react-native';
import { Card } from '../../../src/design-system';

const SPECIALTIES = [
  { id: 'general', label: 'General Medicine', icon: Stethoscope },
  { id: 'cardiology', label: 'Cardiology', icon: Stethoscope },
  { id: 'dermatology', label: 'Dermatology', icon: Stethoscope },
  { id: 'orthopedics', label: 'Orthopedics', icon: Stethoscope },
  { id: 'pediatrics', label: 'Pediatrics', icon: User },
  { id: 'neurology', label: 'Neurology', icon: Stethoscope },
];

export default function BookAppointmentPage() {
  const router = useRouter();
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [reason, setReason] = useState('');

  const handleContinue = () => {
    if (!selectedSpecialty) return;
    router.push({
      pathname: '/appointments/book/slots',
      params: { specialty: selectedSpecialty, reason },
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
              <Text className="text-xl font-bold text-gray-900">Book Appointment</Text>
              <Text className="text-sm text-gray-500">Choose a specialty</Text>
            </View>
          </View>

          {/* Specialty Selection */}
          <View className="flex-row flex-wrap gap-3">
            {SPECIALTIES.map((spec) => {
              const isSelected = selectedSpecialty === spec.id;
              const Icon = spec.icon;
              return (
                <TouchableOpacity
                  key={spec.id}
                  onPress={() => setSelectedSpecialty(spec.id)}
                  activeOpacity={0.7}
                  className={`flex-row items-center gap-2 px-4 py-3 rounded-xl border ${
                    isSelected ? 'bg-primary-50 border-primary-300' : 'bg-white border-gray-200'
                  }`}
                >
                  <View className={`w-8 h-8 rounded-lg items-center justify-center ${isSelected ? 'bg-primary-100' : 'bg-gray-100'}`}>
                    <Icon size={16} color={isSelected ? '#0d9488' : '#64748b'} />
                  </View>
                  <Text className={`text-sm font-medium ${isSelected ? 'text-primary-700' : 'text-gray-700'}`}>
                    {spec.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Reason */}
          <View>
            <Text className="text-sm font-medium text-gray-700 mb-2">Reason for visit (optional)</Text>
            <TextInput
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 min-h-[100px]"
              placeholder="Describe your symptoms or reason..."
              placeholderTextColor="#94a3b8"
              value={reason}
              onChangeText={setReason}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          {/* Continue */}
          <TouchableOpacity
            onPress={handleContinue}
            disabled={!selectedSpecialty}
            activeOpacity={0.8}
            className={`py-3.5 rounded-xl items-center ${selectedSpecialty ? 'bg-primary-600' : 'bg-gray-300'}`}
          >
            <Text className="text-white font-semibold text-base">Continue</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
