import { regionMap, scheduleOptions } from "@/configs/searchConstants";
import OptionSelectButton from "./OptionSelectButton";
import DefaultButtonConfirm from "../common/DefaultButtonConfirm";
import { usePlannerSelectionStore } from "@/stores/plannerSelectionStore";
import { usePlannerStep } from "@/hooks/usePlannerStep";

const SelectRegionSection = () => {
  const { region, schedule, setRegion, setSchedule } =
    usePlannerSelectionStore();
  const { next } = usePlannerStep();
  const canNext = !!region && !!schedule;
  return (
    <section className="my-[68px] mx-auto flex flex-col gap-[32px] w-[1112px] h-[793px] ">
      <div className="w-full h-[500px] flex flex-col justify-between">
        {/* 지역 선택 */}
        <section className="w-full h-fit flex flex-col gap-[32px]">
          {/* 지역 제목 */}
          <div className="w-fit h-[128px] flex flex-col gap-[8px]">
            <h2 className="font-semibold text-[40px]">어디로 갈까요?</h2>
            <h2 className="font-semibold text-[40px]">지역을 선택해주세요.</h2>
          </div>
          {/* 지역 칩 */}
          <div className="w-full h-[100px] flex gap-[16px] flex-wrap">
            {Object.keys(regionMap).map((current, i) => (
              <OptionSelectButton
                key={i}
                w={76}
                value={current}
                isActive={current === region}
                onClick={() => setRegion(current)}
              />
            ))}
          </div>
        </section>
        {/* 일정 선택 */}
        <section className="w-full h-fit flex flex-col gap-[32px] mb-[32px]">
          {/* 일정 제목 */}
          <h2 className="font-semibold text-[40px]">일정을 선택해주세요.</h2>
          {/* 일정 칩 */}
          <div className="w-full h-[38px] flex gap-[25px]">
            {scheduleOptions.map((current, i) => (
              <OptionSelectButton
                key={i}
                w={100}
                value={current}
                isActive={current === schedule}
                onClick={() => setSchedule(current)}
              />
            ))}
          </div>
        </section>
      </div>
      {/* 다음 버튼 */}
      <div className="w-full h-fit flex justify-end">
        <DefaultButtonConfirm
          w={72}
          h={45}
          text="다음"
          textSize={18}
          onClick={() => canNext && next()}
          isActive={canNext}
        />
      </div>
    </section>
  );
};

export default SelectRegionSection;
