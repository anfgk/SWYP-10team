import { usePlannerSelectionStore } from "@/stores/plannerSelectionStore";
import DefaultButtonCancel from "../common/DefaultButtonCancel";
import DefaultButtonConfirm from "../common/DefaultButtonConfirm";
import { Input } from "../ui/input";
import { usePlannerStep } from "@/hooks/usePlannerStep";

const SelectMoodSection = () => {
  const { setMood, mood } = usePlannerSelectionStore();
  const { next, prev } = usePlannerStep();
  const canNext = !!mood?.trim();
  return (
    <section className="my-[68px] mx-auto flex flex-col gap-[70px] w-[1112px] h-[416px] ">
      {/* 제목 */}
      <div className="w-fit h-[128px] flex flex-col gap-[8px]">
        <h2 className="font-semibold text-[40px]">지금 기분은 어때요?</h2>
        <h2 className="font-semibold text-[40px]">
          지금 기분에 딱 맞는 여행, 궁금하지 않나요?
        </h2>
      </div>
      {/* text 인풋 */}
      <div className="w-full h-[198px] flex flex-col gap-[18px]">
        <div className="w-full h-[135px] flex flex-col gap-[16px]">
          <h3 className="w-full h-[71px] flex items-center font-semibold text-[32px]">
            아래에 당신의 기분을 입력해주세요.
          </h3>
          <Input
            className="w-[442px] h-[48px] rounded-[8px] border-[1px] border-[var(--textarea-border)] bg-[var(--sem-fill-norm)] px-[16px] py-[12px] shadow-none placeholder:text-[var(--indicator-disabled)] placeholder:text-[14px]"
            placeholder="텍스트를 입력해주세요."
            onChange={(e) => setMood(e.target.value)}
          />
        </div>
        {/* 이동 버튼 */}
        <div className="w-full h-fit flex gap-[18px] justify-end">
          <DefaultButtonCancel
            w={72}
            h={45}
            text="이전"
            textSize={18}
            onClick={() => prev()}
          />
          <DefaultButtonConfirm
            w={72}
            h={45}
            text="다음"
            textSize={18}
            onClick={() => canNext && next()}
            isActive={canNext}
          />
        </div>
      </div>
    </section>
  );
};

export default SelectMoodSection;
