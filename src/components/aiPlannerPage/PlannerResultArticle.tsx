import ResultMapDiv from "./result/ResultMapDiv";

import { dummyPlannerPlaces } from "@/configs/dummyData";

const PlannerResultArticle = () => {
  const HEADER_H = 72;
  return (
    <article
      className="w-full"
      style={{ height: `calc(100svh - ${HEADER_H}px)` }}
    >
      <ResultMapDiv places={dummyPlannerPlaces} />
    </article>
  );
};

export default PlannerResultArticle;
