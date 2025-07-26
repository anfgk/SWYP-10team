import React, { useEffect } from "react";
import WishCard from "@/components/mypage/WishCard";
import Pagination from "@/components/mypage/Pagination";
import { getWishPlaces, removeWishPlace } from "@/lib/mypageApi";

interface WishItem {
  id: number;
  name: string;
  image: string;
  description: string;
}

const WishPlaces = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [wishList, setWishList] = React.useState<WishItem[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [totalPages, setTotalPages] = React.useState(1);

  // 컴포넌트 마운트 시 찜한 장소 목록 로드
  useEffect(() => {
    loadWishPlaces();
  }, [currentPage]);

  const loadWishPlaces = async () => {
    try {
      setIsLoading(true);
      const response = await getWishPlaces(currentPage, 8);

      // 백엔드 응답을 WishItem 형태로 변환
      const wishItems: WishItem[] = response.data.map((item: any) => ({
        id: item.id,
        name: item.name,
        image: item.image || `https://picsum.photos/300/200?random=${item.id}`,
        description: item.description || `장소 설명 ${item.id}`,
      }));

      setWishList(wishItems);
      setTotalPages(response.totalPages || 1);
    } catch (error) {
      console.error("찜한 장소 목록 로드 실패:", error);
      // 에러가 발생해도 UI는 그대로 유지
    } finally {
      setIsLoading(false);
    }
  };

  // 페이지당 8개 아이템 표시 (4x2 그리드)
  const itemsPerPage = 8;
  const paginatedWish = wishList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleToggleWish = async (id: number) => {
    try {
      setIsLoading(true);

      // 백엔드에서 찜한 장소 제거
      await removeWishPlace(id.toString());

      // 로컬 상태 업데이트
      setWishList((prev: WishItem[]) => {
        const newList = prev.filter((item: WishItem) => item.id !== id);

        // 현재 페이지가 비어있고 첫 페이지가 아니라면 이전 페이지로 이동
        if (
          newList.length > 0 &&
          paginatedWish.length === 1 &&
          currentPage > 1
        ) {
          setCurrentPage(currentPage - 1);
        }

        return newList;
      });
    } catch (error) {
      console.error("찜한 장소 제거 실패:", error);
      // 에러가 발생해도 UI는 그대로 유지
    } finally {
      setIsLoading(false);
    }
  };

  // 페이지 변경 시 현재 페이지가 총 페이지 수를 초과하면 마지막 페이지로 이동
  React.useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  return (
    <div className="mt-12 mb-16">
      <h2 className="text-xl font-semibold mb-6">찜한 장소</h2>
      {isLoading ? (
        <div className="text-center py-12 text-gray-500">로딩 중...</div>
      ) : wishList.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          찜한 장소가 없습니다.
        </div>
      ) : (
        <>
          <div className="grid grid-cols-4 gap-4 mb-8">
            {paginatedWish.map((item: WishItem) => (
              <WishCard
                key={item.id}
                id={item.id}
                name={item.name}
                image={item.image}
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
        </>
      )}
    </div>
  );
};

export default WishPlaces;
