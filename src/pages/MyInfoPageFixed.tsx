import DefaultButtonCancel from "@/components/common/DefaultButtonCancel";
import MyPageContainerFixed from "@/components/layout/MyPageContainerFixed";
import MyPageScaffold from "@/components/layouts/MyPageScaffold";
import WithDrawModal from "@/components/modals/WithDrawModal";
import MyPetSection from "@/components/realMypage/myInfo/MyPetSection";
import MyProfileSection from "@/components/realMypage/myInfo/MyProfileSection";
import { useState } from "react";

const MyInfoPageFixed = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <MyPageContainerFixed>
      <MyPageScaffold title="내 정보">
        <article className="w-full h-fit flex flex-col gap-[56px]">
          <MyProfileSection />
          <MyPetSection />
          <div className="w-full h-[36px] flex justify-center my-[56px]">
            <DefaultButtonCancel
              text="회원탈퇴"
              textSize={14}
              w={77}
              h={36}
              onClick={() => setIsOpen(true)}
            />
            {isOpen && <WithDrawModal onClose={() => setIsOpen(false)} />}
          </div>
        </article>
      </MyPageScaffold>
    </MyPageContainerFixed>
  );
};

export default MyInfoPageFixed;
