import type { PlannerDayPlan } from "@/types/apiResponseTypes";
import ResultInfoSection from "./ResultInfoSection";
import ResultListSection from "./ResultListSection";

interface Props {
  setDay: (day: number) => void;
  day: number;
  totalDays: number;
  filteredData: PlannerDayPlan;
  distance: number;
}

const ResultSection = ({
  setDay,
  totalDays,
  day,
  filteredData,
  distance,
}: Props) => {
  return (
    <section
      className={`w-full overflow-y-auto h-fit bg-white rounded-[24px] p-[24px] scrollbar-style`}
      style={{
        boxShadow: `0px 0px 1px 0px rgba(0, 0, 0, 0.08),
            0px 1px 4px 0px rgba(0, 0, 0, 0.08),
            0px 2px 8px 0px rgba(0, 0, 0, 0.12)`,
      }}
    >
      <ResultInfoSection
        setDay={setDay}
        totalDays={totalDays}
        day={day}
        distance={distance}
      />
      <ResultListSection filteredData={filteredData} />
    </section>
  );
};

export default ResultSection;
