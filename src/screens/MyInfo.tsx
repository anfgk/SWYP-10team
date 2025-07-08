import React from "react";
import Sidebar from "@/components/Sidebar";
import PageTitle from "@/components/PageTitle";
import PageButton from "@/components/PageButton";
import { useNavigate } from "react-router-dom";

const sidebarMenus = [
  "내 정보",
  "찜한 장소",
  "방문한 장소 및 리뷰",
  "문의내역",
];

const MyInfo = () => {
  const navigate = useNavigate();
  const handleSidebarMenuClick = (menu: string) => {
    if (menu === "내 정보") navigate("/myinfo");
    else if (menu === "찜한 장소") navigate("/wish");
    else if (menu === "방문한 장소 및 리뷰") navigate("/myreview");
    else if (menu === "문의내역") navigate("/inquiry");
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <Sidebar
        menus={sidebarMenus}
        activeMenu="내 정보"
        onMenuClick={handleSidebarMenuClick}
      />
      {/* Main Content */}
      <main className="flex-1 px-16 py-12">
        <PageTitle text="마이페이지" />
        <div className="flex gap-16 mt-12">
          {/* 프로필/반려동물 정보 */}
          <div className="flex-1 flex flex-col gap-8">
            {/* 프로필 정보 */}
            <div>
              <div className="text-xl font-semibold mb-2">프로필 정보</div>
              <div className="flex items-center gap-4 mb-2">
                <div className="w-32 h-32 bg-gray-300" />
                <div className="flex flex-col gap-2 flex-1">
                  <div className="flex gap-2">
                    <PageButton text="변경" variant="default" />
                    <PageButton text="삭제" variant="default" />
                  </div>
                </div>
              </div>
              <div className="flex gap-4 items-center mb-2">
                <div className="w-40 h-6 bg-gray-200" />
                <PageButton text="변경" variant="default" />
              </div>
              <div className="w-60 h-6 bg-gray-200 mb-2" />
            </div>
            {/* 반려동물 정보 */}
            <div className="bg-gray-100 p-6 rounded-lg flex flex-col gap-4">
              <div className="text-lg font-semibold mb-2">반려동물 정보</div>
              <div className="flex gap-8 items-start">
                <div className="w-40 h-32 bg-gray-300" />
                <div className="flex-1 flex flex-col gap-2">
                  <div className="flex gap-4">
                    <div className="w-20">이름</div>
                    <div className="flex-1 h-6 bg-gray-200" />
                  </div>
                  <div className="flex gap-4">
                    <div className="w-20">종류</div>
                    <div className="flex-1 h-6 bg-gray-200" />
                  </div>
                  <div className="flex gap-4">
                    <div className="w-20">성별</div>
                    <div className="flex-1 h-6 bg-gray-200" />
                  </div>
                  <div className="flex gap-4 items-center">
                    <div className="w-20">출생년도</div>
                    <div className="h-6 w-24 bg-gray-200" />
                    <div className="h-6 w-24 bg-gray-200 ml-2" />
                    <div className="ml-2">나이</div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-20">사이즈</div>
                    <div className="flex-1 h-6 bg-gray-200" />
                  </div>
                  <div className="flex gap-2 mt-4">
                    <PageButton text="수정" variant="default" />
                    <PageButton text="삭제" variant="default" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* + 버튼 */}
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
