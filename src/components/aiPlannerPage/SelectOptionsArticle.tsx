import MainContainer from "../layout/MainContainer";
import ProgressSection from "./select/ProgressSection";
import SelectMoodSection from "./select/SelectMoodSection";
import SelectRegionSection from "./select/SelectRegionSection";
import SelectScheduleSection from "./select/SelectScheduleSection";

const SelectOptionsArticle = () => {
  return (
    <MainContainer>
      <article className="py-[78px] flex flex-col gap-[164px] w-full h-[927px]">
        <SelectRegionSection />
        <SelectScheduleSection />
        <div className="w-full h-[170px] flex flex-col gap-[32px]">
          <SelectMoodSection />
          <ProgressSection />
        </div>
      </article>
    </MainContainer>
  );
};

export default SelectOptionsArticle;
