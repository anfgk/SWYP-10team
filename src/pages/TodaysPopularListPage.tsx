import MainContainer from "@/components/layout/MainContainer";
import PopularPlacesSection from "@/components/todaysPopularPage/PopularPlacesSection";

const TodaysPopularListPage = () => {
  return (
    <MainContainer>
      <title>어디가냥?같이가개! | 오늘의 인기 장소</title>
      <PopularPlacesSection />
    </MainContainer>
  );
};

export default TodaysPopularListPage;
