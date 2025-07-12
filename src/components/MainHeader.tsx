import { useNavigate } from "react-router-dom";

const MainHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="w-full h-[80px] bg-[var(--header-bg)] ">
      <div className="flex justify-between px-[39px] py-[12px]">
        <div className="flex w-[90px] h-[48px] bg-[var(--headerItems-bg)] items-center justify-center">
          Logo
        </div>
        <div
          className="flex w-[118px] h-[48px] bg-[var(--headerItems-bg)] items-center justify-center cursor-pointer"
          onClick={() => navigate("/login")}
        >
          로그인/회원가입
        </div>
      </div>
    </header>
  );
};

export default MainHeader;
