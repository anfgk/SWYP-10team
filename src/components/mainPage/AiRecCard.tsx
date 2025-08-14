import { useNavigate } from "react-router-dom";
import MainCard from "./MainCard";
import type { AiRecommendData } from "@/types/apiResponseTypes";
import { addNewLines } from "@/lib/commonUtils";

interface Props {
  place: AiRecommendData;
}

const AiRecCard = ({ place }: Props) => {
  const navigate = useNavigate();

  return (
    <MainCard
      className="bg-[var(--card-bg)] w-[1200px] h-[304px] cursor-pointer bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(90deg, rgba(0, 0, 0, 0.5) 6.08%, rgba(0, 0, 0, 0) 63.54%), url(${place.imageUrl || "/assets/images/common/defaul_thumbnail.jpg"})`,
      }}
      onClick={() => navigate(`/placedetail/${place.contentId}`)}
    >
      <div className="w-fit h-[102px] mt-[50px] ml-[67px]">
        <p className="text-[32px] font-semibold text-[var(--card-text)]">
          {addNewLines(place.message)}
        </p>
      </div>
    </MainCard>
  );
};

export default AiRecCard;
