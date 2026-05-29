import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams, Stack } from 'expo-router';
import { ArrowLeft, Pill, Calendar, Clock, Repeat, Building, Phone } from 'lucide-react-native';
import { Card } from '../../src/design-system';
import { StatusBadge } from '../../src/design-system/components/StatusBadge';

const MOCK_PRESCRIPTION = {
  id: 'rx-1',
  medication: 'Atorvastatin',
  dosage: '10 mg',
  frequency: 'Once daily',
  route: 'Oral',
  prescribedBy: 'Dr. Sarah Chen',
  datePrescribed: '2026-05-01',
  status: 'active',
  refillsRemaining: 2,
  refillsTotal: 3,
  pharmacy: 'City Pharmacy',
  pharmacyPhone: '(555) 123-4567',
  instructions: 'Take one tablet by mouth once daily. May be taken with or without food. Do not crush or chew.',
  warnings: 'Avoid grapefruit juice. Report any unexplained muscle pain or weakness to your doctor immediately.',
  ndc: '12345-6789-01',
};

export default function PrescriptionDetailPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  // Using mock data for now
  const rx = MOCK_PRESCRIPTION;

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

          {/* Medication Header */}
          <View className="items-center py-2">
            <View className="w-20 h-20 rounded-2xl bg-primary-100 items-center justify-center mb-3">
              <Pill size={32} color="#0d9488" />
            </View>
            <Text className="text-xl font-bold text-gray-900">{rx.medication}</Text>
            <Text className="text-sm text-gray-500 mt-0.5">{rx.dosage}</Text>
            <View className="mt-2">
              <StatusBadge status={rx.status} domain="appointment" />
            </View>
          </View>

          {/* Instructions */}
          <Card padding="lg">
            <Text className="text-sm font-semibold text-gray-900 mb-3">Instructions</Text>
            <Text className="text-sm text-gray-700 leading-relaxed">{rx.instructions}</Text>
          </Card>

          {/* Details */}
          <Card padding="lg">
            <Text className="text-sm font-semibold text-gray-900 mb-4">Prescription Details</Text>
            <View className="space-y-3.5">
              <View className="flex-row items-center gap-3">
                <Pill size={16} color="#64748b" />
                <View className="flex-1">
                  <Text className="text-xs text-gray-500">Dosage</Text>
                  <Text className="text-sm font-medium text-gray-900">{rx.dosage}</Text>
                </View>
              </View>
              <View className="flex-row items-center gap-3">
                <Clock size={16} color="#64748b" />
                <View className="flex-1">
                  <Text className="text-xs text-gray-500">Frequency</Text>
                  <Text className="text-sm font-medium text-gray-900">{rx.frequency}</Text>
                </View>
              </View>
              <View className="flex-row items-center gap-3">
                <Calendar size={16} color="#64748b" />
                <View className="flex-1">
                  <Text className="text-xs text-gray-500">Prescribed</Text>
                  <Text className="text-sm font-medium text-gray-900">
                    {new Date(rx.datePrescribed).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
                  </Text>
                </View>
              </View>
              <View className="flex-row items-center gap-3">
                <Repeat size={16} color="#64748b" />
                <View className="flex-1">
                  <Text className="text-xs text-gray-500">Refills</Text>
                  <Text className="text-sm font-medium text-gray-900">
                    {rx.refillsRemaining} of {rx.refillsTotal} remaining
                  </Text>
                </View>
              </View>
              <View className="flex-row items-center gap-3">
                <Building size={16} color="#64748b" />
                <View className="flex-1">
                  <Text className="text-xs text-gray-500">Pharmacy</Text>
                  <Text className="text-sm font-medium text-gray-900">{rx.pharmacy}</Text>
                </View>
              </View>
            </View>
          </Card>

          {/* Warnings */}
          {rx.warnings && (
            <Card padding="lg" variant="default">
              <View className="flex-row gap-3">
                <View className="w-8 h-8 rounded-full bg-amber-100 items-center justify-center shrink-0">
                  <Text className="text-amber-600 text-sm font-bold">!</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-sm font-semibold text-amber-800 mb-1">Warnings</Text>
                  <Text className="text-xs text-amber-700 leading-relaxed">{rx.warnings}</Text>
                </View>
              </View>
            </Card>
          )}

          {/* Actions */}
          {rx.status === 'active' && (
            <View className="flex-row gap-3">
              <TouchableOpacity className="flex-1 bg-primary-600 py-3 rounded-xl items-center flex-row justify-center gap-2">
                <Repeat size={16} color="white" />
                <Text className="text-white font-semibold">Request Refill</Text>
              </TouchableOpacity>
              <TouchableOpacity className="bg-white border border-gray-300 py-3 rounded-xl items-center justify-center px-4">
                <Phone size={18} color="#374151" />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
