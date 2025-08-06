import { useState } from "react";
import ModalButton from "./common/ModalButton";
import ModalBackground from "./common/ModalBackground";
import { useModalEscapeKey } from "@/hooks/useModalEscapeKey";

interface Props {
  onClose: () => void;
  reviewId: number;
}

const ReportModalSub = ({ onClose, reviewId }: Props) => {
  const [text, setText] = useState("");
  const maxLength = 2000;

  useModalEscapeKey(onClose);

  return (
    <ModalBackground onClose={onClose}>
      <div
        className="w-[562px] h-[457px] bg-white flex flex-col gap-[44px] px-[24px] py-[32px] rounded-[24px]"
        onClick={(e) => e.stopPropagation()}
        style={{
          boxShadow: `0px 0px 1px 0px rgba(0, 0, 0, 0.08),
            0px 1px 4px 0px rgba(0, 0, 0, 0.08),
            0px 2px 8px 0px rgba(0, 0, 0, 0.12)`,
        }}
      >
        <div className="w-[514px] h-[229px] flex flex-col gap-[32px]">
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
          <div className="w-full h-[165px] flex flex-col gap-[4px]">
            <div className="w-fit h-[20px] ml-auto flex justify-center items-center gap-[4px]">
              <p className="text-[var(--state-error)] text-[14px] flex items-center justify-center w-fit">
                *
              </p>
              <p className="text-[14px] flex items-center justify-center w-fit text-[#1F1F1F]">
                필수입력사항
              </p>
            </div>
            <div className="w-[514px] h-[141px] flex gap-[16px]">
              <div className="w-[63px] h-[22px] flex justify-center items-center">
                <p className="text-[16px] flex items-center justify-center w-fit">
                  신고사유
                </p>
                <p className="text-[var(--state-error)] text-[14px] flex items-center justify-center w-fit">
                  *
                </p>
              </div>
              <div className="w-[435px] h-[141px] relative">
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="텍스트를 입력해주세요."
                  maxLength={maxLength}
                  className="w-full h-full overflow-y-scrol rounded-[16px] px-[18px] py-[14px] border-[1px] border-[var(--textarea-border)] placeholder:text-[var(--indicator-disabled)] placeholder:text-[16px] resize-none focus:outline-none"
                />
                <p className="absolute bottom-[14px] right-[18px] w-fit h-[22px] text-[16px] text-[var(--indicator-disabled)]">
                  {text.length}/{maxLength}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-[120px] flex flex-col gap-[8px]">
          <ModalButton
            onClick={() => alert(reviewId)}
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

export default ReportModalSub;
