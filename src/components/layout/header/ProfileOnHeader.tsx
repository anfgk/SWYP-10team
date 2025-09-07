import { Link } from "react-router-dom";
import LoginProfileOnHeader from "./LoginProfileOnheader";

const ProfileOnHeader = () => {
  return (
    <div className="w-fit h-[56px] flex gap-[24px] items-center">
      <Link
        to="/aiplanner"
        className="cursor-pointer hover:underline underline-offset-[6px]"
      >
        AI 플래너
      </Link>
      <LoginProfileOnHeader />
    </div>
  );
};

export default ProfileOnHeader;
