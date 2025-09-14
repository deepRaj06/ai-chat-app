import React from 'react';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatScreen from '../screens/ChatScreen';
import HomeScreen from '../screens/HomeScreen';

const Stack = createNativeStackNavigator();

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    // <Tabs
    //   screenOptions={{
    //     tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
    //     headerShown: false,
    //     tabBarButton: HapticTab,
    //   }}>
    //   <Tabs.Screen
    //     name="index"
    //     options={{
    //       title: 'Home',
    //       tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
    //     }}
    //   />
    //   <Tabs.Screen
    //     name="explore"
    //     options={{
    //       title: 'Explore',
    //       tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
    //     }}
    //   />
    // </Tabs>
    // <Stack screenOptions={{ headerShown: false }}>
    //   <Stack.Screen name="index" />
    //   <Stack.Screen name="profile" />
    // </Stack>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='home' component={HomeScreen} />
      <Stack.Screen name='chat' component={ChatScreen} />
    </Stack.Navigator>
  );
}
