import { useNavigate } from "react-router-dom";
import SearchCard from "./SearchCard";
import MainCard from "../mainPage/MainCard";
import TagLabel from "../common/TagLabel";
import { getDistanceInKm, heartClicked } from "@/lib/searchResultCardUtils";
import { useLocationStore } from "@/stores/locationStore";
import SVGIcons from "../common/SVGIcons";
import SvgButton from "../common/SvgButton";
import { copyCurrentUrl } from "@/lib/placeDetailUtils";
import { useState } from "react";
import type { SearchCardData } from "@/types/types";

interface Props {
  cardData: SearchCardData;
}

const SearchResultCard = ({ cardData }: Props) => {
  const [liked, setLiked] = useState(cardData.isLiked);
  const { lon, lat } = useLocationStore();
  const navigate = useNavigate();

  return (
    <div className="w-full h-[280px] border-b-[1px]">
      <SearchCard
        className="w-full h-[255px] flex flex-row gap-[32px] cursor-pointer"
        onClick={() => navigate(`/placedetail/${cardData.id}`)}
      >
        <MainCard
          className="w-[340px] h-full bg-cover bg-center relative"
          style={{ backgroundImage: `url(${cardData.img})` }}
        >
          <div className="absolute w-fit h-[40px] flex gap-[8px] bottom-[15px] right-[15px]">
            <SvgButton
              svgname={liked ? "thumbnailHeartClicked" : "thumbnailHeart"}
              width={40}
              height={40}
              onClick={() => heartClicked(cardData.id, liked, setLiked)}
            />
            <SvgButton
              svgname="thumbnailShare"
              width={40}
              height={40}
              onClick={copyCurrentUrl}
            />
          </div>
        </MainCard>
        <div className="w-[828px] h-[114px] flex flex-col gap-[12px]">
          <div className="w-full h-[32px] flex flex-row justify-between">
            <div className="w-fit h-full flex items-center justify-between">
              <p className="text-[20px] font-semibold mr-[4px]">
                {cardData.title}
              </p>
              <div className="w-fit h-full flex items-center gap-[4px]">
                <SVGIcons
                  name="star"
                  width={24}
                  height={24}
                  color="var(--main-color)"
                />
                <p className="text-[18px]">
                  {Math.round(cardData.rating * 10) / 10}
                </p>
              </div>
            </div>
            <div className="w-[200px] h-[full] flex flex-row gap-[4px] justify-end items-center">
              <SVGIcons
                name="vector"
                width={24}
                height={24}
                color="var(--main-color)"
              />
              <p className="text-[14px]">
                {lon && lat
                  ? getDistanceInKm(lon, lat, cardData.mapX, cardData.mapY)
                  : "위치권한이 없습니다"}
              </p>
            </div>
          </div>
          <div className="w-full h-[28px] flex flex-row gap-[8px]">
            {cardData.tags.map((tag, i) => (
              <TagLabel key={i} value={tag} />
            ))}
          </div>
          <div className="w-full h-[22px] flex gap-[8px] text-[16px] text-[var(--card-subText)]">
            <p>{cardData.address}</p>
            <p>·</p>
            <p>{cardData.closeDay}</p>
          </div>
        </div>
      </SearchCard>
    </div>
  );
};

export default SearchResultCard;
