// 마이페이지 API 유틸리티

// 사용자 프로필 정보 가져오기
export const getUserProfile = async () => {
  try {
    const response = await fetch("/api/user/profile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("프로필 정보를 가져오는데 실패했습니다.");
    }
  } catch (error) {
    console.error("getUserProfile error:", error);
    throw error;
  }
};

// 사용자 프로필 정보 업데이트
export const updateUserProfile = async (profileData: {
  nickname?: string;
  profileImage?: string;
}) => {
  try {
    const response = await fetch("/api/user/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(profileData),
    });

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("프로필 정보 업데이트에 실패했습니다.");
    }
  } catch (error) {
    console.error("updateUserProfile error:", error);
    throw error;
  }
};

// 프로필 이미지 업로드
export const uploadProfileImage = async (imageFile: File) => {
  try {
    const formData = new FormData();
    formData.append("image", imageFile);

    const response = await fetch("/api/user/profile/image", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: formData,
    });

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("이미지 업로드에 실패했습니다.");
    }
  } catch (error) {
    console.error("uploadProfileImage error:", error);
    throw error;
  }
};

// 애완동물 정보 가져오기
export const getPetInfo = async () => {
  try {
    const response = await fetch("/api/user/pet", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("애완동물 정보를 가져오는데 실패했습니다.");
    }
  } catch (error) {
    console.error("getPetInfo error:", error);
    throw error;
  }
};

// 애완동물 정보 업데이트
export const updatePetInfo = async (petData: {
  name?: string;
  age?: number;
  gender?: string;
  breed?: string;
  notes?: string;
  preferences?: string;
}) => {
  try {
    const response = await fetch("/api/user/pet", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(petData),
    });

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("애완동물 정보 업데이트에 실패했습니다.");
    }
  } catch (error) {
    console.error("updatePetInfo error:", error);
    throw error;
  }
};

// 찜한 장소 목록 가져오기
export const getWishPlaces = async (page: number = 1, limit: number = 8) => {
  try {
    const response = await fetch(`/api/user/wish?page=${page}&limit=${limit}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("찜한 장소 목록을 가져오는데 실패했습니다.");
    }
  } catch (error) {
    console.error("getWishPlaces error:", error);
    throw error;
  }
};

// 찜한 장소에서 제거
export const removeWishPlace = async (placeId: string) => {
  try {
    const response = await fetch(`/api/user/wish/${placeId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("찜한 장소 제거에 실패했습니다.");
    }
  } catch (error) {
    console.error("removeWishPlace error:", error);
    throw error;
  }
};

// 최근 본 장소 목록 가져오기
export const getRecentPlaces = async (page: number = 1, limit: number = 8) => {
  try {
    const response = await fetch(
      `/api/user/recent?page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      },
    );

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("최근 본 장소 목록을 가져오는데 실패했습니다.");
    }
  } catch (error) {
    console.error("getRecentPlaces error:", error);
    throw error;
  }
};

// 내 리뷰 목록 가져오기
export const getMyReviews = async (page: number = 1, limit: number = 10) => {
  try {
    const response = await fetch(
      `/api/user/reviews?page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      },
    );

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("리뷰 목록을 가져오는데 실패했습니다.");
    }
  } catch (error) {
    console.error("getMyReviews error:", error);
    throw error;
  }
};

// 리뷰 작성
export const createReview = async (reviewData: {
  placeId: string;
  rating: number;
  content: string;
  images?: File[];
}) => {
  try {
    const formData = new FormData();
    formData.append("placeId", reviewData.placeId);
    formData.append("rating", reviewData.rating.toString());
    formData.append("content", reviewData.content);

    if (reviewData.images) {
      reviewData.images.forEach((image) => {
        formData.append("images", image);
      });
    }

    const response = await fetch("/api/reviews", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: formData,
    });

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("리뷰 작성에 실패했습니다.");
    }
  } catch (error) {
    console.error("createReview error:", error);
    throw error;
  }
};

// 리뷰 수정
export const updateReview = async (
  reviewId: string,
  reviewData: {
    rating?: number;
    content?: string;
    images?: File[];
  },
) => {
  try {
    const formData = new FormData();
    if (reviewData.rating !== undefined) {
      formData.append("rating", reviewData.rating.toString());
    }
    if (reviewData.content !== undefined) {
      formData.append("content", reviewData.content);
    }
    if (reviewData.images) {
      reviewData.images.forEach((image) => {
        formData.append("images", image);
      });
    }

    const response = await fetch(`/api/reviews/${reviewId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: formData,
    });

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("리뷰 수정에 실패했습니다.");
    }
  } catch (error) {
    console.error("updateReview error:", error);
    throw error;
  }
};

// 리뷰 삭제
export const deleteReview = async (reviewId: string) => {
  try {
    const response = await fetch(`/api/reviews/${reviewId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("리뷰 삭제에 실패했습니다.");
    }
  } catch (error) {
    console.error("deleteReview error:", error);
    throw error;
  }
};
