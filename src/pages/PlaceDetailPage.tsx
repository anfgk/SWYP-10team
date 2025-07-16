import { useParams } from "react-router-dom";

const PlaceDetailPage = () => {
  const { id } = useParams();
  return <div>{id}</div>;
};

export default PlaceDetailPage;
