import { useEffect, useState } from "react";
import type { ReviewData, Review } from "@/types/apiResponseTypes";
import { fetchReviewList } from "@/lib/apiUtils";
import { useAuthStore } from "@/stores/authStore";

interface Props {
  placeId: string;
}

const useReviewList = ({ placeId }: Props) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewData, setReviewData] = useState<ReviewData>();
  const [page, setPage] = useState(0);
  const [sort, setSort] = useState<"r" | "c">("r");
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const { isLoggedIn, accessToken } = useAuthStore();

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
        const data = await fetchReviewList(accessToken || "", page);
        if (controller.signal.aborted) return;

        setReviewData(data);

        setReviews((prev) =>
          page === 0 ? data.reviews : [...prev, ...data.reviews]
        );
        setHasMore(data.hasNext);
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
  }, [page, sort, placeId, isLoggedIn]);

  const handleLoadMore = () => {
    if (loading || !hasMore) return;
    setPage((p) => p + 1);
  };

  return {
    sort,
    reviews,
    hasMore,
    loading,
    reviewData,
    setSort,
    handleLoadMore,
  };
};

export { useReviewList };
