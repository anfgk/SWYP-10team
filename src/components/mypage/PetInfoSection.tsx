import PageButton from "@/components/ui/page-button";
import InputField from "@/components/ui/input-field";

const PetInfoSection = () => {
  return (
    <>
      <div className="text-lg font-semibold mb-2">반려동물 정보</div>
      <div className="bg-gray-100 p-6 rounded-lg flex flex-col gap-4">
        <div className="flex gap-8 items-start">
          <div className="w-[218px] h-[272px] bg-gray-300" />
          <div className="flex-1 flex flex-col gap-2">
            <div className="flex items-center">
              <div className="w-20">이름</div>
              <InputField />
            </div>
            <div className="flex items-center">
              <div className="w-20">종류</div>
              <InputField />
            </div>
            <div className="flex items-center">
              <div className="w-20">성별</div>
              <InputField />
            </div>
            <div className="flex items-center">
              <div className="w-20">나이</div>
              <InputField />
            </div>
            <div className="flex items-center">
              <div className="w-20">사이즈</div>
              <InputField />
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <PageButton text="수정하기" variant="default" />
              <PageButton text="삭제하기" variant="default" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PetInfoSection;
