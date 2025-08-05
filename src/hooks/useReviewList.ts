import { useEffect, useState } from "react";
import type { ReviewData } from "@/types/apiResponseTypes";
import { fetchSmart } from "@/lib/fetchUtils";
interface Props {
  placeId: string;
}

const useReviewList = ({ placeId }: Props) => {
  const [reviews, setReviews] = useState<ReviewData[]>([]);
  const [page, setPage] = useState(0);
  const [sort, setSort] = useState<"r" | "c">("r");
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const SIZE = 4;

  useEffect(() => {
    // 정렬 변경 시 초기화 후 첫 페이지 불러오기
    setPage(0);
    setHasMore(true);
    setReviews([]);
  }, [sort, placeId]);

  useEffect(() => {
    const controller = new AbortController();

    const fetchReviews = async () => {
      setLoading(true);

      try {
        const res = await fetchSmart(
          `/api/review/content/${placeId}?contentId=${placeId}&sort=${sort}&page=${page}&size=${SIZE}`,
          { method: "GET" }
        );
        if (!res.ok) throw new Error("리뷰 요청 실패");

        const data = await res.json();
        if (controller.signal.aborted) return;

        setReviews((prev) =>
          page === 0 ? data.data : [...prev, ...data.data]
        );
        setHasMore(data.data.length === SIZE);
      } catch (e) {
        console.error("리뷰 불러오기 실패", e);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();

    return () => {
      controller.abort();
    };
  }, [page, sort, placeId]);

  const handleLoadMore = () => {
    if (loading || !hasMore) return;
    setPage((p) => p + 1);
  };

  return { sort, setSort, reviews, hasMore, loading, handleLoadMore };
};

export { useReviewList };
