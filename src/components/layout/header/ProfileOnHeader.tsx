import LoginProfileOnHeader from "./LoginProfileOnheader";

const ProfileOnHeader = () => {
  return (
    <div className="w-fit h-[56px] flex gap-[24px] items-center">
      <p className="cursor-pointer" onClick={() => alert("고도화 항목입니다.")}>
        AI 플래너
      </p>
      <p className="cursor-pointer" onClick={() => alert("고도화 항목입니다.")}>
        알림
      </p>
      <LoginProfileOnHeader />
    </div>
  );
};

export default ProfileOnHeader;
