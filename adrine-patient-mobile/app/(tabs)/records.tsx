import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Files, ArrowRight, Syringe, HeartPulse, Microscope, Bone, Pill, Stethoscope, PencilLine } from 'lucide-react-native';
import { Card } from '../../src/design-system';
import { useRecords } from '../../src/modules/records/hooks';
import type { RecordType } from '../../src/modules/records/types';

const TYPE_ICONS: Record<string, { icon: any; color: string; bg: string; label: string }> = {
  lab_result: { icon: Microscope, color: '#2563eb', bg: '#eff6ff', label: 'Lab' },
  diagnosis: { icon: Stethoscope, color: '#dc2626', bg: '#fef2f2', label: 'Dx' },
  vitals: { icon: HeartPulse, color: '#16a34a', bg: '#f0fdf4', label: 'Vitals' },
  imaging: { icon: Bone, color: '#9333ea', bg: '#faf5ff', label: 'Imaging' },
  immunization: { icon: Syringe, color: '#d97706', bg: '#fffbeb', label: 'Vaccine' },
  surgery: { icon: Pill, color: '#6366f1', bg: '#eef2ff', label: 'Surgery' },
  note: { icon: PencilLine, color: '#64748b', bg: '#f8fafc', label: 'Note' },
};

const FILTER_TABS = [
  { id: 'all', label: 'All' },
  { id: 'lab_result', label: 'Labs' },
  { id: 'diagnosis', label: 'Diagnoses' },
  { id: 'vitals', label: 'Vitals' },
  { id: 'imaging', label: 'Imaging' },
  { id: 'immunization', label: 'Vaccines' },
];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function RecordsPage() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState('all');
  const { data: records, isLoading } = useRecords(undefined, activeFilter !== 'all' ? activeFilter : undefined);

  return (
    <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
      <View className="pt-4 pb-6 space-y-4">
        {/* Header */}
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-xl font-bold text-gray-900">Records</Text>
            <Text className="text-sm text-gray-500">Your health history</Text>
          </View>
        </View>

        {/* Filter tabs */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="-mx-4 px-4">
          <View className="flex-row gap-2 py-1">
            {FILTER_TABS.map((tab) => (
              <TouchableOpacity
                key={tab.id}
                onPress={() => setActiveFilter(tab.id)}
                className={`px-3 py-1.5 rounded-full ${activeFilter === tab.id ? 'bg-primary-600' : 'bg-gray-100'}`}
              >
                <Text className={`text-xs font-medium ${activeFilter === tab.id ? 'text-white' : 'text-gray-600'}`}>
                  {tab.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Records List */}
        {isLoading ? (
          <View className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} padding="md">
                <View className="space-y-2">
                  <View className="h-5 w-44 bg-gray-200 rounded animate-pulse" />
                  <View className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                  <View className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                </View>
              </Card>
            ))}
          </View>
        ) : records && records.length > 0 ? (
          <View className="space-y-2">
            {records.map((record) => {
              const typeInfo = TYPE_ICONS[record.type] || TYPE_ICONS.lab_result;
              const Icon = typeInfo.icon;
              return (
                <TouchableOpacity
                  key={record.id}
                  onPress={() => router.push(record.type === 'lab_result' ? `/reports/${record.id}` : `#`)}
                  activeOpacity={0.7}
                >
                  <Card variant="hover" padding="md">
                    <View className="flex-row items-start gap-3">
                      <View
                        className="w-10 h-10 rounded-lg items-center justify-center shrink-0"
                        style={{ backgroundColor: typeInfo.bg }}
                      >
                        <Icon size={18} color={typeInfo.color} />
                      </View>
                      <View className="flex-1 min-w-0">
                        <Text className="text-sm font-semibold text-gray-900" numberOfLines={1}>
                          {record.title}
                        </Text>
                        {record.description && (
                          <Text className="text-xs text-gray-500 mt-0.5" numberOfLines={2}>
                            {record.description}
                          </Text>
                        )}
                        <View className="flex-row items-center gap-2 mt-1.5">
                          <View className="bg-gray-100 px-1.5 py-0.5 rounded">
                            <Text className="text-[10px] font-medium text-gray-500">{typeInfo.label}</Text>
                          </View>
                          <Text className="text-[11px] text-gray-400">{formatDate(record.date)}</Text>
                          {record.facility && (
                            <Text className="text-[11px] text-gray-400" numberOfLines={1}>{record.facility}</Text>
                          )}
                        </View>
                      </View>
                      <ArrowRight size={16} color="#94a3b8" style={{ marginTop: 4 }} />
                    </View>
                  </Card>
                </TouchableOpacity>
              );
            })}
          </View>
        ) : (
          <Card padding="lg">
            <View className="items-center py-8">
              <Files size={40} color="#94a3b8" />
              <Text className="text-base font-semibold text-gray-900 mt-3">No records found</Text>
              <Text className="text-sm text-gray-500 mt-1">Your health records will appear here.</Text>
            </View>
          </Card>
        )}
      </View>
    </ScrollView>
  );
}
