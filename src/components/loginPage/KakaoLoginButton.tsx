export default function KakaoLoginButton() {
  const handleLogin = () => {
    const autoLogin = sessionStorage.getItem("autoLogin") === "true";
    window.location.href = `${import.meta.env.VITE_API_BASE_URL}/oauth2/authorization/kakao?autoLogin=${autoLogin ? "true" : "false"}`;
  };

  return (
    <button
      className="w-[514px] h-[56px] flex gap-[16px] justify-center items-center rounded-[12px] bg-[var(--kakao)] text-semibold  cursor-pointer hover:brightness-90"
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
