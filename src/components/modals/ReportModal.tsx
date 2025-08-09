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
        className="w-[562px] h-[379px] bg-white flex flex-col gap-[44px] p-[24px] rounded-[24px]"
        onClick={(e) => e.stopPropagation()}
        style={{
          boxShadow: `0px 0px 1px 0px rgba(0, 0, 0, 0.08),
            0px 1px 4px 0px rgba(0, 0, 0, 0.08),
            0px 2px 8px 0px rgba(0, 0, 0, 0.12)`,
        }}
      >
        <div className="w-[514px] h-[179px] flex flex-col gap-[32px]">
          <div className="w-full h-[29px] flex justify-between">
            <div className="w-[24x] h-[24px]"></div>
            <p className="w-fit h-full text-[20px] font-semibold flex justify-center items-center text-[18px]">
              이 댓글을 신고하시겠습니까?
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
          <div className="w-full h-[118px] flex flex-col gap-[16px]">
            <div className="w-[460px] h-[22px] flex gap-[8px] items-center">
              <p className="w-[133px] h-full flex justify-center items-center text-[16px]">
                사유를 선택해주세요.
              </p>
              <p className="w-fit h-[20px] text-[var(--deactivated-text)] flex justify-center items-center text-[14px]">
                신고 사유가 여러 개일 경우 대표 1개만 선택해주세요.
              </p>
            </div>
            <div className="w-full h-[80px] grid grid-cols-2 gap-x-2 gap-y-2">
              {reportOptions.map((option, i) => (
                <div key={i} className="w-[256px] h-[24px] flex gap-[16px]">
                  <SVGCheckBox
                    key={i}
                    id={"id-" + i}
                    checked={selected === i + 1}
                    onChange={() => toggleReason(i + 1)}
                  />
                  <label
                    htmlFor={"id-" + i}
                    className="cursor-pointer text-[16px]"
                  >
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
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
