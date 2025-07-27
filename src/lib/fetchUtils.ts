import { useAuthStore } from "@/stores/authStore";
import { decodeAndSetAuth } from "./authUtils";

const fetchWithAuth = async (
  endPoint: string, // 상대 경로만 받음(/api/user/logout)
  init?: RequestInit
): Promise<Response> => {
  const { accessToken, logout } = useAuthStore.getState();

  const fullURL = `${import.meta.env.VITE_API_BASE_URL}${endPoint}`;

  //access토큰 기반 헤더 생성
  const addAuthHeader = (headers: HeadersInit = {}) => ({
    ...headers,
    Authorization: `Bearer ${accessToken}`,
  });

  //보안 헤더 포함해서 요청
  let res = await fetch(fullURL, {
    ...init,
    headers: addAuthHeader(init?.headers),
  });

  //access토큰 거부 시 재발급 요청
  if (res.status === 401) {
    try {
      const refreshRes = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/user/reissue`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      //access토큰 재발급 실패 시
      if (!refreshRes.ok) throw new Error("refresh 실패");

      //재발급 성공시 토큰 등록
      const refreshData = await refreshRes.json();
      decodeAndSetAuth(refreshData);

      //재발급 토큰으로 데이터 요청 재시도
      res = await fetch(fullURL, {
        ...init,
        headers: {
          ...addAuthHeader(init?.headers),
        },
      });
    } catch (error) {
      logout();
      throw new Error("재발급 실패");
    }
  }
  return res;
};

export { fetchWithAuth };
