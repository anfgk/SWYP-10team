export default function KakaoLoginButton() {
  const autoLogin = sessionStorage.getItem("autoLogin") === "true";

  const handleLogin = () => {
    window.location.href = `https://dev.catsgotogedog.site/oauth2/authorization/kakao?autoLogin=${autoLogin ? "true" : "false"}`;
  };

  return (
    <button
      className="w-[514px] h-[61px] rounded-[16px] bg-[var(--kakao)]"
      onClick={handleLogin}
    >
      카카오 로그인
    </button>
  );
}
