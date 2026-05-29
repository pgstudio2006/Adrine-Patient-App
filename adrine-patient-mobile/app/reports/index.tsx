import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { ArrowLeft, Microscope, ArrowRight, Download } from 'lucide-react-native';
import { Card } from '../../src/design-system';

const MOCK_REPORTS = [
  {
    id: 'rpt-1',
    title: 'Complete Blood Count (CBC)',
    date: '2026-05-15T09:30:00Z',
    facility: 'City Diagnostic Lab',
    providerName: 'Dr. Sarah Chen',
    status: 'final',
    type: 'lab_result',
  },
  {
    id: 'rpt-2',
    title: 'Lipid Panel',
    date: '2026-05-15T10:00:00Z',
    facility: 'City Diagnostic Lab',
    providerName: 'Dr. Sarah Chen',
    status: 'final',
    type: 'lab_result',
  },
  {
    id: 'rpt-3',
    title: 'HbA1c',
    date: '2026-05-10T08:00:00Z',
    facility: 'City Diagnostic Lab',
    providerName: 'Dr. James Wilson',
    status: 'preliminary',
    type: 'lab_result',
  },
  {
    id: 'rpt-4',
    title: 'Chest X-Ray Report',
    date: '2026-02-15T08:00:00Z',
    facility: 'City Diagnostic Lab',
    providerName: 'Dr. Michael Lee',
    status: 'final',
    type: 'imaging',
  },
];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function ReportsPage() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-surface-secondary">
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        <View className="pt-4 pb-8 space-y-4">
          {/* Header */}
          <View className="flex-row items-center gap-3">
            <TouchableOpacity onPress={() => router.back()} className="w-9 h-9 rounded-full bg-gray-100 items-center justify-center">
              <ArrowLeft size={18} color="#374151" />
            </TouchableOpacity>
            <View>
              <Text className="text-xl font-bold text-gray-900">Reports</Text>
              <Text className="text-sm text-gray-500">Lab results & diagnostics</Text>
            </View>
          </View>

          {MOCK_REPORTS.length > 0 ? (
            <View className="space-y-2">
              {MOCK_REPORTS.map((report) => (
                <TouchableOpacity
                  key={report.id}
                  onPress={() => router.push(`/reports/${report.id}`)}
                  activeOpacity={0.7}
                >
                  <Card variant="hover" padding="md">
                    <View className="flex-row items-start gap-3">
                      <View className="w-10 h-10 rounded-lg bg-blue-50 items-center justify-center shrink-0">
                        <Microscope size={18} color="#2563eb" />
                      </View>
                      <View className="flex-1 min-w-0">
                        <Text className="text-sm font-semibold text-gray-900" numberOfLines={1}>
                          {report.title}
                        </Text>
                        <Text className="text-xs text-gray-500 mt-0.5">
                          {report.facility} · {report.providerName}
                        </Text>
                        <View className="flex-row items-center gap-2 mt-1.5">
                          <View className={`px-1.5 py-0.5 rounded ${report.status === 'final' ? 'bg-green-50' : 'bg-amber-50'}`}>
                            <Text className={`text-[10px] font-medium ${report.status === 'final' ? 'text-green-700' : 'text-amber-700'}`}>
                              {report.status === 'final' ? 'Final' : 'Preliminary'}
                            </Text>
                          </View>
                          <Text className="text-[11px] text-gray-400">{formatDate(report.date)}</Text>
                        </View>
                      </View>
                      <TouchableOpacity className="w-8 h-8 rounded-lg bg-gray-100 items-center justify-center">
                        <Download size={14} color="#64748b" />
                      </TouchableOpacity>
                    </View>
                  </Card>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <Card padding="lg">
              <View className="items-center py-8">
                <Microscope size={40} color="#94a3b8" />
                <Text className="text-base font-semibold text-gray-900 mt-3">No reports yet</Text>
                <Text className="text-sm text-gray-500 mt-1">Your lab results will appear here.</Text>
              </View>
            </Card>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
