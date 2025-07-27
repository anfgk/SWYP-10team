import { useAuthStore } from "@/stores/authStore";
import { useEffect } from "react";

import { decodeAndSetAuth } from "@/lib/authUtils";

const useIssueAccessToken = () => {
  const { accessToken, logout, hasRefreshed, setHasRefreshed } = useAuthStore();

  useEffect(() => {
    if (accessToken || hasRefreshed) return;
    const fetchRefresh = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/user/reissue`,
          {
            method: "POST",
            credentials: "include",
          }
        );

        if (!res.ok) {
          if (res.status === 401 || res.status === 403) {
            logout();
          } else {
            console.error("서버 오류 발생");
          }
          return;
        }

        const data = await res.json();
        decodeAndSetAuth(data);
        setHasRefreshed(true);
      } catch (error) {
        console.error("네트워크 에러:", error);
        logout();
      }
    };

    fetchRefresh();
  }, [hasRefreshed]);
};

export default useIssueAccessToken;
