import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { usePathname, useRouter } from 'expo-router';
import {
  House,
  CalendarCheck,
  Files,
  Pill,
  User,
} from 'lucide-react-native';

const NAV_ITEMS = [
  { label: 'Home', icon: House, href: '/', route: '/' },
  { label: 'Care', icon: CalendarCheck, href: '/care', route: '/care' },
  { label: 'Records', icon: Files, href: '/records', route: '/records' },
  { label: 'Prescriptions', icon: Pill, href: '/prescriptions', route: '/prescriptions' },
  { label: 'Profile', icon: User, href: '/profile', route: '/profile' },
];

const isIOS = Platform.OS === 'ios';

export function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <View
      className={`flex-row items-center justify-around bg-white border-t border-gray-200 px-2 pb-1 ${isIOS ? 'pt-2' : 'pt-1'}`}
      style={{ paddingBottom: isIOS ? 20 : 4 }}
    >
      {NAV_ITEMS.map((item) => {
        const isActive = pathname === item.route || pathname.startsWith(item.route + '/');
        const Icon = item.icon;
        const color = isActive ? '#0d9488' : '#94a3b8';

        return (
          <TouchableOpacity
            key={item.label}
            onPress={() => router.push(item.href)}
            activeOpacity={0.7}
            className="items-center justify-center py-1 px-3"
            hitSlop={{ top: 8, bottom: 8, left: 4, right: 4 }}
          >
            <Icon size={22} color={color} />
            <Text
              className={`text-[10px] mt-0.5 font-medium ${isActive ? 'text-primary-600' : 'text-gray-400'}`}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
