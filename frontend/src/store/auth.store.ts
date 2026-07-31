import { create } from "zustand";
import { User } from "@/types/auth";

interface AuthState {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) =>
    set({
      user,
    }),
  clearUser: () =>
    set({
      user: null,
    }),
}));

interface AuthTokenState {
  token: string | null;
  setToken: (token: string) => void;
  clearToken: () => void;
}

export const useAuthTokenStore = create<AuthTokenState>((set) => ({
  token: null,
  setToken(token) {
    set({
      token,
    });
  },
  clearToken() {
    set({
      token: null,
    });
  },
}));
