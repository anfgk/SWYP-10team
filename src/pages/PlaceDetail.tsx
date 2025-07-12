import React, { useState } from "react";
import { useParams } from "react-router-dom";
import CommentList, { type ReviewType } from "@/components/CommentList";

const dummyPlace = {
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
  const { id } = useParams();
  const [imgIdx, setImgIdx] = useState(0);
  const [comment, setComment] = useState("");
  const [visibleReviews, setVisibleReviews] = useState(REVIEWS_PER_PAGE);

  const place = dummyPlace; // 실제로는 id로 데이터 fetch

  const handleShowMore = () => {
    setVisibleReviews((prev) =>
      Math.min(prev + REVIEWS_PER_PAGE, place.reviews.length)
    );
  };

  const handlePrevImg = () => {
    setImgIdx((prev) => (prev === 0 ? place.images.length - 1 : prev - 1));
  };
  const handleNextImg = () => {
    setImgIdx((prev) => (prev === place.images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="w-full flex flex-col items-center bg-white min-h-screen">
      <div className="text-3xl font-bold mt-8 mb-6">{place.name}</div>
      {/* 이미지 슬라이더 */}
      <div className="flex items-center mb-8">
        <button onClick={handlePrevImg}>
          <span className="text-3xl px-4">&#60;</span>
        </button>
        <div className="w-72 h-72 bg-gray-300 flex items-center justify-center text-gray-500 text-lg mx-4 overflow-hidden">
          {place.images[imgIdx] ? (
            <img
              src={place.images[imgIdx]}
              alt={`장소 이미지 ${imgIdx + 1}`}
              className="object-cover w-full h-full"
            />
          ) : (
            "이미지"
          )}
        </div>
        <button onClick={handleNextImg}>
          <span className="text-3xl px-4">&#62;</span>
        </button>
      </div>
      {/* 상세정보 */}
      <div className="w-full max-w-3xl">
        <div className="border-b pb-2 text-lg font-semibold mb-2">상세정보</div>
        <div className="mb-6">{place.description}</div>
        {/* 지도 */}
        <div className="w-full h-40 bg-gray-200 flex items-center justify-center text-2xl text-gray-500 mb-4">
          <span role="img" aria-label="map">
            📍
          </span>{" "}
          지도
        </div>
        <div className="flex flex-wrap gap-2 mb-2">
          {place.tags.map((tag, idx) => (
            <span
              key={idx}
              className="border rounded-full px-2 py-0.5 text-xs text-gray-700"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex gap-8 mb-2">
          <div className="text-sm text-gray-700">{place.location}</div>
          <div className="text-sm text-gray-700">{place.contact}</div>
          <div className="text-sm text-gray-700">주소: {place.address}</div>
        </div>
        {/* 리뷰 */}
        <div className="border-b pb-2 text-lg font-semibold mt-8 mb-2">
          리뷰 {place.reviewCount}건
        </div>
        <div className="flex gap-2 mb-4">
          {Array.from({ length: 7 }).map((_, idx) => (
            <div key={idx} className="w-16 h-16 bg-gray-300" />
          ))}
        </div>
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
        {/* 댓글(리뷰) 리스트 */}
        <CommentList
          reviews={place.reviews as ReviewType[]}
          visibleReviews={visibleReviews}
          handleShowMore={handleShowMore}
        />
      </div>
    </div>
  );
};

export default PlaceDetail;
