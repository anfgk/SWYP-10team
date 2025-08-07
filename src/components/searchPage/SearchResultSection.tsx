import { useEffect, useState, useMemo } from "react";
import SearchResultList from "./SearchResultList";
import SortButton from "../common/SortButton";
import { useSearchParams } from "react-router-dom";
import { createSearchApiParam } from "@/lib/searchUtils";

import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { testSearchData } from "@/configs/dummyData";
import { fetchSmart } from "@/lib/fetchUtils";

const SearchResultSection = () => {
  const [sort, setSort] = useState<"popular" | "latest" | "">("");
  const [visibleCount, setVisibleCount] = useState(4);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const [resultList, setResultList] = useState([]);

  // 정렬 기능
  const sortedData = useMemo(() => {
    if (sort === "latest") {
      return [...testSearchData].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } else if (sort === "popular") {
      return [...testSearchData].sort((a, b) => b.heartCount - a.heartCount);
    } else {
      return testSearchData;
    }
  }, [sort]);

  // 보여질 데이터
  const slicedData = resultList.slice(0, visibleCount);

  //무한 스크롤 콜백
  const loadMore = () => {
    if (visibleCount < sortedData.length) {
      setVisibleCount((prev) => prev + 4);
    }
  };

  const observerRef = useInfiniteScroll(loadMore);

  //정렬 바뀔때마다 갯수 4개로 초기화
  useEffect(() => {
    setVisibleCount(4);
  }, [sort]);

  useEffect(() => {
    // 백엔드 api 자리
    const apiParam = createSearchApiParam(searchParams);

    const fetchSearch = async () => {
      setLoading(true);

      try {
        const res = await fetchSmart(`/api/content/search?${apiParam}`, {
          method: "GET",
        });

        if (!res.ok) throw new Error("검색 요청 실패");

        const data = await res.json();
        console.log(apiParam.toString());
        console.log(`/api/content/search?${apiParam}`);
        console.log(data);
      } catch (e) {
        console.error("검색 목록 불러오기 실패", e);
      } finally {
        setLoading(false);
      }
    };

    fetchSearch();
  }, [searchParams, sort]);

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
