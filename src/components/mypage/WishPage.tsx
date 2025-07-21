import RecentPlaces from "@/components/mypage/RecentPlaces";
import WishPlaces from "@/components/mypage/WishPlaces";

const WishPage = () => {
  return (
    <>
      <div className="text-sm text-gray-600 mb-4">
        메인 &gt; 마이페이지 &gt; 최근본/찜한 장소
      </div>
      <RecentPlaces />
      <WishPlaces />
    </>
  );
};

export default WishPage;
