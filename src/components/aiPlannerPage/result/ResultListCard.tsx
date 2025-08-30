import MainCard from "@/components/mainPage/MainCard";
import { removeTags } from "@/lib/commonUtils";
import type { PlannerMapPlacesData } from "@/types/apiResponseTypes";

interface Props {
  cardData: PlannerMapPlacesData;
}
const ResultListCard = ({ cardData }: Props) => {
  return (
    <div
      className="w-full h-[161px] flex gap-[10px] border-b-[1px] border-[var(--search-element-border)] cursor-pointer"
      onClick={() => {
        window.open(
          `/placedetail/${cardData.contentId}`,
          "_blank",
          "noopener,noreferrer"
        );
      }}
    >
      {/* 사진 + 마커 */}
      <div className="w-[150px] h-[150px] relative">
        <MainCard
          className="w-[150px] h-[150px] bg-cover"
          style={{
            backgroundImage: `url(${cardData.image || "/assets/images/common/default_thumbnail.jpg"})`,
          }}
        />
        <img
          className="absolute right-[4px] bottom-[8px] w-[48px] h-[48px]"
          src={`/assets/icons/markers/marker${cardData.day + 1}_${cardData.index + 1}.png`}
        />
      </div>
      {/* 장소 정보 */}
      <div className="w-[225px] h-fit flex flex-col gap-[4px]">
        <h3 className="w-full min-h-[29px] flex items-center text-[18px] font-semibold break-all">
          {cardData.title}
        </h3>
        <div className="w-full min-h-[42px] flex flex-col gap-[2px]">
          <p className="w-full min-h-[20px] flex items-center break-keep text-[14px] text-[var(--search-element-text)]">
            {cardData.addr1 + " " + cardData.addr2}
          </p>
          <p className="w-full min-h-[20px] flex items-center break-keep text-[14px] text-[var(--search-element-text)]">
            {cardData.restDate && cardData.restDate.trim()
              ? removeTags(cardData.restDate)
              : "휴무정보 없음"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResultListCard;
