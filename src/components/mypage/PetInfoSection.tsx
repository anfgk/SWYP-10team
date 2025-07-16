import PageButton from "@/components/ui/page-button";

const PetInfoSection = () => {
  return (
    <div className="bg-gray-100 p-6 rounded-lg flex flex-col gap-4">
      <div className="text-lg font-semibold mb-2">반려동물 정보</div>
      <div className="flex gap-8 items-start">
        <div className="w-40 h-32 bg-gray-300" />
        <div className="flex-1 flex flex-col gap-2">
          <div className="flex gap-4">
            <div className="w-20">이름</div>
            <div className="flex-1 h-6 bg-gray-200" />
          </div>
          <div className="flex gap-4">
            <div className="w-20">종류</div>
            <div className="flex-1 h-6 bg-gray-200" />
          </div>
          <div className="flex gap-4">
            <div className="w-20">성별</div>
            <div className="flex-1 h-6 bg-gray-200" />
          </div>
          <div className="flex gap-4 items-center">
            <div className="w-20">생년월일</div>
            <div className="flex-1 h-6 bg-gray-200" />
          </div>
          <div className="flex gap-4">
            <div className="w-20">사이즈</div>
            <div className="flex-1 h-6 bg-gray-200" />
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <PageButton text="수정" variant="default" />
            <PageButton text="삭제" variant="default" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetInfoSection;
