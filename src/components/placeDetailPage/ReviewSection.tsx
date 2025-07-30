import ReviewListSection from "@/components/placeDetailPage/ReviewListSection";
import ReviewPhotoSection from "@/components/placeDetailPage/ReviewPhotoSection";

const ReviewSection = () => {
  return (
    <section className="w-full h-fit flex flex-col gap-[56px]">
      <ReviewPhotoSection reviewCount={10} />
      <ReviewListSection />
    </section>
  );
};

export default ReviewSection;
