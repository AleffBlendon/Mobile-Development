import { DarkTheme, DefaultTheme, Stack, ThemeProvider, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { Provider } from 'react-redux';

import { useAppSelector } from '@/hooks/use-app-selector';
import { store } from '@/store';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <Provider store={store}>
      <AppShell />
    </Provider>
  );
}

function AppShell() {
  const colorScheme = useColorScheme();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  useEffect(() => {
    const rootSegment = segments[0];
    if (rootSegment == null) return;

    const onLogin = rootSegment === 'login';
    const onTabs = rootSegment === '(tabs)';
    const onProductDetail = rootSegment === 'product';

    if (!isAuthenticated && !onLogin) {
      router.replace('/login' as never);
      return;
    }

    if (isAuthenticated && onLogin) {
      router.replace('/(tabs)');
    }
  }, [isAuthenticated, segments, router]);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="login" />
        <Stack.Screen name="product/[id]" />
      </Stack>
    </ThemeProvider>
  );
}
