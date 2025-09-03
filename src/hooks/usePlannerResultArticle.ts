import { useEffect, useMemo, useState } from "react";
import type { PlannerDayPlan } from "@/types/apiResponseTypes";
import { getRouteDistance } from "@/lib/plannerUtils";
import { usePlannerSelectionStore } from "@/stores/plannerSelectionStore";
import { fetchWithAuth } from "@/lib/fetchUtils";
import { useNavigate } from "react-router-dom";

const usePlannerArticle = () => {
  const [data, setData] = useState<PlannerDayPlan[]>([]);
  const [totalDays, setTotalDays] = useState(1);
  const [day, setDay] = useState(1);

  const { region, schedule, mood } = usePlannerSelectionStore();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlanner = async () => {
      setLoading(true);

      try {
        const res = await fetchWithAuth("/api/planner/recommend", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            duration: schedule,
            sidoCode: region,
            mood: mood,
          }),
        });

        if (res.status === 404) {
          const data = await res.json();
          alert(data.message);
          navigate("/aiplanner?step=select");
          return;
        }

        if (!res.ok) throw new Error("플래너 요청 실패");

        const data = await res.json();

        console.log(data.data.dayPlans.length);
        setData(data.data.dayPlans);
        setTotalDays(data.data.dayPlans.length);
      } catch (e) {
        console.error("플래너 요청 함수 에러: ", e);
      } finally {
        setLoading(false);
      }
    };

    fetchPlanner();
  }, [region, schedule, mood]);

  const filteredData = useMemo(() => {
    if (day < 4) {
      return data.find((d) => d.day === day);
    } else {
      return undefined;
    }
  }, [day, data]);

  const distance = useMemo(() => {
    return getRouteDistance(filteredData?.dayContents ?? []);
  }, [filteredData]);

  return {
    filteredData,
    day,
    setDay,
    loading,
    totalDays,
    distance,
  };
};

export { usePlannerArticle };
