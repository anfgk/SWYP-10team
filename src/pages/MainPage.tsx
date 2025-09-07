import PopularSection from "@/components/mainPage/PopularSection";
import ThemeSection from "@/components/mainPage/ThemeSection";
import AiRecSection from "@/components/mainPage/AiRecSection";
import SearchSection from "@/components/mainPage/SearchSection";
import MainContainer from "@/components/layout/MainContainer";
import ScrollToTopButton from "@/components/common/ScrollToTopButton";

const MainPage = () => {
  return (
    <div>
      <title>어디가냥?같이가개! | 반려동물과 함께하는 생활</title>
      <meta name="description" content="어디가냥?같이가개! 메인 페이지" />

      <SearchSection />
      <MainContainer>
        <ThemeSection />
        <PopularSection />
        <AiRecSection />
        <ScrollToTopButton />
      </MainContainer>
    </div>
  );
};

export default MainPage;
