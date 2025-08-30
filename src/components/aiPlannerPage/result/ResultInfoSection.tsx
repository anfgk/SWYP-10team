import { useAuthStore } from "@/stores/authStore";
import OptionSelectButton from "../select/OptionSelectButton";
import { usePlannerSelectionStore } from "@/stores/plannerSelectionStore";
import ResultDescDiv from "./ResultDescDiv";

interface Props {
  setDay: (day: number) => void;
  totalDays: number;
  distance: number;
  day: number;
}

const ResultInfoSection = ({ setDay, day, totalDays, distance }: Props) => {
  const { user } = useAuthStore();
  const { region, schedule } = usePlannerSelectionStore();
  return (
    <section className="w-full h-fit flex flex-col gap-[24px] mb-[32px]">
      {/* 날짜 선택 버튼 */}
      <div className="w-full h-[38px] flex gap-[16px]">
        {Array.from({ length: totalDays }).map((_, i) => (
          <OptionSelectButton
            key={i}
            w={85}
            value={`DAY${i + 1}`}
            isActive={day === i}
            onClick={() => setDay(i)}
          />
        ))}
      </div>
      {/* overview 섹션 */}
      <div className="w-full h-[128px] flex flex-col gap-[8px] border-b-[1px] border-[var(--search-element-border)]">
        <h4 className="w-full h-[29px] flex items-center text-[18px] font-semibold break-keep">
          {user?.name}님을 위한 여행코스
        </h4>
        <div className="w-full h-[74px] flex flex-col gap-[4px]">
          <ResultDescDiv type="총 이동거리" value={distance + "km"} />
          <ResultDescDiv type="여행지역" value={region ?? ""} />
          <ResultDescDiv type="여행일정" value={schedule ?? ""} />
        </div>
      </div>
    </section>
  );
};

export default ResultInfoSection;
