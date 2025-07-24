import { useState, useRef } from "react";
import PageButton from "@/components/ui/page-button";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/authStore";
import SocialIdSection from "@/components/mypage/SocialIdSection";
import NicknameSection from "@/components/mypage/NicknameSection";
import ImageCropModal from "@/components/mypage/ImageCropModal";

const ProfileInfo = () => {
  const { user } = useAuthStore();
  const [profileImage, setProfileImage] = useState<string>("");
  const [isCropModalOpen, setIsCropModalOpen] = useState(false);
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [currentImageForCrop, setCurrentImageForCrop] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImageFile(file);
      setCurrentImageForCrop("");
      setIsCropModalOpen(true);
    }
  };

  const handleChangeImage = () => {
    if (profileImage) {
      // 현재 프로필 이미지가 있으면 크롭 모달에 표시
      setCurrentImageForCrop(profileImage);
      setSelectedImageFile(null);
      setIsCropModalOpen(true);
    } else {
      // 프로필 이미지가 없으면 파일 선택
      fileInputRef.current?.click();
    }
  };

  const handleCrop = (croppedImage: string) => {
    setProfileImage(croppedImage);
    setSelectedImageFile(null);
    setCurrentImageForCrop("");
  };

  const handleDeleteImage = () => {
    setProfileImage("");
    setCurrentImageForCrop("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="relative w-full">
      <div className="text-xl font-semibold mb-2">프로필 정보</div>
      <div className="flex items-center gap-4 mb-2">
        <div className="w-32 h-32 bg-gray-300 flex items-center justify-center text-gray-500 text-sm overflow-hidden rounded-lg">
          {profileImage ? (
            <img
              src={profileImage}
              alt="프로필 이미지"
              className="w-full h-full object-cover"
            />
          ) : (
            "프로필 이미지"
          )}
        </div>
        <div className="flex flex-col gap-2 flex-1 justify-end h-32">
          <div className="flex gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <PageButton
              text="변경"
              variant="default"
              onClick={handleChangeImage}
            />
            {profileImage && (
              <PageButton
                text="삭제"
                variant="default"
                onClick={handleDeleteImage}
              />
            )}
          </div>
        </div>
      </div>
      <NicknameSection />
      <SocialIdSection />

      {/* 모달을 ProfileInfo 컴포넌트 내부에 배치 */}
      {isCropModalOpen && (
        <div className="absolute inset-0 z-10">
          <ImageCropModal
            isOpen={isCropModalOpen}
            onClose={() => {
              setIsCropModalOpen(false);
              setCurrentImageForCrop("");
            }}
            onCrop={handleCrop}
            imageFile={selectedImageFile}
            currentImage={currentImageForCrop}
          />
        </div>
      )}
    </div>
  );
};

export default ProfileInfo;
