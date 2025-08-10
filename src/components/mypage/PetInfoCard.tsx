import PageButton from "@/components/ui/page-button";
import { AiOutlineMan, AiOutlineWoman } from "react-icons/ai";

interface PetInfo {
  id: number;
  name: string;
  type: string;
  gender: string;
  birth: string;
  size: string;
  imageUrl: string;
}

interface PetInfoCardProps {
  petInfo: PetInfo | null;
  isLoading: boolean;
  onDelete?: (petId: number) => void;
  onEdit?: (petInfo: PetInfo) => void;
}

const PetInfoCard = ({
  petInfo,
  isLoading,
  onDelete,
  onEdit,
}: PetInfoCardProps) => {
  if (isLoading) {
    return (
      <section>
        <div className="text-lg font-semibold mb-2">반려동물 정보</div>
        <div className="p-[24px] rounded-lg flex flex-col gap-4 border border-[#BFBFBF66]/40">
          <div className="text-center py-8 text-gray-500">로딩 중...</div>
        </div>
      </section>
    );
  }

  if (!petInfo) {
    return null;
  }

  // 성별 표시 텍스트 변환
  const getGenderText = (gender: string) => {
    if (gender === "M" || gender === "male" || gender === "수컷") return "수컷";
    if (gender === "F" || gender === "female" || gender === "암컷")
      return "암컷";
    return gender;
  };

  // 종류 표시 텍스트 변환
  const getTypeText = (type: any) => {
    if (type === "dog" || type === "강아지" || type === "DOG" || type === "Dog")
      return "강아지";
    if (type === "cat" || type === "고양이" || type === "CAT" || type === "Cat")
      return "고양이";
    if (
      type === "fierceDog" ||
      type === "맹견" ||
      type === "true" ||
      type === true
    )
      return "맹견";
    if (type === "false" || type === false) return "강아지";
    return type || "종류 없음";
  };

  // 사이즈 표시 텍스트 변환
  const getSizeText = (size: string) => {
    if (size === "대형" || size === "대형") return "대형";
    if (size === "중형" || size === "중형") return "중형";
    if (size === "소형" || size === "소형") return "소형";
    return size;
  };

  return (
    <section>
      <div className="text-lg font-semibold mb-2">반려동물 정보</div>
      <div className="p-[24px] rounded-lg flex flex-col gap-4 border border-[#BFBFBF66]/40">
        <div className="flex gap-8 items-start">
          {/* 이미지 영역 */}
          <div className="w-[300px] h-[200px] bg-gray-300 rounded-lg flex items-center justify-center">
            <img
              src={petInfo.imageUrl}
              alt="반려동물 이미지"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          {/* 정보 영역 */}
          <div className="flex-1 flex flex-col gap-4">
            {/* 성별 */}
            <div className="flex items-center">
              <div className="w-20 font-medium text-gray-700">성별</div>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <AiOutlineMan className="text-blue-500 w-[24px] h-[24px]" />
                  <div className="relative">
                    <input
                      type="radio"
                      name="gender"
                      value="수컷"
                      checked={getGenderText(petInfo.gender) === "수컷"}
                      className="sr-only"
                      readOnly
                    />
                    <div
                      className={`w-[24px] h-[24px] border-2 rounded-full flex items-center justify-center ${
                        getGenderText(petInfo.gender) === "수컷"
                          ? "bg-blue-500"
                          : "border-gray-300 bg-white"
                      }`}
                    >
                      {getGenderText(petInfo.gender) === "수컷" && (
                        <div className="w-2 h-2 rounded-full bg-white"></div>
                      )}
                    </div>
                  </div>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <AiOutlineWoman className="text-[var(--main-color)] w-[24px] h-[24px]" />
                  <div className="relative">
                    <input
                      type="radio"
                      name="gender"
                      value="암컷"
                      checked={getGenderText(petInfo.gender) === "암컷"}
                      className="sr-only"
                      readOnly
                    />
                    <div
                      className={`w-[24px] h-[24px] border-2 rounded-full flex items-center justify-center ${
                        getGenderText(petInfo.gender) === "암컷"
                          ? "bg-[var(--main-color)]"
                          : "border-gray-300 bg-white"
                      }`}
                    >
                      {getGenderText(petInfo.gender) === "암컷" && (
                        <div className="w-2 h-2 rounded-full bg-white"></div>
                      )}
                    </div>
                  </div>
                </label>
              </div>
            </div>
            {/* 이름 */}
            <div className="flex items-center">
              <div className="w-20 font-medium text-gray-700">이름</div>
              <div className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700">
                {petInfo.name || "이름 없음"}
              </div>
            </div>

            {/* 종류 */}
            <div className="flex items-center">
              <div className="w-20 font-medium text-gray-700">종류</div>
              <div className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700">
                {(() => {
                  // 가능한 종류 필드들을 시도
                  const petType =
                    petInfo.type ||
                    (petInfo as any).petType ||
                    (petInfo as any).animalType ||
                    (petInfo as any).fierceDog;

                  return getTypeText(petType) || "종류 없음";
                })()}
              </div>
            </div>

            {/* 생년월일 */}
            <div className="flex items-center">
              <div className="w-20 font-medium text-gray-700">생년월일</div>
              <div className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700">
                {petInfo.birth || "생년월일 없음"}
              </div>
            </div>

            {/* 사이즈 */}
            <div className="flex items-center">
              <div className="w-20 font-medium text-gray-700">사이즈</div>
              <div className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700">
                {getSizeText(petInfo.size) || "사이즈 없음"}
              </div>
            </div>

            {/* 버튼 영역 */}
            <div className="flex justify-end gap-2 mt-4">
              <PageButton
                text="수정하기"
                variant="default"
                onClick={() => {
                  // 가능한 ID 필드들 확인
                  const possibleId =
                    petInfo?.id ||
                    (petInfo as any)?.petId ||
                    (petInfo as any)?.profileId ||
                    (petInfo as any)?.pet_id;

                  if (onEdit && petInfo && possibleId) {
                    onEdit(petInfo);
                  }
                }}
              />
              <PageButton
                text="삭제하기"
                variant="default"
                onClick={() => {
                  // 가능한 ID 필드들을 시도
                  const petId =
                    petInfo.id ||
                    (petInfo as any).petId ||
                    (petInfo as any).profileId ||
                    (petInfo as any).pet_id;

                  if (onDelete && petId) {
                    onDelete(petId);
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PetInfoCard;
