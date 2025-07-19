import { useLocation, useNavigate } from "react-router-dom";
import PageTitle from "@/components/mypage/PageTitle";
import RecentPlaces from "@/components/mypage/RecentPlaces";
import WishPlaces from "@/components/mypage/WishPlaces";
import ReviewList from "@/components/mypage/ReviewList";
import ReviewWriteForm from "@/components/mypage/ReviewWriteForm";
import Sidebar from "@/components/mypage/Sidebar";
import PetInfoSection from "@/components/mypage/PetInfoSection";
import ProfileInfo from "@/components/mypage/ProfileInfo";

const sidebarMenus = ["내 정보", "최근 본/찜한 장소", "방문한 장소 및 리뷰"];

const MyPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;

  const handleMenuClick = (menu: string) => {
    const routes = {
      "내 정보": "/mypage/myinfo",
      "최근 본/찜한 장소": "/mypage/wish",
      "방문한 장소 및 리뷰": "/mypage/myreview",
    };
    navigate(routes[menu as keyof typeof routes] || "/mypage/myinfo");
  };

  const pages = {
    "/mypage": (
      <>
        <PageTitle text="마이페이지" />
        <div className="flex gap-16 mt-12">
          <div className="flex-1 flex flex-col gap-8">
            <ProfileInfo />
            <PetInfoSection />
          </div>
          <div className="flex items-center">
            <button className="w-24 h-24 rounded-lg bg-gray-100 flex items-center justify-center text-5xl text-gray-400">
              +
            </button>
          </div>
        </div>
      </>
    ),
    "/mypage/wish": (
      <>
        <PageTitle text="마이페이지" />
        <RecentPlaces />
        <WishPlaces />
      </>
    ),
    "/mypage/myreview": (
      <>
        <div className="text-sm text-gray-600 mb-4">
          메인 &gt; 마이페이지 &gt; 방문한 장소 및 리뷰
        </div>
        <h1 className="text-3xl font-bold text-black mb-8">마이페이지</h1>
        <ReviewList />
      </>
    ),
    "/reviewwrite": (
      <>
        <Sidebar
          menus={sidebarMenus}
          activeMenu="방문한 장소 및 리뷰"
          onMenuClick={handleMenuClick}
        />
        <ReviewWriteForm />
      </>
    ),
    "/mypage/myinfo": (
      <>
        <PageTitle text="마이페이지" />
        <div className="flex gap-16 mt-12">
          <div className="flex-1 flex flex-col gap-8">
            <ProfileInfo />
            <PetInfoSection />
          </div>
          <div className="flex items-center">
            <button className="w-24 h-24 rounded-lg bg-gray-100 flex items-center justify-center text-5xl text-gray-400">
              +
            </button>
          </div>
        </div>
      </>
    ),
  };

  return (
    <>{pages[pathname as keyof typeof pages] || pages["/mypage/myinfo"]}</>
  );
};

export default MyPage;
