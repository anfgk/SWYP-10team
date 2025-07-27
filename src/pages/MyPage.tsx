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

  return <>{pages[pathname as keyof typeof pages] || pages["/myinfo"]}</>;
};

export default MyPage;
