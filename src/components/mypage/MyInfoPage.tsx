import { useState, useEffect } from "react";
import PetInfoSection from "@/components/mypage/PetInfoCard";
import ProfileInfo from "@/components/mypage/ProfileInfo";
import PetInfoModal from "@/components/mypage/PetInfoModal";
import { IoAdd } from "react-icons/io5";

interface PetInfo {
  id: number;
  name: string;
  type: string;
  gender: string;
  birth: string;
  size: string;
  imageUrl: string;
}

const MyInfoPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingPetInfo, setEditingPetInfo] = useState<PetInfo | null>(null);
  const [hasPetInfo, setHasPetInfo] = useState(false);
  const [petInfos, setPetInfos] = useState<PetInfo[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  console.log("hasPetInfo", hasPetInfo);

  const fetchPetInfo = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}api/pet/profile`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI3IiwiZW1haWwiOiJnbG9yaWEwMjA1MTBAZ21haWwuY29tIiwiZGlzcGxheU5hbWUiOiLsoJXtlZgiLCJpYXQiOjE3NTQzODQ4MDQsImV4cCI6MTc2MjE2MDgwNH0.4WXOk_zOhE8ndDtB3zXfwKNi_1Lapv3Z1-seMIgv8fg`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("반려동물 정보 로드 완료:", data);
      console.log("반려동물 정보 상세:", JSON.stringify(data.data, null, 2));

      // API 응답 구조 확인
      const petData = data?.data || data?.pets || data;
      console.log("처리할 반려동물 데이터:", petData);

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
  };

  useEffect(() => {
    fetchPetInfo();
  }, []);

  const handleAddClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
    setEditingPetInfo(null);
  };

  const handleEditClick = (petInfo: PetInfo) => {
    setEditingPetInfo(petInfo);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handlePetInfoAdded = async (petInfo: {
    name: string;
    type: string;
    gender: string;
    birthYear: string;
    size: string;
    image?: File;
  }) => {
    if (isSaving) return; // 중복 저장 방지

    try {
      setIsSaving(true);

      const formData = new FormData();
      formData.append("name", petInfo.name);
      formData.append(
        "fierceDog",
        petInfo.type === "fierceDog" ? "true" : "false"
      );
      formData.append("gender", petInfo.gender === "female" ? "F" : "M");
      formData.append("birth", petInfo.birthYear);
      formData.append(
        "size",
        petInfo.size === "large"
          ? "대형"
          : petInfo.size === "medium"
            ? "중형"
            : "소형"
      );

      if (petInfo.image) {
        formData.append("image", petInfo.image);
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}api/pet/profile`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI3IiwiZW1haWwiOiJnbG9yaWEwMjA1MTBAZ21haWwuY29tIiwiZGlzcGxheU5hbWUiOiLsoJXtlZgiLCJpYXQiOjE3NTQzODQ4MDQsImV4cCI6MTc2MjE2MDgwNH0.4WXOk_zOhE8ndDtB3zXfwKNi_1Lapv3Z1-seMIgv8fg`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // 저장 성공 후 반려동물 정보 다시 로드
      await fetchPetInfo();
      setIsModalOpen(false);
    } catch (error) {
      console.error("반려동물 정보 저장 실패:", error);
      alert("저장에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsSaving(false);
    }
  };

  const handlePetInfoUpdated = async (petInfo: {
    name: string;
    type: string;
    gender: string;
    birthYear: string;
    size: string;
    image?: File;
  }) => {
    if (!editingPetInfo) return;

    try {
      // 이름 유효성 검사
      if (!petInfo.name?.trim()) {
        alert("반려동물 이름을 입력해주세요.");
        return;
      }

      // petId 확인
      const petId =
        editingPetInfo.id ||
        (editingPetInfo as any).petId ||
        (editingPetInfo as any).profileId ||
        (editingPetInfo as any).pet_id;
      if (!petId) {
        alert("수정할 반려동물 정보를 찾을 수 없습니다.");
        return;
      }

      // FormData 생성
      const formData = new FormData();
      formData.append("name", petInfo.name.trim());
      formData.append(
        "fierceDog",
        petInfo.type === "fierceDog" ? "true" : "false"
      );
      formData.append("gender", petInfo.gender === "female" ? "F" : "M");
      formData.append("birth", petInfo.birthYear);
      formData.append(
        "size",
        petInfo.size === "large"
          ? "대형"
          : petInfo.size === "medium"
            ? "중형"
            : "소형"
      );

      // 이미지 처리
      if (petInfo.image) {
        formData.append("image", petInfo.image);
      }

      // API 호출
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}api/pet/profile/${parseInt(petId.toString(), 10)}`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI3IiwiZW1haWwiOiJnbG9yaWEwMjA1MTBAZ21haWwuY29tIiwiZGlzcGxheU5hbWUiOiLsoJXtlZgiLCJpYXQiOjE3NTQzODQ4MDQsImV4cCI6MTc2MjE2MDgwNH0.4WXOk_zOhE8ndDtB3zXfwKNi_1Lapv3Z1-seMIgv8fg`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // 성공 처리
      await fetchPetInfo();
      setIsModalOpen(false);
      setIsEditMode(false);
      setEditingPetInfo(null);
    } catch (error) {
      console.error("반려동물 정보 수정 실패:", error);
      alert("수정에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleDeletePet = async (petId: number) => {
    console.log("삭제 요청 시작, petId:", petId);

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
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI3IiwiZW1haWwiOiJnbG9yaWEwMjA1MTBAZ21haWwuY29tIiwiZGlzcGxheU5hbWUiOiLsoJXtlZgiLCJpYXQiOjE3NTQzODQ4MDQsImV4cCI6MTc2MjE2MDgwNH0.4WXOk_zOhE8ndDtB3zXfwKNi_1Lapv3Z1-seMIgv8fg`,
          },
        }
      );

      console.log("삭제 응답 상태:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("삭제 응답 에러:", errorText);
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${errorText}`
        );
      }

      // 삭제 성공 후 반려동물 정보 다시 로드
      await fetchPetInfo();
      console.log("반려동물 정보 삭제 완료");
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
                onEdit={handleEditClick}
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
        onPetInfoUpdated={handlePetInfoUpdated}
        isEditMode={isEditMode}
        editingPetInfo={editingPetInfo}
        isSaving={isSaving}
      />
    </section>
  );
};

export default MyInfoPage;
