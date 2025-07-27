import { logoutProcess } from "@/lib/authUtils";
import { useAuthStore } from "@/stores/authStore";
import { useNavigate } from "react-router-dom";

const ProfileOnHeader = () => {
  const { user } = useAuthStore();
  const naviagate = useNavigate();

  return (
    <div className="w-fit h-[56px] flex gap-[24px] items-center">
      <div
        className="w-fit flex gap-[8px] cursor-pointer items-center"
        onClick={() => naviagate("/myinfo")}
      >
        <img
          src="assets/samples/profile_sample.png"
          className="w-[24px] h-[24px] rounded-[90px] "
        />

        <p>{user?.name}님</p>
      </div>
      {/* <p className="cursor-pointer">알림</p> */}
      <p onClick={() => logoutProcess()} className="cursor-pointer">
        로그아웃
      </p>
    </div>
  );
};

export default ProfileOnHeader;
