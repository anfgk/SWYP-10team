import type { PetData } from "@/types/apiResponseTypes";
import MyInfoContentDiv from "./MyInfoContentDiv";
import DefaultButtonCancel from "@/components/common/DefaultButtonCancel";
import { deletePet } from "@/lib/myInfoUtils";
import DefaultButtonConfirm from "@/components/common/DefaultButtonConfirm";
import { useState } from "react";
import ModalPortal from "@/components/modals/common/ModalPortal";
import MyPetEditModal from "@/components/modals/MyPetEditModal";

interface Props {
  petData?: PetData;
}
const MyPetCard = ({ petData }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="w-[816px] h-[308px] border-[1px] border-[var(--search-element-border)] rounded-[16px] px-[32px] py-[24px] flex flex-col gap-[24px]">
      <div className="w-[752px] h-[200px] flex gap-[32px]">
        <div className="w-[300px] h-[200px] overflow-hidden rounded-[16px]">
          <img
            src={petData?.imageUrl}
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div className="w-[420px] h-[200px] flex flex-col gap-[4px]">
          <div className="w-full h-[24px] flex gap-[32px] items-center">
            <p className="w-[56px] h-[22px] text-[16px]">성별</p>
            <img
              src={`/assets/icons/${petData?.gender === "M" ? "male.png" : "female.png"}`}
              className="w-6 h-6"
            />
          </div>
          <div className="w-full h-[40px] flex gap-[32px] items-center">
            <p className="w-[56px] h-[22px] text-[16px]">이름</p>
            <MyInfoContentDiv content={petData?.name || ""} />
          </div>
          <div className="w-full h-[40px] flex gap-[32px] items-center">
            <p className="w-[56px] h-[22px] text-[16px]">종류</p>
            <MyInfoContentDiv content={petData?.type || ""} />
          </div>
          <div className="w-full h-[40px] flex gap-[32px] items-center">
            <p className="w-[56px] h-[22px] text-[16px]">생년월일</p>
            <MyInfoContentDiv content={petData?.birth || ""} />
          </div>
          <div className="w-full h-[40px] flex gap-[32px] items-center">
            <p className="w-[56px] h-[22px] text-[16px]">사이즈</p>
            <MyInfoContentDiv content={petData?.size || ""} />
          </div>
        </div>
      </div>
      <div className="w-full h-[36px] flex gap-[10px] justify-end">
        <DefaultButtonConfirm
          text="수정하기"
          textSize={14}
          w={77}
          h={36}
          onClick={() => setIsOpen(true)}
        />
        <DefaultButtonCancel
          text="삭제하기"
          textSize={14}
          w={77}
          h={36}
          onClick={() => deletePet(petData?.petId!)}
        />
      </div>
      {isOpen && (
        <ModalPortal>
          <div className="App">
            <MyPetEditModal
              onClose={() => setIsOpen(false)}
              petData={petData!}
            />
          </div>
        </ModalPortal>
      )}
    </div>
  );
};

export default MyPetCard;
