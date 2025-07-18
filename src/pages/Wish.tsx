import React from "react";
import Sidebar from "@/components/mypage/Sidebar";
import PageTitle from "@/components/mypage/PageTitle";
import Pagination from "@/components/mypage/Pagination";
import WishCard from "@/components/mypage/WishCard";
import { useNavigate } from "react-router-dom";

const sidebarMenus = ["내 정보", "최근 본/찜한 장소", "방문한 장소 및 리뷰"];

const dummyWishList = Array.from({ length: 10 }).map((_, i) => ({
  id: i + 1,
  name: `장소이름${i + 1}`,
}));

const Wish = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = React.useState(1);
  const [wishState, setWishState] = React.useState<{ [id: number]: boolean }>(
    () => {
      const savedWishState = localStorage.getItem("wishState");
      if (savedWishState) {
        return JSON.parse(savedWishState);
      }
      return Object.fromEntries(dummyWishList.map((item) => [item.id, true]));
    },
  );

  const WISH_PER_PAGE = 12;
  const filteredWishList = dummyWishList.filter((item) => wishState[item.id]);
  const totalPages = Math.ceil(filteredWishList.length / WISH_PER_PAGE);
  const paginatedWish = filteredWishList.slice(
    (currentPage - 1) * WISH_PER_PAGE,
    currentPage * WISH_PER_PAGE,
  );

  const handleMenuClick = (menu: string) => {
    switch (menu) {
      case "내 정보":
        navigate("/myinfo");
        break;
      case "찜한 장소":
        navigate("/wish");
        break;
      case "방문한 장소 및 리뷰":
        navigate("/myreview");
        break;
    }
  };

  const handleToggleWish = (id: number) => {
    setWishState((prev) => {
      const newState = { ...prev, [id]: !prev[id] };
      localStorage.setItem("wishState", JSON.stringify(newState));
      return newState;
    });
  };

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar
        menus={sidebarMenus}
        activeMenu="찜한 장소"
        onMenuClick={handleMenuClick}
      />
      <main className="flex-1 px-16 py-12">
        <PageTitle text="찜한 장소" />
        <div className="grid grid-cols-4 gap-8 mt-12">
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
      </main>
    </div>
  );
};

export default Wish;
