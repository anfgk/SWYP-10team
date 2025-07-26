import { useLocation, useNavigate } from "react-router-dom";
import MyInfoPage from "@/components/mypage/MyInfoPage";
import WishPage from "@/components/mypage/WishPage";
import MyReviewPage from "@/components/mypage/MyReviewPage";
import ReviewWritePage from "@/components/mypage/ReviewWritePage";

const MyPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;

  const handleMenuClick = (menu: string) => {
    const routes = {
      "내 정보": "/myinfo",
      "최근 본/찜한 장소": "/wish",
      "방문한 장소 및 리뷰": "/myreview",
    };
    navigate(routes[menu as keyof typeof routes] || "/myinfo");
  };

  const pages = {
    "/myinfo": <MyInfoPage />,
    "/wish": <WishPage />,
    "/myreview": <MyReviewPage />,
    "/reviewwrite": <ReviewWritePage />,
  };

  return <>{pages[pathname as keyof typeof pages] || pages["/myinfo"]}</>;
};

export default MyPage;
