import SelectMoodSection from "@/components/aiPlannerPage/SelectMoodSection";
import SelectRegionSection from "@/components/aiPlannerPage/SelectRegionSection";
import MainContainer from "@/components/layout/MainContainer";

const AIPlannerPage = () => {
  return (
    <MainContainer>
      {/* <SelectRegionSection /> */}
      <SelectMoodSection />
    </MainContainer>
  );
};

export default AIPlannerPage;
