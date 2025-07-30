import type { SearchCardData } from "@/types/types";
import SearchResultCard from "./SearchResultCard";

interface Props {
  searchDataList: SearchCardData[];
}
const SearchResultList = ({ searchDataList }: Props) => {
  return (
    <div className="w-full flex flex-col gap-[24px]">
      {searchDataList.map((data) => (
        <SearchResultCard key={data.id} cardData={data} />
      ))}
    </div>
  );
};

export default SearchResultList;
