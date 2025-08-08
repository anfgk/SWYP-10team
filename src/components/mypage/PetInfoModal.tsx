import React, { useState, useEffect } from "react";
import ModalInput from "./ModalInput";
import { AiOutlineCamera } from "react-icons/ai";

interface PetInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPetInfoAdded: (petInfo: {
    name: string;
    type: string;
    gender: string;
    birthYear: string;
    size: string;
    image?: File;
  }) => void;
  onPetInfoUpdated?: (petInfo: {
    name: string;
    type: string;
    gender: string;
    birthYear: string;
    size: string;
    image?: File;
  }) => void;
  isEditMode?: boolean;
  editingPetInfo?: {
    id: number;
    name: string;
    type: string;
    gender: string;
    birth: string;
    size: string;
    imageUrl: string;
  } | null;
  isSaving?: boolean;
}

const PetInfoModal = ({
  isOpen,
  onClose,
  onPetInfoAdded,
  onPetInfoUpdated,
  isEditMode = false,
  editingPetInfo = null,
  isSaving = false,
}: PetInfoModalProps) => {
  const [gender, setGender] = useState<"female" | "male">("female");
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [size, setSize] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const resetForm = () => {
    setGender("female");
    setName("");
    setType("");
    setBirthYear("");
    setSize("");
    setSelectedImage(null);
    setImagePreview(null);
  };

  // 수정 모드일 때 기존 정보로 폼 초기화
  useEffect(() => {
    if (isEditMode && editingPetInfo) {
      setName(editingPetInfo.name);
      setGender(editingPetInfo.gender === "F" ? "female" : "male");
      setType(editingPetInfo.type);
      setBirthYear(editingPetInfo.birth);
      setSize(editingPetInfo.size);
      setImagePreview(editingPetInfo.imageUrl);
    } else {
      // 새로 추가하는 경우 폼 초기화
      resetForm();
    }
  }, [isEditMode, editingPetInfo]);

  if (!isOpen) return null;

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
  };

  const handleSave = () => {
    const petInfo = {
      name,
      type,
      gender,
      birthYear,
      size,
      image: selectedImage || undefined,
    };

    if (isEditMode && onPetInfoUpdated) {
      onPetInfoUpdated(petInfo);
    } else {
      onPetInfoAdded(petInfo);
    }
  };

  const handleAddMore = () => {
    // 추가 반려동물 입력을 위한 로직
  };

  return (
    <div className="fixed inset-0 bg-[#00000080] bg-opacity-20 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[562px] h-[780px] shadow-[0_2px_8px_0_rgba(0,0,0,0.12),0_1px_4px_0_rgba(0,0,0,0.08),0_0_1px_0_rgba(0,0,0,0.08)] overflow-y-auto">
        <div className="relative flex justify-between items-center mb-[56px]">
          <div className="w-6"></div>
          <h3 className="text-[20px] font-semibold">반려동물 정보</h3>
          <button
            onClick={() => {
              resetForm();
              onClose();
            }}
            className="text-gray-500 hover:text-gray-700 w-6"
          >
            ✕
          </button>
        </div>
        <div className="space-y-4">
          {/* 이미지 업로드 */}
          <div className="flex justify-center mb-[24px]">
            <div className="flex items-center gap-4">
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="반려동물 사진"
                    className="w-[300px] h-[200px] object-cover rounded-lg border cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => {
                      // 이미지 클릭 시 파일 선택 다이얼로그 열기
                      const fileInput = document.createElement("input");
                      fileInput.type = "file";
                      fileInput.accept = "image/*";
                      fileInput.onchange = (e) => {
                        const file = (e.target as HTMLInputElement).files?.[0];
                        if (file) {
                          handleImageChange({
                            target: { files: [file] },
                          } as unknown as React.ChangeEvent<HTMLInputElement>);
                        }
                      };
                      fileInput.click();
                    }}
                  />
                </div>
              ) : (
                <label className="w-[300px] h-[200px] bg-gray-100 border-1 border-gray-200 rounded-lg flex items-center justify-center cursor-pointer transition-colors">
                  <div className="text-center flex items-center justify-center gap-2">
                    <div className="text-gray-400 text-2xl mb-1">
                      <AiOutlineCamera />
                    </div>
                    <div className="text-xs text-gray-500">사진 추가</div>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
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

          {/* 버튼들 */}
          <div className="flex flex-col gap-3">
            <button
              onClick={handleAddMore}
              className="w-[514px] h-[56px] py-3 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              반려동물을 더 추가할게요
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className={`w-[514px] h-[56px] py-3 px-4 rounded-lg transition-colors ${
                isSaving
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[var(--main-color)] text-white hover:bg-red-600"
              }`}
            >
              {isSaving ? "저장 중..." : "저장할게요"}
            </button>
            <button
              onClick={() => {
                resetForm();
                onClose();
              }}
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
