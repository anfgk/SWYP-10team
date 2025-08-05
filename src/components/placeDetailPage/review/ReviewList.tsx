import type { Review } from "@/types/apiResponseTypes";
import ReviewCard from "./ReviewCard";

interface Props {
  reviews: Review[];
}

const ReviewList = ({ reviews }: Props) => {
  return (
    <section className="w-[full] h-[fit] flex flex-col gap-[24px]">
      {reviews.map((review) => (
        <ReviewCard key={review.reviewId} review={review} />
      ))}
    </section>
  );
};

export default ReviewList;
