import { useNavigate } from "react-router-dom";
import SearchCard from "./SearchCard";
import MainCard from "../mainPage/MainCard";
import TagLabel from "./TagLabel";
import { getDistanceInKm } from "@/lib/searchResultCardUtils";
import { useLocationStore } from "@/stores/locationStore";

interface Props {
  id?: string;
  title?: string;
  address?: string;
  mapX?: number;
  mapY?: number;
  rating?: number;
  tags?: string[];
  img?: string;
}

const SearchResultCard = ({
  id = "test",
  title = "장소 이름",
  address = "제주 제주시",
  mapX = 127.5276443195,
  mapY = 37.8171378819,
  rating = 3.5,
  tags = ["장소의 테마", "댕댕이", "냥냥이"],
  img = "/assets/resultcard_sample.jpg",
}: Props) => {
  const { lon, lat } = useLocationStore();
  const navigate = useNavigate();

  return (
    <div className="w-full h-[280px] border-b-[1px]">
      <SearchCard
        className="w-full h-[255px] flex flex-row gap-[32px] cursor-pointer"
        onClick={() => navigate(`/placedetail/${id}`)}
      >
        <MainCard
          className="w-[340px] h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${img})` }}
        ></MainCard>
        <div className="w-[828px] h-[114px] flex flex-col gap-[12px]">
          <div className="w-full h-[32px] flex flex-row justify-between">
            <div className="w-[140px] h-full flex items-center justify-between">
              <p className="text-[20px] font-semibold">{title}</p>
              <div className="w-[54px] h-full flex items-center">
                <img src="/assets/star.png" className="w-[24px] h-[24px]" />
                <p className="text-[18px]">{rating}</p>
              </div>
            </div>
            <div className="w-[200px] h-[full] flex flex-row gap-[4px] justify-end items-center">
              <img src="/assets/vector.png" className="w-[20px] h-[20px]" />
              <p className="text-[14px]">
                {lon && lat
                  ? getDistanceInKm(lon, lat, mapX, mapY)
                  : "위치권한이 없습니다"}
              </p>
            </div>
          </div>
          <div className="w-full h-[36px] flex flex-row gap-[8px]">
            {tags.map((tag, i) => (
              <TagLabel key={i} value={tag} />
            ))}
          </div>
          <div className="w-full h-[32px] text-[16px]">{address}</div>
        </div>
      </SearchCard>
    </div>
  );
};

export default SearchResultCard;
