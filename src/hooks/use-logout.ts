import { router } from 'expo-router';
import { useCallback } from 'react';

import { useAppDispatch } from './use-app-dispatch';

import { clearUser, setLoggingOut } from '@/store/slices/authSlice';
import { clearCache, clearSelectedProduct } from '@/store/slices/productsSlice';

/**
 * Returns a logout function that:
 * 1. Sets isLoggingOut = true to show loading feedback
 * 2. Simulates a network "sign-out" call with a short delay
 * 3. Clears authenticated user data from Redux (authSlice)
 * 4. Clears all product cache and selected product (productsSlice)
 * 5. Redirects to the login screen, replacing the history stack
 *    so the user cannot navigate back into the authenticated area.
 */
export function useLogout() {
  const dispatch = useAppDispatch();

  const logout = useCallback(async () => {
    dispatch(setLoggingOut(true));

    // Simulate a "sign-out" API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    dispatch(clearUser());
    dispatch(clearCache());
    dispatch(clearSelectedProduct());
    router.replace('/login' as never);
  }, [dispatch]);

  return logout;
}
