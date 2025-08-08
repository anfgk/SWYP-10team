import { useAuthStore } from "@/stores/authStore";
import type { JWTPayLoad } from "@/types/types";
import { jwtDecode } from "jwt-decode";

// 인증 토큰이 포함된 fetch 요청 (자동 토큰 갱신 포함)
const fetchWithAuth = async (
  input: RequestInfo,
  init?: RequestInit
): Promise<Response> => {
  const { accessToken, setAuth, logout } = useAuthStore.getState();

  // 인증 헤더 추가 함수
  const addAuthHeader = (headers: HeadersInit = {}) => ({
    ...headers,
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI3IiwiZW1haWwiOiJnbG9yaWEwMjA1MTBAZ21haWwuY29tIiwiZGlzcGxheU5hbWUiOiLsoJXtlZgiLCJpYXQiOjE3NTQzODQ4MDQsImV4cCI6MTc2MjE2MDgwNH0.4WXOk_zOhE8ndDtB3zXfwKNi_1Lapv3Z1-seMIgv8fg`,
  });

  let res = await fetch(input, {
    ...init,
    headers: addAuthHeader(init?.headers),
  });

  // 401 에러 시 토큰 자동 갱신
  if (res.status === 401) {
    try {
      const refreshRes = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}api/user/reissue`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (!refreshRes.ok) throw new Error("refresh 실패");

      const data = await refreshRes.json();
      setAuth(data.accessToken, data.user);

      // 갱신된 토큰으로 요청 재시도
      res = await fetch(input, {
        ...init,
        headers: { ...addAuthHeader(init?.headers) },
      });
    } catch (error) {
      logout();
      throw new Error("자동로그인 실패");
    }
  }
  return res;
};

// JWT 토큰 디코딩
const decodeJWT = (accessToken: string) => {
  if (!accessToken || typeof accessToken !== "string")
    throw new Error("Invalid token specified: must be a string");

  try {
    return jwtDecode<JWTPayLoad>(accessToken);
  } catch (error) {
    console.error("JWT 디코딩 실패:", error);
    throw new Error("Invalid token format");
  }
};

// 사용자 프로필 정보 가져오기
export const fetchUserProfile = async (accessToken: string) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}api/user/profile`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("사용자 프로필 API 에러 응답:", errorText);
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${errorText}`
      );
    }

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json"))
      throw new Error("API가 JSON을 반환하지 않습니다");

    const data = await response.json();
    return data?.data || data?.user || data;
  } catch (error) {
    console.error("사용자 프로필 로드 실패:", error);
    throw error;
  }
};

// 사용자 프로필 정보 수정 (이름 및 이미지)
export const updateUserProfile = async (
  accessToken: string,
  displayName: string,
  image?: File
) => {
  try {
    // displayName 유효성 검사 (2-12자, 영문/숫자/한글만 허용)
    if (displayName.length < 2 || displayName.length > 12) {
      throw new Error("이름은 2-12자 사이여야 합니다.");
    }

    const namePattern = /^[a-zA-Z0-9가-힐]*$/;
    if (!namePattern.test(displayName)) {
      throw new Error("이름은 영문, 숫자, 한글만 사용 가능합니다.");
    }

    const formData = new FormData();

    // API 문서에 따르면 image 필드는 문자열 배열이어야 함
    // 새 이미지가 있으면 빈 배열, 없으면 기존 이미지 URL 유지
    const requestData = {
      displayName: displayName,
      image: [], // 새 이미지가 있으면 빈 배열, 기존 이미지는 별도 처리 필요
    };

    formData.append("request", JSON.stringify(requestData));

    // 새 이미지가 있는 경우에만 추가
    if (image) {
      formData.append("image", image);
    }

    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}api/user/profile`,
      {
        method: "PATCH",
        credentials: "include",
        headers: { Authorization: `Bearer ${accessToken}` },
        body: formData,
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("사용자 프로필 수정 API 에러 응답:", errorText);
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${errorText}`
      );
    }

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json"))
      throw new Error("API가 JSON을 반환하지 않습니다");

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("사용자 프로필 수정 실패:", error);
    throw error;
  }
};

// 사용자 프로필 이미지 삭제
export const deleteUserProfileImage = async (accessToken: string) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}api/user/profile/image`,
      {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("프로필 이미지 삭제 API 에러 응답:", errorText);
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${errorText}`
      );
    }

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json"))
      throw new Error("API가 JSON을 반환하지 않습니다");

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("프로필 이미지 삭제 실패:", error);
    throw error;
  }
};

export { fetchWithAuth, decodeJWT };
