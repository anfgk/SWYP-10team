import GoogleLoginButton from "@/components/loginPage/GoogleLoginButton";
import KakaoLoginButton from "@/components/loginPage/KakaoLoginButton";
import NaverLoginButton from "@/components/loginPage/NaverLoginButton";

const LoginPage = () => {
  return (
    <main className="flex flex-col h-[1090.7px] pt-[280px] pb-[330px] gap-[120px] items-center justify-center">
      <img
        className="w-[513.09px] h-[81.7px]"
        src="/assets/login_logo.png"
        alt="login_logo"
      />

      <div className="w-[514px] h-[279px] flex flex-col items-center gap-[24px]">
        <KakaoLoginButton />
        <NaverLoginButton />
        <GoogleLoginButton />
        <div className="flex w-full justify-start">
          <input
            id="auto-login"
            type="checkbox"
            defaultChecked={false}
            onChange={(e) =>
              sessionStorage.setItem(
                "autoLogin",
                e.target.checked ? "true" : "false"
              )
            }
            className="mr-2 w-5 h-5 rounded-full border-2 border-gray-300 appearance-none checked:bg-gray-400 checked:border-gray-400 transition-colors duration-200 focus:outline-none"
          />
          <label htmlFor="auto-login" className="text-lg">
            자동로그인
          </label>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
