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

      // API 문서에 맞게 page와 size 파라미터 추가
      const page = 0; // 최근 본 장소는 첫 페이지만 로드
      const size = 20; // 충분한 수의 아이템 로드

      const url = new URL(
        `${import.meta.env.VITE_API_BASE_URL}api/mypage/history`
      );
      url.searchParams.append("page", page.toString());
      url.searchParams.append("size", size.toString());

      console.log("요청 URL:", url.toString()); // 디버깅용 로그

      const response = await fetch(url.toString(), {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI3IiwiZW1haWwiOiJnbG9yaWEwMjA1MTBAZ21haWwuY29tIiwiZGlzcGxheU5hbWUiOiLsoJXtlZgiLCJpYXQiOjE3NTQzODQ4MDQsImV4cCI6MTc2MjE2MDgwNH0.4WXOk_zOhE8ndDtB3zXfwKNi_1Lapv3Z1-seMIgv8fg`,
        },
      });

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
      console.log("최근 본 장소 API 응답 데이터:", data); // 디버깅용 로그
      console.log("응답 데이터 타입:", typeof data); // 디버깅용 로그
      console.log("응답 데이터 키들:", Object.keys(data || {})); // 디버깅용 로그

      // 다양한 응답 구조 시도
      let historyData = null;

      if (data?.data && Array.isArray(data.data)) {
        historyData = data.data;
        console.log("data.data에서 찾음 (배열):", historyData);
      } else if (data?.data && !Array.isArray(data.data)) {
        historyData = data.data;
        console.log("data.data에서 찾음 (객체):", historyData);
      } else if (data?.content) {
        historyData = data.content;
        console.log("data.content에서 찾음:", historyData);
      } else if (data?.history) {
        historyData = data.history;
        console.log("data.history에서 찾음:", historyData);
      } else if (data?.places) {
        historyData = data.places;
        console.log("data.places에서 찾음:", historyData);
      } else if (Array.isArray(data)) {
        historyData = data;
        console.log("data가 배열임:", historyData);
      } else {
        historyData = data;
        console.log("data 그대로 사용:", historyData);
      }

      // 데이터가 비어있거나 없는 경우 기본 데이터 생성
      if (
        !historyData ||
        (Array.isArray(historyData) && historyData.length === 0)
      ) {
        console.log("데이터가 비어있어서 기본 데이터를 생성합니다.");

        // 기본 데이터 생성 (테스트용)
        const defaultData = [
          {
            id: 1,
            name: "강남구 반려동물 카페",
            image: "/assets/samples/popularcard_sample.jpg",
            imageUrl: "/assets/samples/popularcard_sample.jpg",
            address: "서울 강남구",
            category: "카페",
            rating: 4.5,
          },
          {
            id: 2,
            name: "홍대 반려동물 공원",
            image: "/assets/samples/aicard_sample.jpg",
            imageUrl: "/assets/samples/aicard_sample.jpg",
            address: "서울 마포구",
            category: "공원",
            rating: 4.2,
          },
          {
            id: 3,
            name: "이태원 반려동물 샵",
            image: "/assets/samples/resultcard_sample.jpg",
            imageUrl: "/assets/samples/resultcard_sample.jpg",
            address: "서울 용산구",
            category: "샵",
            rating: 4.0,
          },
        ];

        setRecentList(defaultData);
        return;
      }

      if (historyData && Array.isArray(historyData) && historyData.length > 0) {
        console.log("배열의 첫 번째 아이템 구조:", historyData[0]); // 디버깅용 로그
        console.log(
          "첫 번째 아이템의 키들:",
          Object.keys(historyData[0] || {})
        ); // 디버깅용 로그

        // 이미지 필드 매핑 개선 - 더 많은 필드명 시도
        const mappedData = historyData.map((item: any, index: number) => {
          console.log(`아이템 ${index} 구조:`, item); // 디버깅용 로그

          const mappedItem = {
            id:
              item.id ||
              item.contentId ||
              item.placeId ||
              item.historyId ||
              item.content_id ||
              item.place_id ||
              index,
            name:
              item.name ||
              item.title ||
              item.placeName ||
              item.contentName ||
              item.place_name ||
              item.content_name ||
              `장소 ${index + 1}`,
            image:
              item.image ||
              item.imageUrl ||
              item.thumbnail ||
              item.thumbnailUrl ||
              item.image_url ||
              item.thumbnail_url ||
              item.img ||
              item.imgUrl,
            imageUrl:
              item.imageUrl ||
              item.image ||
              item.thumbnail ||
              item.thumbnailUrl ||
              item.image_url ||
              item.thumbnail_url ||
              item.img ||
              item.imgUrl,
            address:
              item.address ||
              item.location ||
              item.placeAddress ||
              item.place_address,
            category:
              item.category ||
              item.type ||
              item.placeCategory ||
              item.place_category,
            rating:
              item.rating ||
              item.score ||
              item.placeRating ||
              item.place_rating,
          };

          console.log(`매핑된 아이템 ${index}:`, mappedItem); // 디버깅용 로그
          return mappedItem;
        });

        console.log("최종 매핑된 최근 본 장소 데이터:", mappedData); // 디버깅용 로그
        setRecentList(mappedData);
      } else if (historyData && !Array.isArray(historyData)) {
        console.log("단일 객체 구조:", historyData); // 디버깅용 로그
        console.log("단일 객체의 키들:", Object.keys(historyData || {})); // 디버깅용 로그

        // 단일 객체인 경우 배열로 변환
        const mappedItem = {
          id:
            historyData.id ||
            historyData.contentId ||
            historyData.placeId ||
            historyData.historyId ||
            historyData.content_id ||
            historyData.place_id ||
            1,
          name:
            historyData.name ||
            historyData.title ||
            historyData.placeName ||
            historyData.contentName ||
            historyData.place_name ||
            historyData.content_name ||
            "장소",
          image:
            historyData.image ||
            historyData.imageUrl ||
            historyData.thumbnail ||
            historyData.thumbnailUrl ||
            historyData.image_url ||
            historyData.thumbnail_url ||
            historyData.img ||
            historyData.imgUrl,
          imageUrl:
            historyData.imageUrl ||
            historyData.image ||
            historyData.thumbnail ||
            historyData.thumbnailUrl ||
            historyData.image_url ||
            historyData.thumbnail_url ||
            historyData.img ||
            historyData.imgUrl,
          address:
            historyData.address ||
            historyData.location ||
            historyData.placeAddress ||
            historyData.place_address,
          category:
            historyData.category ||
            historyData.type ||
            historyData.placeCategory ||
            historyData.place_category,
          rating:
            historyData.rating ||
            historyData.score ||
            historyData.placeRating ||
            historyData.place_rating,
        };

        console.log("매핑된 단일 최근 본 장소:", mappedItem); // 디버깅용 로그
        setRecentList([mappedItem]);
      } else {
        console.log("데이터가 없거나 빈 배열입니다."); // 디버깅용 로그
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
                    onError={(e) => {
                      console.error(
                        "이미지 로드 실패:",
                        item.image || item.imageUrl
                      );
                      e.currentTarget.style.display = "none";
                      e.currentTarget.nextElementSibling?.classList.remove(
                        "hidden"
                      );
                    }}
                  />
                ) : null}
                <div
                  className={`w-45 h-30 bg-gray-300 rounded-lg flex items-center justify-center text-gray-500 ${item.image || item.imageUrl ? "hidden" : ""}`}
                >
                  장소 이미지
                </div>

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
