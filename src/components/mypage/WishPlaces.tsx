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

  // 처음에 무조건 한 번 실행, 그리고 currentPage가 바뀌면 또 실행
  useEffect(() => {
    loadWishPlaces();
  }, [currentPage]);

  const loadWishPlaces = async () => {
    // TODO: 백엔드 API 제공 시 활성화 예정
    setWishList([]);
    setIsLoading(false);

    /*
    try {
      setIsLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}api/mypage/wish?page=${currentPage}`,
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
      const wishData = data?.data || data?.wishList || data;

      if (wishData && Array.isArray(wishData) && wishData.length > 0) {
        setWishList(wishData);
      } else if (wishData && !Array.isArray(wishData)) {
        // 단일 객체인 경우 배열로 변환
        setWishList([wishData]);
      } else {
        setWishList([]);
      }
    } catch (error) {
      console.error("찜한 장소 목록 로드 실패:", error);
      setWishList([]);
    } finally {
      setIsLoading(false);
    }
    */
  };

  const itemsPerPage = 8;
  const totalPages = Math.ceil(wishList.length / itemsPerPage);
  const paginatedWish = wishList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // TODO: 백엔드에서 삭제 API 제공 시 활성화 예정
  const handleToggleWish = async (id: number) => {
    // TODO: 백엔드 API 제공 시 아래 코드 주석 해제
    /*
    try {
      setIsLoading(true);
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
        setWishList((prev) => {
          const newList = prev.filter((item) => item.id !== id);
          if (
            newList.length > 0 &&
            paginatedWish.length === 1 &&
            currentPage > 1
          ) {
            setCurrentPage(currentPage - 1);
          }
          return newList;
        });
      }
    } catch (error) {
      console.error("찜한 장소 제거 실패:", error);
    } finally {
      setIsLoading(false);
    }
    */
  };

  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

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
