import { useState, useEffect } from "react";
import ReviewItem from "@/components/mypage/ReviewItem";

// 더미 리뷰 데이터
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
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}api/user/reviews`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI3IiwiZW1haWwiOiJnbG9yaWEwMjA1MTBAZ21haWwuY29tIiwiZGlzcGxheU5hbWUiOiLsoJXtlZgiLCJpYXQiOjE3NTQzODQ4MDQsImV4cCI6MTc2MjE2MDgwNH0.4WXOk_zOhE8ndDtB3zXfwKNi_1Lapv3Z1-seMIgv8fg`,
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API 에러 응답:", errorText);
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${errorText}`
        );
      }

      // 응답이 JSON인지 확인
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const responseText = await response.text();
        console.error("JSON이 아닌 응답:", responseText);
        throw new Error("API가 JSON을 반환하지 않습니다");
      }

      const data = await response.json();

      // API 응답 구조에 따라 데이터 설정
      const reviewData = data?.data || data?.reviews || data;
      if (reviewData && Array.isArray(reviewData) && reviewData.length > 0) {
        setReviews(reviewData);
      } else if (reviewData && !Array.isArray(reviewData)) {
        // 단일 객체인 경우 배열로 변환
        setReviews([reviewData]);
      } else {
        setReviews([]);
      }
    } catch (error) {
      console.error("리뷰 목록 로드 실패:", error);
      // 에러가 발생해도 UI는 그대로 유지
      setReviews([]);
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
