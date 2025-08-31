import { useState, useEffect, useCallback } from "react";
import PetInfoSection from "./PetInfoCard";
import ProfileInfo from "./ProfileInfo";
import PetInfoModal from "./PetInfoModal";
import { IoAdd } from "react-icons/io5";
import { useAuthStore } from "@/stores/authStore";
import type { PetInfo } from "@/types/types";

const MyInfoPage = () => {
  const { accessToken } = useAuthStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasPetInfo, setHasPetInfo] = useState(false);
  const [petInfos, setPetInfos] = useState<PetInfo[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPetInfo = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/pet/profile`,
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
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // API 응답 구조 확인
      const petData = data?.data || data?.pets || data;

      if (petData && Array.isArray(petData) && petData.length > 0) {
        setHasPetInfo(true);
        setPetInfos(petData);
      } else if (petData && !Array.isArray(petData)) {
        // 단일 객체인 경우 배열로 변환
        setHasPetInfo(true);
        setPetInfos([petData]);
      } else {
        setHasPetInfo(false);
        setPetInfos(null);
      }
    } catch (error) {
      console.error("반려동물 정보 로드 실패:", error);
    } finally {
      setIsLoading(false);
    }
  }, [accessToken]);

  useEffect(() => {
    fetchPetInfo();
  }, [fetchPetInfo]);

  const handleAddClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handlePetInfoAdded = async () => {
    // PetInfoModal에서 이미 API 호출을 완료했으므로
    // 여기서는 UI 업데이트만 수행
    try {
      await fetchPetInfo();
      setIsModalOpen(false);
    } catch (error) {
      console.error("반려동물 정보 새로고침 실패:", error);
    }
  };

  const handleDeletePet = async (petId: number) => {
    if (!confirm("정말로 이 반려동물 정보를 삭제하시겠습니까?")) {
      return;
    }

    try {
      console.log(
        "삭제 API 호출:",
        `${import.meta.env.VITE_API_BASE_URL}api/pet/profile/${petId}`
      );

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}api/pet/profile/${petId}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("삭제 응답 에러:", errorText);
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${errorText}`
        );
      }

      // 삭제 성공 후 반려동물 정보 다시 로드
      await fetchPetInfo();
    } catch (error) {
      console.error("반려동물 정보 삭제 실패:", error);
      alert("삭제에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <section>
      <div className="flex gap-16 mt-12">
        <div className="flex-1 flex flex-col">
          <ProfileInfo />
          {hasPetInfo &&
            petInfos?.map((petInfo, index) => (
              <PetInfoSection
                key={petInfo.id || `pet-${index}`}
                petInfo={petInfo}
                isLoading={isLoading}
                onDelete={handleDeletePet}
              />
            ))}
        </div>
      </div>
      {!hasPetInfo && (
        <div className="flex items-center justify-center">
          <button
            onClick={handleAddClick}
            className="w-24 h-24 rounded-lg bg-gray-100 flex items-center justify-center text-5xl text-gray-400 hover:bg-gray-200 transition-colors cursor-pointer"
          >
            <IoAdd className="w-12 h-12" />
          </button>
        </div>
      )}

      <PetInfoModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onPetInfoAdded={handlePetInfoAdded}
      />
    </section>
  );
};

export default MyInfoPage;
