import React, { useState } from "react";
import CommentList, { type ReviewType } from "@/components/CommentList";
import PlaceInfoSection, {
  type PlaceType,
} from "@/components/PlaceInfoSection";

const place: PlaceType = {
  id: 1,
  name: "장소이름",
  images: [
    "https://placehold.co/300x300?text=1",
    "https://placehold.co/300x300?text=2",
    "https://placehold.co/300x300?text=3",
  ],
  description: "상기 사진 장소에 대한 설명.",
  location: "제주도 제주시",
  tags: ["#반냥이", "#멍냥이", "#냥냥이"],
  contact: "ex) 문의 및 안내: 123-456",
  address: "땅끝마을",
  map: "지도",
  reviews: Array.from({ length: 10 }).map((_, i) => ({
    id: i + 1,
    user: `댕냥이${i + 1}`,
    date: `2025.7.${i + 1}`,
    like: 6 + i,
    content: `너무 좋았어요 ${i + 1}`,
    images: ["", "", ""],
  })),
  reviewCount: 10,
};

const REVIEWS_PER_PAGE = 3;

const PlaceDetail: React.FC = () => {
  const [comment, setComment] = useState("");
  const [visibleReviews, setVisibleReviews] = useState(REVIEWS_PER_PAGE);

  const handleShowMore = () => {
    setVisibleReviews((prev) =>
      Math.min(prev + REVIEWS_PER_PAGE, place.reviews.length)
    );
  };

  return (
    <div className="w-full flex flex-col items-center bg-white min-h-screen">
      <PlaceInfoSection place={place} />
      <div className="w-full max-w-3xl">
        <div className="mb-4">
          <textarea
            className="w-full border rounded p-2 mb-2"
            rows={2}
            placeholder="리뷰를 작성해 주세요"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <div className="flex gap-2 justify-end">
            <button className="px-4 py-1 border rounded">취소</button>
            <button className="px-4 py-1 border rounded bg-gray-100">
              저장
            </button>
          </div>
        </div>
        <CommentList
          reviews={place.reviews}
          visibleReviews={visibleReviews}
          handleShowMore={handleShowMore}
        />
      </div>
    </div>
  );
};

export default PlaceDetail;
