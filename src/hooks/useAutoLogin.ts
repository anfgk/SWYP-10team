import { useAuthStore } from "@/stores/authStore";
import { useEffect } from "react";

const useAutoLogin = () => {
  const { setAuth, logout } = useAuthStore.getState();

  useEffect(() => {
    const fetchRefresh = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/(백엔드 refresh URL))`,
          {
            method: "POST",
            credentials: "include",
          }
        );

        if (!res.ok) throw new Error("토큰 refresh 실패");

        const data = await res.json();

        setAuth(data.accessToken, data.user);
      } catch (error) {
        logout();
      }
    };

    fetchRefresh();
  }, [setAuth, logout]);
};

export default useAutoLogin;
