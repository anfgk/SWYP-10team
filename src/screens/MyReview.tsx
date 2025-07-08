import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageTitle from "@/components/PageTitle";
import Sidebar from "@/components/Sidebar";
import PageButton from "@/components/PageButton";

const dummyReviews = [
  { id: 2, place: "장소명", review: "", hasReview: false },
  { id: 3, place: "다른 장소", review: "정말 좋았어요!", hasReview: true },
];

const sidebarMenus = [
  "내 정보",
  "찜한 장소",
  "방문한 장소 및 리뷰",
  "문의내역",
];
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

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar menus={sidebarMenus} activeMenu={activeMenu} />
      <main className="flex-1 px-16 py-12">
        <div className="flex gap-12 mb-12">
          <PageTitle text="방문한 장소 및 리뷰" />
        </div>
        <div className="flex flex-col gap-12">
          {paginatedReviews.map((item, idx) => (
            <div key={item.id} className="flex gap-8 items-start">
              <div className="w-40 h-32 bg-[var(--sidebar-ring)]" />
              <div className="flex-1">
                <div className="text-lg font-semibold mb-2">{item.place}</div>
                {item.hasReview || item.review ? (
                  <div className="flex gap-2 mb-2">
                    <PageButton
                      text="수정"
                      onClick={() =>
                        navigate("/ReviewWrite", {
                          state: { reviewData: item },
                        })
                      }
                    />
                    <PageButton
                      text="삭제"
                      onClick={() => {
                        // localStorage에서 해당 리뷰 삭제
                        const savedReviews = JSON.parse(
                          localStorage.getItem("reviews") || "[]"
                        );
                        const updatedReviews = savedReviews.filter(
                          (review: any) => review.id !== item.id
                        );
                        localStorage.setItem(
                          "reviews",
                          JSON.stringify(updatedReviews)
                        );
                        window.location.reload();
                      }}
                    />
                  </div>
                ) : (
                  <div className="flex gap-2 mb-2">
                    <PageButton
                      text="리뷰 작성하기"
                      variant="default"
                      onClick={() => navigate("/ReviewWrite")}
                    />
                  </div>
                )}
                <div className="bg-[var(--sidebar-ring)] p-3 rounded">
                  {item.hasReview || item.review
                    ? item.review
                    : "아직 리뷰를 작성하지 않았습니다! 리뷰를 작성해주세요!"}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-16 gap-2 text-lg">
          <span
            className={`cursor-pointer ${currentPage === 1 ? "text-gray-400" : ""}`}
            onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
          >
            &#60;
          </span>
          {Array.from({ length: totalPages }, (_, i) => (
            <span
              key={i + 1}
              className={`mx-1 cursor-pointer ${currentPage === i + 1 ? "font-bold underline" : ""}`}
              onClick={() => handlePageClick(i + 1)}
            >
              {i + 1}
            </span>
          ))}
          <span
            className={`cursor-pointer ${currentPage === totalPages ? "text-gray-400" : ""}`}
            onClick={() =>
              currentPage < totalPages && setCurrentPage(currentPage + 1)
            }
          >
            &#62;
          </span>
        </div>
      </main>
    </div>
  );
};

export default MyReview;
