import MainContainer from "@/components/layout/MainContainer";
import MapSection from "@/components/placeDetailPage/MapSection";
import PlaceInfoSection from "@/components/placeDetailPage/PlaceInfoSection";
import PlaceMainSection from "@/components/placeDetailPage/PlaceMainSection";
import PlacePupularitySection from "@/components/placeDetailPage/PlacePopularitySection";
import ReviewPhotoSection from "@/components/placeDetailPage/ReviewSection";

import { placeDetailDummy } from "@/configs/dummyData";
//import { useParams } from "react-router-dom";

const PlaceDetailPage = () => {
  //const { id } = useParams();

  return (
    <MainContainer>
      <PlaceMainSection
        title="도그밀리 DOGMILY"
        thumbnail="/assets/samples/placeThumbnail_sample.png"
        isVisited={false}
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
      <ReviewPhotoSection
        reviewCount={placeDetailDummy.reviewCount}
        photos={[""]}
      />
    </MainContainer>
  );
};

export default PlaceDetailPage;
