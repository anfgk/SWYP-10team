import { usePlannerSelectionStore } from "@/stores/plannerSelectionStore";
import { Input } from "../../ui/input";

const SelectMoodSection = () => {
  const { setMood, mood } = usePlannerSelectionStore();

  return (
    <section className="flex flex-col gap-[16px] w-full h-[93px] ">
      <h2 className="w-full h-[29px] font-semibold text-[18px]">
        아래에 당신의 기분을 입력해주세요.
      </h2>
      {/* text 인풋 */}
      <Input
        className="w-[442px] h-[48px] rounded-[8px] border-[1px] border-[var(--textarea-border)] bg-[var(--sem-fill-norm)] px-[16px] py-[12px] shadow-none placeholder:text-[var(--indicator-disabled)] placeholder:text-[14px]"
        placeholder="텍스트를 입력해주세요."
        value={mood ?? ""}
        onChange={(e) => setMood(e.target.value)}
        maxLength={100}
      />
    </section>
  );
};

export default SelectMoodSection;
