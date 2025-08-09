import { Link } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";

import ProfileOnHeader from "./header/ProfileOnHeader";
import LoginOnHeader from "./header/LoginOnHeader";

const MainHeader = () => {
  const { isLoggedIn } = useAuthStore();
  return (
    <header className="w-full h-[72px] bg-[var(--main-color)] flex justify-center font-dunggeunmiso font-bold text-[var(--header-text)] text-[24px]">
      <div className="w-[1200px] h-full flex justify-between items-center">
        <Link to={"/"} className="cursor-pointer">
          <img
            src="/assets/logo/main_logo.png"
            alt="main_logo"
            className="w-[276px]"
          />
        </Link>
        {isLoggedIn ? <ProfileOnHeader /> : <LoginOnHeader />}
      </div>
    </header>
  );
};

export default MainHeader;
