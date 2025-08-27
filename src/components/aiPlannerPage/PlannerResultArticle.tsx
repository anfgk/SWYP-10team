import { useState } from "react";
import ResultInfoSideBar from "./result/ResultInfoSideBar";
import ResultMapDiv from "./result/ResultMapDiv";

import { usePlannerArticle } from "@/hooks/usePlannerResultArticle";

const PlannerResultArticle = () => {
  const HEADER_H = 72;
  const [isOpen, setIsOpen] = useState(true);

  const { filteredData, setDay } = usePlannerArticle();
  return (
    <article
      className="w-full relative"
      style={{ height: `calc(100svh - ${HEADER_H}px)` }}
    >
      {isOpen && (
        <ResultInfoSideBar onClose={() => setIsOpen(false)} setDay={setDay} />
      )}
      {!isOpen && (
        <button
          className="absolute top-3 left-3 w-10 h-10 cursor-pointer bg-red-700 z-50"
          onClick={() => setIsOpen(true)}
        >
          열기
        </button>
      )}
      <ResultMapDiv places={filteredData} />
    </article>
  );
};

export default PlannerResultArticle;
