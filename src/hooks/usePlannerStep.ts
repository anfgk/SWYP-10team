import { usePlannerSelectionStore } from "@/stores/plannerSelectionStore";
import type { PlannerStep } from "@/types/forFrontTypes";
import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

const usePlannerStep = () => {
  const [params, setParams] = useSearchParams();
  const step: PlannerStep = (params.get("step") as PlannerStep) ?? "select";

  const { region, schedule, mood } = usePlannerSelectionStore();

  // store 내부 값이 바뀔 때 마다 진행가능한 step 여부 출력
  const canEnter = useMemo<Record<PlannerStep, boolean>>(() => {
    const selectReady = !!(region && schedule);
    const moodReady = selectReady && !!mood;
    return {
      select: true,
      mood: selectReady,
      result: moodReady,
    };
  }, [region, schedule, mood]);

  // 쿼리 없을 때 기본 select로 세팅
  useEffect(() => {
    if (!params.get("step")) {
      setParams({ step: "select" }, { replace: true });
    }
  }, [params, setParams]);

  // 진입 불가한 스텝이면 앞단계로 보냄
  useEffect(() => {
    if (canEnter[step]) return;
    if (step === "mood") setParams({ step: "select" }, { replace: true });
    else if (step === "result") setParams({ step: "mood" }, { replace: true });
  }, [step, canEnter, setParams]);

  const go = (newStep: PlannerStep) => setParams({ step: newStep });

  const next = () => {
    if (step === "select" && canEnter.mood) return go("mood");
    if (step === "mood" && canEnter.result) return go("result");
  };
  const prev = () => {
    if (step === "result") return go("mood");
    if (step === "mood") return go("select");
  };

  return { step, go, next, prev, canEnter };
};

export { usePlannerStep };
