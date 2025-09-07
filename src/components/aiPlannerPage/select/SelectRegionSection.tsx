import { SIDO_CODE } from "@/configs/searchConstants";
import OptionSelectButton from "./OptionSelectButton";
import { usePlannerSelectionStore } from "@/stores/plannerSelectionStore";

const SelectRegionSection = () => {
  const { region, setRegion } = usePlannerSelectionStore();

  return (
    <section className="flex flex-col gap-[24px] w-full h-[182px] ">
      <h2 className="w-full h-[58px] font-semibold text-[18px]">
        어디로 갈까요?
        <br />
        지역을 선택해주세요.
      </h2>
      {/* 지역 칩 */}
      <div className="w-full h-[100px] flex gap-[16px] flex-wrap">
        {Object.keys(SIDO_CODE).map((current, i) => (
          <OptionSelectButton
            key={i}
            w={76}
            value={current}
            isActive={SIDO_CODE[current] === region}
            onClick={() => setRegion(SIDO_CODE[current])}
          />
        ))}
      </div>
    </section>
  );
};

export default SelectRegionSection;
