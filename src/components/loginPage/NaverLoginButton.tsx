export default function NaverLoginButton() {
  const autoLogin = sessionStorage.getItem("autoLogin") === "true";

  const handleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_BASE_URL}/oauth2/authorization/naver?autoLogin=${autoLogin ? "true" : "false"}`;
  };

  return (
    <button
      className="w-[514px] h-[61px] flex gap-[16px] justify-center items-center rounded-[16px] bg-[var(--naver)] text-white text-semibold"
      onClick={handleLogin}
    >
      <img
        src="/assets/logo/naver_logo.png"
        alt="naver logo"
        className="w-[24px] h-[24px]"
      />
      <p>네이버로 시작하기</p>
    </button>
  );
}
