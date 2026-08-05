import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  name?: string;
}

interface AuthState {
  user: User | null;
  isLogin: boolean;
  initialized: boolean;
  login: (user: User) => void;
  logout: () => void;
  setInitialized: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLogin: false,
      initialized: false,
      login: (user) =>
        set({
          user,
          isLogin: true,
        }),
      logout: () =>
        set({
          user: null,
          isLogin: false,
        }),
      setInitialized: () =>
        set({
          initialized: true,
        }),
    }),
    { name: 'auth-storage' },
  ),
);
