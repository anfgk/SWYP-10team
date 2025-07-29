import ReviewList from "./ReviewList";
import { testReviews } from "@/configs/dummyData";

const ReviewListSection = () => {
  return (
    <section>
      <ReviewList reviews={testReviews} />
    </section>
  );
};

export default ReviewListSection;
