import { useEffect, useState, useMemo } from "react";

import ReviewList from "./ReviewList";
import { testReviews } from "@/configs/dummyData";
import SortButton from "../common/SortButton";

const ReviewListSection = () => {
  const [visibleCount, setVisibleCount] = useState(4);
  const [sort, setSort] = useState<"popular" | "latest">("popular");

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  // 정렬 바뀔때마다 리스트 재정렬 후 리턴
  const sortedReviews = useMemo(() => {
    const copied = [...testReviews];
    if (sort === "latest") {
      return copied.sort((a, b) => b.date.getTime() - a.date.getTime());
    } else {
      return copied.sort((a, b) => b.heartCount - a.heartCount);
    }
  }, [sort]);

  // 정렬 바뀔때마다 4개로 초기화
  useEffect(() => {
    setVisibleCount(4);
  }, [sort]);

  const isMore = visibleCount < testReviews.length;

  return (
    <section className="w-full h-fit flex flex-col">
      {/* 정렬버튼 */}
      <div className="w-[148px] h-[24px] flex gap-[16px] ml-auto mb-[16px]">
        <SortButton
          name={"인기 순"}
          isActive={sort === "popular"}
          onToggle={() => setSort("popular")}
        />
        <SortButton
          name={"최신 순"}
          isActive={sort === "latest"}
          onToggle={() => setSort("latest")}
        />
      </div>

      {/* 리뷰 리스트 */}
      <ReviewList reviews={sortedReviews.slice(0, visibleCount)} />

      {/* 더보기 버튼 */}
      {isMore && (
        <button
          className="w-fit h-[24px] mx-auto flex gap-[2px] mt-[24px] items-center cursor-pointer"
          onClick={handleLoadMore}
        >
          <p className="text-[14px] text-[var(--place-neutral)]">댓글 더보기</p>
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
