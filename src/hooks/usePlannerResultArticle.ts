import { useEffect, useMemo, useState } from "react";
import { dummyPlannerPlaces } from "@/configs/dummyData";
import type { PlannerMapPlacesData } from "@/types/apiResponseTypes";

const usePlannerArticle = () => {
  const [data, setData] = useState<PlannerMapPlacesData[]>(dummyPlannerPlaces);

  const [day, setDay] = useState(1);

  useEffect(() => {
    //api 호출 부
  }, []);

  const filteredData = useMemo(() => {
    if (day < 4) {
      return data.filter((d) => d.day === day);
    } else {
      return data;
    }
  }, [day]);

  return { filteredData, setDay };
};

export { usePlannerArticle };
