import { useNavigate } from "react-router-dom";
import MainCard from "./MainCard";
import type { PopularCardData } from "@/types/apiResponseTypes";
import { getDistanceInKm } from "@/lib/searchResultCardUtils";
import { useLocationStore } from "@/stores/locationStore";

interface Props {
  place: PopularCardData;
}

const PopularCard = ({ place }: Props) => {
  const navigate = useNavigate();
  const { lat, lon, isCoordsSet } = useLocationStore();
  return (
    <MainCard
      className="relative w-[285px] h-[380px] bg-cover cursor-pointer"
      style={{
        backgroundImage: `url(${place.image || "/assets/images/common/default_thumbnail.jpg"})`,
      }}
      onClick={() => navigate(`/placedetail/${place.contentId}`)}
    >
      <div className="w-full h-[348px] flex flex-col gap-[191px] pl-[16px] pt-[4px] text-[var(--card-text)] z-10">
        <div className="h-[115px] pt-[16px]">
          <p className="h-[77px] text-[48px] font-bold">{place.ranking}</p>
          <p className="h-[38px] text-[24px] font-semibold break-words whitespace-normal">
            {place.title}
          </p>
        </div>
        <div className="h-[42px]">
          <p className="h-[22px] text-[16px]">{place.hashtag[4]}</p>
          <p className="h-[22px] text-[14px]">
            {isCoordsSet
              ? `여기서 ${getDistanceInKm(lon!, lat!, place.mapx, place.mapy)}km`
              : "위치권한이 없습니다."}
          </p>
        </div>
      </div>
      {/*상단 그라데이션*/}
      <div
        className="absolute top-0 left-0 w-full h-[157px] rounded-[16px] z-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0) 0%, #000000 100%)`,
        }}
      ></div>

      {/*하단 그라데이션*/}
      <div
        className="absolute bottom-0 left-0 w-full h-[120px] rounded-[16px] z-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 170%)`,
        }}
      ></div>

      {/* <div
        className="absolute bottom-0 left-0 w-full h-[120px] rounded-[16px] z-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.33) 50%), url(${img})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(7px)",
          maskImage:
            "linear-gradient(to bottom, rgba(0,0,0,1) -7.59%, rgba(0,0,0,0)) 100%",
          WebkitMaskImage:
            "linear-gradient(to bottom, rgba(0,0,0,1) -7.59%, rgba(0,0,0,0)) 100%",
        }}
      /> */}
    </MainCard>
  );
};

export default PopularCard;
