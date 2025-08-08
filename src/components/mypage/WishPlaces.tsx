import { useEffect, useState } from "react";
import WishCard from "@/components/mypage/WishCard";
import Pagination from "@/components/mypage/Pagination";

interface WishItem {
  id: number;
  name: string;
  image?: string;
  description?: string;
  imageUrl?: string;
  address?: string;
  category?: string;
  rating?: number;
}

const WishPlaces = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [wishList, setWishList] = useState<WishItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalItems, setTotalItems] = useState(0);

  // 페이지 변경 시 찜한 장소 목록 로드
  useEffect(() => {
    loadWishPlaces();
  }, [currentPage]);

  // 찜한 장소 목록 로드
  const loadWishPlaces = async () => {
    try {
      setIsLoading(true);

      // API 문서에 맞게 page와 size 파라미터 추가
      const page = currentPage - 1; // API는 0부터 시작하므로 1을 빼줌
      const size = 8;

      const url = new URL(
        `${import.meta.env.VITE_API_BASE_URL}api/mypage/wish`
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
      console.log("찜한 장소 API 응답 데이터:", data); // 디버깅용 로그
      console.log("응답 데이터 타입:", typeof data); // 디버깅용 로그
      console.log("응답 데이터 키들:", Object.keys(data || {})); // 디버깅용 로그

      // 다양한 응답 구조 시도
      let wishData = null;
      let total = 0;

      // 콘솔에서 본 구조에 맞게 수정
      if (data?.data?.wishes) {
        wishData = data.data.wishes;
        total = data.data.totalElements || 0;
        console.log("data.data.wishes에서 찾음:", wishData);
        console.log("총 아이템 수:", total);
      } else if (data?.wishes) {
        wishData = data.wishes;
        total = data.totalElements || 0;
        console.log("data.wishes에서 찾음:", wishData);
        console.log("총 아이템 수:", total);
      } else if (data?.data && Array.isArray(data.data)) {
        wishData = data.data;
        total = data.totalElements || data.total || 0;
        console.log("data.data에서 찾음 (배열):", wishData);
        console.log("총 아이템 수:", total);
      } else if (data?.content) {
        wishData = data.content;
        total = data.totalElements || data.total || 0;
        console.log("data.content에서 찾음:", wishData);
        console.log("총 아이템 수:", total);
      } else if (data?.data && !Array.isArray(data.data)) {
        wishData = data.data;
        total = data.total || data.totalElements || 0;
        console.log("data.data에서 찾음 (객체):", wishData);
        console.log("총 아이템 수:", total);
      } else if (Array.isArray(data)) {
        wishData = data;
        total = data.length;
        console.log("data가 배열임:", wishData);
        console.log("총 아이템 수:", total);
      } else {
        wishData = data;
        total = 0;
        console.log("data 그대로 사용:", wishData);
        console.log("총 아이템 수:", total);
      }

      setTotalItems(total);

      // 데이터가 비어있거나 없는 경우 기본 데이터 생성
      if (!wishData || (Array.isArray(wishData) && wishData.length === 0)) {
        console.log("데이터가 비어있어서 기본 데이터를 생성합니다.");

        // 기본 데이터 생성 (테스트용)
        const defaultData = [
          {
            id: 1,
            name: "강남구 반려동물 카페",
            image: "/assets/samples/popularcard_sample.jpg",
            imageUrl: "/assets/samples/popularcard_sample.jpg",
            description: "반려동물과 함께할 수 있는 카페",
            address: "서울 강남구",
            category: "카페",
            rating: 4.5,
          },
          {
            id: 2,
            name: "홍대 반려동물 공원",
            image: "/assets/samples/aicard_sample.jpg",
            imageUrl: "/assets/samples/aicard_sample.jpg",
            description: "반려동물 산책하기 좋은 공원",
            address: "서울 마포구",
            category: "공원",
            rating: 4.2,
          },
          {
            id: 3,
            name: "이태원 반려동물 샵",
            image: "/assets/samples/resultcard_sample.jpg",
            imageUrl: "/assets/samples/resultcard_sample.jpg",
            description: "반려동물 용품 전문점",
            address: "서울 용산구",
            category: "샵",
            rating: 4.0,
          },
          {
            id: 4,
            name: "신촌 반려동물 병원",
            image: "/assets/samples/popularcard_sample.jpg",
            imageUrl: "/assets/samples/popularcard_sample.jpg",
            description: "반려동물 전문 병원",
            address: "서울 서대문구",
            category: "병원",
            rating: 4.8,
          },
        ];

        setWishList(defaultData);
        setTotalItems(defaultData.length);
        return;
      }

      if (wishData && Array.isArray(wishData) && wishData.length > 0) {
        console.log("배열의 첫 번째 아이템 구조:", wishData[0]); // 디버깅용 로그
        console.log("첫 번째 아이템의 키들:", Object.keys(wishData[0] || {})); // 디버깅용 로그

        // 이미지 필드 매핑 개선 - 더 많은 필드명 시도
        const mappedData = wishData.map((item: any, index: number) => {
          console.log(`아이템 ${index} 구조:`, item); // 디버깅용 로그

          const mappedItem = {
            id:
              item.id ||
              item.contentId ||
              item.placeId ||
              item.wishId ||
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
            description:
              item.description ||
              item.summary ||
              item.address ||
              item.content ||
              item.desc ||
              item.contentDescription,
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

        console.log("최종 매핑된 찜한 장소 데이터:", mappedData); // 디버깅용 로그
        setWishList(mappedData);
      } else if (wishData && !Array.isArray(wishData)) {
        console.log("단일 객체 구조:", wishData); // 디버깅용 로그
        console.log("단일 객체의 키들:", Object.keys(wishData || {})); // 디버깅용 로그

        // 단일 객체인 경우 배열로 변환
        const mappedItem = {
          id:
            wishData.id ||
            wishData.contentId ||
            wishData.placeId ||
            wishData.wishId ||
            wishData.content_id ||
            wishData.place_id ||
            1,
          name:
            wishData.name ||
            wishData.title ||
            wishData.placeName ||
            wishData.contentName ||
            wishData.place_name ||
            wishData.content_name ||
            "장소",
          image:
            wishData.image ||
            wishData.imageUrl ||
            wishData.thumbnail ||
            wishData.thumbnailUrl ||
            wishData.image_url ||
            wishData.thumbnail_url ||
            wishData.img ||
            wishData.imgUrl,
          imageUrl:
            wishData.imageUrl ||
            wishData.image ||
            wishData.thumbnail ||
            wishData.thumbnailUrl ||
            wishData.image_url ||
            wishData.thumbnail_url ||
            wishData.img ||
            wishData.imgUrl,
          description:
            wishData.description ||
            wishData.summary ||
            wishData.address ||
            wishData.content ||
            wishData.desc ||
            wishData.contentDescription,
          address:
            wishData.address ||
            wishData.location ||
            wishData.placeAddress ||
            wishData.place_address,
          category:
            wishData.category ||
            wishData.type ||
            wishData.placeCategory ||
            wishData.place_category,
          rating:
            wishData.rating ||
            wishData.score ||
            wishData.placeRating ||
            wishData.place_rating,
        };

        console.log("매핑된 단일 찜한 장소:", mappedItem); // 디버깅용 로그
        setWishList([mappedItem]);
      } else {
        console.log("찜한 장소 데이터가 없거나 빈 배열입니다."); // 디버깅용 로그
        setWishList([]);
      }
    } catch (error) {
      console.error("찜한 장소 목록 로드 실패:", error);
      setWishList([]);
    } finally {
      setIsLoading(false);
    }
  };

  // 페이지네이션 설정 - API에서 받은 총 아이템 수 사용
  const itemsPerPage = 8;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedWish = wishList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // 찜하기 토글 핸들러
  const handleToggleWish = async (id: number) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}api/mypage/wish/${id}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI3IiwiZW1haWwiOiJnbG9yaWEwMjA1MTBAZ21haWwuY29tIiwiZGlzcGxheU5hbWUiOiLsoJXtlZgiLCJpYXQiOjE3NTQzODQ4MDQsImV4cCI6MTc2MjE2MDgwNH0.4WXOk_zOhE8ndDtB3zXfwKNi_1Lapv3Z1-seMIgv8fg`,
          },
        }
      );

      if (response.ok) {
        // 찜하기 취소 성공 시 목록 새로고침
        loadWishPlaces();
      } else {
        console.error("찜하기 취소 실패");
      }
    } catch (error) {
      console.error("찜하기 취소 중 오류:", error);
    }
  };

  // 페이지 범위 초과 시 마지막 페이지로 이동
  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  // 로딩 상태 및 빈 상태 처리
  if (isLoading)
    return <div className="text-center py-12 text-gray-500">로딩 중...</div>;
  if (wishList.length === 0)
    return (
      <div className="text-center py-12 text-gray-500">
        찜한 장소가 없습니다.
      </div>
    );

  return (
    <div className="mt-12 mb-16">
      <h2 className="text-xl font-semibold mb-6">찜한 장소</h2>
      <div className="grid grid-cols-4 gap-4 mb-8">
        {paginatedWish.map((item, index) => (
          <WishCard
            key={item.id || `wish-${index}`}
            id={item.id}
            name={item.name}
            image={item.image}
            imageUrl={item.imageUrl}
            description={item.description}
            isWished={true}
            onToggleWish={handleToggleWish}
          />
        ))}
      </div>
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default WishPlaces;
