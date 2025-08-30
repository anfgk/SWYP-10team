import ResultSideBar from "./result/ResultSideBar";
import ResultMapDiv from "./result/ResultMapDiv";

import { usePlannerArticle } from "@/hooks/usePlannerResultArticle";

const PlannerResultArticle = () => {
  const { filteredData, setDay, totalDays, distance, day } =
    usePlannerArticle();
  return (
    <article className="w-full h-screen relative">
      <ResultSideBar
        setDay={setDay}
        filteredData={filteredData}
        distance={distance}
        totalDays={totalDays}
        day={day}
      />

      <ResultMapDiv places={filteredData} />
    </article>
  );
};

export default PlannerResultArticle;
