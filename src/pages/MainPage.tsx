import PopularSection from "@/components/mainPage/PopularSection";
import ThemeSection from "@/components/mainPage/ThemeSection";
import AiRecSection from "@/components/mainPage/AiRecSection";
import SearchSection from "@/components/mainPage/SearchSection";
import MainContainer from "@/components/layout/MainContainer";
import ScrollToTopButton from "@/components/common/ScrollToTopButton";

const MainPage = () => {
  return (
    <div>
      <title>어다가냥?같이가개! | 반려동물과 함께하는 생활</title>
      <meta name="description" content="어디가냥?같이가개! 메인 페이지" />
      <meta
        property="og:title"
        content="어다가냥?같이가개! | 반려동물과 함께하는 생활"
      />
      <meta
        property="og:description"
        content="어디가냥?같이가개! 메인 페이지"
      />
      <meta property="og:image" content="/assets/images/og_thumbnail.jpg" />
      <meta
        property="og:url"
        content="https://frontend-dev-bukp.onrender.com/"
      />
      <meta property="og:type" content="website" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:title"
        content="어다가냥?같이가개! | 반려동물과 함께하는 생활"
      />
      <meta
        name="twitter:description"
        content="어디가냥?같이가개! 메인 페이지"
      />
      <meta name="twitter:image" content="/assets/images/og_thumbnail.jpg" />

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
