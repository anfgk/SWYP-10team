import DefaultButtonCancel from "@/components/common/DefaultButtonCancel";
import DefaultButtonConfirm from "@/components/common/DefaultButtonConfirm";
import ProfileImageCropModal from "@/components/modals/ProfileImageCropModal";
import { deleteProfileImage } from "@/lib/myInfoUtils";
import { useAuthStore } from "@/stores/authStore";
import { useState } from "react";

const MyProfileImageSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { profileImg } = useAuthStore();
  return (
    <section className="w-full h-[150px] flex gap-[24px]">
      {/* 프로필 사진 */}
      <img
        className="w-[150px] h-[150px] rounded-[16px] overflow-hidden"
        src={
          profileImg ||
          "https://kr.object.ncloudstorage.com/catsgotogedogbucket/profile/default_user_image.png"
        }
      />
      {/* 수정/삭제 버튼 */}
      <div className="w-fit h-fit flex gap-[10px] mt-auto">
        <DefaultButtonConfirm
          w={77}
          h={36}
          text="변경하기"
          textSize={14}
          onClick={() => setIsOpen(true)}
        />
        <DefaultButtonCancel
          w={77}
          h={36}
          text="삭제하기"
          textSize={14}
          onClick={deleteProfileImage}
        />
      </div>
      {isOpen && <ProfileImageCropModal onClose={() => setIsOpen(false)} />}
    </section>
  );
};

export default MyProfileImageSection;
