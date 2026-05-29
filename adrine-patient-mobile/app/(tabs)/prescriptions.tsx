import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Pill, ArrowRight, Repeat, Clock } from 'lucide-react-native';
import { Card } from '../../src/design-system';
import { StatusBadge } from '../../src/design-system/components/StatusBadge';

const MOCK_PRESCRIPTIONS = [
  {
    id: 'rx-1',
    medication: 'Atorvastatin',
    dosage: '10 mg',
    frequency: 'Once daily',
    prescribedBy: 'Dr. Sarah Chen',
    date: '2026-05-01',
    status: 'active',
    refillsRemaining: 2,
    pharmacy: 'City Pharmacy',
  },
  {
    id: 'rx-2',
    medication: 'Lisinopril',
    dosage: '5 mg',
    frequency: 'Once daily',
    prescribedBy: 'Dr. James Wilson',
    date: '2026-04-15',
    status: 'active',
    refillsRemaining: 1,
    pharmacy: 'City Pharmacy',
  },
  {
    id: 'rx-3',
    medication: 'Amoxicillin',
    dosage: '500 mg',
    frequency: 'Three times daily for 7 days',
    prescribedBy: 'Dr. Sarah Chen',
    date: '2026-03-20',
    status: 'completed',
    refillsRemaining: 0,
    pharmacy: 'City Pharmacy',
  },
  {
    id: 'rx-4',
    medication: 'Loratadine',
    dosage: '10 mg',
    frequency: 'As needed',
    prescribedBy: 'Dr. James Wilson',
    date: '2026-05-10',
    status: 'active',
    refillsRemaining: 3,
    pharmacy: 'Wellness Drugs',
  },
];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function PrescriptionsPage() {
  const router = useRouter();
  const active = MOCK_PRESCRIPTIONS.filter((p) => p.status === 'active');
  const completed = MOCK_PRESCRIPTIONS.filter((p) => p.status !== 'active');

  return (
    <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
      <View className="pt-4 pb-6 space-y-4">
        {/* Header */}
        <View>
          <Text className="text-xl font-bold text-gray-900">Prescriptions</Text>
          <Text className="text-sm text-gray-500">Your medications</Text>
        </View>

        {/* Active */}
        {active.length > 0 && (
          <View>
            <Text className="section-title mb-2">Active</Text>
            <View className="space-y-2">
              {active.map((rx) => (
                <TouchableOpacity
                  key={rx.id}
                  onPress={() => router.push(`/prescriptions/${rx.id}`)}
                  activeOpacity={0.7}
                >
                  <Card variant="hover" padding="md">
                    <View className="flex-row items-start gap-3">
                      <View className="w-10 h-10 rounded-xl bg-primary-100 items-center justify-center shrink-0">
                        <Pill size={20} color="#0d9488" />
                      </View>
                      <View className="flex-1 min-w-0">
                        <View className="flex-row items-center gap-2">
                          <Text className="text-sm font-semibold text-gray-900 flex-1" numberOfLines={1}>
                            {rx.medication}
                          </Text>
                          <StatusBadge status="active" domain="appointment" />
                        </View>
                        <Text className="text-xs text-gray-500 mt-0.5">{rx.dosage} · {rx.frequency}</Text>
                        <View className="flex-row items-center gap-3 mt-1.5">
                          <View className="flex-row items-center gap-1">
                            <Repeat size={12} color="#64748b" />
                            <Text className="text-[11px] text-gray-500">{rx.refillsRemaining} refills</Text>
                          </View>
                          <View className="flex-row items-center gap-1">
                            <Clock size={12} color="#64748b" />
                            <Text className="text-[11px] text-gray-500">{formatDate(rx.date)}</Text>
                          </View>
                        </View>
                      </View>
                      <ArrowRight size={16} color="#94a3b8" style={{ marginTop: 4 }} />
                    </View>
                  </Card>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Completed */}
        {completed.length > 0 && (
          <View>
            <Text className="section-title mb-2">Past</Text>
            <View className="space-y-2">
              {completed.map((rx) => (
                <TouchableOpacity
                  key={rx.id}
                  onPress={() => router.push(`/prescriptions/${rx.id}`)}
                  activeOpacity={0.7}
                >
                  <Card variant="hover" padding="md">
                    <View className="flex-row items-start gap-3">
                      <View className="w-10 h-10 rounded-xl bg-gray-100 items-center justify-center shrink-0">
                        <Pill size={20} color="#64748b" />
                      </View>
                      <View className="flex-1 min-w-0">
                        <Text className="text-sm font-semibold text-gray-900">{rx.medication}</Text>
                        <Text className="text-xs text-gray-500 mt-0.5">{rx.dosage} · {rx.frequency}</Text>
                        <Text className="text-xs text-gray-400 mt-1">{formatDate(rx.date)} · {rx.prescribedBy}</Text>
                      </View>
                    </View>
                  </Card>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
