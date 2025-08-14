import { useAuthStore } from "@/stores/authStore";
import MyNicknameInput from "./MyNicknameInput";
import MyInfoContentDiv from "./MyInfoContentDiv";

import MyProfileImageSection from "./MyProfileImageSection";

const MyProfileSection = () => {
  const { user } = useAuthStore();

  return (
    <section className="w-full h-[318px] flex flex-col gap-[16px]">
      {/* 소제목 */}
      <h2 className="w-full h-[32px] font-semibold text-[20px]">프로필 정보</h2>
      {/* 프로필 정보 내용 컨테이너 */}
      <div className="w-full h-[270px] flex flex-col gap-[32px]">
        {/* 프로필 사진 + 수정/삭제 버튼 섹션 */}
        <MyProfileImageSection />
        {/* 이름 + 소셜 ID 섹션 */}
        <section className="w-full h-[88px] flex flex-col gap-[8px]">
          {/* 이름 */}
          <MyNicknameInput />
          {/* 소셜ID */}
          <div className="w-full h-[40px] flex gap-[24px]">
            <p className="w-[45px] h-full flex items-center text-[16px]">
              소셜ID
            </p>
            <MyInfoContentDiv content={user?.email || ""} />
          </div>
        </section>
      </div>
    </section>
  );
};

export default MyProfileSection;
