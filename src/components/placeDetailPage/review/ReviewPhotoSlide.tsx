import type { ReviewImage } from "@/types/apiResponseTypes";
import ReviewPhotoCard from "./ReviewPhotoCard";

interface Props {
  imgs: ReviewImage[];
  offset: number;
  onPhotoClick: (idx: number) => void;
}
const ReviewPhotoSlide = ({ imgs, offset, onPhotoClick }: Props) => {
  return (
    <div className="w-[1128px] h-full flex gap-[13px] flex-shrink-0">
      {imgs.map((img, i) => (
        <ReviewPhotoCard
          key={i}
          img={img.imageUrl}
          onClick={() => onPhotoClick(offset + i)}
        />
      ))}
    </div>
  );
};

export default ReviewPhotoSlide;
