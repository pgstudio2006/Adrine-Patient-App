import { Platform, View, Text, TouchableOpacity } from 'react-native';
import { Sparkle, X } from 'lucide-react-native';
import { useState } from 'react';

const isIOS = Platform.OS === 'ios';

export function AiCopilotFAB() {
  const [open, setOpen] = useState(false);

  if (!open) {
    return (
      <TouchableOpacity
        onPress={() => setOpen(true)}
        activeOpacity={0.8}
        className={`absolute bottom-4 right-4 w-14 h-14 rounded-full bg-primary-600 shadow-lg items-center justify-center z-50 ${isIOS ? 'shadow-gray-400/50' : 'shadow-gray-600'}`}
        style={{ elevation: 8 }}
      >
        <Sparkle size={24} color="white" />
      </TouchableOpacity>
    );
  }

  return (
    <View
      className={`absolute bottom-4 right-4 w-72 bg-white rounded-2xl shadow-lg z-50 overflow-hidden ${isIOS ? 'shadow-gray-400/50' : 'shadow-gray-600'}`}
      style={{ elevation: 12 }}
    >
      <View className="flex-row items-center justify-between p-4 border-b border-gray-100">
        <View className="flex-row items-center gap-2">
          <View className="w-8 h-8 rounded-full bg-primary-100 items-center justify-center">
            <Sparkle size={16} color="#0d9488" />
          </View>
          <Text className="text-sm font-semibold text-gray-900">AI Copilot</Text>
        </View>
        <TouchableOpacity onPress={() => setOpen(false)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <X size={18} color="#64748b" />
        </TouchableOpacity>
      </View>
      <View className="p-4">
        <Text className="text-xs text-gray-600 leading-relaxed">
          I'm your health assistant! Ask me about your medications, lab results, or help you navigate the app.
        </Text>
      </View>
      <View className="p-3 bg-gray-50 border-t border-gray-100">
        <TouchableOpacity
          className="bg-primary-600 rounded-lg py-2.5 items-center"
          activeOpacity={0.7}
        >
          <Text className="text-white text-sm font-medium">Ask a question</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
