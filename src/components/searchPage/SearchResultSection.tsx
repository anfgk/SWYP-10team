import SearchResultList from "./SearchResultList";
import SortButton from "../common/SortButton";
import { useSearchListSection } from "@/hooks/useSearchListSection";
import { useLocationStore } from "@/stores/locationStore";

const SearchResultSection = () => {
  const {
    sort,
    loading,
    resultList,
    slicedData,
    visibleCount,
    sortedData,
    observerRef,
    setSort,
  } = useSearchListSection();

  const { isCoordsSet } = useLocationStore();

  return (
    <section className="w-full flex flex-col gap-[32px] pt-[44px] pb-[32px] ">
      <div className="w-full h-[55px] flex justify-between border-b-[1px]">
        <p className="font-semibold text-[24px] ">검색결과</p>
        <div className="w-fit h-[38px] flex gap-[12px]">
          <SortButton
            name={"인기 순"}
            isActive={sort === "popular"}
            onToggle={() =>
              setSort((prev) => (prev === "popular" ? "" : "popular"))
            }
          />
          <SortButton
            name={"최신 순"}
            isActive={sort === "latest"}
            onToggle={() =>
              setSort((prev) => (prev === "latest" ? "" : "latest"))
            }
          />
          <SortButton
            name={"거리 순"}
            isActive={sort === "distance"}
            onToggle={() => {
              if (isCoordsSet) {
                setSort((prev) => (prev === "distance" ? "" : "distance"));
              } else {
                alert("위치 정보 허용이 필요합니다.");
              }
            }}
          />
        </div>
      </div>
      {loading ? (
        <p className="text-center text-[14px] text-[var(--place-neutral)] py-8">
          불러오는 중...
        </p>
      ) : resultList.length > 0 ? (
        <SearchResultList searchDataList={slicedData} />
      ) : (
        <p className="text-center text-[14px] text-[var(--place-neutral)] py-8 border-t-1 border-b-1">
          선택된 조건에 해당하는 검색 결과가 없습니다.
        </p>
      )}

      {/* 관찰 대상 div */}
      {visibleCount < sortedData.length && (
        <div ref={observerRef} className="h-[1px]" />
      )}
    </section>
  );
};

export default SearchResultSection;
