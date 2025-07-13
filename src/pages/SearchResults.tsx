import React from "react";
import SearchResultCard, {
  type SearchResultPlaceType,
} from "@/components/SearchResultCard";

const dummyResults: SearchResultPlaceType[] = [
  {
    id: 1,
    name: "장소 이름",
    rating: 3.5,
    tags: ["#장소의테마", "#댕댕이", "#냥냥이"],
    location: "제주 제주시",
    distance: "101.39km",
    image: "",
  },
  {
    id: 2,
    name: "장소 이름",
    rating: 3.5,
    tags: ["#댕댕이", "#냥냥이"],
    location: "제주 제주시",
    distance: "101.39km",
    image: "",
  },
  {
    id: 3,
    name: "장소 이름",
    rating: 3.5,
    tags: ["#댕댕이", "#냥냥이"],
    location: "제주 제주시",
    distance: null,
    image: "",
  },
  {
    id: 4,
    name: "장소 이름",
    rating: 3.5,
    tags: ["#댕댕이", "#냥냥이"],
    location: "제주 제주시",
    distance: "101.39km",
    image: "",
  },
];

const SearchResults: React.FC = () => (
  <div className="min-h-screen flex flex-col bg-white">
    <div className="w-full bg-gray-200 py-2 flex items-center px-4">
      <div className="flex-1 flex items-center gap-2">
        <input
          className="border rounded px-3 py-2 w-80"
          placeholder="지역 혹 숙소명 검색"
        />
        <button className="bg-white border rounded px-4 py-2">날짜</button>
        <button className="bg-white border rounded px-4 py-2">카테고리</button>
        <button className="bg-white border rounded px-4 py-2">
          추가 옵션 ▼
        </button>
      </div>
    </div>
    <main className="flex-1 px-32 py-8">
      <div className="text-xl font-semibold mb-8">검색결과</div>
      <div className="flex flex-col gap-12">
        {dummyResults.map((item) => (
          <SearchResultCard key={item.id} place={item} />
        ))}
      </div>
    </main>
  </div>
);

export default SearchResults;
