import React from "react";
import WishCard from "@/components/mypage/WishCard";
import Pagination from "@/components/mypage/Pagination";

const WishPlaces = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [wishState, setWishState] = React.useState<{ [id: number]: boolean }>(
    () => {
      const saved = localStorage.getItem("wishState");
      return saved
        ? JSON.parse(saved)
        : Object.fromEntries(
            Array.from({ length: 10 }, (_, i) => [i + 1, true])
          );
    }
  );

  const wishList = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    name: `장소이름${i + 1}`,
  }));
  const filteredWish = wishList.filter((item) => wishState[item.id]);
  const totalPages = Math.ceil(filteredWish.length / 8);
  const paginatedWish = filteredWish.slice(
    (currentPage - 1) * 8,
    currentPage * 8
  );

  const handleToggleWish = (id: number) => {
    setWishState((prev) => {
      const newState = { ...prev, [id]: !prev[id] };
      localStorage.setItem("wishState", JSON.stringify(newState));
      return newState;
    });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">찜한 장소</h2>
      <div className="grid grid-cols-4 gap-6 mb-8">
        {paginatedWish.map((item) => (
          <WishCard
            key={item.id}
            id={item.id}
            name={item.name}
            isWished={wishState[item.id]}
            onToggleWish={handleToggleWish}
          />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default WishPlaces;
