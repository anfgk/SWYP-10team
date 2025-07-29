import type { ReviewData } from "@/types/types";
import ReviewCard from "./ReviewCard";

interface Props {
  reviews: ReviewData[];
}

const ReviewList = ({ reviews }: Props) => {
  return (
    <section className="w-[full] h-[fit] flex flex-col gap-[24px]">
      {reviews.map((review) => (
        <ReviewCard
          key={review.id}
          id={review.id}
          profileImg={review.profileImg}
          name={review.name}
          date={review.date}
          rating={review.rating}
          content={review.content}
          heartCount={review.heartCount}
          isLiked={review.isLiked}
          thumbnail={review.thumbnail}
        />
      ))}
    </section>
  );
};

export default ReviewList;
