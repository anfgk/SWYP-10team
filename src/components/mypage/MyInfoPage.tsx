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

      await fetch(`${import.meta.env.VITE_API_BASE_URL}api/pet/profile`, {
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI3IiwiZW1haWwiOiJnbG9yaWEwMjA1MTBAZ21haWwuY29tIiwiZGlzcGxheU5hbWUiOiLsoJXtlZgiLCJpYXQiOjE3NTQzODQ4MDQsImV4cCI6MTc2MjE2MDgwNH0.4WXOk_zOhE8ndDtB3zXfwKNi_1Lapv3Z1-seMIgv8fg`,
        },
        body: formData,
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
