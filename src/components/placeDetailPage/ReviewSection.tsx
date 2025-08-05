import ReviewListSection from "@/components/placeDetailPage/review/ReviewListSection";
import ReviewPhotoSection from "@/components/placeDetailPage/review/ReviewPhotoSection";
import { useReviewList } from "@/hooks/useReviewList";

interface Props {
  placeId: string;
}
const ReviewSection = ({ placeId }: Props) => {
  const {
    sort,
    reviews,
    hasMore,
    loading,
    reviewData,
    setSort,
    handleLoadMore,
  } = useReviewList({ placeId });
  return (
    <section className="w-full h-fit flex flex-col gap-[56px]">
      <ReviewPhotoSection reviewData={reviewData!} />
      <ReviewListSection
        sort={sort}
        reviews={reviews}
        hasMore={hasMore}
        loading={loading}
        setSort={setSort}
        handleLoadMore={handleLoadMore}
      />
    </section>
  );
};

export default ReviewSection;
