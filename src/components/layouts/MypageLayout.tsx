import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Sidebar from "../mypage/Sidebar";

const sidebarMenus = ["내 정보", "최근 본/찜한 장소", "방문한 장소 및 리뷰"];

const MypageLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 현재 경로에 따른 활성 메뉴 결정
  const getActiveMenu = () => {
    const path = location.pathname;
    console.log("Current path:", path); // 디버깅용

    if (path === "/myinfo") return "내 정보";
    if (path === "/wish") return "최근 본/찜한 장소";
    if (path === "/myreview") return "방문한 장소 및 리뷰";
    if (path === "/reviewwrite") return "방문한 장소 및 리뷰";

    return "내 정보"; // 기본값
  };

  const handleSidebarMenuClick = (menu: string) => {
    if (menu === "내 정보") navigate("/myinfo");
    else if (menu === "최근 본/찜한 장소") navigate("/wish");
    else if (menu === "방문한 장소 및 리뷰") navigate("/myreview");
  };

  const isReviewWritePage = location.pathname === "/reviewwrite";

  return (
    <div className="w-[1200px] mx-auto">
      <div className="flex min-h-screen bg-white">
        {!isReviewWritePage && (
          <Sidebar
            menus={sidebarMenus}
            activeMenu={getActiveMenu()}
            onMenuClick={handleSidebarMenuClick}
          />
        )}
        <section
          className={`flex-1 px-16 py-12 ${isReviewWritePage ? "w-full" : ""}`}
        >
          <Outlet />
        </section>
      </div>
    </div>
  );
};

export default MypageLayout;
