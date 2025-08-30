import { useEffect, useMemo, useState } from "react";
import { dummyPlannerPlaces } from "@/configs/dummyData";
import type { PlannerMapPlacesData } from "@/types/apiResponseTypes";
import { getRouteDistance } from "@/lib/plannerUtils";

const usePlannerArticle = () => {
  const [data, setData] = useState<PlannerMapPlacesData[]>(dummyPlannerPlaces);
  const [totalDays, setTotalDays] = useState(3);

  const [day, setDay] = useState(0);

  useEffect(() => {
    //api 호출 부
  }, []);

  const filteredData = useMemo(() => {
    if (day < 4) {
      return data.filter((d) => d.day === day);
    } else {
      return data;
    }
  }, [day, data]);

  const distance = useMemo(() => {
    return getRouteDistance(filteredData);
  }, [filteredData]);

  return {
    filteredData,
    day,
    setDay,
    totalDays,
    distance,
    //아래 두개는 빌드 오류 막으려고
    setData,
    setTotalDays,
  };
};

export { usePlannerArticle };
