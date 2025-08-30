import { useModalEscapeKey } from "@/hooks/useModalEscapeKey";
import ModalBackground from "./common/ModalBackground";
import { useState } from "react";
import SVGCheckBox from "../common/SVGCheckBox";
import { Input } from "../ui/input";
import ModalButton from "./common/ModalButton";
import ModalSelectBox from "./common/ModalSelectBox";
import { petSize, petType } from "@/configs/petOptions";
import Calendar from "../mypage/Calendar";
import { useMyPetAddModal } from "@/hooks/useMyPetAddModal";

interface Props {
  onClose: () => void;
}
const MyPetAddModal = ({ onClose }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  useModalEscapeKey(onClose);

  const {
    gender,
    name,
    type,
    size,
    birthDay,
    setGender,
    setName,
    setType,
    setSize,
    setBirthDay,
    fileInputRef,
    previewUrl,
    handleSubmit,
    openPicker,
    onFileChange,
  } = useMyPetAddModal();

  return (
    <ModalBackground onClose={onClose}>
      <div
        className="w-[562px] h-fit bg-white flex flex-col gap-[68px] items-center px-[24px] py-[24px] rounded-[24px]"
        onClick={(e) => e.stopPropagation()}
        style={{
          boxShadow: `0px 0px 1px 0px rgba(0, 0, 0, 0.08),
            0px 1px 4px 0px rgba(0, 0, 0, 0.08),
            0px 2px 8px 0px rgba(0, 0, 0, 0.12)`,
        }}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".jpg,.jpeg,.png"
          className="hidden"
          onChange={onFileChange}
        />

        <div className="w-[514px] h-fit flex flex-col gap-[56px]">
          <div className="w-full h-[29px] flex justify-between">
            <div className="w-[24px] h-[24px]"></div>
            <p className="w-fit h-full text-[20px] font-semibold flex justify-center items-center text-[18px]">
              반려동물 정보
            </p>
            <button
              className="w-[24px] h-[24px] cursor-pointer"
              onClick={onClose}
            >
              <img
                className="w-full h-full"
                src="/assets/buttons/modal_close.png"
                alt="close button"
              />
            </button>
          </div>
          <div className="w-full h-fit flex flex-col gap-[24px] items-center">
            <div className="w-[300px] h-[200px] overflow-hidden rounded-[16px]">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  className="w-full h-full object-cover object-center"
                />
              ) : (
                <button
                  className="w-full h-full cursor-pointer"
                  onClick={openPicker}
                >
                  <img
                    src="/assets/images/common/pet_add_thumbnail.png"
                    className="w-full h-full"
                  />
                </button>
              )}
            </div>
            <div className="w-full h-fit flex flex-col gap-[12px] items-center">
              <div className="w-full h-[24px] flex gap-[16px] items-center">
                <p className="w-[56px] h-[22px] text-[16px]">성별</p>
                <div className="w-[136px] h-[24px] flex gap-[32px]">
                  <div className="w-[52px] h-[24px] flex gap-[4px]">
                    <img src="/assets/icons/female.png" className="w-6 h-6" />
                    <SVGCheckBox
                      checked={gender === "F"}
                      onChange={() => setGender("F")}
                    />
                  </div>
                  <div className="w-[52px] h-[24px] flex gap-[4px]">
                    <img src="/assets/icons/male.png" className="w-6 h-6" />
                    <SVGCheckBox
                      checked={gender === "M"}
                      onChange={() => setGender("M")}
                    />
                  </div>
                </div>
              </div>
              <div className="w-full h-[48px] flex gap-[16px] items-center">
                <p className="w-[56px] h-[22px] text-[16px]">이름</p>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={20}
                  className={`w-[442px] h-full px-[16px] py-[12px] text-[14px] text-[var(--search-element-text)] font-semibold bg-[var(--sem-fill-norm)] rounded-[8px] !shadow-none border-[1px] border-[var(--search-element-border)]`}
                  placeholder="이름을 입력해주세요"
                />
              </div>
              <div className="w-full h-[48px] flex gap-[16px] items-center">
                <p className="w-[56px] h-[22px] text-[16px]">종류</p>
                <ModalSelectBox
                  onChange={setType}
                  options={petType}
                  value={type}
                />
              </div>
              <div className="w-full h-[48px] flex gap-[16px] items-center relative">
                <p className="w-[56px] h-[22px] text-[16px]">출생년도</p>

                <div className="flex justify-between w-[442px] h-full px-[16px] py-[12px] text-[14px] text-[var(--search-element-text)] font-semibold !bg-[var(--sem-fill-norm)] rounded-[8px] !shadow-none border-[1px] border-[var(--search-element-border)]">
                  {birthDay === "" ? "날짜를 입력해주세요." : birthDay}
                  <button
                    className="w-6 h-6 cursor-pointer"
                    onClick={() => setIsOpen(true)}
                  >
                    <img
                      src="/assets/icons/calendar.png"
                      className="w-full h-full "
                    />
                  </button>
                </div>

                <Calendar
                  value={birthDay}
                  onChange={setBirthDay}
                  isOpen={isOpen}
                  onClose={() => setIsOpen(false)}
                />
              </div>
              <div className="w-full h-[48px] flex gap-[16px] items-center">
                <p className="w-[56px] h-[22px] text-[16px]">사이즈</p>
                <ModalSelectBox
                  onChange={setSize}
                  options={petSize}
                  value={size}
                />
              </div>
            </div>
          </div>
          <div className="w-full h-[120px] flex flex-col gap-[8px]">
            <ModalButton
              onClick={handleSubmit}
              text="저장할게요"
              textcolor="--main-text"
              bgcolor="--main-color"
            />
            <ModalButton
              onClick={onClose}
              text="다음에 할게요"
              bgcolor="--indicator-disabled"
              textcolor="--place-neutral"
            />
          </div>
        </div>
      </div>
    </ModalBackground>
  );
};

export default MyPetAddModal;
