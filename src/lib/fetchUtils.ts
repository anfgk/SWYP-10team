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
    if (!contentType || !contentType.includes("application/json")) {
      const responseText = await response.text();
      console.error("JSON이 아닌 응답:", responseText);
      throw new Error("API가 JSON을 반환하지 않습니다");
    }

    const data = await response.json();
    console.log("사용자 프로필 로드 성공:", data);

    // API 응답 구조에 따라 사용자 정보 추출
    const userData = data?.data || data?.user || data;
    return userData;
  } catch (error) {
    console.error("사용자 프로필 로드 실패:", error);
    throw error;
  }
};

// 사용자 프로필 정보 수정
export const updateUserProfile = async (
  accessToken: string,
  displayName: string,
  image: File
) => {
  try {
    // FormData 생성 (API 스펙에 맞게)
    const formData = new FormData();

    // request 객체 구조로 전송
    const requestData = {
      displayName: displayName,
      image: [image], // 이미지는 배열로 전송
    };

    // FormData에 request 객체 추가
    formData.append("request", JSON.stringify(requestData));
    formData.append("image", image); // 실제 이미지 파일도 추가

    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}api/user/profile`,
      {
        method: "PATCH",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
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
    if (!contentType || !contentType.includes("application/json")) {
      const responseText = await response.text();
      console.error("JSON이 아닌 응답:", responseText);
      throw new Error("API가 JSON을 반환하지 않습니다");
    }

    const data = await response.json();
    console.log("사용자 프로필 수정 성공:", data);

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
    if (!contentType || !contentType.includes("application/json")) {
      const responseText = await response.text();
      console.error("JSON이 아닌 응답:", responseText);
      throw new Error("API가 JSON을 반환하지 않습니다");
    }

    const data = await response.json();
    console.log("프로필 이미지 삭제 성공:", data);

    return data;
  } catch (error) {
    console.error("프로필 이미지 삭제 실패:", error);
    throw error;
  }
};

export { fetchWithAuth, decodeJWT };
