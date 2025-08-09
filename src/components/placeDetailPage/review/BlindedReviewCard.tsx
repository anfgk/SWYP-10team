import type { Review } from "@/types/apiResponseTypes";
import { formatDateToString } from "@/lib/placeDetailUtils";

interface Props {
  review: Review;
}

const BlindedReviewCard = ({ review }: Props) => {
  return (
    <div className="w-full h-[212px] flex flex-col border-b-[1px] border-[var(--search-element-border)] gap-[8px]">
      <div className="w-full h-[24px] flex gap-[16px] items-center">
        {/* 프로필 */}
        <div className="w-fit h-[24px] flex gap-[8px] items-center">
          <img
            src="/assets/images/common/default_profile.png"
            className="w-[24px] h-[24px] rounded-[67.5px]"
          />
          <p className="w-fit text-[14px]">블라인드된 리뷰 작성자</p>
        </div>
        {/* 날짜 */}
        <p className="text-[11px]">
          {formatDateToString(new Date(review.createdAt))}
        </p>
      </div>
      <div className="w-full h-[141px] flex border-[1px] border-[var(--search-element-border)] rounded-[16px] px-[18px] py-[14px]">
        <p className="w-fit h-[22px] text-[var(--deactivated-text)]">
          관리자에 의해 블라인드된 댓글입니다.
        </p>
      </div>
    </div>
  );
};

export default BlindedReviewCard;
