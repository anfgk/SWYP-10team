import MainContainer from "@/components/layout/MainContainer";
import MapSection from "@/components/placeDetailPage/MapSection";
import { useParams } from "react-router-dom";

const PlaceDetailPage = () => {
  const { id } = useParams();
  return (
    <MainContainer>
      <p>{id}</p>
      <MapSection
        title="자라섬 페스티벌"
        lat={37.8171378819}
        lng={127.5276443195}
      />
    </MainContainer>
  );
};

export default PlaceDetailPage;
