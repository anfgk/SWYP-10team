export default function KakaoLoginButton() {
  const autoLogin = sessionStorage.getItem("autoLogin") === "true";

  const handleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_BASE_URL}/oauth2/authorization/kakao?autoLogin=${autoLogin ? "true" : "false"}`;
  };

  return (
    <button
      className="w-[514px] h-[61px] flex gap-[16px] justify-center items-center rounded-[16px] bg-[var(--kakao)] text-semibold"
      onClick={handleLogin}
    >
      <img
        src="/assets/logo/kakao_logo.png"
        alt="kakao logo"
        className="w-[24px] h-[24px]"
      />
      <p>카카오로 시작하기</p>
    </button>
  );
}
