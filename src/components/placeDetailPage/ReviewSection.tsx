import ReviewListSection from "@/components/placeDetailPage/review/ReviewListSection";
import ReviewPhotoSection from "@/components/placeDetailPage/review/ReviewPhotoSection";
import { useReviewList } from "@/hooks/useReviewList";
import ReviewWriteButton from "./review/ReviewWriteButton";

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
    <section className="w-full h-fit flex flex-col">
      <ReviewPhotoSection
        reviewImageList={reviewData?.reviewImages ?? []}
        reviewCount={reviewData?.totalElements ?? 0}
      />
      <ReviewWriteButton id={placeId} />
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
