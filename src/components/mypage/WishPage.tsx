import PageTitle from "@/components/mypage/PageTitle";
import RecentPlaces from "@/components/mypage/RecentPlaces";
import WishPlaces from "@/components/mypage/WishPlaces";

const WishPage = () => {
  return (
    <>
      <PageTitle text="마이페이지" />
      <RecentPlaces />
      <WishPlaces />
    </>
  );
};

export default WishPage;
