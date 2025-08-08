import { useAuthStore } from "@/stores/authStore";
import type { JWTPayLoad } from "@/types/types";
import { jwtDecode } from "jwt-decode";

const fetchWithAuth = async (
  input: RequestInfo,
  init?: RequestInit
): Promise<Response> => {
  const { accessToken, setAuth, logout } = useAuthStore.getState();

  //access토큰 기반 헤더 생성
  const addAuthHeader = (headers: HeadersInit = {}) => ({
    ...headers,
    // Authorization: `Bearer ${accessToken}`,
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI3IiwiZW1haWwiOiJnbG9yaWEwMjA1MTBAZ21haWwuY29tIiwiZGlzcGxheU5hbWUiOiLsoJXtlZgiLCJpYXQiOjE3NTQzODQ4MDQsImV4cCI6MTc2MjE2MDgwNH0.4WXOk_zOhE8ndDtB3zXfwKNi_1Lapv3Z1-seMIgv8fg`,
  });

  //보안 헤더 포함해서 요청
  let res = await fetch(input, {
    ...init,
    headers: addAuthHeader(init?.headers),
  });

  //access토큰 거부 시 재발급 요청
  if (res.status === 401) {
    try {
      const refreshRes = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}api/user/reissue`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      //access토큰 재발급 실패 시
      if (!refreshRes.ok) throw new Error("refresh 실패");

      //재발급 성공시 토큰 등록
      const data = await refreshRes.json();
      setAuth(data.accessToken, data.user);

      //재발급 토큰으로 데이터 요청 재시도
      res = await fetch(input, {
        ...init,
        headers: {
          ...addAuthHeader(init?.headers),
        },
      });
    } catch (error) {
      logout();
      throw new Error("자동로그인 실패");
    }
  }
  return res;
};

const decodeJWT = (accessToken: string) => {
  if (!accessToken || typeof accessToken !== "string") {
    throw new Error("Invalid token specified: must be a string");
  }

  try {
    return jwtDecode<JWTPayLoad>(accessToken);
  } catch (error) {
    console.error("JWT 디코딩 실패:", error);
    throw new Error("Invalid token format");
  }
};

export { fetchWithAuth, decodeJWT };
