import React from "react";
import WishCard from "@/components/mypage/WishCard";
import Pagination from "@/components/mypage/Pagination";

interface WishItem {
  id: number;
  name: string;
  image: string;
  description: string;
}

const WishPlaces = () => {
  const [currentPage, setCurrentPage] = React.useState(1);

  // 더 많은 샘플 데이터 생성
  const generateWishList = (): WishItem[] => {
    return Array.from({ length: 25 }, (_, i) => ({
      id: i + 1,
      name: `찜한 장소 ${i + 1}`,
      image: `https://picsum.photos/300/200?random=${i + 1}`,
      description: `장소 설명 ${i + 1}`,
    }));
  };

  const [wishList, setWishList] = React.useState<WishItem[]>(() => {
    const saved = localStorage.getItem("wishList");
    return saved ? JSON.parse(saved) : generateWishList();
  });

  // 페이지당 8개 아이템 표시 (4x2 그리드)
  const itemsPerPage = 8;
  const totalPages = Math.ceil(wishList.length / itemsPerPage);
  const paginatedWish = wishList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleToggleWish = (id: number) => {
    setWishList((prev: WishItem[]) => {
      const newList = prev.filter((item: WishItem) => item.id !== id);
      localStorage.setItem("wishList", JSON.stringify(newList));

      // 현재 페이지가 비어있고 첫 페이지가 아니라면 이전 페이지로 이동
      if (newList.length > 0 && paginatedWish.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }

      return newList;
    });
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
      {wishList.length === 0 ? (
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
