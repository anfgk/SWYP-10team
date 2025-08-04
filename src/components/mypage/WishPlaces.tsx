import { useEffect, useState } from "react";
import WishCard from "@/components/mypage/WishCard";
import Pagination from "@/components/mypage/Pagination";

interface WishItem {
  id: number;
  name: string;
  image: string;
  description: string;
}

const dummyWishItems: WishItem[] = [
  {
    id: 1,
    name: "한강공원",
    image: "https://picsum.photos/300/200?random=1",
    description: "강아지와 함께 산책하기 좋은 곳",
  },
  {
    id: 2,
    name: "올림픽공원",
    image: "https://picsum.photos/300/200?random=2",
    description: "넓은 공간에서 뛰어놀기 좋은 곳",
  },
  {
    id: 3,
    name: "여의도공원",
    image: "https://picsum.photos/300/200?random=3",
    description: "도심 속 휴식 공간",
  },
  {
    id: 4,
    name: "북서울꿈의숲",
    image: "https://picsum.photos/300/200?random=4",
    description: "자연 속에서 힐링하기 좋은 곳",
  },
];

const WishPlaces = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [wishList, setWishList] = useState<WishItem[]>(dummyWishItems);
  const [isLoading, setIsLoading] = useState(false);

  // 처음에 무조건 한 번 실행, 그리고 currentPage가 바뀌면 또 실행
  useEffect(() => {
    loadWishPlaces();
  }, [currentPage]);

  const loadWishPlaces = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/user/wish?page=${currentPage}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        // API가 없을 때 기본 데이터 사용
        setWishList(dummyWishItems);
        return;
      }

      const data = await response.json();
      setWishList(data.wishList || dummyWishItems);
      console.log("찜한 장소 목록 로드 완료:", data);
    } catch (error) {
      console.error("찜한 장소 목록 로드 실패:", error);
      // 에러가 발생해도 UI는 그대로 유지
      setWishList(dummyWishItems);
    } finally {
      setIsLoading(false);
    }
  };

  const itemsPerPage = 8;
  const totalPages = Math.ceil(wishList.length / itemsPerPage);
  const paginatedWish = wishList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleToggleWish = async (id: number) => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/user/wish/${id}`, {
        method: "DELETE",
      });

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
        {paginatedWish.map((item) => (
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
    </div>
  );
};

export default WishPlaces;
