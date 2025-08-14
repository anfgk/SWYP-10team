import { usePhotoModalStore } from "@/stores/photoModalStore";
import MainCard from "../../mainPage/MainCard";
import type { ResponseImage } from "@/types/apiResponseTypes";

interface Props {
  img: string;
  index: number;
  photoList: ResponseImage[];
}

const ReviewPhotoCard = ({ img, index, photoList }: Props) => {
  const { modalOpen } = usePhotoModalStore();
  return (
    <MainCard
      className="w-[150px] h-[150px] bg-cover cursor-pointer"
      onClick={() => modalOpen(photoList, index)}
    >
      <img src={img} className="w-full h-full object-cover object-center" />
    </MainCard>
  );
};

export default ReviewPhotoCard;
