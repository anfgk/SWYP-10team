import { useState, useEffect } from "react";
import ReviewItem from "@/components/mypage/ReviewItem";
import { useAuthStore } from "@/stores/authStore";
import { fetchReviewList } from "@/lib/apiUtils";
import Pagination from "@/components/mypage/Pagination";

const ReviewList = () => {
  const { accessToken } = useAuthStore();
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrevious, setHasPrevious] = useState(false);
  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const loadReviews = async () => {
    if (!accessToken) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      // 1. 리뷰 목록 불러오기 - fetchReviewList 를 호출했을때 반환되는 값을 data 에 저장
      const data = await fetchReviewList(accessToken, page);
      console.log(data.reviews);
      // 2. data안애 reviews 객체를 배열인지 판단해서 setReviews를 통해 8번째 줄에 있는 reviews에 review 배열을 저장한다.
      setReviews(Array.isArray(data.reviews) ? data.reviews : []);
      setTotalPages(data.totalPages);
      setCurrentPage(data.currentPage);
      setHasNext(data.hasNext);
      setHasPrevious(data.hasPrevious);
    } catch (_error) {
      setError("리뷰 목록을 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReviews();
  }, [page]);

  const handleSaveEdit = (id: number, text: string) => {
    const updatedReviews = reviews.map((review) =>
      review.id === id
        ? { ...review, content: text, hasReview: text.trim() !== "" }
        : review,
    );
    setReviews(updatedReviews);
    setEditingId(null);
    setEditText("");
  };

  const handleDelete = (item: any) => {
    if (window.confirm("리뷰를 삭제하시겠습니까?")) {
      const updatedReviews = reviews.filter((review) => review.id !== item.id);
      setReviews(updatedReviews);
    }
  };

  const handleRatingChange = (id: number, rating: number) => {
    const updatedReviews = reviews.map((review) =>
      review.id === id ? { ...review, rating } : review,
    );
    setReviews(updatedReviews);
  };

  if (loading) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center">
        <p className="text-gray-500">리뷰 목록을 불러오는 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center">
        <p className="text-gray-500">작성한 리뷰가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-black mt-9">
        내가 작성한 리뷰
      </h2>
      {/* 3. 2번에서 저장한 reviews를 array map method를 통해서 반복문을 돌린다. */}
      {reviews.map((review, index) => {
        {
          /* 4. 반복문을 돌면서 item 객체에 리뷰 정보를 담아서 저장한다.*/
        }
        const item = {
          id: review.reviewId,
          place: review.contentTitle,
          review: review.content || review.review,
          hasReview:
            review.hasReview ||
            (review.content && review.content.trim() !== ""),
          rating: review.score,
          reviewImages: review.images || [],
        };

        return (
          <div key={review.reviewId}>
            {/* 5. 리뷰 정보를 담은 item 객체를 ReviewItem 컴포넌트에 전달한다. */}
            <ReviewItem
              item={item}
              onDelete={handleDelete}
              onSaveEdit={handleSaveEdit}
              onRatingChange={handleRatingChange}
              editingId={editingId}
              editText={editText}
              setEditText={setEditText}
            />
            {index < reviews.length - 1 && (
              <div className="border-b border-gray-200 my-4"></div>
            )}
          </div>
        );
      })}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
        setPage={setPage}
        hasNext={hasNext}
        hasPrevious={hasPrevious}
      />
    </div>
  );
};

export default ReviewList;
