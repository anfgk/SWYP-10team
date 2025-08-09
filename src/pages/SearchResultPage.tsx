import ScrollToTopButton from "@/components/common/ScrollToTopButton";
import MainContainer from "@/components/layout/MainContainer";
import SearchResultSection from "@/components/searchPage/SearchResultSection";
import SearchSectionOnSearch from "@/components/searchPage/SearchSectionOnSearch";
import { Toaster } from "sonner";

const SearchResultPage = () => {
  return (
    <MainContainer>
      <title>어다가냥?같이가개! | 검색</title>
      <meta name="description" content="어디가냥?같이가개! 검색 페이지" />
      <meta property="og:title" content="어다가냥?같이가개! | 검색" />
      <meta
        property="og:description"
        content="어디가냥?같이가개! 검색 페이지"
      />
      <meta
        property="og:image"
        content="https://frontend-dev-bukp.onrender.com/assets/images/og_thumbnail.jpg"
      />
      <meta property="og:type" content="website" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="어다가냥?같이가개! | 검색" />
      <meta
        name="twitter:description"
        content="어디가냥?같이가개! 검색 페이지"
      />
      <meta
        name="twitter:image"
        content="https://frontend-dev-bukp.onrender.com/assets/images/og_thumbnail.jpg"
      />
      <ScrollToTopButton />
      <Toaster />
      <SearchSectionOnSearch />
      <SearchResultSection />
    </MainContainer>
  );
};

export default SearchResultPage;
