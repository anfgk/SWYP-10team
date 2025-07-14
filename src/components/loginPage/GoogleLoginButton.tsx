//const GOOGLE_CLIENT_ID = import.meta.env.DEV_VITE_GOOGLE_CLIENT_ID;
//const REDIRECT_URI = "http://localhost:5173/auth/callback";

export default function GoogleLoginButton() {
  const rememberMe = true; // 이건 체크박스 값으로 대체
  sessionStorage.setItem("autoLogin", rememberMe.toString());

  const handleLogin = () => {
    // const params = new URLSearchParams({
    //   client_id: GOOGLE_CLIENT_ID,
    //   redirect_uri: REDIRECT_URI,
    //   response_type: "code",
    //   scope: "profile email",
    //   access_type: "offline",
    //   prompt: "consent",
    // });

    // window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
    alert("login test");
  };

  return (
    <button
      className="w-[514px] h-[61px] rounded-[16px] bg-[var(--google)] border-[1px] border-[#454545]"
      onClick={handleLogin}
    >
      구글 로그인
    </button>
  );
}
