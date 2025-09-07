import type { PlannerDayPlan } from "@/types/apiResponseTypes";
import ResultListCard from "./ResultListCard";

interface Props {
  filteredData: PlannerDayPlan;
}

const ResultListSection = ({ filteredData }: Props) => {
  return (
    <section className="w-full flex flex-col gap-[24px]">
      {filteredData.dayContents.map((contents, i) => (
        <ResultListCard
          key={i}
          cardData={contents}
          day={filteredData.day}
          index={i}
        />
      ))}
    </section>
  );
};

export default ResultListSection;
