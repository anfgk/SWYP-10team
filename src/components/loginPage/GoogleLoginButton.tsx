export default function GoogleLoginButton() {
  const handleLogin = () => {
    const autoLogin = sessionStorage.getItem("autoLogin") === "true";
    window.location.href = `${import.meta.env.VITE_API_BASE_URL}/oauth2/authorization/google?autoLogin=${autoLogin ? "true" : "false"}`;
  };

  return (
    <button
      className="w-[514px] h-[56px] rounded-[12px] flex gap-[16px] justify-center items-center bg-[var(--google)] border-[1px] border-[#454545] border-opacity-33 cursor-pointer text-semibold hover:brightness-90"
      onClick={handleLogin}
    >
      <img
        src="/assets/logo/google_logo.png"
        alt="goolge logo"
        className="w-[24px] h-[24px]"
      />
      <p>Google로 시작하기</p>
    </button>
  );
}
