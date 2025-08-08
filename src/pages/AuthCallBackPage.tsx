import useIssueAccessToken from "@/hooks/useIssueAccessToken";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuthStore } from "@/stores/authStore";
import { fetchUserProfile } from "@/lib/fetchUtils";

const AuthCallBackPage = () => {
  const { setUser, accessToken } = useAuthStore();
  const navigate = useNavigate();

  useIssueAccessToken();

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        // accessToken이 설정될 때까지 대기
        if (!accessToken) {
          return;
        }

        console.log("사용자 프로필 로드 시작...");
        const userData = await fetchUserProfile(accessToken);

        // 사용자 정보를 store에 저장
        const user = {
          name:
            userData.displayName ||
            userData.name ||
            userData.nickname ||
            "사용자",
          email: userData.email || "",
          profileImage:
            userData.profileImage ||
            userData.image ||
            userData.profileImageUrl ||
            userData.imageUrl,
        };

        setUser(user);
        console.log("사용자 정보 저장 완료:", user);

        // 리다이렉트
        const redirectURL = sessionStorage.getItem("loginLocation") || "/";
        navigate(redirectURL);
      } catch (error) {
        console.error("사용자 프로필 로드 실패:", error);
        // 에러가 발생해도 리다이렉트
        const redirectURL = sessionStorage.getItem("loginLocation") || "/";
        navigate(redirectURL);
      }
    };

    // accessToken이 있을 때만 프로필 로드
    if (accessToken) {
      loadUserProfile();
    }
  }, [accessToken, setUser, navigate]);

  return <div>로그인 중...</div>;
};

export default AuthCallBackPage;
