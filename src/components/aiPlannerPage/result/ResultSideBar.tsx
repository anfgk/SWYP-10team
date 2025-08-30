import type { PlannerMapPlacesData } from "@/types/apiResponseTypes";
import { useState } from "react";
import ResultSideBarIndicator from "./ResultSideBarIndicator";
import ResultSection from "./ResultSection";

interface Props {
  setDay: (day: number) => void;
  day: number;
  totalDays: number;
  filteredData: PlannerMapPlacesData[];
  distance: number;
}

const ResultSideBar = ({
  setDay,
  totalDays,
  day,
  filteredData,
  distance,
}: Props) => {
  const [isResultOpen, setIsResultOpen] = useState(true);
  return (
    <aside
      className="absolute top-[44px] left-[42px] rounded-[24px] w-[405px] h-fit z-50 flex flex-col gap-[16px] "
      style={{ maxHeight: `calc(100svh - 88px)` }}
    >
      <ResultSideBarIndicator
        setIsResultOpen={setIsResultOpen}
        isResultOpen={isResultOpen}
      />

      {isResultOpen && (
        <ResultSection
          setDay={setDay}
          totalDays={totalDays}
          day={day}
          distance={distance}
          filteredData={filteredData}
        />
      )}
    </aside>
  );
};

export default ResultSideBar;
