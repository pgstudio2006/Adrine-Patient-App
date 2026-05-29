import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { useRouter, useLocalSearchParams, Stack } from 'expo-router';
import {
  ArrowLeft,
  Phone,
  PhoneOff,
  Video,
  VideoOff,
  Mic,
  MicOff,
  User,
} from 'lucide-react-native';

const isIOS = Platform.OS === 'ios';

export default function TelemedicinePage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [isCallActive, setIsCallActive] = useState(true);

  useEffect(() => {
    if (!isCallActive) return;
    const interval = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isCallActive]);

  const formatDuration = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleEndCall = () => {
    setIsCallActive(false);
    setTimeout(() => router.back(), 1500);
  };

  return (
    <View className="flex-1 bg-gray-900">
      <Stack.Screen options={{ headerShown: false }} />

      {/* Video Preview (placeholder) */}
      <View className="flex-1 justify-center items-center">
        {/* Remote video placeholder */}
        <View className="absolute inset-0 bg-gray-800 items-center justify-center">
          <View className="w-24 h-24 rounded-full bg-gray-700 items-center justify-center">
            <User size={48} color="#64748b" />
          </View>
          <Text className="text-white text-lg font-semibold mt-4">Dr. Sarah Chen</Text>
          <Text className="text-gray-400 text-sm mt-1">Cardiology</Text>
          {!isVideoOn && (
            <View className="mt-6 bg-gray-700/80 px-4 py-2 rounded-full">
              <Text className="text-gray-300 text-sm">Camera is off</Text>
            </View>
          )}
        </View>

        {/* Self-view picture-in-picture */}
        <View className="absolute top-16 right-4 w-28 h-40 rounded-xl bg-gray-700 border-2 border-gray-600 items-center justify-center">
          <User size={24} color="#94a3b8" />
          <Text className="text-gray-400 text-[10px] mt-1">You</Text>
          {!isVideoOn && <View className="absolute inset-0 bg-gray-800/80 rounded-xl items-center justify-center">
            <VideoOff size={20} color="#94a3b8" />
          </View>}
        </View>

        {/* Call Status */}
        <View className="absolute top-6 left-4">
          <TouchableOpacity onPress={() => { handleEndCall(); }} className="w-9 h-9 rounded-full bg-black/40 items-center justify-center">
            <ArrowLeft size={18} color="white" />
          </TouchableOpacity>
        </View>

        <View className="absolute top-6 self-center">
          <View className="bg-black/40 px-3 py-1 rounded-full">
            <Text className="text-white text-xs font-mono">{formatDuration(callDuration)}</Text>
          </View>
        </View>
      </View>

      {/* Controls */}
      <View className="pb-12 px-8 pt-6 bg-gray-900">
        <View className="flex-row justify-center gap-6">
          <TouchableOpacity
            onPress={() => setIsMuted(!isMuted)}
            className={`w-14 h-14 rounded-full items-center justify-center ${isMuted ? 'bg-red-500' : 'bg-gray-700'}`}
          >
            {isMuted ? <MicOff size={22} color="white" /> : <Mic size={22} color="white" />}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setIsVideoOn(!isVideoOn)}
            className={`w-14 h-14 rounded-full items-center justify-center ${!isVideoOn ? 'bg-red-500' : 'bg-gray-700'}`}
          >
            {isVideoOn ? <Video size={22} color="white" /> : <VideoOff size={22} color="white" />}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleEndCall}
            className="w-14 h-14 rounded-full bg-red-600 items-center justify-center"
          >
            <PhoneOff size={22} color="white" />
          </TouchableOpacity>
        </View>

        <Text className="text-gray-500 text-xs text-center mt-4">
          {isMuted ? 'You are muted' : isVideoOn ? 'Video call in progress' : 'Voice call in progress'}
        </Text>
      </View>
    </View>
  );
}
