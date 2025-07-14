//const KAKAO_CLIENT_ID = import.meta.env.DEV_VITE_KAKAO_CLIENT_ID;
//const REDIRECT_URI = "http://localhost:5173/auth/callback";

export default function KakaoLoginButton() {
  const rememberMe = true; // 이건 체크박스 값으로 대체
  sessionStorage.setItem("autoLogin", rememberMe.toString());

  const handleLogin = () => {
    // const params = new URLSearchParams({
    //   client_id: KAKAO_CLIENT_ID,
    //   redirect_uri: REDIRECT_URI,
    //   response_type: "code",
    //   scope: "profile_nickname account_email",
    // });

    // window.location.href = `https://kauth.kakao.com/oauth/authorize?${params.toString()}`;
    alert("login test");
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
