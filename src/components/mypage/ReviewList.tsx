import { useState, useEffect } from "react";
import ReviewItem from "@/components/mypage/ReviewItem";

const dummyReviews = [
  {
    id: 1,
    place: "장소명",
    review: "정말 좋은 곳이었어요!",
    hasReview: true,
    rating: 5,
  },
  { id: 2, place: "장소명", review: "", hasReview: false, rating: 0 },
  {
    id: 3,
    place: "장소명",
    review: "괜찮았습니다.",
    hasReview: true,
    rating: 3,
  },
];

const ReviewList = () => {
  const [reviews, setReviews] = useState(dummyReviews);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");

  // 처음에 무조건 한 번 실행
  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    try {
      const response = await fetch("/api/user/reviews");
      const data = await response.json();
      setReviews(data.reviews || dummyReviews);
      console.log("리뷰 목록 로드 완료:", data);
    } catch (error) {
      console.error("리뷰 목록 로드 실패:", error);
      // 에러가 발생해도 UI는 그대로 유지
    }
  };

  const handleSaveEdit = (id: number, text: string) => {
    const updatedReviews = reviews.map((review) =>
      review.id === id
        ? { ...review, review: text, hasReview: text.trim() !== "" }
        : review
    );
    setReviews(updatedReviews);
    setEditingId(null);
    setEditText("");
  };

  const handleRatingChange = (id: number, rating: number) => {
    const updatedReviews = reviews.map((review) =>
      review.id === id ? { ...review, rating } : review
    );
    setReviews(updatedReviews);
  };

  const handleDelete = (item: any) => {
    const updatedReviews = reviews.filter((review) => review.id !== item.id);
    setReviews(updatedReviews);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-black mt-9">방문한 장소</h2>
      {reviews.map((item, index) => (
        <div key={item.id}>
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
      ))}
    </div>
  );
};

export default ReviewList;
