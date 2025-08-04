import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface AuthState {
  accessToken: string | null;
  user: {
    name: string;
    email: string;
  } | null;
  profileImg: string;
  hasRefreshed: boolean;
  isLoggedIn: boolean;

  setAuth: (token: string, user: AuthState["user"]) => void;
  setProfileImg: (img: string) => void;
  setHasRefreshed: (refreshed: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  devtools((set) => ({
    accessToken: null,
    user: null,
    hasRefreshed: false,
    isLoggedIn: false,

    setAuth: (accessToken, user) =>
      set({ isLoggedIn: true, accessToken, user }),
    setProfileImg: (img: string) => set({ profileImg: img }),
    setHasRefreshed: (refreshed) => set({ hasRefreshed: refreshed }),
    logout: () => set({ isLoggedIn: false, accessToken: null, user: null }),
  }))
);
