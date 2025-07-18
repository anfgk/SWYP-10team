//const NAVER_CLIENT_ID = import.meta.env.DEV_VITE_GOOGLE_CLIENT_ID;
//const REDIRECT_URI = "http://localhost:5173/auth/callback";

export default function NaverLoginButton() {
  const rememberMe = true; // 이건 체크박스 값으로 대체
  sessionStorage.setItem("autoLogin", rememberMe.toString());

  const handleLogin = () => {
    // const params = new URLSearchParams({
    //   client_id: NAVER_CLIENT_ID,
    //   redirect_uri: REDIRECT_URI,
    //   response_type: "code",
    //   scope: "name email",
    //   state: "RANDOM_STRING",
    // });

    // window.location.href = `https://nid.naver.com/oauth2.0/authorize?${params.toString()}`;
    alert("login test");
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
