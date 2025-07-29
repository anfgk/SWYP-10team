import MainContainer from "@/components/layout/MainContainer";
import SearchResultSection from "@/components/searchPage/SearchResultSection";
import SearchSectionOnSearch from "@/components/searchPage/SearchSectionOnSearch";
import { Toaster } from "sonner";

const SearchResultPage = () => {
  return (
    <MainContainer>
      <Toaster />
      <SearchSectionOnSearch />
      <SearchResultSection />
    </MainContainer>
  );
};

export default SearchResultPage;
