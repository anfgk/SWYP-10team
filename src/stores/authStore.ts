import { create } from "zustand";

interface AuthState {
  accessToken: string | null;
  user: {
    name: string;
    email: string;
  } | null;
  setAuth: (token: string, user: AuthState["user"]) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  user: null,
  setAuth: (accessToken, user) => set({ accessToken: accessToken, user }),
  logout: () => set({ accessToken: null, user: null }),
}));
