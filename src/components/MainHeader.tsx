import { Link } from "react-router-dom";

const MainHeader = () => {
  return (
    <header className="w-full h-[72px] bg-[var(--main-color)] ">
      <div className="flex items-center justify-between px-[39px] py-[12px]">
        <Link to={"/"} className="cursor-pointer">
          <img src="/assets/main_logo.png" alt="main_logo" />
        </Link>
        <Link
          to={"/login"}
          className="flex w-[66px] h-[25px] font-bold text-[var(--header-text)] text-[24px]"
        >
          로그인
        </Link>
      </div>
    </header>
  );
};

export default MainHeader;
