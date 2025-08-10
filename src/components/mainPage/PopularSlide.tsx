import type { PopularCardData } from "@/types/apiResponseTypes";
import PopularCard from "./PopularCard";

interface Props {
  placeList: PopularCardData[];
}
const PopularSlide = ({ placeList }: Props) => {
  return (
    <div className="w-[1200px] h-full flex gap-[20px] flex-shrink-0">
      {placeList.map((place) => (
        <PopularCard key={place.contentId} place={place} />
      ))}
    </div>
  );
};

export default PopularSlide;
