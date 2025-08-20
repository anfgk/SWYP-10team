import PlannerResultSection from "@/components/aiPlannerPage/PlannerResultSection";
import SelectMoodSection from "@/components/aiPlannerPage/SelectMoodSection";
import SelectRegionSection from "@/components/aiPlannerPage/SelectRegionSection";
import MainContainer from "@/components/layout/MainContainer";
import { usePlannerStep } from "@/hooks/usePlannerStep";

const AIPlannerPage = () => {
  const { step } = usePlannerStep();
  return (
    <MainContainer>
      {step === "select" && <SelectRegionSection />}
      {step === "mood" && <SelectMoodSection />}
      {step === "result" && <PlannerResultSection />}
    </MainContainer>
  );
};

export default AIPlannerPage;
