import { useAuthStore } from "@/stores/authStore";
import { useEffect } from "react";

import { decodeAndSetAuth } from "@/lib/authUtils";
import { fetchWithAuth } from "@/lib/fetchUtils";

const useIssueAccessToken = () => {
  const { accessToken, logout, hasRefreshed, setHasRefreshed, setProfileImg } =
    useAuthStore();

  useEffect(() => {
    if (accessToken || hasRefreshed) return;
    const loadUserInfo = async () => {
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

        //accessToken 저장
        const data = await res.json();
        decodeAndSetAuth(data);
        setHasRefreshed(true);

        //user profile 사진 저장
        const profileRes = await fetchWithAuth("/api/user/profile");
        const profileData = await profileRes.json();
        setProfileImg(profileData.data.imageUrl);
      } catch (error) {
        console.error("네트워크 에러:", error);
        logout();
      }
    };

    loadUserInfo();
  }, [hasRefreshed]);
};

export default useIssueAccessToken;
