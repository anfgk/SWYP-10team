import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface AuthState {
  accessToken: string | null;
  user: {
    name: string;
    email: string;
  } | null;
  profileImg: string | null;
  provider: "google" | "kakao" | "naver" | null;
  hasRefreshed: boolean;
  isLoggedIn: boolean;

  setAuth: (token: string, user: AuthState["user"]) => void;
  setProfileImg: (img: string) => void;
  setProvider: (provider: "google" | "kakao" | "naver") => void;
  setHasRefreshed: (refreshed: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  devtools((set) => ({
    accessToken: null,
    user: null,
    profileImg: null,
    provider: null,
    hasRefreshed: false,
    isLoggedIn: false,

    setAuth: (accessToken, user) =>
      set({ isLoggedIn: true, accessToken, user }),
    setProfileImg: (img: string) => set({ profileImg: img }),
    setProvider: (provider: "google" | "kakao" | "naver") => set({ provider }),
    setHasRefreshed: (refreshed) => set({ hasRefreshed: refreshed }),
    logout: () => set({ isLoggedIn: false, accessToken: null, user: null }),
  })),
);
