import PopularSection from "@/components/mainPage/PopularSection";
import ThemeSection from "@/components/mainPage/ThemeSection";
import AiRecSection from "@/components/mainPage/AiRecSection";
import SearchSection from "@/components/mainPage/SearchSection";
import MainContainer from "@/components/layout/MainContainer";
import ScrollToTopButton from "@/components/common/ScrollToTopButton";

const MainPage = () => {
  return (
    <div>
      <ScrollToTopButton />
      <SearchSection />
      <MainContainer>
        <ThemeSection />
        <PopularSection />
        <AiRecSection />
      </MainContainer>
    </div>
  );
};

export default MainPage;
