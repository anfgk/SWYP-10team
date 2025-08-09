import { useLocation } from "react-router-dom";
import MyInfoPage from "@/components/mypage/MyInfoPage";
import WishPage from "@/components/mypage/WishPage";
import MyReviewPage from "@/components/mypage/MyReviewPage";
import ReviewWritePage from "@/components/mypage/ReviewWritePage";

const MyPage = () => {
  const location = useLocation();

  const pathname = location.pathname;

  const pages = {
    "/myinfo": <MyInfoPage />,
    "/wish": <WishPage />,
    "/myreview": <MyReviewPage />,
    "/reviewwrite": <ReviewWritePage />,
  };

  // contentId가 포함된 reviewwrite 경로 처리
  if (pathname.startsWith("/reviewwrite/")) {
    return (
      <section>
        <ReviewWritePage />
      </section>
    );
  }

  return (
    <section>
      {pages[pathname as keyof typeof pages] || pages["/myinfo"]}
    </section>
  );
};

export default MyPage;
