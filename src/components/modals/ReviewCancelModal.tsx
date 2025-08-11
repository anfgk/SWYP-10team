import { useModalEscapeKey } from "@/hooks/useModalEscapeKey";
import ModalBackground from "./common/ModalBackground";
import ModalButton from "./common/ModalButton";

interface Props {
  onClose: () => void;
  onConfirm: () => void;
}
const ReviewCancelModal = ({ onClose, onConfirm }: Props) => {
  useModalEscapeKey(onClose);
  return (
    <ModalBackground onClose={onClose}>
      <div
        className="w-[562px] h-[250px] bg-white flex flex-col gap-[24px] p-[24px] rounded-[24px]"
        onClick={(e) => e.stopPropagation()}
        style={{
          boxShadow: `0px 0px 1px 0px rgba(0, 0, 0, 0.08),
            0px 1px 4px 0px rgba(0, 0, 0, 0.08),
            0px 2px 8px 0px rgba(0, 0, 0, 0.12)`,
        }}
      >
        <div className="w-full h-[58px] flex justify-between">
          <div className="w-[24px] h-[24px]"></div>
          <p className="w-fit h-full text-[20px] font-semibold flex justify-center items-center text-center text-[18px]">
            리뷰를 취소하시겠어요?
            <br />이 페이지를 나가면 저장되지 않아요
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
        <div className="w-full h-[120px] flex flex-col gap-[8px]">
          <ModalButton
            onClick={onConfirm}
            text="예"
            textcolor="--main-text"
            bgcolor="--main-color"
          />
          <ModalButton
            onClick={onClose}
            text="아니오"
            bgcolor="--indicator-disabled"
            textcolor="--place-neutral"
          />
        </div>
      </div>
    </ModalBackground>
  );
};

export default ReviewCancelModal;
