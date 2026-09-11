import { Redirect } from 'expo-router';

import { useAppSelector } from '@/hooks/use-app-selector';

/**
 * Root index — redirects based on auth state.
 * Authenticated → main tabs area
 * Unauthenticated → login screen
 */
export default function RootIndex() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  // After login, go to the (tabs) group
  return <Redirect href={isAuthenticated ? '/(tabs)' : '/login'} />;
}
