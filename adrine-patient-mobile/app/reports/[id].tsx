import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams, Stack } from 'expo-router';
import { ArrowLeft, Microscope, Calendar, Building, Download, User } from 'lucide-react-native';
import { Card } from '../../src/design-system';

const MOCK_REPORT = {
  id: 'rpt-1',
  title: 'Complete Blood Count (CBC)',
  date: '2026-05-15T09:30:00Z',
  facility: 'City Diagnostic Lab',
  providerName: 'Dr. Sarah Chen',
  status: 'final',
  type: 'lab_result',
  description: 'Routine blood work results within normal range.',
  results: [
    { test: 'Hemoglobin (Hb)', value: '14.2', range: '13.5 - 17.5', unit: 'g/dL', flag: 'normal' },
    { test: 'White Blood Cells (WBC)', value: '6.5', range: '4.5 - 11.0', unit: '×10³/µL', flag: 'normal' },
    { test: 'Platelets', value: '250', range: '150 - 450', unit: '×10³/µL', flag: 'normal' },
    { test: 'Red Blood Cells (RBC)', value: '4.8', range: '4.5 - 5.9', unit: '×10⁶/µL', flag: 'normal' },
    { test: 'Hematocrit (HCT)', value: '42', range: '38 - 50', unit: '%', flag: 'normal' },
    { test: 'MCV', value: '88', range: '80 - 100', unit: 'fL', flag: 'normal' },
  ],
  attachments: ['cbc_report.pdf'],
};

export default function ReportDetailPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const report = MOCK_REPORT;

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

          {/* Header */}
          <Card padding="lg">
            <View className="flex-row items-start gap-3 mb-4">
              <View className="w-12 h-12 rounded-xl bg-blue-50 items-center justify-center">
                <Microscope size={22} color="#2563eb" />
              </View>
              <View className="flex-1">
                <Text className="text-base font-bold text-gray-900">{report.title}</Text>
                <View className="flex-row items-center gap-2 mt-1">
                  <View className={`px-2 py-0.5 rounded-full ${report.status === 'final' ? 'bg-green-50' : 'bg-amber-50'}`}>
                    <Text className={`text-[10px] font-medium ${report.status === 'final' ? 'text-green-700' : 'text-amber-700'}`}>
                      {report.status === 'final' ? 'Final' : 'Preliminary'}
                    </Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity className="w-9 h-9 rounded-lg bg-gray-100 items-center justify-center">
                <Download size={16} color="#64748b" />
              </TouchableOpacity>
            </View>

            <View className="flex-row flex-wrap gap-4">
              <View className="flex-row items-center gap-1.5">
                <Calendar size={14} color="#94a3b8" />
                <Text className="text-xs text-gray-500">
                  {new Date(report.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                </Text>
              </View>
              <View className="flex-row items-center gap-1.5">
                <Building size={14} color="#94a3b8" />
                <Text className="text-xs text-gray-500">{report.facility}</Text>
              </View>
              <View className="flex-row items-center gap-1.5">
                <User size={14} color="#94a3b8" />
                <Text className="text-xs text-gray-500">{report.providerName}</Text>
              </View>
            </View>
          </Card>

          {/* Results Table */}
          <Card padding="lg">
            <Text className="text-sm font-semibold text-gray-900 mb-4">Results</Text>
            <View className="space-y-0">
              {/* Table Header */}
              <View className="flex-row pb-2 border-b border-gray-200">
                <Text className="flex-[3] text-xs font-medium text-gray-500">Test</Text>
                <Text className="flex-[1.5] text-xs font-medium text-gray-500 text-right">Value</Text>
                <Text className="flex-[2] text-xs font-medium text-gray-500 text-right">Reference Range</Text>
              </View>
              {report.results.map((result, idx) => (
                <View
                  key={result.test}
                  className={`flex-row py-2.5 ${idx < report.results.length - 1 ? 'border-b border-gray-100' : ''}`}
                >
                  <Text className="flex-[3] text-xs text-gray-700">{result.test}</Text>
                  <Text className={`flex-[1.5] text-xs font-medium text-right ${
                    result.flag === 'abnormal' ? 'text-red-600' : 'text-gray-900'
                  }`}>
                    {result.value}
                  </Text>
                  <Text className="flex-[2] text-xs text-gray-500 text-right">{result.range}</Text>
                </View>
              ))}
            </View>

            {report.status === 'preliminary' && (
              <View className="bg-amber-50 rounded-lg p-3 mt-4">
                <Text className="text-xs text-amber-700">
                  This is a preliminary report. Final results will be provided after review by the pathologist.
                </Text>
              </View>
            )}
          </Card>

          {/* Attachments */}
          {report.attachments && report.attachments.length > 0 && (
            <Card padding="md">
              <Text className="text-sm font-semibold text-gray-900 mb-3">Attachments</Text>
              {report.attachments.map((file, idx) => (
                <TouchableOpacity
                  key={idx}
                  className="flex-row items-center gap-3 py-2.5"
                >
                  <Download size={16} color="#64748b" />
                  <Text className="text-sm text-gray-700 flex-1">{file}</Text>
                </TouchableOpacity>
              ))}
            </Card>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
