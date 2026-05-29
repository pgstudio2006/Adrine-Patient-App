import { View, SafeAreaView, StatusBar, Platform } from 'react-native';
import type { ReactNode } from 'react';
import { BottomNav } from './BottomNav';
import { AiCopilotFAB } from './AiCopilotFAB';

interface AppShellProps {
  children: ReactNode;
  showBottomNav?: boolean;
  showFab?: boolean;
}

const isIOS = Platform.OS === 'ios';

export function AppShell({ children, showBottomNav = true, showFab = true }: AppShellProps) {
  return (
    <SafeAreaView className="flex-1 bg-surface-secondary">
      <StatusBar
        barStyle="dark-content"
        backgroundColor={isIOS ? 'transparent' : '#f8fafc'}
      />
      <View className="flex-1">
        <View className="flex-1 px-4 pt-4 pb-2">
          {children}
        </View>
        {showBottomNav && <BottomNav />}
        {showFab && <AiCopilotFAB />}
      </View>
    </SafeAreaView>
  );
}
