import type { PlannerMapPlacesData } from "@/types/apiResponseTypes";
import ResultListCard from "./ResultListCard";

interface Props {
  filteredData: PlannerMapPlacesData[];
}

const ResultListSection = ({ filteredData }: Props) => {
  return (
    <section className="w-full flex flex-col gap-[24px]">
      {filteredData.map((data, i) => (
        <ResultListCard key={i} cardData={data} />
      ))}
    </section>
  );
};

export default ResultListSection;
