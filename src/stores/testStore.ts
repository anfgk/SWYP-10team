import { create } from "zustand";

interface TestAuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: {
    name: string;
    email: string;
  } | null;
  setAuth: (
    accessToken: string,
    refreshToken: string,
    user: TestAuthState["user"],
  ) => void;
  setUser: (user: TestAuthState["user"]) => void;
  refreshAccessToken: () => Promise<string | null>;
  logout: () => void;
}

export const useTestStore = create<TestAuthState>((set, get) => ({
  accessToken: null,
  refreshToken: null,
  user: null,
  setAuth: (accessToken, refreshToken, user) => {
    // localStorage에 토큰 저장
    localStorage.setItem("testAccessToken", accessToken);
    localStorage.setItem("testRefreshToken", refreshToken);
    set({ accessToken, refreshToken, user });
  },
  setUser: (user) => set({ user }),
  refreshAccessToken: async () => {
    const { refreshToken } = get();
    if (!refreshToken) return null;

    try {
      const response = await fetch("/api/auth/refresh", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (response.ok) {
        const data = await response.json();
        // 새로운 토큰을 localStorage와 상태에 저장
        localStorage.setItem("testAccessToken", data.accessToken);
        set({ accessToken: data.accessToken });
        return data.accessToken;
      } else {
        // refresh token도 만료된 경우
        localStorage.removeItem("testAccessToken");
        localStorage.removeItem("testRefreshToken");
        set({ accessToken: null, refreshToken: null, user: null });
        return null;
      }
    } catch (error) {
      console.error("Token refresh failed:", error);
      localStorage.removeItem("testAccessToken");
      localStorage.removeItem("testRefreshToken");
      set({ accessToken: null, refreshToken: null, user: null });
      return null;
    }
  },
  logout: () => {
    localStorage.removeItem("testAccessToken");
    localStorage.removeItem("testRefreshToken");
    set({ accessToken: null, refreshToken: null, user: null });
  },
}));
