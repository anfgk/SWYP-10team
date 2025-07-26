import { useTestStore } from "@/stores/testStore";
import { testLoginAPI, testGetUserInfoAPI } from "@/lib/testApiUtils";
import PageButton from "@/components/ui/page-button";

const TestAuthComponent = () => {
  const { accessToken, refreshToken, user, setAuth, logout } = useTestStore();

  const handleTestLogin = async () => {
    try {
      // 테스트용 로그인 (실제로는 OAuth 코드가 필요)
      const mockData = {
        accessToken: "test_access_token_123",
        refreshToken: "test_refresh_token_456",
        user: {
          name: "테스트 사용자",
          email: "test@example.com",
        },
      };

      setAuth(mockData.accessToken, mockData.refreshToken, mockData.user);
      console.log("테스트 로그인 성공:", mockData);
    } catch (error) {
      console.error("테스트 로그인 실패:", error);
    }
  };

  const handleTestAPI = async () => {
    try {
      const userInfo = await testGetUserInfoAPI();
      console.log("사용자 정보:", userInfo);
    } catch (error) {
      console.error("API 호출 실패:", error);
    }
  };

  const handleTestLogout = () => {
    logout();
    console.log("테스트 로그아웃 완료");
  };

  const handleCheckTokens = () => {
    const storedAccessToken = localStorage.getItem("testAccessToken");
    const storedRefreshToken = localStorage.getItem("testRefreshToken");

    console.log("localStorage 토큰:");
    console.log("accessToken:", storedAccessToken);
    console.log("refreshToken:", storedRefreshToken);

    console.log("Store 상태:");
    console.log("accessToken:", accessToken);
    console.log("refreshToken:", refreshToken);
    console.log("user:", user);
  };

  return (
    <div className="p-4 border rounded-lg bg-gray-50">
      <h3 className="text-lg font-semibold mb-4">Test Auth Store</h3>

      <div className="space-y-2 mb-4">
        <div>
          <strong>Access Token:</strong>{" "}
          {accessToken ? `${accessToken.substring(0, 20)}...` : "없음"}
        </div>
        <div>
          <strong>Refresh Token:</strong>{" "}
          {refreshToken ? `${refreshToken.substring(0, 20)}...` : "없음"}
        </div>
        <div>
          <strong>User:</strong>{" "}
          {user ? `${user.name} (${user.email})` : "없음"}
        </div>
      </div>

      <div className="space-x-2">
        <PageButton
          text="테스트 로그인"
          variant="default"
          onClick={handleTestLogin}
        />
        <PageButton
          text="API 테스트"
          variant="default"
          onClick={handleTestAPI}
        />
        <PageButton
          text="토큰 확인"
          variant="default"
          onClick={handleCheckTokens}
        />
        <PageButton
          text="로그아웃"
          variant="default"
          onClick={handleTestLogout}
        />
      </div>
    </div>
  );
};

export default TestAuthComponent;
