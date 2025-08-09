import { useState } from "react";
import { Button } from "@/components/ui/button";

interface PetInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPet: (petInfo: PetInfo) => void;
}

interface PetInfo {
  name: string;
  type: string;
  breed: string;
  age: number;
}

const PetInfoModal = ({ isOpen, onClose, onAddPet }: PetInfoModalProps) => {
  const [petInfo, setPetInfo] = useState<PetInfo>({
    name: "",
    type: "",
    breed: "",
    age: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddPet(petInfo);
    onClose();
    setPetInfo({ name: "", type: "", breed: "", age: 0 });
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
            <select
              value={petInfo.type}
              onChange={(e) => setPetInfo({ ...petInfo, type: e.target.value })}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">선택하세요</option>
              <option value="dog">강아지</option>
              <option value="cat">고양이</option>
              <option value="other">기타</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">품종</label>
            <input
              type="text"
              value={petInfo.breed}
              onChange={(e) =>
                setPetInfo({ ...petInfo, breed: e.target.value })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">나이</label>
            <input
              type="number"
              value={petInfo.age}
              onChange={(e) =>
                setPetInfo({ ...petInfo, age: parseInt(e.target.value) })
              }
              className="w-full p-2 border rounded"
              min="0"
              required
            />
          </div>
          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={onClose}>
              취소
            </Button>
            <Button type="submit">추가</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PetInfoModal;
