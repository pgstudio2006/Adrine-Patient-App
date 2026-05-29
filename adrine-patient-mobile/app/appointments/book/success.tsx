import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { CheckCircle, CalendarCheck, ArrowRight } from 'lucide-react-native';
import { Card } from '../../../src/design-system';

export default function BookingSuccessPage() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-surface-secondary">
      <Stack.Screen options={{ headerShown: false, gestureEnabled: false }} />
      <View className="flex-1 justify-center px-6">
        <Card padding="lg">
          <View className="items-center py-6">
            <View className="w-20 h-20 rounded-full bg-green-100 items-center justify-center mb-4">
              <CheckCircle size={40} color="#16a34a" />
            </View>
            <Text className="text-xl font-bold text-gray-900 text-center">Appointment Booked!</Text>
            <Text className="text-sm text-gray-500 text-center mt-2">
              Your appointment has been confirmed. You'll receive a reminder before your visit.
            </Text>
          </View>

          <View className="bg-green-50 rounded-xl p-4 mb-6">
            <View className="flex-row items-start gap-3">
              <CalendarCheck size={18} color="#16a34a" style={{ marginTop: 1 }} />
              <View>
                <Text className="text-sm font-medium text-green-800">What's next?</Text>
                <Text className="text-xs text-green-700 mt-1">
                  You can view, reschedule, or cancel this appointment from your Care tab.
                </Text>
              </View>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => router.push('/(tabs)/care')}
            activeOpacity={0.8}
            className="bg-primary-600 py-3.5 rounded-xl items-center mb-3"
          >
            <Text className="text-white font-semibold text-base">View My Appointments</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push('/(tabs)')}
            activeOpacity={0.7}
            className="py-3 items-center"
          >
            <Text className="text-primary-600 font-medium text-sm">Back to Home</Text>
          </TouchableOpacity>
        </Card>
      </View>
    </View>
  );
}
