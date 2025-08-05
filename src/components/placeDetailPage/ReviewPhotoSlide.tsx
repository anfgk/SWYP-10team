import ReviewPhotoCard from "./ReviewPhotoCard";

interface Props {
  imgs: string[];
  offset: number;
  onPhotoClick: (idx: number) => void;
}
const ReviewPhotoSlide = ({ imgs, offset, onPhotoClick }: Props) => {
  return (
    <div className="w-[1128px] h-full flex gap-[13px] flex-shrink-0">
      {imgs.map((img, i) => (
        <ReviewPhotoCard
          key={i}
          img={img}
          onClick={() => onPhotoClick(offset + i)}
        />
      ))}
    </div>
  );
};

export default ReviewPhotoSlide;
