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

  useEffect(() => {
    const loadReviews = () => {
      const savedReviews = JSON.parse(localStorage.getItem("reviews") || "[]");
      if (savedReviews.length > 0) {
        setReviews(savedReviews);
      } else {
        localStorage.setItem("reviews", JSON.stringify(dummyReviews));
        setReviews(dummyReviews);
      }
    };
    loadReviews();
  }, []);

  useEffect(() => {
    const handleFocus = () => {
      const savedReviews = JSON.parse(localStorage.getItem("reviews") || "[]");
      if (savedReviews.length > 0) {
        setReviews(savedReviews);
      }
    };
    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, []);

  const handleEdit = (item: any) => {
    setEditingId(item.id);
    setEditText(item.review);
  };

  const handleSaveEdit = (id: number, text: string) => {
    const updatedReviews = reviews.map((review) =>
      review.id === id
        ? { ...review, review: text, hasReview: text.trim() !== "" }
        : review
    );
    setReviews(updatedReviews);
    localStorage.setItem("reviews", JSON.stringify(updatedReviews));
    setEditingId(null);
    setEditText("");
  };

  const handleRatingChange = (id: number, rating: number) => {
    const updatedReviews = reviews.map((review) =>
      review.id === id ? { ...review, rating } : review
    );
    setReviews(updatedReviews);
    localStorage.setItem("reviews", JSON.stringify(updatedReviews));
  };

  const handleDelete = (item: any) => {
    if (window.confirm("리뷰를 삭제하시겠습니까?")) {
      const updatedReviews = reviews.filter((review) => review.id !== item.id);
      setReviews(updatedReviews);
      localStorage.setItem("reviews", JSON.stringify(updatedReviews));
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-black mt-9">방문한 장소</h2>
      {reviews.map((item) => (
        <ReviewItem
          key={item.id}
          item={item}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onSaveEdit={handleSaveEdit}
          onRatingChange={handleRatingChange}
          editingId={editingId}
          editText={editText}
          setEditText={setEditText}
        />
      ))}
    </div>
  );
};

export default ReviewList;
