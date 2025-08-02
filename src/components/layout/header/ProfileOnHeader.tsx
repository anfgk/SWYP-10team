import { logoutProcess } from "@/lib/authUtils";
import { useAuthStore } from "@/stores/authStore";
import { useNavigate } from "react-router-dom";
//import Test from "@/components/common/Test";

const ProfileOnHeader = () => {
  const naviagate = useNavigate();
  const { user } = useAuthStore();

  return (
    <div className="w-fit h-[56px] flex gap-[24px] items-center">
      {/* <p className="cursor-pointer">AI 플래너</p>
      <p className="cursor-pointer">알림</p> */}
      <div
        className="w-fit flex gap-[8px] cursor-pointer items-center"
        onClick={() => naviagate("/myinfo")}
      >
        <img
          src="assets/samples/profile_sample.png"
          className="w-[32px] h-[32px] rounded-[90px] "
        />
        <p>{!user}님</p>
      </div>

      {/* <p className="cursor-pointer">알림</p> */}
      <p onClick={() => logoutProcess()} className="cursor-pointer">
        로그아웃
      </p>
    </div>
  );
};

export default ProfileOnHeader;
