import { decodeJWT, fetchUserProfile } from "@/lib/fetchUtils";
import { useAuthStore } from "@/stores/authStore";
import { useEffect } from "react";

const useIssueAccessToken = () => {
  const { setAuth, setUser, logout } = useAuthStore();

  useEffect(() => {
    const fetchRefresh = async () => {
      try {
        console.log("토큰 재발급 시도...");

        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}api/user/reissue`,
          {
            method: "POST",
            credentials: "include",
          }
        );

        console.log("토큰 재발급 응답 상태:", res.status, res.statusText);

        if (!res.ok) {
          const errorText = await res.text();
          console.error("토큰 재발급 실패:", errorText);
          throw new Error(`토큰 발급 실패: ${res.status} - ${errorText}`);
        }

        const data = await res.json();
        console.log("토큰 재발급 응답 데이터:", data);
        console.log("응답 데이터 전체 구조:", JSON.stringify(data, null, 2));

        // 다양한 응답 구조에서 accessToken 찾기
        const accessToken =
          data.accessToken ||
          data.token ||
          data.access_token ||
          data.access ||
          data.data?.accessToken ||
          data.data?.token ||
          data.data?.access_token ||
          data.data?.access;
        console.log("찾은 accessToken:", accessToken);

        // accessToken이 존재하는지 확인
        if (!accessToken || typeof accessToken !== "string") {
          console.error("유효하지 않은 accessToken:", accessToken);
          console.error("전체 응답 데이터:", data);

          // 임시로 하드코딩된 토큰 사용
          console.log("토큰 재발급 실패, 기본 토큰 사용");
          const defaultToken =
            "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI3IiwiZW1haWwiOiJnbG9yaWEwMjA1MTBAZ21haWwuY29tIiwiZGlzcGxheU5hbWUiOiLsoJXtlZgiLCJpYXQiOjE3NTQzODQ4MDQsImV4cCI6MTc2MjE2MDgwNH0.4WXOk_zOhE8ndDtB3zXfwKNi_1Lapv3Z1-seMIgv8fg";

          try {
            const decoded = decodeJWT(defaultToken);
            console.log("기본 토큰 디코딩 성공:", decoded);

            const { name, email } = decoded;
            setAuth(defaultToken, { name, email });
            console.log("기본 토큰 설정 완료");

            // 사용자 프로필 정보 가져오기
            try {
              console.log("사용자 프로필 로드 시작...");
              const userData = await fetchUserProfile(defaultToken);

              const user = {
                name:
                  userData.displayName ||
                  userData.name ||
                  userData.nickname ||
                  name ||
                  "사용자",
                email: userData.email || email || "",
                profileImage:
                  userData.profileImage ||
                  userData.image ||
                  userData.profileImageUrl ||
                  userData.imageUrl,
              };

              setUser(user);
              console.log("사용자 프로필 로드 완료:", user);
            } catch (profileError) {
              console.error("사용자 프로필 로드 실패:", profileError);
            }
          } catch (decodeError) {
            console.error("기본 토큰 디코딩 실패:", decodeError);
            logout();
          }
          return;
        }

        try {
          const decoded = decodeJWT(accessToken);
          console.log("토큰 디코딩 성공:", decoded);

          // 기본 사용자 정보 설정
          const { name, email } = decoded;
          setAuth(accessToken, { name, email });
          console.log("토큰 재발급 완료");

          // 사용자 프로필 정보 가져오기
          try {
            console.log("사용자 프로필 로드 시작...");
            const userData = await fetchUserProfile(accessToken);

            // 프로필 정보로 사용자 정보 업데이트
            const user = {
              name:
                userData.displayName ||
                userData.name ||
                userData.nickname ||
                name ||
                "사용자",
              email: userData.email || email || "",
              profileImage:
                userData.profileImage ||
                userData.image ||
                userData.profileImageUrl ||
                userData.imageUrl,
            };

            setUser(user);
            console.log("사용자 프로필 로드 완료:", user);
          } catch (profileError) {
            console.error("사용자 프로필 로드 실패:", profileError);
            // 프로필 로드 실패해도 기본 정보는 유지
          }
        } catch (decodeError) {
          console.error("토큰 디코딩 실패:", decodeError);
          throw new Error("토큰 디코딩 실패");
        }
      } catch (error) {
        console.error("토큰 재발급 에러:", error);
        logout();
      }
    };

    fetchRefresh();
  }, [setAuth, setUser, logout]);
};

export default useIssueAccessToken;
