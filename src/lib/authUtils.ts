import { fetchWithAuth } from "./fetchUtils";
import { useAuthStore } from "@/stores/authStore";
import { jwtDecode } from "jwt-decode";
import type { JWTPayLoad } from "@/types/types";

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
  const decoded = jwtDecode<JWTPayLoad>(accessToken);
  const { displayName, email } = decoded;
  setAuth(accessToken, { name: displayName, email });
};

export { logoutProcess, decodeAndSetAuth };
