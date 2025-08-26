<<<<<<< HEAD
import MyPageScaffold from "@/components/layouts/MyPageScaffold";
=======
import MyPageScaffold from "@/components/layout/MyPageScaffold";
>>>>>>> origin/develop
import MyPageContainerFixed from "@/components/layout/MyPageContainerFixed";
import RecentPlaces from "@/components/mypage/RecentPlaces";
import WishPlaces from "@/components/mypage/WishPlaces";

const MyWishPageFixed = () => {
  return (
    <MyPageContainerFixed>
      <MyPageScaffold title="최근 본 / 찜한 장소">
        <section className="w-full h-fit flex flex-col gap-[84px]">
          <RecentPlaces />
          <WishPlaces />
        </section>
      </MyPageScaffold>
    </MyPageContainerFixed>
  );
};

export default MyWishPageFixed;
