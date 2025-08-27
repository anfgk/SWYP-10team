import ResultButtonSection from "./result/ResultButtonSection";
import ResultInfoSection from "./result/ResultInfoSection";
import ResultMapSection from "./result/ResultMapSection";

import { dummyPlannerPlaces } from "@/configs/dummyData";

const PlannerResultArticle = () => {
  return (
    <article className="py-[96px] flex flex-col gap-[54px] w-full h-[1183px]">
      <div className="w-full h-[901px] flex justify-between">
        <ResultInfoSection />
        <ResultMapSection places={dummyPlannerPlaces} />
      </div>
      <ResultButtonSection />
    </article>
  );
};

export default PlannerResultArticle;
