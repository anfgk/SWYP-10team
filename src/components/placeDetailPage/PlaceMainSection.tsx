import type { ResponseImage } from "@/types/apiResponseTypes";
//import VisitedCheckBox from "./VisitedCheckBox";
import { usePhotoModalStore } from "@/stores/photoModalStore";

interface Props {
  title: string;
  thumbnail: string;
  imgList: ResponseImage[];
}

const PlaceMainSection = ({ title, thumbnail, imgList }: Props) => {
  const { modalOpen } = usePhotoModalStore();
  const extendedList = [{ imageId: 0, imageUrl: thumbnail }, ...imgList];
  return (
    <section className="w-[full] h-[494px] flex flex-col items-center gap-[16px] pt-[88px] pb-[44px]">
      <h2 className="w-fit h-[51px] text-[32px] font-semibold">{title}</h2>
      <div className="w-[340px] h-[255px] rounded-[16px] overflow-hidden">
        <img
          src={thumbnail}
          className="w-full h-full cursor-pointer transition hover:brightness-90"
          onClick={() => modalOpen(extendedList, 0)}
        />
      </div>
      {/* <div className="w-[136px] h-[24px] flex gap-[4px] items-center">
        <label className="w-[108px] h-[20px] text-[14px]">
          방문한 장소인가요?
        </label>
        <VisitedCheckBox placeId={placeId} isVisited={isVisited} />
      </div> */}
    </section>
  );
};

export default PlaceMainSection;
