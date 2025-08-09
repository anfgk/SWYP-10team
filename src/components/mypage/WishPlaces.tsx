import { useEffect, useState } from "react";
import WishCard from "@/components/mypage/WishCard";
import Pagination from "@/components/mypage/Pagination";
import { useAuthStore } from "@/stores/authStore";
import { fetchWishList } from "@/lib/apiUtils";

interface WishItem {
  id: number;
  name: string;
  image: string;
  description: string;
  isWish: boolean;
}

const WishPlaces = () => {
  const { accessToken } = useAuthStore();
  const [currentPage, setCurrentPage] = useState(0);
  const [wishList, setWishList] = useState<WishItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(8);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrevious, setHasPrevious] = useState(false);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    loadWishPlaces();
  }, [accessToken, currentPage]);

  const loadWishPlaces = async () => {
    if (!accessToken) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      try {
        const data = await fetchWishList(accessToken, currentPage, page);
        setWishList(Array.isArray(data.wishes) ? data.wishes : []);
        setTotalPages(data.totalPages);
        setHasNext(data.hasNext);
        setCurrentPage(data.currentPage);
        setHasPrevious(data.hasPrevious);
        // 데이터 구조 확인 및 처리
        let processedData = [];

        if (Array.isArray(data)) {
          processedData = data.map((item: any) => ({
            id: item.id || item.contentId,
            image:
              item.image || item.imageUrl || item.thumbnail || item.firstImage,
            isWish: item.isWish,
          }));
        } else if (data && typeof data === "object") {
          // 데이터가 객체인 경우 (페이지네이션 응답)
          if (data.wishes && Array.isArray(data.wishes)) {
            // wishes 배열 처리
            processedData = data.wishes.map((item: any) => ({
              id: item.id || item.contentId,
              image:
                item.image ||
                item.imageUrl ||
                item.thumbnail ||
                item.firstImage,
              isWish: item.isWish,
            }));
          } else if (data.content && Array.isArray(data.content)) {
            // content 배열 처리
            processedData = data.content.map((item: any) => ({
              id: item.id || item.contentId,
              name: item.name || item.title || item.placeName,
              image:
                item.image ||
                item.imageUrl ||
                item.thumbnail ||
                item.firstImage,
            }));
          } else {
            processedData = []; // 빈 배열로 설정 (더미 데이터 사용 안 함)
          }
        } else {
          processedData = []; // 빈 배열로 설정 (더미 데이터 사용 안 함)
        }

        setWishList(processedData);
      } catch (apiError) {
        setWishList([]);
      }
    } catch (error) {
      setWishList([]);
    } finally {
      setIsLoading(false);
    }
  };

  // 서버에서 페이지별 데이터를 받으므로 클라이언트 페이지네이션 불필요
  // const totalPages = Math.ceil(wishList.length / itemsPerPage);
  const paginatedWish = wishList;

  const handleToggleWish = async (id: number) => {
    try {
      setIsLoading(true);
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
    } catch (error) {
      console.error("찜한 장소 제거 실패:", error);
    } finally {
      setIsLoading(false);
    }
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
      <div className="grid grid-cols-4 gap-2 mb-8">
        {paginatedWish.map((item, index) => (
          <WishCard
            key={index}
            id={item.id}
            name={item.name}
            image={item.image}
            description={item.description}
            isWish={item.isWish}
            onToggleWish={handleToggleWish}
          />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
        setPage={setPage}
        hasNext={hasNext}
        hasPrevious={hasPrevious}
      />
    </div>
  );
};

export default WishPlaces;
