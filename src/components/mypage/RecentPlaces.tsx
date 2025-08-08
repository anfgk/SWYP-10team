import { useState, useEffect } from "react";
import WishCard from "./WishCard";
import { useAuthStore } from "@/stores/authStore";
import { fetchRecentPlaces } from "@/lib/apiUtils";

const RecentPlaces = () => {
  const { accessToken } = useAuthStore();
  const [recentList, setRecentList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadRecentPlaces = async () => {
    if (!accessToken) {
      setError("로그인이 필요합니다.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const data = await fetchRecentPlaces(accessToken);
      setRecentList(Array.isArray(data) ? data : []);
    } catch (error) {
      setError("최근 방문 장소를 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRecentPlaces();
  }, [accessToken]);

  const handleToggleWish = async (id: number) => {
    // 위시리스트 토글 로직
  };

  if (loading) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center">
        <p className="text-gray-500">최근 방문 장소를 불러오는 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (recentList.length === 0) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center">
        <p className="text-gray-500">최근 방문한 장소가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="w-full h-fit flex flex-col gap-[16px]">
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
  );
};

export default RecentPlaces;
