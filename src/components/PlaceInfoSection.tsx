import { useState } from "react";

export interface PlaceType {
  id: number;
  name: string;
  images: string[];
  description: string;
  location: string;
  tags: string[];
  contact: string;
  address: string;
  map: string;
  reviewCount: number;
  reviews: any[];
}

const PlaceInfoSection: React.FC<{ place: PlaceType }> = ({ place }) => {
  const [imgIdx, setImgIdx] = useState(0);

  const handlePrevImg = () => {
    setImgIdx((prev) => (prev === 0 ? place.images.length - 1 : prev - 1));
  };
  const handleNextImg = () => {
    setImgIdx((prev) => (prev === place.images.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
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
        {/* 리뷰 썸네일 */}
        <div className="border-b pb-2 text-lg font-semibold mt-8 mb-2">
          리뷰 {place.reviewCount}건
        </div>
        <div className="flex gap-2 mb-4">
          {Array.from({ length: 7 }).map((_, idx) => (
            <div key={idx} className="w-16 h-16 bg-gray-300" />
          ))}
        </div>
      </div>
    </>
  );
};

export default PlaceInfoSection;
