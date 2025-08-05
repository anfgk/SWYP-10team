import ReviewList from "./ReviewList";
import SortButton from "../common/SortButton";
import { useReviewList } from "@/hooks/useReviewList";

interface Props {
  placeId: string;
}
const ReviewListSection = ({ placeId }: Props) => {
  const { sort, setSort, reviews, hasMore, loading, handleLoadMore } =
    useReviewList({ placeId });
  return (
    <section className="w-full h-fit flex flex-col">
      {/* 정렬버튼 */}
      <div className="w-[148px] h-[24px] flex gap-[16px] ml-auto mb-[16px]">
        <SortButton
          name={"인기 순"}
          isActive={sort === "r"}
          onToggle={() => setSort("r")}
        />
        <SortButton
          name={"최신 순"}
          isActive={sort === "c"}
          onToggle={() => setSort("c")}
        />
      </div>

      {/* 리뷰 리스트 */}
      {loading ? (
        <p className="text-center text-[14px] text-[var(--place-neutral)] py-8">
          불러오는 중...
        </p>
      ) : reviews.length > 0 ? (
        <ReviewList reviews={reviews} />
      ) : (
        <p className="text-center text-[14px] text-[var(--place-neutral)] py-8 border-t-1 border-b-1">
          작성된 리뷰가 없습니다.
        </p>
      )}

      {/* 더보기 버튼 */}
      {hasMore && reviews.length > 0 && (
        <button
          className="w-fit h-[24px] mx-auto flex gap-[2px] mt-[24px] items-center cursor-pointer"
          onClick={handleLoadMore}
          disabled={loading}
        >
          <p className="text-[14px] text-[var(--place-neutral)]">
            {loading ? "불러오는 중..." : "댓글 더보기"}
          </p>
          <img
            className="w-[24px] h-[24px]"
            src="/assets/icons/more_review.png"
            alt="리뷰 더보기"
          />
        </button>
      )}
    </section>
  );
};

export default ReviewListSection;
