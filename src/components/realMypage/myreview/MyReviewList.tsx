import type { MyReviewData } from "@/types/apiResponseTypes";
import MyReviewCard from "./MyReviewCard";

interface Props {
  reviews: MyReviewData[];
}

const MyReviewList = ({ reviews }: Props) => {
  return (
    <section className="w-full h-fit flex flex-col gap-[44px]">
      {reviews.map((review) => (
        <MyReviewCard key={review.reviewId} review={review} />
      ))}
    </section>
  );
};

export default MyReviewList;
