import { Redirect } from 'expo-router';
import { View, ActivityIndicator } from 'react-native';

export default function Index() {
  // For now, redirect to the (tabs) layout directly
  // In a full auth flow, check if user is logged in first
  return <Redirect href="/(tabs)" />;
}
