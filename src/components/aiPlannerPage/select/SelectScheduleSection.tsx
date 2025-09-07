import { scheduleOptionsWithKey } from "@/configs/searchConstants";
import OptionSelectButton from "./OptionSelectButton";
import { usePlannerSelectionStore } from "@/stores/plannerSelectionStore";

const SelectScheduleSection = () => {
  const { schedule, setSchedule } = usePlannerSelectionStore();
  return (
    <section className="w-full h-[91px] flex flex-col gap-[24px]">
      {/* 일정 제목 */}
      <h2 className="w-full h-[29px] font-semibold text-[18px]">
        일정을 선택해주세요.
      </h2>
      {/* 일정 칩 */}
      <div className="w-full h-[38px] flex gap-[16px]">
        {Object.keys(scheduleOptionsWithKey).map((current, i) => (
          <OptionSelectButton
            key={i}
            w={104}
            value={current}
            isActive={scheduleOptionsWithKey[current] === schedule}
            onClick={() => setSchedule(scheduleOptionsWithKey[current])}
          />
        ))}
      </div>
    </section>
  );
};

export default SelectScheduleSection;
