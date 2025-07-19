import PageTitle from "@/components/mypage/PageTitle";
import PetInfoSection from "@/components/mypage/PetInfoSection";
import ProfileInfo from "@/components/mypage/ProfileInfo";

const MyInfoPage = () => {
  return (
    <>
      <PageTitle text="마이페이지" />
      <div className="text-sm text-gray-600 mb-4">
        메인 &gt; 마이페이지 &gt; 방문한 장소 및 리뷰
      </div>
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
  );
};

export default MyInfoPage;
