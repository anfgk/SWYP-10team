import type { ResponseImage } from "@/types/apiResponseTypes";
import ReviewPhotoCard from "./ReviewPhotoCard";

interface Props {
  imgs: ResponseImage[];
  offset: number;
  photoLists: ResponseImage[];
}
const ReviewPhotoSlide = ({ imgs, offset, photoLists }: Props) => {
  return (
    <div className="w-[1128px] h-full flex gap-[13px] flex-shrink-0">
      {imgs.map((img, i) => (
        <ReviewPhotoCard
          key={i}
          img={img.imageUrl}
          index={offset + i}
          photoList={photoLists}
        />
      ))}
    </div>
  );
};

export default ReviewPhotoSlide;
