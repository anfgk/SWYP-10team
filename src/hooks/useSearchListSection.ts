import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { createSearchApiParam } from "@/lib/searchUtils";

import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { fetchSmart } from "@/lib/fetchUtils";
import type { SearchCardData } from "@/types/apiResponseTypes";
import { getDistanceInKm } from "@/lib/searchResultCardUtils";
import { useLocationStore } from "@/stores/locationStore";
import { useAuthStore } from "@/stores/authStore";

const useSearchListSection = () => {
  const [sort, setSort] = useState<"popular" | "latest" | "distance" | "">("");
  const [visibleCount, setVisibleCount] = useState(4);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const [resultList, setResultList] = useState<SearchCardData[]>([]);
  const { lon, lat } = useLocationStore();
  const { isLoggedIn } = useAuthStore();

  // 정렬 기능
  const sortedData = useMemo(() => {
    if (sort === "latest") {
      return [...resultList].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    } else if (sort === "popular") {
      return [...resultList].sort((a, b) => b.totalView - a.totalView);
    } else if (sort === "distance") {
      return [...resultList].sort(
        (a, b) =>
          getDistanceInKm(lon!, lat!, a.mapx, a.mapy) -
          getDistanceInKm(lon!, lat!, b.mapx, b.mapy),
      );
    } else {
      return resultList;
    }
  }, [sort, resultList]);

  // 보여질 데이터
  const slicedData = sortedData.slice(0, visibleCount);

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

  //검색 목록 백엔드 api 요청
  useEffect(() => {
    const apiParam = createSearchApiParam(searchParams);

    const fetchSearch = async () => {
      setLoading(true);

      try {
        const res = await fetchSmart(`/api/content/search?${apiParam}`, {
          method: "GET",
        });

        if (res.status === 204) {
          setResultList([]);
          return;
        }

        if (!res.ok) throw new Error("검색 요청 실패");

        const data = await res.json();
        console.log(data);
        setResultList(data);
      } catch (e) {
        console.error("검색 목록 불러오기 실패", e);
      } finally {
        setLoading(false);
      }
    };

    fetchSearch();
  }, [searchParams, isLoggedIn]);

  return {
    sort,
    loading,
    resultList,
    slicedData,
    visibleCount,
    sortedData,
    observerRef,
    setSort,
  };
};

export { useSearchListSection };
