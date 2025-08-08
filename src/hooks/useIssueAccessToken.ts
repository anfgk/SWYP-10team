import { decodeJWT } from "@/lib/fetchUtils";
import { useAuthStore } from "@/stores/authStore";
import { useEffect } from "react";

const useIssueAccessToken = () => {
  const { setAuth, logout } = useAuthStore();

  useEffect(() => {
    const fetchRefresh = async () => {
      try {
        console.log("토큰 재발급 시도...");

        // TODO: 실제 토큰 재발급이 필요할 때만 활성화
        // 현재는 토큰 재발급을 건너뛰고 기본 토큰 사용
        console.log("토큰 재발급을 건너뛰고 기본 토큰 사용");
        return;

        /*
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

        // 다양한 응답 구조에서 accessToken 찾기
        const accessToken =
          data.accessToken || data.token || data.access_token || data.access;
        console.log("찾은 accessToken:", accessToken);

        // accessToken이 존재하는지 확인
        if (!accessToken || typeof accessToken !== "string") {
          console.error("유효하지 않은 accessToken:", accessToken);
          console.error("전체 응답 데이터:", data);
          throw new Error("유효하지 않은 accessToken");
        }

        try {
          const decoded = decodeJWT(accessToken);
          console.log("토큰 디코딩 성공:", decoded);

          const { name, email } = decoded;
          setAuth(accessToken, { name, email });
          console.log("토큰 재발급 완료");
        } catch (decodeError) {
          console.error("토큰 디코딩 실패:", decodeError);
          throw new Error("토큰 디코딩 실패");
        }
        */
      } catch (error) {
        console.error("토큰 재발급 에러:", error);
        logout();
      }
    };

    fetchRefresh();
  }, [setAuth, logout]);
};

export default useIssueAccessToken;
