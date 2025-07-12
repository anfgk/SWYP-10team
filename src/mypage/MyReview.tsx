import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageTitle from "@/components/PageTitle";
import Sidebar from "@/components/Sidebar";
import ReviewCard from "@/components/ReviewCard";
import Pagination from "@/components/Pagination";

const dummyReviews = [
  { id: 2, place: "장소명", review: "", hasReview: false },
  { id: 3, place: "다른 장소", review: "정말 좋았어요!", hasReview: true },
];

const sidebarMenus = ["내 정보", "찜한 장소", "방문한 장소 및 리뷰"];
const REVIEWS_PER_PAGE = 3;

const MyReview = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [reviews, setReviews] = useState<any[]>([]);
  const navigate = useNavigate();
  const activeMenu = "방문한 장소 및 리뷰";

  React.useEffect(() => {
    const savedReviews = JSON.parse(localStorage.getItem("reviews") || "[]");
    setReviews(savedReviews);
  }, []);

  const allReviews = [...dummyReviews, ...reviews];
  const totalPages = Math.ceil(allReviews.length / REVIEWS_PER_PAGE);
  const paginatedReviews = allReviews.slice(
    (currentPage - 1) * REVIEWS_PER_PAGE,
    currentPage * REVIEWS_PER_PAGE
  );

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  const handleEdit = (item: any) => {
    navigate("/ReviewWrite", { state: { reviewData: item } });
  };
  const handleDelete = (item: any) => {
    const savedReviews = JSON.parse(localStorage.getItem("reviews") || "[]");
    const updatedReviews = savedReviews.filter(
      (review: any) => review.id !== item.id
    );
    localStorage.setItem("reviews", JSON.stringify(updatedReviews));
    window.location.reload();
  };
  const handleWrite = () => {
    navigate("/ReviewWrite");
  };

  const handleSidebarMenuClick = (menu: string) => {
    if (menu === "내 정보") navigate("/myinfo");
    else if (menu === "찜한 장소") navigate("/wish");
    else if (menu === "방문한 장소 및 리뷰") navigate("/myreview");
  };

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar
        menus={sidebarMenus}
        activeMenu={activeMenu}
        onMenuClick={handleSidebarMenuClick}
      />
      <main className="flex-1 px-16 py-12">
        <div className="flex gap-12 mb-12">
          <PageTitle text="방문한 장소 및 리뷰" />
        </div>
        <div className="flex flex-col gap-12">
          {paginatedReviews.map((item) => (
            <ReviewCard
              key={item.id}
              item={item}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onWrite={handleWrite}
            />
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageClick}
        />
      </main>
    </div>
  );
};

export default MyReview;
