import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Sidebar from "../mypage/Sidebar";
import MainContainer from "../layout/MainContainer";

const sidebarMenus = ["내 정보", "최근 본/찜한 장소", "방문한 장소 및 리뷰"];

const MypageLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 현재 경로에 따른 활성 메뉴 결정
  const getActiveMenu = () => {
    const path = location.pathname;
    if (path === "/mypage/myinfo") return "내 정보";
    if (path === "/mypage/wish") return "최근 본/찜한 장소";
    if (path === "/mypage/myreview") return "방문한 장소 및 리뷰";
    return "내 정보"; // 기본값
  };

  const handleSidebarMenuClick = (menu: string) => {
    if (menu === "내 정보") navigate("/mypage/myinfo");
    else if (menu === "최근 본/찜한 장소") navigate("/mypage/wish");
    else if (menu === "방문한 장소 및 리뷰") navigate("/mypage/myreview");
  };

  return (
    <MainContainer>
      <div className="flex min-h-screen bg-white">
        <Sidebar
          menus={sidebarMenus}
          activeMenu={getActiveMenu()}
          onMenuClick={handleSidebarMenuClick}
        />
        <section className="flex-1 px-16 py-12">
          <Outlet />
        </section>
      </div>
    </MainContainer>
  );
};

export default MypageLayout;
