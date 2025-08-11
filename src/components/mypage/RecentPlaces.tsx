import { useState, useEffect, useCallback } from "react";
import RecentCard from "@/components/mypage/RecentCard";
import { useAuthStore } from "@/stores/authStore";
import { fetchRecentPlaces } from "@/lib/apiUtils";
import RecentSlide from "@/components/mypage/RecentSlide";

const RecentPlaces = () => {
  const { accessToken } = useAuthStore();
  const [recentList, setRecentList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [slideIndex, setSlideIndex] = useState(0);

  // 슬라이드용 데이터 생성 (4개씩 나누기)
  const slides = [];
  for (let i = 0; i < recentList.length; i += 4) {
    slides.push(recentList.slice(i, i + 4));
  }

  const loadRecentPlaces = useCallback(async () => {
    if (!accessToken) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      // API 호출 시도, 실패하면 더미 데이터 사용
      try {
        const data = await fetchRecentPlaces(accessToken);
        setRecentList(Array.isArray(data) ? data : []);
      } catch (apiError) {}
    } catch (_error) {
      setError("최근 본 장소를 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  }, [accessToken]);

  useEffect(() => {
    loadRecentPlaces();
  }, [loadRecentPlaces]);

  const handleToggleWish = (id: number) => {
    setRecentList((prev) =>
      prev.map((place) =>
        place.id === id ? { ...place, isWished: !place.isWished } : place
      )
    );
  };

  if (loading) {
    return (
      <div className="mt-12 mb-16">
        <h2 className="text-xl font-semibold mb-6">최근 본 장소</h2>
        <div className="w-full h-[200px] flex items-center justify-center">
          <p className="text-gray-500">최근 본 장소를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-12 mb-16">
        <h2 className="text-xl font-semibold mb-6">최근 본 장소</h2>
        <div className="w-full h-[200px] flex items-center justify-center">
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  if (recentList.length === 0) {
    return (
      <div className="mt-12 mb-16 w-[939px]">
        <h2 className="text-xl font-semibold mb-6">최근 본 장소</h2>
        <div className="w-full h-[200px] flex items-center justify-center">
          <p className="text-gray-500">최근 본 장소가 없습니다.</p>
        </div>
      </div>
    );
  }

  // 슬라이드 제어 함수
  const handleNext = () => {
    setSlideIndex((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setSlideIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  console.log("RecentPlaces 디버깅:", {
    recentListLength: recentList.length,
    slidesLength: slides.length,
    slideIndex,
    shouldUseSlide: recentList.length > 4,
  });

  return (
    <div className="mt-12 mb-16 w-[939px]">
      <h2 className="text-xl font-semibold mb-6">최근 본 장소</h2>

      {recentList.length <= 4 ? (
        <div className="w-full h-fit flex gap-[16px]">
          {recentList.map((place, index) => (
            <RecentCard
              key={index}
              id={place.contentId}
              name={place.name || place.title}
              image={place.image || place.imageUrl || place.thumbnail}
              description={place.description}
              isWish={place.isWish || false}
              onToggleWish={handleToggleWish}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center relative w-[939px] h-full">
          <div className="w-full h-full overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-in-out gap-[20px]"
              style={{
                transform: `translateX(-${slideIndex * 939}px)`,
                width: `1px`,
              }}
            >
              {slides.length > 0 &&
                slides.map((slide, i) => (
                  <RecentSlide
                    key={i}
                    placeList={slide}
                    onToggleWish={handleToggleWish}
                  />
                ))}
            </div>
          </div>

          {/* 이동 버튼 */}
          {slides.length > 1 && (
            <>
              <button
                className="absolute left-0 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[40px] h-[40px] cursor-pointer"
                onClick={handlePrev}
              >
                <img
                  src="/assets/buttons/button_left.png"
                  alt="left"
                  className="w-full h-full transition hover:brightness-80"
                />
              </button>
              <button
                className="absolute right-5 translate-x-1/2 top-1/2 -translate-y-1/2 w-[40px] h-[40px] cursor-pointer"
                onClick={handleNext}
              >
                <img
                  src="/assets/buttons/button_right.png"
                  alt="right"
                  className="w-full h-full transition hover:brightness-80"
                />
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default RecentPlaces;
