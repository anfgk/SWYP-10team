import ReviewListSection from "@/components/placeDetailPage/ReviewListSection";
import ReviewPhotoSection from "@/components/placeDetailPage/ReviewPhotoSection";

interface Props {
  placeId: string;
}
const ReviewSection = ({ placeId }: Props) => {
  return (
    <section className="w-full h-fit flex flex-col gap-[56px]">
      <ReviewPhotoSection reviewCount={10} />
      <ReviewListSection placeId={placeId} />
    </section>
  );
};

export default ReviewSection;
