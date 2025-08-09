import { jwtDecode } from "jwt-decode";
import type { JWTPayLoad } from "@/types/apiResponseTypes";

// JWT 토큰 디코딩
export const decodeJWT = (accessToken: string) => {
  if (!accessToken || typeof accessToken !== "string")
    throw new Error("Invalid token specified: must be a string");

  try {
    return jwtDecode<JWTPayLoad>(accessToken);
  } catch (error) {
    throw new Error("Invalid token format");
  }
};

// 사용자 프로필 정보 가져오기
export const fetchUserProfile = async (accessToken: string) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/user/profile`,
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
      `${import.meta.env.VITE_API_BASE_URL}/api/user/profile`,
      {
        method: "PATCH",
        credentials: "include",
        headers: { Authorization: `Bearer ${accessToken}` },
        body: formData,
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
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
    throw error;
  }
};

// 사용자 프로필 이미지 삭제
export const deleteUserProfileImage = async (accessToken: string) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/user/profile/image`,
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
    throw error;
  }
};

// 위시리스트 가져오기
export const fetchWishList = async (
  accessToken: string,
  page: number = 0,
  size: number = 8
) => {
  try {
    const params = new URLSearchParams({
      page: page.toString(),
      size: size.toString(),
    });

    const url = `${import.meta.env.VITE_API_BASE_URL}/api/mypage/wish?${params}`;

    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${errorText}`
      );
    }

    const data = await response.json();
    return data?.data || data?.wishes || data;
  } catch (error) {
    throw error;
  }
};

// 최근 방문 장소 가져오기
export const fetchRecentPlaces = async (accessToken: string) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/mypage/history`,
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
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${errorText}`
      );
    }

    const data = await response.json();
    return data?.data || data?.history || data;
  } catch (error) {
    throw error;
  }
};

// 리뷰 목록 가져오기 (사용자 작성 리뷰)
export const fetchReviewList = async (accessToken: string, page: number) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/review/?page=${page}`,
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
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${errorText}`
      );
    }

    const data = await response.json();
    return data?.data || data?.reviews || data;
  } catch (error) {
    throw error;
  }
};

// 리뷰 작성
export const createReview = async (
  accessToken: string,
  placeId: string,
  reviewData: {
    rating: number;
    content: string;
    images?: File[];
  }
) => {
  try {
    const formData = new FormData();
    formData.append("placeId", placeId);
    formData.append("rating", reviewData.rating.toString());
    formData.append("content", reviewData.content);

    if (reviewData.images) {
      reviewData.images.forEach((image) => {
        formData.append("images", image);
      });
    }

    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/reviews`,
      {
        method: "POST",
        credentials: "include",
        headers: { Authorization: `Bearer ${accessToken}` },
        body: formData,
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${errorText}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

// 반려동물 프로필 등록
export const createPetProfile = async (
  accessToken: string,
  petData: {
    name: string;
    gender: string;
    birth: string;
    type: string;
    fierceDog: boolean;
    size: string;
    image: File;
  }
) => {
  try {
    const formData = new FormData();
    formData.append("name", petData.name);
    formData.append("gender", petData.gender);
    formData.append("birth", petData.birth);
    formData.append("type", petData.type);
    formData.append("fierceDog", petData.fierceDog.toString());
    formData.append("size", petData.size);
    formData.append("image", petData.image);

    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/pet/profile`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${errorText}`
      );
    }

    const data = await response.json();
    return data?.data || data;
  } catch (error) {
    throw error;
  }
};
