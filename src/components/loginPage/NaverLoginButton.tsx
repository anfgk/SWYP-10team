export default function NaverLoginButton() {
  const autoLogin = sessionStorage.getItem("autoLogin") === "true";

  const handleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_BASE_URL}/oauth2/authorization/naver?autoLogin=${autoLogin ? "true" : "false"}`;
  };

  return (
    <button
      className="w-[514px] h-[61px] rounded-[16px] bg-[var(--naver)] text-white"
      onClick={handleLogin}
    >
      네이버 로그인
    </button>
  );
}
