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
      <ReviewPhotoSection
        reviewImageList={reviewData?.reviewImages ?? []}
        reviewCount={reviewData?.totalElements ?? 0}
      />
      <div className="relative inset-0 w-full h-[212px]">
        <img
          src="/assets/images/common/reviewWriteBlur.png"
          className="w-full h-full"
        />
        <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[514px] h-[56px] z-10 bg-[var(--main-color)] text-[var(--main-text)] rounded-[16px] cursor-pointer transition hover:brightness-85">
          리뷰를 작성해주세요!
        </button>
      </div>
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
