import { useState } from "react";
import { Button } from "@/components/ui/button";

interface PetInfo {
  id: number;
  name: string;
  type: string;
  gender: string;
  birth: string;
  size: string;
  imageUrl: string;
}

interface PetInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPetInfoAdded: (petInfo: {
    name: string;
    type: string;
    gender: string;
    birthYear: string;
    size: string;
    image?: File | undefined;
  }) => Promise<void>;
  onPetInfoUpdated: (petInfo: {
    name: string;
    type: string;
    gender: string;
    birthYear: string;
    size: string;
    image?: File | undefined;
  }) => Promise<void>;
  isEditMode: boolean;
  editingPetInfo: PetInfo | null;
  isSaving: boolean;
}

const PetInfoModal = ({
  isOpen,
  onClose,
  onPetInfoAdded,
  onPetInfoUpdated,
  isEditMode,
  editingPetInfo: _editingPetInfo,
  isSaving,
}: PetInfoModalProps) => {
  const [petInfo, setPetInfo] = useState<PetInfo>({
    id: 0,
    name: "",
    type: "",
    gender: "",
    birth: "",
    size: "",
    imageUrl: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const petData = {
      name: petInfo.name,
      type: petInfo.type,
      gender: petInfo.gender,
      birthYear: petInfo.birth,
      size: petInfo.size,
    };

    if (isEditMode) {
      await onPetInfoUpdated(petData);
    } else {
      await onPetInfoAdded(petData);
    }
    onClose();
    setPetInfo({
      id: 0,
      name: "",
      type: "",
      gender: "",
      birth: "",
      size: "",
      imageUrl: "",
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-xl font-semibold mb-4">반려동물 정보 추가</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">이름</label>
            <input
              type="text"
              value={petInfo.name}
              onChange={(e) => setPetInfo({ ...petInfo, name: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">종류</label>
            <input
              type="text"
              value={petInfo.type}
              onChange={(e) => setPetInfo({ ...petInfo, type: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">성별</label>
            <select
              value={petInfo.gender}
              onChange={(e) =>
                setPetInfo({ ...petInfo, gender: e.target.value })
              }
              className="w-full p-2 border rounded"
              required
            >
              <option value="">선택하세요</option>
              <option value="male">수컷</option>
              <option value="female">암컷</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">출생년도</label>
            <input
              type="text"
              value={petInfo.birth}
              onChange={(e) =>
                setPetInfo({ ...petInfo, birth: e.target.value })
              }
              className="w-full p-2 border rounded"
              placeholder="예: 2020"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">크기</label>
            <select
              value={petInfo.size}
              onChange={(e) => setPetInfo({ ...petInfo, size: e.target.value })}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">선택하세요</option>
              <option value="small">소형</option>
              <option value="medium">중형</option>
              <option value="large">대형</option>
            </select>
          </div>
          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1" disabled={isSaving}>
              {isSaving ? "저장 중..." : isEditMode ? "수정" : "추가"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={isSaving}
            >
              취소
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PetInfoModal;
