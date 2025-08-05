import ScrollToTopButton from "@/components/common/ScrollToTopButton";
import MainContainer from "@/components/layout/MainContainer";
import MapSection from "@/components/placeDetailPage/MapSection";
import PlaceInfoSection from "@/components/placeDetailPage/PlaceInfoSection";
import PlaceMainSection from "@/components/placeDetailPage/PlaceMainSection";
import PlacePupularitySection from "@/components/placeDetailPage/PlacePopularitySection";
import ReviewSection from "@/components/placeDetailPage/ReviewSection";
import TestSection from "@/components/placeDetailPage/TestSection";

import { placeDetailDummy } from "@/configs/dummyData";
import { useParams } from "react-router-dom";

const PlaceDetailPage = () => {
  const { id } = useParams();

  return (
    <MainContainer>
      <title>어다가냥?같이가개! | 상세페이지 </title>
      <meta name="description" content={`어디가냥?같이가개! 상세 페이지`} />

      <ScrollToTopButton />
      <PlaceMainSection
        title="도그밀리 DOGMILY"
        thumbnail="/assets/samples/placeThumbnail_sample.png"
        isVisited={false}
        placeId={"test"}
      />
      <PlacePupularitySection
        placeId={id!}
        likedCount={67}
        viewCount={63}
        isLiked={true}
      />
      <MapSection
        title="자라섬 페스티벌"
        lat={37.8171378819}
        lng={127.5276443195}
      />
      <TestSection />
      <PlaceInfoSection
        desc={placeDetailDummy.desc}
        tags={placeDetailDummy.tags}
        address={placeDetailDummy.address}
        phoneNumber={placeDetailDummy.number}
      />
      <ReviewSection placeId={id!} />
    </MainContainer>
  );
};

export default PlaceDetailPage;
