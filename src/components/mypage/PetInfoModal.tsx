import { useState, useRef } from "react";
import ModalInput from "./ModalInput";
import { FaCamera } from "react-icons/fa";
import { useAuthStore } from "@/stores/authStore";
import { createPetProfile } from "@/lib/apiUtils";
import type { PetFormData } from "@/types/types";

interface PetInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPetInfoAdded: (petInfo: PetFormData) => void;
}

const PetInfoModal = ({
  isOpen,
  onClose,
  onPetInfoAdded,
}: PetInfoModalProps) => {
  const [gender, setGender] = useState<"female" | "male">("female");
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [size, setSize] = useState("");
  const [petImage, setPetImage] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { accessToken } = useAuthStore();

  if (!isOpen) return null;

  const handleSave = async () => {
    setError("");

    // 유효성 검사
    if (!name.trim()) {
      setError("이름을 입력해주세요.");
      return;
    }
    if (!type) {
      setError("종류를 선택해주세요.");
      return;
    }
    if (!birthYear) {
      setError("출생년도를 선택해주세요.");
      return;
    }
    if (!size) {
      setError("사이즈를 선택해주세요.");
      return;
    }
    if (!imageFile) {
      setError("반려동물 사진을 업로드해주세요.");
      return;
    }
    if (!accessToken) {
      setError("로그인이 필요합니다.");
      return;
    }

    try {
      setIsLoading(true);

      // API 스키마에 맞게 데이터 변환
      const petData = {
        name: name.trim(),
        gender: gender === "female" ? "F" : "M",
        birth: birthYear,
        type: type,
        fierceDog: type === "fierceDog",
        size: size,
        image: imageFile,
      };

      await createPetProfile(accessToken, petData);

      const petInfo: PetFormData = {
        name,
        type,
        gender,
        birthYear,
        size,
        image: petImage,
      };

      onPetInfoAdded(petInfo);
    } catch (error) {
      console.error("반려동물 등록 실패:", error);
      setError("반려동물 등록에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setPetImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      setError(""); // 이미지 업로드 시 에러 메시지 초기화
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="fixed inset-0 bg-[#00000080] bg-opacity-20 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[562px] h-[740px] shadow-[0_2px_8px_0_rgba(0,0,0,0.12),0_1px_4px_0_rgba(0,0,0,0.08),0_0_1px_0_rgba(0,0,0,0.08)] overflow-y-auto">
        <div className="relative flex justify-between items-center mb-[56px]">
          <div className="w-6"></div>
          <h3 className="text-[20px] font-semibold">반려동물 정보</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 w-6"
          >
            ✕
          </button>
        </div>
        <div className="space-y-4">
          {/* 이미지 업로드 섹션 */}
          <div className="flex justify-center items-center">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <div
              onClick={handleImageClick}
              className="w-[300px] h-[200px] bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors border-2 border-gray-200 overflow-hidden"
            >
              {petImage ? (
                <img
                  src={petImage}
                  alt="반려동물 사진"
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <div className="flex items-center gap-1 text-gray-400">
                  <div className="">
                    <FaCamera className="w-[20px] h-[18px]" />
                  </div>
                  <span className="text-sm">사진 올리기</span>
                </div>
              )}
            </div>
          </div>

          {/* 성별 선택 */}
          <ModalInput
            label="성별"
            type="radio"
            value={gender}
            onChange={(value) => setGender(value as "female" | "male")}
            radioOptions={[
              { value: "female", label: "여성", icon: "♀", color: "pink" },
              { value: "male", label: "남성", icon: "♂", color: "blue" },
            ]}
          />

          {/* 이름 입력 */}
          <ModalInput
            label="이름"
            type="text"
            value={name}
            onChange={setName}
            placeholder="텍스트를 입력해주세요"
          />

          {/* 종류 선택 */}
          <ModalInput
            label="종류"
            type="select"
            value={type}
            onChange={setType}
            placeholder="선택해주세요"
            options={[
              { value: "dog", label: "강아지" },
              { value: "fierceDog", label: "강아지(맹견)" },
              { value: "cat", label: "고양이" },
              { value: "other", label: "기타" },
            ]}
          />

          {/* 출생년도 선택 */}
          <ModalInput
            label="출생년도"
            type="date"
            value={birthYear}
            onChange={setBirthYear}
          />

          {/* 사이즈 선택 */}
          <ModalInput
            label="사이즈"
            type="select"
            value={size}
            onChange={setSize}
            placeholder="선택해주세요"
            options={[
              { value: "small", label: "소형" },
              { value: "medium", label: "중형" },
              { value: "large", label: "대형" },
            ]}
          />

          {/* 에러 메시지 */}
          {error && (
            <div className="text-red-500 text-sm mt-2 text-center">{error}</div>
          )}

          {/* 버튼들 */}
          <div className="flex flex-col gap-3">
            <button
              onClick={handleSave}
              disabled={isLoading}
              className="w-[514px] h-[56px] py-3 px-4 bg-[var(--main-color)] text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "등록 중..." : "저장할게요"}
            </button>
            <button
              onClick={onClose}
              className="w-[514px] h-[56px] py-3 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              다음에 할게요
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetInfoModal;
