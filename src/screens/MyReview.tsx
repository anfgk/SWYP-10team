import React, { useState } from 'react';
import PageTitle from '@/components/ui/PageTitle';
import Sidebar from '@/components/ui/Sidebar';
import PageButton from '@/components/ui/PageButton';

const dummyReviews = [
  { id: 1, place: '장소명', review: '갔는데 넘 좋았어요.', hasReview: true },
  { id: 2, place: '장소명', review: '', hasReview: false },
  { id: 3, place: '장소명', review: '갔는데 넘 좋았어요.', hasReview: true },
];

const sidebarMenus = ['내 정보', '찜한 장소', '방문한 장소 및 리뷰', '문의내역'];
const REVIEWS_PER_PAGE = 2;

const MyReview = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(dummyReviews.length / REVIEWS_PER_PAGE);
  const paginatedReviews = dummyReviews.slice(
    (currentPage - 1) * REVIEWS_PER_PAGE,
    currentPage * REVIEWS_PER_PAGE
  );

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <Sidebar menus={sidebarMenus} />
      {/* Main Content */}
      <main className="flex-1 px-16 py-12">
        {/* Tabs */}
        <div className="flex gap-12 mb-12">
          <PageTitle text="방문한 장소 및 리뷰" />
        </div>
        {/* Review List */}
        <div className="flex flex-col gap-12">
          {paginatedReviews.map((item, idx) => (
            <div key={item.id} className="flex gap-8 items-start">
              <div className="w-40 h-32 bg-gray-300" />
              <div className="flex-1">
                <div className="text-lg font-semibold mb-2">{item.place}</div>
                {item.hasReview ? (
                  <div className="flex gap-2 mb-2">
                    <PageButton text="수정" />
                    <PageButton text="삭제" />
                  </div>
                ) : (
                  <div className="flex gap-2 mb-2">
                    <PageButton text="리뷰 작성하기" variant="primary" />
                  </div>
                )}
                <div className="bg-gray-300 p-3 rounded">
                  {item.hasReview ? item.review : '아직 리뷰를 작성하지 않았습니다! 리뷰를 작성해주세요!'}
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Pagination */}
        <div className="flex justify-center mt-16 gap-2 text-lg">
          <span className={`cursor-pointer ${currentPage === 1 ? 'text-gray-400' : ''}`} onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}>&#60;</span>
          {Array.from({ length: totalPages }, (_, i) => (
            <span
              key={i + 1}
              className={`mx-1 cursor-pointer ${currentPage === i + 1 ? 'font-bold underline' : ''}`}
              onClick={() => handlePageClick(i + 1)}
            >
              {i + 1}
            </span>
          ))}
          <span className={`cursor-pointer ${currentPage === totalPages ? 'text-gray-400' : ''}`} onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}>&#62;</span>
        </div>
      </main>
    </div>
  );
};

export default MyReview; 