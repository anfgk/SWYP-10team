import PlannerResultArticle from "@/components/aiPlannerPage/PlannerResultArticle";
import SelectOptionsArticle from "@/components/aiPlannerPage/SelectOptionsArticle";
import { usePlannerStep } from "@/hooks/usePlannerStep";

const AIPlannerPage = () => {
  const { step } = usePlannerStep();
  return (
    <>
      {step === "select" && <SelectOptionsArticle />}
      {step === "result" && <PlannerResultArticle />}
    </>
  );
};

export default AIPlannerPage;
