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

  // 페이지 변경 시 찜한 장소 목록 로드
  useEffect(() => {
    loadWishPlaces();
  }, [currentPage]);

  // 찜한 장소 목록 로드 (백엔드 API 제공 시 활성화 예정)
  const loadWishPlaces = async () => {
    // TODO: 백엔드 API 제공 시 활성화 예정
    setWishList([]);
    setIsLoading(false);
  };

  // 페이지네이션 설정
  const itemsPerPage = 8;
  const totalPages = Math.ceil(wishList.length / itemsPerPage);
  const paginatedWish = wishList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // 찜하기 토글 핸들러 (백엔드 API 제공 시 활성화 예정)
  const handleToggleWish = async (id: number) => {
    // TODO: 백엔드 API 제공 시 활성화 예정
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
