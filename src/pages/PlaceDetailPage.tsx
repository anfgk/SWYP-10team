import ScrollToTopButton from "@/components/common/ScrollToTopButton";
import MainContainer from "@/components/layout/MainContainer";
import MapSection from "@/components/placeDetailPage/MapSection";
import PlaceInfoSection from "@/components/placeDetailPage/PlaceInfoSection";
import PlaceMainSection from "@/components/placeDetailPage/PlaceMainSection";
import PlacePupularitySection from "@/components/placeDetailPage/PlacePopularitySection";
import ReviewSection from "@/components/placeDetailPage/ReviewSection";

import { placeDetailDummy } from "@/configs/dummyData";
import { useParams } from "react-router-dom";

const PlaceDetailPage = () => {
  const { id } = useParams();

  return (
    <MainContainer>
      <title>어다가냥?같이가개! | 상세페이지 </title>
      <meta name="description" content={`어디가냥?같이가개! 상세 페이지`} />
      <meta property="og:title" content={`어다가냥?같이가개! | 상세페이지`} />
      <meta
        property="og:description"
        content={`어디가냥?같이가개! 상세 페이지`}
      />
      <meta property="og:image" content="/assets/images/og_thumbnail.jpg" />
      <meta property="og:url" content={window.location.href} />
      <meta property="og:type" content="website" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={`어다가냥?같이가개! | 상세페이지`} />
      <meta
        name="twitter:description"
        content={`어디가냥?같이가개! 상세 페이지`}
      />
      <meta name="twitter:image" content="/assets/images/og_thumbnail.jpg" />

      <ScrollToTopButton />
      <PlaceMainSection
        title="도그밀리 DOGMILY"
        thumbnail="/assets/samples/placeThumbnail_sample.png"
        isVisited={false}
        placeId={"test"}
      />
      <PlacePupularitySection likedCount={63} viewCount={63} isLiked={false} />
      <MapSection
        title="자라섬 페스티벌"
        lat={37.8171378819}
        lng={127.5276443195}
      />
      <PlaceInfoSection
        desc={placeDetailDummy.desc}
        tags={placeDetailDummy.tags}
        address={placeDetailDummy.address}
        phoneNumber={placeDetailDummy.number}
      />
      <ReviewSection />
    </MainContainer>
  );
};

export default PlaceDetailPage;
