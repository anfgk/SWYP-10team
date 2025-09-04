import ResultSideBar from "./result/ResultSideBar";
import ResultMapDiv from "./result/ResultMapDiv";

import { usePlannerArticle } from "@/hooks/usePlannerResultArticle";

const PlannerResultArticle = () => {
  const { filteredData, setDay, totalDays, distance, day, loading } =
    usePlannerArticle();
  return (
    <article className="w-full h-screen relative">
      {filteredData && (
        <ResultSideBar
          setDay={setDay}
          filteredData={filteredData}
          distance={distance}
          totalDays={totalDays}
          day={day}
        />
      )}

      {loading ? (
        <p className="text-xl text-[var(--main-color)] font-dunggeunmiso font-bold w-full h-full flex justify-center items-center">
          불러오는 중...
        </p>
      ) : (
        <ResultMapDiv places={filteredData!} />
      )}
    </article>
  );
};

export default PlannerResultArticle;
