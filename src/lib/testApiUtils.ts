import { useTestStore } from "@/stores/testStore";

// 토큰 재발급 함수
const refreshToken = async (): Promise<string | null> => {
  try {
    const refreshTokenValue = localStorage.getItem("testRefreshToken");
    if (!refreshTokenValue) return null;

    const response = await fetch("/api/auth/refresh", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken: refreshTokenValue }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("testAccessToken", data.accessToken);

      // testStore 상태 업데이트
      const { setAuth } = useTestStore.getState();
      setAuth(
        data.accessToken,
        refreshTokenValue,
        useTestStore.getState().user,
      );

      return data.accessToken;
    } else {
      // refresh token도 만료된 경우
      localStorage.removeItem("testAccessToken");
      localStorage.removeItem("testRefreshToken");
      const { logout } = useTestStore.getState();
      logout();
      return null;
    }
  } catch (error) {
    console.error("Token refresh failed:", error);
    localStorage.removeItem("testAccessToken");
    localStorage.removeItem("testRefreshToken");
    const { logout } = useTestStore.getState();
    logout();
    return null;
  }
};

// API 요청 시 자동으로 토큰을 재발급받는 함수
export const testApiRequest = async (
  url: string,
  options: RequestInit = {},
): Promise<Response> => {
  const accessToken = localStorage.getItem("testAccessToken");

  // 첫 번째 요청 시도 (기존 토큰 사용)
  const firstAttempt = async () => {
    const headers = {
      "Content-Type": "application/json",
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      ...options.headers,
    };

    return fetch(url, {
      ...options,
      headers,
    });
  };

  // 첫 번째 요청 시도
  let response = await firstAttempt();

  // 401 에러가 발생하면 토큰 재발급 시도
  if (response.status === 401) {
    const newToken = await refreshToken();

    if (newToken) {
      // 새로운 토큰으로 재시도
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${newToken}`,
        ...options.headers,
      };

      response = await fetch(url, {
        ...options,
        headers,
      });
    } else {
      // 토큰 재발급 실패 시 로그인 페이지로 리다이렉트
      window.location.href = "/login";
      throw new Error("Authentication failed");
    }
  }

  return response;
};

// GET 요청 헬퍼
export const testApiGet = (url: string) => testApiRequest(url);

// POST 요청 헬퍼
export const testApiPost = (url: string, data: any) =>
  testApiRequest(url, {
    method: "POST",
    body: JSON.stringify(data),
  });

// PUT 요청 헬퍼
export const testApiPut = (url: string, data: any) =>
  testApiRequest(url, {
    method: "PUT",
    body: JSON.stringify(data),
  });

// DELETE 요청 헬퍼
export const testApiDelete = (url: string) =>
  testApiRequest(url, {
    method: "DELETE",
  });

// 테스트용 로그인 API 함수
export const testLoginAPI = async (provider: string, code: string) => {
  try {
    const response = await fetch(`/api/auth/${provider}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code }),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Login failed");
    }
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

// 테스트용 사용자 정보 가져오기 API 함수
export const testGetUserInfoAPI = async () => {
  try {
    const response = await testApiGet("/api/user/info");

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Failed to get user info");
    }
  } catch (error) {
    console.error("Get user info error:", error);
    throw error;
  }
};
