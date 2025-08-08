import { useEffect, useState } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

interface RecentItem {
  id: number;
  name: string;
  image?: string;
  imageUrl?: string;
  address?: string;
  category?: string;
  rating?: number;
}

const RecentPlaces = () => {
  const [recentList, setRecentList] = useState<RecentItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handlePrevSlide = () => {
    setCurrentIndex(
      currentIndex === 0 ? recentList.length - 5 : currentIndex - 1
    );
  };

  const handleNextSlide = () => {
    setCurrentIndex(
      currentIndex >= recentList.length - 5 ? 0 : currentIndex + 1
    );
  };

  const loadRecentPlaces = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}api/mypage/history`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI3IiwiZW1haWwiOiJnbG9yaWEwMjA1MTBAZ21haWwuY29tIiwiZGlzcGxheU5hbWUiOiLsoJXtlZgiLCJpYXQiOjE3NTQzODQ4MDQsImV4cCI6MTc2MjE2MDgwNH0.4WXOk_zOhE8ndDtB3zXfwKNi_1Lapv3Z1-seMIgv8fg`,
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API 에러 응답:", errorText);
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${errorText}`
        );
      }

      // 응답이 JSON인지 확인
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const responseText = await response.text();
        console.error("JSON이 아닌 응답:", responseText);
        throw new Error("API가 JSON을 반환하지 않습니다");
      }

      const data = await response.json();
      const historyData = data?.data || data?.history || data;

      if (historyData && Array.isArray(historyData) && historyData.length > 0) {
        setRecentList(historyData);
      } else if (historyData && !Array.isArray(historyData)) {
        // 단일 객체인 경우 배열로 변환
        setRecentList([historyData]);
      } else {
        setRecentList([]);
      }
    } catch (error) {
      console.error("최근 본 장소 목록 로드 실패:", error);
      setRecentList([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadRecentPlaces();
  }, []);

  const buttonStyle =
    "absolute top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 bg-red-500 text-white hover:bg-red-600 hover:scale-110 cursor-pointer";

  if (isLoading) {
    return <div className="text-center py-12 text-gray-500">로딩 중...</div>;
  }

  if (recentList.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        최근 본 장소가 없습니다.
      </div>
    );
  }

  return (
    <div className="mt-12 mb-16">
      <h2 className="text-xl font-semibold mb-6">최근 본 장소</h2>
      <div className="relative overflow-hidden">
        <div className="flex gap-4 transition-all duration-500 ease-in-out">
          {recentList
            .slice(currentIndex, currentIndex + 5)
            .map((item, index) => (
              <div
                key={`${item.id}-${currentIndex}-${index}`}
                className="flex-shrink-0"
              >
                {item.image || item.imageUrl ? (
                  <img
                    src={item.image || item.imageUrl}
                    alt={item.name}
                    className="w-45 h-30 object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-45 h-30 bg-gray-300 rounded-lg flex items-center justify-center text-gray-500">
                    장소 이미지
                  </div>
                )}

                <div className="mt-2 text-sm font-medium">{item.name}</div>
              </div>
            ))}
        </div>

        {recentList.length > 5 && (
          <>
            <button
              onClick={handlePrevSlide}
              className={`left-0 ${buttonStyle}`}
            >
              <IoChevronBack size={16} />
            </button>

            <button
              onClick={handleNextSlide}
              className={`right-0 ${buttonStyle}`}
            >
              <IoChevronForward size={16} />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default RecentPlaces;
