import { useNavigate } from "react-router-dom";
import SearchCard from "./SearchCard";
import MainCard from "../mainPage/MainCard";
import TagLabel from "../common/TagLabel";
import {
  getDistanceInKm,
  heartClickedWithLogin,
} from "@/lib/searchResultCardUtils";
import {
  copyPlacePage,
  loginConfirmAlert,
  removeTags,
} from "@/lib/commonUtils";
import { useLocationStore } from "@/stores/locationStore";
import SVGIcons from "../common/SVGIcons";
import SvgButton from "../common/SvgButton";
import type { CardInputType } from "@/types/apiResponseTypes";
import { useAuthStore } from "@/stores/authStore";
import { useSearchResultCard } from "@/hooks/useSearchResultCard";
import { CONTENT_TYPE_NAME } from "@/configs/searchConstants";

interface Props {
  cardData: CardInputType;
}

const SearchResultCard = ({ cardData }: Props) => {
  const { isLoggedIn } = useAuthStore();

  const { lon, lat } = useLocationStore();
  const navigate = useNavigate();

  const { liked, setLiked } = useSearchResultCard({
    isLoggedIn,
    isLiked: Boolean(cardData.wishData),
  });

  return (
    <div className="w-full h-[280px] border-b-[1px]">
      <SearchCard
        className="w-full h-[255px] flex flex-row gap-[32px] rounded-[16px] cursor-pointer transition-none hover:brightness-95"
        onClick={() => navigate(`/placedetail/${cardData.contentId}`)}
      >
        <MainCard
          className="w-[340px] h-full bg-cover bg-center relative"
          style={{
            backgroundImage: `url(${cardData.image || "/assets/images/common/default_thumbnail.png"})`,
          }}
        >
          <div className="absolute w-fit h-[40px] flex gap-[8px] bottom-[15px] right-[15px]">
            <SvgButton
              svgname={
                isLoggedIn
                  ? liked
                    ? "thumbnailHeartClicked"
                    : "thumbnailHeart"
                  : "thumbnailHeart"
              }
              width={40}
              height={40}
              onClick={() => {
                isLoggedIn
                  ? heartClickedWithLogin(
                      cardData.contentId.toString(),
                      liked,
                      setLiked
                    )
                  : loginConfirmAlert(navigate);
              }}
            />
            <SvgButton
              svgname="thumbnailShare"
              width={40}
              height={40}
              onClick={() => copyPlacePage(cardData.contentId.toString())}
            />
          </div>
        </MainCard>
        <div className="w-[828px] h-[114px] flex flex-col gap-[12px]">
          <div className="w-full h-[32px] flex flex-row justify-between">
            <div className="w-fit h-full flex items-center justify-between">
              <p className="text-[20px] font-semibold mr-[4px]">
                {cardData.title}
              </p>
              <div className="w-fit h-full flex items-center">
                <SVGIcons
                  name="star"
                  width={24}
                  height={24}
                  color="var(--main-color)"
                />
                <p className="text-[18px]">
                  {Math.round(cardData.avgScore * 10) / 10}
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
                  ? getDistanceInKm(lon, lat, cardData.mapx, cardData.mapy) +
                    "km"
                  : "위치권한이 없습니다"}
              </p>
            </div>
          </div>
          {cardData.hashtag.length > 0 && (
            <div className="w-full h-fit flex flex-wrap gap-[8px]">
              <TagLabel
                value={"#" + CONTENT_TYPE_NAME[cardData.contentTypeId]}
              />
              {cardData.hashtag.slice(0, 4).map((tag, i) => (
                <TagLabel key={i} value={tag} />
              ))}
            </div>
          )}

          <div className="w-full h-[22px] flex gap-[8px] text-[16px] text-[var(--card-subText)]">
            <p>
              {cardData.regionName.sidoName +
                " " +
                cardData.regionName.sigunguName}
            </p>
            <p>·</p>
            <p>
              {cardData.restDate && cardData.restDate.trim()
                ? removeTags(cardData.restDate)
                : "휴무정보 없음"}
            </p>
          </div>
        </div>
      </SearchCard>
    </div>
  );
};

export default SearchResultCard;
