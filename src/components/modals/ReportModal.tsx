import ModalButton from "./common/ModalButton";
import ModalBackground from "./common/ModalBackground";
import { useModalEscapeKey } from "@/hooks/useModalEscapeKey";

import { reportOptions } from "@/configs/reportOptions";
import SVGCheckBox from "../common/SVGCheckBox";
import { useReportModal } from "@/hooks/useReportModal";

interface Props {
  onClose: () => void;
  reviewId: number;
}

const ReportModal = ({ onClose, reviewId }: Props) => {
  useModalEscapeKey(onClose);

  const { selected, handleSubmit, toggleReason } = useReportModal({
    reviewId,
    onClose,
  });
  return (
    <ModalBackground onClose={onClose}>
      <div
        className="w-[562px] h-fit bg-white flex flex-col gap-[44px] px-[24px] py-[32px] rounded-[24px]"
        onClick={(e) => e.stopPropagation()}
        style={{
          boxShadow: `0px 0px 1px 0px rgba(0, 0, 0, 0.08),
            0px 1px 4px 0px rgba(0, 0, 0, 0.08),
            0px 2px 8px 0px rgba(0, 0, 0, 0.12)`,
        }}
      >
        <div className="w-[514px] h-[32px] flex flex-col gap-[32px]">
          <div className="w-full h-[32px] flex justify-between">
            <div className="w-[24x] h-[24px]"></div>
            <p className="w-fit h-full text-[20px] font-semibold flex justify-center items-center">
              이 댓글을 신고하시겠어요?
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
        </div>
        <ul className="w-fit h-fit flex flex-col gap-[24px] items-center mx-auto">
          {reportOptions.map((option, i) => (
            <li key={i} className="flex w-[400px] justify-between">
              <label htmlFor={"id-" + i} className="cursor-pointer">
                {option}
              </label>
              <SVGCheckBox
                key={i}
                id={"id-" + i}
                checked={selected === i + 1}
                onChange={() => toggleReason(i + 1)}
              />
            </li>
          ))}
        </ul>
        <div className="w-full h-[120px] flex flex-col gap-[8px]">
          <ModalButton
            onClick={() => handleSubmit()}
            text="확인"
            bgcolor="--main-color"
            textcolor="--main-text"
          />
          <ModalButton
            onClick={onClose}
            text="취소"
            bgcolor="--indicator-disabled"
            textcolor="--place-neutral"
          />
        </div>
      </div>
    </ModalBackground>
  );
};

export default ReportModal;
