export default function GoogleLoginButton() {
  const handleLogin = () => {
    const autoLogin = sessionStorage.getItem("autoLogin") === "true";
    window.location.href = `${import.meta.env.VITE_API_BASE_URL}/oauth2/authorization/google?autoLogin=${autoLogin ? "true" : "false"}`;
  };

  return (
    <button
      className="w-[514px] h-[56px] rounded-[12px] bg-[var(--google)] border-[1px] border-[#454545] border-opacity-33 cursor-pointer"
      onClick={handleLogin}
    >
      구글 로그인
    </button>
  );
}
