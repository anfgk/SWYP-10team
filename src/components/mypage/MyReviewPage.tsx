import ReviewList from "@/components/mypage/ReviewList";

const MyReviewPage = () => {
  return (
    <>
      <div className="text-sm text-gray-600 mb-4">
        메인 &gt; 마이페이지 &gt; 방문한 장소 및 리뷰
      </div>
      <ReviewList />
    </>
  );
};

export default MyReviewPage;
