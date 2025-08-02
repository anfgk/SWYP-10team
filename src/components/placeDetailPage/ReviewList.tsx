import type { ReviewData } from "@/types/types";
import ReviewCard from "./ReviewCard";

interface Props {
  reviews: ReviewData[];
}

const ReviewList = ({ reviews }: Props) => {
  return (
    <section className="w-[full] h-[fit] flex flex-col gap-[24px]">
      {reviews.map((review) => (
        <ReviewCard key={review.id} reviewData={review} />
      ))}
    </section>
  );
};

export default ReviewList;
