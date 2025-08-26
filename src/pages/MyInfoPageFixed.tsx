import DefaultButtonCancel from "@/components/common/DefaultButtonCancel";
import MyPageContainerFixed from "@/components/layout/MyPageContainerFixed";
<<<<<<< HEAD
import MyPageScaffold from "@/components/layouts/MyPageScaffold";
=======
import MyPageScaffold from "@/components/layout/MyPageScaffold";
>>>>>>> origin/develop
//import WithDrawModal from "@/components/modals/WithDrawModal";
import MyPetSection from "@/components/realMypage/myInfo/MyPetSection";
import MyProfileSection from "@/components/realMypage/myInfo/MyProfileSection";
//import { useState } from "react";

const MyInfoPageFixed = () => {
  //const [isOpen, setIsOpen] = useState(false);
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
              onClick={() => alert("고도화 항목입니다.")}
            />
            {/* {isOpen && <WithDrawModal onClose={() => setIsOpen(false)} />} */}
          </div>
        </article>
      </MyPageScaffold>
    </MyPageContainerFixed>
  );
};

export default MyInfoPageFixed;
