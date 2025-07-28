import { decodeJWT } from "@/lib/fetchUtils";
import { useAuthStore } from "@/stores/authStore";
import { useEffect } from "react";

const useIssueAccessToken = () => {
  const { setAuth, logout } = useAuthStore();

  useEffect(() => {
    // const fetchRefresh = async () => {
    //   try {
    //     const res = await fetch(
    //       `${import.meta.env.VITE_API_BASE_URL}/api/user/reissue`,
    //       {
    //         method: "POST",
    //         credentials: "include",
    //       }
    //     );
    //     if (!res.ok) throw new Error("토큰 발급 실패");
    //     const data = await res.json();
    //     const decoded = decodeJWT(data.accessToken);
    //     const { displayName, email } = decoded;
    //     setAuth(data.accessToken, { name: displayName, email: email });
    //   } catch (error) {
    //     console.error("토큰 재발급 에러:", error);
    //     logout();
    //   }
    // };
    // fetchRefresh();
  }, [setAuth, logout]);
};

export default useIssueAccessToken;
