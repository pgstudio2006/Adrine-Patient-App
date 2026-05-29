import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRouter, useLocalSearchParams, Stack } from 'expo-router';
import { ArrowLeft, CalendarCheck, Clock, User, MapPin, FileText, CheckCircle } from 'lucide-react-native';
import { Card } from '../../../src/design-system';

export default function ConfirmBookingPage() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    specialty: string;
    reason: string;
    providerId: string;
    providerName: string;
    date: string;
    time: string;
  }>();

  const formatDateDisplay = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  };

  const handleConfirm = () => {
    Alert.alert(
      'Confirm Booking',
      'Are you sure you want to book this appointment?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm',
          onPress: () => router.push('/appointments/book/success'),
        },
      ]
    );
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
              <Text className="text-xl font-bold text-gray-900">Confirm Booking</Text>
              <Text className="text-sm text-gray-500">Review your appointment details</Text>
            </View>
          </View>

          {/* Summary Card */}
          <Card padding="lg">
            <View className="items-center mb-6">
              <View className="w-16 h-16 rounded-full bg-primary-100 items-center justify-center mb-3">
                <CalendarCheck size={28} color="#0d9488" />
              </View>
              <Text className="text-base font-semibold text-gray-900">Appointment Summary</Text>
            </View>

            <View className="space-y-4">
              <View className="flex-row items-start gap-3">
                <User size={18} color="#64748b" style={{ marginTop: 1 }} />
                <View className="flex-1">
                  <Text className="text-xs text-gray-500">Provider</Text>
                  <Text className="text-sm font-medium text-gray-900">{params.providerName || 'Doctor'}</Text>
                  <Text className="text-xs text-gray-500">{params.specialty}</Text>
                </View>
              </View>

              <View className="flex-row items-start gap-3">
                <CalendarCheck size={18} color="#64748b" style={{ marginTop: 1 }} />
                <View>
                  <Text className="text-xs text-gray-500">Date</Text>
                  <Text className="text-sm font-medium text-gray-900">
                    {params.date ? formatDateDisplay(params.date) : '—'}
                  </Text>
                </View>
              </View>

              <View className="flex-row items-start gap-3">
                <Clock size={18} color="#64748b" style={{ marginTop: 1 }} />
                <View>
                  <Text className="text-xs text-gray-500">Time</Text>
                  <Text className="text-sm font-medium text-gray-900">{params.time || '—'}</Text>
                </View>
              </View>

              <View className="flex-row items-start gap-3">
                <MapPin size={18} color="#64748b" style={{ marginTop: 1 }} />
                <View>
                  <Text className="text-xs text-gray-500">Location</Text>
                  <Text className="text-sm font-medium text-gray-900">Adrine Health Clinic</Text>
                </View>
              </View>

              {params.reason ? (
                <View className="flex-row items-start gap-3">
                  <FileText size={18} color="#64748b" style={{ marginTop: 1 }} />
                  <View className="flex-1">
                    <Text className="text-xs text-gray-500">Reason</Text>
                    <Text className="text-sm text-gray-700">{params.reason}</Text>
                  </View>
                </View>
              ) : null}
            </View>
          </Card>

          {/* Confirm Button */}
          <TouchableOpacity
            onPress={handleConfirm}
            activeOpacity={0.8}
            className="bg-primary-600 py-3.5 rounded-xl items-center flex-row justify-center gap-2"
          >
            <CheckCircle size={18} color="white" />
            <Text className="text-white font-semibold text-base">Confirm & Book</Text>
          </TouchableOpacity>

          <Text className="text-xs text-gray-400 text-center">
            By confirming, you agree to our cancellation policy. You can reschedule or cancel up to 24 hours before your appointment.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
