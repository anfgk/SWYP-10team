import PlannerResultArticle from "@/components/aiPlannerPage/PlannerResultArticle";
import SelectOptionsArticle from "@/components/aiPlannerPage/SelectOptionsArticle";
import MainContainer from "@/components/layout/MainContainer";
import { usePlannerStep } from "@/hooks/usePlannerStep";

const AIPlannerPage = () => {
  const { step } = usePlannerStep();
  return (
    <MainContainer>
      {step === "select" && <SelectOptionsArticle />}
      {step === "result" && <PlannerResultArticle />}
    </MainContainer>
  );
};

export default AIPlannerPage;
