import MainHeader from "@/components/MainHeader";
import MainFooter from "@/components/MainFooter";
import React from "react";

const dummyResults = [
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

const SearchResults: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="w-full bg-gray-200 py-2 flex items-center px-4">
        <div className="flex-1 flex items-center gap-2">
          <input
            className="border rounded px-3 py-2 w-80"
            placeholder="지역 혹 숙소명 검색"
          />
          <button className="bg-white border rounded px-4 py-2">날짜</button>
          <button className="bg-white border rounded px-4 py-2">
            카테고리
          </button>
          <button className="bg-white border rounded px-4 py-2">
            추가 옵션 ▼
          </button>
        </div>
      </div>
      {/* 본문 */}
      <main className="flex-1 px-32 py-8">
        <div className="text-xl font-semibold mb-8">검색결과</div>
        <div className="flex flex-col gap-12">
          {dummyResults.map((item) => (
            <div
              key={item.id}
              className="flex gap-8 items-center border-b pb-8"
            >
              {/* 이미지 */}
              <div className="w-48 h-36 bg-gray-300 flex items-center justify-center text-gray-500 text-sm">
                이미지
              </div>
              {/* 정보 */}
              <div className="flex-1 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold">{item.name}</span>
                  <span className="text-yellow-500 font-semibold">
                    ★ {item.rating}
                  </span>
                </div>
                <div className="flex gap-2 mb-1">
                  {item.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="border rounded-full px-2 py-0.5 text-xs text-gray-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="text-gray-700 text-sm">{item.location}</div>
              </div>
              {/* 거리 */}
              <div className="w-32 text-right text-gray-500 text-base">
                {item.distance ? `${item.distance}` : "거리 확인 불가"}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default SearchResults;
