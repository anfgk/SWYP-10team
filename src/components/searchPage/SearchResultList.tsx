import type { SearchCardData } from "@/types/apiResponseTypes";
import SearchResultCard from "./SearchResultCard";

interface Props {
  searchDataList: SearchCardData[];
}
const SearchResultList = ({ searchDataList }: Props) => {
  return (
    <div className="w-full flex flex-col gap-[24px]">
      {searchDataList.map((data) => (
        <SearchResultCard key={data.contentId} cardData={data} />
      ))}
    </div>
  );
};

export default SearchResultList;
