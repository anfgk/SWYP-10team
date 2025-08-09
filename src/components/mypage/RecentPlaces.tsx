import { useState, useEffect } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import WishCard from "@/components/mypage/WishCard";
import { useAuthStore } from "@/stores/authStore";
import { fetchRecentPlaces } from "@/lib/apiUtils";

const RecentPlaces = () => {
  const { accessToken } = useAuthStore();
  const [recentList, setRecentList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const loadRecentPlaces = async () => {
    if (!accessToken) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      // 더미 데이터 (네트워크 에러 방지용)
      const dummyData = [
        {
          id: 1,
          name: "한강공원",
          image: "https://picsum.photos/300/200?random=1",
          description: "강아지와 함께 산책하기 좋은 곳",
          isWished: false,
        },
        {
          id: 2,
          name: "올림픽공원",
          image: "https://picsum.photos/300/200?random=2",
          description: "넓은 공간에서 뛰어놀기 좋은 곳",
          isWished: true,
        },
        {
          id: 3,
          name: "여의도공원",
          image: "https://picsum.photos/300/200?random=3",
          description: "도심 속 휴식 공간",
          isWished: false,
        },
      ];

      // API 호출 시도, 실패하면 더미 데이터 사용
      try {
        const data = await fetchRecentPlaces(accessToken);
        setRecentList(Array.isArray(data) ? data : dummyData);
      } catch (apiError) {
        console.warn("API 호출 실패, 더미 데이터 사용:", apiError);
        setRecentList(dummyData);
      }
    } catch (_error) {
      setError("최근 본 장소를 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRecentPlaces();
  }, [accessToken]);

  const handleToggleWish = (id: number) => {
    setRecentList((prev) =>
      prev.map((place) =>
        place.id === id ? { ...place, isWished: !place.isWished } : place
      )
    );
  };

  const handlePrevSlide = () => {
    setCurrentIndex(
      currentIndex === 0 ? Math.max(0, recentList.length - 5) : currentIndex - 1
    );
  };

  const handleNextSlide = () => {
    setCurrentIndex(
      currentIndex >= recentList.length - 5 ? 0 : currentIndex + 1
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
      <div className="mt-12 mb-16">
        <h2 className="text-xl font-semibold mb-6">최근 본 장소</h2>
        <div className="w-full h-[200px] flex items-center justify-center">
          <p className="text-gray-500">최근 본 장소가 없습니다.</p>
        </div>
      </div>
    );
  }

  const visibleItems = Array.from(
    { length: Math.min(5, recentList.length) },
    (_, i) => {
      const index = (currentIndex + i) % recentList.length;
      return recentList[index];
    }
  );

  const buttonStyle =
    "absolute top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 bg-red-500 text-white hover:bg-red-600 hover:scale-110 cursor-pointer z-10";

  return (
    <div className="mt-12 mb-16">
      <h2 className="text-xl font-semibold mb-6">최근 본 장소</h2>

      {recentList.length <= 5 ? (
        <div className="w-full h-fit flex gap-[16px]">
          {recentList.map((place) => (
            <WishCard
              key={place.id}
              id={place.id}
              name={place.name || place.title}
              image={place.image || place.imageUrl || place.thumbnail}
              description={place.description}
              isWished={place.isWished || false}
              onToggleWish={handleToggleWish}
            />
          ))}
        </div>
      ) : (
        <div className="relative overflow-hidden">
          <div className="flex gap-4 transition-all duration-500 ease-in-out">
            {visibleItems.map((item) => (
              <div key={`${item.id}-${currentIndex}`} className="flex-shrink-0">
                <div className="w-45 h-30 bg-gray-300 rounded-lg flex items-center justify-center text-gray-500">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    "장소 이미지"
                  )}
                </div>
                <div className="mt-2 text-sm font-medium">{item.name}</div>
              </div>
            ))}
          </div>

          <button onClick={handlePrevSlide} className={`left-0 ${buttonStyle}`}>
            <IoChevronBack size={16} />
          </button>

          <button
            onClick={handleNextSlide}
            className={`right-0 ${buttonStyle}`}
          >
            <IoChevronForward size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default RecentPlaces;
