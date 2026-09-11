import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthUser {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  token: string;
}

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoggingOut: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoggingOut: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<AuthUser>) {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoggingOut = false;
    },
    clearUser(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoggingOut = false;
    },
    setLoggingOut(state, action: PayloadAction<boolean>) {
      state.isLoggingOut = action.payload;
    },
  },
});

export const { setUser, clearUser, setLoggingOut } = authSlice.actions;
export default authSlice.reducer;
