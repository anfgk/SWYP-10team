import ReviewPhotoCard from "./ReviewPhotoCard";

interface Props {
  imgs: string[];
  offset: number;
}
const ReviewPhotoSlide = ({ imgs, offset }: Props) => {
  return (
    <div className="w-[1200px] h-full flex gap-[25px] flex-shrink-0">
      {imgs.map((img, i) => (
        <ReviewPhotoCard key={i} img={img} index={offset + i} />
      ))}
    </div>
  );
};

export default ReviewPhotoSlide;
