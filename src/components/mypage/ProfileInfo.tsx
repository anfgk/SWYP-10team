import { useState, useRef, useEffect } from "react";
import PageButton from "@/components/ui/page-button";
import SocialIdSection from "@/components/mypage/SocialIdSection";
import NicknameSection from "@/components/mypage/NicknameSection";
import ImageCropModal from "@/components/mypage/ImageCropModal";

const ProfileInfo = () => {
  const [profileImage, setProfileImage] = useState<string>("");
  const [isCropModalOpen, setIsCropModalOpen] = useState(false);
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [currentImageForCrop, setCurrentImageForCrop] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 컴포넌트 마운트 시 프로필 정보 로드
  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    try {
      // 로컬스토리지에서 프로필 이미지 불러오기
      const savedProfileImage = localStorage.getItem("profileImage");
      if (savedProfileImage) {
        setProfileImage(savedProfileImage);
      }

      // 프로필 정보 로드 완료
    } catch (error) {
      console.error("프로필 정보 로드 실패:", error);
      // 에러가 발생해도 UI는 그대로 유지
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImageFile(file);
      setCurrentImageForCrop("");
      setIsCropModalOpen(true);
    }
  };

  const handleChangeImage = () => {
    // 기존 사진을 띄우지 않고 바로 파일 선택
    fileInputRef.current?.click();
  };

  const handleCrop = async (croppedImage: string) => {
    try {
      // 크롭된 이미지를 로컬 상태에 적용
      setProfileImage(croppedImage);

      // 로컬스토리지에 프로필 이미지 저장
      localStorage.setItem("profileImage", croppedImage);

      setSelectedImageFile(null);
      setCurrentImageForCrop("");
      setIsCropModalOpen(false);
    } catch (error) {
      console.error("이미지 업로드 실패:", error);
      // 에러가 발생해도 UI는 그대로 유지
    }
  };

  const handleDeleteImage = async () => {
    try {
      // 로컬 상태에서 이미지 제거
      setProfileImage("");

      // 로컬스토리지에서 프로필 이미지 제거
      localStorage.removeItem("profileImage");

      setCurrentImageForCrop("");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("이미지 삭제 실패:", error);
      // 에러가 발생해도 UI는 그대로 유지
    }
  };

  return (
    <div className="relative w-full mb-[56px]">
      <div className="text-[20px] font-semibold mb-[16px]">프로필 정보</div>
      <div className="flex items-center gap-[24px] mb-[32px]">
        <div className="w-[212px] h-[141px] bg-gray-300 flex items-center justify-center text-gray-500 text-sm overflow-hidden rounded-lg">
          {profileImage && (
            <img
              src={profileImage}
              alt="프로필 이미지"
              className="w-full h-full object-cover"
            />
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
              text={profileImage ? "변경하기" : "이미지 추가"}
              variant="default"
              onClick={handleChangeImage}
            />
            {profileImage && (
              <PageButton
                text="삭제하기"
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
