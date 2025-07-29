import { useEffect, useState } from "react";
import SearchResultList from "./SearchResultList";
import SearchSortButton from "./SearchSortButton";
import { useSearchParams } from "react-router-dom";
//import { getValueFromURLParams } from "@/lib/searchUtils";

const SearchResultSection = () => {
  const [sort, setSort] = useState<"popular" | "latest" | "">("");
  //const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {}, [searchParams, sort]);
  return (
    <section className="w-full flex flex-col gap-[32px] pt-[44px] pb-[32px] ">
      <div className="w-full h-[55px] flex justify-between border-b-[1px]">
        <p className="font-semibold text-[24px] ">검색결과</p>
        <div className="w-fit h-[38px] flex gap-[12px]">
          <SearchSortButton
            name={"인기순"}
            isActive={sort === "popular"}
            onToggle={() =>
              setSort((prev) => (prev === "popular" ? "" : "popular"))
            }
          />
          <SearchSortButton
            name={"최신순"}
            isActive={sort === "latest"}
            onToggle={() =>
              setSort((prev) => (prev === "latest" ? "" : "latest"))
            }
          />
        </div>
      </div>
      <SearchResultList />
    </section>
  );
};

export default SearchResultSection;
