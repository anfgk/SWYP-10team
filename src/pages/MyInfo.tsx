import Sidebar from "@/components/mypage/Sidebar";
import PageTitle from "@/components/mypage/PageTitle";
import PageButton from "@/components/ui/page-button";
import PetInfoSection from "@/components/mypage/PetInfoSection";
import { useNavigate } from "react-router-dom";

const sidebarMenus = ["내 정보", "최근 본/찜한 장소", "방문한 장소 및 리뷰"];

const MyInfo = () => {
  const navigate = useNavigate();
  const handleSidebarMenuClick = (menu: string) => {
    if (menu === "내 정보") navigate("/myinfo");
    else if (menu === "최근 본/찜한 장소") navigate("/wish");
    else if (menu === "방문한 장소 및 리뷰") navigate("/myreview");
  };

  return (
    <div className="flex min-h-screen bg-white">
      <main className="flex-1 px-16 py-12">
        <PageTitle text="마이페이지" />
        <div className="flex gap-16 mt-12">
          <div className="flex-1 flex flex-col gap-8">
            <div>
              <div className="text-xl font-semibold mb-2">프로필 정보</div>
              <div className="flex items-center gap-4 mb-2">
                <div className="w-32 h-32 bg-gray-300 flex items-center justify-center text-gray-500 text-sm">
                  프로필 이미지
                </div>
                <div className="flex flex-col gap-2 flex-1 justify-end h-32">
                  <div className="flex gap-2">
                    <PageButton text="변경" variant="default" />
                    <PageButton text="삭제" variant="default" />
                  </div>
                </div>
              </div>
              <div className="flex gap-4 items-center mb-2">
                <div className="w-70 h-6 bg-gray-200 mb-2 flex items-center px-2 text-sm text-gray-500">
                  닉네임
                </div>
              </div>
              <div className="w-70 h-6 bg-gray-200 mb-2 flex items-center px-2 text-sm text-gray-500">
                소설ID
              </div>
            </div>
            <PetInfoSection />
          </div>
          <div className="flex items-center">
            <button className="w-24 h-24 rounded-lg bg-gray-100 flex items-center justify-center text-5xl text-gray-400">
              +
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MyInfo;
