import ScrollToTopButton from "@/components/common/ScrollToTopButton";
import MainContainer from "@/components/layout/MainContainer";
import PhotoSlideModal from "@/components/modals/PhotoSlideModal";
import MapSection from "@/components/placeDetailPage/MapSection";
import PlaceInfoSection from "@/components/placeDetailPage/PlaceInfoSection";
import PlaceMainSection from "@/components/placeDetailPage/PlaceMainSection";
import PlacePupularitySection from "@/components/placeDetailPage/PlacePopularitySection";
import ReviewSection from "@/components/placeDetailPage/ReviewSection";

import { usePlaceDetail } from "@/hooks/usePlaceDetail";
import { usePhotoModalStore } from "@/stores/photoModalStore";
import { useParams } from "react-router-dom";

const PlaceDetailPage = () => {
  const { id } = useParams();
  const { loading, placeDetail } = usePlaceDetail(id!);
  const { isOpen } = usePhotoModalStore();
  return (
    <MainContainer>
      <title>어다가냥?같이가개! | 상세페이지 </title>
      <meta name="description" content={`어디가냥?같이가개! 상세 페이지`} />
      {loading ? (
        <p>불러오는 중...</p>
      ) : (
        <article>
          <ScrollToTopButton />
          <PlaceMainSection
            title={placeDetail?.title ?? "잘못된 장소 코드입니다."}
            thumbnail={
              placeDetail?.image ||
              "/assets/images/common/default_thumbnail.png"
            }
            isVisited={placeDetail?.visited ?? false}
            placeId={id!}
            imgList={placeDetail?.detailImage ?? []}
          />
          <PlacePupularitySection
            placeId={id!}
            likedCount={placeDetail?.wishCnt ?? 0}
            viewCount={placeDetail?.totalView ?? 0}
            isLiked={placeDetail?.wishData ?? false}
          />
          <MapSection
            title={placeDetail?.title ?? ""}
            lat={placeDetail?.mapy ?? 37.5125}
            lng={placeDetail?.mapx ?? 127.10278}
          />
          <PlaceInfoSection
            desc={placeDetail?.overview ?? ""}
            addr1={placeDetail?.addr1 ?? ""}
            addr2={placeDetail?.addr2 ?? ""}
            phoneNumber={placeDetail?.tel ?? ""}
          />
          <ReviewSection placeId={id!} />
          {isOpen && <PhotoSlideModal />}
        </article>
      )}
    </MainContainer>
  );
};

export default PlaceDetailPage;
