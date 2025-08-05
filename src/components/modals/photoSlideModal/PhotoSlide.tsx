import PhotoCard from "./PhotoCard";

interface Props {
  imgs: string[];
  offset: number;
  activeIndex: number;
  onPhotoClick: (idx: number) => void;
}
const ReviewPhotoSlide = ({
  imgs,
  offset,
  activeIndex,
  onPhotoClick,
}: Props) => {
  return (
    <div className="w-[884px] h-full flex gap-[12px] flex-shrink-0">
      {imgs.map((img, i) => {
        const globalIndex = offset + i;
        const isActive = activeIndex === globalIndex;
        return (
          <PhotoCard
            key={i}
            img={img}
            onClick={() => onPhotoClick(offset + i)}
            isActive={isActive}
          />
        );
      })}
    </div>
  );
};

export default ReviewPhotoSlide;
