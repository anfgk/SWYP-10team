import MyPageContainerFixed from "@/components/layout/MyPageContainerFixed";
import MyPageScaffold from "@/components/layout/MyPageScaffold";
import MyReviewSection from "@/components/realMypage/myreview/MyReviewSection";

const MyReviewPageFixed = () => {
  return (
    <MyPageContainerFixed>
      <MyPageScaffold title="방문한 장소 및 리뷰">
        <MyReviewSection />
      </MyPageScaffold>
    </MyPageContainerFixed>
  );
};

export default MyReviewPageFixed;
