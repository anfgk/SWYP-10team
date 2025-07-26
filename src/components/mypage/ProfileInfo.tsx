import { useState, useRef, useEffect } from "react";
import PageButton from "@/components/ui/page-button";
import SocialIdSection from "@/components/mypage/SocialIdSection";
import NicknameSection from "@/components/mypage/NicknameSection";
import ImageCropModal from "@/components/mypage/ImageCropModal";
import {
  getUserProfile,
  updateUserProfile,
  uploadProfileImage,
} from "@/lib/mypageApi";

const ProfileInfo = () => {
  const [profileImage, setProfileImage] = useState<string>("");
  const [isCropModalOpen, setIsCropModalOpen] = useState(false);
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [currentImageForCrop, setCurrentImageForCrop] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 컴포넌트 마운트 시 프로필 정보 로드
  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    try {
      setIsLoading(true);
      const profileData = await getUserProfile();
      if (profileData.profileImage) {
        setProfileImage(profileData.profileImage);
      }
    } catch (error) {
      console.error("프로필 정보 로드 실패:", error);
      // 에러가 발생해도 UI는 그대로 유지
    } finally {
      setIsLoading(false);
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
      setIsLoading(true);

      // 크롭된 이미지를 Blob으로 변환
      const response = await fetch(croppedImage);
      const blob = await response.blob();
      const file = new File([blob], "profile-image.jpg", {
        type: "image/jpeg",
      });

      // 이미지 업로드
      const uploadResult = await uploadProfileImage(file);

      // 프로필 정보 업데이트
      await updateUserProfile({ profileImage: uploadResult.imageUrl });

      // 로컬 상태 업데이트
      setProfileImage(uploadResult.imageUrl);
      setSelectedImageFile(null);
      setCurrentImageForCrop("");
    } catch (error) {
      console.error("이미지 업로드 실패:", error);
      // 에러가 발생해도 UI는 그대로 유지
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteImage = async () => {
    try {
      setIsLoading(true);

      // 프로필 정보에서 이미지 제거
      await updateUserProfile({ profileImage: "" });

      // 로컬 상태 업데이트
      setProfileImage("");
      setCurrentImageForCrop("");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("이미지 삭제 실패:", error);
      // 에러가 발생해도 UI는 그대로 유지
    } finally {
      setIsLoading(false);
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
              text={profileImage ? "이미지 변경" : "이미지 추가"}
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
