import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface AuthState {
  accessToken: string | null;
  user: {
    name: string;
    email: string;
  } | null;
  hasRefreshed: boolean;
  setAuth: (token: string, user: AuthState["user"]) => void;
  setUser: (user: AuthState["user"]) => void;
  setHasRefreshed: (refreshed: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  devtools((set) => ({
    accessToken: null,
    user: null,
    hasRefreshed: false,
    setAuth: (accessToken, user) => set({ accessToken, user }),
    setUser: (user) => set({ user }),
    setHasRefreshed: (refreshed) => set({ hasRefreshed: refreshed }),
    logout: () => set({ accessToken: null, user: null }),
  }))
);
