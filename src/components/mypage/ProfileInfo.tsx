import { useState, useRef, useEffect } from "react";
import PageButton from "@/components/ui/page-button";
import SocialIdSection from "@/components/mypage/SocialIdSection";
import NicknameSection from "@/components/mypage/NicknameSection";
import ImageCropModal from "@/components/mypage/ImageCropModal";
import { useAuthStore } from "@/stores/authStore";
import { updateUserProfile, deleteUserProfileImage } from "@/lib/fetchUtils";

const ProfileInfo = () => {
  const { accessToken, user, setUser } = useAuthStore();
  const [profileImage, setProfileImage] = useState<string>(
    user?.profileImage || ""
  );

  // authStore의 이미지가 있으면 우선 사용
  useEffect(() => {
    if (user?.profileImage && !profileImage) {
      setProfileImage(user.profileImage);
    }
  }, [user?.profileImage, profileImage]);
  const [isCropModalOpen, setIsCropModalOpen] = useState(false);
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [currentImageForCrop, setCurrentImageForCrop] = useState<string>("");
  const [profileData, setProfileData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (accessToken) {
      loadUserProfile();
    }
  }, [accessToken]);

  // 컴포넌트 언마운트 시 생성된 URL 정리
  useEffect(() => {
    return () => {
      // profileImage가 blob URL인 경우 정리
      if (profileImage && profileImage.startsWith("blob:")) {
        URL.revokeObjectURL(profileImage);
      }
    };
  }, [profileImage]);

  const loadUserProfile = async () => {
    if (!accessToken) {
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}api/user/profile`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("프로필 API 에러 응답:", errorText);
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${errorText}`
        );
      }

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const responseText = await response.text();
        console.error("JSON이 아닌 응답:", responseText);
        throw new Error("API가 JSON을 반환하지 않습니다");
      }

      const data = await response.json();
      console.log("프로필 API 응답 데이터:", data);
      setProfileData(data);

      // 이미지 URL 추출 (다양한 필드명 지원)
      const imageUrl =
        data.profileImage ||
        data.image ||
        data.profileImageUrl ||
        data.imageUrl;
      console.log("추출된 이미지 URL:", imageUrl);

      if (imageUrl) {
        setProfileImage(imageUrl);
        // authStore의 사용자 정보도 업데이트
        if (user) {
          setUser({
            ...user,
            profileImage: imageUrl,
          });
        }
      }
    } catch (error) {
      console.error("프로필 정보 로드 실패:", error);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // 파일을 URL로 변환하여 미리보기 생성
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
      setSelectedImageFile(file);
      setCurrentImageForCrop("");
      setIsCropModalOpen(true);
    }
  };

  const handleChangeImage = () => {
    fileInputRef.current?.click();
  };

  const handleCrop = async (croppedImage: string) => {
    if (!accessToken || !user) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch(croppedImage);
      const blob = await response.blob();
      const file = new File([blob], "profile-image.jpg", {
        type: "image/jpeg",
      });

      // 크롭된 이미지를 로컬 URL로 변환하여 즉시 표시
      const croppedImageUrl = URL.createObjectURL(blob);
      setProfileImage(croppedImageUrl);

      // 새로운 API 스펙에 맞게 사용자 정보 수정
      const result = await updateUserProfile(accessToken, user.name, file);

      // authStore의 사용자 정보도 업데이트 (로컬 URL 사용)
      if (user) {
        setUser({
          ...user,
          profileImage: croppedImageUrl,
        });
      }

      setSelectedImageFile(null);
      setCurrentImageForCrop("");
      setIsCropModalOpen(false);

      alert("프로필 이미지가 성공적으로 업데이트되었습니다.");
    } catch (error) {
      console.error("이미지 업로드 실패:", error);
      alert("이미지 업로드에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteImage = async () => {
    if (!accessToken || !user) {
      alert("로그인이 필요합니다.");
      return;
    }

    if (!confirm("프로필 이미지를 삭제하시겠습니까?")) {
      return;
    }

    try {
      setIsLoading(true);

      // 새로운 삭제 API 사용
      await deleteUserProfileImage(accessToken);

      // 로컬 상태 즉시 업데이트
      setProfileImage("");
      if (user) {
        setUser({
          ...user,
          profileImage: "",
        });
      }

      alert("프로필 이미지가 삭제되었습니다.");
    } catch (error) {
      console.error("이미지 삭제 실패:", error);
      alert("이미지 삭제에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
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
