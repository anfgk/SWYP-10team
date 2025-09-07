import ScrollToTopButton from "@/components/common/ScrollToTopButton";
import MainContainer from "@/components/layout/MainContainer";
import SearchResultSection from "@/components/searchPage/SearchResultSection";
import SearchSectionOnSearch from "@/components/searchPage/SearchSectionOnSearch";

const SearchResultPage = () => {
  return (
    <MainContainer>
      <title>어디가냥?같이가개! | 검색</title>
      <meta name="description" content="어디가냥?같이가개! 검색 페이지" />

      <ScrollToTopButton />
      <SearchSectionOnSearch />
      <SearchResultSection />
    </MainContainer>
  );
};

export default SearchResultPage;
