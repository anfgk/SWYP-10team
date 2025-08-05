import { useState } from "react";
import PetInfoSection from "@/components/mypage/PetInfoCard";
import ProfileInfo from "@/components/mypage/ProfileInfo";
import PetInfoModal from "@/components/mypage/PetInfoModal";
import { IoAdd } from "react-icons/io5";

const MyInfoPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasPetInfo, setHasPetInfo] = useState(false);

  const handleAddClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handlePetInfoAdded = async (petInfo: {
    name: string;
    type: string;
    gender: string;
    birthYear: string;
    size: string;
    image?: File;
  }) => {
    console.log("petInfo", petInfo);

    try {
      // 현재 연도에서 출생년도를 빼서 나이 계산
      const currentYear = new Date().getFullYear();
      const age = currentYear - parseInt(petInfo.birthYear);

      await fetch(`${import.meta.env.VITE_API_BASE_URL}api/pet/profile`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: petInfo.name,
          type: petInfo.type,
          gender: petInfo.gender,
          age: age,
          size: petInfo.size,
        }),
      });

      setHasPetInfo(true);
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section>
      <div className="flex gap-16 mt-12">
        <div className="flex-1 flex flex-col">
          <ProfileInfo />
          {hasPetInfo && <PetInfoSection />}
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
