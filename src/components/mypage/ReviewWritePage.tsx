import ReviewWriteForm from "@/components/mypage/ReviewWriteForm";
import Sidebar from "@/components/mypage/Sidebar";

interface ReviewWritePageProps {
  onMenuClick: (menu: string) => void;
}

const ReviewWritePage = ({ onMenuClick }: ReviewWritePageProps) => {
  const sidebarMenus = ["내 정보", "최근 본/찜한 장소", "방문한 장소 및 리뷰"];

  return (
    <>
      <Sidebar
        menus={sidebarMenus}
        activeMenu="방문한 장소 및 리뷰"
        onMenuClick={onMenuClick}
      />
      <ReviewWriteForm />
    </>
  );
};

export default ReviewWritePage;
