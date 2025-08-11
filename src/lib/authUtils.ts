import { fetchWithAuth } from "./fetchUtils";
import { useAuthStore } from "@/stores/authStore";
//import { jwtDecode } from "jwt-decode";
//import type { JWTPayLoad } from "@/types/apiResponseTypes";

const logoutProcess = async () => {
  const { logout } = useAuthStore.getState();

  try {
    await fetchWithAuth("/api/user/logout", {
      method: "POST",
      credentials: "include",
    });
  } catch (error) {
    console.error("Logout 요청 실패 또는 accessToken 재발급 실패");
    return;
  } finally {
    logout();
  }
};

const decodeAndSetAuth = (data: any) => {
  const { setAuth } = useAuthStore.getState();
  const accessToken = data.data.accessToken;
  // const decoded = jwtDecode<JWTPayLoad>(accessToken);
  // const { displayName, email } = decoded;
  setAuth(accessToken, { name: "", email: "" });
};

const refetchProfile = async () => {
  const {
    logout,
    setHasRefreshed,
    setProfileImg,
    setProvider,
    setAuthLoading,
    setAuth,
  } = useAuthStore.getState();
  setAuthLoading(true);
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
    setAuth(data.data.accessToken, {
      name: profileData.data.displayName,
      email: profileData.data.email,
    });
    setProvider(profileData.data.provider);
    setProfileImg(profileData.data.imageUrl);
  } catch (error) {
    console.error("네트워크 에러:", error);
    logout();
  } finally {
    setAuthLoading(false);
  }
};

export { logoutProcess, decodeAndSetAuth, refetchProfile };
