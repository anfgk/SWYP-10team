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
    { length: Math.min(4, recentList.length) },
    (_, i) => {
      const index = (currentIndex + i) % recentList.length;
      return recentList[index];
    }
  );

  return (
    <div className="mt-12 mb-16">
      <h2 className="text-xl font-semibold mb-6">최근 본 장소</h2>

      {recentList.length <= 5 ? (
        <div className="w-full h-fit flex gap-[16px]">
          {recentList.map((place, index) => (
            <WishCard
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
        <div className="relative overflow-hidden">
          <div className="flex gap-4 transition-all duration-500 ease-in-out">
            {visibleItems.map((item, index) => (
              <div key={`${item.id}-${index}`} className="flex-shrink-0">
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
        </div>
      )}
    </div>
  );
};

export default RecentPlaces;
