import GoogleLoginButton from "@/components/loginPage/GoogleLoginButton";
import KakaoLoginButton from "@/components/loginPage/KakaoLoginButton";
import NaverLoginButton from "@/components/loginPage/NaverLoginButton";

const LoginPage = () => {
  return (
    <main className="flex flex-col h-[1000.7px] pt-[280px] pb-[330px] gap-[56px] items-center justify-center">
      <img
        className="w-[513.09px] h-[81.7px]"
        src="/assets/logo/login_logo.png"
        alt="login_logo"
      />

      <div className="w-[514px] h-[253px] flex flex-col gap-[24px]">
        <div className="w-full h-[205px] flex flex-col gap-[16px]">
          <KakaoLoginButton />
          <NaverLoginButton />
          <GoogleLoginButton />
        </div>

        <div className="flex w-[93px] h-[24px] gap-[8px] items-center">
          <input
            id="auto-login"
            type="checkbox"
            defaultChecked={sessionStorage.getItem("autoLogin") === "true"}
            onChange={(e) =>
              sessionStorage.setItem(
                "autoLogin",
                e.target.checked ? "true" : "false"
              )
            }
            className="w-[20px] h-[20px] rounded-[50px] appearance-none border-[1.5px] border-[#BFBFBF38] checked:bg-[#BFBFBF38]"
          />
          <label htmlFor="auto-login" className="text-[14px]">
            자동로그인
          </label>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
