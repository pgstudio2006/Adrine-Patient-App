import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams, Stack } from 'expo-router';
import { ArrowLeft, CalendarCheck, MapPin, Clock, User, FileText, Phone } from 'lucide-react-native';
import { Card } from '../../src/design-system';
import { StatusBadge } from '../../src/design-system/components/StatusBadge';
import { useAppointments } from '../../src/modules/appointments/hooks';
import { AppointmentDetailsSkeleton } from '../../src/modules/appointments/components/AppointmentDetailsSkeleton';

export default function AppointmentDetailPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { data: appointment, isLoading, error } = useAppointments();

  const apt = appointment?.find((a) => a.id === id);

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });

  const formatTime = (iso: string) =>
    new Date(iso).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });

  if (isLoading) {
    return (
      <View className="flex-1 bg-surface-secondary">
        <Stack.Screen options={{ headerShown: false }} />
        <AppointmentDetailsSkeleton />
      </View>
    );
  }

  if (error || !apt) {
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
            <View className="items-center py-6">
              <CalendarCheck size={40} color="#94a3b8" />
              <Text className="text-base font-semibold text-gray-900 mt-3">Appointment not found</Text>
              <TouchableOpacity
                onPress={() => router.back()}
                className="bg-primary-600 px-4 py-2 rounded-lg mt-4"
              >
                <Text className="text-white text-sm font-medium">Go Back</Text>
              </TouchableOpacity>
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
          {/* Back button */}
          <TouchableOpacity onPress={() => router.back()} className="flex-row items-center gap-2">
            <ArrowLeft size={20} color="#0d9488" />
            <Text className="text-sm font-medium text-primary-600">Back</Text>
          </TouchableOpacity>

          {/* Provider Info */}
          <View className="items-center py-4">
            <View className="w-20 h-20 rounded-full bg-primary-100 items-center justify-center mb-3">
              <Text className="text-2xl font-bold text-primary-600">
                {apt.providerName.split(' ').map((n) => n[0]).join('')}
              </Text>
            </View>
            <Text className="text-lg font-bold text-gray-900">{apt.providerName}</Text>
            <Text className="text-sm text-gray-500">{apt.specialty}</Text>
            <View className="mt-2">
              <StatusBadge status={apt.status} domain="appointment" />
            </View>
            {apt.patientName && apt.patientName !== 'You' && (
              <View className="bg-primary-50 px-3 py-1 rounded-full mt-2">
                <Text className="text-xs font-medium text-primary-600">For: {apt.patientName}</Text>
              </View>
            )}
          </View>

          {/* Details Card */}
          <Card padding="lg">
            <Text className="text-sm font-semibold text-gray-900 mb-4">Appointment Details</Text>
            <View className="space-y-4">
              <View className="flex-row items-start gap-3">
                <CalendarCheck size={18} color="#64748b" style={{ marginTop: 1 }} />
                <View>
                  <Text className="text-xs text-gray-500">Date</Text>
                  <Text className="text-sm font-medium text-gray-900">{formatDate(apt.startAt)}</Text>
                </View>
              </View>
              <View className="flex-row items-start gap-3">
                <Clock size={18} color="#64748b" style={{ marginTop: 1 }} />
                <View>
                  <Text className="text-xs text-gray-500">Time</Text>
                  <Text className="text-sm font-medium text-gray-900">
                    {formatTime(apt.startAt)} – {formatTime(apt.endAt)}
                  </Text>
                </View>
              </View>
              {apt.location && (
                <View className="flex-row items-start gap-3">
                  <MapPin size={18} color="#64748b" style={{ marginTop: 1 }} />
                  <View>
                    <Text className="text-xs text-gray-500">Location</Text>
                    <Text className="text-sm font-medium text-gray-900">{apt.location.name}</Text>
                    {apt.location.address && (
                      <Text className="text-xs text-gray-500">{apt.location.address}</Text>
                    )}
                  </View>
                </View>
              )}
              {apt.notes && (
                <View className="flex-row items-start gap-3">
                  <FileText size={18} color="#64748b" style={{ marginTop: 1 }} />
                  <View className="flex-1">
                    <Text className="text-xs text-gray-500">Notes</Text>
                    <Text className="text-sm text-gray-700">{apt.notes}</Text>
                  </View>
                </View>
              )}
            </View>
          </Card>

          {/* Actions */}
          {apt.status === 'scheduled' && (
            <View className="flex-row gap-3">
              <TouchableOpacity className="flex-1 bg-primary-600 py-3 rounded-lg items-center">
                <Text className="text-white font-semibold">Reschedule</Text>
              </TouchableOpacity>
              <TouchableOpacity className="flex-1 bg-red-50 py-3 rounded-lg items-center border border-red-200">
                <Text className="text-red-600 font-semibold">Cancel</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Contact */}
          <Card padding="md">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-2">
                <Phone size={16} color="#64748b" />
                <Text className="text-sm text-gray-600">Need help? Contact the clinic</Text>
              </View>
              <TouchableOpacity className="bg-gray-100 px-3 py-1.5 rounded-lg">
                <Text className="text-xs font-medium text-gray-700">Call</Text>
              </TouchableOpacity>
            </View>
          </Card>
        </View>
      </ScrollView>
    </View>
  );
}
