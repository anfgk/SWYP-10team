/* eslint-disable react/prop-types */
// import { useState } from "react";
// import { Heart, MapPin, Star } from "lucide-react";

export interface SearchResultPlaceType {
  id: number;
  image: string;
  name: string;
  rating: number;
  tags: string[];
  location: string;
  distance: string | null;
}

interface SearchResultCardProps {
  place: SearchResultPlaceType;
}

const SearchResultCard: React.FC<SearchResultCardProps> = ({ place }) => {
  return (
    <div className="flex gap-8 items-center border-b pb-8">
      {/* 이미지 */}
      <div className="w-48 h-36 bg-gray-300 flex items-center justify-center text-gray-500 text-sm">
        {place.image ? (
          <img
            src={place.image}
            alt={place.name}
            className="object-cover w-full h-full"
          />
        ) : (
          "이미지"
        )}
      </div>
      {/* 정보 */}
      <div className="flex-1 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold">{place.name}</span>
          <span className="text-yellow-500 font-semibold">
            ★ {place.rating}
          </span>
        </div>
        <div className="flex gap-2 mb-1">
          {place.tags.map((tag, idx) => (
            <span
              key={idx}
              className="border rounded-full px-2 py-0.5 text-xs text-gray-700"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="text-gray-700 text-sm">{place.location}</div>
      </div>
      {/* 거리 */}
      <div className="w-32 text-right text-gray-500 text-base">
        {place.distance ? place.distance : "거리 확인 불가"}
      </div>
    </div>
  );
};

export default SearchResultCard;
