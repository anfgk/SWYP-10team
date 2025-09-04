import GoogleLoginButton from "@/components/loginPage/GoogleLoginButton";
import KakaoLoginButton from "@/components/loginPage/KakaoLoginButton";
import NaverLoginButton from "@/components/loginPage/NaverLoginButton";
import AutoLoginCheckBox from "@/components/loginPage/AutoLoginCheckBox";

const LoginPage = () => {
  return (
    <main className="flex flex-col h-[1000.7px] pt-[170px] pb-[330px] gap-[56px] items-center justify-center">
      <title>어디가냥?같이가개! | 로그인</title>
      <meta name="description" content="어디가냥?같이가개! 로그인 페이지" />

      <img
        className="w-[471px] "
        src="/assets/logo/footer_logo.png"
        alt="login_logo"
      />

      <div className="w-[514px] h-[253px] flex flex-col gap-[24px]">
        <div className="w-full h-[205px] flex flex-col gap-[16px]">
          <KakaoLoginButton />
          <NaverLoginButton />
          <GoogleLoginButton />
        </div>

        <div className="flex w-[93px] h-[24px] gap-[8px] items-center">
          <AutoLoginCheckBox />
          <label className="text-[14px]">자동로그인</label>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
