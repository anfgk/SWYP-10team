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
  const [profileData, setProfileData] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    try {
      const response = await fetch("/api/user/profile");
      const data = await response.json();
      setProfileData(data);

      if (data.profileImage) {
        setProfileImage(data.profileImage);
      }
    } catch (error) {
      console.error("프로필 정보 로드 실패:", error);
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
    fileInputRef.current?.click();
  };

  const handleCrop = async (croppedImage: string) => {
    try {
      const response = await fetch(croppedImage);
      const blob = await response.blob();
      const file = new File([blob], "profile-image.jpg", {
        type: "image/jpeg",
      });

      const formData = new FormData();
      formData.append("profileImage", file);

      const uploadResponse = await fetch("/api/user/profile/image", {
        method: "POST",
        body: formData,
      });

      if (uploadResponse.ok) {
        const uploadResult = await uploadResponse.json();

        const updateResponse = await fetch("/api/user/profile", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ profileImage: uploadResult.imageUrl }),
        });

        if (updateResponse.ok) {
          setProfileImage(uploadResult.imageUrl);
          setSelectedImageFile(null);
          setCurrentImageForCrop("");
          setIsCropModalOpen(false);

          await loadUserProfile();
        }
      }
    } catch (error) {
      console.error("이미지 업로드 실패:", error);
    }
  };

  const handleDeleteImage = async () => {
    try {
      const response = await fetch("/api/user/profile/image", {
        method: "DELETE",
      });

      if (response.ok) {
        setProfileImage("");

        await loadUserProfile();
      }
    } catch (error) {
      console.error("이미지 삭제 실패:", error);
    }
  };

  return (
    <div className="relative w-full mb-[56px]">
      <div className="text-[20px] font-semibold mb-[16px]">프로필 정보</div>
      <div className="flex items-center gap-[24px] mb-[32px]">
        <div className="w-[150px] h-[150px] bg-gray-300 flex items-center justify-center text-gray-500 text-sm overflow-hidden rounded-[16px]">
          {profileImage && (
            <img
              src={profileImage}
              alt="프로필 이미지"
              className="w-full h-full object-cover"
            />
          )}
        </div>
        <div className="flex flex-col gap-2 flex-1 justify-end h-35">
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
