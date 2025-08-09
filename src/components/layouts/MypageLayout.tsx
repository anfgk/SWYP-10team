import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "@/components/mypage/Sidebar";

const MypageLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;

  const menus = ["내 정보", "최근 본/찜한 장소", "방문한 장소 및 리뷰"];

  const getActiveMenu = () => {
    if (path === "/myinfo") return "내 정보";
    if (path === "/wish") return "최근 본/찜한 장소";
    if (path === "/myreview") return "방문한 장소 및 리뷰";
    if (path === "/reviewwrite") return "방문한 장소 및 리뷰";
    return "내 정보";
  };

  const handleMenuClick = (menu: string) => {
    if (menu === "내 정보") navigate("/myinfo");
    else if (menu === "최근 본/찜한 장소") navigate("/wish");
    else if (menu === "방문한 장소 및 리뷰") navigate("/myreview");
  };

  return (
    <div className="flex w-[1200px] h-full mx-auto">
      <Sidebar
        menus={menus}
        activeMenu={getActiveMenu()}
        onMenuClick={handleMenuClick}
      />
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default MypageLayout;
