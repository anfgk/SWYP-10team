import { useState, useEffect } from "react";
import ReviewItem from "@/components/mypage/ReviewItem";
import { useAuthStore } from "@/stores/authStore";
import { fetchReviewList } from "@/lib/apiUtils";

const ReviewList = () => {
  const { accessToken } = useAuthStore();
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");

  const loadReviews = async () => {
    if (!accessToken) {
      setError("로그인이 필요합니다.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const data = await fetchReviewList(accessToken);
      setReviews(Array.isArray(data) ? data : []);
    } catch (error) {
      setError("리뷰 목록을 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReviews();
  }, [accessToken]);

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
      <h2 className="text-xl font-semibold text-black mt-9">방문한 장소</h2>
      {reviews.map((review, index) => {
        const item = {
          id: review.id,
          place: review.placeName || review.place,
          review: review.content || review.review,
          hasReview:
            review.hasReview ||
            (review.content && review.content.trim() !== ""),
          rating: review.rating,
          imageBase64s: review.imageBase64s || [],
        };

        return (
          <div key={review.id}>
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
    </div>
  );
};

export default ReviewList;
