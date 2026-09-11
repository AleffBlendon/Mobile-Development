import { AuthUser } from '@/store/slices/authSlice';

/**
 * Simulated login — no real backend.
 * Accepts any valid email/password and returns a mock user object.
 * Simulates network latency with a short delay.
 */
export async function simulateLogin(email: string): Promise<AuthUser> {
  await new Promise((resolve) => setTimeout(resolve, 1200));

  const username = email.split('@')[0];

  return {
    id: 1,
    username,
    email,
    firstName: username.charAt(0).toUpperCase() + username.slice(1),
    lastName: 'Usuário',
    token: `mock-token-${Date.now()}`,
  };
}
