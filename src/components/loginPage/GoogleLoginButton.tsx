export default function GoogleLoginButton() {
  const autoLogin = sessionStorage.getItem("autoLogin") === "true";

  const handleLogin = () => {
    window.location.href = `https://dev.catsgotogedog.site/oauth2/authorization/google?autoLogin=${autoLogin ? "true" : "false"}`;
  };

  return (
    <button
      className="w-[514px] h-[61px] rounded-[16px] bg-[var(--google)] border-[1px] border-[#454545] border-opacity-33 cursor-pointer"
      onClick={handleLogin}
    >
      구글 로그인
    </button>
  );
}
