import { Link } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";

import ProfileOnHeader from "./header/ProfileOnHeader";
import LoginOnHeader from "./header/LoginOnHeader";

const MainHeader = () => {
  const { user } = useAuthStore();
  return (
    <header className="w-full h-[72px] bg-[var(--main-color)] flex items-center justify-between px-[65px] font-dunggeunmiso font-bold text-[var(--header-text)] text-[24px]">
      <Link to={"/"} className="cursor-pointer">
        <img src="/assets/logo/main_logo.png" alt="main_logo" />
      </Link>
      {user ? <ProfileOnHeader /> : <LoginOnHeader />}
    </header>
  );
};

export default MainHeader;
