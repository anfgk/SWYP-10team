import type { MyReviewData } from "@/types/apiResponseTypes";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/stores/authStore";
import { fetchWithAuth } from "@/lib/fetchUtils";
import { useNavigate } from "react-router-dom";

const useMyReviewSection = () => {
  const [reviews, setReviews] = useState<MyReviewData[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrevious, setHasPrevious] = useState(false);
  const { accessToken } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const PAGE_SIZE = 4;

  useEffect(() => {
    const fetchMyReviews = async () => {
      try {
        const res = await fetchWithAuth(
          `/api/review/?page=${page}&size=${PAGE_SIZE}`,
          { method: "GET" }
        );

        if (!res.ok) {
          setReviews([]);
          if (res.status === 400) {
            alert("잘못된 요청입니다.");
            navigate("/");
            return;
          } else if (res.status === 404) {
            return;
          }
          throw new Error("내 리뷰 불러오기 실패");
        }

        const data = await res.json();

        if (data?.status === 400) {
          alert("잘못된 요청입니다.");
          navigate("/");
          setReviews([]);
          return;
        } else if (data?.status === 404) {
          setReviews([]);
          return;
        }

        setReviews(data.data.reviews);
        setTotalPages(data.data.totalPages);
        setHasNext(data.data.hasNext);
        setHasPrevious(data.data.hasPrevious);
      } catch (e) {
        console.error("내 리뷰 api 오류: ", e);
      } finally {
        setLoading(false);
      }
    };
    fetchMyReviews();
  }, [accessToken, page]);

  return { loading, reviews, page, totalPages, hasNext, hasPrevious, setPage };
};

export { useMyReviewSection };
