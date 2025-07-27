export default function KakaoLoginButton() {
  const handleLogin = () => {
    const autoLogin = sessionStorage.getItem("autoLogin") === "true";
    window.location.href = `${import.meta.env.VITE_API_BASE_URL}/oauth2/authorization/kakao?autoLogin=${autoLogin ? "true" : "false"}`;
  };

  return (
    <button
      className="w-[514px] h-[56px] rounded-[12px] bg-[var(--kakao)]"
      onClick={handleLogin}
    >
      카카오 로그인
    </button>
  );
}
