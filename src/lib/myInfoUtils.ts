import { useAuthStore } from "@/stores/authStore";
import { fetchWithAuth } from "./fetchUtils";
import { refetchProfile } from "./authUtils";
import type { NavigateFunction } from "react-router-dom";

const deleteProfileImage = async () => {
  const { setProfileImg } = useAuthStore.getState();
  try {
    const res = await fetchWithAuth(`/api/user/profile/image`, {
      method: "DELETE",
    });

    if (!res.ok) {
      if (res.status === 400) {
        alert("사용자를 찾을 수 없습니다.");
      } else {
        alert("프로필 이미지 삭제이 실패했습니다.");
        throw new Error("프로필 이미지 삭제 요청 실패");
      }
      return;
    }
    setProfileImg(
      "https://kr.object.ncloudstorage.com/catsgotogedogbucket/profile/default_user_image.png"
    );
    await refetchProfile();
    alert("프로필 사진이 삭제되었습니다.");
  } catch (e) {
    console.log("프로필 이미지 삭제 실패: ", e);
  }
};

const changeProfileImage = async (newImage: File) => {
  const formData = new FormData();
  formData.append("image", newImage);
  //const { setProfileImg } = useAuthStore.getState();
  try {
    const res = await fetchWithAuth(`/api/user/profile`, {
      method: "PATCH",
      body: formData,
    });

    if (!res.ok) {
      if (res.status === 400) {
        alert("잘못된 요청 데이터입니다.");
      } else if (res.status === 404) {
        alert("사용자를 찾을 수 없습니다.");
      } else {
        alert("프로필 이미지 수정에 실패했습니다.");
        throw new Error("프로필 이미지 수정 요청 실패");
      }
      return;
    }
    alert("프로필 사진이 수정되었습니다.");
    await refetchProfile();
  } catch (e) {
    console.log("프로필 이미지 수정 실패: ", e);
  }
};

const fetchWithDraw = async (navigate: NavigateFunction) => {
  const { accessToken, logout } = useAuthStore.getState();
  try {
    const res = await fetch(`/api/user/withdraw`, {
      method: "DELETE",
      headers: {
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }), // 토큰 있으면 추가
      },
    });

    if (!res.ok) {
      if (res.status === 400) {
        alert("잘못된 요청 데이터입니다.");
      } else if (res.status === 404) {
        alert("사용자를 찾을 수 없습니다.");
      } else {
        alert("회원탈퇴에 실패했습니다.");
        throw new Error("회원 탈퇴 요청 실패");
      }
      return;
    }
    logout();
    alert("회원탈퇴가 완료되었습니다.");
    navigate("/");
  } catch (e) {
    console.log("회원탈퇴 실패: ", e);
  }
};

const deletePet = async (id: number) => {
  try {
    const res = await fetchWithAuth(`/api/pet/profile/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      if (res.status === 403) {
        alert("삭제권한이 없습니다.");
      } else if (res.status === 404) {
        alert("반려동물을 찾을 수 없습니다.");
      } else {
        alert("반려동물 삭제에 실패했습니다.");
        throw new Error("반려동물 삭제 요청 실패");
      }
      return;
    }

    await refetchProfile();
    alert("삭제되었습니다.");
  } catch (e) {
    console.log("반려동물 삭제 실패: ", e);
  }
};

export { deleteProfileImage, changeProfileImage, fetchWithDraw, deletePet };
